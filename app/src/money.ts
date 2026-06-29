/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/** Pad a 1–2 digit fraction segment to two digits for cent parsing. */
function padFractionDigits(frac: string): string {
  return frac.padEnd(2, "0");
}

/**
 * Format integer cents as a human-readable amount string.
 * @param cents - Amount in integer cents (may be negative).
 * @returns Formatted string with two decimal places, e.g. `"428.00"`.
 * @example
 * formatCents(42800); // "428.00"
 * formatCents(-5);    // "-0.05"
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
 * @param input - Amount like `"428.00"`, `"428"`, or `"12.5"` (whitespace trimmed).
 * @returns Integer cents.
 * @throws {Error} When the string is not a valid amount (`Not a valid amount: …`).
 * @example
 * parseAmount("428.00"); // 42800
 * parseAmount("-12.50"); // -1250
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(padFractionDigits(frac));
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Distributes remainder cents one at a time to the first shares.
 * @param totalCents - Total to split (integer cents).
 * @param n - Number of recipients (positive integer).
 * @returns Array of `n` integer-cent shares summing to `totalCents`.
 * @example
 * splitEvenly(100, 3); // [34, 33, 33]
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(`Invalid recipient count: ${n}`);
  }
  const base = Math.floor(totalCents / n);
  const remainder = totalCents - base * n;
  const shares = new Array(n).fill(base);
  for (let i = 0; i < remainder; i++) {
    shares[i] += 1;
  }
  return shares;
}

/**
 * Apply a percentage discount to integer cents, rounding to the nearest cent.
 * @param cents - Original amount in cents.
 * @param percent - Discount percentage from 0 to 100 inclusive.
 * @returns Discounted amount in cents.
 * @throws {Error} When `percent` is outside 0–100.
 * @example
 * applyDiscount(10000, 10); // 9000
 */
export function applyDiscount(cents: number, percent: number): number {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error(`Invalid discount percent: ${percent}`);
  }
  return Math.round(cents * (1 - percent / 100));
}
