---
name: debug
description: Diagnose and fix unexpected behavior or test failures in money.ts using logs, tracing, and root-cause analysis
version: 1
---

# Debug money.ts

## Baseline (weak)

```
щось не працює, допоможи розібратись
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Debugging expert with strong TS and testing skills. You trace issues to root cause.

Goal: Diagnose the failing test case and explain the root cause. DO NOT fix the production code — only provide the diagnosis and suggest a fix (if needed).

Context:
- Test framework: Vitest
- Target: `app/src/money.ts` — small money utility module
- Current state: test suite has some failures or unexpected behaviors
- Known issue: splitEvenly loses remainder cents (documented but unfixed)

Constraints:
- Diagnosis only: run tests, analyze failures, explain root cause
- Do NOT modify production code (code review only)
- Do NOT modify test file
- Use console.log / debug output to trace execution if needed

Acceptance criteria:
- Identify the failing test(s) or unexpected behavior
- Root cause clearly explained (e.g., "line X does Y when it should Z because...")
- For each issue: severity, impact, minimal fix suggestion
- Output includes evidence (test output, traced values)

Output:
- Diagnosis report: which tests fail, why (line number + explanation)
- For each issue: root cause + minimal fix suggestion
- Do NOT implement the fix

Stop rules:
- Stop after diagnosis; do NOT code changes
- If multiple independent issues exist, diagnose all of them
- Ask before running commands beyond npm test
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a debugging expert. Diagnose failing tests or unexpected behavior in `app/src/money.ts`. Trace to root cause, explain clearly, and suggest minimal fixes — but do NOT implement changes.
</instructions>

<context>
Target: `app/src/money.ts` — small money utility with integer-cent handling.
Test framework: Vitest.
Known issue: splitEvenly loses remainder cents.
</context>

<constraints>
- Diagnosis only: no code changes
- Use tests and tracing to identify the issue
- Root cause must be clearly explained (line + why)
- Suggest minimal fix, don't implement
</constraints>

<output_format>
Diagnosis: failing test(s), root cause (line + explanation), minimal fix suggestion. Include test output as evidence.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, "diagnosis only" emphasis |
| XML | Claude Code | structure, "root cause + minimal fix" discipline |

## Verified

- [ ] Failing test(s) identified
- [ ] Root cause clearly explained
- [ ] No code modifications made
