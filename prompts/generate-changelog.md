---
name: generate-changelog
description: Generate a structured changelog entry from a git diff. Use before tagging a release.
version: 1
---

# Generate changelog

## Baseline (weak)

```
write a changelog for my changes
```

## Production — markdown (GPT dialect)

```markdown
Role: TS tech writer in this repo. You summarize diffs for human readers.
Goal: Generate a Keep a Changelog–style entry for the changes in `$ARGUMENTS`
      (a git diff, PR description, or commit range).
Context:
- Repo: udc-ws02-app (Node 22, integer-cent money helpers).
- Format: https://keepachangelog.com — sections: Added, Changed, Fixed, Removed, Security.
- Target audience: team members reading GitHub releases.
Constraints:
- Do NOT include internal refactor details irrelevant to users.
- Each bullet: imperative mood, ≤15 words, references file:function if non-obvious.
- No secrets, PII, or internal hostnames in output.
- Omit empty sections.
Acceptance criteria:
- Output is valid Keep a Changelog markdown.
- Covers all user-visible changes from the diff.
- Security fixes appear in a dedicated `Security` section.
Output:
- Changelog entry block (markdown), ready to paste into CHANGELOG.md.
Stop rules:
- If the diff is empty or only touches comments, say so and return nothing.
- Do not invent changes not present in the diff.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS tech writer. Generate a Keep a Changelog–style entry for the diff or
commit range in $ARGUMENTS. Do not invent changes not present in the diff. Omit
empty sections. Return only the changelog block — nothing else.
</instructions>

<context>
Repo: udc-ws02-app (Node 22, integer-cent money helpers).
Format: keepachangelog.com — sections: Added, Changed, Fixed, Removed, Security.
Audience: team members reading GitHub release notes.
</context>

<constraints>
- Each bullet: imperative mood, ≤15 words, references file:function if non-obvious.
- Security fixes go in a dedicated Security section.
- No secrets, PII, or internal hostnames in output.
- If the diff is empty or touches only comments, say so and return nothing.
</constraints>

<output_format>
Valid Keep a Changelog markdown block, ready to paste into CHANGELOG.md.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | prose-first output suits this task |
| XML | Claude Code | constraints block prevents hallucinated entries |

## Verified

- [x] Run against the WS2 homework diff
- [x] Output matched Keep a Changelog format; no invented changes
