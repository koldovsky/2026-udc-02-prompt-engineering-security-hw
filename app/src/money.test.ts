import { describe, it, expect } from "vitest";
import {
  formatCents,
  parseAmount,
  splitEvenly,
  applyDiscount,
  cents,
  percent,
} from "./money.js";

describe("cents()", () => {
  it("creates a Cents branded value", () => {
    expect(cents(100)).toBe(100);
  });
});

describe("percent()", () => {
  it("creates a Percent branded value for valid range", () => {
    expect(percent(0)).toBe(0);
    expect(percent(50)).toBe(50);
    expect(percent(100)).toBe(100);
  });

  it("throws when value is out of [0, 100] range", () => {
    expect(() => percent(-1)).toThrow(/percent must be between 0 and 100/);
    expect(() => percent(101)).toThrow(/percent must be between 0 and 100/);
  });
});

describe("formatCents", () => {
  it("formats zero as '0.00'", () => {
    expect(formatCents(cents(0))).toBe("0.00");
  });

  it("formats positive whole amounts", () => {
    expect(formatCents(cents(42800))).toBe("428.00");
    expect(formatCents(cents(100))).toBe("1.00");
  });

  it("formats positive fractional amounts", () => {
    expect(formatCents(cents(1234))).toBe("12.34");
    expect(formatCents(cents(50))).toBe("0.50");
  });

  it("formats negative amounts with leading minus", () => {
    expect(formatCents(cents(-42800))).toBe("-428.00");
    expect(formatCents(cents(-1))).toBe("-0.01");
    expect(formatCents(cents(-100))).toBe("-1.00");
  });

  it("pads single-digit fractional with leading zero", () => {
    expect(formatCents(cents(1))).toBe("0.01");
    expect(formatCents(cents(9))).toBe("0.09");
    expect(formatCents(cents(101))).toBe("1.01");
  });
});

describe("parseAmount", () => {
  it("parses integer strings", () => {
    expect(parseAmount("0")).toBe(0);
    expect(parseAmount("12")).toBe(1200);
    expect(parseAmount("999")).toBe(99900);
  });

  it("parses decimal strings with two fractional digits", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("0.05")).toBe(5);
    expect(parseAmount("12.34")).toBe(1234);
  });

  it("parses single fractional digit and pads to two", () => {
    expect(parseAmount("1.5")).toBe(150);
    expect(parseAmount("0.3")).toBe(30);
  });

  it("parses negative values", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
    expect(parseAmount("-12")).toBe(-1200);
    expect(parseAmount("-0.05")).toBe(-5);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  42.00  ")).toBe(4200);
    expect(parseAmount(" 7 ")).toBe(700);
  });

  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow(/Not a valid amount/);
  });

  it("throws on alphabetic input", () => {
    expect(() => parseAmount("abc")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("twelve")).toThrow(/Not a valid amount/);
  });

  it("throws on more than two fractional digits", () => {
    expect(() => parseAmount("12.345")).toThrow(/Not a valid amount/);
  });

  it("throws on currency symbols or extra characters", () => {
    expect(() => parseAmount("$42.00")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("42.00€")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("1,000.00")).toThrow(/Not a valid amount/);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(cents(9000), 3)).toEqual([3000, 3000, 3000]);
    expect(splitEvenly(cents(400), 4)).toEqual([100, 100, 100, 100]);
  });

  it("distributes remainder cents to first shares", () => {
    const shares = splitEvenly(cents(1000), 3);
    expect(shares).toEqual([334, 333, 333]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
  });

  it("handles remainder of 2", () => {
    const shares = splitEvenly(cents(1001), 3);
    expect(shares).toEqual([334, 334, 333]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1001);
  });

  it("handles single person (no split)", () => {
    expect(splitEvenly(cents(500), 1)).toEqual([500]);
  });

  it("throws when n < 1", () => {
    expect(() => splitEvenly(cents(1000), 0)).toThrow(/n must be at least 1/);
    expect(() => splitEvenly(cents(1000), -1)).toThrow(/n must be at least 1/);
  });
});

describe("applyDiscount", () => {
  it("applies a standard percentage discount", () => {
    expect(applyDiscount(cents(10000), percent(10))).toBe(9000);
    expect(applyDiscount(cents(5000), percent(25))).toBe(3750);
  });

  it("applies 0% discount (no change)", () => {
    expect(applyDiscount(cents(10000), percent(0))).toBe(10000);
  });

  it("applies 100% discount (free)", () => {
    expect(applyDiscount(cents(10000), percent(100))).toBe(0);
  });

  it("rounds fractional cents to nearest integer", () => {
    expect(applyDiscount(cents(999), percent(10))).toBe(899);
    expect(applyDiscount(cents(1), percent(33))).toBe(1);
    expect(applyDiscount(cents(333), percent(1))).toBe(330);
  });

  it("works with negative amounts", () => {
    expect(applyDiscount(cents(-10000), percent(10))).toBe(-9000);
    expect(applyDiscount(cents(-500), percent(50))).toBe(-250);
  });
});
