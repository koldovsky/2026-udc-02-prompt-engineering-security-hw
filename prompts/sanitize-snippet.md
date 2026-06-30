---
name: sanitize-snippet
description: Strip secrets/PII from a snippet before it goes to an external model, while preserving the task. Run locally — never paste the original out.
version: 1
---

# Sanitize snippet (pre-share)

Prepares text for an external AI tool: redact/mask/synthesize sensitive values so
the **task survives** but nothing real leaks. Ties into Task B's checklist.

## Baseline (weak) — what you started from

```
прибери зайве і відправ це в чат
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security-aware engineer prepping text for an external model. Run LOCALLY.
Goal: Make $ARGUMENTS safe to share without losing the task's meaning.
Context: Traffic-light classes — 🔴 secrets/PII/banking, 🟡 internal logic, 🟢 generic.
Constraints:
- 🔴 secrets → OUT-OF-BAND placeholder (`<SECRET_OUT_OF_BAND>`), never inline.
- PII → masked/synthetic (`[CUSTOMER_1]`, card `****-1234`, IBAN `<IBAN>`).
- Preserve structure/behavior needed to reason about the task.
- NEVER output a real value. If unsure whether something is sensitive, redact it.
Acceptance criteria:
- Zero real secrets/PII remain; the underlying problem is still understandable.
- A short table: what was redacted/masked/synthesized and why.
Output:
- The sanitized snippet + the redaction table.
Stop rules:
- If you cannot sanitize without destroying the task, STOP and explain.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You prepare text for an external model, running locally. Redact/mask/synthesize
all sensitive values so the task still makes sense. Never emit a real value;
when unsure, redact.
</instructions>

<context>
Input: $ARGUMENTS. Classes: 🔴 secrets/PII/banking, 🟡 internal logic, 🟢 generic.
Secrets go out-of-band, never inline.
</context>

<constraints>
- PII masked/synthetic; secrets → `<SECRET_OUT_OF_BAND>`. No real value survives.
</constraints>

<output_format>
Sanitized snippet + a table (original-class → treatment → why).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concise checklist |
| XML | Claude Code | "never emit a real value" rule holds firmly |

## Verified

- [ ] Authored; pairs with `docs/sanitization-checklist.md` (Task B)