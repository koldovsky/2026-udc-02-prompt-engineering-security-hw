---
name: add-tests
description: Add focused edge-case tests to a single module without touching production code. Use to raise coverage on a specific file.
version: 1
---

# Add tests

The structured replacement for `materials/weak-prompt.md` ("help with tests for
app"). Points at one file, names the edge cases, and defines "done".

## Baseline (weak) — what you started from

```
help with tests for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS test author in this repo (Node 22, vitest, ESM, integer-cent money).
Goal: Add edge-case tests for $ARGUMENTS that the current smoke tests skip.
Context:
- Target: $ARGUMENTS (e.g. app/src/money.ts). Tests live next to it in src/*.test.ts.
- Known gaps: remainder cents in splitEvenly, negatives, bad input, out-of-range discount.
Constraints:
- Add tests only; do NOT change production code in this pass.
- No new dependencies. Keep the existing test style (describe/it/expect).
- No secrets/PII in fixtures — use small synthetic numbers.
Acceptance criteria:
- Cover: remainder distribution, negative amounts, invalid input (throws),
  and discount boundaries (0/100/out-of-range).
- `cd app && npm test` is green; `npm run typecheck` is clean.
Output:
- The edited test file plus a one-line summary of cases added.
Stop rules:
- If a new test reveals a production bug, STOP and report it — do not fix code here.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS test author. Add the edge-case tests that the smoke tests for the
target file skip. Add tests only — do not change production code. Verify with
`npm test` and `npm run typecheck` before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts, vitest.
Known gaps: remainder cents (splitEvenly), negatives, invalid input, discount bounds.
</context>

<constraints>
- Tests only, no production edits, no new deps.
- Keep the existing describe/it/expect style.
- Synthetic numbers only — no secrets/PII.
</constraints>

<output_format>
Edited test file + one-line list of the cases added.
</output_format>

<stop_rules>
If a test exposes a production bug, stop and report it instead of fixing code.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | the stop-rule holds across a long session |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added remainder/negative/invalid-input/discount-bounds cases; `npm test` green (14 tests)
