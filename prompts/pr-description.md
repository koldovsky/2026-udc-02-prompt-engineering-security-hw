---
name: pr-description
description: Draft a PR description from a branch diff — summary, changes, test plan. Use before opening a pull request.
version: 1
---

# PR description (from branch diff)

Feed it `git diff main...HEAD` (or a file list). Produces a reviewer-friendly PR
body grounded in the actual changes.

## Baseline (weak)

```
опиши цей PR
```

## Production — markdown (GPT dialect)

```markdown
Role: Engineer opening a PR in this repo. You write for the reviewer.
Goal: Draft a PR description for $ARGUMENTS (the branch diff vs main).
Context: WS2 homework repo; reviewers (incl. CodeRabbit) check a Definition of Done.
Constraints:
- Summarize ONLY what changed; no roadmap, no unrelated promises.
- Sections: Summary, What changed (bullets), How to verify, Risk/Out-of-scope.
- No secrets/PII; flag anything that looks sensitive instead of pasting it.
Acceptance criteria:
- "How to verify" has runnable commands (e.g. `cd app && npm test`).
- Each bullet maps to a real file/area in the diff.
Output:
- The PR body in markdown — ready to paste.
Stop rules:
- If the diff spans unrelated concerns, note it under Out-of-scope rather than blending them.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | renders directly into the PR box |

## Verified

- [x] Run against this branch's diff (dry-run: produced Summary + verify steps)
