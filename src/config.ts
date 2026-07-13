import { z } from 'zod';

const configSchema = z.object({
	SPACETRADERS_API_TOKEN: z.string().min(1, 'SPACETRADERS_API_TOKEN is required'),
	SPACETRADERS_API_BASE_URL: z
		.string()
		.url()
		.default('https://api.spacetraders.io/v2'),
	SPACETRADERS_DB_PATH: z.string().default('./data/spacetraders.db'),
	SPACETRADERS_MAX_RETRIES: z.coerce.number().int().min(0).default(4),
	SPACETRADERS_RETRY_BASE_MS: z.coerce.number().int().min(50).default(400)
});

export type AppConfig = {
	apiToken: string;
	apiBaseUrl: string;
	dbPath: string;
	maxRetries: number;
	retryBaseMs: number;
};

export const loadConfig = (): AppConfig => {
	const parsed = configSchema.parse(process.env);

	return {
		apiToken: parsed.SPACETRADERS_API_TOKEN,
		apiBaseUrl: parsed.SPACETRADERS_API_BASE_URL,
		dbPath: parsed.SPACETRADERS_DB_PATH,
		maxRetries: parsed.SPACETRADERS_MAX_RETRIES,
		retryBaseMs: parsed.SPACETRADERS_RETRY_BASE_MS
	};
};
