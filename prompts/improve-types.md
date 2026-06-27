---
name: improve-types
description: Improve TypeScript type safety; add type guards, better interfaces, stricter validation at compile time
version: 1
---

# Improve TypeScript types in money.ts

## Baseline (weak)

```
краще типізуй код
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript expert focused on type safety, stricter compilation, and catching errors at compile time.

Goal: Improve TypeScript types in `app/src/money.ts`. Add stricter types, type guards, or branded types to catch more errors at compile time and reduce runtime mistakes.

Context:
- File: `app/src/money.ts` — 4 utility functions with basic number types
- Current state: uses plain number (could be float, Infinity, NaN)
- Goal: stricter types to prevent misuse (e.g., ensure cents are integers)
- Framework: TypeScript (strict mode ideally), Node 22

Constraints:
- Public API remains compatible (exports may change signature, but should be better)
- All tests must still pass (`npm test`)
- No runtime behavior changes (only types)
- Do NOT add Zod or external validation libraries (keep it simple)

Acceptance criteria:
- Introduce branded types or type guards to distinguish "cents" from plain numbers
- parseAmount should only accept strings; formatCents only numbers
- Consider: what if someone passes Infinity? NaN? Negative to splitEvenly when they shouldn't?
- applyDiscount: should percent be 0–100 only, or allow any range?
- Types should catch common mistakes at compile time, not runtime

Output:
- Modified `app/src/money.ts` with improved types (may include type aliases, brands, or stricter signatures)
- Brief explanation of type improvements (e.g., "added Cents branded type to prevent number mixups")
- Confirm: all tests still pass

Stop rules:
- Stop if any test fails; do NOT debug/fix tests, ask instead
- Do NOT change function behavior, only types/signatures
- Keep it simple — no over-engineering
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript expert. Improve type safety in `app/src/money.ts` with branded types, type guards, or stricter signatures. Catch more errors at compile time. Do NOT change behavior, only types.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions using plain numbers.
Current issue: plain `number` allows Infinity, NaN, floats (which are wrong).
Goal: stricter types to catch mistakes at compile time.
</context>

<constraints>
- Public API compatible (better signatures, but same-ish)
- All tests must pass
- No behavior changes, only types
- No external validation libraries (keep simple)
</constraints>

<output_format>
Modified `app/src/money.ts` with improved types + brief explanation (e.g., "added Cents branded type"). Confirm tests pass.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, "catch at compile time" emphasis |
| XML | Claude Code | structure, type safety discipline |

## Verified

- [ ] Branded types or stricter signatures introduced
- [ ] All tests pass
- [ ] No behavior changes
- [ ] Common mistakes caught at compile time
