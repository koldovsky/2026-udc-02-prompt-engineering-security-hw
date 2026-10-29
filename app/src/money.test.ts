import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

// Smoke tests plus edge cases added via the cookbook "add tests" prompt:
// remainder cents, negatives, invalid/non-integer input, out-of-range discount.

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats negative amounts", () => {
    expect(formatCents(-42800)).toBe("-428.00");
  });

  it("rejects fractional cents", () => {
    expect(() => formatCents(10.5)).toThrow(/finite integer/i);
    expect(() => formatCents(-1.5)).toThrow(/finite integer/i);
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses a single fractional digit", () => {
    expect(parseAmount("12.5")).toBe(1250);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-12.50")).toBe(-1250);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  428.00  ")).toBe(42800);
  });

  it("throws on invalid input", () => {
    expect(() => parseAmount("abc")).toThrow(/Not a valid amount/);
  });
});


describe("splitEvenly", () => {
  it("distributes remainder cents to the first shares", () => {
    expect(splitEvenly(100, 3)).toEqual([34, 33, 33]);
  });

  it("splits evenly when there is no remainder", () => {
    expect(splitEvenly(90, 3)).toEqual([30, 30, 30]);
  });

  it("returns a single share when n is 1", () => {
    expect(splitEvenly(42800, 1)).toEqual([42800]);
  });

  it("returns all zeros when total is zero", () => {
    expect(splitEvenly(0, 4)).toEqual([0, 0, 0, 0]);
  });

  it("gives at most one extra cent per share when cents < n", () => {
    expect(splitEvenly(2, 5)).toEqual([1, 1, 0, 0, 0]);
  });

  it("puts a single cent into the first share only", () => {
    expect(splitEvenly(1, 3)).toEqual([1, 0, 0]);
  });

  it("returns an empty array when n is 0", () => {
    expect(splitEvenly(100, 0)).toEqual([]);
  });

  it("rejects negative totalCents", () => {
    expect(() => splitEvenly(-100, 3)).toThrow(/non-negative/i);
  });

  it("rejects fractional totalCents", () => {
    expect(() => splitEvenly(10.5, 2)).toThrow(/finite integer/i);
  });

  it("rejects fractional n", () => {
    expect(() => splitEvenly(100, 2.5)).toThrow(/finite integer/i);
  });

  it("rejects negative n", () => {
    expect(() => splitEvenly(100, -1)).toThrow(/n must be non-negative/i);
  });

  it("rejects non-numeric inputs", () => {
    expect(() => splitEvenly(Number.NaN, 3)).toThrow(/finite integer/i);
    expect(() => splitEvenly(100, Number.NaN)).toThrow(/finite integer/i);
    expect(() => splitEvenly(Number.POSITIVE_INFINITY, 3)).toThrow(/finite integer/i);
    expect(() => splitEvenly(100, Number.POSITIVE_INFINITY)).toThrow(/finite integer/i);
  });

  it("parts sum to the original total for positive amounts", () => {
    const total = 10007;
    const n = 8;
    const parts = splitEvenly(total, n);
    expect(parts.reduce((sum, part) => sum + part, 0)).toBe(total);
    expect(parts).toHaveLength(n);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("applies 0% discount", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  it("applies 100% discount", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds to the nearest cent", () => {
    expect(applyDiscount(95, 10)).toBe(86);
  });

  it("rejects negative percent", () => {
    expect(() => applyDiscount(10000, -1)).toThrow(/percent/i);
  });

  it("rejects percent above 100", () => {
    expect(() => applyDiscount(10000, 101)).toThrow(/percent/i);
  });

  it("rejects non-finite percent", () => {
    expect(() => applyDiscount(10000, NaN)).toThrow(/percent/i);
  });

  it("rejects fractional cents", () => {
    expect(() => applyDiscount(10.5, 10)).toThrow(/finite integer/i);
    expect(() => applyDiscount(-1.5, 0)).toThrow(/finite integer/i);
  });
});
