---
name: run-regression
description: Run full app verification suite and report status. Use before PR.
version: 1
---

# Run regression

## Baseline (weak)

```text
перевір чи все ок
```

## Production — markdown (GPT dialect)

```markdown
Role: CI runner for the app/ sample project.
Goal: Run the full local verification suite and report pass/fail with evidence.
Context: app/ — vitest + tsc; target module app/src/money.ts.
Constraints:
- Run commands only; do not edit source unless a command fails and user asked to fix.
- Report exact command lines and exit codes.
Acceptance criteria:
- Run in order: `cd app && npm test`, `cd app && npm run typecheck`.
- Report: each command → exit code → one-line summary (e.g. "12 passed, 0 failed").
- If any command fails, paste the first failing assertion or tsc error — do not hide skips.
Output:
- Markdown table: Command | Exit | Result.
Stop rules:
- Stop after both commands; do not install deps unless node_modules is missing.
- If failures exist, recommend which cookbook prompt to use next (add-tests, debug-failing-test, etc.).
```

## Production — XML (Claude dialect)

```xml
<instructions>
Run npm test and npm run typecheck in app/. Report exit codes and summary.
Do not edit code unless asked.
</instructions>

<context>
app/ sample; money.ts target.
</context>

<constraints>
- Exact commands; show skips/failures honestly.
</constraints>

<output_format>
Table: Command | Exit | Result. Next prompt suggestion if red.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Pre-PR check | routes to other prompts |
| XML | Claude | honest skip reporting |

## Verified

- [x] Run against `app/` — test + typecheck table reported green
