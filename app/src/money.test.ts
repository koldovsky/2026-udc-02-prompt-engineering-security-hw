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
  it("formats negative cents", () => {
    expect(formatCents(-150)).toBe("-1.50");
    expect(formatCents(-1)).toBe("-0.01");
  });
  it("formats exactly 100 cents", () => {
    expect(formatCents(100)).toBe("1.00");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });
  it("parses single-digit fraction", () => {
    expect(parseAmount("1.5")).toBe(150);
  });
  it("parses negative amount", () => {
    expect(parseAmount("-10.00")).toBe(-1000);
  });
  it("parses zero", () => {
    expect(parseAmount("0")).toBe(0);
  });
  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow("Not a valid amount");
  });
  it("throws on non-numeric input", () => {
    expect(() => parseAmount("abc")).toThrow("Not a valid amount");
  });
  it("throws on too many decimal places", () => {
    expect(() => parseAmount("12.345")).toThrow("Not a valid amount");
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });
  it("returns floor-divided shares when remainder exists (remainder dropped)", () => {
    // current behaviour: remainder cents are lost — splitEvenly(10, 3) → [3, 3, 3]
    expect(splitEvenly(10, 3)).toEqual([3, 3, 3]);
  });
  it("all shares are non-negative integers", () => {
    const shares = splitEvenly(7, 4);
    for (const s of shares) {
      expect(Number.isInteger(s)).toBe(true);
      expect(s).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });
  it("0% discount returns original amount", () => {
    expect(applyDiscount(5000, 0)).toBe(5000);
  });
  it("100% discount returns 0", () => {
    expect(applyDiscount(5000, 100)).toBe(0);
  });
  it("rounds fractional cents correctly", () => {
    expect(applyDiscount(3333, 15)).toBe(2833);
  });
  it("out-of-range percent does not throw", () => {
    expect(() => applyDiscount(10000, 150)).not.toThrow();
    expect(() => applyDiscount(10000, -10)).not.toThrow();
  });
});
