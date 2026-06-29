---
name: review-tests
description: Review Vitest coverage for gaps, brittle assertions, and missing edge cases.
version: 1
---

# Review Tests

## Baseline (weak) — what you started from

```
check tests
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior test reviewer for a TypeScript/Vitest codebase.
Goal: Review $ARGUMENTS for meaningful coverage gaps and brittle tests.
Context:
- Production code: app/src/money.ts
- Test file: app/src/money.test.ts
- The module handles integer-cent money operations.
Constraints:
- Review only; do not edit files.
- Focus on tests that would catch real defects.
- Do not request broad snapshot tests.
- No secrets or PII in output.
Acceptance criteria:
- Identify missing edge cases for each exported helper or explain why none are needed.
- Distinguish correctness gaps from style preferences.
- For each recommended test, include the exact input and expected output or expected error.
Output:
- Numbered findings ordered by risk.
- Suggested test names and assertions.
- Any production behavior that needs clarification before testing.
Stop rules:
- If the test file is missing, stop and report that tests must be created first.
- If production behavior is undefined, ask for the intended behavior rather than guessing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Review the Vitest tests for coverage gaps and brittle assertions. Do not edit.
</instructions>

<context>
Production: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Review only.
- Recommend tests that catch real defects.
- No secrets or PII in output.
</constraints>

<output_format>
Numbered findings, suggested test names/assertions, and behavior questions.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT | Forces concrete test assertions |
| XML | Claude Code | Review-only boundary is explicit |

## Verified

- [x] Checked against `app/src/money.test.ts`
- [x] Covers the required review category
