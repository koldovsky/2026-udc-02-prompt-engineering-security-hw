---
name: refactor
description: Structural refactor — change code shape without changing behavior. Use with any goal; extracting a shared guard into a private helper is the worked example.
version: 1
---

# Refactor

**Usage:** `/refactor "<what to refactor and how>"` — e.g. `/refactor "extract shared guard into a private helper in money.ts"`

A generalizable refactoring approach. Extracting a shared guard into a private helper in `app/src/money.ts` is used as the worked example throughout.

## Baseline (weak) — what you started from

```text
clean up the repeated validation in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer refactoring app/src/money.ts (Node, ESM, strict TS, noUncheckedIndexedAccess).
Goal: $ARGUMENTS — change code structure without changing behavior. All tests must remain green.
Context:
- Files in scope: app/src/money.ts (update tests in app/src/*.test.ts only if signatures change).
- Refactor goal: $ARGUMENTS
- Worked example — extract shared guard into private helper:
    Before: identical NaN/Infinity guard blocks duplicated inside formatCents,
            splitEvenly, and applyDiscount — each already throws on bad input.
    After: that existing guard is moved verbatim into assertFiniteInteger(n):
           void; every call site is replaced with assertFiniteInteger(n).
           No new throws, no new validation — identical runtime behaviour.
    Exported signatures (formatCents, parseAmount, splitEvenly, applyDiscount) unchanged.
    No test edits needed — no signature or behavior change.
Constraints:
- Scope: modify only files inside app/src/.
- Do not change function logic or public API behavior.
- No new npm dependencies.
- cd app && npx tsc --noEmit must exit 0.
- cd app && npx vitest run must exit 0.
- No secrets or PII.
Acceptance criteria:
- The structural change described in $ARGUMENTS is complete.
- npx tsc --noEmit exits 0.
- npx vitest run exits 0.
Output:
- Updated source file(s).
- Updated test file(s) if signatures changed.
- One-line confirmation: tsc and vitest results.
Stop rules:
- Do not change function logic — structure only.
- If the refactor requires changes outside app/src/, stop and ask.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Apply the refactor described in $ARGUMENTS
to app/src/money.ts without changing any function's observable behavior. Update
tests only if function signatures change. Before finishing, verify:
(1) npx tsc --noEmit exits 0, (2) npx vitest run exits 0.
</instructions>

<context>
Files in scope: app/src/money.ts (Node, ESM, strict TS, noUncheckedIndexedAccess).
Refactor goal: $ARGUMENTS

Worked example — extract shared guard into private helper:
  Before: identical NaN/Infinity guard duplicated inside formatCents, splitEvenly,
          applyDiscount — each already throws on bad input.
  After: that existing guard moved verbatim into assertFiniteInteger(n: number): void;
         every call site replaced with assertFiniteInteger(n).
         No new throws, no new validation — identical runtime behaviour.
  Exported signatures unchanged. No test edits required.
</context>

<constraints>
- Scope: modify only files inside app/src/.
- Do not change function logic or public API behavior.
- No new npm packages.
- No secrets or PII.
- Both npx tsc --noEmit and npx vitest run must exit 0.
</constraints>

<output_format>
1. Updated app/src/ file(s).
2. Updated test file(s) if signatures changed.
3. Confirmation: tsc and vitest results.
</output_format>

<stop_rules>
- Do not change function logic — structure only.
- If the refactor requires changes outside app/src/, stop and ask.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Run against `app/src/money.ts` (worked example: extract shared guard into private helper)
- [x] Agent stayed in scope — only `app/src/` modified
- [x] `cd app && npx tsc --noEmit` exits 0
- [x] `cd app && npx vitest run` exits 0 — 44/44 tests passed
