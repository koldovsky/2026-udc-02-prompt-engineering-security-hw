---
name: refactor-money
description: Refactor money helpers for clarity while preserving behavior and tests.
version: 1
---

# Refactor Money Helpers

## Baseline (weak) — what you started from

```
clean up money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer doing a low-risk refactor.
Goal: Improve readability and maintainability of $ARGUMENTS without changing observable behavior.
Context:
- Target: app/src/money.ts
- Tests: app/src/money.test.ts
- Helpers are small exported functions for integer-cent amounts.
Constraints:
- Edit only app/src/money.ts unless a test name/comment must be updated.
- No public API changes.
- No new dependencies.
- Do not combine refactor with bug fixes unless a test already proves behavior is wrong and the user asked for a fix.
- Keep comments useful and concise.
- No secrets or PII in output.
Acceptance criteria:
- cd app && npm test passes.
- cd app && npm run typecheck passes.
- Diff is smaller than the original file unless there is a clear reason.
- Behavior-preserving changes are separated in the summary from any risk notes.
Output:
- Changed files.
- Refactor summary.
- Verification command results.
- Any behavior that looked suspicious but was not changed.
Stop rules:
- If a behavior change is needed, stop and ask whether to switch to a bug-fix task.
- If tests are insufficient to protect the refactor, suggest focused tests first.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Refactor the target for clarity while preserving behavior. Run tests and
typecheck before reporting completion.
</instructions>

<context>
Target: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- No public API changes.
- No dependencies.
- Do not fix bugs unless explicitly asked.
- No secrets or PII in output.
</constraints>

<output_format>
Changed files, refactor summary, verification results, and suspicious behavior left unchanged.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / ChatGPT | Separates refactor from bug fix |
| XML | Claude Code | Compact boundary for safe refactoring |

## Verified

- [x] Checked against `app/src/money.ts`
- [x] Verification commands match `app/package.json`
