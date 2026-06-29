---
name: write-docs
description: Add JSDoc comments to every public function in app/src/money.ts without changing runtime behaviour.
version: 1
---

# Write Docs

## Baseline (weak) — what you started from

```
add comments to money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript technical writer in a Vitest project. Target: `app/src/money.ts`.
Goal: Add a JSDoc block above every exported function. Document params, return value, thrown errors, and one `@example` per function.
Context:
- `formatCents(cents: number): string` — int cents → human string; negative supported
- `parseAmount(input: string): number` — throws `Error("Not a valid amount: ...")` on garbage
- `splitEvenly(totalCents: number, n: number): number[]` — known bug: drops remainder cents (document in `@remarks`)
- `applyDiscount(cents: number, percent: number): number` — no guard on percent range (document in `@remarks`)
Constraints:
- Edit only `app/src/money.ts`; do not change any logic or signatures
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- Every exported function has `@param`, `@returns`, `@throws` (where applicable), `@example`, `@remarks` (where needed)
- `cd app && npm test` still passes (no runtime change)
- `cd app && npx tsc --noEmit` passes
Output:
- Updated `app/src/money.ts` only
- One-sentence summary of what was documented
Stop rules:
- Do not alter function bodies or signatures
- Do not add `@internal` to public exports
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript technical writer. Add JSDoc blocks to every exported function in `app/src/money.ts`. Do NOT change any logic or signatures. After editing, run `cd app && npm test` to confirm nothing broke.
</instructions>

<context>
Functions to document:

formatCents(cents: number): string
  - @param cents — integer cents (may be negative)
  - @returns human string, e.g. 42800 → "428.00", -150 → "-1.50"
  - @example formatCents(42800) // "428.00"

parseAmount(input: string): number
  - @param input — decimal string, optional leading "-", 1-2 decimal places; whitespace trimmed
  - @returns integer cents
  - @throws {Error} "Not a valid amount: ..." when input doesn't match pattern
  - @example parseAmount("1.50") // 150

splitEvenly(totalCents: number, n: number): number[]
  - @param totalCents — total to split (integer cents)
  - @param n — number of shares
  - @returns array of n integer-cent shares
  - @remarks BUG: remainder cents are silently dropped; splitEvenly(10, 3) sums to 9, not 10
  - @example splitEvenly(9000, 3) // [3000, 3000, 3000]

applyDiscount(cents: number, percent: number): number
  - @param cents — original amount in integer cents
  - @param percent — discount percentage 0–100 (no guard: values outside range produce unexpected results)
  - @returns discounted amount rounded to nearest cent
  - @example applyDiscount(10000, 10) // 9000
</context>

<constraints>
- Edit only app/src/money.ts
- Do not change function bodies, signatures, or module exports
- No new npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- Updated app/src/money.ts
- One sentence: N functions documented
</output_format>

<stop_rules>
- If a behaviour is ambiguous, document the observed behaviour and add a @remarks note
- Do not fix any bugs — only document them
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
