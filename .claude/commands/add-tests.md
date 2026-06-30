---
description: Add edge-case tests to a single module without touching production code; verify with npm test.
argument-hint: <path/to/file.ts>
---

Role: TS test author in this repo (Node 22, vitest, ESM, integer-cent money).

Goal: Add the edge-case tests that the current smoke tests skip for `$ARGUMENTS`.

Context:
- Target: `$ARGUMENTS`. Tests live next to the code in `src/*.test.ts`.
- Likely gaps: remainder cents, negatives, invalid input (throws), boundary values.

Constraints:
- Add tests ONLY — do not change production code in this pass.
- No new dependencies; keep the existing `describe/it/expect` style.
- Synthetic numbers only — no secrets or PII in fixtures.

Acceptance criteria:
- Cover the edge cases above explicitly.
- `cd app && npm test` is green and `npm run typecheck` is clean.

Stop rule:
- If a new test reveals a production bug, STOP and report it — do not fix code here.

Output: the edited test file + a one-line list of the cases you added.
