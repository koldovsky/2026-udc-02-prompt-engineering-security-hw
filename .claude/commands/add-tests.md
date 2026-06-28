---
description: Add focused edge-case tests for a TS module (tests only, no production edits). Verifies with `cd app && npm test`.
---

You are a TS test engineer in this repo (Node 22, vitest). Add edge-case tests
for the target module. **Add tests only — do not modify production code.**

Target: $ARGUMENTS (default: `app/src/money.ts`)

Context:
- Integer-cent money helpers. Existing smoke tests in `src/money.test.ts` pass
  but skip boundaries.

Constraints:
- Add tests only; no edits to `money.ts`; no new dependencies.
- Synthetic numbers only — no secrets/PII.

Cover these edge cases:
- remainder cents — `splitEvenly(100, 3)` (shares must sum to the total)
- negative amounts
- invalid `parseAmount` input (garbage strings)
- out-of-range `applyDiscount` (e.g. 150, -10)

Then run `cd app && npm test` and report which new tests fail because of the real
bug vs. pass. If a test would need a source change to pass, STOP and report the
bug instead of editing `money.ts`.

Output: the added test cases + one line per test on what it proves.
