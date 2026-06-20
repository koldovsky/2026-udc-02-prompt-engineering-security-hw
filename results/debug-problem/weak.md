# AI Response to "fix it"

Sure! I can see the issue in your `splitEvenly` function. It doesn't distribute the remainder cents after dividing. Here's the fixed version:

```typescript
export function splitEvenly(totalCents: number, n: number): number[] {
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const shares = new Array(n).fill(base);
  // Distribute the remainder cents one per person starting from the first
  for (let i = 0; i < remainder; i++) {
    shares[i] += 1;
  }
  return shares;
}
```

The original code just filled every share with the floor-divided base amount and discarded the leftover cents. For example, splitting 100 cents among 3 people gave `[33, 33, 33]` (totaling 99) instead of `[34, 33, 33]` (totaling 100).

The fix computes `remainder = totalCents % n` and adds 1 extra cent to the first `remainder` shares, so the shares always sum to `totalCents`.
