---
name: review-test-suite
description: Review a test file for missing coverage, weak assertions, and maintainability issues without editing code.
version: 1
---

# Review test suite (coverage gaps only)

## Baseline (weak) — what you started from

```
are these tests good?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior test reviewer in this repo. You are skeptical of shallow coverage.
Goal: Review $ARGUMENTS for missing cases, weak assertions, and maintainability issues.
Context: The main sample test target is `app/src/money.test.ts`, covering helpers in `app/src/money.ts`.
Constraints:
- Review only; do not edit files in this pass.
- Cite exact tests or missing scenarios.
- Cover correctness, edge cases, failure paths, readability, and duplication.
- No secrets or PII in output.
Acceptance criteria:
- Provide at least 4 concrete findings or justify fewer.
- For each finding: file:line or missing case, why it matters, and the next test to add.
Output:
- Numbered findings, most severe first.
Stop rules:
- If the test file is empty or missing, stop and say so.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Review $ARGUMENTS for missing coverage, weak assertions, and maintainability issues.
  - Review only; do not edit code.
context:
  - Primary sample test target: `app/src/money.test.ts`
  - Production file: `app/src/money.ts`
constraints:
  - At least 4 concrete findings or justify fewer.
  - Cite exact tests or missing scenarios.
  - No secrets or PII.
output_format:
  - Numbered findings
  - For each: location or missing case, why it matters, next test to add
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | sharp review checklist |
| XML | Claude Code / Claude | holds the review-only boundary |

## Verified

- [ ] Run against a real target in `app/`
- [x] Specific to `app/src/money.test.ts`


