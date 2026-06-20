# Code Explanation: `app/src/money.ts`

## 1. Purpose

This module provides a small set of utilities for working with monetary values represented as **integer cents** (e.g., $4.28 → `428`), avoiding floating-point precision errors that arise when doing arithmetic on decimal dollar amounts directly.

---

## 2. How It Works

### `formatCents(cents: number): string`

Converts an integer cent value to a human-readable decimal string (e.g., `42800` → `"428.00"`).

**Flow:**
1. Determines the sign by checking `cents < 0`, storing `"-"` or `""`.
2. Takes the absolute value with `Math.abs(cents)`.
3. Extracts the whole-dollar portion via `Math.floor(abs / 100)`.
4. Extracts the fractional (sub-dollar) portion via `abs % 100`.
5. Left-pads the fractional portion to two digits using `.padStart(2, "0")` — ensures `5` becomes `"05"`, giving `"0.05"` rather than `"0.5"`.
6. Returns the assembled template literal.

**Example:** `formatCents(-305)` → sign `"-"`, abs `305`, whole `3`, frac `5` → `"-3.05"`.

---

### `parseAmount(input: string): number`

Parses a decimal string like `"428.00"` or `"428"` into integer cents. Throws an `Error` on any input that does not match the expected format.

**Flow:**
1. Trims surrounding whitespace from `input`.
2. Applies the regex `/^(-?)(\d+)(?:\.(\d{1,2}))?$/` to match:
   - Optional leading `-` (capture group 1: `sign`)
   - One or more digits for the whole part (capture group 2: `whole`)
   - Optional `.` followed by 1 or 2 digits (capture group 3: `frac`)
3. Throws `Error: Not a valid amount: ${input}` if no match.
4. Destructures the match. `frac` defaults to `"0"` if the decimal part was absent.
5. Right-pads `frac` to exactly 2 characters with `.padEnd(2, "0")` — so `"4"` becomes `"40"` (i.e., 40 cents, not 4).
6. Computes `cents = Number(whole) * 100 + Number(frac)`.
7. Negates if `sign === "-"`.

**Example:** `parseAmount("4.5")` → frac `"5"` → padEnd → `"50"` → `450` cents ($4.50). Correct.

---

### `splitEvenly(totalCents: number, n: number): number[]`

Splits a total cent amount across `n` people and returns an array of `n` integer shares.

**Flow:**
1. Computes `base = Math.floor(totalCents / n)` — the per-person floor share.
2. Creates an array of length `n` filled with `base` using `new Array(n).fill(base)`.
3. Returns the array.

**Known correctness gap (documented in the source):** The remainder cents — `totalCents % n` — are silently dropped. For example, `splitEvenly(100, 3)` returns `[33, 33, 33]` totaling `99` cents, not `100`. The missing cent is never allocated. The comment in the source explicitly flags this: `"NOTE: there is a known correctness gap here around the remainder cents."`

---

### `applyDiscount(cents: number, percent: number): number`

Reduces a cent amount by a given percentage, rounding to the nearest cent.

**Flow:**
1. Computes `cents * (1 - percent / 100)` — the discounted value as a float.
2. Wraps in `Math.round(...)` to return an integer cent value.

**Example:** `applyDiscount(999, 10)` → `999 * 0.9 = 899.1` → `Math.round` → `899`.

---

## 3. Edge Cases, Assumptions, and Gotchas

| Area | Detail |
|---|---|
| **`formatCents` with `0`** | `cents = 0`: sign is `""`, whole is `0`, frac is `0` → `"0.00"`. Correct. |
| **`formatCents` with non-integers** | The function accepts `number`, not `number & integer`. Passing `42800.7` would give `Math.floor(42800.7 / 100) = 428` and `42800.7 % 100 = 0.7`, then `String(0.7).padStart(2, "0")` → `"0.7"` → output `"428.0.7"`. The function has **no guard against non-integer input**. |
| **`parseAmount` with `".5"`** | The regex requires at least one digit before the decimal (`\d+`), so `".5"` does not match and throws. This is correct behavior for currency input. |
| **`parseAmount` with 3+ decimal digits** | `"1.234"` does not match (regex allows only `\d{1,2}` after the dot), so it throws rather than silently truncating. Safe. |
| **`splitEvenly` remainder** | As noted above, remainder cents are lost. For critical financial splits (e.g., splitting a bill so it reconciles exactly), this is a bug. The fix typically allocates the remainder cents to the first `remainder` slots. |
| **`splitEvenly` with `n = 0`** | Divides by zero: `Math.floor(x / 0)` returns `Infinity` or `NaN`. No guard exists. |
| **`splitEvenly` with negative `totalCents`** | `Math.floor` of a negative divided by positive will round toward negative infinity (e.g., `Math.floor(-10 / 3) = -4`), so shares would be `-4` each but the sum would be `-12` when total is `-10`. The remainder issue is amplified for negatives. |
| **`applyDiscount` with `percent` outside 0–100** | The doc comment says `0–100`, but there is no validation. `applyDiscount(100, 110)` returns `Math.round(100 * -0.1) = -10` — a negative amount from a "discount". No guard. |
| **`applyDiscount` with negative `cents`** | Mathematically works, but the semantics of a discount on a negative amount (e.g., a refund) may not be what callers expect. No documentation on this case. |
| **Integer assumption throughout** | All functions assume `cents` is an integer, but TypeScript's `number` type does not enforce this. There are no runtime `Number.isInteger()` checks. Callers can silently pass floats. |

---

## 4. Anything Suspicious Worth a Closer Look

1. **`splitEvenly` silently drops remainder cents.** This is the most impactful issue and is explicitly called out in the source comment as a "known correctness gap." Any test suite or review prompt should verify that `shares.reduce((a, b) => a + b, 0) === totalCents`. Currently it would fail for any `totalCents` not evenly divisible by `n`.

2. **No input validation on `n` in `splitEvenly`.** Division by zero (`n = 0`) and negative `n` (`n = -1`) are unhandled, producing `Infinity`/`NaN` or nonsensical results. A guard like `if (!Number.isInteger(n) || n <= 0) throw new Error(...)` is absent.

3. **`applyDiscount` has no bounds check on `percent`.** The contract says `0–100` but is unenforced. Values outside this range produce results that are likely incorrect for the caller's intent (negative amounts, or amounts larger than the original).

4. **`formatCents` can produce malformed output for float inputs.** The `% 100` of a float produces a float, and `String(float).padStart(2, "0")` does not produce a clean two-digit cent string. Since money modules are often integration points with external data sources (APIs, form inputs), a caller passing an unvalidated number could produce subtly broken output strings without any error being thrown.
