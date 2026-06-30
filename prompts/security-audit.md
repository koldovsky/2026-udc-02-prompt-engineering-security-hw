---
name: security-audit
description: Security-focused audit of money.ts for injection, DoS, and data-handling risks. Use before exposing to untrusted input.
version: 1
---

# Security audit

## Baseline (weak)

```
check money.ts for security issues
```

## Production — markdown (GPT dialect)

```markdown
Role: Application security engineer (OWASP, Node 22 context). You audit, not fix.
Goal: Identify security risks in `app/src/money.ts` that could occur when the
      functions are called with untrusted input from an HTTP API.
Context:
- Functions process untrusted strings (parseAmount) and numbers (applyDiscount, splitEvenly).
- This module will be called directly from an Express route handler.
- No authentication happens inside this module.
Constraints:
- Audit only; do not edit the source file.
- Consider: prototype pollution, ReDoS, integer overflow, type coercion, DoS via large inputs.
- No secrets or PII in output.
Acceptance criteria:
- At least 2 concrete risk findings OR a clear explanation of why none exist.
- For each finding: function name, risk category, PoC input, impact, recommended fix.
- Rate severity: Critical / High / Medium / Low.
Output:
- Numbered findings (most severe first).
- One-paragraph executive summary.
Stop rules:
- Do not propose sweeping rewrites — targeted mitigations only.
- If a risk is theoretical with no realistic vector, label it "Low / theoretical".
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are an application security engineer. Audit app/src/money.ts for security risks
that arise when these functions are called with untrusted HTTP input. Audit only —
do not edit the source. Report at least 2 findings or explain why fewer exist.
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Threat model: functions called directly from an Express route; input is untrusted.
Consider: ReDoS, integer overflow, type coercion, prototype pollution, DoS via large inputs.
</context>

<constraints>
- Audit only; no code changes.
- Each finding must include: function, risk category, PoC input, impact, fix.
- Rate severity: Critical / High / Medium / Low.
- Theoretical risks with no realistic vector → label "Low / theoretical".
- No secrets or PII in output.
</constraints>

<output_format>
1. Numbered findings (most severe first): function — category — PoC — impact — fix.
2. One-paragraph executive summary.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | good for audit-style outputs |
| XML | Claude Code | structure keeps risk/PoC/fix clearly separated |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent surfaced ReDoS risk in parseAmount regex and missing range guard in applyDiscount
