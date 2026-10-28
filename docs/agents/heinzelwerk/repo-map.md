# Repo map

Verified against origin/main 2310229 on 2026-10-28. Facts only, each with its evidence (`path:line`). Sections: 1 purpose, 2 entry points, 3 unauthenticated, 4 money, 5 calls in/out, 6 build/run, 7 CI, 8 persistence, 9 patterns, 10 traps, 11 docs.

1. Purpose: stdio MCP server exposing SpaceTraders ship/market tools + automation-service inspect/knob/replan tools (src/index.ts:11-19, src/mcp-server.ts:34-38, README.md:3-8).
2. Entry points = 17 MCP tools over stdio (no HTTP routes, no auth layer; any stdio client may call all; src/index.ts:18-19). SpaceTraders tools use Bearer SPACETRADERS_API_TOKEN (src/spacetraders-api.ts:50). Lines in src/mcp-server.ts:
 - read: get_agent :40, list_ships :48, get_ship :56, get_market :148, get_ship_cooldown :162
 - write (SpaceTraders): navigate_ship :65 (POST .../navigate; description :68 claims warp but code calls navigateShip only, warpShip unused, src/spacetraders-api.ts:138,145), dock_ship :79, orbit_ship :88, refuel_ship :97, extract_resources :109, purchase_cargo :118, sell_cargo :133
 - automation-service read: get_fleet_metrics :177, get_fleet_anomalies :191, get_fleet_events :206, get_knobs :217
 - automation-service write: set_knob :225 (PUT /planner/knobs/:name, auto-triggers replan per description :229), trigger_replan :248 (POST /planner/replan)
3. Unauthenticated: automation-service calls send no auth header (src/automation-service-client.ts:45-62,75-79; src/config.ts:11-13; README.md:64). stdio itself has no auth.
4. Money: purchase_cargo POST /my/ships/:s/purchase (src/spacetraders-api.ts:181), sell_cargo POST .../sell (:189), refuel_ship POST .../refuel (:162; units optional -> full tank, :166): spend/earn game credits. navigate_ship burns fuel (:138). No cap/confirm on units (src/mcp-server.ts:103,125,140). No paid external APIs (deps: package.json:18-23).
 - Path injection: shipSymbol/systemSymbol/waypointSymbol interpolated into URL unencoded (src/spacetraders-api.ts:124,139,153,182,200), zod only checks min(1) (src/mcp-server.ts:70). A "../" shipSymbol on a POST tool can reach other /my/* endpoints (e.g. contract accept) with the token. Knob name IS encoded (src/automation-service-client.ts:75).
 - Unused generated client src/generated/services/* (openapi-typescript-codegen) contains ship purchase/contract calls but nothing imports it (grep src/tests; tsconfig.json:14 excludes it).
5. Calls out: api.spacetraders.io/v2 default (src/config.ts:5-8); automation-service base URL from AUTOMATION_SERVICE_URL (.env.example:5 = .../api/automation/v1): GET /planner/knobs, PUT /planner/knobs/:name, POST /planner/replan, GET /autopilot/events, GET /metrics/context, GET /anomalies/digest (src/automation-service-client.ts:64-120). Called by: nothing in repo; MCP clients spawn it.
 - Vendored: src/generated/spacetraders-types.ts (openapi-typescript, script package.json:12, source ..\spacetraders-api-docs\reference\SpaceTraders.json, no sha pin) plus src/generated/core/*, services/*, index.ts (openapi-typescript-codegen devDep package.json:27, no npm script). All unused by src, excluded from tsc (tsconfig.json:14).
 - Unused API methods: getShipNav, warpShip, siphonResources, listSystems, listWaypoints (src/spacetraders-api.ts:128,145,176,205,209).
6. Build/test/run (package.json:6-13): npm install (README.md:52); npm run dev (tsx src/index.ts); npm run build (tsc -p tsconfig.json); npm start (node dist/index.js); npm run lint (tsc --noEmit); npm test (vitest run); npm run generate:client. Required env: SPACETRADERS_API_TOKEN, AUTOMATION_SERVICE_URL (src/config.ts:4,13); optional SPACETRADERS_API_BASE_URL, SPACETRADERS_MAX_RETRIES=4, SPACETRADERS_RETRY_BASE_MS=400 (min 50) (:5-10). .env git-ignored (.gitignore:4); template .env.example.
7. CI: none. No .github dir in tree (git ls-files).
8. Persistence/migrations: none (no DB or file writes; .gitignore:3 lists data/, leftover of removed SQLite dispatch engine, README.md:10-17).
9. Patterns: register tool via server.registerTool with zod inputSchema, wrap in withToolErrorHandling (src/mcp-server.ts:23-32,40); return ok()/fail() -> isError result (:8,13); createMcpServer(api, automationService) takes injected clients (:34); tests use real MCP Client + InMemoryTransport + http stub of automation-service (tests/mcp-server.test.ts:1-20, tests/automation-service-stub.ts:25); set_knob pre-validates name/bounds client-side then PUTs (src/mcp-server.ts:235-244); KnobNotFound/OutOfRange only for PUT 404/400 (src/automation-service-client.ts:69-85).
10. Traps:
 - withRetry retries every Error (network, JSON.parse failure) and 5xx/429, on POST too (src/spacetraders-api.ts:56-63,76,101), so purchase/sell/refuel can repeat after a lost response.
 - Logger writes to stdout (pino default, no destination; pino-pretty transport unless NODE_ENV=production, src/logger.ts:3-17) while stdout is the MCP JSON-RPC channel (src/index.ts:18-20): log lines can corrupt the protocol stream.
 - No dotenv dep or load: .env is not read, vars must be in process env (package.json:18-23, src/config.ts:25) despite README "copy .env.example .env" (README.md:58).
 - Only get_agent faked in tests; SpaceTraders tools untested (tests/mcp-server.test.ts:8-10).
 - strict:false (tsconfig.json:8). Server version 0.2.0 vs package 1.0.0 (src/mcp-server.ts:37, package.json:3).
 - set_knob TOCTOU between getKnobs and PUT (src/mcp-server.ts:236-244).
11. Docs: README.md (tool list :19-45, setup :47, run :66, regenerate client :79, validate :91). No CLAUDE.md/docs/ (git ls-files).
