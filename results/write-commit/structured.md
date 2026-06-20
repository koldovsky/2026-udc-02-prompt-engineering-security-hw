```
test(money): expand unit tests to full edge-case coverage

The previous test file contained only minimal smoke tests that
intentionally skipped edge cases (remainder cents, negatives, bad
input, out-of-range discounts). This commit replaces those stubs with
a comprehensive suite covering:

- formatCents: zero, negative, sub-dollar, single-digit fractional,
  large amounts
- parseAmount: whole numbers, one-decimal strings, negatives,
  whitespace trimming, and throws for alpha input, >2 decimal places,
  empty string, multiple decimal points, and bare leading decimal
- splitEvenly: remainder distribution (sum invariant), zero total,
  n=1, and throws for n=0 and n<0
- applyDiscount: 0%, 100%, fractional percentages, rounding behavior,
  zero amount, and throws for percent<0 and percent>100

No production code was changed; only the test file is modified.
```
