---
name: add-validation
description: Add input validation and guard clauses to exported functions. Use after review identifies missing guards.
version: 1
---

# Add validation

Point it at `app/src/money.ts` and it should add defensive guards that throw
descriptive errors for invalid inputs (zero/negative n, out-of-range percent, etc.).

## Baseline (weak)

```text
add validation to money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer with a defensive programming focus (Node 22, vitest).
Goal: Add input validation guards to every exported function in $ARGUMENTS so invalid inputs fail fast with descriptive errors.
Context: Integer-cent money helpers. Tests in src/*.test.ts. Known gaps: splitEvenly accepts n=0/negative, applyDiscount accepts percent outside 0–100.
Constraints:
- Add guards at the top of each function — throw RangeError or TypeError with a message naming the parameter and the constraint.
- Do NOT change happy-path logic, return types, or function signatures.
- Do NOT modify test files.
- For each guard added, include a suggested test case in the output summary.
- No secrets/PII in output.
Acceptance criteria:
- splitEvenly throws on n ≤ 0, non-integer n, and non-integer totalCents.
- applyDiscount throws on percent < 0 or percent > 100.
- parseAmount already throws — verify its error message is descriptive; improve if not.
- `npm run typecheck` passes.
- Existing tests still pass (guards only reject inputs not covered by current tests).
Output:
- Updated source file.
- Summary: one bullet per guard added, with a suggested test case for each.
Stop rules:
- If all inputs are already validated, say so and stop.
- If a guard would break an existing test, flag it and skip.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer focused on defensive programming. Add input
validation guards to every exported function in the target file. Throw
RangeError or TypeError with descriptive messages. Do not change happy-path
logic or tests. Run typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
Known gaps: splitEvenly(n=0), splitEvenly(n&lt;0), applyDiscount(percent&gt;100).
</context>

<constraints>
- Guards at function top: throw RangeError/TypeError naming the param and constraint.
- Do not change return types, signatures, or test files.
- For each guard, suggest a test case in the summary.
- If a guard would break an existing test, flag it and skip.
- No secrets/PII in output.
</constraints>

<output_format>
Updated source file. One bullet per guard: what it checks + suggested test case.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria list every specific guard expected |
| XML | Claude Code | constraints prevent breaking existing tests |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] Invalid inputs throw descriptive errors; existing tests pass
