# app — Money utilities module

A tiny but battle-tested TypeScript library for **integer-cent money handling**. Avoids floating-point errors. Uses branded types for compile-time safety.

## Quick start

```bash
cd app
npm install
npm test          # vitest — 30 tests, all passing
npm run typecheck # TypeScript strict mode
```

## Module: `src/money.ts`

A financial utility for handling money amounts safely.

### Key insight: Why integer cents?

Floating-point math fails for money:
```ts
0.1 + 0.2 === 0.3  // false! (JS: 0.30000000000000004)
```

This module stores everything as **integer cents** (e.g., 42800 = $428.00):
```ts
// Safe:
const price = 29;  // 29 cents (exact)
const total = price * 3;  // 87 cents (exact)

// Unsafe (don't do this):
const price = 0.29;  // Stored as 0.2899999... (inexact)
```

### Branded types

- **`Cents`** — integer cents only (validated at construction)
- **`Percent`** — discount percentage 0–100 (validated at construction)

Use the helpers to safely create these:
```ts
import { cents, percent, formatCents, parseAmount, splitEvenly, applyDiscount } from "./money";

// Create validated values
const amount = cents(42800);      // OK
const discount = percent(10);      // OK

cents(42.5)   // throws: "not an integer"
percent(150)  // throws: "not 0–100"
```

## API

### `formatCents(amount: Cents): string`

Convert cents to a readable dollar string.

```ts
formatCents(cents(42800))   // "428.00"
formatCents(cents(5))       // "0.05"
formatCents(cents(-100))    // "-1.00"
```

**Zero-padding:** fractional part is always 2 digits. Handles negatives correctly.

### `parseAmount(input: string): Cents`

Parse a dollar string to cents.

```ts
parseAmount("428.00")   // 42800
parseAmount("428")      // 42800 (trailing zeros optional)
parseAmount("0.5")      // 50
parseAmount("-1.99")    // -199

parseAmount("1.999")    // throws (too many decimals)
parseAmount("abc")      // throws (invalid format)
```

**Accepts:** flexible formats ("12", "12.3", "12.30", "-0.05", etc.)
**Rejects:** extra decimals, symbols ($, €), non-numeric input.

### `splitEvenly(totalCents: Cents, n: number): Cents[]`

Split a total evenly across n people. **No lost cents.**

```ts
splitEvenly(cents(9000), 3)   // [3000, 3000, 3000]
splitEvenly(cents(1000), 3)   // [334, 333, 333] ← remainder 1 to first
splitEvenly(cents(-1000), 3)  // [-334, -333, -333] ← negatives work

// Invariant: sum always equals total
const shares = splitEvenly(cents(1000), 3);
shares.reduce((a, b) => a + b, 0) === 1000  // always true
```

**Remainder handling:** If total doesn't divide evenly, the remainder is distributed to the first shares. This guarantees no cent is lost.

### `applyDiscount(amount: Cents, discount: Percent): Cents`

Apply a percentage discount, rounding to nearest cent.

```ts
applyDiscount(cents(10000), percent(10))   // 9000 (10% off $100 = $90)
applyDiscount(cents(105), percent(50))     // 53 (50% off $1.05 = $0.525 → $0.53)
applyDiscount(cents(10000), percent(0))    // 10000 (no discount)
applyDiscount(cents(10000), percent(100))  // 0 (full discount)
```

**Rounding:** Uses `Math.round()` to nearest cent. Matches standard financial rounding.

## Type safety

**Compile-time protection:**
- Can't pass floats to functions expecting `Cents` (TypeScript error)
- Can't pass out-of-range discounts (TypeScript error)
- Can't pass NaN/Infinity (type + runtime validation)

**Runtime defense:**
All public functions validate inputs, even if the type system says they should be valid.

```ts
// Type system prevents this:
formatCents(42.5)  // TypeScript error: not Cents

// Runtime catches it anyway:
formatCents(42.5 as any)  // throws: "expects integer cents"
```

## Limitations

1. **Large numbers:** Max integer is 2^53 - 1 (about $90 trillion). Fine for real-world use.
2. **No currency codes:** Module doesn't know USD vs EUR. Use separately as needed.
3. **No rounding options:** Always rounds to nearest cent. Extend if other rounding needed.

## Testing

**30 comprehensive tests** covering:
- ✅ Normal cases (positive, negative, zero, large numbers)
- ✅ Edge cases (rounding, remainder distribution, boundaries)
- ✅ Error cases (invalid input, out-of-range, non-finite)
- ✅ Properties (round-trip: parse → format → parse)

```bash
npm test          # run once
npm run test:watch # watch mode
```

## Use cases

✅ Shopping carts, invoices, billing  
✅ Bill splitting, discount calculations  
✅ Financial reporting (auditable, exact)  
✅ Bank reconciliation (every cent matters)

❌ Cryptocurrency (different precision model)  
❌ Scientific calculations (use floats or BigDecimal)

---

Built with TypeScript, tested with Vitest. No external dependencies.
