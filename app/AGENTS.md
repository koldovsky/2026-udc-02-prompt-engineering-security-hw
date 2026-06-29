# app/ — agent context

Tiny TypeScript module used as the **target** for the Workshop 2 prompt cookbook
(tests / review / refactor / docs / debug). Keep this file short and high-signal.

## Stack

- TypeScript, ESM (`"type": "module"` in `package.json`).
- Test runner: **Vitest**. Type checker: `tsc --noEmit`.
- No build step — source runs/tests directly from `src/`.

## Commands

```bash
npm install        # once
npm test           # vitest run — smoke tests must stay green
npm run typecheck  # tsc --noEmit
```

## Conventions

- **Money is integer cents, never floats.** All helpers live in `src/money.ts`
  (`formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`).
- **Don't hand-fix the planted bug.** `splitEvenly` has a subtle remainder-cents
  gap (and a couple of missing-validation spots) — surface and fix it through a
  cookbook prompt (`/review`, `/add-tests`), not by editing it directly.
- **Tests are colocated** as `*.test.ts` next to the source. After any change,
  keep `npm test` green.
