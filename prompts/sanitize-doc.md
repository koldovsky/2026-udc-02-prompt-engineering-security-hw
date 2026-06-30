---
name: sanitize-doc
description: Classify and sanitize a document for safe AI use — mask PII, keep secrets out-of-band, preserve the task. Use before pasting anything sensitive into a model.
version: 1
---

# Sanitize document

The cookbook companion to Task B. Run it locally — never paste the original into a
public model. See `docs/sanitization-checklist.md` for the full team checklist.

## Baseline (weak) — what you started from

```
remove sensitive stuff from this ticket
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Data-protection reviewer preparing a doc for AI use.
Goal: Produce a sanitized version of $ARGUMENTS that LEAKS NOTHING but keeps the task.
Context:
- Traffic-light model: 🔴 secrets/PII/banking/prod-dumps; 🟡 internal logic/names; 🟢 generic task.
Constraints:
- Mask PII keeping shape: card -> ****-1234, name -> [CUSTOMER_1], email -> <EMAIL>, IBAN -> <IBAN>.
- Secrets (API keys, connection strings) go OUT-OF-BAND: replace with <SECRET_OUT_OF_BAND>;
  never copy them into the sanitized doc OR the prompt. Flag them for rotation.
- Preserve enough that the underlying task is still understandable.
- Output the sanitized doc only — do not echo the original sensitive values back.
Acceptance criteria:
- No real card/IBAN/email/phone/passport/tax-id/secret remains.
- A reviewer can still understand the bug/task from the sanitized version.
- A short "what was removed and why" table (category -> technique), values redacted.
Output:
- Sanitized document + the redaction table.
Stop rules:
- If unsure whether a field is sensitive, treat it as 🔴 and mask it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a data-protection reviewer. Produce a sanitized version of the target that
leaks nothing yet preserves the task. Mask PII keeping shape; move secrets
out-of-band (never into the doc or prompt) and flag them for rotation. Do not echo
original sensitive values back.
</instructions>

<context>
Target: $ARGUMENTS. Traffic light: 🔴 secrets/PII/banking 🟡 internal 🟢 generic.
</context>

<constraints>
- card -> ****-1234, name -> [CUSTOMER_1], email/IBAN/phone -> <PLACEHOLDER>.
- secrets -> <SECRET_OUT_OF_BAND>, flagged for rotation.
- When unsure, treat as 🔴.
</constraints>

<output_format>
Sanitized document + a category->technique redaction table (values redacted).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | quick local pass |
| XML | Claude Code | the "out-of-band secrets" rule stays firm |

## Verified

- [x] Run against `materials/sensitive-ticket.md`
- [x] Produced `docs/sanitized-ticket.md`: card -> ****-1234, secrets out-of-band
      (flagged for rotation), task (double-charged fee) still understandable
