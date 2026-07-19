import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { AutomationServiceClient } from './automation-service-client.js';
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

export const createMcpServer = (api: SpaceTradersApi, automationService: AutomationServiceClient) => {
	const server = new McpServer({
		name: 'spacetraders-mcp-server',
		version: '0.2.0'
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

	// meta#20: inspection + knob/replan tools reading from automation-service —
	// the same control surface the ai-service AI supervisor (meta#19) uses, so
	// an interactive operator can inspect and steer the live unattended fleet.

	server.registerTool(
		'get_fleet_metrics',
		{
			description: 'Get recent fleet metrics rollups (credits/hour, extraction, error rate) from automation-service.',
			inputSchema: {
				rollupLimit: z.number().int().positive().max(200).optional()
			}
		},
		withToolErrorHandling(async ({ rollupLimit }) => {
			const { rollups } = await automationService.getMetricsContext(rollupLimit, 0);
			return ok({ rollups });
		})
	);

	server.registerTool(
		'get_fleet_anomalies',
		{
			description: 'Get recent fleet anomalies (idle ships, profit drops, error rates, etc.) from automation-service.',
			inputSchema: {
				windowMinutes: z.number().int().positive().optional(),
				anomalyLimit: z.number().int().positive().max(200).optional()
			}
		},
		withToolErrorHandling(async ({ windowMinutes, anomalyLimit }) => {
			const { anomalies } = await automationService.getAnomaliesDigest(windowMinutes, anomalyLimit);
			return ok({ anomalies });
		})
	);

	server.registerTool(
		'get_fleet_events',
		{
			description: 'Get recent entries from automation-service\'s append-only event log (lifecycle, planner decisions, replans, AI interventions).',
			inputSchema: {
				limit: z.number().int().positive().max(1000).optional()
			}
		},
		withToolErrorHandling(async ({ limit }) => ok({ events: await automationService.getEvents(limit) }))
	);

	server.registerTool(
		'get_knobs',
		{
			description: 'List every planner/anomaly-detection knob (name, current value, default, and declared [min, max] bounds).'
		},
		withToolErrorHandling(async () => ok({ knobs: await automationService.getKnobs() }))
	);

	server.registerTool(
		'set_knob',
		{
			description:
				'Set a planner or anomaly-detection knob to a new value. Refused if the value falls outside that knob\'s declared [min, max] bounds. A successful write immediately triggers a fleet replan (automation-service re-scores every idle ship\'s assignment against the new value) — this is not an inert config change.',
			inputSchema: {
				name: z.string().min(1),
				value: z.number()
			}
		},
		withToolErrorHandling(async ({ name, value }) => {
			const knobs = await automationService.getKnobs();
			const knob = knobs.find((k) => k.name === name);
			if (!knob) {
				return fail(`Unknown knob "${name}".`, { knownKnobs: knobs.map((k) => k.name) });
			}
			if (value < knob.min || value > knob.max) {
				return fail(`${value} is outside ${name}'s declared bounds [${knob.min}, ${knob.max}].`);
			}
			return ok(await automationService.setKnob(name, value));
		})
	);

	server.registerTool(
		'trigger_replan',
		{
			description: 'Ask the fleet to re-plan its current ship assignments against the current knob values.'
		},
		withToolErrorHandling(async () => ok(await automationService.triggerReplan()))
	);

	return server;
};
