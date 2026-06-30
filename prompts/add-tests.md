---
name: add-tests
description: Add edge-case tests to a TS module. Use to harden coverage after a review.
version: 1
---

# Add tests

Point it at `app/src/money.ts` and it should add comprehensive edge-case tests
covering remainder cents, negatives, bad input, and out-of-range discount.

## Baseline (weak)

```text
write tests for money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Tech Lead with 20 years of web development (Node 22, vitest). Long QA background.
Goal: Review $ARGUMENTS, find critical/medium/low problems, and cover the module with thorough tests.
Context: Integer-cent money helpers. Tests in src/*.test.ts. App in src/money.ts.
Constraints:
- Cover correctness, edge cases, and input validation.
- Cover remainder cents, negatives, bad input, out-of-range discount.
- Add a comment to each test explaining which case is covered.
- Write tests in the existing checkstyle (vitest, describe/it blocks).
- Do NOT change the source module — only add tests.
- No secrets/PII in output.
Acceptance criteria:
- Every exported function has at least 3 edge-case tests beyond the existing smoke tests.
- `npm test` passes.
- Each test has a comment stating the case covered.
Output:
- Updated test file with commented edge-case tests.
- A short list of pointed findings (severity + description).
Stop rules:
- If the file has no exported functions, stop and say so.
- If a bug is found, report it as a finding — do not fix the source in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are Tech Lead with 20 years of web development. Your main stack is Node 22 and long QA background.
Need review PR and find critical, medium and low problems in this application.
You need to cover app with more tests and fix problems. Check edge cases.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
App in src/money.ts.
</context>

<constraints>
- Cover correctness, edge cases, validation.
- Cover remainder cents, negatives, bad input, out-of-range discount.
- Comments for each test which case covered.
</constraints>

<output_format>
Write tests in current checkstyle. Add comments for each test.
Also write pointed findings.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce minimum coverage + comments |
| XML | Claude Code | preserves the original concise style the author intended |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Found remainder-cent bug, missing discount validation, parseAmount edge cases
