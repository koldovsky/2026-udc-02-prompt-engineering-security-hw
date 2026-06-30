---
name: add-tests           # e.g. add-tests, review-pr, write-docs
description: Adds tests for app/src/money.ts. Use it when you need to add unit-tests for app/src/money.ts
version: 1
---

# Add tests

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — XML (Anthropic / Claude dialect)

```xml

<context>
    - Target files: src/money.ts, src/money.test.ts
    - Amounts are integers in cents (no floats).
    - splitEvenly has to split amount evenly.
    - parseAmount throws Error with message "Not a valid amount: (input)".
    - Test runner: Vitest. Run with: npm test inside /app.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer, writing tests, for a money-utilities module.
    </role>

    <task>
        Add edge-case tests to <file>src/money.test.ts</file> for all four
        exported functions: formatCents, parseAmount, splitEvenly, applyDiscount.

        Target file under test: <file>src/money.ts</file>.
        Test framework: Vitest (already imported).
        
        Cases to cover:
        
        - formatCents: zero, negative cents, exactly 100 cents
        - parseAmount: single-digit fraction ("1.5"), negative ("-10.00"),
        zero ("0"), throws on empty string / non-numeric / too many decimal places
        - splitEvenly: pin current behaviour — do NOT assert what the correct result
        should be; instead assert what the function actually returns today.
        Example: splitEvenly(10, 3) currently returns [3, 3, 3] — assert that.
        - applyDiscount: 0%, 100%, fractional-cent rounding, out-of-range percent
    </task>

    <verify>
        Before finishing, mentally run `npm test` and confirm:
        - All existing tests still pass.
        - New tests for formatCents, parseAmount, applyDiscount pass.
        - The splitEvenly remainder test is present (may fail — that is expected).
    </verify>
</instructions>

<constraints>
- Do NOT change src/money.ts — only edit the test file.
- Do NOT remove or modify existing tests.
- Each test must have a descriptive name explaining the case.
- Use only Vitest APIs already imported: describe, it, expect.
</constraints>

<output_format>
- Return the complete updated src/money.test.ts file.
- Insert new it() blocks inside the existing describe() block for each function.
- No explanations, no markdown — only TypeScript code.
</output_format>

<stop>
- Stop after returning the updated file — do not suggest additional test cases.
- Do not explain why each test was chosen.
- Do not output anything after the closing TypeScript code block.
</stop>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
