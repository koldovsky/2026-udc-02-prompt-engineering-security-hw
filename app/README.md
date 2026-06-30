# app — integer-cent money helpers

A tiny TypeScript module used as a **real target** for your prompt cookbook
(Task A). All amounts are **integer cents** to avoid floating-point drift
(e.g. $428.00 → `42800`).

## Quick start

```bash
cd app
npm install
npm test          # vitest
npm run typecheck
```

## Usage

```ts
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./src/money.js";

formatCents(42800);          // "428.00"
parseAmount("12.50");        // 1250
splitEvenly(1000, 3);        // [334, 333, 333]
applyDiscount(10000, 10);    // 9000
```

## Function reference

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatCents` | `(cents: number) => string` | Format integer cents as `"whole.ff"` string. |
| `parseAmount` | `(input: string) => number` | Parse a decimal string into integer cents. Throws on invalid input. |
| `splitEvenly` | `(totalCents: number, n: number) => number[]` | Split total evenly; remainder distributed to first shares. |
| `applyDiscount` | `(cents: number, percent: number) => number` | Apply a percentage discount, rounded to nearest cent. |

## Edge cases & warnings

- **`parseAmount`** rejects strings without a leading digit (e.g. `".50"` — use `"0.50"`). At most 2 fractional digits; `"12.345"` throws.
- **`splitEvenly`** does not validate `n`. Passing `0` causes division by zero; negative or non-integer `n` produces undefined results.
- **`applyDiscount`** does not clamp `percent`. Values above 100 return negative amounts; negative values increase the price.
