import { describe, it, expect } from "vitest";
import {
  formatCents,
  parseAmount,
  splitEvenly,
  applyDiscount,
  cents,
  percent,
} from "./money.js";

describe("formatCents — edge cases", () => {
  it("handles MAX_SAFE_INTEGER without precision loss", () => {
    // MAX_SAFE_INTEGER = 9007199254740991 cents = 90071992547409.91
    const result = formatCents(cents(Number.MAX_SAFE_INTEGER));
    expect(result).toBe("90071992547409.91");
  });

  it("handles negative zero as '0.00'", () => {
    expect(formatCents(cents(-0))).toBe("0.00");
  });
});

describe("parseAmount — edge cases", () => {
  it("parses '0.00' correctly", () => {
    expect(parseAmount("0.00")).toBe(0);
  });

  it("parses leading zeros like '00.00' and '000'", () => {
    expect(parseAmount("00.00")).toBe(0);
    expect(parseAmount("000")).toBe(0);
    expect(parseAmount("007")).toBe(700);
  });

  it("throws on whitespace-only string", () => {
    expect(() => parseAmount(" ")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("   ")).toThrow(/Not a valid amount/);
  });

  it("throws on Unicode digit characters", () => {
    expect(() => parseAmount("١٢")).toThrow(/Not a valid amount/);
    expect(() => parseAmount("꩓꩔")).toThrow(/Not a valid amount/);
  });

  it("throws on very long string without hanging", () => {
    const longString = "1".repeat(1000);
    expect(() => parseAmount(longString)).not.toThrow();
    expect(parseAmount(longString)).toBeGreaterThan(0);
  });
});

describe("splitEvenly — edge cases", () => {
  it("splits zero cents among 5 people", () => {
    expect(splitEvenly(cents(0), 5)).toEqual([0, 0, 0, 0, 0]);
  });

  it("splits 1 cent among 3 people — one gets 1, rest get 0", () => {
    const shares = splitEvenly(cents(1), 3);
    expect(shares).toEqual([1, 0, 0]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1);
  });

  it("handles MAX_SAFE_INTEGER split by 2 without precision loss", () => {
    const total = Number.MAX_SAFE_INTEGER;
    const shares = splitEvenly(cents(total), 2);
    expect(shares[0] + shares[1]).toBe(total);
  });

  it("handles very large n (10000) without crashing", () => {
    const shares = splitEvenly(cents(500), 10000);
    expect(shares).toHaveLength(10000);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(500);
  });
});

describe("applyDiscount — edge cases", () => {
  it("returns 0 for zero cents with any discount", () => {
    expect(applyDiscount(cents(0), percent(0))).toBe(0);
    expect(applyDiscount(cents(0), percent(50))).toBe(0);
    expect(applyDiscount(cents(0), percent(100))).toBe(0);
  });

  it("handles fractional percent (0.1%)", () => {
    expect(applyDiscount(cents(10000), percent(0.1))).toBe(9990);
  });

  it("handles minimum amount with near-total discount", () => {
    expect(applyDiscount(cents(1), percent(99))).toBe(0);
  });
});

describe("percent() — edge cases", () => {
  it("accepts very small valid percentage", () => {
    expect(percent(0.001)).toBe(0.001);
  });

  it("accepts exact boundary values 0 and 100", () => {
    expect(percent(0)).toBe(0);
    expect(percent(100)).toBe(100);
  });

  it("throws on value slightly above 100", () => {
    expect(() => percent(100.0001)).toThrow(/percent must be between 0 and 100/);
  });

  it("throws on value slightly below 0", () => {
    expect(() => percent(-0.0001)).toThrow(/percent must be between 0 and 100/);
  });
});
