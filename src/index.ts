import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { AutomationServiceClient } from './automation-service-client.js';
import { loadConfig } from './config.js';
import { logger } from './logger.js';
import { createMcpServer } from './mcp-server.js';
import { SpaceTradersApi } from './spacetraders-api.js';

const main = async () => {
	const config = loadConfig();

	const api = new SpaceTradersApi(config.apiToken, config.apiBaseUrl, {
		maxRetries: config.maxRetries,
		baseDelayMs: config.retryBaseMs
	});
	const automationService = new AutomationServiceClient(config.automationServiceUrl);
	const server = createMcpServer(api, automationService);

	const transport = new StdioServerTransport();
	await server.connect(transport);
	logger.info('SpaceTraders MCP server connected over stdio.');

	const shutdown = () => {
		process.exit(0);
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
};

main().catch((error) => {
	logger.error({ err: error }, 'Fatal server startup error.');
	process.exit(1);
});
