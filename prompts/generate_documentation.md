---
name: generate-documentation
description: Generate JSDoc comments and a module-level README section for a money utility module. Use when exports are undocumented or docs are stale.
version: 1
---

# Generate documentation

A worked example for documenting `app/src/money.ts`. Produces JSDoc for every
exported function and a short module-level summary block.

## Baseline (weak)

```
напиши документацію для money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer and technical writer in this repo (Node 22, TypeScript).
You write concise, accurate JSDoc — no marketing fluff, no placeholder text.
Goal: Add or update JSDoc comments for every exported function in app/src/money.ts
so that a teammate reading only the hover tooltip understands the contract.
Context: Integer-cent money helpers — formatCents, parseAmount, splitEvenly,
applyDiscount, addTax. Each function already has a one-line comment; upgrade them
to full JSDoc with @param, @returns, @throws, and one @example per function.
Constraints:
- Edit only app/src/money.ts; do NOT touch any other file.
- No new npm dependencies.
- Keep all existing function signatures and behaviour unchanged.
- No secrets or PII in examples — use synthetic values only (e.g. 42800 cents).
- Do not add a @deprecated tag unless a function is genuinely deprecated.
Acceptance criteria:
- Every exported function has @param, @returns, and (where applicable) @throws tags.
- Every exported function has at least one @example showing input → output.
- `npx vitest run` still exits 0 after the edit.
Output:
- The updated app/src/money.ts only (no explanatory prose).
Stop rules:
- If all exports are already fully documented with @param/@returns/@throws/@example,
  list them and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Add full JSDoc comments to every exported function
in app/src/money.ts. Each comment must include @param, @returns, @throws (where
the function can throw), and at least one @example. Do not change any function
signatures or runtime behaviour. Do not edit any other file.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers).
Exports to document:
- formatCents(cents: number): string — formats to "428.00" style string
- parseAmount(input: string): number — parses "428.00" to cents, throws on bad input
- splitEvenly(totalCents: number, n: number): number[] — splits total across n people, throws if n <= 0
- applyDiscount(cents: number, percent: number): number — applies 0–100% discount, throws if out of range
- addTax(cents: number, taxPercent: number): number — applies 0–100% tax, throws if out of range
Use synthetic values in @example blocks (e.g. 10000 cents = $100.00).
</context>

<constraints>
- Edit only app/src/money.ts; do not modify any other file.
- No new npm dependencies.
- No secrets or PII in examples — synthetic values only.
- Do not alter any function body, signature, or the private validateRange helper.
</constraints>

<output_format>
Return the updated app/src/money.ts in full. No prose, no diff — complete file
content only.
</output_format>

<stop_rules>
- If every exported function already has @param, @returns, @throws, and @example
  tags, list them and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | acceptance criteria as readable prose works well for doc tasks |
| XML | Claude Code / Claude | structured tag list maps cleanly to per-function JSDoc requirements |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; all exports documented; `npx vitest run` still passes
