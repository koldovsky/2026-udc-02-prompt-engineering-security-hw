# app — cookbook target

A tiny TypeScript module used as a **real target** for your prompt cookbook
(Task A): tests, review, refactor, docs, debug prompts all point here.

```bash
cd app
npm install
npm test          # vitest — smoke tests pass
npm run typecheck
```

## What's inside

- `src/money.ts` — integer-cent money helpers (`formatCents`, `parseAmount`,
  `splitEvenly`, `applyDiscount`).
- `src/money.test.ts` — minimal smoke tests that pass.

## On purpose

`src/money.ts` originally shipped with a **subtle correctness gap** (how
`splitEvenly` handled remainder cents) and a couple of missing-validation spots.
Those were surfaced and fixed by driving cookbook prompts (`/review-pr`,
`/add-tests`, `fix-bug`, `add-validation`) rather than hand-editing — that was the
exercise. The module now distributes remainder cents and validates its inputs
(integer cents, positive split count, `percent` in `[0,100]`), covered by tests.
