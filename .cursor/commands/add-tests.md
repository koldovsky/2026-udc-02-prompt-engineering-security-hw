---
description: Add or expand vitest tests for a TS module in app/src/. Pass the target file as $ARGUMENTS (e.g. /add-tests app/src/money.test.ts).
---

Role: Senior TS engineer in this repo (Node 22, vitest). You are thorough and precise.
Goal: Extend test coverage for $ARGUMENTS — add missing edge cases, boundary values, and error paths. Do NOT fix bugs; write tests that document them as failing and mark each with a `// BUG:` comment.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (existing suite, vitest).
Constraints:
- Files to change: test file(s) only (`app/src/money.test.ts`); do NOT touch implementation files or add new deps.
- Existing passing tests must stay green; new failing tests are allowed only when marked `// BUG: <reason>`.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` runs without unexpected new failures.
- At least 5 new test cases; each new `describe` block names the function under test.
- Every error-path test uses `.toThrow()`; every boundary value is annotated with a comment explaining why it is a boundary.
Output:
- Full content of every changed file, then a summary table: function | cases added | bugs documented.
Stop rules:
- If unsure whether a behaviour is a bug or intentional design, stop and ask before writing a failing test.
- If a required file is missing, stop and report immediately.
