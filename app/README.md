# app — cookbook target

A tiny TypeScript module used as a **real target** for your prompt cookbook
(Task A): tests, review, refactor, docs, debug prompts all point here.

```bash
cd app
npm install
npm test            # vitest run — full suite, must exit 0
npm run typecheck   # tsc --noEmit, must exit 0
```

`npm run test:watch` (`vitest`) exists for local use; the checks above are the
ones that count.

## What's inside

- `src/money.ts` — money helpers on **integer cents** (dot decimal, two
  fraction digits):
  - `formatCents(cents)` — `42800` → `"428.00"`, `-0` → `"0.00"`.
  - `parseAmount(input)` — `"-12.30"` → `-1230`; throws on garbage.
  - `splitEvenly(totalCents, n)` — `n` integer shares that sum to the total and
    differ by at most 1 (remainder cents go to the first shares); throws when
    `n < 1` or `n` is not an integer.
  - `applyDiscount(cents, percent)` — rounds with `Math.round`
    (`applyDiscount(1, 50) === 1`); throws when `percent` is below 0, above 100,
    or not finite.
- `src/money.test.ts` — Vitest suite covering:
  - `formatCents`: whole/fractional, zero, negatives, `-0`.
  - `parseAmount`: plain, negative, zero, one fraction digit, whitespace,
    garbage (`""`, `"abc"`, `"12.345"`, `"428,00"`), round-trip with
    `formatCents`.
  - `splitEvenly`: divisible total, `n === 1`, zero total, non-divisible
    positive (`100`) and negative (`-100`) totals, a single cent across three
    shares, and throws for `n === 0`, negative `n`, non-integer `n`.
  - `applyDiscount`: simple discount, `0` and `100` percent, half-cent rounding,
    negative amount, and throws for percent below 0, above 100, and non-finite.

There are currently **no open `it.fails` tests**. If you find a new defect,
record it as `it.fails` under a `// BUG:` line, then fix it with a prompt.

## On purpose

The module originally shipped with planted defects (remainder cents dropped by
`splitEvenly`, no `n === 0` check, no `percent` range / finiteness check). They
were fixed by running cookbook prompts (`prompts/fix-bug.md`), not by hand.
Keep it that way: don't hand-fix `src/money.ts` — drive changes with a cookbook
prompt. That's the exercise.
