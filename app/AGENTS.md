# AGENTS.md — `app/`

Context for an agent working **inside `app/`** (the prompt-cookbook target).
Keep this tight: it's the high-signal layer an agent reads before touching code.

## Stack

- TypeScript (strict), **Node 22+**, **ESM** (`"type": "module"`).
- Test runner: **vitest**. Tests live next to source as `src/*.test.ts` and
  import from the compiled specifier, e.g. `import { x } from "./money.js"`.
- No framework, no backend — a tiny pure-function module (`src/money.ts`).

## Commands

```bash
npm test            # vitest run — must be green before any PR
npm run test:watch  # vitest watch
npm run typecheck   # tsc --noEmit
```

## Conventions

1. **Money is integer cents.** Never use floats for amounts; format/parse via the
   helpers in `src/money.ts`.
2. **Tests next to source**, importing the `./*.js` specifier (ESM), not `./*.ts`.
3. **Don't hand-fix the planted bug** in `splitEvenly` (remainder cents) or the
   missing range-check in `applyDiscount` — drive those via a cookbook prompt
   (`prompts/fix-bug.md`, `prompts/harden-input.md`), tests-first.

## Scope & safety

- Change the **smallest** set of files for the task; keep the public API stable.
- Never read `.env` or commit secrets; `.env` is gitignored and ignore-listed.
- See the repo-root `AGENTS.md` for the full security guardrails.