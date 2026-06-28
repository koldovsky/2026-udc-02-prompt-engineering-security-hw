---
name: name-things
description: Propose clearer names for variables/functions with rename-safe rationale. Use during review or cleanup.
version: 1
---

# Name things (rename proposals)

Suggests clearer identifiers and explains the trade-offs — proposals only, so a
human approves before any rename.

## Baseline (weak)

```
перейменуй що погано названо в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS reviewer in this repo focused on readability.
Goal: Propose clearer names in $ARGUMENTS (default: app/src/money.ts).
Context: Integer-cent money helpers; public API is imported by src/money.test.ts.
Constraints:
- Propose only; do NOT rename across the codebase in this pass.
- Flag any name that is part of the public API (renaming it is a breaking change).
- No secrets/PII.
Acceptance criteria:
- A table: current name → proposed name → reason → breaking? (yes/no).
- At least 3 concrete proposals or a statement that names are already clear.
Output:
- The proposal table + a recommended safe-to-apply subset.
Stop rules:
- If a rename would break public API, mark it and do not apply automatically.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | outcome-first, tabular output |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Proposals only; public-API renames flagged as breaking
