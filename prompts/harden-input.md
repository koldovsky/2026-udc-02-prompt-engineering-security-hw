---
name: harden-input
description: Add input validation to public functions (range/NaN/format guards) with tests. Use to close the unvalidated-percent gap.
version: 1
---

# Harden input (validation)

Adds defensive validation to exported functions. Example target:
`applyDiscount` in `app/src/money.ts` accepts any `percent`, including
out-of-range values that produce nonsense.

## Baseline (weak) — what you started from

```
зроби applyDiscount безпечнішим
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest). Defensive, test-backed.
Goal: Validate inputs of $ARGUMENTS and reject invalid values clearly.
Context: applyDiscount(cents, percent) does no range check; percent must be 0–100.
  parseAmount already throws on bad input — match that error style.
Constraints:
- Throw a descriptive Error on invalid input; do NOT change valid-path results.
- Add tests for each new guard (out-of-range, NaN, non-finite).
- Touch only the target fn + its test. No new deps. No secrets/PII.
Acceptance criteria:
- Out-of-range / NaN percent throws; valid cases unchanged.
- `cd app && npm test` green.
Output:
- Changed source + tests + a one-line note of the guards added.
Stop rules:
- If a guard would change an existing passing test's value, STOP and ask.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a defensive TS engineer. Add input validation to the target function and
back each guard with a test. Do not change valid-path behavior. Verify the suite
is green before finishing.
</instructions>

<context>
Target: $ARGUMENTS — applyDiscount(cents, percent) lacks a 0–100 range check.
Match parseAmount's throw-on-bad-input style.
</context>

<constraints>
- Throw descriptive Errors; valid results unchanged; touch only target + its test.
- No new deps, no secrets/PII.
</constraints>

<output_format>
Changed source + tests + summary of guards added.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | "don't change the valid path" holds under edits |

## Verified

- [ ] Authored against `app/src/money.ts` (applyDiscount); ready to run