/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/** Integer cent value — branded to prevent mixing with plain numbers. */
export type Cents = number & { readonly __brand: "Cents" };

/** Cast a plain number to the Cents brand. Use only at validated boundaries. */
export function toCents(n: number): Cents {
  return n as Cents;
}

/**
 * Format integer cents as a human-readable string.
 *
 * @param cents - Integer cent value (positive or negative).
 * @returns Decimal string with exactly two fractional digits and a leading minus for negatives.
 * @example formatCents(42800)  // "428.00"
 * @example formatCents(-5)     // "-0.05"
 * @example formatCents(0)      // "0.00"
 */
export function formatCents(cents: Cents): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a decimal string into integer cents.
 *
 * @param input - Decimal string, optionally negative, up to two fractional digits. Whitespace is trimmed.
 * @returns Integer cent value.
 * @throws {Error} If `input` does not match the pattern `[-]digits[.digits(1-2)]`.
 * @example parseAmount("428.00")  // 42800
 * @example parseAmount("-12.50") // -1250
 * @example parseAmount("  10  ") // 1000
 */
export function parseAmount(input: string): Cents {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return (sign === "-" ? -cents : cents) as Cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 *
 * Remainder cents are distributed one at a time to the first shares, so the
 * sum of the result always equals `totalCents`.
 *
 * @param totalCents - Total amount in integer cents to split.
 * @param n - Number of shares (must be a positive integer).
 * @returns Array of `n` integer-cent shares that sum to `totalCents`.
 * @example splitEvenly(9000, 3)  // [3000, 3000, 3000]
 * @example splitEvenly(1001, 3)  // [334, 334, 333]
 */
export function splitEvenly(totalCents: Cents, n: number): Cents[] {
  if (!Number.isInteger(n) || n <= 0)
    throw new Error(`n must be a positive integer, got ${n}`);
  const base = Math.floor(totalCents / n);
  const r = totalCents % n;
  return Array.from({ length: n }, (_, i) => (base + (i < r ? 1 : 0)) as Cents);
}

/**
 * Apply a percentage discount to an integer-cent amount.
 *
 * @param cents - Original amount in integer cents.
 * @param percent - Discount percentage in the range 0–100.
 * @returns Discounted amount in integer cents, rounded to nearest cent.
 * @example applyDiscount(10000, 10)  // 9000
 * @example applyDiscount(10000, 0)   // 10000
 * @example applyDiscount(10000, 100) // 0
 */
export function applyDiscount(cents: Cents, percent: number): Cents {
  if (percent < 0 || percent > 100)
    throw new Error(`percent must be between 0 and 100, got ${percent}`);
  return Math.round(cents * (1 - percent / 100)) as Cents;
}

/**
 * Calculate the tax amount for an integer-cent value.
 *
 * @param cents - Original amount in integer cents (must be non-negative).
 * @param percent - Tax rate in the range 0–100.
 * @returns Tax amount in integer cents, rounded to nearest cent.
 * @example taxAmount(10000, 20)  // 2000  (20% of 100.00 = 20.00)
 * @example taxAmount(10000, 0)   // 0
 * @example taxAmount(333, 10)    // 33    (round(33.3) = 33)
 */
export function taxAmount(cents: Cents, percent: number): Cents {
  if (cents < 0)
    throw new Error(`cents must be non-negative, got ${cents}`);
  if (percent < 0 || percent > 100)
    throw new Error(`percent must be between 0 and 100, got ${percent}`);
  return Math.round(cents * (percent / 100)) as Cents;
}

/**
 * Calculate the VAT amount for an integer-cent price.
 *
 * Rate is expressed as a fraction, not a percentage: pass `0.2` for 20 % VAT.
 * Intermediate arithmetic stays in integer cents — no conversion to/from
 * a decimal currency representation.
 *
 * @param cents - Price in integer cents (must be ≥ 0).
 * @param rate  - Tax rate as a fraction in [0, 1] (e.g. `0.2` for 20 %).
 * @returns VAT amount in integer cents, rounded to nearest cent via `Math.round`.
 * @throws {RangeError} If `cents` is negative or `rate` is outside [0, 1].
 * @example calculateTax(1000, 0.2)  // 200
 * @example calculateTax(999,  0.2)  // 200  (Math.round(199.8) = 200)
 */
export function calculateTax(cents: Cents, rate: number): Cents {
  if (cents < 0)
    throw new RangeError(`cents must be non-negative, got ${cents}`);
  if (rate < 0 || rate > 1)
    throw new RangeError(`rate must be between 0 and 1, got ${rate}`);
  return Math.round(cents * rate) as Cents;
}

/**
 * Apply a tax rate to an integer-cent amount, returning the total with tax included.
 *
 * @param cents - Original amount in integer cents (must be non-negative).
 * @param percent - Tax rate in the range 0–100.
 * @returns Total amount (original + tax) in integer cents, rounded to nearest cent.
 * @example applyTax(10000, 20)  // 12000  (100.00 + 20% = 120.00)
 * @example applyTax(10000, 0)   // 10000
 * @example applyTax(10000, 100) // 20000
 */
export function applyTax(cents: Cents, percent: number): Cents {
  return (cents + taxAmount(cents, percent)) as Cents;
}
