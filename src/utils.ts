export const sleep = async (ms: number): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, ms));
};

export const nowIso = (): string => new Date().toISOString();

export const generateId = (prefix: string): string =>
	`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const parseSystemFromWaypoint = (waypointSymbol: string): string => {
	const parts = waypointSymbol.split('-');
	if (parts.length < 2) {
		throw new Error(`Invalid waypoint symbol: ${waypointSymbol}`);
	}

	return `${parts[0]}-${parts[1]}`;
};

export const clamp = (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(max, value));
