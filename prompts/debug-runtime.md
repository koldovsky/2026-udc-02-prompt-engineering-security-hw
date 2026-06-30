---
name: debug-runtime
description: Debug a runtime error or unexpected output from a money.ts function given a stack trace or failing assertion.
version: 1
---

# Debug runtime error

## Baseline (weak)

```
my code is broken, help
```

## Production — markdown (GPT dialect)

```markdown
Role: TS debugger in this repo (Node 22, vitest). You diagnose before you fix.
Goal: Identify the root cause of the error described below and propose a minimal fix.
Context:
- Target: `app/src/money.ts` — integer-cent money helpers.
- Error / failing assertion: $ARGUMENTS
  (paste the full stack trace or the vitest failure output here)
Constraints:
- Read the relevant function(s) in money.ts before proposing a fix.
- Do not change any function except the one causing the error.
- Explain the root cause in one sentence before suggesting a fix.
- No secrets or PII in output.
Acceptance criteria:
- Root cause identified with file:line reference.
- Proposed fix is a minimal diff (≤5 lines changed).
- Explain what test would catch this regression.
- `cd app && npm test` passes after applying the fix.
Output:
- Root cause (1 sentence).
- Minimal diff.
- Regression test to add.
Stop rules:
- If you cannot reproduce the error from the given info, ask for the exact command that triggers it.
- Do not refactor unrelated code.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS debugger. Diagnose the error below, then propose a minimal fix.
Read the relevant function in app/src/money.ts first. State the root cause in one
sentence before writing any code. Verify `cd app && npm test` passes after the fix.
</instructions>

<context>
Target: app/src/money.ts — integer-cent money helpers.
Error or failing assertion: $ARGUMENTS
</context>

<constraints>
- Change only the function causing the error.
- Fix must be ≤5 lines changed.
- Explain what regression test would catch this in future.
- No secrets or PII in output.
</constraints>

<output_format>
1. Root cause (one sentence, file:line).
2. Minimal diff.
3. Regression test to add.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | good for pasting stack traces inline |
| XML | Claude Code | structured output keeps diagnosis separate from fix |

## Verified

- [x] Run against `app/src/money.ts` with a synthetic failing assertion
- [x] Agent identified root cause and proposed correct minimal fix
