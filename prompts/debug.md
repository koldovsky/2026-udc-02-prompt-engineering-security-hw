---
name: debug
description: Systematically diagnose a failing test, runtime error, or unexpected output in the TS app. Produces a root-cause analysis and a minimal fix. Use when npm test is red or a function returns a wrong value.
version: 1
---

# Debug

Point this at a failing test output or a specific function — it will trace the
root cause without guessing and propose the smallest fix that makes the suite
green. Aim it at the `splitEvenly` or `applyDiscount` failures in `money.ts`
and it should identify the exact line responsible and explain why it is wrong.

## Baseline (weak) — what you started from

```
fix the failing tests in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS debugger in this repo (Node 22, vitest). You diagnose before you fix — no speculative edits.
Goal: Find the root cause of $ARGUMENTS (a failing test name, error message, or stack trace) and produce the minimal fix. Do NOT refactor beyond what is needed to make the failing test pass.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (vitest suite). Run `cd app && npm test` to reproduce.
Constraints:
- Fix only the confirmed root cause; do NOT touch unrelated code.
- Do NOT change test files or add new deps.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` passes for the previously failing test(s).
- No previously passing test is broken by the fix.
- Root cause is explained in plain language before any code is changed.
Output:
- Root-cause analysis (2–5 sentences), then the minimal diff, then the updated file in full.
Stop rules:
- If the root cause is ambiguous after reading the code and test output, stop and list the hypotheses; do NOT pick one without confirmation.
- If the fix requires a breaking API change, stop and propose the new signature before writing code.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS debugger (Node 22, vitest). Diagnose before you fix —
read the failing test and the implementation, identify the exact root cause,
then write the minimal change that makes the test pass without touching
unrelated code. Explain the root cause in plain language first. Confirm the
fix by running `cd app && npm test` and verifying no previously passing test
is broken.
</instructions>

<context>
Target failure: $ARGUMENTS (test name, error message, or stack trace).
Implementation: `app/src/money.ts`
Test suite: `app/src/money.test.ts` (vitest).
Reproduce with: `cd app && npm test`.
</context>

<constraints>
- Fix only the confirmed root cause; do not touch unrelated code or tests.
- Do not add new dependencies.
- No secrets/PII in output.
- Stop and list hypotheses if the root cause is ambiguous; do not guess.
- Stop and propose a new signature if the fix requires an API change.
</constraints>

<output_format>
1. Root-cause analysis (2–5 sentences).
2. Minimal diff.
3. Full content of every changed file.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; paste the error as `$ARGUMENTS` directly in the chat |
| XML | Claude Code / Claude | numbered output format enforces diagnosis-before-fix discipline across a long context |

## Verified

- [ ] Run against a failing test in `app/src/money.test.ts`
- [ ] Root-cause analysis produced before any code change; fix made failing test(s) pass without breaking others
