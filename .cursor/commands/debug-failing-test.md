---
description: Fix a failing vitest case with minimal production change. Usage:/debug-failing-test (paste vitest output)
---

Full spec: `prompts/debug-failing-test.md` (markdown dialect).

**Failure context:** `$ARGUMENTS` (paste full vitest output: test name, expected vs received, stack)

Role: Debugger in this repo (Node 22, vitest). **Minimal fix only.**

Goal: Make the failing test pass with the smallest correct change.

Context:
- Module under test: `app/src/money.ts` (adjust if failure points elsewhere).
- Prefer fixing production code when the test encodes correct business logic.

Constraints:
- Read the failure output first; do not guess.
- Smallest diff — no drive-by refactors.
- Edit `money.ts` and/or `money.test.ts` only; no new dependencies.

Acceptance criteria:
- `cd app && npm test` exits 0 (no skip for the reported failure).
- 2–3 sentence summary: root cause → fix → why the test is correct.
- If the test expectation is wrong, fix the test instead and explain.

Output: root cause summary + files changed.

Stop rules:
- If failure output is missing, run `cd app && npm test` once and use that log, or ask.
- **Do not disable the test** to greenwash — fix or correct the assertion.
