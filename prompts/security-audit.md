---
name: security-audit
description: Security-focused read-only review — surfaces injection risks, missing input validation, unsafe operations, and accidental secret/PII exposure. Use before merge or when adding new entry points.
version: 1
---

# Security audit

A security-specific pass over a file. Goes deeper than `review-pr.md` on threat
modeling, data-flow tracing, and OWASP alignment. The canonical target is
`app/src/money.ts` — look for unvalidated inputs that could corrupt financial
records or leak data.

## Baseline (weak)

```
перевір чи немає дірок в безпеці
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security engineer auditing a TypeScript module in this repo (Node 22).
You are adversarial — you think like an attacker, not the author.
Goal: Find exploitable weaknesses in $ARGUMENTS: unvalidated inputs, injection
vectors, data leaks, integer overflow that could be weaponised, and any place
where attacker-controlled data crosses a trust boundary without sanitisation.
Context: Integer-cent money helpers (formatCents, parseAmount, splitEvenly,
applyDiscount, addTax). Called by a billing engine — wrong output has financial
impact. No network I/O in this file, but the return values feed downstream SQL
queries and rendered invoices.
Constraints:
- Read-only pass — do NOT edit any file.
- No secrets or PII in output; use synthetic values in examples.
- Focus on security, not code style or test coverage.
Acceptance criteria:
- At least 3 security findings OR a justified "no critical issues" verdict.
- For each finding: OWASP category, file:line, attack scenario (who sends what),
  impact (what goes wrong), and a one-line mitigation.
- Explicitly check: negative/NaN/Infinity inputs, integer overflow near
  MAX_SAFE_INTEGER, unvalidated percentage/rate values, and outputs that feed
  HTML or SQL without escaping.
Output:
- Numbered findings, most severe (CVSS-style: Critical > High > Medium > Low) first.
- A "clean" section listing functions with no security concerns found.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do NOT suggest architectural rewrites — keep mitigations to one-liners.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a security engineer performing a read-only adversarial audit of the
target file. Think like an attacker. For each exported function, trace every
input to every output and identify where attacker-controlled data crosses a
trust boundary without validation or sanitisation. Do NOT edit any file.
Cite file:line for every finding and provide a concrete attack scenario.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers — formatCents, parseAmount,
splitEvenly, applyDiscount, addTax). Runtime: Node 22. The return values
feed downstream SQL queries and rendered HTML invoices — unsanitised output
has financial and injection impact.
</context>

<constraints>
- Read only; do not modify any file.
- At least 3 security findings, or justify why fewer exist.
- Check explicitly: negative/NaN/Infinity inputs, integer overflow near
  Number.MAX_SAFE_INTEGER, unvalidated percentage/rate ranges (percent outside
  0–100, tax outside 0–1), and string outputs used in SQL or HTML without escaping.
- OWASP Top 10 lens: A03 Injection, A04 Insecure Design, A08 Data Integrity.
- No secrets or PII in output — use synthetic values in attack scenarios.
</constraints>

<output_format>
Numbered findings, most severe first (Critical / High / Medium / Low):
  file:line — OWASP category — attack scenario — impact — one-line mitigation
Followed by a "clean" section listing functions with no security concerns.
</output_format>

<stop_rules>
- If the file has no exported functions, stop and say so.
- Keep mitigations to one-liners; do not propose architectural rewrites.
- Do not edit any file in this pass.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | OWASP category + attack scenario read naturally as prose |
| XML | Claude Code / Claude | `<context>` tag isolates the trust-boundary description; structured output keeps severity ranking enforced |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent surfaced 3 findings: (1) High/A04 — no `Number.isFinite(cents)` guard on `formatCents`, `splitEvenly`, `applyDiscount`, `addTax` — passing NaN silently corrupts output; (2) Medium/A04 — `parseAmount` does not reject values near `Number.MAX_SAFE_INTEGER`, silently losing precision; (3) Low/A03 — raw user input interpolated into error message at `money.ts:54`, potential content injection in logs/dashboards. `applyDiscount` and `addTax` rate validation via `validateRange` was flagged as clean.
