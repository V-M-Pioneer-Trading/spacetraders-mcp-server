export type Knob = {
	name: string;
	value: number;
	default: number;
	min: number;
	max: number;
};

export type EventLogEntry = {
	id: string;
	occurredAt: string;
	type: string;
	detail: Record<string, unknown>;
};

export type MetricsRollup = {
	windowStart: string;
	windowEnd: string;
	creditsPerHour: number;
	extractionUnits: number;
	errorRate: number;
};

export type Anomaly = {
	id: string;
	type: string;
	dedupeKey: string;
	detectedAt: string;
	detail: Record<string, unknown>;
};

export class KnobOutOfRangeError extends Error {}
export class KnobNotFoundError extends Error {}

async function parseErrorMessage(res: Response): Promise<string> {
	try {
		const body = (await res.json()) as { error?: { message?: string } | string };
		if (typeof body.error === 'string') return body.error;
		return body.error?.message ?? res.statusText;
	} catch {
		return res.statusText;
	}
}

/**
 * Thin fetch client for automation-service's admin API — same unauthenticated
 * posture command-interface's and ai-service's clients already rely on
 * (automation-service's admin API takes no bearer token).
 */
export class AutomationServiceClient {
	constructor(private readonly baseUrl: string) {}

	private async call<T>(path: string, init?: RequestInit): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			...init,
			headers: init?.body ? { 'Content-Type': 'application/json', ...init.headers } : init?.headers
		});
		if (!res.ok) {
			throw new Error(`automation-service ${res.status}: ${await parseErrorMessage(res)}`);
		}
		return res.json() as Promise<T>;
	}

	async getKnobs(): Promise<Knob[]> {
		const { knobs } = await this.call<{ knobs: Knob[] }>('/planner/knobs');
		return knobs;
	}

	// PUT /planner/knobs/:name is the only endpoint where a 404/400 means
	// something specific enough to warrant its own error type — every other
	// endpoint's 404/400 (e.g. a scheduler-dependent route that isn't mounted
	// on this deployment) should surface as a plain, status-prefixed message
	// instead of being misread as "unknown knob" or "out of range".
	async setKnob(name: string, value: number): Promise<Knob> {
		const res = await fetch(`${this.baseUrl}/planner/knobs/${encodeURIComponent(name)}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ value })
		});
		if (!res.ok) {
			const message = await parseErrorMessage(res);
			if (res.status === 404) throw new KnobNotFoundError(message);
			if (res.status === 400) throw new KnobOutOfRangeError(message);
			throw new Error(`automation-service ${res.status}: ${message}`);
		}
		const { knob } = (await res.json()) as { knob: Knob };
		return knob;
	}

	async triggerReplan(): Promise<{ requested: boolean }> {
		return this.call<{ requested: boolean }>('/planner/replan', { method: 'POST' });
	}

	async getEvents(limit?: number): Promise<EventLogEntry[]> {
		const qs = limit ? `?limit=${limit}` : '';
		const { events } = await this.call<{ events: EventLogEntry[] }>(`/autopilot/events${qs}`);
		return events;
	}

	async getMetricsContext(
		rollupLimit?: number,
		eventLimit?: number
	): Promise<{ rollups: MetricsRollup[]; events: EventLogEntry[] }> {
		const params = new URLSearchParams();
		if (rollupLimit) params.set('rollupLimit', String(rollupLimit));
		if (eventLimit) params.set('eventLimit', String(eventLimit));
		const qs = params.toString();
		return this.call(`/metrics/context${qs ? `?${qs}` : ''}`);
	}

	async getAnomaliesDigest(
		windowMinutes?: number,
		anomalyLimit?: number
	): Promise<{ anomalies: Anomaly[]; events: EventLogEntry[] }> {
		const params = new URLSearchParams();
		if (windowMinutes) params.set('windowMinutes', String(windowMinutes));
		if (anomalyLimit) params.set('anomalyLimit', String(anomalyLimit));
		const qs = params.toString();
		return this.call(`/anomalies/digest${qs ? `?${qs}` : ''}`);
	}
}
