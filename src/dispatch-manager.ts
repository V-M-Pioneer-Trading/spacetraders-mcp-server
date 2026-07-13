import type { Logger } from 'pino';
import { Persistence } from './database.js';
import { SpaceTradersApi } from './spacetraders-api.js';
import type {
	DispatchInput,
	DispatchRecord,
	DispatchStatus,
	DispatchType,
	MarketSnapshot,
	MiningDispatchParams,
	ScoutingDispatchParams,
	TradingDispatchParams
} from './types.js';
import { generateId, parseSystemFromWaypoint, sleep } from './utils.js';

type DispatchRunResult = {
	summary: string;
	details: Record<string, unknown>;
};

type RunningTask = {
	cancelled: boolean;
};

export class DispatchManager {
	private readonly runningTasks = new Map<string, RunningTask>();

	constructor(
		private readonly api: SpaceTradersApi,
		private readonly persistence: Persistence,
		private readonly logger: Logger
	) {}

	createDispatch(input: DispatchInput): DispatchRecord {
		const dispatchId = generateId('dispatch');
		this.persistence.ensureShipLock(input.shipSymbol, dispatchId);

		const record = this.persistence.createDispatch(dispatchId, input.type, input.shipSymbol, {
			...(input.params ?? {}),
			dryRun: Boolean(input.dryRun)
		});

		const task: RunningTask = { cancelled: false };
		this.runningTasks.set(dispatchId, task);

		void this.runDispatch(record, task).finally(() => {
			this.runningTasks.delete(dispatchId);
			this.persistence.releaseShipLock(record.shipSymbol, dispatchId);
		});

		return record;
	}

	getDispatchStatus(dispatchId: string) {
		const dispatch = this.persistence.getDispatch(dispatchId);
		if (!dispatch) {
			throw new Error(`Dispatch ${dispatchId} not found.`);
		}

		return {
			...dispatch,
			events: this.persistence.getDispatchEvents(dispatchId)
		};
	}

	listDispatches(limit = 50, status?: DispatchStatus) {
		return this.persistence.listDispatches(limit, status);
	}

	cancelDispatch(dispatchId: string) {
		const dispatch = this.persistence.getDispatch(dispatchId);
		if (!dispatch) {
			throw new Error(`Dispatch ${dispatchId} not found.`);
		}

		const running = this.runningTasks.get(dispatchId);
		if (!running) {
			throw new Error(`Dispatch ${dispatchId} is not running.`);
		}

		running.cancelled = true;
		this.persistence.addDispatchEvent(dispatchId, 'warning', 'Cancellation requested.');

		return this.persistence.updateDispatchStatus(dispatchId, 'cancelled');
	}

	private async runDispatch(dispatch: DispatchRecord, task: RunningTask) {
		this.persistence.updateDispatchStatus(dispatch.id, 'running');
		this.persistence.addDispatchEvent(
			dispatch.id,
			'info',
			`Starting ${dispatch.type} dispatch.`,
			dispatch.params
		);

		try {
			const dryRun = Boolean((dispatch.params as any).dryRun);
			const result = await this.executeByType(
				dispatch.type,
				dispatch.shipSymbol,
				dispatch.params as any,
				dryRun,
				task,
				dispatch.id
			);

			if (!task.cancelled) {
				this.persistence.updateDispatchStatus(dispatch.id, 'completed', result);
				this.persistence.addDispatchEvent(dispatch.id, 'info', 'Dispatch completed.', result);
			}
		} catch (error) {
			if (task.cancelled) {
				this.persistence.updateDispatchStatus(dispatch.id, 'cancelled');
				this.persistence.addDispatchEvent(dispatch.id, 'warning', 'Dispatch cancelled.');
				return;
			}

			const message = error instanceof Error ? error.message : String(error);
			this.persistence.updateDispatchStatus(dispatch.id, 'failed', undefined, message);
			this.persistence.addDispatchEvent(dispatch.id, 'error', message);
			this.logger.error({ dispatchId: dispatch.id, err: error }, 'Dispatch failed');
		}
	}

	private async executeByType(
		type: DispatchType,
		shipSymbol: string,
		params: MiningDispatchParams | TradingDispatchParams | ScoutingDispatchParams,
		dryRun: boolean,
		task: RunningTask,
		dispatchId: string
	): Promise<DispatchRunResult> {
		switch (type) {
			case 'mining':
				return this.runMining(shipSymbol, params as MiningDispatchParams, dryRun, task, dispatchId);
			case 'trading':
				return this.runTrading(shipSymbol, params as TradingDispatchParams, dryRun, task, dispatchId);
			case 'scouting':
				return this.runScouting(shipSymbol, params as ScoutingDispatchParams, dryRun, task, dispatchId);
			default:
				throw new Error(`Unsupported dispatch type: ${type as string}`);
		}
	}

	private assertNotCancelled(task: RunningTask) {
		if (task.cancelled) {
			throw new Error('Dispatch cancelled.');
		}
	}

	private async ensureDocked(shipSymbol: string) {
		const ship = await this.api.getShip(shipSymbol);
		if (ship.nav.status !== 'DOCKED') {
			await this.api.dockShip(shipSymbol);
		}
	}

	private async ensureOrbiting(shipSymbol: string) {
		const ship = await this.api.getShip(shipSymbol);
		if (ship.nav.status !== 'IN_ORBIT') {
			await this.api.orbitShip(shipSymbol);
		}
	}

	private async travelToWaypoint(shipSymbol: string, waypointSymbol: string) {
		const ship = await this.api.getShip(shipSymbol);
		if (ship.nav.waypointSymbol === waypointSymbol && ship.nav.status !== 'IN_TRANSIT') {
			return;
		}

		const targetSystem = parseSystemFromWaypoint(waypointSymbol);
		await this.ensureOrbiting(shipSymbol);

		if (ship.nav.systemSymbol === targetSystem) {
			await this.api.navigateShip(shipSymbol, waypointSymbol);
		} else {
			await this.api.warpShip(shipSymbol, waypointSymbol);
		}

		await this.waitUntilArrived(shipSymbol);
	}

	private async waitUntilArrived(shipSymbol: string) {
		for (let i = 0; i < 240; i += 1) {
			const nav = await this.api.getShipNav(shipSymbol);
			if (nav.status !== 'IN_TRANSIT') {
				return;
			}

			await sleep(1000);
		}

		throw new Error(`Timed out waiting for ship ${shipSymbol} to arrive.`);
	}

	private async runMining(
		shipSymbol: string,
		params: MiningDispatchParams,
		dryRun: boolean,
		task: RunningTask,
		dispatchId: string
	): Promise<DispatchRunResult> {
		const targetWaypoint = params.targetWaypoint;
		if (!targetWaypoint) {
			throw new Error('mining dispatch requires params.targetWaypoint');
		}

		const maxCycles = params.maxCycles ?? 8;
		const minFuelFraction = params.minFuelFraction ?? 0.25;
		const cooldownWaitCap = params.maxWaitSecondsPerCooldown ?? 20;

		const plan = {
			steps: [
				`Travel ship ${shipSymbol} to ${targetWaypoint}`,
				'Auto-refuel if below threshold',
				`Run extraction loop up to ${maxCycles} cycles`,
				'Dock and sell all mined cargo'
			]
		};

		if (dryRun) {
			return {
				summary: 'Dry-run mining plan created.',
				details: plan
			};
		}

		await this.travelToWaypoint(shipSymbol, targetWaypoint);
		this.persistence.addDispatchEvent(dispatchId, 'info', 'Arrived at mining waypoint.', {
			targetWaypoint
		});

		await this.ensureOrbiting(shipSymbol);

		let extractedUnits = 0;
		const sold: Array<{ symbol: string; units: number; credits: number }> = [];

		for (let cycle = 1; cycle <= maxCycles; cycle += 1) {
			this.assertNotCancelled(task);
			const ship = await this.api.getShip(shipSymbol);
			const fuelFraction = ship.fuel.capacity > 0 ? ship.fuel.current / ship.fuel.capacity : 1;

			if (fuelFraction < minFuelFraction) {
				await this.ensureDocked(shipSymbol);
				await this.api.refuelShip(shipSymbol);
				await this.ensureOrbiting(shipSymbol);
				this.persistence.addDispatchEvent(dispatchId, 'info', 'Ship refueled during mining.');
			}

			if (ship.cargo.units >= ship.cargo.capacity) {
				this.persistence.addDispatchEvent(dispatchId, 'info', 'Stopping mining: cargo is full.');
				break;
			}

			const extraction = await this.api.extractResources(shipSymbol);
			extractedUnits += extraction.extraction.yield.units;
			this.persistence.addDispatchEvent(dispatchId, 'info', `Mining cycle ${cycle} complete.`, {
				yield: extraction.extraction.yield
			});

			const cooldownSeconds = Math.min(
				cooldownWaitCap,
				Number(extraction.cooldown.remainingSeconds ?? 0)
			);
			if (cooldownSeconds > 0) {
				await sleep(cooldownSeconds * 1000);
			}
		}

		await this.ensureDocked(shipSymbol);
		const updatedShip = await this.api.getShip(shipSymbol);
		for (const item of updatedShip.cargo.inventory ?? []) {
			if (item.units <= 0) {
				continue;
			}

			const sale = await this.api.sellCargo(shipSymbol, item.symbol, item.units);
			sold.push({
				symbol: item.symbol,
				units: item.units,
				credits: Number(sale.transaction.totalPrice ?? 0)
			});
		}

		return {
			summary: 'Mining dispatch completed.',
			details: {
				targetWaypoint,
				extractedUnits,
				sold
			}
		};
	}

	private async runTrading(
		shipSymbol: string,
		params: TradingDispatchParams,
		dryRun: boolean,
		task: RunningTask,
		dispatchId: string
	): Promise<DispatchRunResult> {
		const minNetProfit = params.minNetProfit ?? 500;
		const minMarginPercent = params.minProfitMarginPercent ?? 10;
		const maxUnits = params.maxUnits ?? 30;

		const snapshots = this.persistence.getLatestMarketSnapshots(300);
		if (snapshots.length < 2) {
			throw new Error('Not enough market snapshots. Run scouting dispatch first.');
		}

		const best = this.findBestArbitrage(snapshots, minMarginPercent);
		if (!best) {
			throw new Error('No arbitrage opportunity meets current threshold.');
		}

		const plan = {
			opportunity: best,
			steps: [
				'Travel to buy waypoint and revalidate buy market',
				'Purchase goods',
				'Travel to sell waypoint and revalidate sell market',
				'Sell cargo only if net profit threshold is met'
			]
		};

		if (dryRun) {
			return {
				summary: 'Dry-run trading plan created.',
				details: plan
			};
		}

		this.assertNotCancelled(task);
		await this.travelToWaypoint(shipSymbol, best.buy.waypointSymbol);
		await this.ensureDocked(shipSymbol);
		const buyMarket = await this.api.getMarket(best.buy.systemSymbol, best.buy.waypointSymbol);
		const buyGood = (buyMarket.tradeGoods ?? []).find((good: any) => good.symbol === best.symbol);
		if (!buyGood) {
			throw new Error(`Buy market no longer offers ${best.symbol}.`);
		}

		const ship = await this.api.getShip(shipSymbol);
		const availableCapacity = ship.cargo.capacity - ship.cargo.units;
		const unitsToBuy = Math.min(maxUnits, buyGood.tradeVolume, best.sell.tradeVolume, availableCapacity);
		if (unitsToBuy <= 0) {
			throw new Error('No cargo capacity available for trading dispatch.');
		}
		const estimatedNet = (best.sell.sellPrice - buyGood.purchasePrice) * unitsToBuy;

		if (estimatedNet < minNetProfit) {
			throw new Error(
				`Aborting trade because estimated net (${estimatedNet}) is below minNetProfit (${minNetProfit}).`
			);
		}

		await this.api.purchaseCargo(shipSymbol, best.symbol, unitsToBuy);
		this.persistence.addDispatchEvent(dispatchId, 'info', 'Purchased cargo for arbitrage.', {
			symbol: best.symbol,
			units: unitsToBuy
		});

		this.assertNotCancelled(task);
		await this.travelToWaypoint(shipSymbol, best.sell.waypointSymbol);
		await this.ensureDocked(shipSymbol);
		const sellMarket = await this.api.getMarket(best.sell.systemSymbol, best.sell.waypointSymbol);
		const sellGood = (sellMarket.tradeGoods ?? []).find((good: any) => good.symbol === best.symbol);
		if (!sellGood) {
			throw new Error(`Sell market no longer buys ${best.symbol}.`);
		}

		const realNet = (sellGood.sellPrice - buyGood.purchasePrice) * unitsToBuy;
		if (realNet < minNetProfit) {
			this.persistence.addDispatchEvent(
				dispatchId,
				'warning',
				'Opportunity degraded below threshold before sale; selling anyway to release cargo.',
				{ realNet, minNetProfit }
			);
		}

		const sale = await this.api.sellCargo(shipSymbol, best.symbol, unitsToBuy);

		return {
			summary: 'Trading dispatch completed.',
			details: {
				symbol: best.symbol,
				units: unitsToBuy,
				buy: {
					waypoint: best.buy.waypointSymbol,
					price: buyGood.purchasePrice
				},
				sell: {
					waypoint: best.sell.waypointSymbol,
					price: sellGood.sellPrice
				},
				netEstimateAtBuy: estimatedNet,
				netAtSell: realNet,
				transaction: sale.transaction
			}
		};
	}

	private findBestArbitrage(snapshots: MarketSnapshot[], minMarginPercent: number) {
		const bySymbol = new Map<
			string,
			Array<{
				systemSymbol: string;
				waypointSymbol: string;
				tradeVolume: number;
				purchasePrice: number;
				sellPrice: number;
			}>
		>();

		for (const snapshot of snapshots) {
			for (const good of snapshot.tradeGoods) {
				const list = bySymbol.get(good.symbol) ?? [];
				list.push({
					systemSymbol: snapshot.systemSymbol,
					waypointSymbol: snapshot.waypointSymbol,
					tradeVolume: good.tradeVolume,
					purchasePrice: good.purchasePrice,
					sellPrice: good.sellPrice
				});
				bySymbol.set(good.symbol, list);
			}
		}

		let best: any | null = null;
		for (const [symbol, entries] of bySymbol) {
			for (const buy of entries) {
				for (const sell of entries) {
					if (buy.waypointSymbol === sell.waypointSymbol) {
						continue;
					}

					const spread = sell.sellPrice - buy.purchasePrice;
					const margin = buy.purchasePrice > 0 ? (spread / buy.purchasePrice) * 100 : 0;
					if (spread <= 0 || margin < minMarginPercent) {
						continue;
					}

					if (!best || spread > best.spread) {
						best = { symbol, buy, sell, spread, marginPercent: margin };
					}
				}
			}
		}

		return best;
	}

	private async runScouting(
		shipSymbol: string,
		params: ScoutingDispatchParams,
		dryRun: boolean,
		task: RunningTask,
		dispatchId: string
	): Promise<DispatchRunResult> {
		const maxDepth = Math.max(1, params.maxDepth ?? 2);
		const maxSystems = Math.max(5, params.maxSystems ?? maxDepth * 12);
		const focusTraits = params.focusTraits ?? [];
		const seedSystem = params.seedSystem;

		if (!seedSystem) {
			throw new Error('scouting dispatch requires params.seedSystem');
		}

		if (dryRun) {
			return {
				summary: 'Dry-run scouting plan created.',
				details: {
					seedSystem,
					maxDepth,
					maxSystems,
					focusTraits
				}
			};
		}

		const systems = await this.collectSystems(maxSystems * 2);
		const seed = systems.find((system) => system.symbol === seedSystem);
		if (!seed) {
			throw new Error(`Seed system ${seedSystem} not found from API scan.`);
		}

		const selectedSystems = systems
			.map((system) => ({
				...system,
				distance: Math.hypot(system.x - seed.x, system.y - seed.y)
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, maxSystems);

		let scannedWaypoints = 0;
		let storedMarkets = 0;
		for (const system of selectedSystems) {
			this.assertNotCancelled(task);

			const waypoints = await this.collectWaypoints(system.symbol, 200);
			const filteredWaypoints =
				focusTraits.length === 0
					? waypoints
					: waypoints.filter((waypoint) => {
							const traits = (waypoint.traits ?? []).map((trait: any) => trait.symbol);
							return focusTraits.some((trait) => traits.includes(trait));
					  });

			for (const waypoint of filteredWaypoints) {
				scannedWaypoints += 1;
				this.persistence.insertWaypoint(waypoint);

				const traits = (waypoint.traits ?? []).map((trait: any) => trait.symbol);
				if (!traits.includes('MARKETPLACE')) {
					continue;
				}

				try {
					const market = await this.api.getMarket(system.symbol, waypoint.symbol);
					if ((market.tradeGoods ?? []).length === 0) {
						continue;
					}

					this.persistence.insertMarketSnapshot({
						systemSymbol: system.symbol,
						waypointSymbol: waypoint.symbol,
						capturedAt: new Date().toISOString(),
						tradeGoods: market.tradeGoods
					});
					storedMarkets += 1;
				} catch (error) {
					this.persistence.addDispatchEvent(
						dispatchId,
						'warning',
						'Market fetch failed during scouting.',
						{
							system: system.symbol,
							waypoint: waypoint.symbol,
							error: error instanceof Error ? error.message : String(error)
						}
					);
				}
			}
		}

		return {
			summary: 'Scouting dispatch completed.',
			details: {
				seedSystem,
				scannedSystems: selectedSystems.length,
				scannedWaypoints,
				storedMarkets
			}
		};
	}

	private async collectSystems(limit: number) {
		const systems: any[] = [];
		let page = 1;

		while (systems.length < limit) {
			const response = await this.api.listSystems(page, 20);
			const chunk = response.data ?? [];
			systems.push(...chunk);

			if (chunk.length === 0 || chunk.length < 20) {
				break;
			}

			page += 1;
		}

		return systems.slice(0, limit);
	}

	private async collectWaypoints(systemSymbol: string, limit: number) {
		const waypoints: any[] = [];
		let page = 1;

		while (waypoints.length < limit) {
			const response = await this.api.listWaypoints(systemSymbol, page, 20);
			const chunk = response.data ?? [];
			waypoints.push(...chunk);

			if (chunk.length === 0 || chunk.length < 20) {
				break;
			}

			page += 1;
		}

		return waypoints.slice(0, limit);
	}
}
