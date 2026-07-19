import http from 'node:http';
import type { AddressInfo } from 'node:net';
import type { Knob } from '../src/automation-service-client.js';

export type AutomationServiceStub = {
	url: string;
	knobs: Knob[];
	events: Array<{ id: string; occurredAt: string; type: string; detail: Record<string, unknown> }>;
	anomalies: unknown[];
	setKnobCalls: Array<{ name: string; value: number }>;
	replanCalls: number;
	receivedQueryStrings: Array<{ pathname: string; query: string }>;
	close: () => Promise<void>;
};

export const makeKnob = (overrides: Partial<Knob> = {}): Knob => ({
	name: 'anomaly.consecutiveFailureLimit',
	value: 3,
	default: 3,
	min: 1,
	max: 20,
	...overrides
});

export function startAutomationServiceStub(initialKnobs: Knob[]): AutomationServiceStub {
	const stub: AutomationServiceStub = {
		url: '',
		knobs: initialKnobs,
		events: [],
		anomalies: [],
		setKnobCalls: [],
		replanCalls: 0,
		receivedQueryStrings: [],
		close: async () => {}
	};

	const respondJson = (res: http.ServerResponse, status: number, data: unknown) => {
		res.writeHead(status, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(data));
	};

	const server = http.createServer((req, res) => {
		let body = '';
		req.on('data', (chunk) => (body += chunk));
		req.on('end', () => {
			const url = new URL(req.url ?? '/', 'http://localhost');
			if (url.search) stub.receivedQueryStrings.push({ pathname: url.pathname, query: url.search });

			if (req.method === 'GET' && url.pathname === '/planner/knobs') {
				respondJson(res, 200, { knobs: stub.knobs });
				return;
			}

			if (req.method === 'PUT' && url.pathname.startsWith('/planner/knobs/')) {
				const name = decodeURIComponent(url.pathname.slice('/planner/knobs/'.length));
				const knob = stub.knobs.find((k) => k.name === name);
				if (!knob) {
					respondJson(res, 404, { error: { message: `unknown knob "${name}"` } });
					return;
				}
				const { value } = JSON.parse(body || '{}');
				if (value < knob.min || value > knob.max) {
					respondJson(res, 400, { error: { message: 'out of range' } });
					return;
				}
				stub.setKnobCalls.push({ name, value });
				knob.value = value;
				respondJson(res, 200, { knob });
				return;
			}

			if (req.method === 'POST' && url.pathname === '/planner/replan') {
				stub.replanCalls++;
				respondJson(res, 200, { requested: true });
				return;
			}

			if (req.method === 'GET' && url.pathname === '/autopilot/events') {
				respondJson(res, 200, { events: stub.events });
				return;
			}

			if (req.method === 'GET' && url.pathname === '/metrics/context') {
				respondJson(res, 200, { rollups: [], events: stub.events });
				return;
			}

			if (req.method === 'GET' && url.pathname === '/anomalies/digest') {
				respondJson(res, 200, { anomalies: stub.anomalies, events: [] });
				return;
			}

			respondJson(res, 404, { error: { message: 'not found' } });
		});
	});

	server.listen(0);
	const { port } = server.address() as AddressInfo;
	stub.url = `http://localhost:${port}`;
	stub.close = () => new Promise((resolve) => server.close(() => resolve()));

	return stub;
}
