# Error Handling: `app/src/money.ts`

## Analysis of Failure Modes

### `formatCents(cents: number): string`

| Failure mode | Risk | Action |
|---|---|---|
| `cents` is `NaN` | `Math.abs(NaN)` → `NaN`; silent garbage output | Throw |
| `cents` is `Infinity` / `-Infinity` | `Math.floor(Infinity)` → `Infinity`; produces `"Infinity.00"` | Throw |
| `cents` is not an integer (e.g. `42.5`) | Fractional cents are an invalid state in this model | Throw |
| `cents` is not a number at runtime | TypeScript does not prevent callers from JS land passing strings | Throw |

### `parseAmount(input: string): number`

| Failure mode | Risk | Action |
|---|---|---|
| Non-string argument at runtime | `input.trim()` throws a confusing TypeError | Throw with clear message |
| Empty string / whitespace-only | Regex does not match; current code throws — good, but message leaks raw input | Sanitise error message |
| Three-decimal-place input e.g. `"1.234"` | Regex rejects it; already handled | Keep |
| Integer overflow (very large amounts) | `Number(whole) * 100` loses precision beyond `Number.MAX_SAFE_INTEGER` | Throw |

### `splitEvenly(totalCents: number, n: number): number[]`

| Failure mode | Risk | Action |
|---|---|---|
| `n` is 0 | `Math.floor(x / 0)` → `Infinity`; produces array of `Infinity` | Throw |
| `n` is negative | Produces array of negative length; `new Array(-1)` throws a RangeError with confusing message | Throw early with clear message |
| `n` is not an integer | `new Array(1.5)` throws RangeError; fractional people don't make sense | Throw |
| `n` is `NaN` | Same as fractional | Throw |
| `totalCents` is `NaN` / `Infinity` | Produces garbage shares silently | Throw |
| `totalCents` is not an integer | Fractional cents are invalid in this model | Throw |
| Remainder cents silently discarded | Noted in source as a known gap; callers may rely on the sum being exact | Deliberately left out (see reasoning below) |

### `applyDiscount(cents: number, percent: number): number`

| Failure mode | Risk | Action |
|---|---|---|
| `percent` outside 0–100 | `percent = 150` → negative result; `percent = -10` → increases price; silent | Throw |
| `percent` is `NaN` | `1 - NaN/100` → `NaN`; `Math.round(NaN)` → `NaN` silently | Throw |
| `cents` is `NaN` / `Infinity` / non-integer | Same category as `formatCents` | Throw |

---

## Deliberately left out

- **`splitEvenly` remainder**: The existing docstring calls this a "known correctness gap". Fixing it (distributing the remainder cents one-by-one to the first shares) is a behaviour change, not an error-handling change, and is outside the scope of this task. The constraint says "preserve the happy-path behavior and public API". The fix is noted here so the next task (add-tests / refactor) can pick it up.
- **Concurrent mutation**: All functions are pure and stateless; no shared mutable state exists. Concurrency is not a failure mode here.
- **Locale / currency symbol**: `formatCents` is intentionally minimal (no symbol, no locale). Adding locale errors would change the public API.

---

## Changed Code

```typescript
/**
 * Tiny money utilities — the target for the WS2 prompt cookbook.
 *
 * Amounts are handled in integer **cents** to avoid floating-point drift.
 */

// ---------------------------------------------------------------------------
// Internal guards — not exported; used by every public function.
// ---------------------------------------------------------------------------

function assertFiniteInteger(value: number, label: string): void {
  if (typeof value !== "number") {
    throw new TypeError(`${label} must be a number, got ${typeof value}`);
  }
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be a finite number, got ${value}`);
  }
  if (!Number.isInteger(value)) {
    throw new RangeError(
      `${label} must be an integer (whole cents), got ${value}`
    );
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Format integer cents as a human string, e.g. 42800 -> "428.00". */
export function formatCents(cents: number): string {
  assertFiniteInteger(cents, "cents");

  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`;
}

/** Parse a "428.00" / "428" string into integer cents. Throws on garbage. */
export function parseAmount(input: string): number {
  if (typeof input !== "string") {
    throw new TypeError(
      `parseAmount expects a string, got ${typeof input}`
    );
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    throw new Error("parseAmount: input must not be empty");
  }

  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) {
    // Do not echo raw input verbatim — it may contain PII or secrets.
    // Emit a fixed-length excerpt only.
    const excerpt = trimmed.slice(0, 20);
    throw new Error(
      `parseAmount: not a valid amount string (received: "${excerpt}${trimmed.length > 20 ? "…" : ""}")`
    );
  }

  const [, sign, whole, frac = "0"] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));

  if (!Number.isFinite(cents) || !Number.isSafeInteger(cents)) {
    throw new RangeError(
      "parseAmount: amount is too large to represent as safe integer cents"
    );
  }

  return sign === "-" ? -cents : cents;
}

/**
 * Split a total (in cents) evenly across `n` people.
 * Returns an array of `n` integer-cent shares.
 *
 * NOTE: there is a known correctness gap here around the remainder cents —
 * the sum of returned shares may be less than `totalCents` by up to `n-1`.
 * This is a pre-existing behaviour preserved intentionally.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  assertFiniteInteger(totalCents, "totalCents");

  if (typeof n !== "number") {
    throw new TypeError(`n must be a number, got ${typeof n}`);
  }
  if (!Number.isFinite(n)) {
    throw new RangeError(`n must be a finite number, got ${n}`);
  }
  if (!Number.isInteger(n)) {
    throw new RangeError(`n must be a whole integer (got ${n})`);
  }
  if (n <= 0) {
    throw new RangeError(`n must be a positive integer, got ${n}`);
  }

  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);
  return shares;
}

/** Apply a percentage discount (0–100) to integer cents, rounding to nearest cent. */
export function applyDiscount(cents: number, percent: number): number {
  assertFiniteInteger(cents, "cents");

  if (typeof percent !== "number") {
    throw new TypeError(`percent must be a number, got ${typeof percent}`);
  }
  if (!Number.isFinite(percent)) {
    throw new RangeError(`percent must be a finite number, got ${percent}`);
  }
  if (percent < 0 || percent > 100) {
    throw new RangeError(
      `percent must be between 0 and 100 (inclusive), got ${percent}`
    );
  }

  return Math.round(cents * (1 - percent / 100));
}
```

---

## Tests for new failure paths

Add these to `app/src/money.test.ts` (using the existing Vitest/Jest `describe`/`it`/`expect` style already present in the repo).

```typescript
import { describe, it, expect } from "vitest";
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money";

// ---------------------------------------------------------------------------
// formatCents — error paths
// ---------------------------------------------------------------------------
describe("formatCents — error paths", () => {
  it("throws TypeError when passed a non-number", () => {
    expect(() => formatCents("100" as unknown as number)).toThrow(TypeError);
    expect(() => formatCents("100" as unknown as number)).toThrow(
      /must be a number/
    );
  });

  it("throws RangeError for NaN", () => {
    expect(() => formatCents(NaN)).toThrow(RangeError);
    expect(() => formatCents(NaN)).toThrow(/finite/);
  });

  it("throws RangeError for Infinity", () => {
    expect(() => formatCents(Infinity)).toThrow(RangeError);
    expect(() => formatCents(-Infinity)).toThrow(RangeError);
  });

  it("throws RangeError for non-integer cents", () => {
    expect(() => formatCents(42.5)).toThrow(RangeError);
    expect(() => formatCents(42.5)).toThrow(/integer/);
  });
});

// ---------------------------------------------------------------------------
// parseAmount — error paths
// ---------------------------------------------------------------------------
describe("parseAmount — error paths", () => {
  it("throws TypeError when passed a non-string", () => {
    expect(() => parseAmount(123 as unknown as string)).toThrow(TypeError);
    expect(() => parseAmount(123 as unknown as string)).toThrow(/expects a string/);
  });

  it("throws on empty string", () => {
    expect(() => parseAmount("")).toThrow(/must not be empty/);
  });

  it("throws on whitespace-only string", () => {
    expect(() => parseAmount("   ")).toThrow(/must not be empty/);
  });

  it("throws on garbage input", () => {
    expect(() => parseAmount("abc")).toThrow(/not a valid amount/);
    expect(() => parseAmount("12.345")).toThrow(/not a valid amount/);
    expect(() => parseAmount("12,34")).toThrow(/not a valid amount/);
    expect(() => parseAmount("$12.00")).toThrow(/not a valid amount/);
  });

  it("error message is truncated and does not exceed safe excerpt length", () => {
    const longGarbage = "x".repeat(100);
    const err = (() => {
      try {
        parseAmount(longGarbage);
      } catch (e) {
        return e as Error;
      }
    })();
    expect(err).toBeDefined();
    // Excerpt is at most 20 chars + ellipsis; the full 100-char value must not appear
    expect(err!.message).not.toContain(longGarbage);
    expect(err!.message).toContain("…");
  });

  it("throws RangeError for amounts too large for safe integer", () => {
    // 10^16 cents → exceeds Number.MAX_SAFE_INTEGER (9007199254740991)
    const hugeAmount = "100000000000000";
    expect(() => parseAmount(hugeAmount)).toThrow(RangeError);
    expect(() => parseAmount(hugeAmount)).toThrow(/too large/);
  });
});

// ---------------------------------------------------------------------------
// splitEvenly — error paths
// ---------------------------------------------------------------------------
describe("splitEvenly — error paths", () => {
  it("throws RangeError when n is 0", () => {
    expect(() => splitEvenly(1000, 0)).toThrow(RangeError);
    expect(() => splitEvenly(1000, 0)).toThrow(/positive integer/);
  });

  it("throws RangeError when n is negative", () => {
    expect(() => splitEvenly(1000, -1)).toThrow(RangeError);
    expect(() => splitEvenly(1000, -3)).toThrow(RangeError);
  });

  it("throws RangeError when n is fractional", () => {
    expect(() => splitEvenly(1000, 2.5)).toThrow(RangeError);
    expect(() => splitEvenly(1000, 2.5)).toThrow(/whole integer/);
  });

  it("throws RangeError when n is NaN", () => {
    expect(() => splitEvenly(1000, NaN)).toThrow(RangeError);
  });

  it("throws RangeError when n is Infinity", () => {
    expect(() => splitEvenly(1000, Infinity)).toThrow(RangeError);
  });

  it("throws TypeError when n is not a number", () => {
    expect(() => splitEvenly(1000, "2" as unknown as number)).toThrow(TypeError);
  });

  it("throws RangeError when totalCents is NaN", () => {
    expect(() => splitEvenly(NaN, 3)).toThrow(RangeError);
  });

  it("throws RangeError when totalCents is Infinity", () => {
    expect(() => splitEvenly(Infinity, 3)).toThrow(RangeError);
  });

  it("throws RangeError when totalCents is fractional", () => {
    expect(() => splitEvenly(10.5, 3)).toThrow(RangeError);
    expect(() => splitEvenly(10.5, 3)).toThrow(/integer/);
  });

  it("throws TypeError when totalCents is not a number", () => {
    expect(() => splitEvenly("1000" as unknown as number, 3)).toThrow(TypeError);
  });
});

// ---------------------------------------------------------------------------
// applyDiscount — error paths
// ---------------------------------------------------------------------------
describe("applyDiscount — error paths", () => {
  it("throws RangeError when percent is above 100", () => {
    expect(() => applyDiscount(1000, 101)).toThrow(RangeError);
    expect(() => applyDiscount(1000, 150)).toThrow(RangeError);
    expect(() => applyDiscount(1000, 101)).toThrow(/between 0 and 100/);
  });

  it("throws RangeError when percent is negative", () => {
    expect(() => applyDiscount(1000, -1)).toThrow(RangeError);
    expect(() => applyDiscount(1000, -0.001)).toThrow(RangeError);
  });

  it("throws RangeError when percent is NaN", () => {
    expect(() => applyDiscount(1000, NaN)).toThrow(RangeError);
  });

  it("throws RangeError when percent is Infinity", () => {
    expect(() => applyDiscount(1000, Infinity)).toThrow(RangeError);
  });

  it("throws TypeError when percent is not a number", () => {
    expect(() => applyDiscount(1000, "10" as unknown as number)).toThrow(TypeError);
  });

  it("throws RangeError when cents is NaN", () => {
    expect(() => applyDiscount(NaN, 10)).toThrow(RangeError);
  });

  it("throws RangeError when cents is fractional", () => {
    expect(() => applyDiscount(9.99, 10)).toThrow(RangeError);
  });

  it("boundary: 0 percent and 100 percent are valid", () => {
    expect(applyDiscount(1000, 0)).toBe(1000);
    expect(applyDiscount(1000, 100)).toBe(0);
  });
});
```

---

## Summary table

| Function | Failure modes now covered | Deliberately excluded |
|---|---|---|
| `formatCents` | non-number type, NaN, ±Infinity, non-integer | — |
| `parseAmount` | non-string type, empty/whitespace, regex mismatch (already existed, message improved), unsafe integer overflow | Locale/currency symbols (out of scope for this minimal utility) |
| `splitEvenly` | n=0, n<0, fractional n, NaN/Infinity n, non-number n, NaN/Infinity/fractional totalCents, non-number totalCents | Remainder distribution (behaviour gap, not an error) |
| `applyDiscount` | percent<0, percent>100, NaN percent, Infinity percent, non-number percent, NaN/Infinity/fractional cents | — |
