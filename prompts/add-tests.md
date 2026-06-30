---
name: add-tests
description: technical test cases, which should cover all technical issues
version: 1
---

# add-test

app/src/money.test.ts for missing coverage of app/src/money.ts and add only the absent test cases. Do not modify app/src/money.ts.

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript automation engineer working in the `app/` Vitest suite.
Goal: Add missing unit tests to `app/src/money.test.ts` so every exported function and edge case in `app/src/money.ts` is covered.
Context:
- Implementation: `app/src/money.ts` (read-only)
- Test file: `app/src/money.test.ts` (the only file you may edit)
- Test runner: `npm test` (Vitest)
Constraints:
- Edit only `app/src/money.test.ts`.
- Do not modify `app/src/money.ts` or add new dependencies.
- No secrets or PII in output.
Acceptance criteria:
- `npm test` passes with no failing tests.
- Every exported function in `app/src/money.ts` has at least one happy-path and one edge-case test.
Output:
- The updated `app/src/money.test.ts` with new tests appended.
- A one-line summary of which functions gained coverage.
Stop rules:
- If existing tests already cover every path, state that and make no changes.
- If a failing test reveals a bug in `app/src/money.ts`, report it without editing that file.
```
