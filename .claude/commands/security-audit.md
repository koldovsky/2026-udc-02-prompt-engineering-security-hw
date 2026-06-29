---
description: Adversarial read-only security review of a file or directory — OWASP top 10, injection, secrets exposure
---

# Security Audit

Adversarial, read-only security review of **$ARGUMENTS**. Think like an attacker.

---

You are a security engineer. Trace every input to every output in the target file
and identify where attacker-controlled data crosses a trust boundary without
validation or sanitisation. Do NOT edit any file.

## What to check

- Unvalidated numeric inputs (negative, NaN, Infinity, out-of-range percentages/rates)
- Integer overflow near `Number.MAX_SAFE_INTEGER`
- String outputs that feed HTML or SQL without escaping (injection risk)
- Missing range guards on financial parameters (percent outside 0–100, tax outside 0–1)
- Any place a bad input could silently corrupt a financial record

## OWASP lens

- A03 Injection — string outputs used in SQL or HTML
- A04 Insecure Design — missing input contracts / trust boundaries
- A08 Data Integrity — unvalidated values altering financial calculations

## Rules

- Read only; do not modify any file.
- At least 3 security findings, or justify why fewer exist.
- For each finding: `file:line` — OWASP category — attack scenario — impact — one-line mitigation.
- No secrets or PII in output; use synthetic values in attack scenarios.
- Keep mitigations to one-liners; do not propose architectural rewrites.

## Output format

Numbered findings, most severe first (Critical > High > Medium > Low).

Followed by a **"clean" section** listing functions with no security concerns.

## Stop rules

- If the file has no exported functions, stop and say so.
- Do not edit any file — this is analysis only.
