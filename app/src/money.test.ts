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

  it("throws on non-integer cents", () => {
    expect(() => formatCents(150.7)).toThrow(/cents must be an integer/);
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes remainder cents so shares sum to the total", () => {
    const shares = splitEvenly(10000, 3);
    expect(shares).toEqual([3334, 3333, 3333]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(10000);
  });

  it("handles negative totals without losing cents", () => {
    const shares = splitEvenly(-10000, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-10000);
    expect(shares).toEqual([-3334, -3333, -3333]);
  });

  it("returns the whole total for n = 1", () => {
    expect(splitEvenly(777, 1)).toEqual([777]);
  });

  it("throws on non-positive or non-integer n", () => {
    expect(() => splitEvenly(100, 0)).toThrow(/n must be a positive integer/);
    expect(() => splitEvenly(100, -2)).toThrow(/n must be a positive integer/);
    expect(() => splitEvenly(100, 2.5)).toThrow(/n must be a positive integer/);
  });

  it("throws on non-integer totalCents", () => {
    expect(() => splitEvenly(100.5, 3)).toThrow(/totalCents must be an integer/);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("accepts the boundary percentages 0 and 100", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("throws on non-integer, out-of-range, or non-finite percent", () => {
    expect(() => applyDiscount(10000, 12.5)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, 33.333)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, -1)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, 101)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, NaN)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, Infinity)).toThrow(/percent must be an integer/);
    expect(() => applyDiscount(10000, -Infinity)).toThrow(/percent must be an integer/);
  });

  it("throws on non-integer cents", () => {
    expect(() => applyDiscount(150.7, 10)).toThrow(/cents must be an integer/);
  });
});
