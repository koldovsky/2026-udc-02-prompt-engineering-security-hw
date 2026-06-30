import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

// Smoke tests plus the edge cases the baseline intentionally skipped:
// remainder cents, negatives, bad input, out-of-range discount. Driven by the
// `add-tests` / `fix-bug` / `add-validation` cookbook prompts.

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats negatives", () => {
    expect(formatCents(-42800)).toBe("-428.00");
    expect(formatCents(-5)).toBe("-0.05");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses negatives and single-digit fractions", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
    expect(parseAmount("0.5")).toBe(50);
  });

  it("throws on garbage", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("1.234")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes remainder cents without losing any", () => {
    expect(splitEvenly(100, 3)).toEqual([34, 33, 33]);
    expect(splitEvenly(10, 4)).toEqual([3, 3, 2, 2]);
  });

  it("conserves the total for arbitrary inputs", () => {
    for (const [total, n] of [[101, 3], [9999, 7], [1, 5]] as const) {
      const shares = splitEvenly(total, n);
      expect(shares).toHaveLength(n);
      expect(shares.reduce((a, b) => a + b, 0)).toBe(total);
    }
  });

  it("handles negative totals symmetrically", () => {
    expect(splitEvenly(-100, 3)).toEqual([-34, -33, -33]);
    expect(splitEvenly(-100, 3).reduce((a, b) => a + b, 0)).toBe(-100);
  });

  it("rejects a non-positive or non-integer n", () => {
    expect(() => splitEvenly(100, 0)).toThrow();
    expect(() => splitEvenly(100, -2)).toThrow();
    expect(() => splitEvenly(100, 2.5)).toThrow();
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("handles the 0% and 100% boundaries", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds to the nearest cent", () => {
    expect(applyDiscount(999, 10)).toBe(899); // 999 * 0.9 = 899.1 -> 899
  });

  it("rejects an out-of-range or non-finite percent", () => {
    expect(() => applyDiscount(10000, -1)).toThrow();
    expect(() => applyDiscount(10000, 150)).toThrow();
    expect(() => applyDiscount(10000, NaN)).toThrow();
  });
});
