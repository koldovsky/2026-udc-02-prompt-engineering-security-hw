---
name: fix-bug
description: Drive a correctness fix test-first — add a failing test that proves the bug, then make it pass. Use for a known defect.
version: 1
---

# Fix bug (test-first)

Used to drive the planted `splitEvenly` defect: it dropped the remainder cent so
shares did not sum back to the total.

## Baseline (weak) — what you started from

```
splitEvenly looks wrong, fix it
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest). You work test-first.
Goal: Fix the described defect in $ARGUMENTS so it is provably correct.
Context:
- Defect: splitEvenly(totalCents, n) drops remainder cents — shares don't sum to total.
  e.g. splitEvenly(100, 3) returns [33,33,33] (sum 99), should be [34,33,33] (sum 100).
Constraints:
- Add a FAILING test that captures the bug FIRST, then fix the code to pass it.
- Preserve the public API and the integer-cent invariant (no floats leaking out).
- Keep existing tests green; no new deps.
Acceptance criteria:
- New test asserts shares sum to total for divisible AND non-divisible cases (and negatives).
- `cd app && npm test` green; `npm run typecheck` clean.
Output:
- The new test + the code fix + a one-line root cause.
Stop rules:
- If the "bug" is actually expected behavior, STOP and explain — don't change it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a test-first TS engineer. Add a failing test that proves the defect in
the target, then fix the code to make it pass. Keep the public API and the
integer-cent invariant. Verify with `npm test`.
</instructions>

<context>
Target: $ARGUMENTS. Defect: splitEvenly drops remainder cents (shares != total).
</context>

<constraints>
- Failing test first, then fix. No API change, no new deps. Existing tests stay green.
</constraints>

<output_format>
Failing test → code fix → root cause (one line).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | linear test-then-fix |
| XML | Claude Code | "test first" ordering holds |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added remainder/conservation tests, fixed `splitEvenly` to distribute the
      remainder; `splitEvenly(100,3) -> [34,33,33]`; `npm test` green
