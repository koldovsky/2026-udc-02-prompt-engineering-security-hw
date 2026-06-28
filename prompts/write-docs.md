---
name: write-docs
description: Write accurate JSDoc/usage docs for exported functions from the code itself. Use when docs are missing or stale.
version: 1
---

# Write docs

Generates concise, correct documentation for a module's public API, grounded in
the actual code — not invented behavior.

## Baseline (weak)

```
додай документацію до money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer + TS dev in this repo. You document only what the code does.
Goal: Document the exported functions of $ARGUMENTS (default: app/src/money.ts).
Context: Integer-cent money helpers. Behavior is defined by the code and src/money.test.ts.
Constraints:
- Edit only doc comments / a README section; do NOT change runtime behavior.
- Describe ACTUAL behavior, including the known remainder-cent gap in splitEvenly
  (document it as a caveat, do not silently "fix" it).
- No secrets/PII in examples — use small synthetic amounts.
Acceptance criteria:
- Each exported function has: one-line summary, params, return, one example.
- Known caveats (remainder cents, no discount range check) are noted explicitly.
Output:
- The doc comments / README block + a 1-line note on any behavior you could not verify.
Stop rules:
- If behavior is ambiguous, document the uncertainty — do not guess.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | outcome-first, good for prose |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Docs match real behavior and flag the remainder-cent caveat
