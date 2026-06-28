---
name: add-types
description: Introduce a branded Cents type in app/src/money.ts to make integer-cent contracts compile-time safe.
version: 1
---

# Add Types

## Baseline (weak) — what you started from

```
make money.ts more type-safe
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript type-system engineer. Target: `app/src/money.ts`.
Goal: Introduce a branded `Cents` type so callers can't accidentally pass raw `number` where integer cents are expected. All four functions must use `Cents` in their signatures.
Context:
- All monetary values are integer cents (never floats)
- Branding pattern: `type Cents = number & { readonly __brand: "Cents" }`
- Constructor: `const cents = (n: number): Cents => n as Cents`
- Existing tests in `app/src/money.test.ts` must still pass — update call sites if needed
Constraints:
- Edit `app/src/money.ts` (type + signatures) and `app/src/money.test.ts` (wrap literals with `cents()`)
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- `cd app && npx tsc --noEmit` passes with no errors
- `cd app && npm test` passes, all 19 tests green
- Passing a plain `number` where `Cents` is expected is a compile error
Output:
- Updated `app/src/money.ts` and `app/src/money.test.ts`
- One-sentence summary of the change
Stop rules:
- Do not change function logic
- If branding causes unfixable downstream issues, report without guessing
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript engineer. Add a branded `Cents` type to `app/src/money.ts` and update all four exported functions to use it. Also update `app/src/money.test.ts` to wrap integer literals with the `cents()` constructor. Run `cd app && npx tsc --noEmit && npm test` — both must pass.
</instructions>

<context>
Branding pattern to add in app/src/money.ts (before all functions):

  /** Integer cents — never a raw float. */
  export type Cents = number & { readonly __brand: "Cents" };

  /** Cast a verified integer to Cents. Use only at boundaries. */
  export const cents = (n: number): Cents => n as Cents;

Updated signatures:
  formatCents(cents: Cents): string
  parseAmount(input: string): Cents          // return value is now Cents
  splitEvenly(totalCents: Cents, n: number): Cents[]
  applyDiscount(cents: Cents, percent: number): Cents

In app/src/money.test.ts, wrap every integer argument that is Cents:
  formatCents(cents(42800))   parseAmount result is already Cents
  splitEvenly(cents(9000), 3)
  applyDiscount(cents(10000), 10)
  etc.
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts
- Do not change function bodies (only signatures and the new type/constructor)
- No new npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- Updated app/src/money.ts and app/src/money.test.ts
- `tsc --noEmit` + `npm test` output showing clean compile and 19 passed
</output_format>

<stop_rules>
- If branded type causes a type error that needs a logic change, report it rather than guessing a fix
- Do not change the splitEvenly bug fix status (fix or not — leave as-is)
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
