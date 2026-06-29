---
name: write-money-docs
description: Improve documentation for money helper behavior, edge cases, and command usage.
version: 1
---

# Write Money Docs

## Baseline (weak) — what you started from

```
write docs for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer with TypeScript maintenance experience.
Goal: Improve developer-facing docs for $ARGUMENTS so a teammate understands behavior, constraints, and verification commands.
Context:
- App README: app/README.md
- Money helpers: app/src/money.ts
- Tests: app/src/money.test.ts
- This is a workshop sample; keep docs concise and practical.
Constraints:
- Edit only documentation files unless explicitly asked otherwise.
- Do not claim behavior that tests or code do not support.
- Mention integer cents and edge-case expectations.
- Do not include real secrets, PII, or environment values.
Acceptance criteria:
- Docs explain setup, test, and typecheck commands.
- Docs describe each exported helper in app/src/money.ts.
- Any known limitations are labeled clearly as limitations, not features.
- Markdown renders cleanly with headings and short examples.
Output:
- Changed docs files.
- Short summary of behavior documented.
- Any behavior that still needs code or test confirmation.
Stop rules:
- If code and tests disagree, document the current behavior and flag the disagreement.
- If requested docs require sensitive examples, use placeholders.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Improve developer-facing documentation for the money helper target. Keep the
docs concise, accurate, and tied to current code and tests.
</instructions>

<context>
Docs: app/README.md
Code: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Edit docs only.
- Do not invent unsupported behavior.
- Use placeholders for any sensitive examples.
</constraints>

<output_format>
Changed files, documented behavior, and unresolved code/test questions.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / Copilot | Explicit doc acceptance criteria |
| XML | Claude Code | Keeps sources and constraints compact |

## Verified

- [x] Checked against `app/README.md` and `app/src/money.ts`
- [x] Scope is documentation-only
