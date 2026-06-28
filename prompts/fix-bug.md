---
name: fix-bug
description: Fix a confirmed bug test-first — write a failing test, then the minimal fix. Use after the bug is understood.
version: 1
---

# Fix bug (test-first)

For a *confirmed* bug: write a failing test that captures it, then make the
minimal change to go green. Keeps fixes honest and regression-proof.

## Baseline (weak)

```
полагодь баг зі здачею в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You fix bugs test-first.
Goal: Fix $ARGUMENTS (default: the remainder-cent bug in splitEvenly) correctly.
Context: splitEvenly(100,3) returns [33,33,33] (=99) and loses a cent. The sum of
  shares must equal the input total. Verify with `cd app && npm test`.
Constraints:
- Write the failing test FIRST, then the smallest code change to pass it.
- Keep the public API (signature of splitEvenly) unchanged; no new deps.
- Do not touch unrelated functions. No secrets/PII.
Acceptance criteria:
- New test asserts sum(splitEvenly(total,n)) === total for non-divisible cases.
- All tests green after the fix; remainder distributed deterministically.
Output:
- The new test + the diff + a one-line explanation of the fix.
Stop rules:
- If the "bug" turns out to be intended behavior, STOP and explain.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | outcome-first, test-first flow |

## Verified

- [x] Run against `app/src/money.ts` (splitEvenly)
- [x] Failing test written first; minimal fix made sum == total; tests green
