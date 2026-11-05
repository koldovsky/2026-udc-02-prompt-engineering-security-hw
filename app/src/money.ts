/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/**
 * Format integer cents as a dot-decimal string with two fraction digits.
 * Negative amounts get a leading "-"; `-0` formats as "0.00". Does not throw.
 *
 * @param cents - Amount in integer cents.
 * @returns The formatted amount, e.g. "428.00".
 * @example
 * formatCents(42800); // "428.00"
 * formatCents(5); // "0.05"
 * formatCents(-42800); // "-428.00"
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a dot-decimal amount ("428.00", "428", "1.5", "-12.30") into integer cents.
 * Surrounding whitespace is ignored; at most two fraction digits are accepted.
 *
 * @param input - The amount string to parse.
 * @returns The amount in integer cents.
 * @throws {Error} When the trimmed input does not match `/^(-?)(\d+)(?:\.(\d{1,2}))?$/`;
 *   the message includes the raw `input`.
 * @example
 * parseAmount("428.00"); // 42800
 * parseAmount("-12.30"); // -1230
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, wholeDigits, fractionDigits = "0"] = match;
  // A single fraction digit means tenths: "1.5" pads to "50" cents, not 5.
  const cents = Number(wholeDigits) * 100 + Number(fractionDigits.padEnd(2, "0"));
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Every share starts at `Math.floor(totalCents / n)`; the leftover remainder cents
 * are added one each to the first shares, so the shares sum to `totalCents` and
 * differ by at most 1 (also for negative totals).
 *
 * @param totalCents - Total amount in integer cents.
 * @param n - Number of shares; must be an integer of at least 1.
 * @returns An array of `n` integer-cent shares.
 * @throws {Error} When `n` is less than 1.
 * @throws {RangeError} From `new Array(n)` when `n` is not an integer.
 * @example
 * splitEvenly(9000, 3); // [3000, 3000, 3000]
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (n < 1) throw new Error("n must be at least 1");
  const base = Math.floor(totalCents / n);
  const remainder = totalCents - base * n;
  const shares = new Array(n).fill(base);
  for (let i = 0; i < remainder; i++) shares[i] = base + 1;
  return shares;
}

/**
 * Apply a percentage discount to integer cents, rounding with `Math.round`.
 *
 * @param cents - Amount in integer cents (may be negative).
 * @param percent - Discount percentage, a finite number from 0 to 100 inclusive.
 * @returns The discounted amount in integer cents.
 * @throws {Error} When `percent` is below 0, above 100, or not finite.
 * @example
 * applyDiscount(10000, 10); // 9000
 * applyDiscount(1, 50); // 1
 */
export function applyDiscount(cents: number, percent: number): number {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error("percent must be a finite number from 0 to 100");
  }
  return Math.round(cents * (1 - percent / 100));
}
