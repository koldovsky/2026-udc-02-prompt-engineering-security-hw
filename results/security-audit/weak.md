# Security Audit: src/money.ts

## Short Answer

This code is **not a security risk in itself**, but it has several input-validation and correctness gaps that could become exploitable depending on how callers use it.

---

## Findings

### 1. No Upper-Bound Validation on `parseAmount`

**Severity: Medium (context-dependent)**

```typescript
const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
```

`whole` is matched as `\d+` with no length cap. A caller passing a very large string (e.g. `"99999999999999999999.99"`) will silently produce `Infinity` or a large floating-point value due to JavaScript's `Number` precision limits. If this value is stored, compared, or sent to a financial backend, it can cause silent corruption or bypass amount checks.

**Fix:** Add a maximum value guard after parsing:

```typescript
if (!Number.isSafeInteger(cents)) throw new Error(`Amount out of safe range: ${input}`);
```

---

### 2. `splitEvenly` Silently Drops Remainder Cents

**Severity: Medium (financial correctness / potential abuse)**

```typescript
const base = Math.floor(totalCents / n);
const shares = new Array(n).fill(base);
// remainder is discarded
```

The comment acknowledges this gap. In a payment system, discarded cents mean money disappears. An attacker who can control `n` could systematically drain fractional amounts. At minimum, this is a correctness bug; in a billing context it is a financial integrity issue.

**Fix:** Distribute the remainder to the first share(s):

```typescript
const remainder = totalCents % n;
return shares.map((s, i) => (i < remainder ? s + 1 : s));
```

---

### 3. No Guard Against `n <= 0` in `splitEvenly`

**Severity: High**

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);  // division by zero if n === 0
```

Calling `splitEvenly(100, 0)` produces `[NaN]` (well, an empty array filled with `Infinity` or `NaN`). Calling with a negative `n` produces a negative-length array attempt or unexpected results. If `n` comes from user input, this is a crash / unexpected-state vector.

**Fix:**

```typescript
if (!Number.isInteger(n) || n <= 0) throw new Error(`n must be a positive integer, got ${n}`);
```

---

### 4. `applyDiscount` Accepts Out-of-Range Percentages

**Severity: Low–Medium**

```typescript
export function applyDiscount(cents: number, percent: number): number {
  return Math.round(cents * (1 - percent / 100));
}
```

The JSDoc says `0–100`, but there is no enforcement. A caller passing `percent = 150` produces a **negative price** (money owed to buyer). A caller passing `percent = -10` silently adds a surcharge. Both can be exploited if `percent` originates from untrusted input.

**Fix:**

```typescript
if (percent < 0 || percent > 100) throw new Error(`Discount percent must be 0–100, got ${percent}`);
```

---

### 5. Error Message Leaks Raw User Input

**Severity: Low**

```typescript
throw new Error(`Not a valid amount: ${input}`);
```

`input` is reflected directly into the error message without sanitization. If error messages are logged or surfaced in an API response, an attacker can use this to probe system behavior or inject log-pollution strings (log injection). Truncate or sanitize `input` before embedding:

```typescript
const safe = String(input).slice(0, 40).replace(/[^\x20-\x7E]/g, "?");
throw new Error(`Not a valid amount: "${safe}"`);
```

---

## What Is Fine

- The regex in `parseAmount` is strict and not susceptible to ReDoS — it does not use catastrophic backtracking patterns.
- `formatCents` is purely computational with no I/O or external calls; no security concern there.
- No use of `eval`, dynamic `import`, or unsafe serialization.

---

## Summary Table

| Issue | Severity | Exploitable via untrusted input? |
|---|---|---|
| No integer-safe guard in `parseAmount` | Medium | Yes |
| Remainder discarded in `splitEvenly` | Medium | Yes (financial integrity) |
| No guard for `n <= 0` in `splitEvenly` | High | Yes (crash / NaN propagation) |
| `applyDiscount` accepts out-of-range `%` | Medium | Yes (negative price) |
| Raw input reflected in error message | Low | Yes (log injection) |

None of these are remote code execution issues, but in a financial application all of them are worth fixing before production use.
