---
name: refactor-code
description: Fix defects in src/money.ts found by code review — remainder loss, missing guards. Use after review-pr surfaces concrete bugs.
version: 1
---

# Refactor code

## Baseline (weak) — what you started from

```
почисти money.ts
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: src/money.ts — integer-cent money helpers.
    - Tests: src/money.test.ts — must stay green after refactor.
    - Known defects (from code review):
      1. splitEvenly silently drops remainder cents — splitEvenly(10, 3) returns [3,3,3], sum=9 not 10.
      2. splitEvenly does not guard n — n=0 causes division by zero, n<1 returns garbage silently.
      3. applyDiscount does not guard percent — values outside 0–100 produce negative or inflated prices.
    - Public API (function signatures) must not change.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer fixing defects with surgical precision —
        minimum diff, maximum correctness. You do not clean up unrelated code.
    </role>

    <task>
        Fix all three defects in <file>src/money.ts</file>:

        1. splitEvenly — distribute remainder cents so sum of shares always equals totalCents.
        2. splitEvenly — throw RangeError if n < 1 or not an integer.
        3. applyDiscount — throw RangeError if percent is outside 0–100.
    </task>

    <verify>
        Before finishing, confirm:
        - splitEvenly(10, 3) returns [4, 3, 3] (sum === 10).
        - splitEvenly(9000, 3) still returns [3000, 3000, 3000].
        - splitEvenly(100, 0) throws RangeError.
        - applyDiscount(10000, 150) throws RangeError.
        - applyDiscount(10000, 10) still returns 9000.
        - npx tsc --noEmit passes.
        - npm test passes — if a pinned-behaviour test now contradicts the fix, update it.
    </verify>
</instructions>

<constraints>
- Edit only src/money.ts.
- Do NOT change function signatures.
- Do NOT add dependencies.
- Touch src/money.test.ts only if an existing test now contradicts a fixed behaviour — correct that assertion only, do not remove other tests.
- No secrets or PII in output.
</constraints>

<output_format>
- Return the complete updated src/money.ts.
- If src/money.test.ts changed, return it too.
- No explanations, no markdown — only TypeScript code.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | surgical fixes need tight constraints |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
