---
name: add-tests
description: Add focused unit tests for a specific TypeScript module without changing production code
version: 1
---

# Add Tests

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior TypeScript engineer working in a small Vitest-based app.
Goal: Add focused unit tests for app/src/money.ts that cover likely edge cases and expose behavior gaps without changing production code.
Context: Relevant files are app/src/money.ts and app/src/money.test.ts. Current tests are smoke tests only. The module contains at least one subtle bug around remainder handling and likely missing validation for invalid discount percentages.
Constraints:
- Only modify app/src/money.test.ts.
- Do not modify app/src/money.ts.
- Do not add new dependencies.
- Do not refactor production code.
- Do not change public APIs.
- Keep tests small, descriptive, and behavior-focused.
- Do not include secrets or PII in output.
Acceptance criteria:
- Read the current implementation and existing tests first.
- Add meaningful edge-case tests for exported functions in money.ts, especially splitEvenly remainder handling and invalid/edge input values.
- Prefer a few high-signal tests over many redundant ones.
- Run cd app && npm test.
- If a new test fails because of a production bug, report the failing behavior and leave production code unchanged.
Output:
- List changed files.
- Give a short summary of added test coverage.
- Mention whether any new test exposed a production bug.
Stop rules:
- Stop after tests are added and npm test has been run.
- If a new test reveals a production bug, report it instead of changing production code.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer working in a small Vitest-based app.
Add focused unit tests for app/src/money.ts that cover edge cases and verify the result with cd app && npm test before finishing.
</instructions>

<context>
Relevant files:
- app/src/money.ts
- app/src/money.test.ts

Current tests are smoke tests only. The module contains likely edge cases around splitEvenly remainder handling and invalid discount percentages.
</context>

<constraints>
- Only modify app/src/money.test.ts.
- Do not modify app/src/money.ts.
- Do not add new dependencies.
- Do not refactor production code.
- Do not change public APIs.
- Keep tests small, descriptive, and behavior-focused.
- Do not include secrets or PII in output.
</constraints>

<output_format>
Return changed files, a short summary of added test coverage, and whether any new test exposed a production bug.
If a new test reveals a production bug, report it instead of changing production code.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
