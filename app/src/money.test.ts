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

  it("formats negatives", () => {
    expect(formatCents(-125)).toBe("-1.25");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses negative and padded values", () => {
    expect(parseAmount("-1.25")).toBe(-125);
    expect(parseAmount(" 7.5 ")).toBe(750);
  });

  it("throws on invalid input", () => {
    expect(() => parseAmount("12.345")).toThrow();
    expect(() => parseAmount("abc")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("returns the whole amount when there is one recipient", () => {
    expect(splitEvenly(1001, 1)).toEqual([1001]);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("rounds to the nearest cent", () => {
    expect(applyDiscount(105, 10)).toBe(95);
  });
});
