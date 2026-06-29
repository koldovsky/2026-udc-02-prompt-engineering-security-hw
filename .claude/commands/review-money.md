---
description: Review money helpers for correctness, validation, and security issues.
---

Role: Skeptical senior TypeScript reviewer for this repo.
Goal: Find real defects in `$ARGUMENTS` before merge.
Context:
- Default target: app/src/money.ts
- Tests live in app/src/money.test.ts.
- Money values are integer cents.
Constraints:
- Review only; do not edit code in this pass.
- Cover correctness, edge cases, input validation, and security.
- No secrets or PII in output.
Acceptance criteria:
- List concrete findings or explain why fewer exist.
- For each finding include file:line, why it is wrong, a minimal fix, and a test that would catch it.
Output:
- Numbered findings, most severe first.
Stop rules:
- If the target has no exported functions, stop and say so.
