/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/**
 * Format integer cents as a human-readable currency string.
 *
 * Converts integer cents into a standard two-decimal-place string representation
 * suitable for display to end users. Handles both positive and negative amounts
 * with correct sign placement.
 *
 * @param cents - The amount in integer cents (e.g., 42800 for $428.00)
 * @returns A formatted string in "X.YY" format with leading minus for negatives
 *
 * @example
 * formatCents(42800)  // Returns "428.00"
 * formatCents(5)      // Returns "0.05"
 * formatCents(-100)   // Returns "-1.00"
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a human-readable currency string into integer cents.
 *
 * Accepts both decimal ("428.00") and whole ("428") number formats, handling
 * optional decimal places (0-2 digits) and optional leading minus sign. Trims
 * whitespace and validates strict format to prevent accidental parsing errors.
 *
 * @param input - A currency string (e.g., "428.00", "12", "-1.50")
 * @returns The equivalent amount in integer cents
 * @throws {Error} If the input format is invalid (non-numeric, >2 decimals, malformed)
 *
 * @example
 * parseAmount("428.00")  // Returns 42800
 * parseAmount("12")      // Returns 1200
 * parseAmount("-1.50")   // Returns -150
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
 * Split a total amount evenly across n recipients.
 *
 * Divides a total in cents into n equal integer-cent shares using floor division.
 * Each recipient receives the same base amount; any remainder cents are not
 * distributed. This function prioritizes simplicity over perfect distribution.
 *
 * **Known Limitation:** Remainder cents (when total % n !== 0) are lost in the
 * distribution. For example, splitting 100 cents across 3 people yields [33, 33, 33],
 * losing 1 cent. Consider a different strategy if remainder handling is critical.
 *
 * @param totalCents - The total amount to split, in integer cents
 * @param n - The number of recipients (must be >= 1)
 * @returns An array of exactly n integer amounts (in cents), each representing one share
 *
 * @example
 * splitEvenly(100, 2)  // Returns [50, 50]
 * splitEvenly(100, 3)  // Returns [33, 33, 33] — 1 cent lost
 * splitEvenly(0, 5)    // Returns [0, 0, 0, 0, 0]
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);
  return shares;
}

/**
 * Apply a percentage discount to an amount in cents.
 *
 * Calculates the discounted price by subtracting the specified percentage from
 * the original amount and rounding to the nearest cent. The result is always an
 * integer (no fractional cents). Works with both positive and negative amounts.
 *
 * @param cents - The original amount in integer cents
 * @param percent - The discount percentage (0–100, where 100 = 100% off)
 * @returns The discounted amount, rounded to the nearest integer cent
 *
 * @example
 * applyDiscount(10000, 10)  // Returns 9000 (10% off $100)
 * applyDiscount(100, 33)    // Returns 67 (33% off, rounded)
 * applyDiscount(100, 100)   // Returns 0 (100% discount)
 */
export function applyDiscount(cents: number, percent: number): number {
  return Math.round(cents * (1 - percent / 100));
}
