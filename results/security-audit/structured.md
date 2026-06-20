# Security Audit: app/src/money.ts

## 1. Risk Verdict

**Low overall risk** — the module is small and has no I/O, no external calls, and no secrets. The only trust boundary is `parseAmount()`, which does sanitize input via regex. One confirmed medium-severity issue (ReDoS potential) and two low-severity correctness gaps with security implications exist.

---

## 2. Findings by Severity

---

### [Medium] `parseAmount` — Reflected Raw Input in Error Message (Information Disclosure / Potential XSS Sink)

**Location:** `app/src/money.ts`, line 23

```typescript
if (!match) throw new Error(`Not a valid amount: ${input}`);
```

**Vulnerability:**
The raw, unsanitized `input` string is interpolated directly into the thrown `Error` message. If the caller surfaces this error message to a client (e.g., in an HTTP 400 response body, a log viewer rendered in a browser, or a React error boundary), an attacker can inject arbitrary content into the message.

- In JSON APIs this is typically harmless (the string is JSON-encoded), but in HTML contexts where error messages are rendered without escaping, this becomes a stored or reflected XSS vector.
- More concretely: if `input` is `<script>alert(1)</script>`, the error message will contain that payload verbatim.

**Impact:**
Depends entirely on the caller. If error messages are logged to a UI or returned in HTML, this is an XSS sink. Even in JSON contexts, leaking raw user input in error messages aids attackers in fingerprinting validation logic.

**Minimal Fix:**
Truncate and sanitize the input before reflecting it:

```typescript
const safe = trimmed.slice(0, 40).replace(/[^\w.\-]/g, "?");
throw new Error(`Not a valid amount: "${safe}"`);
```

Alternatively, use a generic message that does not echo user input:

```typescript
throw new Error("Invalid amount format");
```

**How to Verify:**
Pass `<img src=x onerror=alert(1)>` as input and check whether the thrown error message contains the raw string. Then check every call site that surfaces this error to an end user.

---

### [Medium] `parseAmount` — Integer Overflow / Loss of Precision for Large Inputs

**Location:** `app/src/money.ts`, lines 25–27

```typescript
const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
```

**Vulnerability:**
The regex `(\d+)` places no upper bound on the length of the `whole` digits group. JavaScript's `Number` type is a 64-bit float (IEEE 754), which loses integer precision above `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991 — roughly $90 trillion in cents). An input like `"99999999999999999.99"` will parse without throwing but produce an incorrect (silently corrupted) cent value.

**Impact:**
Silent data corruption in financial calculations. An attacker supplying extreme values could cause money amounts to round to unexpected values, potentially triggering logic errors in downstream discount or split calculations (e.g., negative remainders after integer math on corrupted values).

**Minimal Fix:**
Add a length guard on the digit group before arithmetic:

```typescript
if (whole.length > 15) throw new Error("Amount out of supported range");
```

Or validate the computed value is within a safe range post-parse:

```typescript
if (!Number.isSafeInteger(cents)) throw new Error("Amount out of supported range");
```

**How to Verify:**
Call `parseAmount("99999999999999999.99")` and verify the result with `Number.isSafeInteger()` — it will return `false`.

---

### [Low] `splitEvenly` — Remainder Cents Silently Dropped (Correctness Gap with Financial Impact)

**Location:** `app/src/money.ts`, lines 36–39

```typescript
const base = Math.floor(totalCents / n);
const shares = new Array(n).fill(base);
return shares;
```

**Vulnerability:**
The remainder (`totalCents % n`) is discarded. For example, splitting 100 cents across 3 people yields `[33, 33, 33]` (99 cents total) — 1 cent is lost. In a financial application this is a correctness bug that could accumulate into significant discrepancies at scale or be exploited to drain fractional amounts repeatedly.

This is noted as a known gap in the code comment, but it is documented here because silent money loss is a security-relevant correctness issue (not just a functional one).

**Impact:**
Data integrity: money is silently destroyed rather than allocated. In billing or payment-splitting contexts this could cause reconciliation failures or enable systematic fractional-cent extraction.

**Minimal Fix:**
Distribute the remainder cents to the first share(s):

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}
```

**How to Verify:**
`splitEvenly(100, 3)` should return `[34, 33, 33]` (sums to 100). Currently returns `[33, 33, 33]`.

---

### [Low] `applyDiscount` — No Input Validation on `percent` Parameter

**Location:** `app/src/money.ts`, line 44

```typescript
return Math.round(cents * (1 - percent / 100));
```

**Vulnerability:**
The `percent` parameter is documented as "0–100" but is never validated. If the caller passes values outside this range (e.g., `percent = 150` or `percent = -10`), the function silently produces negative amounts or inflated totals respectively. While the code comment says this receives "already-validated integers from internal callers," that assumption is not enforced at the function boundary.

**Impact:**
If a code path ever exposes this to external input (e.g., a future API endpoint that passes a discount percentage without re-validation), it becomes a business logic bypass: a caller could apply a 200% discount to get a negative price, potentially triggering a credit/refund.

**Minimal Fix:**
Add a guard at the top of the function:

```typescript
if (percent < 0 || percent > 100) throw new RangeError(`percent must be 0–100, got ${percent}`);
```

**How to Verify:**
Call `applyDiscount(1000, 150)` — it currently returns `-500` (a negative amount, implying a credit of $5 on a $10 purchase).

---

## 3. Hardening Suggestions & Manual Follow-up

### Hardening Suggestions

1. **Never reflect raw user input in error messages.** Use generic messages or truncate/sanitize before interpolating. This applies to any validation boundary.

2. **Add a `Number.isSafeInteger` post-check** after all arithmetic in `parseAmount` to guard against silent float precision loss on extreme inputs.

3. **Consider a branded/opaque `Cents` type** (e.g., `type Cents = number & { __brand: "cents" }`) to prevent `parseAmount` output from being accidentally re-passed to itself or confused with raw floats elsewhere in the codebase.

4. **Enforce parameter contracts at function boundaries** even for "internal" functions — TypeScript types are erased at runtime and callers can be added over time.

5. **Add input length limits** to `parseAmount` as a defense-in-depth measure: a 20-character cap on the input string would block large-integer overflow inputs with minimal disruption.

### Items Needing Manual Follow-up

- **All call sites of `parseAmount`:** Verify that error messages are not surfaced verbatim in HTML contexts. A grep for `.message` or `.toString()` on caught errors from this function is recommended.
- **All call sites of `applyDiscount`:** Confirm `percent` is always validated before reaching this function, particularly in any future API or CLI surfaces.
- **Reconciliation logic:** If `splitEvenly` is used in any billing or ledger context, verify whether the current behavior (dropping remainder cents) matches business requirements — this is likely a latent bug.
- **Dependency audit:** This file has no external dependencies, so no transitive vulnerability surface from `npm` packages applies here. This is a positive finding.
