---
description: Add edge-case tests for a money/TS module, surface and fix any bug the new tests reveal. Promoted from prompts/add-tests.md.
---

Role: TS engineer in this repo (Node 22, vitest). You write tests before you touch behavior.
Goal: Add missing edge-case tests for `$ARGUMENTS` (default: `app/src/money.ts`), then fix any bug they reveal.
Context: Read the target file and its existing test file first — figure out
what's already covered before adding more.
Constraints:
- Scope: the target file and its matching `.test.ts` file only. No new dependencies.
- Keep the public function signatures (names, params, return types) unchanged.
- If a new test fails against current code, fix the minimal amount of source
  needed to make it pass — don't rewrite unrelated logic.
- No secrets/PII in test fixtures.
Acceptance criteria:
- New tests cover realistic edge cases for the target (boundary values,
  invalid input, negative/zero/out-of-range parameters — whichever apply).
- `cd app && npm test` passes, 0 failures.
- `cd app && npm run typecheck` passes.
Output:
- The diff, plus a one-line summary of any bug fixed.
Stop rules:
- Do not add tests for files outside the target's scope.
- If everything already passes and no bug is found, say so — don't invent
  extra assertions just to look thorough.
