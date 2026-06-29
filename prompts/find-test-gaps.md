---
name: find-test-gaps
description: Read-only gap analysis between a module and its test file. Use before adding tests.
version: 1
---

# Find test gaps

## Baseline (weak)

```
чого не вистачає в тестах?
```

## Production — markdown (GPT dialect)

```markdown
Role: QA-minded TS engineer. Read-only analysis — do not edit files.
Goal: List concrete test gaps for $ARGUMENTS and its paired *.test.ts.
Context: app/src uses vitest; integer-cent money helpers. Compare exports vs describe/it blocks.
Constraints:
- Read-only; no file changes.
- No secrets/PII in suggested test data.
Acceptance criteria:
- Table: function → covered behaviors → missing behaviors (specific inputs).
- Prioritize: correctness invariants, error paths, boundary values (0, negatives, uneven split).
- At least 5 gap rows OR justify full coverage.
- Suggest exact `it("…")` titles (not full implementations).
Output:
- Gap table + top 3 priorities to add first.
Stop rules:
- If no test file exists, say so and list minimal smoke tests to create.
- Do not fix code — analysis only.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Read-only gap analysis: $ARGUMENTS vs its test file. Table of missing cases
with suggested it() titles. No edits.
</instructions>

<context>
vitest; integer cents; app/src/money.ts + money.test.ts pattern.
</context>

<constraints>
- ≥5 gap rows or justify coverage; synthetic data only.
</constraints>

<output_format>
Gap table + top 3 priorities.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Planning in chat | table format |
| XML | Claude | read-only |

## Verified

- [x] Run against `app/src/money.ts` — listed remainder, percent bounds, single-digit frac gaps
