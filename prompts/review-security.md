---
name: review-security
description: Security-focused review of a TypeScript file — finds untrusted-input paths, missing guards, and silent failures before merge.
version: 1
---

# Security Review

**Usage:** `/review-security <file>` — e.g. `/review-security app/src/money.ts`

## Baseline (weak) — what you started from

```text
перевір чи немає security проблем у money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security-focused senior TS engineer in a Node 22, strict-TS, Vitest project.
Goal: Find security and correctness defects in $ARGUMENTS before it merges.
Context: Integer-cent money helpers. External input enters via parseAmount().
         Functions have no input validation — callers pass plain numbers.
Constraints:
- Scope: $ARGUMENTS only; do not follow imports.
- Review only — do NOT edit.
- No secrets or PII in output.
Acceptance criteria:
- At least 3 findings OR justify why fewer exist.
- For each: file:line, attack/failure scenario, impact, minimal fix.
- Cover: missing guard conditions (NaN, Infinity, out-of-range, non-integer),
  silent wrong results from unvalidated inputs, precision loss from unsafe integers
  near Number.MAX_SAFE_INTEGER, and untrusted-input reflection in error messages.
Output:
- Numbered findings, most severe first.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do not suggest adding logging, metrics, or observability — out of scope.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a security-focused senior TS reviewer. Find missing guards, silent
failure modes, and untrusted-input paths in the target file before it merges.
Review only — do not edit. Cite file:line for each finding.
Before finishing, verify every finding includes: file:line, a concrete
attack/failure scenario, the impact, and a minimal fix.
</instructions>

<context>
Target: $ARGUMENTS
Stack: Node 22, TypeScript, Vitest. Integer-cent money module.
All amounts are plain numbers — no branded types. External input enters via
parseAmount(). Other functions accept numbers directly with no validation.
</context>

<constraints>
- Scope: target file only; do not follow imports into other files.
- Review only; do NOT edit code in this pass.
- At least 3 findings or justify why fewer exist.
- Cover: missing guard conditions (NaN, Infinity, negative, zero, 
noninteger), silent wrong results from out-of-range inputs, precision loss 
from unsafe integers near Number.MAX_SAFE_INTEGER, and untrusted-input reflection in error messages.
- No secrets or PII in output.
</constraints>

<output_format>
Numbered findings, most severe first:
  file:line — scenario — impact — fix
Add a test snippet only where the defect is directly testable.
</output_format>

<stop_rules>
- If the file has no exported functions, stop and say so.
- Do not suggest logging, metrics, or observability changes.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                                        |
|----------|---------------------------------|------------------------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; shorter role+goal block                     |
| XML      | Claude Code / Claude            | tag scoping enforces the attack-surface checklist per find |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Surfaced: no validation on `percent` in `applyDiscount` (NaN/Infinity/out-of-range pass through), no validation on `n` in `splitEvenly` (n=0 → Infinity, n<0 → nonsense), untrusted input reflected in `parseAmount` error message