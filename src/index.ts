import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig } from './config.js';
import { Persistence } from './database.js';
import { DispatchManager } from './dispatch-manager.js';
import { logger } from './logger.js';
import { createMcpServer } from './mcp-server.js';
import { SpaceTradersApi } from './spacetraders-api.js';

const main = async () => {
	const config = loadConfig();

	const persistence = new Persistence(config.dbPath);
	const api = new SpaceTradersApi(config.apiToken, config.apiBaseUrl, {
		maxRetries: config.maxRetries,
		baseDelayMs: config.retryBaseMs
	});
	const dispatchManager = new DispatchManager(api, persistence, logger);
	const server = createMcpServer(api, dispatchManager);

	const transport = new StdioServerTransport();
	await server.connect(transport);
	logger.info('SpaceTraders MCP server connected over stdio.');

	const shutdown = () => {
		persistence.close();
		process.exit(0);
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
};

main().catch((error) => {
	logger.error({ err: error }, 'Fatal server startup error.');
	process.exit(1);
});
