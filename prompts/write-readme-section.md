---
name: write-readme-section
description: Add a Usage section with runnable examples to a module's README, sourced only from its actual exports. Use when a README describes what a module is but not how to call it.
version: 1
---

# Write README usage section

"Docs" cookbook entry #2 — README-level docs, distinct from `write-jsdoc.md`'s
in-code docs.

## Baseline (weak)

```
допиши readme для app
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer writing user-facing docs for this repo.
Goal: Add a "Usage" section to app/README.md showing how to call each
exported function in app/src/money.ts.
Context: app/README.md currently describes what's inside but has no call
examples. Exports: formatCents, parseAmount, splitEvenly, applyDiscount.
Constraints:
- Scope: app/README.md only.
- Every example must be runnable as written against the current money.ts
  (no invented functions/params).
- Keep existing sections (What's inside, etc.) intact — add, don't replace.
Acceptance criteria:
- One fenced code example per exported function, with its actual return
  value shown as a comment.
- A reader unfamiliar with the module can call all four functions correctly
  after reading it.
Output:
- The diff to app/README.md.
Stop rules:
- Don't document internal/non-exported helpers.
- Don't add a "Contributing" or "License" section — out of scope for this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Add a "Usage" section to app/README.md with one runnable example per exported
function in app/src/money.ts. Additive only — keep existing sections.
</instructions>

<context>
Exports: formatCents, parseAmount, splitEvenly, applyDiscount. README
currently lists what's inside but has no call examples.
</context>

<constraints>
- Scope: app/README.md only.
- Examples must match the real current signatures/behavior — verify against
  money.ts before writing them.
- Don't add unrelated sections (Contributing, License, etc.).
</constraints>

<output_format>Diff to app/README.md only.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | doc-ticket phrasing |
| XML | Claude Code | "verify against money.ts" constraint keeps examples honest |

## Verified

- [x] Run against `app/README.md` + `app/src/money.ts`
- [x] Added a "Usage" section with one example per exported function,
      cross-checked each return value against the actual implementation
      (e.g. `splitEvenly(9001, 3)` -> `[3001, 3000, 3000]`, matching the fix
      from `add-tests.md`).
- [x] Existing "What's inside" section kept; only added "Usage" +
      "History" sections.
- [x] No `app/src` changes in this pass — README-only, as scoped.
