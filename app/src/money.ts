/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * This module is intentionally small and has at least one subtle bug for the
 * "review" / "tests" cookbook prompts to find. Do not "pre-fix" it by hand —
 * the homework is to drive the fix with a good prompt.
 */

/** Format integer cents as a human string, e.g. 42800 -> "428.00". */
export function formatCents(cents: number): string {
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
 * Returns an array of `n` integer-cent shares.
 *
 * NOTE: there is a known correctness gap here around the remainder cents.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const shares = new Array(n).fill(base);

  for (let i = 0; i < remainder; i += 1) {
    shares[i] += 1;
  }

  return shares;
}

/** Apply a percentage discount (0–100) to integer cents, rounding to nearest cent. */
export function applyDiscount(cents: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percent must be between 0 and 100");
  }

  return Math.round(cents * (1 - percent / 100));
}
