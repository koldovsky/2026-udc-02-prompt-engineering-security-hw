---
name: security-review
description: Security-focused pass over a module — input handling, error-message leakage, injection surface. Complements review-pr.md's general correctness review.
version: 1
---

# Security review

Second "review" cookbook entry. `review-pr.md` looks for general correctness
defects; this one narrows to a security lens specifically, per the WS2 theme.

## Baseline (weak)

```text
є тут щось небезпечне в money.ts?
```

## Production — markdown (GPT dialect)

```markdown
Role: Security-minded senior TS reviewer in this repo.
Goal: Find security-relevant issues in app/src/money.ts — not general style.
Context: Integer-cent money helpers, no I/O, no network, no eval. Callers may
pass untrusted strings/numbers (e.g. from a request body).
Constraints:
- Review only, do not edit.
- Focus on: untrusted-input handling, error messages leaking raw input,
  numeric overflow/NaN/Infinity propagation, ReDoS potential in regexes.
- No secrets/PII in the output.
Acceptance criteria:
- For each finding: file:line, the concrete exploit/failure scenario, severity
  (low/med/high), and a minimal fix.
- Explicitly state if a category (e.g. ReDoS) was checked and found clean.
Output:
- Numbered findings, most severe first, or "no security-relevant findings" per
  checked category.
Stop rules:
- Don't flag generic style issues here — that's review-pr.md's job.
- Don't recommend adding auth/network/logging infra this module doesn't have.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a security-minded senior TS reviewer. Find security-relevant issues
only (not general style) in app/src/money.ts. Review-only, do not edit.
</instructions>

<context>
Target: app/src/money.ts. No I/O/network/eval. Callers may pass untrusted
strings/numbers.
</context>

<constraints>
- Focus: untrusted-input handling, error-message leakage, NaN/Infinity/overflow
  propagation, regex ReDoS.
- No secrets/PII in output. Review only.
</constraints>

<output_format>
Numbered findings: file:line — exploit scenario — severity — minimal fix.
State explicitly which checked categories came back clean.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | checklist-style categories read naturally |
| XML | Claude Code | keeps the "security only, not style" boundary from drifting |

## Verified

- [x] Run against `app/src/money.ts` (post `add-tests.md` / `extract-*.md` fixes)
- [x] Findings:
  1. **Low** — `parseAmount` and `splitEvenly`/`applyDiscount` guards
     interpolate the raw, untrusted value directly into the thrown error
     message (`Not a valid amount: ${input}`, `` `n must be a positive
     integer, got ${n}` ``). If these messages are ever surfaced to an
     untrusted party or a shared log, they'd echo back attacker-controlled
     content. Fix: truncate/redact the interpolated value in
     externally-visible logs; keep the full value only in internal debug logs.
  2. **Clean** — regex in `parseAmount` (`/^(-?)(\d+)(?:\.(\d{1,2}))?$/`) has
     bounded quantifiers only, no nested unbounded groups — not vulnerable to
     ReDoS.
  3. **Clean** — `Number.isSafeInteger` / `Number.isInteger` guards on
     `parseAmount`/`splitEvenly` prevent silent overflow into imprecise
     floats; `applyDiscount`/`formatCents` still accept `NaN`/`Infinity` for
     `cents` (produces `"NaN.NaN"` output rather than throwing) — low severity
     since it's a display glitch, not a security issue, but noted for a future
     `add-tests` pass.
- [x] No code changes made in this pass (review-only, as scoped).
