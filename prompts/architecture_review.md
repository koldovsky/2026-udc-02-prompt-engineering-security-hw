---
name: architecture-review
description: Review the design of the money utility module for correctness, extensibility, and safety. Use before adding new functions or promoting the module to a shared library.
version: 1
---

# Architecture review

A worked example for reviewing the overall design of `app/src/money.ts` — not
line-level bugs, but structural concerns: integer-only contract, error strategy,
module boundaries, and future growth risks.

## Baseline (weak)

```
переглянь архітектуру money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Staff engineer doing a pre-promotion design review. You focus on structural
risks and actionable trade-offs — not style nits, not line-level bugs.
Goal: Produce a structured review of app/src/money.ts covering: (1) correctness of
the integer-cent contract, (2) error-handling strategy, (3) extensibility for new
currencies / locales, (4) module boundary (what should NOT be in this file).
For each concern, rate it Low / Medium / High and suggest the minimal fix.
Context: The module is about to be promoted from a homework repo to a shared
internal library used by three billing services. No i18n support today. No
multi-currency support. `validateRange` is a private helper.
Constraints:
- Do NOT edit any file — this is a review, not an implementation task.
- Do not propose changes that require new npm dependencies unless the dependency
  is a widely-adopted standard (e.g. Intl, Decimal.js).
- No secrets or PII in the review output.
Acceptance criteria:
- Review covers all four concern areas listed above.
- Each concern has a severity rating and a one-paragraph recommendation.
- Total review is under 600 words.
Output:
- A structured markdown review document (no code changes).
Stop rules:
- If app/src/money.ts cannot be read, stop and report the error.
- If the module is already library-grade on all four dimensions, say so explicitly.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a staff engineer performing a pre-promotion design review of
app/src/money.ts. Produce a structured review covering four areas: (1) correctness
of the integer-cent contract, (2) error-handling strategy, (3) extensibility for
new currencies and locales, (4) module boundary risks. For each area, assign a
severity (Low / Medium / High) and write a one-paragraph recommendation. Do not
edit any file. Total output must be under 600 words.
</instructions>

<context>
Target: app/src/money.ts. Promotion context: the module is moving from a homework
repo to a shared internal library consumed by three billing services (Node 22).
Current exports: formatCents, parseAmount, splitEvenly, applyDiscount, addTax.
Private helper: validateRange. No i18n, no multi-currency, no BigInt yet.
Known design decision: integer cents throughout to avoid floating-point drift.
</context>

<constraints>
- Do NOT edit any source file — output is a review document only.
- Do not recommend new dependencies unless widely adopted (Intl built-in, Decimal.js).
- No secrets or PII in the review — use synthetic examples if needed.
- Keep each recommendation actionable: one concrete next step per area.
</constraints>

<output_format>
Structured markdown with four H3 sections (one per concern area), each containing:
- Severity: Low / Medium / High
- Finding: one sentence
- Recommendation: one paragraph with a concrete next step
Followed by a brief overall verdict (2–3 sentences).
</output_format>

<stop_rules>
- If app/src/money.ts cannot be read, stop and report the error.
- If the module is already library-grade on all four dimensions, state that
  explicitly and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | prose-style review request is natural for GPT; "under 600 words" keeps it focused |
| XML | Claude Code / Claude | `<output_format>` tag enforces consistent H3 structure across all four areas |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent produced review only (no file edits); all four concern areas covered; under 600 words
