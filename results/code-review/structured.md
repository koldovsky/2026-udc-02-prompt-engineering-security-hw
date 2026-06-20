# Code Review: app/src/money.ts

**Verdict: 3 bugs, 2 smells — do not merge yet.**

---

## Findings (most severe first)

---

### 1. [Correctness][High] app/src/money.ts:35–38 — `splitEvenly` silently discards remainder cents

**What's wrong.**
`Math.floor(totalCents / n)` truncates the integer division. The leftover
`totalCents % n` cents are never distributed. Every share array therefore sums
to less than `totalCents` whenever the total does not divide evenly.

```
splitEvenly(100, 3)  → [33, 33, 33]   // sum = 99, not 100
splitEvenly(1000, 7) → [142, 142, …]  // sum = 994, not 1000
```

The module comment at line 32–33 acknowledges this ("known correctness gap")
but does not guard against it — the function still returns silently wrong
results.

**Why it matters.**
Money is lost on every non-divisible split. In a billing context this is a
financial correctness bug, not a rounding policy.

**Minimal fix.**
Compute `remainder = totalCents % n` and add 1 cent to each of the first
`remainder` shares:

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}
```

**Tests that catch it.**
`money.test.ts:108–111` — "shares sum back to total when there is a remainder"
— already fails; the comment on line 107 even says `// FAILS: gets 99`.
`money.test.ts:113–116` — the 1000/7 case — also fails for the same reason.

---

### 2. [Correctness][High] app/src/money.ts:35 — `splitEvenly` does not guard against `n <= 0`

**What's wrong.**
When `n === 0`, `Math.floor(totalCents / 0)` is `Infinity` (or `NaN` for
`0/0`). `new Array(0).fill(...)` returns `[]` for `n === 0`, so no error is
thrown — the caller gets an empty array with no indication that the call was
invalid. For `n < 0`, `new Array(-3)` throws a `RangeError` with a message
that leaks an implementation detail ("Invalid array length"), which is
accidental rather than intentional.

**Why it matters.**
The test suite at lines 128–134 expects both cases to throw. With `n === 0` the
function currently returns `[]` silently instead of throwing, so those two
tests fail.

**Minimal fix.**
Add an explicit guard at the top of the function:

```typescript
if (!Number.isInteger(n) || n <= 0) {
  throw new RangeError(`n must be a positive integer, got ${n}`);
}
```

**Tests that catch it.**
`money.test.ts:128–130` — "throws when n is zero" — currently does NOT throw,
so this test fails.
`money.test.ts:132–134` — "throws when n is negative" — accidentally passes via
`RangeError` from `new Array(-3)`, but the behavior is incidental and would
break if the implementation changed.

---

### 3. [Correctness][Medium] app/src/money.ts:42–44 — `applyDiscount` does not validate its inputs

**What's wrong.**
The function accepts any `percent` value — negative numbers, values above 100,
`NaN`, `Infinity` — without throwing. With `percent = -10` the result is
`Math.round(cents * 1.10)`, which silently inflates the price. With
`percent = 200` the result is negative (a negative price).

**Why it matters.**
The test suite at lines 168–174 asserts that both cases throw, but the
implementation never throws. Those two tests fail.

**Minimal fix.**

```typescript
export function applyDiscount(cents: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new RangeError(`percent must be between 0 and 100, got ${percent}`);
  }
  return Math.round(cents * (1 - percent / 100));
}
```

**Tests that catch it.**
`money.test.ts:168–170` — "throws when percent is negative" — currently fails
(no throw).
`money.test.ts:172–174` — "throws when percent exceeds 100" — currently fails
(no throw).

---

### 4. [Input Validation][Low] app/src/money.ts:20–27 — `parseAmount` accepts negative zero and very large integers without comment

**Worth checking (not confirmed to be a defect, but worth noting).**

- `"-0"` matches the regex (`sign = "-"`, `whole = "0"`, result = `-0` in
  JavaScript). `formatCents(-0)` produces `"-0.00"`, which is surprising.
  Whether this is acceptable depends on domain requirements; it is not tested
  either way.
- `Number(whole) * 100` for a very large digit string will silently lose
  precision once the integer exceeds `Number.MAX_SAFE_INTEGER`. A 16-digit
  whole-number string already wraps. This is a concern for high-value amounts
  (e.g. balances in minor currencies). No guard or comment exists.

**Minimal check.**
Add a test for `parseAmount("-0")` to document the current behavior and decide
whether it should be normalised to `0`.

---

### 5. [Code Smell][Low] app/src/money.ts:35 — `splitEvenly` input type is too permissive

**What's wrong.**
Both `totalCents` and `n` are typed as `number`, but neither float inputs nor
non-integer `n` values (e.g. `splitEvenly(100, 2.5)`) are guarded or
documented. `Math.floor(100 / 2.5)` returns `40`, producing an array of
length `2` (because `new Array(2.5)` also truncates — actually it throws a
`RangeError` for non-integer `n`). The inconsistency between the two parameters
is a footgun.

**Minimal fix.**
The guard added for finding #2 (`Number.isInteger(n)`) already closes this.
Also consider checking `Number.isInteger(totalCents)` and documenting the
precondition explicitly in the JSDoc.

---

## Nits

- `app/src/money.ts:32` — The comment says "correctness gap"; "bug" is more
  accurate since the function's own contract ("Returns an array of `n`
  integer-cent shares") implies the shares should sum to the input total.
- `app/src/money.ts:10` — JSDoc example `42800 -> "428.00"` uses an ASCII
  arrow (`->`); the rest of the codebase uses `→` (line 51 in the test file).
  Minor inconsistency, cosmetic only.
- `app/src/money.test.ts:107` — Inline comment `// FAILS: gets 99` is helpful
  for homework context but should be removed before any production merge; it
  reads as a known-broken test left in the suite intentionally.
