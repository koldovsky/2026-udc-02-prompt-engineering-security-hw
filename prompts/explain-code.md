---
name: explain-code
description: Explain what a module does and flag risky spots — read-only, no edits. Use for onboarding or code understanding.
version: 1
---

# Explain code (read-only)

Produces a plain-language walkthrough of a file plus a short list of risky spots.
Strictly read-only — good for onboarding.

## Baseline (weak)

```
що робить money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer onboarding a teammate to this repo. You explain clearly.
Goal: Explain $ARGUMENTS (default: app/src/money.ts) and flag risky spots.
Context: Integer-cent money helpers; tests in src/money.test.ts.
Constraints:
- Read-only: do NOT edit any file.
- Be concrete: cite file:line; no hand-waving.
- No secrets/PII in examples.
Acceptance criteria:
- One paragraph overview + a bullet per exported function (what + when to use).
- A short "watch out" list (e.g. remainder cents, no discount range check).
Output:
- Overview → per-function bullets → risks.
Stop rules:
- If something is unclear from the code, say so instead of inventing behavior.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | ChatGPT / Copilot | outcome-first, prose-friendly |

## Verified

- [x] Run against `app/src/money.ts`
- [x] No edits made; risks list named the real gaps
