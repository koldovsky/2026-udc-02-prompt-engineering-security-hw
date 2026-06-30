---
name: find-duplicates
description: Find duplicated or near-duplicated logic across functions in src/money.ts. Use before refactoring to spot extraction opportunities.
version: 1
---

# Find duplicates

## Baseline (weak) — what you started from

```
є тут дублікати коду?
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: src/money.ts — integer-cent money helpers.
    - Four exported functions: formatCents, parseAmount, splitEvenly, applyDiscount.
    - Module is intentionally tiny — do not force-find duplication that isn't there.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer doing a duplication audit.
        You report only real, provable duplication — not superficial similarity.
    </role>

    <task>
        Scan <file>src/money.ts</file> for:
        - Identical or near-identical code blocks (>= 2 lines) repeated across functions.
        - Repeated logic patterns that could be extracted into a shared helper
          (e.g. shared validation, shared rounding/sign handling).

        For each finding, show both locations (file:line) and the shared logic.
        If there is no real duplication, say so explicitly — do not invent findings
        to fill a quota.
    </task>

    <verify>
        Before finishing, confirm:
        - Each finding cites concrete file:line for all occurrences.
        - Each finding includes a clear extraction suggestion (helper name + signature).
        - No finding is purely stylistic (e.g. "both use Math") without shared logic.
    </verify>
</instructions>

<constraints>
- Read only — do not edit any file.
- No secrets or PII in output.
</constraints>

<output_format>
- Numbered findings: file:line(s) — shared logic — suggested extraction.
- If none found: one line stating "No meaningful duplication found" with reasoning.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | explicit "don't invent findings" rule prevents quota-padding |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
