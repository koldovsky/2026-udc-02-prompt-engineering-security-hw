---
name: add-tests
description: Add focused edge-case tests to a small TS module without changing production code. Use to raise coverage on a specific file.
version: 1
---

# Add tests (scoped)

The flagship cookbook entry, shown in **both dialects** (markdown + XML). Point
it at `app/src/money.ts`; it should add the edge cases `money.test.ts`
intentionally skips (negatives, bad input, identity discount, clean splits)
while keeping `cd app && npm test` green.

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

(English: `help with tests for app` — no scope, no goal, no "done".)

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS test author in this repo (Node 22, vitest, ESM). Tests live in src/*.test.ts.
Goal: Add edge-case tests for $ARGUMENTS so its behavior is pinned down.
Context: Integer-cent money helpers. Existing smoke tests pass; they skip
negatives, bad input, identity cases, and clean splits.
Constraints:
- Edit ONLY the matching *.test.ts file. Do NOT touch production code.
- Do NOT add dependencies. Reuse the existing vitest imports.
- Every new test must PASS against current behavior (assert actual output;
  do not assert a fix that isn't there yet).
- No secrets/PII in test data — use small synthetic numbers.
Acceptance criteria:
- `cd app && npm test` is green with the new tests included.
- At least 4 new assertions covering: a negative value, invalid input throwing,
  an identity/no-op case, and a boundary (e.g. clean even split).
Output:
- The edited test file + a one-line summary of what each new test pins down.
Stop rules:
- If pinning a case would require changing production code, STOP and report it
  as a finding instead of editing source.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You add edge-case tests to a small TS module. Edit ONLY the matching *.test.ts
file — never production code. Each new test must pass against current behavior.
Verify with `cd app && npm test` before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers, Node 22 + vitest, ESM).
Existing smoke tests pass but skip negatives, invalid input, identity cases,
and clean splits.
</context>

<constraints>
- No production-code edits, no new dependencies.
- Cover at least: a negative value, invalid input that throws, an identity/no-op
  case, and a boundary case.
- Assert actual current output; if a desired case needs a source fix, report it
  rather than editing source.
- Synthetic numbers only — no secrets/PII.
</constraints>

<output_format>
Edited test file + one line per new test describing what it pins down.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code | the "edit only *.test.ts" guard holds better |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added 4 green edge-case tests; `cd app && npm test` stays green
