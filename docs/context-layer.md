# Context layer (Task D)

## What I improved (one layer)

- [x] **`app/AGENTS.md`** — new file. Added the stack (TypeScript ESM, Vitest,
  `tsc --noEmit`), the three commands (`npm install` / `npm test` /
  `npm run typecheck`), and three conventions (money is integer **cents**, don't
  hand-fix the planted `splitEvenly` bug, tests are colocated `*.test.ts`).
- [x] ignore-file (`.cursorignore`) — already in place at the repo root; it
  excludes `node_modules/`, `dist/`, `build/`, lockfiles, `*.log`, **`.env` /
  `.env.*`**, and `.DS_Store`. No change needed.
- **Why this layer:** the project had a solid ignore-file but no per-package
  agent context. `app/AGENTS.md` gives the agent the stack, commands, and the
  "drive fixes via prompts, don't hand-fix" rule up front — fewer wrong turns
  per task, and it's tiny (276 tokens) so it costs almost nothing to carry.

## Curation action

- **Task:** review / add tests for `app/src/money.ts`.
- **What I did:** scoped the context to a narrow `@file` set
  (`app/src/money.ts` + `app/AGENTS.md` + `app/README.md`) instead of feeding the
  whole repo. The new `app/AGENTS.md` is exactly the high-signal context this
  task needs, so the narrow set loses nothing relevant.

## Measurement

Measured with `npx repomix` (token count of the packed context), run twice from
the repo root: once over the whole repo, once over the narrow include set.

| Метрика | До (whole repo) | Після (narrow `@file`) |
|---|---|---|
| Files packed | 40 | 3 |
| Context (tokens) / `repomix` | **30,291** | **2,556** |
| Context (chars) | 112,634 | 9,471 |

**Reduction: −27,735 tokens (≈91.6% fewer).**

How I measured:
```bash
# before
npx -y repomix --output tmp/repomix-before.txt
# after
npx -y repomix --include "app/src/money.ts,app/AGENTS.md,app/README.md" \
  --output tmp/repomix-after.txt
```
(`tmp/` is gitignored — the packed outputs are not committed.)

## Conclusion

Curating to a narrow `@file` set cut the context from **30,291 → 2,556 tokens
(~92%)** while keeping everything the money task actually needs — cheaper calls
and less noise for the model to wade through. Two security wins fell out for
free: repomix's own scan flagged and **excluded `materials/sensitive-ticket.md`**
(synthetic PII) from the before-pack, and `.env` never appeared in either pack
because the ignore-file keeps it out of context entirely — the same Task B/C
principle, enforced at the context layer.
