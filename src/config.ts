import { z } from 'zod';

const configSchema = z.object({
	SPACETRADERS_API_TOKEN: z.string().min(1, 'SPACETRADERS_API_TOKEN is required'),
	SPACETRADERS_API_BASE_URL: z
		.string()
		.url()
		.default('https://api.spacetraders.io/v2'),
	SPACETRADERS_MAX_RETRIES: z.coerce.number().int().min(0).default(4),
	SPACETRADERS_RETRY_BASE_MS: z.coerce.number().int().min(50).default(400),
	// meta#20: source for the inspection/knob/replan tools — the same
	// unauthenticated admin API command-interface and ai-service already talk to.
	AUTOMATION_SERVICE_URL: z.string().url('AUTOMATION_SERVICE_URL is required')
});

export type AppConfig = {
	apiToken: string;
	apiBaseUrl: string;
	maxRetries: number;
	retryBaseMs: number;
	automationServiceUrl: string;
};

export const loadConfig = (): AppConfig => {
	const parsed = configSchema.parse(process.env);

	return {
		apiToken: parsed.SPACETRADERS_API_TOKEN,
		apiBaseUrl: parsed.SPACETRADERS_API_BASE_URL,
		maxRetries: parsed.SPACETRADERS_MAX_RETRIES,
		retryBaseMs: parsed.SPACETRADERS_RETRY_BASE_MS,
		automationServiceUrl: parsed.AUTOMATION_SERVICE_URL
	};
};
