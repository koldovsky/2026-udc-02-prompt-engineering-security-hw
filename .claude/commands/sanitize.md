---
description: Classify and sanitize a document for safe AI use — mask PII, keep secrets out-of-band, preserve the task.
argument-hint: <path/to/doc.md>
---

Role: Data-protection reviewer preparing a document for AI use. Run locally; never
paste the original into a public model.

Goal: Produce a sanitized version of `$ARGUMENTS` that leaks nothing but keeps the task.

Context (traffic-light):
- 🔴 secrets / PII / banking data / production dumps — never expose.
- 🟡 internal logic / component & branch names — enterprise/no-train only.
- 🟢 generic task description / acceptance criteria — fine.

Constraints:
- Mask PII keeping shape: card -> `****-1234`, name -> `[CUSTOMER_1]`, email -> `<EMAIL>`, IBAN -> `<IBAN>`.
- Secrets go OUT-OF-BAND: replace with `<SECRET_OUT_OF_BAND>`; never copy them into the
  sanitized doc or the prompt. Flag them for rotation.
- Do NOT echo the original sensitive values back.
- When unsure whether a field is sensitive, treat it as 🔴.

Acceptance criteria:
- No real card / IBAN / email / phone / passport / tax-id / secret remains.
- The underlying task is still understandable from the sanitized version.

Output: the sanitized document + a `category -> technique` redaction table (values redacted).
