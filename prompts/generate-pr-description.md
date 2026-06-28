---
name: generate-pr-description
description: Generate a structured GitHub PR description from a git diff; covers summary, test plan, and breaking changes.
version: 1
---

# Generate PR Description

## Baseline (weak) — what you started from

```
write a PR description for my changes
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer on a TypeScript team. Target: the current git diff in `app/`.
Goal: Generate a GitHub PR description that tells reviewers what changed, why, and how to verify it.
Context:
- Repo: `app/src/money.ts` (financial utility — integer cents)
- Changes may include: bug fixes, new tests, type improvements, input validation
- PR will be reviewed by CodeRabbit (auto) and a human reviewer
Constraints:
- Read `git diff HEAD~1` or staged diff only; do not read unrelated files
- Output the PR body only (not title); use GitHub-flavoured markdown
- No secrets or PII in output
Acceptance criteria:
- Sections: Summary (bullet list), Test plan (checkbox list), Breaking changes (or "None"), Notes for reviewer
- Summary bullets are imperative mood ("Fix", "Add", "Update"), max 10 bullets
- Test plan shows exact command to run: `cd app && npm test`
- Breaking changes section explicitly states if public API changes
Output:
- PR body ready to paste into GitHub (markdown)
Stop rules:
- Do not invent changes not in the diff
- If diff is empty, report "No staged changes found" and stop
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer. Read the output of `git diff HEAD~1 -- app/` and generate a GitHub PR description body. Do NOT modify any file. Output inline in response only.
</instructions>

<context>
Target repository: app/src/money.ts and app/src/money.test.ts
Reviewer audience: human + CodeRabbit auto-review
PR description must let a reviewer understand the change without reading the full diff.
</context>

<constraints>
- Read only: run `git diff HEAD~1 -- app/` to get the diff; do not read unrelated files
- Output PR body only (no title); GitHub-flavoured markdown
- No secrets or PII in output
- Do not invent changes not present in the diff
</constraints>

<output_format>
## Summary
- <imperative-mood bullet per logical change>

## Test plan
- [ ] `cd app && npm test` — all tests green
- [ ] <any manual verification steps>

## Breaking changes
<"None" or explicit description of what callers must update>

## Notes for reviewer
<optional: design decisions, trade-offs, things to pay extra attention to>
</output_format>

<stop_rules>
- If `git diff` output is empty, output: "No changes to describe." and stop
- Do not reference commit hashes or branch names — focus on what changed, not git metadata
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
