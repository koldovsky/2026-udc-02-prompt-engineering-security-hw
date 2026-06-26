import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats negative amounts with a leading minus sign", () => {
    expect(formatCents(-1250)).toBe("-12.50");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("rejects malformed input", () => {
    expect(() => parseAmount("12.345")).toThrow("Not a valid amount: 12.345");
    expect(() => parseAmount("abc")).toThrow("Not a valid amount: abc");
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes a remainder to the earlier shares", () => {
    expect(splitEvenly(1000, 3)).toEqual([334, 333, 333]);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("rejects out-of-range percentages", () => {
    expect(() => applyDiscount(10000, -1)).toThrow("Discount percent must be between 0 and 100");
    expect(() => applyDiscount(10000, 101)).toThrow("Discount percent must be between 0 and 100");
  });
});
