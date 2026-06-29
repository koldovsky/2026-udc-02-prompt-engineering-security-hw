---
name: add-validation
description: Add explicit input validation to money helpers with tests and stable public APIs.
version: 1
---

# Add Validation

## Baseline (weak) — what you started from

```
make money functions safer
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer adding defensive validation to a money utility.
Goal: Add explicit validation for $ARGUMENTS while keeping exported APIs stable.
Context:
- Code: app/src/money.ts
- Tests: app/src/money.test.ts
- Likely validation targets: splitEvenly n must be a positive integer; applyDiscount percent should be between 0 and 100; parseAmount rejects malformed strings already.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts.
- Do not add dependencies.
- Keep exported function names and return types unchanged.
- Throw clear Error messages for invalid inputs.
- No secrets or PII in output.
Acceptance criteria:
- Invalid input behavior has tests.
- Valid existing examples still pass.
- cd app && npm test passes.
- cd app && npm run typecheck passes.
Output:
- Changed files.
- Validation rules added.
- Verification command results.
Stop rules:
- If validation semantics are unclear, propose options and ask before editing.
- If validation would break documented behavior, call that out before changing it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Add explicit validation to the selected money helper behavior, with tests and
typecheck verification.
</instructions>

<context>
Code: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Stable exported APIs.
- Clear Error messages.
- No dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, validation rules, npm test result, npm run typecheck result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT | Specifies concrete validation candidates |
| XML | Claude Code | Keeps validation rules bounded |

## Verified

- [x] Checked against `app/src/money.ts`
- [x] Targets real missing-validation spots
