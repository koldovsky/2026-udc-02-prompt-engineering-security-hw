---
name: security-review
description: Security-focused review of a TS module. Checks for unvalidated inputs, error message leakage, integer overflow, and injection vectors. Use before exposing a module to untrusted input.
version: 1
---

# Security review

Point this at any module in `app/src/` — it will surface input validation
gaps, unsafe error messages, and arithmetic edge cases that could be exploited.
Aim it at `money.ts` and it should flag the unvalidated `percent` parameter in
`applyDiscount`, the unchecked `n` in `splitEvenly` (division by zero, negative
values), and any error messages that leak implementation details.

## Baseline (weak) — what you started from

```
check money.ts for security issues
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security-minded senior TS engineer in this repo (Node 22). You are adversarial — you think like an attacker.
Goal: Identify security and robustness issues in $ARGUMENTS that could be triggered by untrusted or malformed input.
Context: `app/src/money.ts` (integer-cent money helpers). Assume all function arguments could come from an untrusted caller.
Constraints:
- Review only; do NOT edit code in this pass.
- No secrets/PII in output.
Acceptance criteria:
- List every finding, or explicitly state "no issues found" for each category.
- Categories to cover: input validation, arithmetic edge cases (overflow, division by zero, negative values), error message leakage, type coercion surprises.
- For each finding: file:line, attack scenario, impact, and a concrete fix.
Output:
- Numbered findings, most severe first (Critical / High / Medium / Low / Info).
Stop rules:
- If the file has no exported functions that accept external input, stop and say so.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are an adversarial senior TS engineer (Node 22). Review the target module
as if all arguments come from an untrusted caller. Identify input validation
gaps, arithmetic edge cases, and error message leakage. Review only — do not
edit code. Cite file:line for every finding.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers, Node 22).
Threat model: untrusted caller controls all function arguments.
</context>

<constraints>
- Review only; no code changes.
- Cover: input validation, arithmetic edge cases (overflow, division by zero,
  negative values), error message leakage, type coercion.
- State "no issues found" explicitly for any category with no findings.
- No secrets/PII in output.
</constraints>

<output_format>
Numbered findings, most severe first.
Each entry: severity (Critical/High/Medium/Low/Info) | file:line | attack scenario | impact | fix.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; severity labels keep findings actionable |
| XML | Claude Code / Claude | structured output format enforces all four categories even when findings are sparse |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] Flagged unvalidated `percent` in `applyDiscount`, unchecked `n` in `splitEvenly` (division by zero / negative), and error message leakage in `parseAmount`
