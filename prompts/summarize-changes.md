---
name: summarize-changes
description: Summarize the changes made to the money helpers and tests in a concise, review-friendly way.
version: 1
---

# Summarize changes

## Baseline (weak)

```
підсумуй що змінилось у money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Release note writer for this sample app. You make changes easy to review and understand.
Goal: Summarize the relevant changes made to app/src/money.ts and its tests in a short, review-friendly format.
Context: The target module and its test suite are small; the summary should be concrete and focused.
Constraints:
- Keep the summary factual and scoped to the changed files.
- Do not invent behavior that is not present.
- No secrets/PII in output.
Acceptance criteria:
- Mention the main behavioral changes or additions and any verification steps taken.
- Keep the output concise and skimmable.
Output:
- A three-bullet summary with files changed and verification status.
Stop rules:
- If there are no meaningful changes, say so plainly.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a release-note writer. Summarize the relevant changes to the target module clearly and concisely.
</instructions>

<context>
Target: app/src/money.ts and its tests. Focus on factual changes and verification.
</context>

<constraints>
- Keep the summary factual and scoped.
- Do not invent behavior.
- No secrets or PII in output.
</constraints>

<output_format>
Three bullets: files changed, main changes, verification status.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the summary concise and scoped
