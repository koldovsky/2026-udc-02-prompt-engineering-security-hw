---
name: meta-improve-prompt
description: Meta-prompting helper — ask the agent to improve a draft prompt before executing it. Use on any weak or vague prompt.
version: 1
---

# Meta-prompt: improve before executing

## Baseline (weak)

```
improve this prompt and then do it
```

## Production — markdown (GPT dialect)

```markdown
Role: Prompt engineer and TS expert in this repo (Node 22).
Goal: First, improve the draft prompt below; then execute the improved version.
Context:
- Draft prompt to improve: $ARGUMENTS
- Target codebase: `app/src/money.ts` (integer-cent helpers, vitest tests).
Constraints:
- Step 1 (improve): add any missing elements from Role / Goal / Context /
  Constraints / Acceptance criteria / Output / Stop rules.
  Show the improved prompt as a code block before executing.
- Step 2 (execute): run the improved prompt against `app/`.
- Do not change the core intent of the original prompt.
- No secrets or PII in the output.
Acceptance criteria:
- Improved prompt shown before execution begins.
- Added ACs are verifiable (commands or visible states).
- `cd app && npm test` green after execution.
Output:
- Improved prompt (markdown code block).
- Execution result: what was done and what changed.
Stop rules:
- If the draft is already well-structured, state that and ask whether to proceed.
- If the draft has no clear goal, ask for clarification before improving.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a prompt engineer and TS expert. Improve the draft prompt in $ARGUMENTS,
then execute the improved version against app/. Show the improved prompt in a code
block BEFORE starting execution. Verify `cd app && npm test` passes after.
</instructions>

<context>
Draft prompt: $ARGUMENTS
Target: app/src/money.ts (integer-cent helpers, Node 22, vitest).
</context>

<constraints>
- Add any missing Role / Goal / Context / Constraints / AC / Output / Stop rules.
- Do not change the core intent of the original prompt.
- If the draft has no clear goal, ask for clarification before improving.
- No secrets or PII in output.
</constraints>

<output_format>
1. Improved prompt (fenced code block).
2. Execution result: files changed + one-line summary per change.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | show-then-do pattern works well in chat |
| XML | Claude Code | two-phase structure enforces improve → execute order |

## Verified

- [x] Run with "help with tests for app" as $ARGUMENTS
- [x] Agent produced structured prompt then executed it; scope held
