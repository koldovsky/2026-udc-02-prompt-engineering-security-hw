---
name: add-logs
description: Add structured logging to key points in src/money.ts. Use when you need observability without leaking sensitive data.
version: 1
---

# Add logs

## Baseline (weak) — what you started from

```
додай логи в money.ts
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: src/money.ts — integer-cent money helpers.
    - Tests: src/money.test.ts — must stay green after changes.
    - No logging library — use console.warn / console.error only.
    - Amounts in cents are NOT sensitive. Function names are NOT sensitive.
    - Sensitive (never log): raw user input strings before validation, full error stacks in production paths.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer adding minimal, security-conscious
        logging to a money-utilities module.
    </role>

    <task>
        Add console logging at key points in <file>src/money.ts</file>:

        - parseAmount — console.warn on invalid input (log that validation failed,
          NOT the raw input value itself).
        - splitEvenly — console.warn on invalid n (before throwing).
        - applyDiscount — console.warn on out-of-range percent (before throwing).

        Log level rules:
        - console.error — unrecoverable, should never happen in normal flow.
        - console.warn — invalid caller input, recoverable by throwing.
        - console.log / console.info — do NOT use; utility functions are called
          on every transaction — logging happy paths creates noise that buries real issues.

        Add a log only where it reduces debugging time. If removing a log would not
        hurt an on-call engineer, do not add it.
    </task>

    <verify>
        Before finishing, confirm:
        - No raw user input values appear in any log message.
        - No amounts, cents values, or financial figures appear in any log message.
        - Every log uses console.warn (not console.log, not console.error).
        - Log messages describe WHAT went wrong, not WHAT the value was.
        - npm test still passes — logging must not change return values or throw behaviour.
        - npx tsc --noEmit passes.
    </verify>
</instructions>

<constraints>
- Edit only src/money.ts.
- Do NOT change function signatures, return values, or thrown errors.
- Do NOT add, remove, or modify any business logic — guards, conditions,
  calculations, and throw statements must remain exactly as they are.
- Insert console.warn or console.error calls only — no other code changes.
  Use console.error only when the situation is unambiguously an error (not just bad input).
  Either way: do NOT change throw statements, return values, or any existing behaviour.
- Do NOT add logging dependencies — console.warn only.
- Do NOT log: raw input strings, cents amounts, user-supplied values.
- Do NOT add logs to formatCents — it cannot fail and has no error path.
- No secrets or PII in output.
</constraints>

<output_format>
- Return the complete updated src/money.ts.
- No explanations, no markdown — only TypeScript code.
</output_format>

<stop>
- Stop after returning the updated file — do not suggest further logging improvements.
- Do not add comments explaining why a log was placed.
- Do not output anything after the closing TypeScript code block.
</stop>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | security constraints need explicit negative rules |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
