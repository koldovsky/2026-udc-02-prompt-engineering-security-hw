import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

// Minimal smoke tests — they pass. The cookbook "add tests" prompt should ADD
// the edge cases these intentionally skip (remainder cents, negatives, bad input,
// out-of-range discount).

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  // Edge case (add-tests prompt): negative amounts keep the sign and pad cents.
  it("formats negative amounts", () => {
    expect(formatCents(-42800)).toBe("-428.00");
    expect(formatCents(-5)).toBe("-0.05");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  // Edge case (add-tests prompt): a signed value round-trips through cents.
  it("parses a negative decimal", () => {
    expect(parseAmount("-12.50")).toBe(-1250);
  });

  // Edge case (add-tests prompt): garbage input throws, not silently coerces.
  it("throws on invalid input", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  // Characterization (add-tests prompt): pins CURRENT behavior — when the total
  // does not divide evenly, the remainder cents are dropped (10 -> 3+3+3 = 9).
  // This documents the known gap without asserting a fix; see prompts/edge-cases.md.
  it("currently drops remainder cents on an uneven split", () => {
    const shares = splitEvenly(10, 3);
    expect(shares).toEqual([3, 3, 3]);
    const distributed = shares.reduce((a, b) => a + b, 0);
    expect(distributed).toBe(9); // 1 cent lost vs. the 10-cent total
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  // Edge case (add-tests prompt): boundary discounts behave as identity / zero.
  it("handles 0% and 100% boundaries", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
    expect(applyDiscount(10000, 100)).toBe(0);
  });
});
