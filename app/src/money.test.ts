import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";

// Edge-case suite added via the `add-tests` cookbook prompt ($ARGUMENTS = money.ts).
// Tests assert the INTENDED behavior, so the planted gaps surface as failures
// rather than being pinned to the current (buggy) output. money.ts is NOT edited.

describe("formatCents", () => {
  it("formats whole and fractional", () => {
    expect(formatCents(42800)).toBe("428.00");
    expect(formatCents(5)).toBe("0.05");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats negative amounts with a leading sign", () => {
    expect(formatCents(-42800)).toBe("-428.00");
    expect(formatCents(-5)).toBe("-0.05");
  });
});

describe("parseAmount", () => {
  it("parses a plain decimal", () => {
    expect(parseAmount("428.00")).toBe(42800);
    expect(parseAmount("12")).toBe(1200);
  });

  it("trims surrounding whitespace", () => {
    expect(parseAmount("  428.00  ")).toBe(42800);
  });

  it("pads a single decimal place", () => {
    expect(parseAmount("428.5")).toBe(42850);
  });

  it("parses negative amounts", () => {
    expect(parseAmount("-428.00")).toBe(-42800);
  });

  it("round-trips with formatCents", () => {
    expect(formatCents(parseAmount("19.99"))).toBe("19.99");
  });

  it("throws on garbage, empty, and over-precise input", () => {
    expect(() => parseAmount("abc")).toThrow();
    expect(() => parseAmount("")).toThrow();
    expect(() => parseAmount("1.234")).toThrow();
  });
});

describe("splitEvenly", () => {
  it("splits a cleanly divisible total", () => {
    expect(splitEvenly(9000, 3)).toEqual([3000, 3000, 3000]);
  });

  it("returns the whole total for a single share", () => {
    expect(splitEvenly(100, 1)).toEqual([100]);
  });

  it("distributes remainder cents so shares sum to the total", () => {
    const shares = splitEvenly(100, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(100);
    expect(shares).toEqual([34, 33, 33]);
  });

  it("never loses cents on an awkward split", () => {
    const shares = splitEvenly(1000, 7);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
  });
});

describe("applyDiscount", () => {
  it("applies a simple discount", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("handles 0% and 100%", () => {
    expect(applyDiscount(10000, 0)).toBe(10000);
    expect(applyDiscount(10000, 100)).toBe(0);
  });

  it("rounds to the nearest cent", () => {
    expect(applyDiscount(10000, 33)).toBe(6700);
  });

  it("rejects out-of-range percentages", () => {
    expect(() => applyDiscount(10000, 150)).toThrow();
    expect(() => applyDiscount(10000, -10)).toThrow();
  });

  it("rounds a half-cent half-up", () => {
    expect(applyDiscount(101, 50)).toBe(51); // 50.5 -> 51
  });
});

describe("boundaries", () => {
  it("splitEvenly conserves a negative total", () => {
    const shares = splitEvenly(-100, 3);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(-100);
  });

  it("splitEvenly conserves a large total", () => {
    const shares = splitEvenly(100_000_001, 4);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(100_000_001);
  });

  it("formatCents/parseAmount round-trip at large magnitude", () => {
    expect(formatCents(parseAmount("1000000.00"))).toBe("1000000.00");
  });
});
