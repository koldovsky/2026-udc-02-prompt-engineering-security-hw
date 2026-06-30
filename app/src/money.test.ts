import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount, taxAmount, applyTax, calculateTax, toCents } from "./money.js";

// Minimal smoke tests — they pass. The cookbook "add tests" prompt should ADD
// the edge cases these intentionally skip (remainder cents, negatives, bad input,
// out-of-range discount).

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(toCents(42800))).toBe("428.00");
    expect(formatCents(toCents(5))).toBe("0.05");
  });

  it("formats negative cents", () => {
    expect(formatCents(toCents(-5))).toBe("-0.05");
  });

  it("formats zero", () => {
    expect(formatCents(toCents(0))).toBe("0.00");
  });

  it("formats a single cent", () => {
    expect(formatCents(toCents(1))).toBe("0.01");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses a negative string", () => {
    expect(parseAmount("-12.50")).toBe(-1250);
  });

  it("parses a single-digit decimal", () => {
    expect(parseAmount("5.5")).toBe(550);
  });

  it("parses whitespace-padded input", () => {
    expect(parseAmount("  10  ")).toBe(1000);
  });

  it("throws on alphabetic input", () => {
    expect(() => parseAmount("abc")).toThrow();
  });

  it("throws on too many decimal places", () => {
    expect(() => parseAmount("1.234")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(toCents(9000), 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes remainder so sum equals totalCents", () => {
    const shares = splitEvenly(toCents(1001), 3);
    const sum = shares.reduce((a, b) => a + b, 0);
    expect(sum).toBe(1001);
  });

  it("throws when n is zero", () => {
    expect(() => splitEvenly(toCents(1000), 0)).toThrow("positive integer");
  });

  it("throws when n is negative", () => {
    expect(() => splitEvenly(toCents(1000), -1)).toThrow("positive integer");
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(toCents(10000), 10)).toBe(9000);
  });

  it("0% discount leaves amount unchanged", () => {
    expect(applyDiscount(toCents(10000), 0)).toBe(10000);
  });

  it("100% discount returns zero", () => {
    expect(applyDiscount(toCents(10000), 100)).toBe(0);
  });

  it("throws when percent is above 100", () => {
    expect(() => applyDiscount(toCents(10000), 150)).toThrow("percent must be between 0 and 100");
  });

  it("throws when percent is negative", () => {
    expect(() => applyDiscount(toCents(10000), -10)).toThrow("percent must be between 0 and 100");
  });
});

describe("taxAmount", () => {
  it("calculates 20% tax", () => {
    expect(taxAmount(toCents(10000), 20)).toBe(2000);
  });

  it("0% tax returns zero", () => {
    expect(taxAmount(toCents(10000), 0)).toBe(0);
  });

  it("rounds to nearest cent", () => {
    // 10% of 333 cents = 33.3 → rounds to 33
    expect(taxAmount(toCents(333), 10)).toBe(33);
  });

  it("throws when cents is negative", () => {
    expect(() => taxAmount(toCents(-100), 10)).toThrow("cents must be non-negative");
  });

  it("throws when percent is above 100", () => {
    expect(() => taxAmount(toCents(10000), 150)).toThrow("percent must be between 0 and 100");
  });

  it("throws when percent is negative", () => {
    expect(() => taxAmount(toCents(10000), -5)).toThrow("percent must be between 0 and 100");
  });
});

describe("calculateTax", () => {
  it("calculateTax(1000, 0.2) → 200", () => {
    expect(calculateTax(toCents(1000), 0.2)).toBe(200);
  });

  it("calculateTax(999, 0.2) → 200 (Math.round(199.8))", () => {
    expect(calculateTax(toCents(999), 0.2)).toBe(200);
  });

  it("rate 0 returns 0", () => {
    expect(calculateTax(toCents(1000), 0)).toBe(0);
  });

  it("rate 1 returns full amount", () => {
    expect(calculateTax(toCents(1000), 1)).toBe(1000);
  });

  it("rounds down when fractional part < 0.5", () => {
    // 1000 * 0.333 = 333.0 → 333
    expect(calculateTax(toCents(1000), 0.333)).toBe(333);
  });

  it("throws RangeError for negative cents", () => {
    expect(() => calculateTax(toCents(-1), 0.2)).toThrow(RangeError);
  });

  it("throws RangeError for rate below 0", () => {
    expect(() => calculateTax(toCents(1000), -0.1)).toThrow(RangeError);
  });

  it("throws RangeError for rate above 1", () => {
    expect(() => calculateTax(toCents(1000), 1.1)).toThrow(RangeError);
  });
});

describe("applyTax", () => {
  it("adds 20% tax to amount", () => {
    expect(applyTax(toCents(10000), 20)).toBe(12000);
  });

  it("0% tax leaves amount unchanged", () => {
    expect(applyTax(toCents(10000), 0)).toBe(10000);
  });

  it("100% tax doubles the amount", () => {
    expect(applyTax(toCents(10000), 100)).toBe(20000);
  });

  it("sum equals original plus taxAmount", () => {
    const base = toCents(9999);
    const rate = 7;
    expect(applyTax(base, rate)).toBe(base + taxAmount(base, rate));
  });
});
