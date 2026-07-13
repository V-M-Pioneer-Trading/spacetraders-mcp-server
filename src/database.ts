import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import type { DispatchRecord, DispatchStatus, DispatchType, MarketSnapshot } from './types.js';
import { nowIso } from './utils.js';

type DispatchRow = {
	id: string;
	type: DispatchType;
	ship_symbol: string;
	status: DispatchStatus;
	params_json: string;
	result_json: string | null;
	error_text: string | null;
	created_at: string;
	updated_at: string;
};

export class Persistence {
	private db: Database.Database;

	constructor(dbPath: string) {
		const dir = path.dirname(dbPath);
		fs.mkdirSync(dir, { recursive: true });
		this.db = new Database(dbPath);
		this.db.pragma('journal_mode = WAL');
		this.migrate();
	}

	private migrate() {
		this.db.exec(`
			CREATE TABLE IF NOT EXISTS dispatches (
				id TEXT PRIMARY KEY,
				type TEXT NOT NULL,
				ship_symbol TEXT NOT NULL,
				status TEXT NOT NULL,
				params_json TEXT NOT NULL,
				result_json TEXT,
				error_text TEXT,
				created_at TEXT NOT NULL,
				updated_at TEXT NOT NULL
			);

			CREATE TABLE IF NOT EXISTS dispatch_events (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				dispatch_id TEXT NOT NULL,
				level TEXT NOT NULL,
				message TEXT NOT NULL,
				payload_json TEXT,
				created_at TEXT NOT NULL
			);

			CREATE TABLE IF NOT EXISTS ship_locks (
				ship_symbol TEXT PRIMARY KEY,
				dispatch_id TEXT NOT NULL,
				locked_at TEXT NOT NULL
			);

			CREATE TABLE IF NOT EXISTS waypoints (
				symbol TEXT PRIMARY KEY,
				system_symbol TEXT NOT NULL,
				type TEXT NOT NULL,
				x INTEGER NOT NULL,
				y INTEGER NOT NULL,
				traits_json TEXT NOT NULL,
				updated_at TEXT NOT NULL
			);

			CREATE TABLE IF NOT EXISTS market_snapshots (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				system_symbol TEXT NOT NULL,
				waypoint_symbol TEXT NOT NULL,
				captured_at TEXT NOT NULL,
				trade_goods_json TEXT NOT NULL
			);

			CREATE INDEX IF NOT EXISTS idx_dispatch_ship ON dispatches(ship_symbol);
			CREATE INDEX IF NOT EXISTS idx_dispatch_status ON dispatches(status);
			CREATE INDEX IF NOT EXISTS idx_snapshots_waypoint_time ON market_snapshots(waypoint_symbol, captured_at DESC);
		`);
	}

	createDispatch(id: string, type: DispatchType, shipSymbol: string, params: unknown): DispatchRecord {
		const timestamp = nowIso();
		const statement = this.db.prepare(`
			INSERT INTO dispatches (id, type, ship_symbol, status, params_json, created_at, updated_at)
			VALUES (@id, @type, @ship_symbol, @status, @params_json, @created_at, @updated_at)
		`);

		statement.run({
			id,
			type,
			ship_symbol: shipSymbol,
			status: 'queued',
			params_json: JSON.stringify(params ?? {}),
			created_at: timestamp,
			updated_at: timestamp
		});

		return this.getDispatch(id)!;
	}

	updateDispatchStatus(
		id: string,
		status: DispatchStatus,
		result?: unknown,
		errorText?: string
	): DispatchRecord {
		const statement = this.db.prepare(`
			UPDATE dispatches
			SET status = @status,
				result_json = CASE WHEN @result_json IS NULL THEN result_json ELSE @result_json END,
				error_text = CASE WHEN @error_text IS NULL THEN error_text ELSE @error_text END,
				updated_at = @updated_at
			WHERE id = @id
		`);

		statement.run({
			id,
			status,
			result_json: result === undefined ? null : JSON.stringify(result),
			error_text: errorText ?? null,
			updated_at: nowIso()
		});

		return this.getDispatch(id)!;
	}

	getDispatch(id: string): DispatchRecord | null {
		const row = this.db
			.prepare(`SELECT * FROM dispatches WHERE id = ?`)
			.get(id) as DispatchRow | undefined;
		if (!row) {
			return null;
		}

		return {
			id: row.id,
			type: row.type,
			shipSymbol: row.ship_symbol,
			status: row.status,
			params: JSON.parse(row.params_json),
			result: row.result_json ? JSON.parse(row.result_json) : null,
			error: row.error_text,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	}

	listDispatches(limit = 50, status?: DispatchStatus): DispatchRecord[] {
		const rows = status
			? (this.db
					.prepare(
						`SELECT * FROM dispatches WHERE status = ? ORDER BY created_at DESC LIMIT ?`
					)
					.all(status, limit) as DispatchRow[])
			: (this.db
					.prepare(`SELECT * FROM dispatches ORDER BY created_at DESC LIMIT ?`)
					.all(limit) as DispatchRow[]);

		return rows.map((row) => ({
			id: row.id,
			type: row.type,
			shipSymbol: row.ship_symbol,
			status: row.status,
			params: JSON.parse(row.params_json),
			result: row.result_json ? JSON.parse(row.result_json) : null,
			error: row.error_text,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		}));
	}

	addDispatchEvent(dispatchId: string, level: 'info' | 'warning' | 'error', message: string, payload?: unknown) {
		this.db
			.prepare(
				`INSERT INTO dispatch_events (dispatch_id, level, message, payload_json, created_at) VALUES (?, ?, ?, ?, ?)`
			)
			.run(dispatchId, level, message, payload ? JSON.stringify(payload) : null, nowIso());
	}

	getDispatchEvents(dispatchId: string, limit = 200) {
		return this.db
			.prepare(
				`SELECT level, message, payload_json, created_at FROM dispatch_events WHERE dispatch_id = ? ORDER BY id ASC LIMIT ?`
			)
			.all(dispatchId, limit)
			.map((row: any) => ({
				level: row.level,
				message: row.message,
				payload: row.payload_json ? JSON.parse(row.payload_json) : null,
				createdAt: row.created_at
			}));
	}

	ensureShipLock(shipSymbol: string, dispatchId: string) {
		const existing = this.db
			.prepare(`SELECT dispatch_id FROM ship_locks WHERE ship_symbol = ?`)
			.get(shipSymbol) as { dispatch_id: string } | undefined;

		if (existing) {
			throw new Error(
				`Ship ${shipSymbol} is already locked by dispatch ${existing.dispatch_id}.`
			);
		}

		this.db
			.prepare(
				`INSERT INTO ship_locks (ship_symbol, dispatch_id, locked_at) VALUES (?, ?, ?)`
			)
			.run(shipSymbol, dispatchId, nowIso());
	}

	releaseShipLock(shipSymbol: string, dispatchId: string) {
		this.db
			.prepare(`DELETE FROM ship_locks WHERE ship_symbol = ? AND dispatch_id = ?`)
			.run(shipSymbol, dispatchId);
	}

	insertWaypoint(waypoint: any) {
		const traits = (waypoint.traits ?? []).map((trait: any) => trait.symbol);
		this.db
			.prepare(
				`INSERT INTO waypoints (symbol, system_symbol, type, x, y, traits_json, updated_at)
				 VALUES (@symbol, @system_symbol, @type, @x, @y, @traits_json, @updated_at)
				 ON CONFLICT(symbol) DO UPDATE SET
					system_symbol = excluded.system_symbol,
					type = excluded.type,
					x = excluded.x,
					y = excluded.y,
					traits_json = excluded.traits_json,
					updated_at = excluded.updated_at`
			)
			.run({
				symbol: waypoint.symbol,
				system_symbol: waypoint.systemSymbol,
				type: waypoint.type,
				x: waypoint.x,
				y: waypoint.y,
				traits_json: JSON.stringify(traits),
				updated_at: nowIso()
			});
	}

	insertMarketSnapshot(snapshot: MarketSnapshot) {
		this.db
			.prepare(
				`INSERT INTO market_snapshots (system_symbol, waypoint_symbol, captured_at, trade_goods_json)
				 VALUES (?, ?, ?, ?)`
			)
			.run(
				snapshot.systemSymbol,
				snapshot.waypointSymbol,
				snapshot.capturedAt,
				JSON.stringify(snapshot.tradeGoods)
			);
	}

	getLatestMarketSnapshots(limit = 200): MarketSnapshot[] {
		const rows = this.db
			.prepare(
				`
					SELECT ms.system_symbol, ms.waypoint_symbol, ms.captured_at, ms.trade_goods_json
					FROM market_snapshots ms
					JOIN (
						SELECT waypoint_symbol, MAX(captured_at) AS latest
						FROM market_snapshots
						GROUP BY waypoint_symbol
					) latest ON latest.waypoint_symbol = ms.waypoint_symbol AND latest.latest = ms.captured_at
					ORDER BY ms.captured_at DESC
					LIMIT ?
				`
			)
			.all(limit) as any[];

		return rows.map((row) => ({
			systemSymbol: row.system_symbol,
			waypointSymbol: row.waypoint_symbol,
			capturedAt: row.captured_at,
			tradeGoods: JSON.parse(row.trade_goods_json)
		}));
	}

	close() {
		this.db.close();
	}
}
