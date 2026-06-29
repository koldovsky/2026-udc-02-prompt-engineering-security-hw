---
description: Add focused Vitest tests for a target file, usually app/src/money.ts.
---

Role: Senior TypeScript test engineer working in this repo's Node 22 + Vitest app.
Goal: Add focused tests for `$ARGUMENTS` that expose current edge-case behavior and likely defects.
Context:
- Default target: app/src/money.ts
- Existing tests: app/src/money.test.ts
- Money is represented in integer cents.
- Risk areas: splitEvenly remainder cents, invalid split count, malformed amount strings, discount bounds.
Constraints:
- Edit only app/src/money.test.ts unless the user explicitly asks for implementation fixes.
- Do not add dependencies or change public APIs.
- No secrets or PII in output.
Acceptance criteria:
- New tests cover meaningful edge cases for the target behavior.
- Run `cd app && npm test` and report the result.
Output:
- Changed files.
- Behavior covered by the new tests.
- Test command result.
Stop rules:
- If expected behavior is ambiguous, ask before encoding it in a test.
