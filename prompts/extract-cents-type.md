---
name: extract-cents-type
description: Introduce a branded Cents type so TypeScript prevents mixing raw numbers with cent values.
version: 1
---

# Extract branded Cents type

## Baseline (weak)

```
make the money types stricter
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript engineer improving type safety in a financial module.
Goal: Introduce a branded `Cents` type in $ARGUMENTS so bare `number` values cannot be accidentally passed where `Cents` are expected.
Context: All four helpers currently use plain `number`. A branded type and a constructor narrow the type at the call site:
  type Cents = number & { readonly __brand: 'Cents' };
  function toCents(n: number): Cents { return n as Cents; }
Constraints:
- Add the `Cents` type alias and `toCents` constructor to the file (exported).
- Update all four exported function signatures to use `Cents` where the value represents integer cents.
- Do NOT change any runtime logic.
- The file must pass `tsc --noEmit` with `strict: true` after the change.
- Update `app/src/money.test.ts` to wrap numeric literals in `toCents()` where needed.
Acceptance criteria:
- `formatCents(42800)` is a compile error; `formatCents(toCents(42800))` compiles.
- `parseAmount("428.00")` return type is `Cents`.
- All tests still pass.
Output:
- Full updated `money.ts`.
- Changed lines in `money.test.ts` only.
- `tsc --noEmit` output confirming no errors.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are improving type safety in a TypeScript financial module.
Add a branded Cents type and toCents() constructor (both exported).
Update all four exported function signatures to use Cents.
Also update money.test.ts to wrap literals in toCents().
Zero runtime logic changes. File must pass tsc --noEmit strict.
</instructions>

<context>
Target: $ARGUMENTS

Pattern to apply:
  export type Cents = number & { readonly __brand: 'Cents' };
  export function toCents(n: number): Cents { return n as Cents; }

Updated signatures:
  formatCents(cents: Cents): string
  parseAmount(input: string): Cents
  splitEvenly(totalCents: Cents, n: number): Cents[]
  applyDiscount(cents: Cents, percent: number): Cents
</context>

<constraints>
- Add Cents type and toCents to money.ts (exported).
- Update all four exported function signatures.
- Internal casts (as Cents) are acceptable where needed.
- Update money.test.ts: wrap numeric literals in toCents() where required.
- tsc --noEmit must pass after changes.
- All existing tests must still pass (npx vitest run).
</constraints>

<output_format>
1. Updated money.ts (full file).
2. money.test.ts — changed lines only (diff-style).
3. tsc --noEmit output.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / GPT | inline pattern shows exactly the shape to copy |
| XML | Claude Code | clear context/constraints separation reduces overreach |

## Verified

- [x] Run against `app/src/money.ts`
- [x] `Cents` type + `toCents()` exported; all four function signatures updated; `money.test.ts` updated to call `toCents()` on all numeric literals; `tsc --noEmit` exit 0; `vitest run` 19/19 pass
