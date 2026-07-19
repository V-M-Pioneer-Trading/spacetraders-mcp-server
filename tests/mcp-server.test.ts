import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { afterEach, describe, expect, test } from 'vitest';
import { AutomationServiceClient } from '../src/automation-service-client.js';
import { createMcpServer } from '../src/mcp-server.js';
import { AutomationServiceStub, makeKnob, startAutomationServiceStub } from './automation-service-stub.js';

const fakeSpaceTradersApi = {
	getAgent: async () => ({ symbol: 'TEST-AGENT' })
} as any;

async function connectedClient(stub: AutomationServiceStub) {
	const automationService = new AutomationServiceClient(stub.url);
	const server = createMcpServer(fakeSpaceTradersApi, automationService);
	const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
	const client = new Client({ name: 'test-client', version: '0.0.0' });
	await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);
	return client;
}

function toolResult(result: Awaited<ReturnType<Client['callTool']>>) {
	return result.structuredContent ?? JSON.parse((result.content as any)[0].text);
}

describe('spacetraders-mcp-server meta#20 tools', () => {
	let stub: AutomationServiceStub;

	afterEach(async () => {
		await stub?.close();
	});

	test('get_knobs returns knobs from automation-service', async () => {
		stub = startAutomationServiceStub([makeKnob({ name: 'mine.taskWeight', value: 1, min: 0, max: 10 })]);
		const client = await connectedClient(stub);

		const result = await client.callTool({ name: 'get_knobs', arguments: {} });

		expect(toolResult(result)).toEqual({
			knobs: [{ name: 'mine.taskWeight', value: 1, default: 3, min: 0, max: 10 }]
		});
	});

	test('set_knob applies an in-bounds write via automation-service', async () => {
		stub = startAutomationServiceStub([makeKnob({ name: 'mine.taskWeight', value: 1, min: 0, max: 10 })]);
		const client = await connectedClient(stub);

		const result = await client.callTool({ name: 'set_knob', arguments: { name: 'mine.taskWeight', value: 5 } });

		expect(result.isError).toBeFalsy();
		expect(stub.setKnobCalls).toEqual([{ name: 'mine.taskWeight', value: 5 }]);
		expect(toolResult(result)).toMatchObject({ name: 'mine.taskWeight', value: 5 });
	});

	test('set_knob refuses an out-of-bounds value without ever calling automation-service\'s PUT endpoint', async () => {
		stub = startAutomationServiceStub([makeKnob({ name: 'mine.taskWeight', value: 1, min: 0, max: 10 })]);
		const client = await connectedClient(stub);

		const result = await client.callTool({ name: 'set_knob', arguments: { name: 'mine.taskWeight', value: 500 } });

		expect(result.isError).toBe(true);
		expect(stub.setKnobCalls).toHaveLength(0);
	});

	test('set_knob refuses an unknown knob name', async () => {
		stub = startAutomationServiceStub([makeKnob({ name: 'mine.taskWeight' })]);
		const client = await connectedClient(stub);

		const result = await client.callTool({ name: 'set_knob', arguments: { name: 'does.not.exist', value: 1 } });

		expect(result.isError).toBe(true);
		expect(stub.setKnobCalls).toHaveLength(0);
	});

	test('trigger_replan requests a replan from automation-service', async () => {
		stub = startAutomationServiceStub([makeKnob()]);
		const client = await connectedClient(stub);

		const result = await client.callTool({ name: 'trigger_replan', arguments: {} });

		expect(result.isError).toBeFalsy();
		expect(stub.replanCalls).toBe(1);
	});

	test('get_fleet_events, get_fleet_metrics, and get_fleet_anomalies read from automation-service', async () => {
		stub = startAutomationServiceStub([makeKnob()]);
		stub.events = [{ id: '1', occurredAt: '2026-07-19T00:00:00Z', type: 'armed', detail: {} }];
		stub.anomalies = [
			{ id: 'a1', type: 'ship_idle', dedupeKey: 'ship_idle:MINING-1', detectedAt: '2026-07-19T00:00:00Z', detail: {} }
		];
		const client = await connectedClient(stub);

		const events = await client.callTool({ name: 'get_fleet_events', arguments: {} });
		const metrics = await client.callTool({ name: 'get_fleet_metrics', arguments: {} });
		const anomalies = await client.callTool({ name: 'get_fleet_anomalies', arguments: {} });

		expect(toolResult(events).events).toHaveLength(1);
		expect(toolResult(metrics).rollups).toEqual([]);
		expect(toolResult(anomalies).anomalies).toHaveLength(1);
	});

	test('optional limit/window arguments are actually forwarded to automation-service as query params', async () => {
		stub = startAutomationServiceStub([makeKnob()]);
		const client = await connectedClient(stub);

		await client.callTool({ name: 'get_fleet_events', arguments: { limit: 5 } });
		await client.callTool({ name: 'get_fleet_metrics', arguments: { rollupLimit: 7 } });
		await client.callTool({ name: 'get_fleet_anomalies', arguments: { windowMinutes: 30, anomalyLimit: 12 } });

		expect(stub.receivedQueryStrings).toContainEqual({ pathname: '/autopilot/events', query: '?limit=5' });
		expect(stub.receivedQueryStrings).toContainEqual({ pathname: '/metrics/context', query: '?rollupLimit=7' });
		expect(stub.receivedQueryStrings).toContainEqual({
			pathname: '/anomalies/digest',
			query: '?windowMinutes=30&anomalyLimit=12'
		});
	});
});
