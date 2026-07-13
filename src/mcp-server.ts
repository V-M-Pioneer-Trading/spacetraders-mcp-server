import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { DispatchManager } from './dispatch-manager.js';
import { SpaceTradersApi } from './spacetraders-api.js';

const asJsonText = (data: unknown) => JSON.stringify(data, null, 2);

const ok = (data: unknown) => ({
	content: [{ type: 'text' as const, text: asJsonText(data) }],
	structuredContent: data
});

const fail = (message: string, data?: unknown) => ({
	content: [
		{
			type: 'text' as const,
			text: asJsonText({ error: message, ...(data ? { details: data } : {}) })
		}
	],
	isError: true
});

const withToolErrorHandling = <TArgs>(
	handler: (args: TArgs) => Promise<any>
) => async (args: TArgs) => {
	try {
		return await handler(args);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		return fail(message);
	}
};

export const createMcpServer = (api: SpaceTradersApi, dispatchManager: DispatchManager) => {
	const server = new McpServer({
		name: 'spacetraders-mcp-server',
		version: '0.1.0'
	});

	server.registerTool(
		'get_agent',
		{
			description: 'Fetch authenticated SpaceTraders agent details.'
		},
		withToolErrorHandling(async () => ok(await api.getAgent()))
	);

	server.registerTool(
		'list_ships',
		{
			description: 'List owned ships.'
		},
		withToolErrorHandling(async () => ok(await api.listShips()))
	);

	server.registerTool(
		'get_ship',
		{
			description: 'Get detailed ship state.',
			inputSchema: { shipSymbol: z.string().min(1) }
		},
		withToolErrorHandling(async ({ shipSymbol }) => ok(await api.getShip(shipSymbol)))
	);

	server.registerTool(
		'navigate_ship',
		{
			description: 'Navigate ship to a waypoint in same system, or warp across systems.',
			inputSchema: {
				shipSymbol: z.string().min(1),
				waypointSymbol: z.string().min(1)
			}
		},
		withToolErrorHandling(async ({ shipSymbol, waypointSymbol }) =>
			ok(await api.navigateShip(shipSymbol, waypointSymbol))
		)
	);

	server.registerTool(
		'dock_ship',
		{
			description: 'Dock a ship.',
			inputSchema: { shipSymbol: z.string().min(1) }
		},
		withToolErrorHandling(async ({ shipSymbol }) => ok(await api.dockShip(shipSymbol)))
	);

	server.registerTool(
		'orbit_ship',
		{
			description: 'Move ship to orbit.',
			inputSchema: { shipSymbol: z.string().min(1) }
		},
		withToolErrorHandling(async ({ shipSymbol }) => ok(await api.orbitShip(shipSymbol)))
	);

	server.registerTool(
		'refuel_ship',
		{
			description: 'Refuel a ship at current docked market.',
			inputSchema: {
				shipSymbol: z.string().min(1),
				units: z.number().int().positive().optional()
			}
		},
		withToolErrorHandling(async ({ shipSymbol, units }) => ok(await api.refuelShip(shipSymbol, units)))
	);

	server.registerTool(
		'extract_resources',
		{
			description: 'Extract resources with a mining-capable ship.',
			inputSchema: { shipSymbol: z.string().min(1) }
		},
		withToolErrorHandling(async ({ shipSymbol }) => ok(await api.extractResources(shipSymbol)))
	);

	server.registerTool(
		'purchase_cargo',
		{
			description: 'Buy goods from market.',
			inputSchema: {
				shipSymbol: z.string().min(1),
				symbol: z.string().min(1),
				units: z.number().int().positive()
			}
		},
		withToolErrorHandling(async ({ shipSymbol, symbol, units }) =>
			ok(await api.purchaseCargo(shipSymbol, symbol, units))
		)
	);

	server.registerTool(
		'sell_cargo',
		{
			description: 'Sell goods at market.',
			inputSchema: {
				shipSymbol: z.string().min(1),
				symbol: z.string().min(1),
				units: z.number().int().positive()
			}
		},
		withToolErrorHandling(async ({ shipSymbol, symbol, units }) =>
			ok(await api.sellCargo(shipSymbol, symbol, units))
		)
	);

	server.registerTool(
		'get_market',
		{
			description: 'Get market details for a waypoint.',
			inputSchema: {
				systemSymbol: z.string().min(1),
				waypointSymbol: z.string().min(1)
			}
		},
		withToolErrorHandling(async ({ systemSymbol, waypointSymbol }) =>
			ok(await api.getMarket(systemSymbol, waypointSymbol))
		)
	);

	server.registerTool(
		'get_ship_cooldown',
		{
			description: 'Get ship cooldown details.',
			inputSchema: {
				shipSymbol: z.string().min(1)
			}
		},
		withToolErrorHandling(async ({ shipSymbol }) => ok(await api.getShipCooldown(shipSymbol)))
	);

	server.registerTool(
		'create_dispatch',
		{
			description:
				'Create an async dispatch job for mining, trading, or scouting. Supports dryRun for mutating intents.',
			inputSchema: {
				type: z.enum(['mining', 'trading', 'scouting']),
				shipSymbol: z.string().min(1),
				dryRun: z.boolean().optional(),
				params: z.record(z.string(), z.any()).optional()
			}
		},
		withToolErrorHandling(async ({ type, shipSymbol, dryRun, params }) =>
			ok(
				dispatchManager.createDispatch({
					type,
					shipSymbol,
					dryRun,
					params
				})
			)
		)
	);

	server.registerTool(
		'get_dispatch_status',
		{
			description: 'Poll status/events/result of a dispatch job.',
			inputSchema: {
				dispatchId: z.string().min(1)
			}
		},
		withToolErrorHandling(async ({ dispatchId }) => ok(dispatchManager.getDispatchStatus(dispatchId)))
	);

	server.registerTool(
		'list_dispatches',
		{
			description: 'List dispatch jobs.',
			inputSchema: {
				limit: z.number().int().positive().max(200).optional(),
				status: z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']).optional()
			}
		},
		withToolErrorHandling(async ({ limit, status }) => ok(dispatchManager.listDispatches(limit, status)))
	);

	server.registerTool(
		'cancel_dispatch',
		{
			description: 'Request cancellation of a running dispatch.',
			inputSchema: {
				dispatchId: z.string().min(1)
			}
		},
		withToolErrorHandling(async ({ dispatchId }) => ok(dispatchManager.cancelDispatch(dispatchId)))
	);

	return server;
};
