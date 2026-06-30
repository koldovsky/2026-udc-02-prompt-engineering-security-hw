---
name: fix-linter
description: Auto-fix linter and type-checker errors in a TS module without changing behavior. Use when CI is red.
version: 1
---

# Fix linter

Point it at `app/src/money.ts` (or any file) and it should fix all linter
and type-checker errors while keeping tests green.

## Baseline (weak)

```text
fix lint errors in money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest, strict tsconfig). You fix mechanically, not creatively.
Goal: Fix all linter warnings and type-checker errors in $ARGUMENTS so CI goes green.
Context: Strict tsconfig (noUncheckedIndexedAccess, strict). Tests in src/*.test.ts.
Constraints:
- Fix only lint/type errors — do NOT refactor, rename, or change logic.
- Preserve observable behavior — all existing tests must pass unchanged.
- If a fix requires a judgment call (e.g. `any` → which type?), add a TODO comment and move on.
- Do NOT add new dependencies.
- Do NOT modify test files.
- No secrets/PII in output.
Acceptance criteria:
- `npm run typecheck` exits 0.
- `npm test` passes with no test file changes.
- No `// @ts-ignore` or `as any` introduced.
Output:
- Updated source file(s).
- Short summary: one bullet per fix applied (error code + what changed).
Stop rules:
- If there are no errors, say so and stop.
- If a fix would change public API behavior, flag it and skip.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Fix all linter and type-checker errors in the
target file. Do not refactor or change logic — mechanical fixes only.
All existing tests must pass without modification. Run typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS. Strict tsconfig (noUncheckedIndexedAccess, strict).
Tests in src/*.test.ts. Runtime: Node 22, vitest.
</context>

<constraints>
- Fix only lint/type errors. No refactoring, no logic changes.
- No @ts-ignore or `as any`. If unsure of the type, add a TODO comment.
- Do not modify test files or add dependencies.
- No secrets/PII in output.
</constraints>

<output_format>
Updated source file(s). One bullet per fix: error code + what changed.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce no @ts-ignore + test-green |
| XML | Claude Code | constraints prevent scope creep into refactoring |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] `npm run typecheck` exits 0; `npm test` passes
