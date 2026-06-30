---
name: write-docs
description: write documentation for functions in money.ts
version: 1
---

# Write docs

## Baseline (weak) — what you started from

```
задокументуй функції в money.ts
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
- Target file: src/money.ts
- Amounts are integers in cents (no floats).
- Four exported functions: formatCents, parseAmount, splitEvenly, applyDiscount.
- splitEvenly has a known bug: remainder cents are dropped (do not hide this in docs).
</context>

<instructions>
    <role>
        You are a senior TypeScript developer writing JSDoc documentation
        for a money-utilities module.
    </role>

    <task>
        Add or update JSDoc comments for all four exported functions in
        <file>src/money.ts</file>: formatCents, parseAmount, splitEvenly, applyDiscount.

        Each JSDoc must include:
        - @param — name, type, description for every parameter
        - @returns — what is returned and in what unit (cents, string, etc.)
        - @throws — if the function can throw, describe when and what message
        - One concrete @example showing input → output
        - For splitEvenly: a @remarks note that remainder cents are currently dropped
    </task>

    <verify>
        Before finishing, confirm:
        - All four functions have JSDoc.
        - @throws is present on parseAmount.
        - @remarks about remainder is present on splitEvenly.
        - No logic in src/money.ts was changed — only comments.
        - npx tsc --noEmit still passes.
    </verify>
</instructions>

<constraints>
- Do NOT change any logic in src/money.ts — only add or update comments.
- Do NOT touch src/money.test.ts.
- Use standard JSDoc tags: @param, @returns, @throws, @example, @remarks.
- No secrets or PII in output.
</constraints>

<output_format>
- Return the complete updated src/money.ts file.
- No explanations, no markdown — only TypeScript code.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
