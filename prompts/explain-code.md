---
name: explain-code
description: Produce a concise onboarding explanation of a module — what/why/gotchas — without changing code. Use for handoffs and reviews.
version: 1
---

# Explain code (onboarding)

Explanation prompt for the cookbook. Summarizes `app/src/money.ts` for a new team
member: intent, contracts, and traps.

## Baseline (weak)

```
поясни що робить money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Staff engineer onboarding a teammate to this repo (Node 22, TS).
Goal: Explain $ARGUMENTS so a new dev can use it correctly in 5 minutes.
Context: Integer-cent money helpers. Read-only task.
Constraints:
- Do NOT change any code. Ground every claim in the actual source.
- Call out invariants (cents are integers), rounding rules, and known gotchas
  (remainder cents, unvalidated percent).
- No secrets/PII in examples — synthetic numbers only.
Acceptance criteria:
- Sections: Purpose · Public API (one line each) · Invariants · Gotchas · Example.
- Each gotcha cites file:line.
Output:
- A short markdown explainer (≈ one screen).
Stop rules:
- If behavior is ambiguous from the code, say so rather than guessing.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | fixed sections keep the explanation scannable |

## Verified

- [x] Run against `app/src/money.ts` (evidence: `prompts/_runs.md`)
- [x] Cited gotchas at real lines (`:14-15`, `:25`, `:47`); no code changed



