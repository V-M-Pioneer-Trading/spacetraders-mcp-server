import pino from 'pino';

export const logger = pino({
	name: 'spacetraders-mcp-server',
	level: 'info',
	transport:
		process.env.NODE_ENV === 'production'
			? undefined
			: {
					target: 'pino-pretty',
					options: {
						colorize: false,
						translateTime: 'SYS:standard',
						ignore: 'pid,hostname'
					}
			  }
});
