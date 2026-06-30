---
name: add-tests
description: Add edge-case unit tests for a small TS module without touching production code. Use to raise coverage and pin behavior before a refactor/fix.
version: 1
---

# Add tests

Turns the weak baseline (`допоможи з тестами для app` — "help with tests for
app") into a scoped, verifiable prompt. Point it at `app/src/money.ts`. It
should ADD the edge cases the smoke tests skip (negatives, remainder cents,
bad input, out-of-range discount) while keeping the suite green.

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS test author in this repo (Node 22, vitest, ESM). Tests only.
Goal: Raise edge-case coverage for $ARGUMENTS without changing behavior.
Context: Integer-cent money helpers. Tests live next to source as src/*.test.ts
  and import from "./money.js". One function (splitEvenly) has a KNOWN remainder
  bug — do not fix it here.
Constraints:
- Edit/add ONLY the matching *.test.ts file. Do NOT touch production code.
- No new dependencies. Keep the public API and imports as-is.
- For the known splitEvenly bug: pin CURRENT behavior, or mark intent with
  it.todo/it.skip — never assert a failing expectation just to flag the bug.
- No secrets/PII in test data; use synthetic amounts only.
Acceptance criteria:
- `cd app && npm test` is green.
- New tests cover: negatives, zero, remainder cents, parse errors (throws),
  rounding, and out-of-range discount.
Output:
- The changed *.test.ts file plus a 2–3 line summary of what was added.
Stop rules:
- If covering a case truthfully requires changing production code, STOP and
  report it as a finding instead of editing the source.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS test author (Node 22, vitest, ESM). Add edge-case tests for the
target module. Tests only — do not edit production code. Verify with
`cd app && npm test` before finishing; the suite must stay green.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests sit next to source as
src/*.test.ts and import from "./money.js". splitEvenly has a known remainder
bug — pin current behavior or use it.todo; do not fix it and do not assert a
failing expectation.
</context>

<constraints>
- Edit only the matching *.test.ts file; no new deps; public API unchanged.
- Cover negatives, zero, remainder cents, parse errors, rounding, bad discount.
- Synthetic amounts only — no secrets/PII.
</constraints>

<output_format>
Changed *.test.ts file + a short summary of cases added.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | structure holds the "tests only / stay green" rules |

## Verified

- [x] Authored against `app/src/money.ts`; scope is tests-only (`money.test.ts`)
- [x] `cd app && npm test` green at baseline (4 tests)
- [ ] New edge-case tests committed (left to the owner — the planted bug fix is a separate prompt)
