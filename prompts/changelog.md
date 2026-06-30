---
name: changelog
description: Generates a human-readable changelog entry for app/src/money.ts based on git diff or commit messages
version: 1
---

# changelog
Generates a concise, human-readable changelog entry for `app/src/money.ts` based on recent changes. Output is written to `app/CHANGELOG.md`.

## Baseline (weak) — what you started from

```
write changelog for money.ts changes
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior technical writer generating a changelog entry for a retail TypeScript module.
Goal: Summarise recent changes to `app/src/money.ts` into a changelog entry in `app/CHANGELOG.md`.
Context:
- Source: `app/src/money.ts` (read for current state)
- Diff or commit messages: provided by the user or from `git log --oneline app/src/money.ts`
- Output file: `app/CHANGELOG.md` (append a new entry; do not overwrite existing entries)
Constraints:
- Write only to `app/CHANGELOG.md`; do not edit any source file.
- Use Keep a Changelog format: `## [version] - YYYY-MM-DD` with sections Added / Changed / Fixed / Removed.
- No secrets or PII in output.
- Use plain English; avoid internal implementation details.
Acceptance criteria:
- Entry includes the correct version and date.
- Each change is categorised (Added / Changed / Fixed / Removed) in one sentence.
- Breaking changes are marked with **BREAKING**.
Output:
- Appended changelog entry in `app/CHANGELOG.md`.
- One-line summary of sections written.
Stop rules:
- Stop if no changes are detected.
- Do not invent changes not present in the diff or commit messages.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior technical writer. Generate a changelog entry for app/src/money.ts
based on recent changes provided by the user or from git log.
Append the entry to app/CHANGELOG.md using Keep a Changelog format.
Do not edit any source file.
</instructions>

<context>
- Source: app/src/money.ts (read for current state)
- Output: app/CHANGELOG.md (append only; preserve existing entries)
- Format: Keep a Changelog — sections: Added / Changed / Fixed / Removed
</context>

<constraints>
- Write only to app/CHANGELOG.md.
- No secrets or PII in output.
- Mark breaking changes with BREAKING.
- Do not invent changes not present in the diff or commits.
</constraints>

<output_format>
Appended ## [version] - YYYY-MM-DD entry with categorised one-sentence items.
One-line summary of sections written.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Best when |
|---------|----------|-----------|
| markdown | Copilot (GPT) / Codex / ChatGPT | you want a quick plain-text changelog draft |
| XML | Claude Code / Claude | you need strict format enforcement and file append behaviour |

## Verified

- [ ] Run against recent changes to `app/src/money.ts`
- [ ] Entry appended to `app/CHANGELOG.md`; no source files edited
