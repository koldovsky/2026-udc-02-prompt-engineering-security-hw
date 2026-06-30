---
name: pr-description
description: Draft a PR body from the branch diff vs main — summary, changes, testing, risk. Grounded in the diff, nothing fabricated.
version: 1
---

# PR description

Drafts a pull-request body from the real branch diff against `main`.

## Baseline (weak) — what you started from

```
зроби опис для пул реквесту
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Engineer in this repo opening a PR for review (CodeRabbit reads it).
Goal: A clear, accurate PR body for the current branch.
Context: Use ONLY `git diff main...HEAD` and the changed files. $ARGUMENTS = title hint.
Constraints:
- Ground every claim in the diff. Do not claim tests passed unless you ran them.
- No secrets/PII. Keep it scannable.
Acceptance criteria:
- Sections: Summary, Changes (bulleted by file/area), Testing, Risk & rollback.
- "Testing" states what was actually run (or "not run") — no guessing.
Output:
- The PR body in markdown, ready to paste into `gh pr create`.
Stop rules:
- If the branch has no diff vs main, say so and stop.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Draft a PR body for the current branch from `git diff main...HEAD` only. Ground
every claim in the diff; state testing truthfully (what ran, or "not run").
</instructions>

<context>
Source: branch diff vs main. Title hint: $ARGUMENTS. Reviewer: CodeRabbit + humans.
</context>

<constraints>
- Sections: Summary, Changes, Testing, Risk & rollback. No secrets/PII.
- If there is no diff vs main, stop and say so.
</constraints>

<output_format>
A markdown PR body ready for `gh pr create`.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concise |
| XML | Claude Code | "ground every claim" + truthful testing holds |

## Verified

- [ ] Authored; ready to run against this branch (`ws02/...` vs `main`)
