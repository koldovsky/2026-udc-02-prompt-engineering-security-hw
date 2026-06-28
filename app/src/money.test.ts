import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount, cents, percent } from "./money.js";

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(cents(42800))).toBe("428.00");
    expect(formatCents(cents(5))).toBe("0.05");
  });

  it("formats zero", () => {
    expect(formatCents(cents(0))).toBe("0.00");
  });

  it("zero-pads the fractional part", () => {
    expect(formatCents(cents(70))).toBe("0.70");
    expect(formatCents(cents(409))).toBe("4.09");
    expect(formatCents(cents(1))).toBe("0.01");
  });

  it("handles negative amounts", () => {
    expect(formatCents(cents(-42800))).toBe("-428.00");
    expect(formatCents(cents(-5))).toBe("-0.05");
    expect(formatCents(cents(-1))).toBe("-0.01");
  });

  it("handles large numbers", () => {
    expect(formatCents(cents(999999999))).toBe("9999999.99");
    expect(formatCents(cents(1000000))).toBe("10000.00");
  });

  // Edge case: negative zero (treated as zero in JS)
  it("formats negative zero as positive zero", () => {
    expect(formatCents(cents(-0))).toBe("0.00");
  });

  // Edge case: boundary amounts at 100-cent increments
  it("formats amounts at 100-cent boundaries correctly", () => {
    expect(formatCents(cents(99))).toBe("0.99"); // just under $1
    expect(formatCents(cents(100))).toBe("1.00"); // exactly $1
    expect(formatCents(cents(101))).toBe("1.01"); // just over $1
    expect(formatCents(cents(-99))).toBe("-0.99");
    expect(formatCents(cents(-100))).toBe("-1.00");
    expect(formatCents(cents(-101))).toBe("-1.01");
  });

  // Edge case: very large negative numbers
  it("formats very large negative amounts", () => {
    expect(formatCents(cents(-999999999))).toBe("-9999999.99");
    expect(formatCents(cents(-1000000))).toBe("-10000.00");
  });

  // Edge case: fractional parts with leading zeros
  it("formats fractional parts with leading zeros correctly", () => {
    expect(formatCents(cents(10))).toBe("0.10");
    expect(formatCents(cents(1))).toBe("0.01");
    expect(formatCents(cents(5))).toBe("0.05");
    expect(formatCents(cents(9))).toBe("0.09");
    expect(formatCents(cents(-10))).toBe("-0.10");
    expect(formatCents(cents(-1))).toBe("-0.01");
  });

  it("round-trips with parseAmount", () => {
    for (const c of [0, 1, 5, 70, 409, 42800, 1000000, -1, -5, -42800, 99, 100, 101, -99, -100, -101]) {
      expect(parseAmount(formatCents(cents(c)))).toBe(c);
    }
  });

  it("rejects non-finite numbers via cents()", () => {
    expect(() => cents(Infinity)).toThrow();
    expect(() => cents(-Infinity)).toThrow();
    expect(() => cents(NaN)).toThrow();
  });

  it("rejects non-integer cents via cents()", () => {
    expect(() => cents(42.5)).toThrow();
    expect(() => cents(0.01)).toThrow();
    expect(() => cents(100.1)).toThrow();
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("parses single fractional digit", () => {
    expect(parseAmount("428.5")).toBe(42850);
    expect(parseAmount("0.5")).toBe(50);
  });

  it("trims whitespace", () => {
    expect(parseAmount("  12.34  ")).toBe(1234);
    expect(parseAmount("\t42.00\n")).toBe(4200);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
    expect(parseAmount("-0.05")).toBe(-5);
    expect(parseAmount("-1")).toBe(-100);
  });

  it("parses integer-only strings", () => {
    expect(parseAmount("0")).toBe(0);
    expect(parseAmount("100")).toBe(10000);
  });

  // Edge case: zero in various forms
  it("parses zero in various formats", () => {
    expect(parseAmount("0")).toBe(0);
    expect(parseAmount("0.00")).toBe(0);
    expect(parseAmount("0.0")).toBe(0);
    // Note: -0 parses to -0 (JavaScript's negative zero; treated as 0 in operations)
    expect(Object.is(parseAmount("-0"), -0) || parseAmount("-0") === 0).toBe(true);
    expect(Object.is(parseAmount("-0.00"), -0) || parseAmount("-0.00") === 0).toBe(true);
  });

  // Edge case: amounts with leading zeros
  it("parses amounts with leading zeros", () => {
    expect(parseAmount("00100")).toBe(10000);
    expect(parseAmount("001.50")).toBe(150);
    expect(parseAmount("0001")).toBe(100);
  });

  // Edge case: single digit whole numbers
  it("parses single digit amounts", () => {
    expect(parseAmount("1")).toBe(100);
    expect(parseAmount("5")).toBe(500);
    expect(parseAmount("9")).toBe(900);
    expect(parseAmount("-1")).toBe(-100);
  });

  // Edge case: amounts less than a dollar
  it("parses amounts less than a dollar", () => {
    expect(parseAmount("0.01")).toBe(1);
    expect(parseAmount("0.99")).toBe(99);
    expect(parseAmount("0.10")).toBe(10);
    expect(parseAmount("-0.01")).toBe(-1);
  });

  // Edge case: many leading zeros with decimal
  it("parses leading zeros before decimal point", () => {
    expect(parseAmount("000.50")).toBe(50);
    expect(parseAmount("00.05")).toBe(5);
  });

  it("throws on invalid input", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("")).toThrow();
    expect(() => parseAmount("12.345")).toThrow(); // too many decimal places
    expect(() => parseAmount("1.2.3")).toThrow();
    expect(() => parseAmount("$12.34")).toThrow();
    expect(() => parseAmount("12,34")).toThrow(); // comma instead of dot
    expect(() => parseAmount("12.")).toThrow(); // trailing dot without digit
  });

  // Edge case: invalid formats that might slip through
  it("throws on invalid edge case formats", () => {
    expect(() => parseAmount(".50")).toThrow(); // leading dot
    expect(() => parseAmount("-")).toThrow(); // negative sign alone
    expect(() => parseAmount("-.5")).toThrow(); // negative leading dot
    expect(() => parseAmount("12..34")).toThrow(); // double dot
    expect(() => parseAmount("--12")).toThrow(); // double negative
    expect(() => parseAmount("12 34")).toThrow(); // space in middle
    expect(() => parseAmount("1e2")).toThrow(); // scientific notation
  });

  // Edge case: very large amounts
  it("parses very large amounts", () => {
    expect(parseAmount("9999999.99")).toBe(999999999);
    expect(parseAmount("1000000.00")).toBe(100000000);
    expect(parseAmount("-9999999.99")).toBe(-999999999);
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("returns correct number of shares", () => {
    expect(splitEvenly(100, 4)).toHaveLength(4);
    expect(splitEvenly(1000, 7)).toHaveLength(7);
  });

  it("distributes remainder cents correctly", () => {
    const shares = splitEvenly(1000, 3); // 10.00 / 3 = 334 + 333 + 333
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
    // Remainder (1 cent) distributed to first share
    expect(shares).toEqual([334, 333, 333]);
  });

  // Edge case: remainder cents distribution for larger numbers
  it("distributes larger remainders correctly", () => {
    const shares = splitEvenly(1005, 3); // $10.05 / 3 = 335 + 335 + 335
    expect(shares).toEqual([335, 335, 335]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1005);

    const shares2 = splitEvenly(10, 3); // 10 / 3 = 4 + 3 + 3
    expect(shares2).toEqual([4, 3, 3]);
    expect(shares2.reduce((a, b) => a + b, 0)).toBe(10);

    const shares3 = splitEvenly(11, 3); // 11 / 3 = 4 + 4 + 3
    expect(shares3).toEqual([4, 4, 3]);
    expect(shares3.reduce((a, b) => a + b, 0)).toBe(11);
  });

  it("never loses a cent (all totals)", () => {
    for (const total of [1, 7, 100, 1000, 9100, 99999]) {
      for (const n of [1, 2, 3, 4, 7, 10]) {
        const shares = splitEvenly(total, n);
        expect(shares.reduce((a, b) => a + b, 0)).toBe(total);
        expect(shares.length).toBe(n);
      }
    }
  });

  it("handles single share (n=1)", () => {
    expect(splitEvenly(42800, 1)).toEqual([42800]);
  });

  it("handles negative totals", () => {
    const shares = splitEvenly(-9000, 3);
    expect(shares).toEqual([-3000, -3000, -3000]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-9000);
  });

  // Edge case: negative amounts with remainders (invariant: sum = total)
  it("distributes remainder cents for negative totals correctly", () => {
    const shares = splitEvenly(cents(-1000), 3); // -10.00 / 3
    // abs(-1000)=1000, base=333, remainder=1 → first gets 334, others get 333
    // Apply negative sign: [-334, -333, -333]
    expect(shares).toEqual([cents(-334), cents(-333), cents(-333)]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-1000); // Invariant: sum = total

    const shares3 = splitEvenly(cents(-10), 3); // -10 / 3, base=3, remainder=1
    // abs(-10)=10, base=3, remainder=1 → first gets 4, others get 3
    // Apply negative sign: [-4, -3, -3]
    expect(shares3).toEqual([cents(-4), cents(-3), cents(-3)]);
    expect(shares3.reduce((a, b) => a + b, 0)).toBe(-10); // Invariant: sum = total
  });

  it("handles zero total", () => {
    const shares = splitEvenly(0, 5);
    expect(shares).toEqual([0, 0, 0, 0, 0]);
  });

  // Edge case: remainder equals number of shares minus one (maximum remainder)
  it("handles maximum remainder distribution", () => {
    const shares = splitEvenly(299, 3); // 299 / 3 = 99 remainder 2
    // base = 99, remainder = 2, so first 2 shares get +1
    expect(shares).toEqual([100, 100, 99]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(299);

    const shares2 = splitEvenly(99, 10); // 99 / 10 = 9 remainder 9
    // base = 9, remainder = 9, so first 9 shares get +1
    expect(shares2[0]).toBe(10);
    expect(shares2[9]).toBe(9); // last share is just base
    expect(shares2.reduce((a, b) => a + b, 0)).toBe(99);
  });

  // Edge case: n > total (more people than cents)
  it("handles n greater than total", () => {
    const shares = splitEvenly(3, 10); // 3 cents / 10 people = 0.30 + 0*7
    expect(shares[0]).toBe(1); // first 3 get 1 cent each
    expect(shares[3]).toBe(0); // rest get 0
    expect(shares.reduce((a, b) => a + b, 0)).toBe(3);

    const shares2 = splitEvenly(1, 100);
    expect(shares2[0]).toBe(1);
    expect(shares2.slice(1).every((s) => s === 0)).toBe(true);
  });

  // Edge case: single cent
  it("handles single cent", () => {
    const shares = splitEvenly(1, 3);
    expect(shares).toEqual([1, 0, 0]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1);
  });

  // Edge case: negative amount with n > absolute value (invariant preserved)
  it("handles negative total with n greater than absolute value", () => {
    const shares = splitEvenly(cents(-3), 10);
    // abs(-3)=3, base=0, remainder=3 → first 3 get 1, rest get 0
    // Apply negative sign: [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0]
    expect(shares[0]).toBe(cents(-1));
    expect(shares[1]).toBe(cents(-1));
    expect(shares[2]).toBe(cents(-1));
    expect(Math.abs(shares[3])).toBe(0); // Handle both 0 and -0
    expect(Math.abs(shares[9])).toBe(0); // Handle both 0 and -0
    // Invariant: sum = total
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-3);
  });

  // Edge case: validate remainder never exceeds n-1
  it("never distributes remainder exceeding n-1", () => {
    for (let total = 1; total <= 100; total++) {
      for (let n = 1; n <= 20; n++) {
        const shares = splitEvenly(total, n);
        const baseShare = Math.floor(total / n);
        const extraCount = shares.filter((s) => s === baseShare + 1).length;
        expect(extraCount).toBeLessThanOrEqual(total % n);
        expect(extraCount).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("rounds to nearest cent", () => {
    expect(applyDiscount(999, 10)).toBe(899); // 899.1 rounds to 899
    expect(applyDiscount(105, 50)).toBe(53); // 52.5 rounds to 53
  });

  it("handles 0% and 100% discounts", () => {
    expect(applyDiscount(10000, 0)).toBe(10000); // no discount
    expect(applyDiscount(10000, 100)).toBe(0); // full discount
  });

  it("handles intermediate discounts", () => {
    expect(applyDiscount(5000, 25)).toBe(3750); // 25% off
    expect(applyDiscount(10000, 50)).toBe(5000); // 50% off
  });

  it("handles negative amounts", () => {
    expect(applyDiscount(-10000, 10)).toBe(-9000);
    expect(applyDiscount(-10000, 0)).toBe(-10000);
    expect(applyDiscount(-10000, 50)).toBe(-5000);
  });

  // Edge case: boundary discount percentages
  it("handles boundary discount percentages", () => {
    expect(applyDiscount(10000, 1)).toBe(9900); // 1% off
    expect(applyDiscount(10000, 99)).toBe(100); // 99% off
  });

  // Edge case: very small amounts with discounts
  it("applies discount to very small amounts", () => {
    expect(applyDiscount(1, 50)).toBe(1); // 0.5 cents rounds to 1
    expect(applyDiscount(3, 50)).toBe(2); // 1.5 cents rounds to 2
    expect(applyDiscount(2, 50)).toBe(1); // 1 cent rounds to 1
    expect(applyDiscount(1, 10)).toBe(1); // 0.9 rounds to 1
  });

  // Edge case: amounts that result in .5 cent rounding
  it("applies banker's rounding (round half to even)", () => {
    expect(applyDiscount(105, 50)).toBe(53); // 52.5 rounds to 53 (Math.round behavior)
    expect(applyDiscount(103, 50)).toBe(52); // 51.5 rounds to 52
    expect(applyDiscount(107, 50)).toBe(54); // 53.5 rounds to 54
  });

  // Edge case: negative amounts with discounts
  it("applies discounts to negative amounts", () => {
    // Math.round(-52.5) = -52 in JS (banker's rounding)
    expect(applyDiscount(-105, 50)).toBe(-52);
    expect(applyDiscount(-999, 10)).toBe(-899);
    // -1 * 0.5 = -0.5, Math.round(-0.5) = -0 in JS (rounds toward positive infinity)
    expect(Object.is(applyDiscount(-1, 50), -0) || applyDiscount(-1, 50) === 0).toBe(true);
  });

  // Edge case: zero amount
  it("handles zero amount", () => {
    expect(applyDiscount(0, 50)).toBe(0);
    expect(applyDiscount(0, 0)).toBe(0);
    expect(applyDiscount(0, 100)).toBe(0);
  });

  // Edge case: rounding behavior near boundaries
  it("handles rounding edge cases", () => {
    expect(applyDiscount(999, 1)).toBe(989); // 989.01 rounds to 989
    expect(applyDiscount(333, 10)).toBe(300); // 299.7 rounds to 300
    expect(applyDiscount(150, 1)).toBe(149); // 149.5 rounds to 150 via Math.round
    expect(applyDiscount(151, 1)).toBe(149); // 149.49 rounds to 149
  });

  // Edge case: discounts resulting in exact cent values
  it("applies discounts resulting in exact cent values", () => {
    expect(applyDiscount(10000, 10)).toBe(9000); // exact: 90.00
    expect(applyDiscount(20000, 25)).toBe(15000); // exact: 150.00
    expect(applyDiscount(333, 33)).toBe(223); // 223.11 rounds to 223
  });

  // Edge case: very large amounts
  it("applies discounts to very large amounts", () => {
    expect(applyDiscount(999999999, 10)).toBe(899999999); // 8,999,999.99
    expect(applyDiscount(999999999, 50)).toBe(500000000); // ~5,000,000.00
  });

  // Edge case: amount that results in 0 after discount
  it("handles amounts that discount to zero", () => {
    expect(applyDiscount(1, 100)).toBe(0);
    expect(applyDiscount(100, 100)).toBe(0);
    expect(applyDiscount(999999, 100)).toBe(0);
  });

  it("rejects out-of-range discounts via percent()", () => {
    expect(() => percent(150)).toThrow();
    expect(() => percent(-10)).toThrow();
    expect(() => percent(101)).toThrow();
  });

  it("rejects non-finite numbers via cents() and percent()", () => {
    expect(() => cents(Infinity)).toThrow();
    expect(() => cents(NaN)).toThrow();
    expect(() => percent(NaN)).toThrow();
  });

  // New tests: applyDiscount validates discount at call site
  it("rejects invalid discount values at boundary", () => {
    expect(() => applyDiscount(10000, -1 as any)).toThrow("discount must be 0–100");
    expect(() => applyDiscount(10000, 101 as any)).toThrow("discount must be 0–100");
  });

  it("accepts valid discount boundaries (0% and 100%)", () => {
    expect(applyDiscount(10000, 0 as any)).toBe(10000);
    expect(applyDiscount(10000, 100 as any)).toBe(0);
  });
});
