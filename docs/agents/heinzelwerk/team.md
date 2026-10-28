# Team rules

How heinzelwerk agents work in this repo. Mode rules (single repo vs workspace) live in the `heinzelwerk:team-modes` skill. This file holds only what is specific to this repo.

- **Autonomy**: full. Agents merge and apply on their own; breakages are learnings. Secrets are never published (name the variable, never the value), and the gate never merges its own policy.
- **Backend paths**: whole repo (`src/`, `tests/`)
- **Worktree setup**: `npm ci` (red on main: V-M-Pioneer-Trading/meta#129, lockfile out of sync)
- **Checks** (`.github/workflows/heinzelwerk-checks.yml`, added by heinzelwerk setup; the repo had no CI before). Each passes after `npm install`; all are red until the lockfile is fixed:
  - `npm run lint` (red on main: V-M-Pioneer-Trading/meta#129)
  - `npm run build` (red on main: V-M-Pioneer-Trading/meta#129)
  - `npm test` (red on main: V-M-Pioneer-Trading/meta#129)
- **Checks verified on main**: 2310229 2026-10-28
- **Coding standards**: none (no lint config; `npm run lint` is `tsc --noEmit`): smell baseline
- **Risk areas** (validator reviews diffs touching these on Opus):
  - `src/spacetraders-api.ts`: holds `SPACETRADERS_API_TOKEN` and calls SpaceTraders directly; `withRetry` retries every error on POST too, so purchase/sell/refuel can repeat after a lost response; ship/system/waypoint symbols go into URLs unencoded
  - `src/mcp-server.ts` tools `purchase_cargo`, `sell_cargo`, `refuel_ship`, `navigate_ship`: spend or earn credits with no caps on units; `set_knob`, `trigger_replan` steer the autopilot
  - `src/logger.ts`: stdout is the MCP JSON-RPC channel
- **Contracts** (see team-modes **Contract changes**):
  - Consumed: SpaceTraders API v2 directly · provider SpaceTraders; automation-service knobs, replan, events, metrics, anomalies (`src/automation-service-client.ts`, no auth header) · provider automation-service
