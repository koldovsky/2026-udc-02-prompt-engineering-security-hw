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

  // negative amounts should render with a leading minus sign
  it("formats negative cents", () => {
    expect(formatCents(-100)).toBe("-1.00");
    expect(formatCents(-5)).toBe("-0.05");
  });

  // zero is a valid amount and must not show a minus sign
  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  // negative string amounts are valid (refunds)
  it("parses negative amounts", () => {
    expect(parseAmount("-5.00")).toBe(-500);
    expect(parseAmount("-0.01")).toBe(-1);
  });

  // single-digit fractional cent must be treated as tenths, not hundredths
  it("parses single-digit fractional cents", () => {
    expect(parseAmount("1.5")).toBe(150);
  });

  // garbage input must throw, not silently return NaN
  it("throws on non-numeric input", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("1.2.3")).toThrow();
    expect(() => parseAmount("")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  // remainder cents must be distributed to the first slots so shares always sum to totalCents
  it("distributes remainder cents to first slots", () => {
    expect(splitEvenly(10, 3)).toEqual([4, 3, 3]);
    expect(splitEvenly(10, 3).reduce((a, b) => a + b, 0)).toBe(10);
  });

  // single recipient must get the full total
  it("returns full total for n=1", () => {
    expect(splitEvenly(10000, 1)).toEqual([10000]);
  });

  // zero total should produce all-zero shares, not NaN
  it("handles zero total", () => {
    expect(splitEvenly(0, 3)).toEqual([0, 0, 0]);
  });

  // n=0 is nonsensical — must throw rather than return [] or divide-by-zero
  it("throws RangeError for n=0", () => {
    expect(() => splitEvenly(100, 0)).toThrowError(RangeError);
  });

  // negative n makes no sense as a recipient count
  it("throws RangeError for negative n", () => {
    expect(() => splitEvenly(100, -1)).toThrowError(RangeError);
  });

  // non-integer n would produce non-integer shares silently — must throw
  it("throws TypeError for non-integer n", () => {
    expect(() => splitEvenly(100, 1.5)).toThrowError(TypeError);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  // 0% discount must leave price unchanged
  it("0% discount returns original price", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  // 100% discount must reduce price to zero
  it("100% discount returns zero", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  // fractional result must round to the nearest cent
  it("rounds fractional cent results", () => {
    // 10000 * (1 - 33/100) = 6700 exactly; 10001 * 0.67 = 6700.67 → rounds to 6701
    expect(applyDiscount(10001, 33)).toBe(6701);
  });

  // discount on negative amount (refund scenario) should still reduce the magnitude
  it("applies discount to negative cents (refund)", () => {
    expect(applyDiscount(-10000, 10)).toBe(-9000);
  });

  // negative percent is nonsensical (would increase the price)
  it("throws RangeError for negative percent", () => {
    expect(() => applyDiscount(10000, -1)).toThrowError(RangeError);
  });

  // percent > 100 would produce negative price, which is nonsensical
  it("throws RangeError for percent > 100", () => {
    expect(() => applyDiscount(10000, 101)).toThrowError(RangeError);
  });
});
