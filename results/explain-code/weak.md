# Code Explanation

This TypeScript module (`src/money.ts`) provides small utility functions for working with monetary amounts. Here's what each part does:

## Core Concept: Integer Cents

Instead of using floating-point numbers (like `4.28`), all amounts are stored as **integer cents** (like `428`). This avoids floating-point rounding errors that are common in financial calculations (e.g., `0.1 + 0.2 !== 0.3` in JavaScript).

---

## Functions

### `formatCents(cents: number): string`

Converts an integer cent value into a human-readable decimal string.

**Example:** `42800` → `"428.00"`, `-150` → `"-1.50"`

How it works:
1. Determines the sign (`-` or empty string).
2. Takes the absolute value.
3. Splits into whole dollars (`Math.floor(abs / 100)`) and fractional cents (`abs % 100`).
4. Pads the fractional part to always be 2 digits (e.g., `5` becomes `"05"`).

---

### `parseAmount(input: string): number`

Parses a decimal string like `"428.00"` or `"428"` back into integer cents.

**Example:** `"4.99"` → `499`, `"-1.50"` → `-150`

How it works:
1. Trims whitespace.
2. Uses a regex to validate and capture the sign, whole part, and optional fractional part.
3. Throws an error if the string doesn't match the expected format.
4. Pads the fractional part to 2 digits (e.g., `"9"` becomes `"90"` = 90 cents, not 9 cents).
5. Applies the sign.

---

### `splitEvenly(totalCents: number, n: number): number[]`

Splits a total amount evenly among `n` people, returning an array of `n` cent values.

**Example:** `splitEvenly(300, 3)` → `[100, 100, 100]`

**Known bug:** The comment in the code acknowledges a "correctness gap around remainder cents." If the total doesn't divide evenly, the remainder is silently dropped.

**Example of the bug:** `splitEvenly(301, 3)` → `[100, 100, 100]` (1 cent is lost instead of being distributed to one of the shares).

---

### `applyDiscount(cents: number, percent: number): number`

Applies a percentage discount (0–100) to a cent amount, rounding to the nearest cent.

**Example:** `applyDiscount(1000, 10)` → `900` (10% off $10.00)

How it works:
- Multiplies `cents` by `(1 - percent / 100)`.
- Rounds to the nearest integer cent using `Math.round`.

---

## Summary

| Function | Input | Output |
|---|---|---|
| `formatCents` | Integer cents | Decimal string |
| `parseAmount` | Decimal string | Integer cents |
| `splitEvenly` | Total cents + count | Array of cent shares |
| `applyDiscount` | Cents + percent | Discounted cents |

The module is intentionally simple and contains at least one known bug (`splitEvenly` discards remainder cents), which is meant to be found and fixed through code review or test prompts.
