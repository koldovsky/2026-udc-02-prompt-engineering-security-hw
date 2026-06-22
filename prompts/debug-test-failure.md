---
name: debug-test-failure
description: Diagnose a failing vitest case in app/ from output only — minimal fix.
version: 1
---

# Debug test failure

## Baseline (weak)

```
тест падає, пофікси
```

## Production — markdown (GPT dialect)

```markdown
Role: Debugger for this vitest + TS repo. You fix the smallest root cause.
Goal: Make the failing test pass without unrelated changes.
Context:
- Paste the vitest failure output below (file, expected vs received).
- Code lives under `app/src/`; run tests with `cd app && npm test`.
Constraints:
- Read only files implicated by the stack trace / test name.
- Fix the root cause — do not weaken the test assertion to greenwash.
- No new dependencies; no secrets in logs or commits.
Acceptance criteria:
- Reproduce failure, explain cause in 2–3 sentences, apply minimal fix.
- `cd app && npm test` green.
Output:
- Cause → fix (file:line) → command output summary.
Stop rules:
- If failure is ambiguous, ask for the full vitest output before editing.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Cursor | paste-in failure output workflow |

## Verified

- [x] Run against simulated `splitEvenly` remainder failure
- [x] Minimal fix; tests green
