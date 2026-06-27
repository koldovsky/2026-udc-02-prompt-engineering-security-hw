import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

describe("formatCents", () => {
  it("formats positive whole dollars", () => {
    expect(formatCents(42800)).toBe("428.00");
  });

  it("formats positive amounts with cents", () => {
    expect(formatCents(428050)).toBe("4280.50");
  });

  it("formats single digit cents with leading zero", () => {
    expect(formatCents(50)).toBe("0.50");
  });

  it("formats amounts less than one dollar", () => {
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats negative amounts with leading minus", () => {
    expect(formatCents(-100)).toBe("-1.00");
  });

  it("formats negative amounts with cents", () => {
    expect(formatCents(-42850)).toBe("-428.50");
  });

  it("formats negative single digit cents", () => {
    expect(formatCents(-5)).toBe("-0.05");
  });
});

describe("parseAmount", () => {
  it("parses standard dollar format with cents", () => {
    expect(parseAmount("428.00")).toBe(42800);
  });

  it("parses dollar format without decimal", () => {
    expect(parseAmount("428")).toBe(42800);
  });

  it("parses single decimal place", () => {
    expect(parseAmount("42.8")).toBe(4280);
  });

  it("parses zero", () => {
    expect(parseAmount("0")).toBe(0);
  });

  it("parses zero with decimals", () => {
    expect(parseAmount("0.00")).toBe(0);
  });

  it("parses amounts less than one dollar", () => {
    expect(parseAmount("0.05")).toBe(5);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
  });

  it("parses negative amounts without decimal", () => {
    expect(parseAmount("-428")).toBe(-42800);
  });

  it("trims whitespace before parsing", () => {
    expect(parseAmount("  428.00  ")).toBe(42800);
  });

  it("throws on non-numeric input", () => {
    expect(() => parseAmount("abc")).toThrow("Not a valid amount: abc");
  });

  it("throws on too many decimal places", () => {
    expect(() => parseAmount("428.999")).toThrow();
  });

  it("throws on invalid format with multiple dots", () => {
    expect(() => parseAmount("4.2.8")).toThrow();
  });

  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow();
  });

  it("throws on whitespace only", () => {
    expect(() => parseAmount("   ")).toThrow();
  });

  it("throws on text after number", () => {
    expect(() => parseAmount("428 dollars")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits evenly when divisible", () => {
    expect(splitEvenly(100, 2)).toEqual([50, 50]);
  });

  it("splits with single person", () => {
    expect(splitEvenly(100, 1)).toEqual([100]);
  });

  it("splits zero cents across multiple people", () => {
    expect(splitEvenly(0, 3)).toEqual([0, 0, 0]);
  });

  it("returns correct length array", () => {
    expect(splitEvenly(100, 5)).toHaveLength(5);
  });

  it("distributes base amount correctly", () => {
    const result = splitEvenly(200, 4);
    expect(result).toEqual([50, 50, 50, 50]);
  });

  it("exposes remainder bug: uneven split loses remainder", () => {
    const result = splitEvenly(100, 3);
    const sum = result.reduce((a, b) => a + b, 0);
    expect(sum).toBe(99);
    expect(result).toEqual([33, 33, 33]);
  });

  it("exposes remainder bug: larger amount with remainder", () => {
    const result = splitEvenly(1000, 3);
    const sum = result.reduce((a, b) => a + b, 0);
    expect(sum).toBe(999);
    expect(result).toEqual([333, 333, 333]);
  });

  it("exposes remainder bug: remainder of 1 cent", () => {
    const result = splitEvenly(10, 3);
    const sum = result.reduce((a, b) => a + b, 0);
    expect(sum).toBe(9);
  });

  it("exposes remainder bug: remainder of 2 cents", () => {
    const result = splitEvenly(101, 3);
    const sum = result.reduce((a, b) => a + b, 0);
    expect(sum).toBe(99);
  });

  it("handles negative total", () => {
    expect(splitEvenly(-100, 2)).toEqual([-50, -50]);
  });

  it("exposes remainder bug with negative amounts", () => {
    const result = splitEvenly(-100, 3);
    const sum = result.reduce((a, b) => a + b, 0);
    // Math.floor rounds down (toward negative infinity) for negatives: -100/3 = -33.33, floor = -34
    expect(sum).toBe(-102);
    expect(result).toEqual([-34, -34, -34]);
  });

  it("splits large amounts", () => {
    const result = splitEvenly(999999, 3);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(333333);
  });
});

describe("applyDiscount", () => {
  it("applies no discount when percent is 0", () => {
    expect(applyDiscount(100, 0)).toBe(100);
  });

  it("applies full discount when percent is 100", () => {
    expect(applyDiscount(100, 100)).toBe(0);
  });

  it("applies 50% discount", () => {
    expect(applyDiscount(100, 50)).toBe(50);
  });

  it("applies 10% discount", () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });

  it("rounds down correctly", () => {
    expect(applyDiscount(100, 33)).toBe(67);
  });

  it("rounds up correctly", () => {
    expect(applyDiscount(100, 34)).toBe(66);
  });

  it("applies discount to zero", () => {
    expect(applyDiscount(0, 50)).toBe(0);
  });

  it("applies discount to negative amounts", () => {
    expect(applyDiscount(-100, 10)).toBe(-90);
  });

  it("applies discount to small amounts", () => {
    expect(applyDiscount(5, 50)).toBe(3);
  });

  it("applies discount resulting in rounding", () => {
    expect(applyDiscount(3, 50)).toBe(2);
  });

  it("handles fractional percent results", () => {
    expect(applyDiscount(200, 15)).toBe(170);
  });

  it("applies 99% discount", () => {
    expect(applyDiscount(100, 99)).toBe(1);
  });
});
