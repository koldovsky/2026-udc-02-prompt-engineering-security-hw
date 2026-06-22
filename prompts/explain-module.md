---
name: explain-module
description: Explain money.ts behavior and known gaps for onboarding — no code changes.
version: 1
---

# Explain module (read-only)

## Baseline (weak)

```
поясни money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior engineer onboarding a teammate to the money utilities.
Goal: Explain how `app/src/money.ts` works and where the known gaps are.
Context:
- Read `app/src/money.ts` and `app/src/money.test.ts` only.
Constraints:
- Read-only — do NOT edit files. No secrets/PII.
Acceptance criteria:
- One paragraph per exported function.
- Known gaps section with at least 2 items and suggested next prompt.
Output: Markdown summary ≤40 lines.
Stop rules: If files are missing, stop and list what you need.
```

## Verified

- [x] Run against `app/src/money.ts`
- [x] Surfaced remainder + percent validation gaps
