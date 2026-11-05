import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

// Minimal smoke tests — they pass. The cookbook "add tests" prompt should ADD
// the edge cases these intentionally skip (remainder cents, negatives, bad input,
// out-of-range discount).

/** Even-split contract: length n, integer shares, exact sum, spread of at most 1. */
function expectFairSplit(totalCents: number, n: number): void {
  const shares = splitEvenly(totalCents, n);
  expect(shares).toHaveLength(n);
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const share of shares) {
    expect(Number.isInteger(share)).toBe(true);
    sum += share;
    if (share < min) min = share;
    if (share > max) max = share;
  }
  expect(sum).toBe(totalCents);
  expect(max - min).toBeLessThanOrEqual(1);
}

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats zero cents as 0.00", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats a negative whole amount", () => {
    expect(formatCents(-42800)).toBe("-428.00");
  });

  it("formats a negative single-digit cent", () => {
    expect(formatCents(-5)).toBe("-0.05");
  });

  it("formats negative zero as 0.00", () => {
    expect(formatCents(-0)).toBe("0.00");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses a negative amount", () => {
    expect(parseAmount("-12.30")).toBe(-1230);
  });

  it("parses zero", () => {
    expect(parseAmount("0")).toBe(0);
  });

  it("parses one fraction digit", () => {
    expect(parseAmount("1.5")).toBe(150);
  });

  it("parses an amount surrounded by whitespace", () => {
    expect(parseAmount("  12.30  ")).toBe(1230);
  });

  it("throws on empty, letters, extra fraction digits, and a comma decimal", () => {
    expect(() => parseAmount("")).toThrow();
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("12.345")).toThrow();
    expect(() => parseAmount("428,00")).toThrow();
  });

  it("round-trips formatCents for zero, positive, and negative cents", () => {
    expect(parseAmount(formatCents(0))).toBe(0);
    expect(parseAmount(formatCents(42800))).toBe(42800);
    expect(parseAmount(formatCents(-1230))).toBe(-1230);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("returns the total as the only share when n is 1", () => {
    expect(splitEvenly(42800, 1)).toEqual([42800]);
  });

  it("splits a zero total into zero shares", () => {
    expect(splitEvenly(0, 3)).toEqual([0, 0, 0]);
  });

  it("distributes a non-divisible positive total across the shares", () => {
    expectFairSplit(100, 3);
  });

  it("distributes a negative total across the shares", () => {
    expectFairSplit(-100, 3);
  });

  it("splits a single cent into three integer shares summing to 1", () => {
    expectFairSplit(1, 3);
  });

  it("throws when n is 0", () => {
    expect(() => splitEvenly(100, 0)).toThrow();
  });

  it("throws when n is negative", () => {
    expect(() => splitEvenly(100, -1)).toThrow();
  });

  it("throws when n is not an integer", () => {
    expect(() => splitEvenly(100, 1.5)).toThrow();
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("leaves the amount unchanged at 0 percent", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  it("discounts the full amount at 100 percent", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds a half cent to the nearest cent", () => {
    expect(applyDiscount(1, 50)).toBe(1);
  });

  it("discounts a negative amount", () => {
    expect(applyDiscount(-100, 50)).toBe(-50);
  });

  it("throws when percent is below 0", () => {
    expect(() => applyDiscount(10000, -1)).toThrow();
  });

  it("throws when percent is above 100", () => {
    expect(() => applyDiscount(10000, 101)).toThrow();
  });

  it("throws when percent is not finite", () => {
    expect(() => applyDiscount(10000, Number.NaN)).toThrow();
    expect(() => applyDiscount(10000, Number.POSITIVE_INFINITY)).toThrow();
    expect(() => applyDiscount(10000, Number.NEGATIVE_INFINITY)).toThrow();
  });
});
