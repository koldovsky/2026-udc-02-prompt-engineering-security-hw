import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

describe("formatCents", () => {
  it("formats a whole-dollar amount", () => {
    expect(formatCents(42800)).toBe("428.00");
  });

  it("formats a sub-dollar amount (< 10 cents)", () => {
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats an amount with a non-zero fractional part", () => {
    expect(formatCents(10099)).toBe("100.99");
  });

  it("formats zero cents", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats exactly 100 cents", () => {
    expect(formatCents(100)).toBe("1.00");
  });

  it("formats a two-digit fractional part that needs no padding", () => {
    expect(formatCents(1010)).toBe("10.10");
  });

  it("formats a negative amount", () => {
    expect(formatCents(-42800)).toBe("-428.00");
  });

  it("formats a negative sub-dollar amount", () => {
    expect(formatCents(-5)).toBe("-0.05");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal string", () => {
    expect(parseAmount("428.00")).toBe(42800);
  });

  it("parses a whole-number string (no decimal point)", () => {
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses a single fractional digit", () => {
    // "4.5" means 4 dollars and 5 dimes → 450 cents
    expect(parseAmount("4.5")).toBe(450);
  });

  it("parses a negative decimal string", () => {
    expect(parseAmount("-5.50")).toBe(-550);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  10.00  ")).toBe(1000);
  });

  it("parses zero", () => {
    expect(parseAmount("0")).toBe(0);
    expect(parseAmount("0.00")).toBe(0);
  });

  it("throws on alphabetic input", () => {
    expect(() => parseAmount("abc")).toThrow();
  });

  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow();
  });

  it("throws on multiple decimal points", () => {
    expect(() => parseAmount("1.2.3")).toThrow();
  });

  it("throws on three fractional digits", () => {
    // Amounts must have at most two decimal places
    expect(() => parseAmount("1.234")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("splits among a single recipient", () => {
    expect(splitEvenly(10000, 1)).toEqual([10000]);
  });

  it("returns an array of length n", () => {
    expect(splitEvenly(500, 4)).toHaveLength(4);
  });

  // NOTE: This test documents the expected correct behaviour.
  // The current implementation has a known bug: remainder cents are dropped,
  // so the shares do not always sum to the original total.
  // This test is intentionally failing to drive a future fix via a prompt.
  it("shares sum to the original total when the total is not cleanly divisible", () => {
    const shares = splitEvenly(1000, 3);
    const sum = shares.reduce((a, b) => a + b, 0);
    expect(sum).toBe(1000);
  });

  it("each share is within 1 cent of the base amount", () => {
    const shares = splitEvenly(1000, 3);
    const base = Math.floor(1000 / 3); // 333
    for (const share of shares) {
      expect(share).toBeGreaterThanOrEqual(base);
      expect(share).toBeLessThanOrEqual(base + 1);
    }
  });
});

describe("applyDiscount", () => {
  it("applies a 10% discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("applies a 25% discount", () => {
    expect(applyDiscount(1000, 25)).toBe(750);
  });

  it("applies a 50% discount", () => {
    expect(applyDiscount(200, 50)).toBe(100);
  });

  it("0% discount leaves the amount unchanged", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  it("100% discount results in 0 cents", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds to the nearest cent", () => {
    // 33% off 100 cents: 100 * (1 - 0.33) = 67.00 → 67
    expect(applyDiscount(100, 33)).toBe(67);
    // 10% off 5 cents: 5 * 0.9 = 4.5 → rounds to 5
    expect(applyDiscount(5, 10)).toBe(5);
  });

  // NOTE: These tests document the expected guarded behaviour.
  // The current implementation does not validate the range of `percent`.
  // Both tests are intentionally failing to drive a future fix via a prompt.
  it("throws when percent is greater than 100", () => {
    expect(() => applyDiscount(10000, 150)).toThrow();
  });

  it("throws when percent is negative", () => {
    expect(() => applyDiscount(10000, -10)).toThrow();
  });
});
