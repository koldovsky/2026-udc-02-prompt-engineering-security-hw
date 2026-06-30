---
name: write-changelog
description: Generate a Keep a Changelog entry from git diff or commit range. Use before releases.
version: 1
---

# Write changelog

Point it at a commit range or branch and it should produce a changelog entry
grouped by Added / Changed / Fixed / Removed in Keep a Changelog format.

## Baseline (weak)

```text
write changelog for recent changes
```

## Production — markdown (GPT dialect)

```markdown
Role: Release engineer in this repo (Node 22, vitest). You write clear, user-facing changelogs.
Goal: Generate a changelog entry for $ARGUMENTS (a commit range, branch name, or "HEAD~5..HEAD").
Context: Integer-cent money helpers in app/src/. Use `git log` and `git diff` to gather changes.
Constraints:
- Follow Keep a Changelog format (https://keepachangelog.com): Added, Changed, Fixed, Removed sections.
- Only include sections that have entries — omit empty categories.
- Each entry: one line, starts with the function or file affected, then what changed.
- Use past tense ("Added", "Fixed"), not imperative.
- Do NOT include commit hashes or author names.
- Do NOT include changes to test files unless they add coverage for a new feature.
- No secrets/PII in output.
Acceptance criteria:
- Output is valid markdown with ## [Unreleased] header.
- Every changed function or file appears in at least one entry.
- Categories are in standard order: Added, Changed, Fixed, Removed.
Output:
- A changelog entry ready to prepend to CHANGELOG.md.
Stop rules:
- If the diff is empty, say "No changes found" and stop.
- If the range includes only test/config changes, note that and produce a minimal entry.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a release engineer. Generate a Keep a Changelog entry from the git
history for the given range. Use `git log` and `git diff` to gather changes.
Write clear, user-facing descriptions grouped by Added/Changed/Fixed/Removed.
</instructions>

<context>
Target: $ARGUMENTS (commit range, branch, or default HEAD~5..HEAD).
App in app/src/. Keep a Changelog format (https://keepachangelog.com).
</context>

<constraints>
- Standard sections: Added, Changed, Fixed, Removed. Omit empty ones.
- One line per entry: affected function/file + what changed, past tense.
- No commit hashes, no author names, no test-only changes unless they cover a new feature.
- No secrets/PII in output.
</constraints>

<output_format>
Markdown changelog entry with ## [Unreleased] header, ready to prepend to CHANGELOG.md.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce format + completeness |
| XML | Claude Code | constraints keep output concise and paste-ready |

## Verified

- [ ] Run against a real commit range in this repo
- [ ] Output follows Keep a Changelog format with correct categories
