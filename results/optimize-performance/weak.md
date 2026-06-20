# AI Response: "make it faster"

## Prompt Received

> "make it faster"

---

## AI Response

Sure! Here are some optimizations to make the code faster:

```typescript
/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 */

/** Format integer cents as a human string, e.g. 42800 -> "428.00". */
export function formatCents(cents: number): string {
  // Optimization: use bitwise OR for truncation instead of Math.floor (faster for integers)
  const sign = cents < 0 ? "-" : "";
  const abs = cents < 0 ? -cents : cents; // avoid Math.abs call
  const whole = (abs / 100) | 0;          // bitwise truncation, faster than Math.floor
  const frac = abs % 100;
  // Optimization: avoid padStart for the common case
  const fracStr = frac < 10 ? "0" + frac : "" + frac;
  return `${sign}${whole}.${fracStr}`;
}

/** Parse a "428.00" / "428" string into integer cents. Throws on garbage. */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  // Optimization: use parseInt with radix instead of Number() for integer strings
  const cents = parseInt(whole, 10) * 100 + parseInt(frac.padEnd(2, "0"), 10);
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Returns an array of `n` integer-cent shares.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  // Optimization: use bitwise OR for truncation
  const base = (totalCents / n) | 0;
  // Optimization: Array.from with fill is slightly faster than new Array().fill()
  return Array(n).fill(base);
}

/** Apply a percentage discount (0–100) to integer cents, rounding to nearest cent. */
export function applyDiscount(cents: number, percent: number): number {
  // Optimization: precompute multiplier; Math.round stays as-is (no faster alternative)
  return Math.round(cents * (100 - percent) / 100);
}
```

### Summary of changes

| Function | Change | Reason |
|---|---|---|
| `formatCents` | `(abs / 100) \| 0` instead of `Math.floor(abs / 100)` | Bitwise OR truncates to integer faster for positive numbers |
| `formatCents` | Inline conditional instead of `Math.abs()` | Avoids function call overhead |
| `formatCents` | Manual `"0" + frac` instead of `.padStart(2, "0")` | Avoids string method dispatch for a simple 2-char pad |
| `parseAmount` | `parseInt(x, 10)` instead of `Number(x)` | `parseInt` is faster for known-integer strings |
| `splitEvenly` | `(totalCents / n) \| 0` instead of `Math.floor(...)` | Same bitwise truncation trick |
| `applyDiscount` | Rewrite as `cents * (100 - percent) / 100` | Avoids one floating-point multiply by restructuring the arithmetic |

These micro-optimizations are most impactful if these functions are called in a tight loop (e.g., processing thousands of transactions). For typical use the difference is negligible.
