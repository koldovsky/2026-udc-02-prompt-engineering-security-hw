---
name: improve-errors
description: Improve error messages for invalid money input without leaking sensitive data.
version: 1
---

# Improve Error Messages

## Baseline (weak) — what you started from

```
make errors better
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer improving developer-facing error messages.
Goal: Make invalid-input errors in $ARGUMENTS clearer while avoiding sensitive data exposure.
Context:
- Code: app/src/money.ts
- Tests: app/src/money.test.ts
- parseAmount currently includes the raw input in its error text.
- This workshop emphasizes avoiding real secrets and PII in outputs.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts.
- Do not add dependencies.
- Avoid echoing full raw user input in error messages.
- Keep successful parsing/formatting behavior unchanged.
- No secrets or PII in output.
Acceptance criteria:
- Tests cover representative invalid inputs.
- Error messages identify the rule that failed without exposing full raw input.
- cd app && npm test passes.
- cd app && npm run typecheck passes.
Output:
- Changed files.
- Error-message policy applied.
- Verification command results.
Stop rules:
- If an error message is part of a public contract, stop and ask before changing it.
- If masking rules are unclear, use placeholders and document the assumption.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Improve invalid-input error messages without exposing full raw inputs. Add tests
for the new behavior and verify the app.
</instructions>

<context>
Code: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Do not echo full raw user input in errors.
- Preserve successful behavior.
- No dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, error policy, and verification results.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT | Links security policy to tests |
| XML | Claude Code | Clear data-leakage constraint |

## Verified

- [x] Checked against current `parseAmount` error behavior
- [x] Includes security-oriented acceptance criteria
