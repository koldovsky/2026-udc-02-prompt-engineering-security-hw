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
  `splitEvenly`, `applyDiscount`, `applyTax`).
- `src/money.test.ts` — edge-case tests (remainder cents, negatives, bad
  input, out-of-range discount) added via `prompts/add-tests.md`.

## Usage

```ts
import { formatCents, parseAmount, splitEvenly, applyDiscount, applyTax } from "./money.js";

parseAmount("428.00");     // -> 42800 (cents)
formatCents(42800);        // -> "428.00"
splitEvenly(9001, 3);      // -> [3001, 3000, 3000] (remainder goes to the first share)
applyDiscount(10000, 10);  // -> 9000 (10% off $100.00)
applyTax(10000, 10);       // -> 11000 (10% tax on $100.00)
```

All five functions throw (`Error` / `RangeError`) on invalid input instead of
returning `NaN` or silently wrong values — see `src/money.ts` JSDoc for the
exact contract of each.

## History

`src/money.ts` originally shipped with a **subtle correctness gap** (`splitEvenly`
dropped remainder cents instead of distributing them) and a couple of
missing-validation spots (`n`, `percent` unchecked). Both were surfaced and
fixed by driving `prompts/add-tests.md` against this file — see that prompt's
"Verified" section for the run. The cookbook prompts in `prompts/` (review,
tests, docs, refactor, debug) all use this file as their real target.
