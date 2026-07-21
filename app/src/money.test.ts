import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount, applyTax } from "./money.js";

// Smoke tests (formats, parses, splits, discounts) plus the edge cases the
// original suite skipped: remainder cents, negatives, bad/oversized input,
// out-of-range discount, invalid n. Added by prompts/add-tests.md.

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats negative amounts with a leading minus", () => {
    expect(formatCents(-150)).toBe("-1.50");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("throws on garbage input", () => {
    expect(() => parseAmount("not-a-number")).toThrow();
    expect(() => parseAmount("12.345")).toThrow();
  });

  it("throws on thousands-separated input (documented limitation, not a bug)", () => {
    expect(() => parseAmount("1,234.56")).toThrow();
  });

  it("throws when the parsed value exceeds the safe integer range", () => {
    expect(() => parseAmount("999999999999999999")).toThrow(RangeError);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("distributes remainder cents so shares sum back to the total", () => {
    const shares = splitEvenly(9001, 3);
    expect(shares).toEqual([3001, 3000, 3000]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(9001);
  });

  it("distributes a negative remainder symmetrically", () => {
    const shares = splitEvenly(-9001, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-9001);
  });

  it("handles n = 1", () => {
    expect(splitEvenly(12345, 1)).toEqual([12345]);
  });

  it("rejects a non-positive or non-integer n", () => {
    expect(() => splitEvenly(1000, 0)).toThrow(RangeError);
    expect(() => splitEvenly(1000, -2)).toThrow(RangeError);
    expect(() => splitEvenly(1000, 1.5)).toThrow(RangeError);
  });

  it("always sums back to the total across a boundary table (add-boundary-tests.md)", () => {
    const cases: [number, number][] = [[9001, 3], [-9001, 3], [100, 7], [1, 1]];
    for (const [totalCents, n] of cases) {
      const shares = splitEvenly(totalCents, n);
      expect(shares.reduce((a, b) => a + b, 0)).toBe(totalCents);
    }
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("rejects a percent outside [0, 100]", () => {
    expect(() => applyDiscount(10000, -1)).toThrow(RangeError);
    expect(() => applyDiscount(10000, 101)).toThrow(RangeError);
  });
});

describe("applyTax", () => {
  it("applies a simple tax", () => {
    expect(applyTax(10000, 10)).toBe(11000);
  });

  it("rounds to the nearest cent", () => {
    expect(applyTax(999, 15)).toBe(1149);
  });

  it("is a no-op at 0%", () => {
    expect(applyTax(10000, 0)).toBe(10000);
  });

  it("rejects a percent outside [0, 100]", () => {
    expect(() => applyTax(10000, -1)).toThrow(RangeError);
    expect(() => applyTax(10000, 101)).toThrow(RangeError);
  });
});
