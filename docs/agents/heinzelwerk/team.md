# Team rules

How heinzelwerk agents work in this repo. Mode rules (single repo vs workspace) live in the `heinzelwerk:team-modes` skill. This file holds only what is specific to this repo.

- **Role**: backend (Node / TS ESM / MCP SDK). MCP tools for interactive operators; run locally, never deployed. **Not in active development**: work here only when a ticket names this repo
- **Backend paths**: `src/`, `tests/`
- **Worktree setup**: `npm ci --no-audit --no-fund`
- **Checks** (validator runs every one, in order; this repo has no CI):
  1. `npm audit --audit-level=high`
  2. `npm run lint --silent` (it is `tsc --noEmit`; no ESLint here)
  3. `npm run build --silent`
  4. `npx vitest run --reporter=dot`
- **Security**: no secret scan runs yet: gitleaks is not installed and no pre-commit hook exists (planned: `gitleaks git --pre-commit --staged` in `.git/hooks/pre-commit`), so check every diff for secrets by eye · dependency audit in checks
- **Coding standards**: none written: smell baseline only
- **Risk areas** (validator reviews diffs touching these on Opus):
  - `set_knob`, `trigger_replan`: a successful write replans the live fleet immediately; bounds are checked before the call
  - ship-action tools calling SpaceTraders directly with `SPACETRADERS_API_TOKEN`: they bypass st-gateway's rate budget; `purchase_cargo` and `sell_cargo` move credits with no agent-service history and no Clerk auth
- **Contracts**:
  - consumer of automation-service fleet / knob / replan routes (stub in `tests/automation-service-stub.ts`)
  - consumer of the SpaceTraders API; client generated from `../spacetraders-api-docs/reference/SpaceTraders.json` by `npm run generate:client`
