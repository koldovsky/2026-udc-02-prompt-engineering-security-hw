---
name: generate-changelog
description: Generate a Keep a Changelog entry for the splitEvenly remainder fix in app/src/money.ts.
version: 1
---

# Generate Changelog

## Baseline (weak) — what you started from

```
write a changelog for the fix
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer maintaining a Keep a Changelog (keepachangelog.com) file. Target: `app/src/money.ts` fix of the `splitEvenly` remainder bug.
Goal: Produce a changelog entry for version 1.1.0 covering the bug fix and any test changes. Format: Keep a Changelog.
Context:
- Bug fixed: `splitEvenly` was dropping remainder cents (`Math.floor` with no remainder handling)
- Fix: `Array.from` with conditional `+1` for first `remainder` shares
- Tests: bug-doc test updated from `toBe(9)` to `toBe(10)`; test name no longer says "BUG"
- No API changes; no breaking changes
Constraints:
- Read only — do not edit source files
- Output the changelog entry inline; do not create a file unless asked
- No secrets or PII in output
Acceptance criteria:
- Entry follows Keep a Changelog format: `## [1.1.0] - YYYY-MM-DD`, sections Fixed / Tests
- One-line description per change, imperative mood ("Fix", "Update")
- Includes migration note: callers who relied on the dropped cent must handle new sum
Output:
- Formatted changelog section (ready to paste into CHANGELOG.md)
Stop rules:
- Do not create CHANGELOG.md unless explicitly asked
- Do not invent changes not in the context above
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer. Generate a Keep a Changelog entry for the splitEvenly remainder-cents bug fix. Read `app/src/money.ts` and `app/src/money.test.ts` for context. Do NOT edit any file — output the entry inline.
</instructions>

<context>
Change summary:
- Fixed: splitEvenly(totalCents, n) now distributes remainder cents to the first r shares instead of dropping them
  - Before: splitEvenly(10, 3) → [3,3,3] (sum=9, dropped 1 cent)
  - After:  splitEvenly(10, 3) → [4,3,3] (sum=10)
- Tests: updated bug-doc test to assert correct sum; removed "BUG" label from test name
- No breaking changes to public API signatures
- Potential breaking change for callers who depended on the (incorrect) dropped-remainder behaviour
</context>

<constraints>
- Read only — do not modify any file
- No secrets or PII in output
</constraints>

<output_format>
Keep a Changelog format:

## [1.1.0] - 2026-06-28

### Fixed
- <one-line description of the splitEvenly fix, imperative mood>

### Tests
- <one-line description of the test update>

### Migration
- <one sentence for callers who may be affected>
</output_format>

<stop_rules>
- Do not invent changes not described in the context
- Do not create files — output inline only
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
