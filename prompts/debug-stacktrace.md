---
name: debug-stacktrace
description: Localize a failure from a stack trace or failing test and propose a minimal fix + regression test. Use when something throws.
version: 1
---

# Debug from a stack trace

Debug prompt for the cookbook. Feed it a failing test output or a stack trace
against `app/src/money.ts`; it localizes the root cause before changing code.

## Baseline (weak)

```
чомусь падає, полагодь
```

## Production — markdown (GPT dialect)

```markdown
Role: TS debugger in this repo (Node 22, vitest). You diagnose before you edit.
Goal: Find the root cause of the failure in $ARGUMENTS and propose a minimal fix.
Context: I will paste a failing test / stack trace below. Integer-cent helpers.
Constraints:
- First localize (file:line + why) — do NOT edit code until the cause is stated.
- Minimal fix only; no refactor, no new deps, no API change.
- Add/keep a regression test that fails before and passes after.
- No secrets/PII in repro data — synthetic only.
Acceptance criteria:
- A one-paragraph root-cause, then the minimal patch, then the regression test.
- `cd app && npm test` green after the fix.
Output:
- Root cause → patch → regression test → confirmation that tests pass.
Stop rules:
- If the trace points outside this repo, STOP and say what's needed to reproduce.

--- paste failing output / stack trace here ---
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | "localize before edit" stops premature patches |

## Verified

- [x] Run against a real failure (`formatCents(150.7)` → `"1.50.69999999999999"`); evidence: `prompts/_runs.md`
- [x] Produced root cause (`money.ts:14-15` assumes integer) + minimal-fix proposal; localized before editing



