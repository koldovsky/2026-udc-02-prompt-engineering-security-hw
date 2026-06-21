/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * All exported functions validate their inputs and throw on contract
 * violations (non-integer cents, non-positive split count, out-of-range
 * percent). The originally planted gaps (remainder cents in `splitEvenly`,
 * unvalidated `percent` in `applyDiscount`) were fixed via the cookbook prompts.
 */

/**
 * Format integer cents as a human string, e.g. 42800 -> "428.00".
 *
 * @param cents - amount in integer cents
 * @throws {Error} if `cents` is not an integer
 */
export function formatCents(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error(`cents must be an integer, got: ${cents}`);
  }
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/** Parse a "428.00" / "428" string into integer cents. Throws on garbage. */
export function parseAmount(input: string): number {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Returns an array of `n` integer-cent shares whose sum equals `totalCents`.
 *
 * The remainder cents are distributed deterministically: the first
 * `|totalCents| % n` shares receive one extra cent (in the direction of the
 * total's sign), so no cents are lost.
 *
 * @param totalCents - total amount in integer cents (may be negative)
 * @param n - number of shares; must be a positive integer
 * @returns array of `n` integer-cent shares summing to `totalCents`
 * @throws if `totalCents` is not an integer, or `n` is not a positive integer
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (!Number.isInteger(totalCents)) {
    throw new Error(`totalCents must be an integer, got: ${totalCents}`);
  }
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(`n must be a positive integer, got: ${n}`);
  }
  const sign = totalCents < 0 ? -1 : 1;
  const abs = Math.abs(totalCents);
  const base = Math.floor(abs / n);
  const remainder = abs % n;
  return Array.from({ length: n }, (_, i) =>
    sign * (base + (i < remainder ? 1 : 0)),
  );
}

/**
 * Apply a percentage discount to integer cents, rounding to the nearest cent.
 *
 * @param cents - amount in integer cents
 * @param percent - integer discount percentage in the inclusive range [0, 100]
 * @returns the discounted amount in integer cents
 * @throws {Error} if `cents` is not an integer, or `percent` is not an integer in [0, 100]
 */
export function applyDiscount(cents: number, percent: number): number {
  if (!Number.isInteger(cents)) {
    throw new Error(`cents must be an integer, got: ${cents}`);
  }
  if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
    throw new Error(`percent must be an integer in [0, 100], got: ${percent}`);
  }
  // Multiply before dividing: exact for integer percent, single rounding to cents.
  return Math.round((cents * (100 - percent)) / 100);
}
