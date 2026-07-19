# spacetraders-mcp-server

MCP server exposing SpaceTraders ship/market primitives, plus inspection and
knob/replan tools for the unattended fleet automation stack
([meta#20](https://github.com/V-M-Pioneer-Trading/meta/issues/20)) — the same
control surface [ai-service](https://github.com/V-M-Pioneer-Trading/ai-service)'s
AI supervisor (meta#19) uses, so an interactive operator in Claude chat or an
IDE can inspect and steer the live system.

**meta#20 supersedes this repo's old dispatch engine.** The v1 async
mining/trading/scouting dispatch jobs (`create_dispatch`,
`get_dispatch_status`, `list_dispatches`, `cancel_dispatch`) and their SQLite
persistence (dispatch history, waypoint intel, market snapshots) have been
removed — that autonomous-loop responsibility now belongs to
[automation-service](https://github.com/V-M-Pioneer-Trading/automation-service)'s
mining/planner/contract/scout FSMs, which this server's new tools read from
and write to instead of duplicating.

## Tools

**Ship/market primitives** (unchanged, call the SpaceTraders API directly via
`SPACETRADERS_API_TOKEN`): `get_agent`, `list_ships`, `get_ship`,
`navigate_ship`, `dock_ship`, `orbit_ship`, `refuel_ship`,
`extract_resources`, `purchase_cargo`, `sell_cargo`, `get_market`,
`get_ship_cooldown`.

**Fleet inspection + control** (new, meta#20, read from/write to
automation-service via `AUTOMATION_SERVICE_URL` — no SpaceTraders token
involved):

- `get_fleet_metrics` — recent metrics rollups (credits/hour, extraction,
  error rate)
- `get_fleet_anomalies` — recent anomalies (idle ships, profit drops,
  elevated error rates, etc.)
- `get_fleet_events` — recent entries from the append-only event log
  (lifecycle transitions, planner decisions, replans, AI interventions)
- `get_knobs` — every planner/anomaly-detection knob, its current value,
  default, and declared `[min, max]` bounds
- `set_knob` — set a knob to a new value; refused (without ever calling
  automation-service) if the value falls outside that knob's declared
  bounds. **A successful write immediately triggers a fleet replan** —
  automation-service's own `PUT /planner/knobs/:name` handler does this
  unconditionally, so this is never an inert config change.
- `trigger_replan` — ask the fleet to re-plan its current ship assignments
  against the current knob values

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy and edit env file:

```bash
copy .env.example .env
```

Required variables:

- `SPACETRADERS_API_TOKEN` — your SpaceTraders API token (for the ship/market primitive tools)
- `AUTOMATION_SERVICE_URL` — e.g. `http://localhost:3003` (for the fleet inspection/control tools; automation-service's admin API is unauthenticated, same posture command-interface and ai-service already rely on)

## Run

```bash
npm run dev
```

For compiled runtime:

```bash
npm run build
npm run start
```

## Regenerate API client

The typed SpaceTraders client is generated from:

`..\spacetraders-api-docs\reference\SpaceTraders.json`

Run:

```bash
npm run generate:client
```

## Validate

```bash
npm run lint
npm run test
npm run build
```

Tests (`tests/mcp-server.test.ts`) connect a real MCP `Client` to a real
`McpServer` over the SDK's `InMemoryTransport`, and call tools through that
connection — an end-to-end test of the actual tool-call boundary, not a
handler invoked directly. `tests/automation-service-stub.ts` is a local
`http.createServer`-based stub of automation-service's relevant endpoints
(knobs, replan, events, metrics, anomalies), following this repo's existing
pattern of stubbing the backend API rather than mocking at the client-object
level.
