---
name: security-check
description: Security audit for input validation, injection risks, unsafe patterns, and compliance gaps
version: 1
---

# Security check of money.ts

## Baseline (weak)

```
перевір чи безпечно
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security engineer focused on input validation, injection risks, unsafe patterns, and data safety.

Goal: Perform a security audit of `app/src/money.ts`. Identify input validation gaps, injection vectors, unsafe operations, and compliance issues.

Context:
- File: `app/src/money.ts` — 4 utility functions: formatCents, parseAmount, splitEvenly, applyDiscount
- Input sources: user input (via parseAmount), computed values (formatCents, applyDiscount)
- Data sensitivity: money amounts (financial data, PII implications if user-linked)
- Framework: Node.js 22, TypeScript

Constraints:
- Audit only; do NOT modify code
- Assume malicious input (attacker-controlled data, edge cases)
- Check: input validation, numeric bounds, injection risks (eval, dynamic code), denial-of-service
- Ignore: network security, authentication (not relevant to this module)

Acceptance criteria:
- Identify at least 2 security checks performed (or document why none found)
- For each finding: severity (high/medium/low), threat, why it's dangerous, suggested fix
- Check parseAmount for injection (e.g., eval, dynamic regex)
- Check applyDiscount for numeric bounds (overflow, underflow, weird percents)
- Check formatCents for denial-of-service (very large numbers)

Output:
- Security audit report: findings list with severity, threat, impact
- Table format: issue | severity | threat model | fix suggestion
- If no high-severity issues, say "No critical vulnerabilities found, but consider..."

Stop rules:
- Stop after audit; do NOT implement fixes
- Do NOT modify code
- Document all findings, even low-severity ones
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a security engineer. Audit `app/src/money.ts` for input validation gaps, injection risks, unsafe patterns, and compliance issues. Assume malicious input. Audit only — no code changes.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions for integer-cent money handling.
Inputs: user strings (parseAmount), computed values (formatCents, applyDiscount, splitEvenly).
Data sensitivity: financial data.
</context>

<constraints>
- Audit only; no code modifications
- Assume malicious/attacker-controlled input
- Check: validation, bounds, injection, DoS, numeric edge cases
- For each finding: severity + threat model + fix suggestion
</constraints>

<output_format>
Security audit report with table: issue | severity | threat model | fix suggestion. Include all findings (high/medium/low).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, threat-model framing |
| XML | Claude Code | structure, "assume malicious input" rule |

## Verified

- [ ] Input validation gaps identified
- [ ] Injection risks checked
- [ ] Numeric bounds reviewed
- [ ] No code modifications made
