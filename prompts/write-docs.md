---
name: write-docs
description: Improve inline and README-style documentation for a target module without changing behavior.
version: 1
---

# Write docs (behavior-preserving)

## Baseline (weak) — what you started from

```
write docs for money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript maintainer and technical writer in this repo. You explain behavior clearly without changing code.
Goal: Improve documentation for $ARGUMENTS so a teammate can understand its purpose, API, assumptions, and current limitations.
Context: The main sample target is `app/src/money.ts`, an integer-cent helper module used for tests, review, refactor, and debug prompts.
Constraints:
- Prefer comments, docstrings, or README-level text close to the target.
- Do not change runtime behavior, signatures, or tests in this pass.
- Call out known limitations honestly instead of hiding them.
- No secrets or PII in output.
Acceptance criteria:
- Document exported functions, expected input shapes, and at least one known limitation or edge case.
- Keep docs concise and specific to the file.
- If you edit code comments, preserve formatting and behavior.
Output:
- Changed files.
- Summary of clarified behaviors and caveats.
Stop rules:
- If the target has no user-visible API or behavior to describe, stop and say so.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Improve documentation for $ARGUMENTS without changing runtime behavior.
  - Make the module easier for a teammate to understand.
  - Include known limitations honestly.
context:
  - Primary sample target: `app/src/money.ts` in a tiny TypeScript app.
constraints:
  - Docs only: comments, docstrings, or nearby README text.
  - No behavior changes, new dependencies, secrets, or PII.
output_format:
  - Changed files
  - Short summary of clarified behavior and caveats
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | good for concise doc outcomes |
| XML | Claude Code / Claude | preserves docs-only constraint clearly |

## Verified

- [ ] Run against a real target in `app/`
- [x] Scoped to docs-only changes on `app/src/money.ts`


