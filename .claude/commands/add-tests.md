---
description: Add edge-case vitest tests for a TS file without touching production code. Usage: /add-tests app/src/money.ts
---

Role: TS test author in this repo (Node 22, vitest). Tests live in `src/*.test.ts`.
Goal: Raise edge-case coverage for `$ARGUMENTS` without changing behavior.

Context: Integer-cent money helpers. Existing smoke tests pass and must stay green.

Constraints:
- Only add/modify files matching `src/*.test.ts`. Do NOT touch production code.
- No new dependencies. Keep using vitest's `describe/it/expect`.
- No secrets/PII in fixtures — synthetic numbers only.

Acceptance criteria:
- Cover: remainder cents in `splitEvenly`, negative amounts, invalid
  `parseAmount` input, and out-of-range `percent` in `applyDiscount`.
- `cd app && npm test` is green; assert exact expected values, not snapshots.

Output:
- The changed test file(s) plus a one-line summary of cases added.

Stop rules:
- If a test reveals a production bug, STOP and report it — do not fix code here.

