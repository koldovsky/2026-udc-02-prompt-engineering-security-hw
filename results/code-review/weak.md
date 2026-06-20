# Code Review: src/money.ts

Here's a review of the code in `src/money.ts`.

## Overall Impression

The module is clean and well-structured. It's small, focused, and uses integer cents to avoid floating-point issues — a solid design choice. The code is readable and the intent of each function is clear.

---

## Function-by-Function Analysis

### `formatCents(cents: number): string`

**Looks good overall.** Handles negative values, correctly separates whole and fractional parts, and pads the fraction to two digits.

**Minor concern:** No validation that `cents` is an integer. If a float like `428.5` is passed in, `abs % 100` would yield `0.5`, and the output would be malformed (e.g., `"4.0.5"`). Consider adding a guard:

```typescript
if (!Number.isInteger(cents)) throw new Error("cents must be an integer");
```

---

### `parseAmount(input: string): number`

**Works correctly for valid inputs.** The regex handles optional decimal parts and signs appropriately.

**Potential issue — single-digit fractional part:** The regex allows `\d{1,2}` for the fraction. A value like `"4.5"` would match with `frac = "5"`, then `frac.padEnd(2, "0")` gives `"50"`, meaning `"4.5"` parses as 450 cents ($4.50). This is correct behavior, but it may surprise callers expecting `"4.5"` to mean 4.05. A comment clarifying the convention would help.

**No upper-bound validation:** Extremely large inputs (e.g., `"99999999999999.99"`) will parse without error but may lose precision due to JavaScript's number limits. This is unlikely to matter for a toy module but worth noting.

---

### `splitEvenly(totalCents: number, n: number): number[]`

**Bug: remainder cents are silently dropped.**

This is the known correctness gap mentioned in the JSDoc. When `totalCents` is not evenly divisible by `n`, the leftover cents are simply discarded.

Example:
```
splitEvenly(100, 3) // => [33, 33, 33]  (total = 99, not 100)
```

One cent is lost. The standard fix is to distribute the remainder cents to the first `r` shares:

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}
```

**Additional missing validations:**
- No guard against `n <= 0`. `splitEvenly(100, 0)` returns `[]` and `splitEvenly(100, -2)` returns `[]` silently — both are likely bugs.
- No guard against non-integer `n`.

---

### `applyDiscount(cents: number, percent: number): number`

**Works correctly for the happy path.** `Math.round` handles the rounding to nearest cent.

**Missing validation:**
- `percent` outside `[0, 100]` is accepted silently. A negative percent increases the amount; a percent > 100 produces a negative result. Both may be unintended.

Suggested guard:
```typescript
if (percent < 0 || percent > 100) throw new Error("percent must be between 0 and 100");
```

---

## Summary Table

| Function | Status | Issue |
|---|---|---|
| `formatCents` | Minor | No integer guard on input |
| `parseAmount` | Minor | Single-digit fraction behavior undocumented; no size limit |
| `splitEvenly` | **Bug** | Remainder cents are dropped; no guard for `n <= 0` |
| `applyDiscount` | Minor | No validation that percent is in [0, 100] |

---

## Priority Fix

The only correctness bug is in `splitEvenly` — the remainder cents are silently lost, meaning `sum(splitEvenly(total, n)) !== total` whenever `total % n !== 0`. This should be fixed before the module is used in any financial context.
