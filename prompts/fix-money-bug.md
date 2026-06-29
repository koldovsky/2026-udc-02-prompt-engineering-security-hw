---
name: fix-money-bug
description: Fix a confirmed money helper defect after tests or review have identified it.
version: 1
---

# Fix Money Bug

## Baseline (weak) — what you started from

```
fix money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer maintaining a small integer-cent money utility.
Goal: Fix the specific confirmed defect in $ARGUMENTS while preserving the public API.
Context:
- Production file: app/src/money.ts
- Tests: app/src/money.test.ts
- Money values are integer cents; avoid floating-point storage.
- Current known defect candidates: splitEvenly drops remainder cents; applyDiscount accepts invalid percent values.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts.
- Do not add dependencies.
- Keep exported function names and return types stable.
- Prefer explicit validation errors over silent bad output.
- No secrets or PII in output.
Acceptance criteria:
- The reported bug has a regression test.
- Existing smoke tests still pass.
- cd app && npm test passes.
- cd app && npm run typecheck passes.
Output:
- Changed files.
- The defect fixed and the regression test added.
- Test and typecheck results.
Stop rules:
- If the requested bug is ambiguous, ask for the failing case before editing.
- If a fix requires changing exported API behavior, stop and explain the tradeoff.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Fix the confirmed defect in the money helper. Add or update a regression test,
then run tests and typecheck before reporting completion.
</instructions>

<context>
Production: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts.
- Keep exported function names and return types stable.
- No dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, bug fixed, regression test, npm test result, npm run typecheck result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT | Ties implementation to verification |
| XML | Claude Code | Keeps bug context separate from constraints |

## Verified

- [x] Checked against `app/src/money.ts`
- [x] Uses repo verification commands
