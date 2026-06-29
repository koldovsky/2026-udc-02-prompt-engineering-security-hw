---
name: add-tests
description: Add focused Vitest coverage for money helper edge cases without changing production code first.
version: 1
---

# Add Tests

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript test engineer working in this repo's Node 22 + Vitest app.
Goal: Add focused tests for app/src/money.ts that expose current edge-case behavior and likely defects.
Context:
- Target file: app/src/money.ts
- Existing tests: app/src/money.test.ts
- Money is represented in integer cents.
- Known risk areas: splitEvenly remainder cents, invalid split count, negative totals, parseAmount malformed input, applyDiscount percent bounds.
Constraints:
- Edit only app/src/money.test.ts.
- Do not change app/src/money.ts in this pass.
- Do not add dependencies or change public APIs.
- Use deterministic assertions; no snapshots.
- No secrets or PII in output.
Acceptance criteria:
- Add tests that fail on at least one real correctness gap before implementation is fixed.
- Cover splitEvenly remainder handling, invalid n, parseAmount bad input, and applyDiscount out-of-range percent.
- Run cd app && npm test and report the result.
Output:
- List changed files.
- Summarize which behavior each new test protects.
- Include the test command result.
Stop rules:
- If app/src/money.ts or app/src/money.test.ts is missing, stop and report the missing file.
- If tests require a product decision, ask before encoding that behavior.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript test engineer. Add focused Vitest tests for
app/src/money.ts edge cases, then run the test suite and report the result.
</instructions>

<context>
Target: app/src/money.ts
Tests: app/src/money.test.ts
Stack: Node 22, TypeScript, Vitest
Risk areas: remainder cents, invalid split count, bad amount strings, discount bounds
</context>

<constraints>
- Edit only app/src/money.test.ts.
- Do not change production code in this pass.
- No new dependencies and no public API changes.
- No secrets or PII in output.
</constraints>

<acceptance_criteria>
- Tests cover splitEvenly remainder handling and invalid n.
- Tests cover parseAmount malformed input.
- Tests cover applyDiscount percent below 0 and above 100.
- cd app && npm test has been run and reported.
</acceptance_criteria>

<output_format>
Changed files, behavior covered, and test command result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT / Copilot | Clear scope and acceptance criteria |
| XML | Claude Code | Strong instruction boundaries |

## Verified

- [x] Checked against `app/src/money.ts` and `app/src/money.test.ts`
- [x] Acceptance criteria are executable with `cd app && npm test`
