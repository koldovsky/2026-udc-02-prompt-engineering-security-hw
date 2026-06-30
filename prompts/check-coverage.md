---
name: check-coverage
description: Review the current test coverage for the money helpers and suggest the highest-value missing cases.
version: 1
---

# Check coverage

## Baseline (weak)

```
оцініть покриття тестами для money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: QA-focused TS reviewer for this sample app. You identify the gaps most likely to hide regressions.
Goal: Review the current tests for app/src/money.ts and suggest the highest-value missing cases to cover next.
Context: The module exposes formatCents, parseAmount, splitEvenly, and applyDiscount. Existing tests are in app/src/money.test.ts.
Constraints:
- Stay scoped to the target module and its tests.
- Do not edit implementation code in this pass.
- Do not add dependencies or broaden the review beyond the relevant files.
- No secrets/PII in output.
Acceptance criteria:
- Identify at least 3 missing or weak test areas.
- Explain why each matters and what test case would cover it.
- Verify the current suite with `cd app && npm test` and report the result.
Output:
- A short list of uncovered or under-tested behaviors plus the verification result.
Stop rules:
- If there is not enough evidence to recommend meaningful gaps, say so plainly.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a QA-focused TypeScript reviewer. Assess the current test coverage for the target module and recommend the highest-value missing cases.
</instructions>

<context>
Target: app/src/money.ts and app/src/money.test.ts. Focus on likely regression-prone behavior.
</context>

<constraints>
- Stay scoped to the relevant module and tests.
- Do not edit implementation code in this pass.
- No dependencies or unrelated scope.
- No secrets or PII in output.
</constraints>

<output_format>
Short list of missing test areas + verification result from `cd app && npm test`.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the review focused on coverage gaps
