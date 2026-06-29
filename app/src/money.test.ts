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

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats negative amounts", () => {
    expect(formatCents(-150)).toBe("-1.50");
    expect(formatCents(-5)).toBe("-0.05");
  });

  it("pads single-digit cent with leading zero", () => {
    expect(formatCents(101)).toBe("1.01");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-1.50")).toBe(-150);
    expect(parseAmount("-100")).toBe(-10000);
  });

  it("parses single-digit fractional part", () => {
    expect(parseAmount("1.5")).toBe(150);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  10.00  ")).toBe(1000);
  });

  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow("Not a valid amount");
  });

  it("throws on non-numeric and malformed input", () => {
    expect(() => parseAmount("abc")).toThrow("Not a valid amount");
    expect(() => parseAmount("1.2.3")).toThrow("Not a valid amount");
    expect(() => parseAmount("1.234")).toThrow("Not a valid amount");
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("no-remainder case: shares sum to total", () => {
    expect(splitEvenly(9000, 3).reduce((a, b) => a + b, 0)).toBe(9000);
  });

  it("returns n shares", () => {
    expect(splitEvenly(1000, 4)).toHaveLength(4);
  });

  it("sum of shares equals total — BUG remainder dropped", () => {
    const shares = splitEvenly(10, 3);
    // BUG: should be 10; remainder 1 cent is silently dropped
    expect(shares.reduce((a, b) => a + b, 0)).toBe(9);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("0% leaves amount unchanged", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  it("100% zeroes the amount", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds to nearest cent", () => {
    // 10001 * 0.9 = 9000.9 → rounds to 9001
    expect(applyDiscount(10001, 10)).toBe(9001);
  });

  it("percent > 100 produces negative result — no guard", () => {
    expect(applyDiscount(10000, 110)).toBeLessThan(0);
  });
});
