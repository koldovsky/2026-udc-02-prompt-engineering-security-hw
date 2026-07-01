---
name: add-tests
description: Add or expand vitest tests for a TS module. Covers happy paths, edge cases, and documents known bugs as failing tests. Use when coverage is thin or new behaviour needs a regression net.
version: 1
---

# Add tests

Point this at any module in `app/src/` — it will audit existing coverage and
write the missing cases. Aim it at `money.ts` and it should expose the
`splitEvenly` remainder-cent gap and the missing `applyDiscount` range guard
as failing, `// BUG:`-annotated tests rather than silently skipping them.

## Baseline (weak) — what you started from

```
help with tests for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You are thorough and precise.
Goal: Extend test coverage for $ARGUMENTS — add missing edge cases, boundary values, and error paths. Do NOT fix bugs; write tests that document them as failing and mark each with a `// BUG:` comment.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (existing suite, vitest).
Constraints:
- Files to change: test file(s) only (`app/src/money.test.ts`); do NOT touch implementation files or add new deps.
- Existing passing tests must stay green; new failing tests are allowed only when marked `// BUG: <reason>`.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` runs without unexpected new failures.
- At least 5 new test cases; each new `describe` block names the function under test.
- Every error-path test uses `.toThrow()`; every boundary value is annotated with a comment explaining why it is a boundary.
Output:
- Full content of every changed file, then a summary table: function | cases added | bugs documented.
Stop rules:
- If unsure whether a behaviour is a bug or intentional design, stop and ask before writing a failing test.
- If a required file is missing, stop and report immediately.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a thorough senior TS engineer (Node 22, vitest). Extend the test suite
for the target module. Add edge cases, boundary values, and error paths.
Do NOT fix bugs — instead write failing tests that document the gaps and mark
them with a `// BUG:` comment explaining what is wrong. Verify correctness by
running `cd app && npm test` and confirming no unexpected new failures.
</instructions>

<context>
Target: $ARGUMENTS
Implementation: `app/src/money.ts`
Existing suite: `app/src/money.test.ts`
</context>

<constraints>
- Touch only test files; do not modify implementation or add new dependencies.
- Existing passing tests must remain green.
- No secrets/PII in output.
- Stop and ask before writing a failing test if the behaviour could be intentional.
</constraints>

<output_format>
Full content of every changed file, then a summary table:
function | cases added | bugs documented.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; `$ARGUMENTS` slots in cleanly for inline use |
| XML | Claude Code / Claude | block structure enforces the "document bugs, don't fix" rule throughout a long context |

## Verified

- [ ] Run against `app/src/money.test.ts`
- [ ] Agent added `// BUG:` tests for `splitEvenly` remainder-cent drop and `applyDiscount` missing range guard
