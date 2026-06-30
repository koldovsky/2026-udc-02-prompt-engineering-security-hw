# Context Layer (Task D)

## What was improved

### Layer 1 — `app/AGENTS.md` (added)

Created `app/AGENTS.md` with:
- **Stack:** Node 22, ES modules, TypeScript 5.6, Vitest 2.x — with exact commands
- **Source layout:** what lives in `src/` and why
- **3 conventions the agent must know:**
  1. All amounts are integer cents — never floats
  2. Imports require `.js` extension (ESM + TS rule that breaks tests if violated)
  3. Tests only call public exports
- **Do-not-touch list:** no new deps, no tsconfig changes, never read `.env`

Without this file the agent had to infer the stack from `package.json` and
`tsconfig.json` on every task, sometimes guessing wrong (e.g. adding CommonJS
`require()` calls, omitting the `.js` extension in imports).

### Layer 2 — `.cursorignore` (already in place, verified)

The repo already had a `.cursorignore` excluding:
- `node_modules/`, `dist/`, `build/` — generated, large, zero signal
- `package-lock.json`, `yarn.lock` — high-noise lockfiles
- `.env`, `.env.*` — secrets must never enter the context window
- `.DS_Store`, `nul` — OS junk

This file prevents the agent from wasting tokens on irrelevant content and, critically,
keeps `.env` structurally out of context even before any rule-level prohibition applies.

---

## Curation action

**Task:** add edge-case tests to `app/src/money.ts`.

**Before (wide context):** paste the whole repo path — agent receives all 24,126 tokens
including docs, prompts, and templates that are irrelevant to writing a test.

**After (narrow `@file`):** pass only `app/src/money.ts` as context — agent receives
1,470 tokens containing exactly what it needs (the function signatures and JSDoc).
The test file was passed separately as a second narrow reference.

---

## Measurement

Tool: `npx repomix` (token counts shown below)

| Scenario | Files | Tokens | Chars |
|---|---|---|---|
| Whole repo (before AGENTS.md) | 38 | 23,762 | 87,904 |
| Whole repo (after AGENTS.md added) | 39 | 24,126 | 89,261 |
| Narrow `@file` — `app/src/money.ts` only | 1 | 1,470 | 6,209 |

**AGENTS.md cost:** +364 tokens of structured signal (stack, conventions, guardrails).

**Narrow @file saving:** 24,126 → 1,470 tokens — **94% reduction** for a
single-file task. The model gets only what it needs and nothing else.

---

## Conclusion

Two changes compound each other. `app/AGENTS.md` eliminates the "guess the stack"
overhead on every task — the agent no longer infers ESM rules or test conventions
from scratch. Narrow `@file` targeting cuts 94% of tokens for single-file tasks,
which reduces distraction, lowers cost, and keeps the agent from touching files it
was never meant to see. The `.cursorignore` acts as a structural safety net: `.env`
never enters the context window at all, regardless of what the agent is asked to do.
