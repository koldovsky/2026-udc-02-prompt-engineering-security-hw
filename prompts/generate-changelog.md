---
name: generate-changelog
description: Summarise a git diff or list of commits into a human-readable changelog entry following Keep a Changelog format. Use before tagging a release or opening a PR.
version: 1
---

# Generate changelog

Point this at a git range or a diff — it will produce a structured changelog
entry grouped by Added / Changed / Fixed / Removed. Aim it at the commits on
your working branch and it should surface the test additions, documentation
improvements, and any bug fixes as clean, user-facing bullet points.

## Baseline (weak) — what you started from

```
write a changelog for my changes
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer and technical writer in this repo. You write for humans, not machines.
Goal: Produce a [Keep a Changelog](https://keepachangelog.com)-style entry for $ARGUMENTS (a git range, branch name, or pasted diff).
Context: This is a TS monorepo with an `app/` subdirectory. Changes may include source, tests, docs, and config.
Constraints:
- Read only; do NOT modify any files.
- Group entries under: Added | Changed | Fixed | Removed | Security. Omit empty groups.
- Write in past tense, user-facing language — describe what changed, not how the code changed.
- No secrets/PII in output; omit commit hashes, author names, and internal ticket numbers.
Acceptance criteria:
- Every meaningful change appears in exactly one group.
- Each bullet is one sentence, ≤ 120 characters.
- The entry is ready to paste into CHANGELOG.md under a new version heading.
Output:
- A version heading placeholder (`## [Unreleased]`), then the grouped bullet list.
Stop rules:
- If the diff is empty or contains only whitespace/formatting changes, say so and produce no entry.
- If a change is ambiguous (fix or feature?), use the more conservative group and add a `<!-- verify -->` comment.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer and technical writer. Produce a Keep a Changelog
entry for the provided git range or diff. Write in past tense, user-facing
language. Group under Added / Changed / Fixed / Removed / Security; omit empty
groups. Do not include commit hashes, author names, or internal ticket numbers.
</instructions>

<context>
Target: $ARGUMENTS (git range, branch name, or pasted diff).
Repo: TS monorepo with `app/` subdirectory (source, tests, docs, config).
</context>

<constraints>
- Read only; do not modify any files.
- Each bullet ≤ 120 characters, one sentence, past tense.
- No secrets/PII in output.
- If a change is ambiguous, use the more conservative group and add a `<!-- verify -->` comment.
- If the diff is empty or formatting-only, say so and produce no entry.
</constraints>

<output_format>
## [Unreleased]

### Added
- ...

### Changed
- ...

### Fixed
- ...

(omit empty groups)
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; paste the diff or `git log --oneline` output inline |
| XML | Claude Code / Claude | output_format block pre-fills the section skeleton so Claude fills in rather than invents structure |

## Verified

- [ ] Run against the current branch diff (`git diff main`)
- [ ] All meaningful changes grouped correctly; no hashes, author names, or PII in output
