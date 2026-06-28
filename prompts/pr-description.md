---
name: pr-description
description: Generate a PR title + body (summary, changes, risk, test notes) from a diff or branch — grounded only in the actual changes. Pass the diff/branch ref as $ARGUMENTS.
version: 1
---

# PR description

Describe what changed and how it was verified — no invented features. Verified by
generating a PR body for the `app/src/money.test.ts` edits.

## Baseline (weak) — what you started from

```
write a PR description
```

## Production — markdown (GPT dialect)

```markdown
Role: You are an engineer writing a clear, reviewer-friendly PR description.
Goal: Produce a PR title and body for the changes in $ARGUMENTS (a diff or branch vs main).
Context:
- Read only the actual diff (e.g. `git diff main...HEAD`). Repo: small TS app with vitest.
Constraints:
- Ground every claim in the diff — do NOT describe changes that aren't there or speculate about intent.
- Include a short test/verification note (commands run + result, e.g. `cd app && npm test`).
- No secrets/PII; do not paste tokens, env values, or full sensitive payloads into the body.
Acceptance criteria:
- Output has: a concise imperative title (<= ~70 chars), a 1–3 sentence summary, a "Changes" bullet list, a "Risk / out of scope" note, and a "How tested" section.
- Anyone can map each bullet back to a real hunk in the diff.
Output:
- The PR title on its own line, then the markdown body.
Stop rules:
- If the diff is empty or unavailable, say so and ask for the correct ref instead of inventing content.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are an engineer writing a reviewer-friendly PR description for the changes in
$ARGUMENTS (diff or branch vs main). Read only the actual diff; ground every claim
in it. Include how it was tested.
</instructions>

<context>
Small TS app with vitest. Use the real diff (e.g. git diff main...HEAD).
</context>

<constraints>
- No invented changes/intent. No secrets/PII or full payloads in the body.
- Include commands run + result for verification.
</constraints>

<output_format>
Title line (<=~70 chars, imperative), then body: Summary, Changes (bullets),
Risk / out of scope, How tested.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure keeps claims diff-grounded |

## Verified

- [x] Run against a real branch diff (e.g. the money.test.ts edits)
- [x] Every bullet maps to a real hunk; "How tested" present; no secrets
