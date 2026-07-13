import { sleep } from './utils.js';

type RetryConfig = {
	maxRetries: number;
	baseDelayMs: number;
};

type HttpError = Error & { status?: number; body?: unknown };

type ApiEnvelope<T> = { data: T; meta?: unknown };

export type Ship = {
	symbol: string;
	nav: {
		systemSymbol: string;
		waypointSymbol: string;
		status: 'IN_TRANSIT' | 'IN_ORBIT' | 'DOCKED';
	};
	fuel: {
		current: number;
		capacity: number;
	};
	cargo: {
		capacity: number;
		units: number;
		inventory?: Array<{ symbol: string; units: number }>;
	};
};

export type Market = {
	symbol: string;
	tradeGoods?: Array<{
		symbol: string;
		type: string;
		tradeVolume: number;
		purchasePrice: number;
		sellPrice: number;
	}>;
};

export class SpaceTradersApi {
	constructor(
		private readonly token: string,
		private readonly baseUrl: string,
		private readonly retryConfig: RetryConfig
	) {}

	private buildHeaders(): HeadersInit {
		return {
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};
	}

	private isRetryableError(error: unknown): boolean {
		const status = (error as HttpError).status;
		if (typeof status === 'number') {
			return status === 429 || status >= 500;
		}

		return error instanceof Error;
	}

	private computeDelayWithJitter(attempt: number): number {
		const base = this.retryConfig.baseDelayMs * 2 ** attempt;
		const jitter = Math.floor(Math.random() * Math.max(1, Math.floor(base * 0.2)));
		return base + jitter;
	}

	private async withRetry<T>(operationName: string, call: () => Promise<T>): Promise<T> {
		for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt += 1) {
			try {
				return await call();
			} catch (error) {
				if (!this.isRetryableError(error) || attempt === this.retryConfig.maxRetries) {
					throw error;
				}

				const delay = this.computeDelayWithJitter(attempt);
				await sleep(delay);
			}
		}

		throw new Error(`Unexpected retry flow exit for ${operationName}`);
	}

	private async request<TResponse>(
		method: 'GET' | 'POST' | 'PATCH',
		path: string,
		body?: unknown
	): Promise<TResponse> {
		return this.withRetry(`${method} ${path}`, async () => {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method,
				headers: this.buildHeaders(),
				body: body === undefined ? undefined : JSON.stringify(body)
			});

			const text = await response.text();
			const payload = text ? JSON.parse(text) : undefined;
			if (!response.ok) {
				const error = new Error(`SpaceTraders API ${response.status} for ${method} ${path}`) as HttpError;
				error.status = response.status;
				error.body = payload;
				throw error;
			}

			return payload as TResponse;
		});
	}

	async getAgent() {
		const response = await this.request<ApiEnvelope<any>>('GET', '/my/agent');
		return response.data;
	}

	async listShips() {
		const response = await this.request<ApiEnvelope<Ship[]>>('GET', '/my/ships?page=1&limit=100');
		return response.data;
	}

	async getShip(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<Ship>>('GET', `/my/ships/${shipSymbol}`);
		return response.data;
	}

	async getShipNav(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<Ship['nav']>>('GET', `/my/ships/${shipSymbol}/nav`);
		return response.data;
	}

	async getShipCooldown(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('GET', `/my/ships/${shipSymbol}/cooldown`);
		return response.data;
	}

	async navigateShip(shipSymbol: string, waypointSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/navigate`, {
			waypointSymbol
		});
		return response.data;
	}

	async warpShip(shipSymbol: string, waypointSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/warp`, {
			waypointSymbol
		});
		return response.data;
	}

	async dockShip(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/dock`);
		return response.data;
	}

	async orbitShip(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/orbit`);
		return response.data;
	}

	async refuelShip(shipSymbol: string, units?: number) {
		const response = await this.request<ApiEnvelope<any>>(
			'POST',
			`/my/ships/${shipSymbol}/refuel`,
			units ? { units } : undefined
		);
		return response.data;
	}

	async extractResources(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/extract`);
		return response.data;
	}

	async siphonResources(shipSymbol: string) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/siphon`);
		return response.data;
	}

	async purchaseCargo(shipSymbol: string, symbol: string, units: number) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/purchase`, {
			symbol,
			units
		});
		return response.data;
	}

	async sellCargo(shipSymbol: string, symbol: string, units: number) {
		const response = await this.request<ApiEnvelope<any>>('POST', `/my/ships/${shipSymbol}/sell`, {
			symbol,
			units
		});
		return response.data;
	}

	async getMarket(systemSymbol: string, waypointSymbol: string) {
		const response = await this.request<ApiEnvelope<Market>>(
			'GET',
			`/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`
		);
		return response.data;
	}

	async listSystems(page: number, limit: number): Promise<any> {
		return this.request<ApiEnvelope<any[]>>('GET', `/systems?page=${page}&limit=${limit}`);
	}

	async listWaypoints(systemSymbol: string, page: number, limit: number): Promise<any> {
		return this.request<ApiEnvelope<any[]>>(
			'GET',
			`/systems/${systemSymbol}/waypoints?page=${page}&limit=${limit}`
		);
	}
}
