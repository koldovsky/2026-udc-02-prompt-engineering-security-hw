import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  // zero cents should render as "0.00"
  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  // negative amounts get a leading minus sign
  it("formats negative amounts", () => {
    expect(formatCents(-42800)).toBe("-428.00");
    expect(formatCents(-5)).toBe("-0.05");
  });

  // single-digit fractional part is zero-padded
  it("pads single-digit fractional part", () => {
    expect(formatCents(110)).toBe("1.10");
  });

  // large values stay accurate in integer-cent math
  it("formats large values", () => {
    expect(formatCents(99999999)).toBe("999999.99");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  // negative string prefix produces negative cents
  it("parses negative amounts", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
    expect(parseAmount("-12")).toBe(-1200);
  });

  // single fractional digit is treated as tenths (e.g. "0.1" → 10 cents)
  it("parses single fractional digit", () => {
    expect(parseAmount("0.1")).toBe(10);
    expect(parseAmount("5.5")).toBe(550);
  });

  // leading/trailing whitespace is trimmed
  it("trims whitespace", () => {
    expect(parseAmount("  100.00  ")).toBe(10000);
  });

  // non-numeric / malformed strings throw
  it("throws on garbage input", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("")).toThrow();
    expect(() => parseAmount("12.345")).toThrow(); // more than 2 decimal digits
  });

  // ".50" without a leading zero is rejected by the regex
  it("rejects amount without leading zero", () => {
    expect(() => parseAmount(".50")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  // remainder cents are distributed to the first R people (bug fix validation)
  it("distributes remainder cents correctly", () => {
    const shares = splitEvenly(1000, 3);
    // first person gets 334, others get 333
    expect(shares).toEqual([334, 333, 333]);
    // total must be preserved
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
  });

  // single person gets the entire amount
  it("handles n = 1", () => {
    expect(splitEvenly(999, 1)).toEqual([999]);
  });

  // each person gets 1 cent, remainder goes to first person
  it("handles more people than cents", () => {
    const shares = splitEvenly(3, 5);
    expect(shares).toEqual([1, 1, 1, 0, 0]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(3);
  });

  // zero total gives everyone zero
  it("handles zero total", () => {
    expect(splitEvenly(0, 3)).toEqual([0, 0, 0]);
  });

  // negative total distributes negative shares
  it("handles negative total", () => {
    const shares = splitEvenly(-1000, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-1000);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  // 0% discount returns the original amount
  it("applies 0% discount", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
  });

  // 100% discount returns zero
  it("applies 100% discount", () => {
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  // discount > 100% produces a negative result (no validation in current impl)
  it("returns negative for discount > 100%", () => {
    expect(applyDiscount(10000, 150)).toBe(-5000);
  });

  // negative percent effectively increases the price (no validation)
  it("returns higher amount for negative discount", () => {
    expect(applyDiscount(10000, -10)).toBe(11000);
  });

  // zero cents stays zero regardless of discount
  it("handles zero cents", () => {
    expect(applyDiscount(0, 50)).toBe(0);
  });

  // fractional cent result is rounded to nearest cent
  it("rounds fractional results to nearest cent", () => {
    expect(applyDiscount(1001, 10)).toBe(901);
    expect(applyDiscount(999, 33)).toBe(669);
  });
});
