---
name: tests-from-bug
description: Turn a bug report or failing case into a regression test that fails for the right reason — before any fix lands. Pass the bug/symptom as $ARGUMENTS.
version: 1
---

# Regression test from a bug

Capture a bug as a failing test first, so the later fix has a guard. Verified
against the `app/src/money.ts` gaps (e.g. `splitEvenly` drops remainder cents).

## Baseline (weak) — what you started from

```
write a test for this bug
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript test author in this repo (Node 22, vitest).
Goal: Write a minimal regression test that reproduces this bug: $ARGUMENTS.
Context:
- Source lives in `app/src/*.ts`; tests in the sibling `*.test.ts` (import from `./<name>.js`).
- Run with: `cd app && npm test`.
Constraints:
- Add the test only; do NOT modify the source under test in this pass.
- Assert the CORRECT expected behavior, so the test fails because of the bug (not because of a wrong assertion).
- Keep it minimal and deterministic; reuse the existing `describe/it/expect` style. No new deps, no secrets/PII.
Acceptance criteria:
- Exactly one focused failing test (or a small group) that pinpoints the bug.
- The failure message clearly shows expected vs actual; name the test after the bug.
- `cd app && npm test` shows it red for the documented reason.
Output:
- The new/updated test file plus a 2–3 line note: what the bug is and what the test now proves.
Stop rules:
- If you cannot reproduce the bug from the description, say what extra info you need instead of guessing.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a vitest test author. Reproduce this bug as a minimal failing regression
test: $ARGUMENTS. Add the test only — do not touch the source. Verify with
`cd app && npm test` and confirm it fails for the documented reason.
</instructions>

<context>
Source in app/src/*.ts; tests in the sibling *.test.ts (import from "./<name>.js").
Reuse the existing describe/it/expect style.
</context>

<constraints>
- Assert the CORRECT behavior so the failure is caused by the bug, not a bad assertion.
- Minimal, deterministic, named after the bug. No new deps, no secrets/PII.
</constraints>

<output_format>
The new/updated test file, then a 2–3 line note: the bug and what the test proves.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against a known `app/src/money.ts` bug (e.g. remainder cents)
- [x] Produces a single clear failing test for the right reason
