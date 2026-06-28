/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 * Uses branded types (Cents, Percent) to catch type mistakes at compile time.
 */

/**
 * Branded type: an integer representing cents (not a float, not arbitrary number).
 * Use the cents() helper to safely construct Cents values.
 */
export type Cents = number & { readonly __cents: unique symbol };

/**
 * Branded type: a discount percentage (0–100).
 * Use the percent() helper to safely construct Percent values.
 */
export type Percent = number & { readonly __percent: unique symbol };

/**
 * Create a Cents value safely, validating it's a finite integer.
 * @param value — the number of cents (e.g., 42800 for $428.00)
 * @returns a validated Cents value
 * @throws if value is not an integer or not finite (NaN, Infinity)
 * @example
 * cents(42800)  // OK → Cents
 * cents(42.5)   // throws: "cents must be a finite integer"
 * cents(NaN)    // throws: "cents must be a finite integer"
 */
export function cents(value: number): Cents {
  if (!Number.isInteger(value) || !Number.isFinite(value)) {
    throw new Error(`cents must be a finite integer, got ${value}`);
  }
  return value as Cents;
}

/**
 * Create a Percent value safely, validating it's 0–100 and finite.
 * @param value — the discount percentage (0–100)
 * @returns a validated Percent value
 * @throws if value is < 0, > 100, or not finite
 * @example
 * percent(10)   // OK → Percent (10% discount)
 * percent(150)  // throws: "percent must be 0–100"
 * percent(NaN)  // throws: "percent must be 0–100"
 */
export function percent(value: number): Percent {
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`percent must be 0–100, got ${value}`);
  }
  return value as Percent;
}

/**
 * Format cents as a human-readable dollar string.
 * @param amount — the amount in cents (must be a Cents value created with cents(...))
 * @returns formatted string with dollar sign omitted (e.g., "428.00", "-0.05")
 * @throws if amount is not an integer or not finite
 * @example
 * formatCents(cents(42800))  // "428.00"
 * formatCents(cents(5))      // "0.05"
 * formatCents(cents(-5))     // "-0.05"
 */
export function formatCents(amount: Cents): string {
  if (!Number.isInteger(amount) || !Number.isFinite(amount)) {
    throw new Error(`formatCents expects integer cents, got ${amount}`);
  }
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${padFrac(frac)}`;
}

/** Format fractional cents (0–99) as two-digit string with zero-padding. */
function padFrac(frac: number): string {
  return String(frac).padStart(2, "0");
}

/**
 * Parse a dollar string into cents.
 * Accepts flexible formats: "12", "12.3", "12.30", "-0.05", etc.
 * Rejects: invalid formats, extra decimals, symbols, non-numeric input.
 * @param input — a dollar amount string (e.g., "428.00" or "428")
 * @returns validated Cents value
 * @throws if input is not a valid amount format
 * @example
 * parseAmount("428.00")  // 42800 (Cents)
 * parseAmount("12")      // 1200
 * parseAmount("-0.05")   // -5
 * parseAmount("12.345")  // throws: "Not a valid amount" (too many decimals)
 */
export function parseAmount(input: string): Cents {
  if (typeof input !== 'string') {
    throw new Error(`parseAmount expects a string, got ${typeof input}`);
  }
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const value = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return cents(sign === "-" ? -value : value);
}

/**
 * Split a total evenly across `n` people.
 * Returns an array of `n` Cents shares. Remainder cents are distributed to the first shares.
 * **Invariant:** sum of shares always equals totalCents (no lost cents, preserves sign).
 * **Note:** negative totalCents with large remainders may produce unexpected remainder distribution
 * (this is a known trade-off in the current implementation — document carefully).
 * @param totalCents — the total amount in cents to split
 * @param n — the number of people to split across
 * @returns array of n Cents values (in order)
 * @example
 * splitEvenly(cents(9000), 3)   // [3000, 3000, 3000] (each $30.00)
 * splitEvenly(cents(1000), 3)   // [334, 333, 333] (remainder 1 cent goes to first)
 * splitEvenly(cents(-1000), 3)  // [-334, -333, -333] (negative amounts work correctly)
 */
export function splitEvenly(totalCents: Cents, n: number): Cents[] {
  // Validate n: must be positive integer
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(`splitEvenly: n must be a positive integer, got ${n}`);
  }

  // Work with absolute value, then apply sign at the end
  const isNegative = totalCents < 0;
  const absTotal = Math.abs(totalCents);
  const base = Math.floor(absTotal / n);
  const remainder = absTotal % n;

  // Create shares: first `remainder` get (base + 1), the rest get base
  const shares: number[] = new Array(n).fill(base);
  for (let i = 0; i < remainder; i++) {
    shares[i] += 1;
  }

  // Apply sign and convert to branded Cents
  return shares.map(share => cents(isNegative ? -share : share));
}

/**
 * Apply a percentage discount to an amount, rounding to nearest cent.
 * @param amount — the original amount in cents
 * @param discount — the discount percentage (0–100)
 * @returns the discounted amount in cents, rounded to nearest cent
 * @throws if amount is not a finite integer, or discount is not 0–100 and finite
 * @example
 * applyDiscount(cents(10000), percent(10))  // 9000 (10% off $100 = $90)
 * applyDiscount(cents(105), percent(50))    // 53 (50% off $1.05 = $0.525 → $0.53)
 * applyDiscount(cents(10000), percent(0))   // 10000 (no discount)
 */
export function applyDiscount(amount: Cents, discount: Percent): Cents {
  // Validate amount is a finite integer
  if (!Number.isInteger(amount) || !Number.isFinite(amount)) {
    throw new Error(`amount must be a finite integer, got ${amount}`);
  }
  // Validate discount is in valid range [0, 100] and finite
  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    throw new Error(`discount must be 0–100, got ${discount}`);
  }
  const result = Math.round(amount * (1 - discount / 100));
  return cents(result);
}
