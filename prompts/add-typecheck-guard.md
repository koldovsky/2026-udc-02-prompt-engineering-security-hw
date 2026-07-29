---
name: add-typecheck-guard
description: Make a target TypeScript file and its surrounding checks safer under typecheck without changing behavior.
version: 1
---

# Add typecheck guard (TS hygiene)

## Baseline (weak) — what you started from

```
make types better
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer improving type safety without behavior changes.
Goal: Tighten $ARGUMENTS just enough that type intent is clearer and `npm run typecheck` stays green.
Context: In this repo, the sample app uses `tsc --noEmit` and Vitest. The main target is usually `app/src/money.ts`.
Constraints:
- Prefer explicit annotations, helper extraction, or narrow checks only if they improve clarity.
- No API changes, no new dependencies, no broad rewrite.
- Run typecheck after changes; run tests too if logic or tests changed.
- No secrets or PII in output.
Acceptance criteria:
- Explain what type confusion or ambiguity was reduced.
- Finish only if the relevant verification commands pass.
Output:
- Changed files.
- Type-safety improvement summary.
- Verification results.
Stop rules:
- If no meaningful type-safety improvement exists without changing behavior, stop and say so.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Improve type clarity for $ARGUMENTS without changing behavior.
  - Verify with repo checks.
context:
  - Primary sample target: `app/src/money.ts`
  - Verification includes `tsc --noEmit`
constraints:
  - Small type-safety improvements only.
  - No API changes, dependencies, secrets, or PII.
output_format:
  - Changed files
  - Type-safety improvement summary
  - Verification results
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | clear typecheck-focused acceptance criteria |
| XML | Claude Code / Claude | keeps behavior-preserving scope explicit |

## Verified

- [ ] Run against a real target in `app/`
- [x] References repo typecheck command from `app/package.json`


