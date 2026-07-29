---
name: compare-approaches
description: Compare two implementation or test strategies for a target file before making changes.
version: 1
---

# Compare approaches (decision memo)

## Baseline (weak) — what you started from

```
what's the best way to change this?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior engineer preparing a small decision memo before coding.
Goal: Compare 2 realistic approaches for changing $ARGUMENTS and recommend one.
Context: The sample target is `app/src/money.ts`, a tiny money helper where trade-offs are mostly about correctness, readability, and testability.
Constraints:
- Do not edit code in this pass.
- Base the comparison on the target file and its existing tests.
- Compare only realistic options that fit this repo's size and conventions.
- No secrets or PII in output.
Acceptance criteria:
- Present exactly 2 options.
- For each option: what changes, benefits, risks, and how to verify.
- End with a recommendation and why it wins here.
Output:
- Short decision memo.
Stop rules:
- If there is no real decision to make, stop and say the simplest obvious path.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Compare two realistic approaches for changing $ARGUMENTS.
  - Recommend one.
  - Read only; do not edit code in this pass.
context:
  - Primary sample target: `app/src/money.ts`
  - Companion tests: `app/src/money.test.ts`
constraints:
  - Exactly two options.
  - Repo-sized trade-offs only: correctness, readability, testability.
  - No secrets or PII.
output_format:
  - Short decision memo
  - Two options
  - Final recommendation
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | compact decision memo |
| XML | Claude Code / Claude | holds the exactly-two-options rule |

## Verified

- [ ] Run against a real target in `app/`
- [x] Scoped to read-only analysis of `app/src/money.ts`


