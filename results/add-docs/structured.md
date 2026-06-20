# `app/src/money.ts` — API Documentation

Integer-cent money utilities for the WS2 prompt cookbook. All amounts are
represented as whole **integer cents** (e.g. `$4.28` → `428`) to avoid
floating-point drift.

---

## Functions

### `formatCents(cents: number): string`

Converts an integer cent amount into a human-readable decimal string.

| Parameter | Type     | Description                       |
|-----------|----------|-----------------------------------|
| `cents`   | `number` | Integer cents (may be negative)   |

**Returns:** A string in `"WHOLE.FF"` format where `FF` is always two digits.

**Behavior:**
- Negative values are prefixed with `"-"`.
- The fractional part is zero-padded to exactly two digits.
- Does not include a currency symbol.

**Examples:**

```typescript
formatCents(42800)  // "428.00"
formatCents(4280)   // "42.80"
formatCents(5)      // "0.05"
formatCents(0)      // "0.00"
formatCents(-150)   // "-1.50"
```

**Side effects:** None.

---

### `parseAmount(input: string): number`

Parses a decimal string into integer cents. Inverse of `formatCents`.

| Parameter | Type     | Description                                             |
|-----------|----------|---------------------------------------------------------|
| `input`   | `string` | A decimal string like `"428.00"`, `"428"`, or `"-1.50"` |

**Returns:** Integer cents as a `number`.

**Throws:** `Error` with the message `"Not a valid amount: <input>"` if the
string does not match the expected format.

**Accepted formats:**
- Whole numbers: `"100"`, `"-42"`
- One decimal place: `"3.5"` (treated as `"3.50"` → `350` cents)
- Two decimal places: `"3.50"`, `"-0.99"`
- Leading/trailing whitespace is trimmed before parsing.

**Rejected formats (throw):**
- Empty strings
- Strings with more than two decimal digits (e.g. `"1.234"`)
- Non-numeric input (e.g. `"abc"`, `"$1.00"`)
- Multiple decimal points

**Examples:**

```typescript
parseAmount("428.00")  // 42800
parseAmount("428")     // 42800
parseAmount("-1.50")   // -150
parseAmount("3.5")     // 350
parseAmount("0.99")    // 99
parseAmount("$1.00")   // throws Error: Not a valid amount: $1.00
parseAmount("1.234")   // throws Error: Not a valid amount: 1.234
```

**Side effects:** None.

---

### `splitEvenly(totalCents: number, n: number): number[]`

Splits a total amount (in cents) into `n` equal integer shares.

| Parameter     | Type     | Description                              |
|---------------|----------|------------------------------------------|
| `totalCents`  | `number` | Total amount in integer cents            |
| `n`           | `number` | Number of people/shares to split across  |

**Returns:** An array of `n` integers, each equal to
`Math.floor(totalCents / n)`.

**Known gap (documented in source):** Remainder cents are silently dropped.
When `totalCents` is not evenly divisible by `n`, the leftover cents (up to
`n - 1` cents) are lost from the total. For example:

```typescript
splitEvenly(100, 3)  // [33, 33, 33] — 1 cent is dropped, not distributed
```

The sum of the returned shares may be less than `totalCents`.

**Examples:**

```typescript
splitEvenly(300, 3)   // [100, 100, 100]
splitEvenly(100, 3)   // [33, 33, 33]  ← 1 cent dropped (known gap)
splitEvenly(1000, 4)  // [250, 250, 250, 250]
splitEvenly(101, 2)   // [50, 50]      ← 1 cent dropped (known gap)
```

**Side effects:** None.

**TODO / Open questions for maintainer:**
- Should remainder cents be distributed to one or more shares (e.g. first
  share gets the extra)? What rounding strategy is intended?
- Is there input validation needed for `n <= 0`? Division by zero or negative
  splits are not currently guarded against.

---

### `applyDiscount(cents: number, percent: number): number`

Applies a percentage discount to an integer cent amount, rounding to the
nearest cent.

| Parameter | Type     | Description                                            |
|-----------|----------|--------------------------------------------------------|
| `cents`   | `number` | Original price in integer cents                        |
| `percent` | `number` | Discount percentage in the range `0`–`100` (inclusive) |

**Returns:** Integer cents after the discount, rounded via `Math.round`.

**Formula:** `Math.round(cents * (1 - percent / 100))`

**Examples:**

```typescript
applyDiscount(1000, 10)   // 900   (10% off $10.00)
applyDiscount(1000, 0)    // 1000  (no discount)
applyDiscount(1000, 100)  // 0     (100% off)
applyDiscount(333, 10)    // 300   (Math.round(333 * 0.9) = Math.round(299.7) = 300)
applyDiscount(100, 33)    // 67    (Math.round(100 * 0.67) = 67)
```

**Side effects:** None.

**TODO / Open questions for maintainer:**
- No validation is performed on `percent`. Values outside `0`–`100` are not
  rejected: `percent > 100` produces a negative result, `percent < 0` inflates
  the amount. Should bounds be enforced?
- No validation on `cents` being non-negative. Behavior with negative cent
  inputs is mathematically consistent but may be semantically unexpected.

---

## Summary of additions / updates

| What | Notes |
|------|-------|
| Added parameter tables for all four functions | Derived from signatures and regex in source |
| Added return-value descriptions for all functions | Derived from implementation |
| Added throw behavior for `parseAmount` | Derived from regex guard and `throw new Error(...)` |
| Added runnable examples for all functions | Consistent with current APIs |
| Documented the known `splitEvenly` remainder gap | Already flagged in source comment |
| Flagged missing bounds validation in `applyDiscount` | Observed gap, not guessed |
| Flagged missing `n <= 0` guard in `splitEvenly` | Observed gap, not guessed |

## Open questions for the maintainer

1. **`splitEvenly` remainder strategy** — the current implementation silently
   drops up to `n - 1` cents. Is the intended fix to add the remainder to the
   first share, distribute it across leading shares, or return an error?

2. **`splitEvenly` with `n <= 0`** — division by zero (`n = 0`) and negative
   splits are not guarded. Should this throw?

3. **`applyDiscount` percent bounds** — should `percent` outside `[0, 100]`
   throw, clamp, or be left to the caller?

4. **`formatCents` with non-integer input** — behavior with fractional inputs
   like `formatCents(42.5)` is not explicitly guarded. `Math.floor` and `%`
   will produce a result, but it may not be meaningful. Should callers be
   expected to always pass integers?
