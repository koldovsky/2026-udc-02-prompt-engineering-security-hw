---
name: edge-cases
description: Enumerate untested edge cases and inputs for a module — analysis only, no code. Use to plan test coverage before writing tests.
version: 1
---

# Edge cases (enumerate, don't fix)

Point it at `app/src/money.ts`; it produces a prioritized list of gaps that
feeds straight into `add-tests`.

## Baseline (weak)

```
які крайні випадки в money.ts?
```

## Production — markdown (GPT dialect)

```markdown
Role: Test analyst in this repo (Node 22, vitest). You map risk, you don't code.
Goal: Enumerate the untested edge cases and risky inputs for $ARGUMENTS.
Context: Integer-cent money helpers with a thin smoke-test suite.
Constraints:
- Analysis only — do NOT write code or tests in this pass.
- Group by function; mark each case present/absent in the current tests.
- No secrets/PII; use synthetic example inputs.
Acceptance criteria:
- A table: function | input | expected | covered? | severity.
- At least 6 cases, including negatives, zero, large values, remainder/rounding,
  and invalid input.
Output:
- The table + a 3-item "test these first" shortlist.
Stop rules:
- Do not propose source fixes here; hand off bugs to the `debug` / review prompt.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | ChatGPT / Copilot | tables render cleanly |

## Verified

- [x] Run against `app/src/money.ts` (dry-run: surfaced remainder + range gaps, no code)
