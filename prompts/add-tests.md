---
name: add-tests
description: Add focused edge-case tests for a TS module without touching production code. Use when coverage skips boundaries.
version: 1
---

# Add tests (edge cases)

The cookbook entry that replaces the weak baseline `допоможи з тестами для app`.
Pointed at `app/src/money.ts`, it makes the agent ADD the edge cases the existing
smoke tests skip (remainder cents in `splitEvenly`, negatives, bad input,
out-of-range discount) — without editing production code.

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS test engineer in this repo (Node 22, vitest). You write precise, minimal tests.
Goal: Raise edge-case coverage for $ARGUMENTS (default: app/src/money.ts).
Context: Integer-cent money helpers. Existing smoke tests in src/money.test.ts pass
  but skip boundaries. Run with `cd app && npm test`.
Constraints:
- Add tests ONLY; do NOT modify production code (money.ts) in this pass.
- No new dependencies. Use the existing vitest setup.
- No secrets/PII in test data — use small synthetic numbers.
Acceptance criteria:
- New tests cover: remainder cents (splitEvenly(100,3)), negative amounts,
  invalid parseAmount input, and out-of-range applyDiscount (e.g. 150, -10).
- `cd app && npm test` runs; clearly show which new tests fail because of the
  real bug vs. pass.
Output:
- The added test cases + a one-line summary of what each one proves.
Stop rules:
- If a test would require changing money.ts to pass, STOP and report the bug
  instead of editing source.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS test engineer (Node 22, vitest). Add edge-case tests for the target
module. Add tests only — do not modify production code. Verify with
`cd app && npm test` before finishing.
</instructions>

<context>
Target: $ARGUMENTS (default app/src/money.ts) — integer-cent money helpers.
Existing smoke tests in src/money.test.ts pass but skip boundaries.
</context>

<constraints>
- Add tests only; no edits to money.ts; no new dependencies.
- Cover: remainder cents (splitEvenly(100,3)), negatives, invalid parseAmount,
  out-of-range applyDiscount.
- Synthetic numbers only — no secrets/PII.
</constraints>

<output_format>
Added test cases + one line per test on what it proves. If a test needs a source
change to pass, stop and report the bug instead.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | structure holds the "tests only" rule |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope (no edits to money.ts); new tests expose the
      remainder-cent bug and missing discount-range check
