# Context layer (Task D)

## What I improved (one layer)

- [x] `app/AGENTS.md` — added/clarified:
  - **Commands:** added `npm run typecheck` (`tsc --noEmit`, must pass before a PR) —
    it was missing even though the docs/refactor prompts and `tsconfig` rely on it.
    Pinned the stack to TypeScript 5.6 + Vitest 2.1 on Node 22.
  - **Conventions** (new section): money is **integer cents** (no floats); tests
    import the source via the ESM `./money.js` specifier; document/assert the
    **observed** behavior (there is a planted bug — surface it, don't hand-fix).
- [x] used Claude native equivalent of ".cursorignore" -  permissions.deny with Read(...) rules in .claude/settings.json. 

- **Why this layer:** `AGENTS.md` is what the assistant actually loads as memory,
  so it steers scope on every run and keeps the agent off `app/.env`. Improving it
  pays off on each task, not just one.

## Curation action

- **Task:** generate TSDoc + a README "Usage" section for the money module via the
  promoted `/write-docs` command.
- **What I did:** narrowed the command target from the **whole `app/` tree** to a
  single **`@file`** (`app/src/money.ts`), and used **`/clear` between the two runs**
  to keep each measurement clean. Broad run reads `README.md`, `package.json`,
  `tsconfig.json`, `AGENTS.md`, and both `src/*.ts`; narrow run reads only
  `money.ts` (+ its test).

## Measurement

Measured with **`/context`** (Claude Code usage screen), total session tokens, with
a `/clear` before each run. Baseline right after `/clear` ≈ **35.9k** total
(Messages 32.2k) — the fixed system/skills overhead plus residue.

| Metric | Before — broad `app/` | After — narrow `app/src/money.ts` |
|---|---|---|
| Context (total tokens) | **52.1k** | **46.2k** |
| Messages tokens | 48.9k | 43.0k |
| Added above baseline (what the run pulled in) | +16.2k | +10.3k |
| Iterations to result | 1 | 1 |

**Deltas:** headline total −5.9k (−11%); context the command itself pulled in
−5.9k → **−36%** (16.2k → 10.3k).

How I measured: `/context` total session tokens, before vs after, `/clear` between.

## Conclusion

Pointing the command at a single `@file` instead of the whole `app/` directory cut
the context the run pulled in by ~36% (−5.9k tokens) and removed the noise of
unrelated files (`README`, `tsconfig`, `package.json`) that the model didn't need to
document one module. It is also safer: the narrow run never goes near `app/.env`,
whereas a "whole-folder" scope invites the agent to wander toward it. Less context,
less noise, lower risk — for the same one-iteration result.
