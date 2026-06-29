---
name: debug
description: Diagnose and fix a failing test or runtime error in the money utility module. Use when vitest reports a failure you can't immediately explain.
version: 1
---

# Debug

A worked example for diagnosing failures in `app/src/money.ts` and its tests.
The canonical target bug is the remainder-cent loss in `splitEvenly`.

## Baseline (weak)

```
тест падає, почини
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You read failing output
carefully before touching code. You fix root causes, not symptoms.
Goal: Identify the root cause of the failing test(s) reported below, explain it in
one sentence, then apply the minimal code change that makes the test pass without
breaking any other test.
Context: Integer-cent money helpers in app/src/money.ts (formatCents, parseAmount,
splitEvenly, applyDiscount, addTax). Tests live in app/src/money.test.ts (vitest).
Failing output:
  <paste `npx vitest run --reporter=verbose` output here>
Constraints:
- Edit only the file(s) that contain the bug; do NOT change test assertions to
  force a pass.
- No new npm dependencies.
- No secrets or PII in any added code or comments.
- Do not refactor unrelated code in the same commit.
Acceptance criteria:
- `npx vitest run` exits 0 with no skipped tests.
- The one-sentence root-cause explanation appears as a comment above the fix.
Output:
- Root-cause explanation (one sentence).
- The corrected file(s) in full.
Stop rules:
- If the failing output is not provided, ask for it before touching any code.
- If the fix requires a breaking API change, describe the trade-off and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Read the failing vitest output provided in
<failing_output>, identify the root cause, explain it in one sentence, then apply
the minimal fix. Do NOT change test assertions. Do NOT refactor unrelated code.
All existing passing tests must continue to pass.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers — formatCents, parseAmount,
splitEvenly, applyDiscount, addTax). Tests: app/src/money.test.ts (vitest, Node 22).
Known latent bug for reference: splitEvenly loses remainder cents when totalCents
is not evenly divisible by n (e.g. splitEvenly(10, 3) returns [3,3,3] instead of
[4,3,3]).
</context>

<failing_output>
<!-- paste `npx vitest run --reporter=verbose` output here -->
</failing_output>

<constraints>
- Edit only the file(s) that contain the bug; do not edit test files to hide failures.
- No new npm dependencies.
- No secrets or PII in code or comments — use synthetic values only.
- Add a one-line comment above the fix explaining the root cause.
</constraints>

<output_format>
1. Root-cause explanation (one sentence, plain text).
2. Corrected file(s) in full — no diff, no prose.
</output_format>

<stop_rules>
- If <failing_output> is empty or missing, ask for the vitest output before proceeding.
- If fixing the bug requires a breaking API change, describe the trade-off and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | inline failing output is easy to paste into prose context |
| XML | Claude Code / Claude | `<failing_output>` tag isolates noisy terminal output from the instruction set |

## Verified

- [x] Run against a real failing test in `app/src/money.test.ts`
- [x] All 23 tests already passing; agent confirmed no bugs present; `npx vitest run` exits 0
