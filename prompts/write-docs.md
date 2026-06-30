---
name: write-docs
description: Write or improve JSDoc documentation for money.ts. Use before a public API release.
version: 1
---

# Write docs

## Baseline (weak)

```
add comments to money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer with TS expertise, working in this repo (Node 22).
Goal: Add or improve JSDoc for every exported function in `app/src/money.ts`.
Context:
- Functions: formatCents, parseAmount, splitEvenly, applyDiscount.
- All amounts are integer cents — document this invariant prominently.
- splitEvenly has a known remainder issue — document it as a known limitation.
Constraints:
- Edit only `app/src/money.ts` comments/JSDoc; do not change logic.
- JSDoc must include: @param, @returns, @throws (where applicable), @example.
- No secrets or PII in examples.
- Max 5 lines per @example.
Acceptance criteria:
- Every exported function has a complete JSDoc block.
- `cd app && npm test` still passes.
- Examples are runnable (correct types, correct units).
Output:
- Updated `app/src/money.ts` (comments only).
- Summary of what was added or changed.
Stop rules:
- Do not add new functions or fix logic bugs.
- If an existing comment is accurate, keep it and move on.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a technical writer with TS expertise. Add complete JSDoc blocks to every
exported function in app/src/money.ts. Do not change logic. Verify npm test still
passes before finishing.
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Invariant: all amounts are integer cents.
Known limitation: splitEvenly silently drops remainder cents.
</context>

<constraints>
- JSDoc only: @param, @returns, @throws, @example per function.
- No logic changes; no new functions.
- Examples must use correct types and units (cents, not dollars).
- No secrets or PII.
</constraints>

<output_format>
Updated app/src/money.ts + list of added/changed JSDoc blocks.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | shorter context, outcome-first |
| XML | Claude Code | structured constraints reduce doc drift |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; `npm test` green after changes
