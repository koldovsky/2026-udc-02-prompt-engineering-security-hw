---
name: fix-bug
description: Fix a known defect test-first (red→green), minimal change, no collateral. Use to drive the planted splitEvenly remainder fix.
version: 1
---

# Fix bug (test-first)

Drives a specific fix via a failing test. Example target: the remainder-cent bug
in `splitEvenly` (`app/src/money.ts`). Write the test that proves the bug, then
make the smallest change that turns it green.

## Baseline (weak) — what you started from

```
у splitEvenly щось не так з копійками, пофіксь
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest). Work test-first.
Goal: Fix $ARGUMENTS so split shares sum EXACTLY to the total for any n.
Context: splitEvenly(totalCents, n) currently drops the remainder cents.
Constraints:
- Add a failing test FIRST (it must be red against current code).
- Smallest change that makes it pass. Touch only splitEvenly + its test.
- Public API and other functions unchanged. No new deps. No secrets/PII.
Acceptance criteria:
- New test goes red→green; `cd app && npm test` fully green.
- For any total/n: sum(shares) === total and shares differ by at most 1 cent.
Output:
- Changed source + test, and a one-line note of the fix.
Stop rules:
- If the fix needs an API change, STOP and propose it first.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS engineer working test-first. Add a failing test that proves the
defect, then make the smallest change to pass it. Verify the whole suite is
green before finishing.
</instructions>

<context>
Target: $ARGUMENTS — splitEvenly drops remainder cents, so shares can sum to
less than the total. Fix so sum(shares) === total, shares differ by ≤1 cent.
</context>

<constraints>
- Touch only splitEvenly + its test. API unchanged, no new deps, no secrets/PII.
- Test must be red before the fix.
</constraints>

<output_format>
Changed source + test + one-line description of the fix.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | "red before green" discipline holds |

## Verified

- [ ] Authored against `app/src/money.ts` (splitEvenly); ready to run