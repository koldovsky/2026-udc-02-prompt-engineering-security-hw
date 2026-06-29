---
name: update-app-readme
description: Update the app README after behavior or verification commands change.
version: 1
---

# Update App README

## Baseline (weak) — what you started from

```
update readme
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Maintainer updating concise developer documentation.
Goal: Update $ARGUMENTS so app/README.md matches the current app behavior and commands.
Context:
- README: app/README.md
- Package scripts: app/package.json
- Code: app/src/money.ts
- Tests: app/src/money.test.ts
Constraints:
- Edit only app/README.md unless explicitly asked otherwise.
- Keep the README short and task-focused.
- Do not document future behavior as already implemented.
- Do not include real secrets, PII, or local machine-specific paths.
Acceptance criteria:
- README lists accurate setup, test, and typecheck commands.
- README describes the current purpose of each money helper.
- Any intentional limitations or workshop notes remain clear.
Output:
- Changed files.
- Summary of README updates.
- Any code behavior that was unclear while documenting.
Stop rules:
- If package scripts and README disagree, trust package.json and mention the correction.
- If behavior is unclear from code, flag it instead of inventing details.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Update app/README.md to match current code and package commands. Keep it concise
and accurate.
</instructions>

<context>
README: app/README.md
Scripts: app/package.json
Code: app/src/money.ts
Tests: app/src/money.test.ts
Argument: $ARGUMENTS
</context>

<constraints>
- Edit only app/README.md.
- Do not invent behavior.
- No secrets, PII, or local machine-specific paths.
</constraints>

<output_format>
Changed files, README update summary, and unclear behavior notes.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / Copilot | Concrete source-of-truth rules |
| XML | Claude Code | Good for docs-only command use |

## Verified

- [x] Checked against `app/README.md` and `app/package.json`
- [x] Covers the docs category
