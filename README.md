# spacetraders-mcp-server

Initial v1 MCP server for controlling a SpaceTraders fleet with both low-level primitives and high-level async dispatch workflows.

## What v1 includes

- **Hybrid tool model**
	- Primitive ship/market operations (`get_ship`, `navigate_ship`, `refuel_ship`, etc.)
	- High-level intent tools (`create_dispatch`, `get_dispatch_status`, `cancel_dispatch`)
- **Dispatch types**
	- `mining`: travel → auto-refuel checks → bounded extraction loop → sell cargo
	- `trading`: arbitrage from scouting cache with fresh market revalidation before trades
	- `scouting`: bounded exploration that persists waypoint + market intel
- **Operational guarantees**
	- Single-account auth via `SPACETRADERS_API_TOKEN` env var
	- One active dispatch lock per ship
	- Async job execution with status polling
	- SQLite persistence for dispatch history, waypoint intel, and market snapshots
	- Centralized retry/backoff policy for retryable API failures
	- `dryRun` support for mutating high-level dispatches

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy and edit env file:

```bash
copy .env.example .env
```

Required variable:

- `SPACETRADERS_API_TOKEN` — your SpaceTraders API token

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

The typed client is generated from:

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
