# Repo map: spacetraders-mcp-server

MCP server for interactive operators (Claude, IDEs): SpaceTraders ship and market tools, plus fleet inspection and control tools backed by automation-service. ESM, run locally from `dist/index.js`, not deployed.

| Path | Holds |
|---|---|
| `src/index.ts`, `src/mcp-server.ts` | entry, tool registration |
| `src/spacetraders-api.ts` | SpaceTraders calls (`SPACETRADERS_API_BASE_URL`, `SPACETRADERS_API_TOKEN`, retries) |
| `src/automation-service-client.ts` | metrics, anomalies, events, knobs, replan (`AUTOMATION_SERVICE_URL`) |
| `src/generated/` | `openapi-typescript` client from `../spacetraders-api-docs/reference/SpaceTraders.json` |
| `src/config.ts`, `src/logger.ts`, `src/utils.ts` | |
| `tests/` | vitest; real MCP Client over InMemoryTransport, `automation-service-stub.ts` |

- `npm run lint` is `tsc --noEmit`. `generate:client` uses Windows backslash paths.
- `set_knob` checks bounds before the call; a successful write replans immediately.
- automation-service's admin API is unauthenticated from here.
- No CI. Copy `.env.example` to `.env` before running.
