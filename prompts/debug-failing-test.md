---
name: debug-failing-test
description: Diagnose a failing Vitest case and propose the smallest safe fix.
version: 1
---

# Debug Failing Test

## Baseline (weak) — what you started from

```
why are tests failing?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript debugger for a small Vitest project.
Goal: Diagnose the failing test or stack trace in $ARGUMENTS and identify the smallest safe fix.
Context:
- App commands: cd app && npm test; cd app && npm run typecheck
- Production file: app/src/money.ts
- Tests: app/src/money.test.ts
- Money amounts are integer cents.
Constraints:
- Start by explaining the failing assertion in plain language.
- Do not edit files until the root cause is identified.
- Prefer one minimal code change plus one regression test.
- Do not add dependencies.
- No secrets or PII in output.
Acceptance criteria:
- Root cause maps to a specific function and behavior.
- Proposed fix includes the exact test that should pass afterward.
- If editing is requested, cd app && npm test passes after the fix.
Output:
- Failure summary.
- Root cause.
- Minimal fix plan or changed files if edits were requested.
- Verification result.
Stop rules:
- If the failure log is missing, ask for it or run the local test command.
- If multiple unrelated failures appear, triage them separately in severity order.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Debug the failing Vitest output. Identify root cause before editing. Prefer the
smallest safe fix and verify with the app test command if edits are made.
</instructions>

<context>
Command: cd app && npm test
Code: app/src/money.ts
Tests: app/src/money.test.ts
Failure: $ARGUMENTS
</context>

<constraints>
- Diagnose before editing.
- No dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
Failure summary, root cause, minimal fix, and verification result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / Copilot | Good for logs and stepwise diagnosis |
| XML | Claude Code | Keeps failure text isolated as data |

## Verified

- [x] Checked against the app's Vitest setup
- [x] Stop rules handle missing logs
