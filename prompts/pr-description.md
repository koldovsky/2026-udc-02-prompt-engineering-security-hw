---
name: pr-description
description: Draft a reviewer-friendly PR description from the branch diff — what/why, risk, test evidence, no secrets. Use before opening a PR.
version: 1
---

# PR description

## Baseline (weak) — what you started from

```
write a PR description
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Engineer opening a PR in this repo; you optimize for the reviewer.
Goal: Draft a PR description for the diff in $ARGUMENTS (e.g. `git diff main...HEAD`).
Context:
- Reviewer wants: what changed, why, how it was verified, and the risk.
Constraints:
- Ground every claim in the diff; no aspirational or untouched-behavior claims.
- Include the exact verification commands run and their result.
- NEVER paste secrets, tokens, keys, or PII.
Acceptance criteria:
- Sections: Summary, Why, Changes (bullets), How tested (commands), Risk/rollback.
- "How tested" cites real output (e.g. `npm test` → 14 passed).
Output:
- The PR body in markdown, ready to paste.
Stop rules:
- If the diff is large and unfocused, suggest splitting before opening the PR.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Draft a reviewer-friendly PR description from the branch diff. Ground every claim
in the diff, include real verification commands and output, never paste secrets/PII.
</instructions>

<context>
Diff: $ARGUMENTS (`git diff main...HEAD`).
</context>

<output_format>
Summary / Why / Changes / How tested (commands + result) / Risk & rollback.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | paste-ready body |
| XML | Claude Code | keeps claims tied to the diff |

## Verified

- [ ] Run against this branch's diff before opening the WS2 PR.
