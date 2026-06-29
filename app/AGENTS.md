# app/AGENTS.md

Focused guidance for agents working inside the `app/` sample.

## Stack

- Node 22
- TypeScript ESM
- Vitest
- Source files live in `src/`

## Commands

Run from `app/`:

```bash
npm test
npm run typecheck
```

## Conventions

- Money values are integer cents; do not introduce floating-point storage for
  money amounts.
- Keep exported function names and return types in `src/money.ts` stable unless
  the user explicitly asks for an API change.
- For bug fixes, add or update a focused regression test in
  `src/money.test.ts`.
- Avoid new dependencies; this app is intentionally small for prompt-cookbook
  exercises.

## Context Curation

For money-helper tasks, start with these files instead of the whole repo:

- `app/AGENTS.md`
- `app/src/money.ts`
- `app/src/money.test.ts`
- `app/package.json`
- `app/README.md`

Do not include `node_modules/`, lockfiles, build output, logs, `.env`, or files
with secret-like names in agent context.
