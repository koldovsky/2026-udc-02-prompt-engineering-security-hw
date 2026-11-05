# AGENTS.md — app/

Context layer for agents working inside `app/` (cookbook target).

## Stack

- TypeScript strict (`noUncheckedIndexedAccess`), ESM (`"type": "module"`), Vitest 2, Node 22+.

## Commands (PowerShell, run from `app/`)

- `npm test` — `vitest run`, must exit 0.
- `npm run typecheck` — `tsc --noEmit`, must exit 0.

## Conventions

- Money is **integer cents only** — no floats for amounts.
- Tests live next to source as `*.test.ts` using `describe`/`it`; no extra mocks or deps.
- Invalid input **throws** — no clamping, no silent `NaN`.

## Scope tip

For a task on `money.ts`, read only `src/money.ts` and `src/money.test.ts` — do not scan the whole repo.

Security rules: see the root [AGENTS.md](../AGENTS.md).
