# A/B Prompt Experiment (Task E, Bonus)

Task on `app/`: add focused tests for `app/src/money.ts`.

The experiment compares the weak prompt from `materials/weak-prompt.md` with
the structured `prompts/add-tests.md` prompt created for Task A.

## Prompt A — Basic

```text
допоможи з тестами для app
```

English equivalent:

```text
help with tests for app
```

## Prompt B — Structured

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

## Comparison

| Criterion | Prompt A | Prompt B |
|---|---|---|
| Prompt size, estimated tokens | 5 | 280 |
| Iterations to acceptable result | 3 estimated: clarify target file, clarify scope, ask for verification | 1 estimated: scope, target, constraints, and verification are included |
| Output tokens, estimated | ~900-1,200 across follow-ups | ~500-700 in one pass |
| Quality of result | Likely broad or uneven; may inspect too much of `app/` and add only happy-path tests | Focused edge-case coverage for `money.ts`, including known risk areas |
| Scope control | Weak; agent may edit production code, add dependencies, or change APIs | Strong; test-only pass, no dependencies, stable API |
| Safety / validation | Must be requested separately | Includes no secrets/PII and invalid-input edge cases |
| Verification | Agent decides when done | Requires `cd app && npm test` result |

## Measurement Notes

Prompt token counts are local estimates using the same reproducible regex as
Task D: `[A-Za-zА-Яа-яЇїІіЄєҐґ0-9_]+|[^\sA-Za-zА-Яа-яЇїІіЄєҐґ0-9_]`.
Output token and iteration counts are estimated from expected workflow shape,
not model billing data.

Current repo verification after documenting the experiment:

```bash
cd app && npm test
cd app && npm run typecheck
```

Both commands passed.

## Conclusion

The structured prompt costs more up front, but it pays off for this task because
it removes ambiguity about files, behavior, constraints, and verification. The
biggest difference is not raw token count; it is that Prompt B prevents the
agent from turning a test-writing task into an unconstrained app edit.
