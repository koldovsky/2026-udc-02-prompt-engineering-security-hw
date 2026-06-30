# Context layer (Task D)

## What I improved (one context layer)

- [x] **`app/AGENTS.md`** (new) — a focused context layer for the cookbook target:
  stack (TS strict + `noUncheckedIndexedAccess`, ES2022, ESM, Node 22, vitest),
  commands (`npm test`, `npm run typecheck`), and 3 conventions (money is integer
  cents; public API is stable; fail loudly on bad input; test-first for fixes).
- [x] **`.repomixignore`** (new, ≥3 patterns) — keeps heavy/generated and **sensitive**
  files out of any context tool that reads it: lockfiles, `dist/ build/ out/ coverage/`,
  `repomix-output.*`, and `.env` / `.env.*`.

Why these layers: `app/AGENTS.md` stops the agent from re-deriving the stack and
conventions on every task (fewer wrong-scope edits); `.repomixignore` is the
security synergy with Task B/C — it removes `.env` and dumps from context, not just
noise.

## Curation action

- **Task:** fix and test the `splitEvenly` / `applyDiscount` bug in `app/src/money.ts`.
- **What I did:** scoped the context to the **task files only** (`@app/src` +
  `app/README.md` + `app/AGENTS.md`) instead of loading the whole repository
  (all prompts, docs, materials). This is the "narrow `@file` instead of the whole
  repo" lever.

## Measurement

Tool: `npx repomix@1.16.0` (token count of the packed context). Same repo state,
two scopes:

| Metric | Before (whole repo) | After (task-scoped context) |
|---|---|---|
| Context (tokens) / `repomix` | **23,678** | **2,626** |
| Files packed | 39 | 4 |
| Reduction | — | **≈ 89% fewer tokens (−21,052), 35 fewer files** |

How I measured:

```bash
# Before — whole repo
npx repomix                      # -> Total Tokens: 23,678  (39 files)

# After — narrow scope for the actual task
npx repomix --include "app/src/**,app/README.md,app/AGENTS.md"
                                 # -> Total Tokens: 2,626  (4 files)
```

> Note on `.repomixignore`: it did **not** change the token count here, because
> repomix already ignores lockfiles by default — so its value in this repo is
> **security/hygiene** (keeping `.env`/build out of context), not token savings.
> The measured token win comes from the curation action above.

## Conclusion

Scoping context to the task's files cut the packed context by **~89%** (23.7k → 2.6k
tokens). That is less cost per turn and far less noise for the model to wade through,
which keeps it on-scope. The added `app/AGENTS.md` removes repeated "what's the stack /
how do I test" rediscovery, and `.repomixignore` doubles as a security control by
keeping `.env` and dumps out of the agent's context entirely — the same goal as
Task B (sanitization) and Task C (injection defense).
