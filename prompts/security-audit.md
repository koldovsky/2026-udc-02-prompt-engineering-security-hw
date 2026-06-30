---
name: security-audit
description: Security-focused review of money.ts — integer overflow, ReDoS, missing range checks, information leakage.
version: 1
---

# Security audit

## Baseline (weak)

```
is money.ts secure?
```

## Production — markdown (GPT dialect)

```markdown
Role: You are an application security engineer doing a threat-model-driven review.
Goal: Find security-relevant issues in $ARGUMENTS that could be exploited when the module is called from an untrusted web API endpoint.
Context: TypeScript financial utility, Node 22. Inputs (amount strings, percent values) arrive from user-controlled HTTP requests.
Constraints:
- Review only — do NOT edit code in this pass.
- Focus: ReDoS in regex, integer overflow on extreme inputs, prototype pollution via user strings, missing input range checks, information leakage in error messages.
- No secrets or PII in your output.
Acceptance criteria:
- At least 2 security findings OR explain why fewer exist.
- Each finding: OWASP category, severity (High/Med/Low), file:line, exploit scenario, minimal fix.
Output:
- Numbered findings (High → Med → Low).
- A "checked but clean" note for categories with no findings.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are an application security engineer. Perform a security-focused code review of the target file.
Review only — do not edit. Cite file:line for every finding.
</instructions>

<context>
Target: $ARGUMENTS — TypeScript financial utility.
Deployment: called from a public web API; inputs are untrusted.
Runtime: Node 22.
Threat areas to check:
  1. ReDoS — does the parseAmount regex catastrophically backtrack on crafted input?
  2. Integer overflow — what happens at Number.MAX_SAFE_INTEGER?
  3. Missing range checks — can percent > 100 or n ≤ 0 cause financial errors?
  4. Error message leakage — does the Error message echo raw user input verbatim?
  5. Prototype pollution — any Object.assign / dynamic key writes?
</context>

<constraints>
- At least 2 findings or justify fewer.
- Each finding: OWASP category + severity (High/Med/Low) + file:line + exploit scenario + fix.
- No secrets or PII in output.
- Review only; no refactoring suggestions outside security scope.
</constraints>

<output_format>
Numbered findings (High first).
Final checklist: each threat area and whether it was clean or flagged.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT | checklist-style output GPT formats naturally |
| XML | Claude Code | structured threat-area list anchors the review scope |

## Verified

- [x] Run against `app/src/money.ts` (post-guards version)
- [x] Findings: (1) Med — `money.ts:40` `parseAmount` error message echoes raw user input verbatim — log-injection risk; fix: omit input from message. (2) Low — `Math.round` result not bounded; extreme `cents` values near `Number.MAX_SAFE_INTEGER` may silently overflow. Clean: ReDoS (regex is linear), prototype pollution (no dynamic keys), `splitEvenly`/`applyDiscount` range guards already in place.
