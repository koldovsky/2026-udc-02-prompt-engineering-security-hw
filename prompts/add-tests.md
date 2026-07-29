---
name: add-tests
description: Add high-value passing tests for a target file while keeping scope tight and the suite green.
version: 1
---

# Add tests (scoped, green-suite first)

Use this when you want broader test coverage for a specific file in `app/` without
letting the agent roam across the repo or leave the test suite red. For
`app/src/money.ts`, this prompt should add safe edge-case coverage and report
likely production defects as follow-up notes instead of committing failing tests.

## Baseline (weak) — what you started from

```
help with tests for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript test engineer in this repo (Node 22, Vitest). You work test-first, stay narrowly scoped, and prefer a green suite over speculative regressions.
Goal: Improve coverage for $ARGUMENTS by adding the smallest set of high-value tests that pass today.
Context: The target is an integer-cent money helper module in `app/src/money.ts`. Existing tests live in `app/src/money.test.ts`. Inspect formatting, parsing, negative values, invalid input, divisibility, and rounding.
Constraints:
- Read only `app/src/money.ts` and `app/src/money.test.ts` unless a test failure forces a tiny adjacent lookup.
- Edit only `app/src/money.test.ts`.
- Do NOT modify production code, package manifests, configs, public APIs, or add dependencies.
- Keep the suite green in this pass: do not commit failing tests.
- If you find a likely bug that would require production changes (for example, remainder cents or missing input validation), mention it as follow-up instead of leaving the suite red.
- No secrets or PII in the output.
Acceptance criteria:
- Add 2-5 concrete tests that cover real gaps and are not duplicates of existing assertions.
- Each new test has a clear expectation derived from the current code or documented behavior.
- Run `cd app && npm test` and finish only if it passes.
- Summarize any likely production defects you intentionally did not encode as failing tests because this prompt is tests-only.
Output:
- Changed files.
- A short bullet list of the new cases added.
- Optional follow-up bugs or validation gaps, if any.
Stop rules:
- If the target file has no exported functions, stop and say so.
- If the matching test file cannot be found, stop and say so.
- If the highest-value next test would fail without changing production code, do not add that failing assertion; report it as follow-up and stop once the suite is green.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript test engineer in this repo. Improve coverage for
$ARGUMENTS by adding a small set of high-value tests that pass today. Stay
test-only, keep the suite green, and verify by running the app test suite before
finishing.
</instructions>

<context>
Target module: `app/src/money.ts` (integer-cent money helpers).
Existing tests: `app/src/money.test.ts`.
Focus areas: formatting, parsing, negative values, invalid input, divisibility,
rounding.
</context>

<constraints>
- Read only the target module and its existing test file unless a tiny adjacent
  lookup is required to explain a failure.
- Edit only `app/src/money.test.ts`.
- Do not modify production code, package manifests, configs, public APIs, or
  add dependencies.
- Do not leave the suite red. If a likely bug needs production changes, report
  it as follow-up instead of adding a failing test.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, then bullets for: new test cases added; follow-up bugs or
validation gaps intentionally left for a separate review/fix pass.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | strong scope + explicit green-suite rule |
| XML | Claude Code / Claude | structure makes the stop rules harder to ignore |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Stayed in scope (`app/src/money.test.ts` only) and kept `cd app && npm test` green
