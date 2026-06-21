---
name: add-tests
description: Add edge-case unit tests for a TS module without touching production code. Use to harden coverage before a refactor or review.
version: 1
---

# Add tests

Rewrite of the weak baseline (`materials/weak-prompt.md`). Points at
`app/src/money.ts` and adds the edge cases the smoke tests intentionally skip
(remainder cents, negatives, bad input, out-of-range discount). This is the
**dual-dialect** entry for the cookbook (markdown + XML).

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS test author in this repo (Node 22, vitest). Tests live in src/*.test.ts.
Goal: Raise edge-case coverage for $ARGUMENTS without changing behavior.
Context: Integer-cent money helpers (formatCents, parseAmount, splitEvenly,
  applyDiscount). Existing smoke tests pass and must keep passing.
Constraints:
- Only add/modify files matching src/*.test.ts. Do NOT touch production code.
- No new dependencies. Keep using vitest's describe/it/expect.
- No secrets/PII in fixtures — use synthetic numbers only.
Acceptance criteria:
- Cover: remainder cents in splitEvenly, negative amounts, invalid parseAmount
  input, and out-of-range percent in applyDiscount.
- `cd app && npm test` is green; assert exact expected values, not snapshots.
Output:
- The changed test file(s) plus a one-line summary of cases added.
Stop rules:
- If a test reveals a production bug, STOP and report it — do not fix code here.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS test author using vitest. Add edge-case tests for the target
module. Add tests only — never edit production code. Verify `npm test` is green
before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in app/src/*.test.ts.
Existing smoke tests pass and must stay green.
</context>

<constraints>
- Touch only src/*.test.ts. No new dependencies. No secrets/PII in fixtures.
- Cover remainder cents, negatives, invalid input, out-of-range percent.
</constraints>

<output_format>
Changed test file(s) + a short list of the edge cases added.
If a test exposes a real bug, stop and report instead of fixing code.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code | structure holds the "tests only" rule under pressure |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added remainder/negative/bad-input/out-of-range cases; `npm test` green

