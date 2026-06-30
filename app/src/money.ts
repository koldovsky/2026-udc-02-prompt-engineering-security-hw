/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/**
 * Format integer cents as a human-readable decimal string.
 *
 * @param cents - Amount in integer cents (may be negative for refunds/debits).
 * @returns Decimal string with exactly two fractional digits and a leading `-` for
 *   negative values.
 * @example
 * formatCents(42800)  // "428.00"
 * formatCents(5)      // "0.05"
 * formatCents(-500)   // "-5.00"
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a decimal amount string into integer cents.
 *
 * Accepts optional leading `-`, an integer part, and up to two fractional digits.
 * A single fractional digit is treated as tenths (`"1.5"` → `150`).
 *
 * @param input - Decimal string, e.g. `"428.00"`, `"428"`, `"-5.50"`, `"1.5"`.
 * @returns Integer cents equivalent of the input.
 * @throws {Error} If `input` does not match a valid amount pattern.
 * @example
 * parseAmount("428.00")  // 42800
 * parseAmount("-5.00")   // -500
 * parseAmount("1.5")     // 150
 * parseAmount("abc")     // throws Error
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total evenly across `n` people, returning `n` integer-cent shares.
 *
 * Each share is `Math.floor(totalCents / n)`. Remainder cents (`totalCents % n`)
 * are **silently discarded** — the shares do not always sum to `totalCents`.
 * This is a known limitation: for financial correctness, distribute remainder cents
 * to the first slots (not yet implemented).
 *
 * @param totalCents - Total amount in integer cents to split.
 * @param n - Number of recipients; must be a positive integer.
 * @returns Array of `n` integer-cent shares (each equal to `floor(totalCents / n)`).
 * @example
 * splitEvenly(9000, 3)  // [3000, 3000, 3000]  — sum equals totalCents ✓
 * splitEvenly(10, 3)    // [3, 3, 3]            — sum is 9, not 10 (known gap)
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (!Number.isInteger(n)) throw new TypeError(`n must be an integer, got ${n}`);
  if (n < 1) throw new RangeError(`n must be ≥ 1, got ${n}`);
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}

/**
 * Apply a percentage discount to an integer-cent amount, rounding to the nearest cent.
 *
 * The result is `Math.round(cents * (1 - percent / 100))`. No range validation is
 * performed on `percent` — callers are responsible for ensuring it is within 0–100.
 *
 * @param cents - Original price in integer cents (may be negative for refunds).
 * @param percent - Discount percentage. Expected range: 0–100 (inclusive).
 *   Values outside this range produce mathematically valid but logically wrong results.
 * @returns Discounted amount in integer cents, rounded to the nearest cent.
 * @example
 * applyDiscount(10000, 10)   // 9000  ($100 minus 10% = $90)
 * applyDiscount(10000, 100)  // 0
 * applyDiscount(10001, 33)   // 6701  (6700.67 rounds up)
 */
export function applyDiscount(cents: number, percent: number): number {
  if (percent < 0 || percent > 100) throw new RangeError(`percent must be 0–100, got ${percent}`);
  return Math.round(cents * (1 - percent / 100));
}
