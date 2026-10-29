/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * Use cookbook prompts (tests, review, fix) to evolve this module — do not
 * hand-fix production behavior outside a structured prompt.
 *
 * @packageDocumentation
 */

/**
 * Format integer cents as a human-readable decimal string.
 *
 * @param cents - Amount in whole cents (finite integer; may be negative).
 * @returns String `"<whole>.<two-digit-cents>"`, with a leading `-` when negative.
 * @throws {Error} `cents must be a finite integer, got ${cents}` when `cents` is not a finite integer.
 * @example
 * formatCents(42800); // => "428.00"
 * @example
 * formatCents(5); // => "0.05"
 * @example
 * formatCents(-42800); // => "-428.00"
 * @example
 * formatCents(0); // => "0.00"
 */
export function formatCents(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error(`cents must be a finite integer, got ${cents}`);
  }
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a decimal amount string into integer cents.
 *
 * Accepts optional leading `-`, an integer part, and an optional fractional part
 * with one or two digits (e.g. `"428.00"`, `"12"`, `"12.5"`). Surrounding
 * whitespace is trimmed.
 *
 * @param input - Amount string in dollars/units, not cents.
 * @returns Amount in whole cents (negative when input has a `-` prefix).
 * @throws {Error} `Not a valid amount: ${input}` when the string does not match the expected pattern.
 * @example
 * parseAmount("428.00"); // => 42800
 * @example
 * parseAmount("12.5"); // => 1250
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
 * Split a total evenly across `n` shares, in integer cents.
 *
 * Each share is `floor(totalCents / n)` or one cent more; the first
 * `totalCents % n` shares receive the extra cent so the sum equals `totalCents`.
 * When `n` is `0`, returns `[]` and that sum guarantee does not apply.
 *
 * @param totalCents - Total amount in cents to distribute (non-negative finite integer).
 * @param n - Number of shares (non-negative integer; length of the returned array); `0` yields `[]`.
 * @returns Array of `n` integer-cent values (`[]` when `n` is `0`).
 * @throws {Error} `totalCents must be a finite integer, got ${totalCents}` when `totalCents` is not a finite integer.
 * @throws {Error} `n must be a finite integer, got ${n}` when `n` is not a finite integer.
 * @throws {Error} `totalCents must be non-negative, got ${totalCents}` when `totalCents` is negative.
 * @throws {Error} `n must be non-negative, got ${n}` when `n` is negative.
 * @example
 * splitEvenly(100, 3); // => [34, 33, 33]
 * @example
 * splitEvenly(100, 0); // => []
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (!Number.isInteger(totalCents)) {
    throw new Error(`totalCents must be a finite integer, got ${totalCents}`);
  }
  if (!Number.isInteger(n)) {
    throw new Error(`n must be a finite integer, got ${n}`);
  }
  if (totalCents < 0) {
    throw new Error(`totalCents must be non-negative, got ${totalCents}`);
  }
  if (n < 0) {
    throw new Error(`n must be non-negative, got ${n}`);
  }
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}

/**
 * Apply a percentage discount to an amount in cents.
 *
 * @param cents - Original amount in cents (finite integer).
 * @param percent - Discount percentage from 0 to 100 inclusive.
 * @returns Discounted amount in cents, rounded to the nearest cent.
 * @throws {Error} `cents must be a finite integer, got ${cents}` when `cents` is not a finite integer.
 * @throws {Error} `percent must be between 0 and 100, got ${percent}` when `percent` is out of range.
 * @example
 * applyDiscount(10000, 10); // => 9000
 */
export function applyDiscount(cents: number, percent: number): number {
  if (!Number.isInteger(cents)) {
    throw new Error(`cents must be a finite integer, got ${cents}`);
  }
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error(`percent must be between 0 and 100, got ${percent}`);
  }
  return Math.round(cents * (1 - percent / 100));
}
