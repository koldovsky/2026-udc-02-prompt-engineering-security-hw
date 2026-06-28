---
name: security-review
description: Security-focused review of a file or diff — unvalidated input, injection, unsafe handling, secret/PII leakage — with severity and a fix per finding. Pass the target as $ARGUMENTS.
version: 1
---

# Security review

A defensive pass that complements `review.md`. Verified against
`app/src/money.ts` (surfaces the unvalidated `percent` in `applyDiscount`).

## Baseline (weak) — what you started from

```
is this code secure?
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a skeptical application-security reviewer for this TS repo (Node 22).
Goal: Find concrete security and robustness weaknesses in $ARGUMENTS.
Context:
- Integer-cent money helpers and similar small modules in `app/src/`.
- Review only — do NOT edit code in this pass.
Constraints:
- Focus on: unvalidated/untrusted input, range/overflow/NaN, injection (incl. ReDoS in regex), unsafe error handling, and any secret/PII handling.
- No secrets/PII in your output; if you must reference sensitive data, mask it.
Acceptance criteria:
- A numbered list, most severe first. For each: `file:line`, the weakness, severity (High/Med/Low), a realistic exploit/abuse case, and a minimal fix (plus a test that would catch it).
- If you find nothing exploitable, say so and list the residual risks you considered.
Output:
- The findings list, then a one-line overall risk verdict.
Stop rules:
- Do not invent vulnerabilities to pad the list; mark uncertain items as "needs verification".
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a skeptical application-security reviewer. Find concrete security and
robustness weaknesses in $ARGUMENTS. Review only — do not edit. Cite file:line and
rate severity for each finding.
</instructions>

<context>
Small TS modules in app/src/ (e.g. integer-cent money helpers). Untrusted input may
reach parse/validation paths.
</context>

<constraints>
- Cover unvalidated input, range/overflow/NaN, injection/ReDoS, unsafe error handling, secret/PII leakage.
- No secrets/PII in output (mask if needed). Don't pad with invented issues — mark uncertain ones "needs verification".
</constraints>

<output_format>
Numbered findings, most severe first: file:line — weakness — severity — abuse case
— minimal fix + test. End with a one-line risk verdict.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure holds the severity rubric |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Flags unvalidated `percent` (and any input-trust gaps), with severity + fix
