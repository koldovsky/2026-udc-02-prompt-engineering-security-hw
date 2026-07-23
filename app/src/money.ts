/**
 * Tiny money utilities — amounts are handled in integer cents to avoid floating-point drift.
 * Uses branded types (Cents, Percent) to prevent mixing cents with raw numbers at compile time.
 */

// --- Branded Types ---

export type Cents = number & { readonly __brand: "Cents" };
export type Percent = number & { readonly __brand: "Percent" };

/**
 * Construct a Cents value from a raw number.
 *
 * @param value - Integer number of cents.
 * @returns Branded Cents value.
 * @example
 * const price = cents(4280); // Cents
 */
export function cents(value: number): Cents {
  return value as Cents;
}

/**
 * Construct a Percent value from a raw number.
 *
 * @param value - Percentage between 0 and 100.
 * @returns Branded Percent value.
 * @throws {Error} If value is outside [0, 100].
 * @example
 * const discount = percent(10); // Percent
 */
export function percent(value: number): Percent {
  if (value < 0 || value > 100) throw new Error("percent must be between 0 and 100");
  return value as Percent;
}

// --- Internals ---

const DEBUG = typeof process !== "undefined" && process.env.DEBUG_MONEY === "1";

function log(level: "debug" | "warn", fn: string, data: Record<string, unknown>): void {
  if (!DEBUG) return;
  console[level](`[money:${fn}]`, JSON.stringify(data));
}

// Pre-computed two-digit strings "00"–"99" to avoid padStart in hot path.
const FRAC_LOOKUP: string[] = Array.from({ length: 100 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`
);

// --- Public API ---

/**
 * Format integer cents as a human-readable currency string.
 *
 * @param amount - Amount in branded Cents (negative for debits).
 * @returns Formatted string with two decimal places, e.g. "428.00".
 * @example
 * formatCents(cents(42800)); // "428.00"
 * formatCents(cents(-5));    // "-0.05"
 */
export function formatCents(amount: Cents): string {
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  // Bitwise truncate is faster but only safe for values within 32-bit range.
  const whole = abs < 0x80000000 ? (abs / 100) | 0 : Math.floor(abs / 100);
  const frac = abs - whole * 100;
  return `${sign}${whole}.${FRAC_LOOKUP[frac]}`;
}

/**
 * Parse a human-readable amount string into branded Cents.
 *
 * @param input - String representing an amount, e.g. "428.00", "12", "-3.5".
 *   Allows optional leading minus, integer part, and up to two fractional digits.
 * @returns Amount as branded Cents.
 * @throws {Error} If the input does not match a valid amount pattern.
 * @example
 * parseAmount("428.00"); // cents(42800)
 * parseAmount("1.5");    // cents(150)
 */
export function parseAmount(input: string): Cents {
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) {
    log("warn", "parseAmount", { input, error: "Not a valid amount" });
    throw new Error(`Not a valid amount: ${input}`);
  }
  const [, sign, whole, frac = "0"] = match;
  const value = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  const result = (sign === "-" ? -value : value) as Cents;
  log("debug", "parseAmount", { input, result });
  return result;
}

/**
 * Split a total evenly across n people, returning branded Cents shares.
 *
 * @param totalCents - Total amount as branded Cents.
 * @param n - Number of people to split among (must be >= 1).
 * @returns Array of n branded Cents shares whose sum equals totalCents.
 * @throws {Error} If n is less than 1.
 * @example
 * splitEvenly(cents(9000), 3); // [cents(3000), cents(3000), cents(3000)]
 * splitEvenly(cents(1000), 3); // [cents(334), cents(333), cents(333)]
 */
export function splitEvenly(totalCents: Cents, n: number): Cents[] {
  if (n < 1) throw new Error("n must be at least 1");
  const base = Math.floor(totalCents / n);
  const remainder = totalCents - base * n;
  const shares = new Array<Cents>(n);
  for (let i = 0; i < remainder; i++) {
    shares[i] = (base + 1) as Cents;
  }
  for (let i = remainder; i < n; i++) {
    shares[i] = base as Cents;
  }
  log("debug", "splitEvenly", n > 10
    ? { totalCents, n, first3: shares.slice(0, 3), sum: shares.reduce((a, b) => a + b, 0) }
    : { totalCents, n, shares });
  return shares;
}

/**
 * Apply a percentage discount to an amount in branded Cents.
 *
 * @param amount - Original amount as branded Cents (may be negative).
 * @param disc - Discount as branded Percent (0–100).
 * @returns Discounted amount as branded Cents, rounded to nearest cent.
 * @example
 * applyDiscount(cents(10000), percent(10)); // cents(9000)
 */
export function applyDiscount(amount: Cents, disc: Percent): Cents {
  if (disc === 0 || disc === 100) log("warn", "applyDiscount", { amount, disc, note: "boundary percent" });
  const result = Math.round(amount * (1 - disc / 100)) as Cents;
  log("debug", "applyDiscount", { amount, disc, result });
  return result;
}

/**
 * Add two Cents values safely, guarding against overflow.
 *
 * @param a - First amount as branded Cents.
 * @param b - Second amount as branded Cents.
 * @returns Sum as branded Cents.
 * @throws {Error} If the result overflows Number.MAX_SAFE_INTEGER.
 * @example
 * addCents(cents(100), cents(250)); // cents(350)
 */
export function addCents(a: Cents, b: Cents): Cents {
  const sum = a + b;
  if (sum > Number.MAX_SAFE_INTEGER || sum < Number.MIN_SAFE_INTEGER) {
    throw new Error("addCents: overflow");
  }
  log("debug", "addCents", { a, b, sum });
  return sum as Cents;
}
