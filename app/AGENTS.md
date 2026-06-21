# app — agent context

Lean context for AI agents working in `app/` (Task D, WS2).

## Stack

- TypeScript (ESM, `"type": "module"`), Node 22+.
- Test runner: **vitest** (`vitest run`).
- No framework, no runtime deps — a tiny integer-cent money module.

## Commands

```bash
cd app
npm install
npm test          # vitest run — must be green
npm run typecheck # tsc --noEmit
```

## Conventions

1. **Money is integer cents** — never floats. Keep all math in integer cents to
   avoid drift; only `formatCents` renders a decimal string.
2. **Tests are the contract** — production behavior is pinned by `src/*.test.ts`.
   Don't change observable behavior without adding/adjusting a test first.
3. **Validate public inputs, fail loud** — exported functions throw a descriptive
   `Error` on invalid input (e.g. `applyDiscount` rejects `percent` outside
   `[0,100]`; `splitEvenly` rejects non-positive `n`).

## Out of scope for agents

Do not read `.env` or anything matching `KEY|TOKEN|SECRET`, and do not add
network calls. See repo-root `AGENTS.md` for the full security guardrails.

