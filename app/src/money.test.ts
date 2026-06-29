import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats negative amounts", () => {
    expect(formatCents(-42800)).toBe("-428.00");
    expect(formatCents(-5)).toBe("-0.05");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses a single fractional digit", () => {
    expect(parseAmount("12.5")).toBe(1250);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  12.50  ")).toBe(1250);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-12.50")).toBe(-1250);
  });

  it("throws on garbage input", () => {
    expect(() => parseAmount("not-a-number")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("12.345")).toThrow(/Not a valid amount/);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes remainder cents so shares sum to total", () => {
    expect(splitEvenly(100, 3)).toEqual([34, 33, 33]);
    const shares = splitEvenly(10, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(10);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("handles 0% and 100% boundaries", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("throws on invalid percent", () => {
    expect(() => applyDiscount(10000, 150)).toThrow(/Invalid discount percent/);
  });
});
