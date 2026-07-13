import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { Persistence } from '../src/database.js';
import { DispatchManager } from '../src/dispatch-manager.js';

const tempDirs: string[] = [];

afterEach(() => {
	for (const dir of tempDirs) {
		fs.rmSync(dir, { recursive: true, force: true });
	}
	tempDirs.length = 0;
});

const waitForTerminalStatus = async (
	db: Persistence,
	dispatchId: string
): Promise<'completed' | 'failed' | 'cancelled'> => {
	for (let i = 0; i < 200; i += 1) {
		const status = db.getDispatch(dispatchId)?.status;
		if (status === 'completed' || status === 'failed' || status === 'cancelled') {
			return status;
		}

		await new Promise((resolve) => setTimeout(resolve, 10));
	}

	throw new Error('Timed out waiting for dispatch terminal status.');
};

const waitForShipUnlock = async (db: Persistence, shipSymbol: string): Promise<void> => {
	for (let i = 0; i < 200; i += 1) {
		try {
			db.ensureShipLock(shipSymbol, 'unlock-check');
			db.releaseShipLock(shipSymbol, 'unlock-check');
			return;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}
	}

	throw new Error(`Timed out waiting for ship unlock: ${shipSymbol}`);
};

describe('DispatchManager', () => {
	test('keeps cancelled status when running task aborts after cancellation', async () => {
		expect.assertions(1);

		const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'st-mcp-'));
		tempDirs.push(dir);
		const db = new Persistence(path.join(dir, 'test.db'));

		let resolveListSystems: ((value: { data: any[] }) => void) | null = null;
		const api = {
			listSystems: () =>
				new Promise<{ data: any[] }>((resolve) => {
					resolveListSystems = resolve;
				})
		} as any;

		const manager = new DispatchManager(api, db, { error: () => undefined } as any);
		const dispatch = manager.createDispatch({
			type: 'scouting',
			shipSymbol: 'SHIP-1',
			params: { seedSystem: 'X1-A', maxSystems: 5 }
		});

		manager.cancelDispatch(dispatch.id);
		resolveListSystems?.({ data: [] });

		const status = await waitForTerminalStatus(db, dispatch.id);
		expect(status).toBe('cancelled');

		await waitForShipUnlock(db, 'SHIP-1');
		db.close();
	});

	test('fails trading dispatch when cargo capacity is already full', async () => {
		expect.assertions(2);

		const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'st-mcp-'));
		tempDirs.push(dir);
		const db = new Persistence(path.join(dir, 'test.db'));

		db.insertMarketSnapshot({
			systemSymbol: 'X1-A',
			waypointSymbol: 'X1-A-WP1',
			capturedAt: new Date().toISOString(),
			tradeGoods: [
				{ symbol: 'IRON', type: 'EXPORT', tradeVolume: 50, purchasePrice: 10, sellPrice: 9 }
			]
		});
		db.insertMarketSnapshot({
			systemSymbol: 'X1-A',
			waypointSymbol: 'X1-A-WP2',
			capturedAt: new Date().toISOString(),
			tradeGoods: [
				{ symbol: 'IRON', type: 'IMPORT', tradeVolume: 50, purchasePrice: 12, sellPrice: 20 }
			]
		});

		const api = {
			getShip: () =>
				Promise.resolve({
					symbol: 'SHIP-1',
					nav: {
						systemSymbol: 'X1-A',
						waypointSymbol: 'X1-A-WP1',
						status: 'DOCKED'
					},
					fuel: { current: 100, capacity: 100 },
					cargo: { capacity: 10, units: 10, inventory: [] }
				}),
			getMarket: (_systemSymbol: string, waypointSymbol: string) =>
				Promise.resolve({
					symbol: waypointSymbol,
					tradeGoods:
						waypointSymbol === 'X1-A-WP1'
							? [{ symbol: 'IRON', type: 'EXPORT', tradeVolume: 50, purchasePrice: 10, sellPrice: 9 }]
							: [{ symbol: 'IRON', type: 'IMPORT', tradeVolume: 50, purchasePrice: 12, sellPrice: 20 }]
				}),
			dockShip: () => Promise.resolve({}),
			orbitShip: () => Promise.resolve({}),
			navigateShip: () => Promise.resolve({}),
			warpShip: () => Promise.resolve({}),
			getShipNav: () => Promise.resolve({ status: 'DOCKED' })
		} as any;

		const manager = new DispatchManager(api, db, { error: () => undefined } as any);
		const dispatch = manager.createDispatch({
			type: 'trading',
			shipSymbol: 'SHIP-1',
			params: {}
		});

		const status = await waitForTerminalStatus(db, dispatch.id);
		const record = db.getDispatch(dispatch.id);
		expect(status).toBe('failed');
		expect(record?.error).toContain('No cargo capacity available');

		await waitForShipUnlock(db, 'SHIP-1');
		db.close();
	});
});
