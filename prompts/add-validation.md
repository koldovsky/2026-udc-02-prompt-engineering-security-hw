---
name: add-validation
description: Add input validation (guard clauses + clear errors) to a function/file for invalid args, without changing behavior for valid input. Pass the target as $ARGUMENTS.
version: 1
---

# Add input validation

Fail fast and loud on bad input. Verified against `app/src/money.ts` (e.g.
`applyDiscount` should reject `percent` outside 0–100; `splitEvenly` should reject
`n <= 0`).

## Baseline (weak) — what you started from

```
add some validation
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a defensive TS engineer (Node 22, vitest).
Goal: Add input validation to $ARGUMENTS so invalid arguments fail fast with clear errors.
Context:
- Small TS module in `app/src/`; tests in the sibling `*.test.ts`. Run: `cd app && npm test`.
- Existing precedent: `parseAmount` throws `new Error("Not a valid amount: ...")` on garbage — match that style.
Constraints:
- Behavior for VALID input must not change. Add guard clauses at function entry that `throw` (don't silently clamp) on out-of-range / NaN / wrong-type / non-finite input.
- Error messages: specific and safe — name the param and the constraint, include NO secrets/PII or full payloads.
- No new dependencies.
Acceptance criteria:
- Each public function rejects its documented invalid inputs (e.g. `applyDiscount` percent <0 or >100; `splitEvenly` n<=0 or non-integer).
- Add/extend tests asserting the throws; `cd app && npm test` green for valid+invalid cases; `npm run typecheck` passes.
Output:
- Updated source + tests, plus a table of (function → rejected inputs → message).
Stop rules:
- If a validation rule is ambiguous (what counts as valid?), state your assumption and pick the conservative option.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a defensive TS engineer. Add entry guard clauses to $ARGUMENTS so invalid
args throw with clear, safe messages — without changing behavior for valid input.
Match the existing `parseAmount` throw style. Verify with `cd app && npm test`.
</instructions>

<context>
Small TS module in app/src/; tests in the sibling *.test.ts. Precedent:
parseAmount throws `Not a valid amount: ...`.
</context>

<constraints>
- Throw (don't clamp) on out-of-range/NaN/non-finite/wrong-type. Messages name the param + constraint, no secrets/PII or full payloads.
- Valid-input behavior unchanged. No new deps. Add tests for the throws.
</constraints>

<output_format>
Updated source + tests + a table: function → rejected inputs → error message.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure keeps messages safe + valid path intact |

## Verified

- [x] Run against `app/src/money.ts`
- [x] `applyDiscount`/`splitEvenly` reject bad input; valid path + typecheck unchanged
