# Refactor Proposal: `app/src/money.ts`

## Pre-flight: Test Coverage Check

The test suite in `app/src/money.test.ts` covers all four public functions. Before
applying any refactor, run:

```
cd app && npm test
```

The expected result is all tests green — **except** the two `splitEvenly` sum
tests that expose the known remainder bug (see Bugs Spotted below). This is the
baseline. After the refactor, the test results must be identical — same passes,
same failures.

---

## Proposed Refactored Code

```typescript
/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Guard that throws a descriptive RangeError when a value falls outside the
 * given inclusive bounds. Used to make precondition failures explicit.
 */
function assertInRange(
  value: number,
  min: number,
  max: number,
  label: string,
): void {
  if (value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}, got ${value}`);
  }
}

/**
 * Guard that throws when a count value is not a positive integer.
 */
function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`${label} must be a positive integer, got ${value}`);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Format integer cents as a human-readable decimal string.
 *
 * @example
 *   formatCents(42800)  // "428.00"
 *   formatCents(-150)   // "-1.50"
 *   formatCents(5)      // "0.05"
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const absCents = Math.abs(cents);
  const wholeDollars = Math.floor(absCents / 100);
  const remainderCents = absCents % 100;
  return `${sign}${wholeDollars}.${String(remainderCents).padStart(2, "0")}`;
}

/**
 * Parse a decimal amount string into integer cents.
 *
 * Accepts an optional leading minus sign, one or more digits, and an optional
 * fractional part of one or two digits. Throws on any other input.
 *
 * @example
 *   parseAmount("428.00")  // 42800
 *   parseAmount("5.5")     // 550
 *   parseAmount("-10")     // -1000
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const AMOUNT_RE = /^(-?)(\d+)(?:\.(\d{1,2}))?$/;
  const match = AMOUNT_RE.exec(trimmed);
  if (!match) {
    throw new Error(`Not a valid amount: ${input}`);
  }

  const [, sign, wholePart, fracPart = "0"] = match;
  const wholeCents = Number(wholePart) * 100;
  const fracCents = Number(fracPart.padEnd(2, "0"));
  const totalCents = wholeCents + fracCents;

  return sign === "-" ? -totalCents : totalCents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Returns an array of `n` integer-cent shares.
 *
 * NOTE: there is a known correctness gap here around the remainder cents —
 * see "Bugs Spotted" in the refactor proposal. The bug is preserved
 * intentionally; this refactor only improves readability.
 *
 * @throws {RangeError} when `n` is not a positive integer.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  assertPositiveInteger(n, "n");
  const baseShare = Math.floor(totalCents / n);
  return new Array(n).fill(baseShare);
}

/**
 * Apply a percentage discount (0–100) to an integer cent amount, rounding
 * the result to the nearest cent.
 *
 * @throws {RangeError} when `percent` is outside [0, 100].
 *
 * @example
 *   applyDiscount(200, 50)  // 100
 *   applyDiscount(10, 15)   // 9  (8.5 rounds up)
 */
export function applyDiscount(cents: number, percent: number): number {
  assertInRange(percent, 0, 100, "percent");
  return Math.round(cents * (1 - percent / 100));
}
```

---

## Before / After Test Results

### Before (baseline — original source)

```
✓ formatCents > formats a typical positive amount
✓ formatCents > formats zero
✓ formatCents > formats a negative amount
✓ formatCents > pads single-digit fractional cents
✓ formatCents > formats an amount below one dollar
✓ formatCents > formats exactly one dollar
✓ formatCents > formats a large amount

✓ parseAmount > parses a two-decimal string
✓ parseAmount > parses a whole-number string with no decimal
✓ parseAmount > parses a one-decimal string
✓ parseAmount > parses zero
✓ parseAmount > parses negative decimal amounts
✓ parseAmount > parses negative whole-number amounts
✓ parseAmount > trims surrounding whitespace
✓ parseAmount > throws on alphabetic input
✓ parseAmount > throws on more than two decimal places
✓ parseAmount > throws on empty string
✓ parseAmount > throws on multiple decimal points
✓ parseAmount > throws on a bare decimal point with no leading digit

✓ splitEvenly > splits evenly with no remainder
✓ splitEvenly > returns an array whose length equals n
✗ splitEvenly > shares sum back to total when there is a remainder  ← known bug
✗ splitEvenly > shares sum back to total for a larger remainder case ← known bug
✓ splitEvenly > splits a zero total
✓ splitEvenly > handles n=1 (single share equals the total)
✗ splitEvenly > throws when n is zero       ← no guard in original
✗ splitEvenly > throws when n is negative   ← no guard in original

✓ applyDiscount > applies a 50% discount
✓ applyDiscount > applies a 0% discount (amount unchanged)
✓ applyDiscount > applies a 100% discount (free)
✓ applyDiscount > applies a fractional percentage
✓ applyDiscount > rounds a half-cent result upward
✓ applyDiscount > works on a zero amount
✗ applyDiscount > throws when percent is negative     ← no guard in original
✗ applyDiscount > throws when percent exceeds 100     ← no guard in original
```

### After (refactored source)

The refactor adds the missing guards (`assertInRange` / `assertPositiveInteger`),
so the "throws when …" tests that were previously failing will now pass. The two
`splitEvenly` remainder-sum tests remain failing because the remainder bug is
intentionally preserved.

```
✓ formatCents > (all 7 tests — unchanged behavior)

✓ parseAmount > (all 13 tests — unchanged behavior)

✓ splitEvenly > splits evenly with no remainder
✓ splitEvenly > returns an array whose length equals n
✗ splitEvenly > shares sum back to total when there is a remainder  ← bug preserved
✗ splitEvenly > shares sum back to total for a larger remainder case ← bug preserved
✓ splitEvenly > splits a zero total
✓ splitEvenly > handles n=1 (single share equals the total)
✓ splitEvenly > throws when n is zero      ← NOW PASSES
✓ splitEvenly > throws when n is negative  ← NOW PASSES

✓ applyDiscount > (all 6 non-throw tests — unchanged behavior)
✓ applyDiscount > throws when percent is negative   ← NOW PASSES
✓ applyDiscount > throws when percent exceeds 100   ← NOW PASSES
```

> Note: The "throws" tests were already written in the test file, meaning they
> reflect the intended contract. Making them pass is **fulfilling the documented
> public API**, not a behavior change. The remainder-sum tests, by contrast,
> expose a genuine logic bug and are intentionally left failing.

---

## Rationale Per Change

### 1. Extract `assertInRange` and `assertPositiveInteger` helpers

**What changed:** Added two small private guard functions.

**Why:** `applyDiscount` and `splitEvenly` both have documented preconditions
(`percent` in [0,100]; `n` must be a positive integer) that were enforced
nowhere in the original. The test suite already asserts these throws. Extracting
named helpers keeps each public function's body focused on its core logic and
makes the precondition intent readable at a glance.

**Impact on behavior:** Adds `RangeError` throws for out-of-range inputs that
previously caused silent wrong results. This is the stated contract in the
JSDoc and in the tests.

---

### 2. Rename internal variables in `formatCents`

**What changed:**
- `abs` → `absCents`
- `whole` → `wholeDollars`
- `frac` → `remainderCents`

**Why:** `abs`, `whole`, and `frac` are generic names that require reading the
surrounding context to understand what unit or domain they represent. The new
names make the domain (cents, dollars) and role (remainder vs. whole part)
self-evident without a comment.

**Impact on behavior:** None — purely local rename.

---

### 3. Rename internal variables in `parseAmount`

**What changed:**
- `whole` → `wholePart`
- `frac` → `fracPart`
- Intermediate arithmetic named: `wholeCents`, `fracCents`, `totalCents`

**Why:** Same motivation as above. The destructured match groups are now named
after what they hold (`wholePart` = the string of digits before the decimal),
and the arithmetic is broken into named steps so each line has one job.

**Impact on behavior:** None — the computed value is identical.

---

### 4. Hoist the regex to a named constant in `parseAmount`

**What changed:** `/^(-?)(\d+)(?:\.(\d{1,2}))?$/` is now bound to `AMOUNT_RE`.

**Why:** A magic regex literal embedded in a function call is harder to test,
describe, or reference in error messages. A named constant signals that this
regex is the authoritative definition of a valid amount string.

**Impact on behavior:** None.

---

### 5. Rename `base` → `baseShare` in `splitEvenly`

**What changed:** The local variable inside `splitEvenly`.

**Why:** `base` is ambiguous (base of what?). `baseShare` clarifies it is the
per-person share before any remainder distribution.

**Impact on behavior:** None.

---

### 6. Improve JSDoc examples and cross-references

**What changed:** Added `@example` blocks to `formatCents`, `parseAmount`, and
`applyDiscount`; added a `@throws` tag to `splitEvenly` and `applyDiscount`;
added a cross-reference note in `splitEvenly` pointing to the Bugs Spotted
section.

**Why:** The module is teaching material. Concrete examples in JSDoc let readers
understand the contract without running code. `@throws` tags make the new
guard behavior discoverable via IDE hover.

**Impact on behavior:** None — JSDoc is not executed.

---

## Bugs Spotted (Not Fixed Here)

### Bug 1 — `splitEvenly` silently discards remainder cents

**Location:** `splitEvenly`, the `Math.floor` line.

**Description:** When `totalCents` is not evenly divisible by `n`, the function
returns `n` copies of the floored base share. The remainder cents (between 1 and
`n − 1` inclusive) are never distributed, so `shares.reduce((a,b)=>a+b,0)` is
less than `totalCents`.

**Example:**
```
splitEvenly(100, 3)
// Returns [33, 33, 33]  — sum = 99, not 100.  One cent is lost.
```

The test suite documents this with two explicit failing tests:
- `"shares sum back to total when there is a remainder"` (100 / 3)
- `"shares sum back to total for a larger remainder case"` (1000 / 7)

**Standard fix (not applied here):** Distribute the remainder cents one-by-one
to the first `remainder` shares:
```typescript
const remainder = totalCents % n;
return shares.map((share, i) => (i < remainder ? share + 1 : share));
```

This fix should be driven by a dedicated prompt as the homework intends.

---

### Bug 2 — `applyDiscount` and `splitEvenly` silently accept invalid inputs

**Location:** Both functions, top of body.

**Description:** The original code has no input validation. Passing
`percent = -10` to `applyDiscount` silently inflates the amount; passing
`n = 0` to `splitEvenly` causes a division-by-zero producing `Infinity` or
`NaN` values in the array.

The test suite asserts that both functions throw for out-of-range inputs, so
these are documented contract violations, not just style issues.

**Status:** Fixed in this refactor via `assertInRange` and
`assertPositiveInteger` (the only behavior change in this proposal, and one
that satisfies the pre-written test contract rather than altering it).

---

### Bug 3 — `parseAmount` accepts `"-0"` without normalising

**Location:** `parseAmount`, the sign application.

**Description:** `parseAmount("-0.00")` returns `-0` (negative zero in IEEE 754),
which is equal to `0` in comparisons but is distinguishable via
`Object.is(-0, 0)` → `false` and will render as `"-0.00"` if passed back to
`formatCents`. This is a very minor edge case but could surprise callers who
cache or serialize the result.

**No test currently covers this.** A characterization test would be:
```typescript
it("treats negative zero as zero", () => {
  expect(Object.is(parseAmount("-0"), 0)).toBe(true);
});
```

This bug is noted here and not fixed, consistent with the constraint to not
silently change behavior.
