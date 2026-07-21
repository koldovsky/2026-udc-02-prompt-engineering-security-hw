/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 */

/** Number of cents in one whole unit (e.g. dollar/hryvnia). */
const CENTS_PER_UNIT = 100;
/** Max fractional digits accepted by {@link parseAmount}. */
const MAX_FRACTION_DIGITS = 2;
/** Valid discount range (inclusive) accepted by {@link applyDiscount}. */
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;

/** Throws if `percent` is outside [MIN_PERCENT, MAX_PERCENT]. */
function assertPercentInRange(percent: number): void {
  if (!(percent >= MIN_PERCENT && percent <= MAX_PERCENT)) {
    throw new RangeError(
      `percent must be between ${MIN_PERCENT} and ${MAX_PERCENT}, got ${percent}`,
    );
  }
}

/** Throws if `n` is not a positive integer. */
function assertPositiveInteger(n: number, label: string): void {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError(`${label} must be a positive integer, got ${n}`);
  }
}

/**
 * Format integer cents as a human string, e.g. 42800 -> "428.00".
 *
 * @param cents - Signed integer number of cents.
 * @returns A `whole.frac` string; negative amounts get a leading `-`.
 */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / CENTS_PER_UNIT);
  const frac = abs % CENTS_PER_UNIT;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/**
 * Parse a "428.00" / "428" string into integer cents.
 *
 * Does NOT support thousands separators (e.g. "1,234.56") — that's an
 * intentional scope limit, not a bug; callers must strip them first.
 *
 * @param input - The amount as text, optionally signed, up to 2 decimals.
 * @returns The equivalent signed integer number of cents.
 * @throws {Error} If `input` doesn't match the expected shape.
 * @throws {RangeError} If the parsed value exceeds `Number.MAX_SAFE_INTEGER`.
 */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * CENTS_PER_UNIT + Number(frac.padEnd(MAX_FRACTION_DIGITS, "0"));
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError(`Amount out of safe integer range: ${input}`);
  }
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people, distributing any
 * remainder cents one-by-one across the first shares so the parts always
 * sum back to `totalCents` exactly.
 *
 * @param totalCents - Signed integer total to split.
 * @param n - Number of shares; must be a positive integer.
 * @returns An array of `n` integer-cent shares that sums to `totalCents`.
 * @throws {RangeError} If `n` is not a positive integer.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  assertPositiveInteger(n, "n");
  const base = Math.trunc(totalCents / n);
  const remainder = totalCents - base * n;
  const shares = new Array(n).fill(base);
  const step = remainder < 0 ? -1 : 1;
  for (let i = 0; i < Math.abs(remainder); i++) {
    shares[i] += step;
  }
  return shares;
}

/**
 * Apply a percentage discount to integer cents, rounding to the nearest cent.
 *
 * @param cents - Signed integer amount before discount.
 * @param percent - Discount percentage; must be within [0, 100].
 * @returns The discounted amount in integer cents.
 * @throws {RangeError} If `percent` is outside [0, 100].
 */
export function applyDiscount(cents: number, percent: number): number {
  assertPercentInRange(percent);
  return Math.round(cents * (1 - percent / MAX_PERCENT));
}

/**
 * Apply a percentage tax to integer cents, rounding to the nearest cent.
 *
 * @param cents - Signed integer amount before tax.
 * @param percent - Tax percentage; must be within [0, 100].
 * @returns The taxed amount in integer cents.
 * @throws {RangeError} If `percent` is outside [0, 100].
 */
export function applyTax(cents: number, percent: number): number {
  assertPercentInRange(percent);
  return Math.round(cents * (1 + percent / MAX_PERCENT));
}
