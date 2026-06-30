/**
 * Tiny money utilities — integer-cent helpers that avoid floating-point drift.
 *
 * Every amount in this module is an integer number of **cents**
 * (e.g. `42800` = $428.00).
 *
 * @module money
 */

import { logEntry, logExit } from "./logger.js";

/**
 * Format integer cents as a human-readable currency string.
 *
 * @param cents - Amount in integer cents (may be negative).
 * @returns A string in `"whole.ff"` format, e.g. `"428.00"`.
 *
 * @example
 * formatCents(42800); // "428.00"
 * formatCents(-5);    // "-0.05"
 * formatCents(0);     // "0.00"
 */
export function formatCents(cents: number): string {
  logEntry("formatCents", { cents });
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  const result = `${sign}${whole}.${String(frac).padStart(2, "0")}`;
  logExit("formatCents", result);
  return result;
}

/**
 * Parse a decimal currency string into integer cents.
 *
 * Accepts optional leading `-`, whole digits, and up to two fractional digits.
 * Leading/trailing whitespace is trimmed. Strings without a leading digit
 * (e.g. `".50"`) are rejected.
 *
 * @param input - A string like `"428.00"`, `"12"`, or `"-3.5"`.
 * @returns The amount in integer cents.
 * @throws {Error} If `input` does not match the expected format.
 *
 * @example
 * parseAmount("428.00"); // 42800
 * parseAmount("12");     // 1200
 * parseAmount("-3.5");   // -350
 */
export function parseAmount(input: string): number {
  logEntry("parseAmount", { input });
  const trimmed = input.trim();
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) throw new Error(`Not a valid amount: ${input}`);
  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  const result = sign === "-" ? -cents : cents;
  logExit("parseAmount", result);
  return result;
}

/**
 * Split a total evenly across `n` people.
 *
 * Remainder cents are distributed one each to the first shares so the
 * array always sums to exactly `totalCents`.
 *
 * @param totalCents - Total amount in integer cents.
 * @param n - Number of shares (must be a positive integer).
 * @returns An array of `n` integer-cent shares.
 *
 * @example
 * splitEvenly(9000, 3); // [3000, 3000, 3000]
 * splitEvenly(1000, 3); // [334, 333, 333]
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  logEntry("splitEvenly", { totalCents, n });
  const base = Math.floor(totalCents / n);
  const remainder = totalCents - base * n;
  const result = Array.from({ length: n }, (_, i) =>
    i < remainder ? base + 1 : base
  );
  logExit("splitEvenly", result);
  return result;
}

/**
 * Apply a percentage discount to an amount in integer cents.
 *
 * The result is rounded to the nearest cent. No validation is performed on
 * `percent` — values outside 0–100 will produce negative or inflated results.
 *
 * @param cents - Original amount in integer cents.
 * @param percent - Discount percentage (0–100 expected).
 * @returns The discounted amount in integer cents, rounded to nearest cent.
 *
 * @example
 * applyDiscount(10000, 10);  // 9000
 * applyDiscount(10000, 100); // 0
 */
export function applyDiscount(cents: number, percent: number): number {
  logEntry("applyDiscount", { cents, percent });
  const result = Math.round(cents * (1 - percent / 100));
  logExit("applyDiscount", result);
  return result;
}
