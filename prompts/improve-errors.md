---
name: improve-errors
description: Improve all error messages in app/src/money.ts so every throw includes the invalid value and a format/range hint, making failures self-diagnosing.
version: 1
---

# Improve Error Messages in money.ts

## Baseline (weak) — what you started from

```text
make errors better in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer improving error quality in `app/src/money.ts`.

Goal: Update every `throw new Error(...)` in `app/src/money.ts` so each message includes: (1) the invalid value, (2) what was expected (format or range). Apply a consistent style across all throwing functions.

Context:
- `app/src/money.ts` exports `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`. Only `parseAmount` throws by default; run `/add-validation` first to add guards to `splitEvenly` and `applyDiscount`.
  - `parseAmount(input)` — currently: `"Not a valid amount: ${input}"`.
    Improve to: `"Not a valid amount: \"${input}\" — expected \"428\", \"4.28\", or \"-4.28\""`.
  - `splitEvenly(_, n)` — after `/add-validation`: `"n must be a positive integer, got ${n}"`.
    Improve to: `"n must be a positive integer, got ${n} — expected a whole number > 0, e.g. 3"`.
  - `applyDiscount(_, percent)` — after `/add-validation`: `"percent must be 0–100, got ${percent}"`.
    Improve to: `"percent must be 0–100, got ${percent} — expected e.g. 10 for 10%"`.

Constraints:
- Modify only `app/src/money.ts`; do not touch any other file.
- Change only the throw message strings — do not alter any logic.
- No new npm dependencies.
- No secrets or PII in examples.

Acceptance criteria:
- `parseAmount("abc")` throws with message containing `"abc"` and the expected format.
- `splitEvenly(100, 0)` throws with message containing `"0"` and a range hint.
- `applyDiscount(100, 110)` throws with message containing `"110"` and a range hint.
- All messages follow a consistent style: `"<what was wrong>: <value> — <hint>"`.
- `cd app && npx vitest run` exits 0 (existing happy-path assertions still pass).

Output:
- The updated throw lines in `app/src/money.ts` shown in context.

Stop rules:
- Do not change any logic — only the string passed to `new Error(...)`.
- Do not update test files — existing tests cover only happy-path assertions (`toBe`, `toEqual`) with no error-path coverage, so changing throw messages cannot break them.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Improve every throw message in
app/src/money.ts so each one includes the invalid value and a hint about what
was expected. Apply a consistent style: "<what was wrong>: <value> — <hint>".
Change only the throw strings — no logic changes. Before finishing, verify:
(1) each message contains the invalid value, (2) each message has a hint,
(3) npx vitest run exits 0.
</instructions>

<context>
File: app/src/money.ts — throwing locations (run /add-validation first for
splitEvenly and applyDiscount guards to exist):

parseAmount:     "Not a valid amount: ${input}"
  → improve to:  "Not a valid amount: \"${input}\" — expected \"428\", \"4.28\", or \"-4.28\""

splitEvenly(n):  "n must be a positive integer, got ${n}"
  → improve to:  "n must be a positive integer, got ${n} — expected a whole number > 0, e.g. 3"

applyDiscount:   "percent must be 0–100, got ${percent}"
  → improve to:  "percent must be 0–100, got ${percent} — expected e.g. 10 for 10%"

Existing tests cover only happy paths (toBe/toEqual) with no error-path assertions — no test changes needed.
</context>

<constraints>
- Modify only app/src/money.ts.
- Change only the throw message strings — no logic changes.
- No new npm packages.
- No secrets or PII.
</constraints>

<output_format>
Each updated throw line shown in context of its surrounding function.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] All throw messages include the invalid value and a hint
- [x] Consistent style across all messages
- [x] Ran `cd app && npx vitest run` — all tests passed
- [x] No logic changes in money.ts
