---
name: fix-bug
description: Reproduce and fix a concrete bug in a target module with the smallest safe code change.
version: 1
---

# Fix bug (reproduce first)

Use this when a review or failing test already points to a concrete defect and you
want the agent to patch it without broad refactors.

## Baseline (weak) — what you started from

```
fix the bug in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer in this repo (Node 22, Vitest). You debug by reproducing first, then make the smallest safe fix.
Goal: Fix the bug in $ARGUMENTS and leave the app test suite green.
Context: The main sample target is `app/src/money.ts`, a tiny integer-cent helper module. Existing tests live in `app/src/money.test.ts`.
Constraints:
- Read only the target file, its matching test file, and package scripts if needed for verification.
- Prefer a minimal production-code fix. Avoid refactors unless required by the bug.
- Do not add dependencies or change public APIs unless the bug cannot be fixed otherwise.
- No secrets or PII in output.
Acceptance criteria:
- Reproduce the bug with a targeted test or existing failing assertion.
- Implement the smallest fix in the target file.
- Run `cd app && npm test` and finish only if it passes.
- Explain the root cause in 2-4 bullets.
Output:
- Changed files.
- Root cause.
- Fix summary.
- Test evidence.
Stop rules:
- If no concrete bug can be reproduced, stop and say what evidence is missing.
- If fixing the bug requires a wider redesign, stop after writing a narrow proposal.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Reproduce the bug in $ARGUMENTS first,
then implement the smallest safe fix and verify with the app test suite.
</instructions>

<context>
Primary sample target: `app/src/money.ts`. Matching tests: `app/src/money.test.ts`.
</context>

<constraints>
- Narrow scope: target file + matching tests + package scripts for verification.
- Minimal fix; no new dependencies; no broad refactor.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, root cause, fix summary, and test evidence.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | explicit reproduce-first workflow |
| XML | Claude Code / Claude | keeps debug and fix steps separate |

## Verified

- [x] Targeted `app/src/money.ts`
- [x] Acceptance criteria reference `cd app && npm test`

