---
name: refactor-safe
description: Behavior-preserving refactor of a file for readability/structure — public API and test results unchanged. Pass the file as $ARGUMENTS.
version: 1
---

# Safe refactor

Improve the code without changing what it does. The test suite is the contract.
Verified against `app/src/money.ts`.

## Baseline (weak) — what you started from

```
clean up this code
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a senior TS engineer doing a behavior-preserving refactor (Node 22, vitest).
Goal: Improve readability and structure of $ARGUMENTS without changing observable behavior.
Context:
- Small TS module in `app/src/`; tests in the sibling `*.test.ts`.
- The existing tests define the contract. Run: `cd app && npm test`.
Constraints:
- Do NOT change the public API (exported names, signatures, return types) or runtime behavior — including current edge-case behavior, even if it looks buggy. Surface bugs in your notes; fix them in a separate pass.
- No new dependencies. Keep the module's style. No secrets/PII.
Acceptance criteria:
- `cd app && npm test` is GREEN before and after (same pass/fail set), and `npm run typecheck` passes.
- Diff is minimal and purposeful (naming, extraction, dead code, clarity) — not churn.
Output:
- The refactored file + a short bullet list of each change and why, plus any bug you noticed but deliberately did NOT fix.
Stop rules:
- If a "cleanup" would change behavior or a test result, stop and call it out instead of doing it.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Refactor $ARGUMENTS for readability/structure WITHOUT
changing observable behavior or the public API. The existing tests are the
contract. Verify the pass/fail set is unchanged with `cd app && npm test`.
</instructions>

<context>
Small TS module in app/src/; tests in the sibling *.test.ts. Preserve current
edge-case behavior even if it looks buggy.
</context>

<constraints>
- No API/behavior changes, no new deps, minimal diff. Note bugs; don't fix them here. No secrets/PII.
</constraints>

<output_format>
Refactored file + bullets (each change + why) + any bug noticed-but-not-fixed.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure enforces "no behavior change" |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Same test pass/fail set before & after; typecheck green; minimal diff
