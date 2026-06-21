# Context layer (Task D)

## What I improved (one layer — two concrete changes)

- [x] **`app/AGENTS.md`** — added a lean agent-context file: stack (TS ESM,
      Node 22, vitest), exact commands (`npm test`, `npm run typecheck`), and 3
      conventions (integer-cent money, tests-as-contract, validate-and-fail-loud).
      Why this layer: the cookbook prompts all target `app/`, so a tight per-app
      context stops the agent from re-deriving the stack and "done" each time.
- [x] **`.aiignore`** (repo root, ≥3 patterns) — excludes `node_modules/`,
      `dist/`, `build/`, `out/`, `coverage/`, `.env` / `.env.*` / `*.pem`,
      and the agent tooling (`_bmad/`, `_bmad-output/`, `.agents/`,
      `.claude/skills/`). Removes both **noise** and **secrets** from any
      context-packing step.

## Curation action (on a real task)

- Task: run the `review-pr` / `add-tests` cookbook prompts against the money module.
- What I did: scoped context to **`app/src` only** (a narrow `@file`-style scope)
  instead of loading the whole `app/` folder (which also pulls `package.json`,
  `tsconfig.json`, `README.md`). This is the "narrow @file instead of the whole
  module" curation move.

## Measurement (real numbers, `npx repomix`)

Measured with `repomix` token counting on two scopes:

| Metric | Before (`app/`, broad) | After (`app/src`, curated) | Δ |
|---|---|---|---|
| Files packed | 5 | 2 | −3 |
| Context tokens | 2,233 | 1,774 | −459 (−20.6%) |
| Context chars | 8,358 | 6,747 | −1,611 |

How I measured:

```bash
npx repomix app      -o tmp.txt   # Total Tokens: 2,233 (5 files)
npx repomix app/src  -o tmp.txt   # Total Tokens: 1,774 (2 files)
```

> Note: `node_modules/` is already excluded (repomix honors `.gitignore`), so the
> 20% reduction comes purely from dropping non-source files the review task didn't
> need — not from hiding dependencies.

## Conclusion

Narrowing the scope to the two files the task actually needs cut context by ~20%
(459 tokens) and removed 3 irrelevant files, which means less to read, fewer
distractions, and lower cost per run. The `.aiignore` adds a security dividend:
the same file that strips build noise also keeps `.env` and dumps out of the
model's context — the Task B/C concern handled at the context layer.

