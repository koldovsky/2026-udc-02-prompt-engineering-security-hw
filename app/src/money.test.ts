import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount, addTax } from "./money.js";

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
    expect(formatCents(-500)).toBe("-5.00");
  });
  it("pads single-digit fractional cents", () => {
    expect(formatCents(101)).toBe("1.01");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });
  it("trims leading and trailing whitespace", () => {
    expect(parseAmount("  12.50  ")).toBe(1250);
  });
  it("throws on non-numeric garbage", () => {
    expect(() => parseAmount("abc")).toThrow();
  });
  it("throws when more than 2 decimal places are given", () => {
    expect(() => parseAmount("1.123")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });
  it("splits n=1 returning the full total", () => {
    expect(splitEvenly(300, 1)).toEqual([300]);
  });
  it("distributes remainder cents so shares sum to the total", () => {
    // 1001 cents / 10 people: base share 100, remainder 1 cent must not be lost
    const shares = splitEvenly(1001, 10);
    const sum = shares.reduce((a, b) => a + b, 0);
    expect(sum).toBe(1001); // FAILS: current impl loses the remainder cent
  });
  it("throws when n is 0", () => {
    expect(() => splitEvenly(100, 0)).toThrow(); // FAILS: current impl returns []
  });
  it("negative total sums exactly to totalCents", () => {
    // JS % keeps the dividend's sign, so the old code gave remainder=-2 for
    // -10001 % 3, meaning the distribution loop never ran and shares summed to -10002.
    const shares = splitEvenly(-10001, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-10001);
  });
  it("negative total with remainder=1 distributes correctly", () => {
    // -10 / 3: base=-4, true remainder=2; first 2 shares are -3, last is -4
    const shares = splitEvenly(-10, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-10);
    expect(shares).toHaveLength(3);
  });
  it("negative total split 2 ways sums correctly", () => {
    const shares = splitEvenly(-1, 2);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-1);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });
  it("applies 0% discount leaving amount unchanged", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });
  it("applies 100% discount reducing amount to zero", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });
  it("throws when percent is negative", () => {
    expect(() => applyDiscount(10000, -10)).toThrow(); // FAILS: no range guard
  });
  it("throws when percent exceeds 100", () => {
    expect(() => applyDiscount(10000, 110)).toThrow(); // FAILS: no range guard
  });
});

describe("addTax", () => {
  it("adds a normal tax rate", () => {
    expect(addTax(10000, 20)).toBe(12000); // 100.00 + 20% = 120.00
  });
  it("adds 0% tax leaving amount unchanged", () => {
    expect(addTax(10000, 0)).toBe(10000);
  });
  it("adds 100% tax doubling the amount", () => {
    expect(addTax(10000, 100)).toBe(20000);
  });
  it("rounds to nearest cent", () => {
    expect(addTax(333, 10)).toBe(366); // 3.33 + 0.333 -> rounds to 0.33, total 3.66
  });
  it("throws when taxPercent is negative", () => {
    expect(() => addTax(10000, -5)).toThrow();
  });
  it("throws when taxPercent exceeds 100", () => {
    expect(() => addTax(10000, 101)).toThrow();
  });
});
