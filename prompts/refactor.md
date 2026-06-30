---
name: refactor
description: Behavior-preserving refactor of a single module, guarded by the existing tests. Use to improve clarity without changing the public API.
version: 1
---

# Refactor (behavior-preserving)

## Baseline (weak) — what you started from

```
clean up money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest, ESM). You value small diffs.
Goal: Refactor $ARGUMENTS for readability WITHOUT changing observable behavior.
Context:
- Target: $ARGUMENTS. Tests in src/*.test.ts are the behavior contract.
Constraints:
- Do NOT change the public API (exported names, signatures, return types).
- No new dependencies. No behavior changes — tests must pass unchanged.
- Keep the diff minimal; prefer clarity over cleverness.
Acceptance criteria:
- `cd app && npm test` passes with the test file UNMODIFIED.
- `npm run typecheck` is clean.
- Diff is explainable in 3 bullets.
Output:
- The refactored file + a 3-bullet rationale.
Stop rules:
- If a clean refactor requires a behavior change, STOP and propose it separately.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS engineer who values small diffs. Refactor the target file for
readability with NO change in observable behavior. The tests are the contract:
they must pass without being edited. Verify before finishing.
</instructions>

<context>
Target: $ARGUMENTS. Behavior contract: src/*.test.ts (vitest). Public API is frozen.
</context>

<constraints>
- No public API changes, no new deps, no behavior changes.
- Minimal, explainable diff.
</constraints>

<output_format>
Refactored file + 3-bullet rationale.
</output_format>

<stop_rules>
If clarity needs a behavior change, stop and propose it as a separate step.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concise, diff-focused |
| XML | Claude Code | "frozen API" constraint stays sticky |

## Verified

- [ ] Run against `app/src/money.ts` (target ready; module is already small —
      use after a feature lands and the file has grown)
