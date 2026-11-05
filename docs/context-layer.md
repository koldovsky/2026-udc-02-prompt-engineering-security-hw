# Context layer (Task D)

## What I improved (one layer)

- [x] `app/AGENTS.md` — created (24 lines):
  - **Stack:** TypeScript strict + `noUncheckedIndexedAccess`, ESM, Vitest 2, Node 22+.
  - **Commands** (run from `app/`): `npm test`, `npm run typecheck`.
  - **Conventions:**
    - money is integer cents only;
    - tests live next to the source as `*.test.ts` with `describe`/`it`, no extra mocks or dependencies;
    - invalid input throws — no clamping, no `NaN`.
  - **Scope tip:** for `money.ts` tasks, read only `src/money.ts` and `src/money.test.ts`.
  - **Security:** pointer to the root `AGENTS.md` guardrails.
- [ ] ignore file (`.cursorignore` / `.aiignore`) — not changed in this task (see below).
- **Why this layer:** the root `.cursorignore` already hides `node_modules`, build
  output, lockfiles, logs and `.env`, so the missing piece was a short app-level
  rules file.

## Curation action

- **Task (read-only):** explain how `splitEvenly` distributes remainder cents.
- **Setup:** the same task in two fresh Cursor Agent chats, model `grok-4.7-high`.
- **Before (whole repo):**
  > Look through this repository and explain how splitEvenly distributes remainder cents.
- **After (narrow `@file`):**
  > `@app/src/money.ts` Explain how splitEvenly distributes remainder cents. Use only this file.

## Measurements

| Metric | Before | After |
|---|---|---|
| Context / `repomix` (whole repo vs `app/src/money.ts` + `app/AGENTS.md`) | 37 files / 39,701 tokens | 2 files / 1,685 tokens (**-95.8%**) |
| Cursor tokens per task (dashboard → Usage) | 59.9K | 34.4K (**-42.6%**) |
| Files explored by the agent | 2 files, 1 search | 1 file (`money.ts`) |
| Iterations to result | 1 | 1 |
| Answer quality | correct | correct, same explanation (base = floor, remainder to earliest shares, negative totals handled) |

**How measured:**

- `repomix` context size:
  - before: `npx repomix --output <temp>`
  - after: `npx repomix --include "app/src/money.ts,app/AGENTS.md" --output <temp>`
- Cursor tokens: `cursor.com/dashboard` → Usage, rows at 22:31 (before) and 22:33 (after) UTC.

**Side observation:** repomix's built-in security check excluded 2 files from the
full pack — `materials/sensitive-ticket.md` (synthetic secrets) and
`docs/sanitization-checklist.md` (a format example of an API key prefix; a false
positive, no real key). This is the secret-scanning layer from the lecture
working on its own.

## Conclusion

A narrow `@file` cut real token use by ~43% with the same answer quality. The gap
versus repomix's -96% is the fixed per-request overhead (system prompt, rules,
tools), plus the agent was already using search instead of reading everything in
the "before" run. Curation also shrinks the leak surface: `.cursorignore` keeps
`.env` out, and less context means fewer files leave the machine.
