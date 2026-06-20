# Debug Analysis: `splitEvenly` Drops Remainder Cents

## 1. Root Cause (with evidence)

**Root cause:** Integer floor division in `splitEvenly` discards the remainder
when `totalCents` is not evenly divisible by `n`. The remainder is simply lost —
it is never distributed to any share.

**Evidence from the code (`app/src/money.ts`):**

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);   // ← every slot gets `base`
  return shares;                             // ← remainder never added
}
```

Arithmetic trace for the two failing cases:

| Call                    | base = floor(total/n) | remainder = total % n | sum of shares | expected |
|-------------------------|-----------------------|-----------------------|---------------|----------|
| `splitEvenly(100, 3)`   | `floor(33.33…)` = 33  | 100 % 3 = **1**       | 33×3 = **99** | 100 |
| `splitEvenly(1000, 7)`  | `floor(142.85…)` = 142 | 1000 % 7 = **6**     | 142×7 = **994** | 1000 |

The remainder (`r = totalCents % n`) must be distributed across `r` of the `n`
shares by incrementing each of those shares by 1 cent. Failing to do so means
`r` cents are silently dropped every time `totalCents % n !== 0`.

**What was ruled out:**

- Floating-point drift — amounts are already in integer cents, so there is no
  IEEE-754 rounding issue. The bug is pure integer arithmetic: a missing `%`
  operation.
- Off-by-one in array construction — `new Array(n).fill(base)` produces exactly
  `n` elements, all correct for the base share. The length is not the problem.

---

## 2. Fix (minimal diff)

Distribute the remainder by incrementing the first `r` shares by 1 cent each.
This is the standard "largest-remainder" approach: the payer at index 0..r-1
pays one extra cent, while indices r..n-1 pay the base amount.

```diff
 export function splitEvenly(totalCents: number, n: number): number[] {
   const base = Math.floor(totalCents / n);
+  const remainder = totalCents % n;
   const shares = new Array(n).fill(base);
+  for (let i = 0; i < remainder; i++) {
+    shares[i] += 1;
+  }
   return shares;
 }
```

**Full replacement for the function body:**

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const shares = new Array(n).fill(base);
  for (let i = 0; i < remainder; i++) {
    shares[i] += 1;
  }
  return shares;
}
```

The change is 3 lines added, 0 lines removed, no new dependencies, and touches
only the function identified as defective.

---

## 3. Tests that prove it

The two already-written failing tests are exactly the right proof:

```typescript
it("shares sum back to total when there is a remainder", () => {
  const shares = splitEvenly(100, 3);
  expect(shares.reduce((a, b) => a + b, 0)).toBe(100);
  // Before fix: 99 !== 100  ← FAIL
  // After fix:  100 === 100 ← PASS
});

it("shares sum back to total for a larger remainder case", () => {
  const shares = splitEvenly(1000, 7);
  expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
  // Before fix: 994 !== 1000  ← FAIL
  // After fix:  1000 === 1000 ← PASS
});
```

Additional test to cover edge cases (even split and zero remainder):

```typescript
it("shares sum back to total when evenly divisible", () => {
  const shares = splitEvenly(100, 4);
  expect(shares.reduce((a, b) => a + b, 0)).toBe(100);
  expect(shares).toEqual([25, 25, 25, 25]);
});

it("distributes remainder cents to the first shares", () => {
  // 100 / 3 = [34, 33, 33] — first share gets the extra cent
  const shares = splitEvenly(100, 3);
  expect(shares[0]).toBe(34);
  expect(shares[1]).toBe(33);
  expect(shares[2]).toBe(33);
});

it("distributes 6 remainder cents to first 6 of 7 shares", () => {
  // 1000 / 7 = base 142, remainder 6 → [143,143,143,143,143,143,142]
  const shares = splitEvenly(1000, 7);
  expect(shares.slice(0, 6).every((s) => s === 143)).toBe(true);
  expect(shares[6]).toBe(142);
  expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
});
```

---

## 4. Suite result (expected after fix)

```
PASS  app/src/money.test.ts
  splitEvenly
    ✓ shares sum back to total when there is a remainder    (100 / 3 → 100)
    ✓ shares sum back to total for a larger remainder case  (1000 / 7 → 1000)
    ✓ shares sum back to total when evenly divisible        (100 / 4 → 100)
    ✓ distributes remainder cents to the first shares
    ✓ distributes 6 remainder cents to first 6 of 7 shares
  formatCents / parseAmount / applyDiscount
    ✓ (all pre-existing tests continue to pass unchanged)
```

No tests were weakened or deleted. The fix addresses only the root cause.
