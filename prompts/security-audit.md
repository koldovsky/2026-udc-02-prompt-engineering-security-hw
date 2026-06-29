---
name: security-audit
description: Audit app/src/money.ts for input-validation and boundary vulnerabilities; read-only report.
version: 1
---

# Security Audit

## Baseline (weak) — what you started from

```
check money.ts for security issues
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security-focused TypeScript code reviewer. Read-only target: `app/src/money.ts`.
Goal: Identify input-validation gaps, missing range guards, and denial-of-service vectors. Produce a ranked finding list. Do NOT fix any code.
Context:
- `parseAmount` uses a regex; throws on mismatch — check: ReDoS risk, max input length, integer overflow
- `applyDiscount` has no guard on `percent` range — negative percent increases price; >100% returns negative
- `splitEvenly` has no guard against n≤0 — division by zero / Infinity
- `formatCents` — no guard on non-integer or NaN input
Constraints:
- Read only — do not edit any file
- No secrets or PII in output
- No new npm dependencies
Acceptance criteria:
- Findings ranked: Critical / High / Medium / Low
- Each finding: location (file:line), description, example exploit input, recommended fix (text only)
- Covers at minimum: ReDoS, integer overflow, division by zero, range missing guard
Output:
- Security findings report (plain text or markdown table)
Stop rules:
- Do not write code fixes
- Do not read files outside app/src/money.ts
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a security-focused TypeScript code reviewer. Read `app/src/money.ts` and produce a security findings report. Do NOT modify any file. Report only — no code fixes.
</instructions>

<context>
Attack surface to audit:

parseAmount(input: string):
  - Regex: /^(-?)(\d+)(?:\.(\d{1,2}))?$/ — check for ReDoS on pathological input
  - No max-length guard on `input` — potential DoS with huge string
  - Number(whole) * 100 — check integer overflow for huge whole-number strings

splitEvenly(totalCents, n):
  - No guard: n=0 → Math.floor(x/0) = Infinity; n<0 → negative-length array
  - No guard: totalCents negative with n positive — may produce unexpected shares

applyDiscount(cents, percent):
  - percent < 0 → price increase (no guard)
  - percent > 100 → negative result (no guard)
  - No guard against NaN or Infinity in either param

formatCents(cents):
  - NaN input → "NaN.aN" output (no guard)
  - Infinity input → "Infinity.00" output (no guard)
  - Non-integer (e.g. 1.5) → silent rounding via Math.floor (may mislead caller)
</context>

<constraints>
- Read only — do not modify app/src/money.ts or any file
- No secrets or PII in output
</constraints>

<output_format>
Security findings, one per entry:

| Severity | Location | Issue | Exploit input | Recommended fix |
|----------|----------|-------|---------------|-----------------|
| ...      | ...      | ...   | ...           | ...             |

Then a short (3–5 sentence) summary with overall risk assessment.
</output_format>

<stop_rules>
- Do not write code
- If a finding is uncertain, mark it "Informational" rather than omitting it
- Do not read files outside app/src/money.ts
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
