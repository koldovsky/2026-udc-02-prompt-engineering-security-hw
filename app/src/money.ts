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
 * Negative amounts are prefixed with a minus sign. The fractional part is
 * always two digits wide.
 *
 * @param cents - The amount in integer cents (positive or negative).
 * @returns A string representation formatted as `"<whole>.<frac>"`.
 *
 * @example
 * formatCents(10000);  // "100.00"
 * formatCents(42800);  // "428.00"
 * formatCents(5);      // "0.05"
 * formatCents(-199);   // "-1.99"
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a decimal money string into integer cents.
 *
 * Accepts optional sign, whole digits, and up to two fractional digits
 * (e.g. `"428"`, `"428.00"`, `"-3.5"`). Leading/trailing whitespace is
 * stripped before parsing.
 *
 * @param input - A string representing a monetary amount (e.g. `"428.00"`).
 * @returns The equivalent amount in integer cents.
 *
 * @throws {Error} If `input` does not match the expected decimal format.
 *
 * @example
 * parseAmount("100.00");  // 10000
 * parseAmount("428");     // 42800
 * parseAmount("-3.50");   // -350
 * parseAmount("0.99");    // 99
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return sign === "-" ? -cents : cents;
}

/** Private helper: throws if value is outside [min, max]. */
function validateRange(value: number, min: number, max: number, name: string): void {
  if (value < min || value > max) {
    throw new Error(`${name} must be between ${min} and ${max}, got ${value}`);
  }
}

/**
 * Split a total amount (in cents) as evenly as possible across `n` people.
 *
 * Because cents are integers, a perfect split is not always possible.
 * Remainder cents are distributed one-per-person to the first entries so that
 * the returned array always sums exactly to `totalCents`.
 *
 * @param totalCents - The total amount to split, in integer cents.
 * @param n - The number of people to split between. Must be a positive integer.
 * @returns An array of `n` integer-cent share values that sum to `totalCents`.
 *
 * @throws {Error} If `n` is less than or equal to 0.
 *
 * @example
 * splitEvenly(10000, 4);  // [2500, 2500, 2500, 2500]  ($25.00 each)
 * splitEvenly(10001, 3);  // [3334, 3334, 3333]         (remainder distributed to first 2)
 * splitEvenly(300, 1);    // [300]
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (n <= 0) throw new Error(`n must be a positive integer, got ${n}`);
  const base = Math.floor(totalCents / n);
  // JS `%` uses truncation (not floor), so for negative totalCents it yields a
  // negative remainder that makes the distribution loop a no-op. Computing the
  // remainder from base*n ensures it is always in [0, n-1].
  const remainder = totalCents - base * n;
  // Plain for-loop with a single pre-allocated array avoids the intermediate
  // ArrayLike object that Array.from({ length: n }, ...) creates on every call.
  // At ~50,000 calls/s with small n this eliminates a measurable GC allocation
  // per invocation while producing identical output.
  const shares: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    shares[i] = base + (i < remainder ? 1 : 0);
  }
  return shares;
}

/**
 * Apply a percentage discount to an amount in cents.
 *
 * The result is rounded to the nearest cent using `Math.round`.
 * A `percent` of `0` returns the original amount; `100` returns `0`.
 *
 * @param cents - The original price in integer cents (e.g. `10000` for $100.00).
 * @param percent - The discount percentage to apply, in the range [0, 100].
 * @returns The discounted price in integer cents.
 *
 * @throws {Error} If `percent` is outside the range [0, 100].
 *
 * @example
 * applyDiscount(10000, 20);   // 8000   ($100.00 - 20% = $80.00)
 * applyDiscount(10000, 0);    // 10000  (no discount)
 * applyDiscount(10000, 100);  // 0      (full discount)
 * applyDiscount(999, 10);     // 899    ($9.99 - 10% ≈ $8.99)
 */
export function applyDiscount(cents: number, percent: number): number {
  validateRange(percent, 0, 100, "Discount percent");
  return Math.round(cents * (1 - percent / 100));
}

/**
 * Apply a tax rate to an amount in cents and return the tax-inclusive total.
 *
 * The tax portion is rounded to the nearest cent using `Math.round` and then
 * added to the original amount. A `taxPercent` of `0` returns the original
 * amount unchanged.
 *
 * @param cents - The pre-tax price in integer cents (e.g. `10000` for $100.00).
 * @param taxPercent - The tax rate as a percentage in the range [0, 100].
 * @returns The tax-inclusive total in integer cents.
 *
 * @throws {Error} If `taxPercent` is outside the range [0, 100].
 *
 * @example
 * addTax(10000, 10);   // 11000  ($100.00 + 10% tax = $110.00)
 * addTax(10000, 0);    // 10000  (no tax)
 * addTax(10000, 100);  // 20000  (100% tax doubles the price)
 * addTax(999, 8);      // 1079   ($9.99 + 8% ≈ $10.79)
 */
export function addTax(cents: number, taxPercent: number): number {
  validateRange(taxPercent, 0, 100, "Tax percent");
  return cents + Math.round(cents * taxPercent / 100);
}
