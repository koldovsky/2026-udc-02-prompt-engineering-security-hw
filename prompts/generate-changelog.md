---
name: generate-changelog
description: Write a Keep-a-Changelog entry from a git diff or commit range.
version: 1
---

# Generate CHANGELOG entry from diff

## Baseline (weak)

```
write a changelog
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a technical writer maintaining a project CHANGELOG.
Goal: Write a Keep a Changelog (https://keepachangelog.com/en/1.1.0/) entry for the changes in $ARGUMENTS (a git diff or commit range).
Context: TypeScript monorepo with integer-cent money helpers. Audience: developers upgrading the package.
Constraints:
- Follow Keep a Changelog format strictly: ## [version] - YYYY-MM-DD with Added / Changed / Fixed / Removed subsections.
- Omit sections that have no entries.
- No secrets, internal issue numbers, or PII.
- Derive the semantic version bump: patch = bug fix only, minor = new feature, major = breaking change.
Acceptance criteria:
- At least one section (Added / Changed / Fixed / Removed) with real content.
- Each bullet: one sentence, past tense, developer-facing ("Fixed", "Added").
Output:
- The CHANGELOG entry block only (not the full file).
Stop rules:
- If the diff is empty, say so and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a technical writer. Write a Keep a Changelog entry for the changes in $ARGUMENTS.
Use past tense, developer-facing language. Omit empty sections.
</instructions>

<context>
Format: https://keepachangelog.com/en/1.1.0/
Sections (use only those with content): Added | Changed | Fixed | Removed
Version bump: patch = bug fix only, minor = new feature, major = breaking change.
No secrets, ticket numbers, or PII.
</context>

<constraints>
- One CHANGELOG block only — not the full file.
- Each bullet: one sentence, present-tense verb ("Fixed splitEvenly…", "Added @throws…").
- Derive version bump type from the diff content.
</constraints>

<output_format>
## [x.y.z] - YYYY-MM-DD
### Fixed
- ...
### Added
- ...
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot | format link + prose rules fit GPT's style |
| XML | Claude Code | output_format block enforces correct Keep-a-Changelog shape |

## Verified

- [x] Run against `git diff HEAD` (uncommitted working-tree changes) in this repo
- [x] Produced the valid Keep-a-Changelog entry below; version bump classified as minor (new exports) + patch (bug fix) → 0.2.0

```markdown
## [0.2.0] - 2026-06-29

### Added
- Exported `Cents` branded type and `toCents()` constructor for compile-time safety.
- Input validation guards to `splitEvenly` (throws when `n ≤ 0`) and `applyDiscount` (throws when `percent` is outside 0–100).
- JSDoc `@param`, `@returns`, `@throws`, and `@example` tags to all four exported functions.
- Edge-case tests: negative cents, zero, whitespace-padded input, invalid throws, guard paths.

### Fixed
- `splitEvenly` silently dropped remainder cents; sum of shares now always equals `totalCents`.
```
