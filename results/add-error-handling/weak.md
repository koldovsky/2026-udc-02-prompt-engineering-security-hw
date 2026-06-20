# AI Response: "handle errors"

## Prompt sent to AI

**User message:** "handle errors"

**Code provided:** `src/money.ts` (money utility functions)

---

## AI Response

Here's the updated `money.ts` with error handling added:

```typescript
/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 */

/** Format integer cents as a human string, e.g. 42800 -> "428.00". */
export function formatCents(cents: number): string {
  if (typeof cents !== "number" || isNaN(cents)) {
    throw new Error("cents must be a valid number");
  }
  if (!Number.isInteger(cents)) {
    throw new Error("cents must be an integer");
  }
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/** Parse a "428.00" / "428" string into integer cents. Throws on garbage. */
export function parseAmount(input: string): number {
  if (typeof input !== "string") {
    throw new Error("input must be a string");
  }
  const trimmed = input.trim();
  if (trimmed === "") {
    throw new Error("input must not be empty");
  }
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Returns an array of `n` integer-cent shares.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (typeof totalCents !== "number" || isNaN(totalCents)) {
    throw new Error("totalCents must be a valid number");
  }
  if (!Number.isInteger(totalCents)) {
    throw new Error("totalCents must be an integer");
  }
  if (typeof n !== "number" || !Number.isInteger(n) || n <= 0) {
    throw new Error("n must be a positive integer");
  }
  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);
  return shares;
}

/** Apply a percentage discount (0–100) to integer cents, rounding to nearest cent. */
export function applyDiscount(cents: number, percent: number): number {
  if (typeof cents !== "number" || isNaN(cents)) {
    throw new Error("cents must be a valid number");
  }
  if (!Number.isInteger(cents)) {
    throw new Error("cents must be an integer");
  }
  if (typeof percent !== "number" || isNaN(percent)) {
    throw new Error("percent must be a valid number");
  }
  if (percent < 0 || percent > 100) {
    throw new Error("percent must be between 0 and 100");
  }
  return Math.round(cents * (1 - percent / 100));
}
```

**Changes made:**
- `formatCents`: validates that `cents` is a number, not NaN, and is an integer
- `parseAmount`: validates that `input` is a string and not empty before processing
- `splitEvenly`: validates `totalCents` is a valid integer and `n` is a positive integer (prevents division by zero)
- `applyDiscount`: validates both `cents` and `percent`, and ensures `percent` is in the valid 0–100 range

---

## Analysis of this "weak" prompt

The prompt **"handle errors"** is extremely vague. Problems with it:

1. **No specificity** — Which functions? Which error cases? What kinds of errors (runtime, type, business logic)?
2. **No output format** — Should errors be thrown, returned as result types, or logged?
3. **No context** — What environment does this run in? What error handling conventions does the project use?
4. **No severity guidance** — Should all inputs be validated, or only the risky ones?
5. **Ambiguous scope** — Does "handle errors" mean add guards, add try/catch, add logging, or something else?

The AI had to make many assumptions (throw errors, validate types, guard every function) that may not match the developer's intent. A stronger prompt would specify exactly which functions to update, what validations are needed, and how errors should be surfaced.
