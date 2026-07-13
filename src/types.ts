export type DispatchType = 'mining' | 'trading' | 'scouting';

export type DispatchStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export type MiningDispatchParams = {
	targetWaypoint: string;
	maxCycles?: number;
	minFuelFraction?: number;
	maxWaitSecondsPerCooldown?: number;
};

export type TradingDispatchParams = {
	minNetProfit?: number;
	maxUnits?: number;
	minProfitMarginPercent?: number;
};

export type ScoutingDispatchParams = {
	seedSystem: string;
	maxDepth?: number;
	focusTraits?: string[];
	maxSystems?: number;
};

export type DispatchInput = {
	type: DispatchType;
	shipSymbol: string;
	dryRun?: boolean;
	params?: MiningDispatchParams | TradingDispatchParams | ScoutingDispatchParams;
};

export type DispatchRecord = {
	id: string;
	type: DispatchType;
	shipSymbol: string;
	status: DispatchStatus;
	params: unknown;
	result: unknown | null;
	error: string | null;
	createdAt: string;
	updatedAt: string;
};

export type MarketSnapshot = {
	systemSymbol: string;
	waypointSymbol: string;
	capturedAt: string;
	tradeGoods: Array<{
		symbol: string;
		type: string;
		tradeVolume: number;
		purchasePrice: number;
		sellPrice: number;
	}>;
};
