import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { Persistence } from '../src/database.js';

const tempDirs: string[] = [];

afterEach(() => {
	for (const dir of tempDirs) {
		fs.rmSync(dir, { recursive: true, force: true });
	}
	tempDirs.length = 0;
});

describe('Persistence ship locks', () => {
	test('enforces one active lock per ship', () => {
		expect.assertions(2);

		const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'st-mcp-'));
		tempDirs.push(dir);
		const db = new Persistence(path.join(dir, 'test.db'));

		db.ensureShipLock('SHIP-1', 'dispatch-a');
		expect(() => db.ensureShipLock('SHIP-1', 'dispatch-b')).toThrow(/already locked/);

		db.releaseShipLock('SHIP-1', 'dispatch-a');
		expect(() => db.ensureShipLock('SHIP-1', 'dispatch-c')).not.toThrow();

		db.close();
	});
});
