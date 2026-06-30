---
name: refactor
description: Refactor a TS module for readability, maintainability, and type safety without changing behavior. Use after tests pass.
version: 1
---

# Refactor

Point it at `app/src/money.ts` and it should improve structure, naming, type
safety, and maintainability — while keeping every existing test green.

## Baseline (weak)

```text
refactor money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You prioritize readability and type safety.
Goal: Refactor $ARGUMENTS to improve code quality without changing observable behavior.
Context: Integer-cent money helpers. Tests in src/*.test.ts. All tests must stay green.
Constraints:
- Improve: naming, type narrowing, magic numbers, repeated patterns, single-responsibility.
- Extract constants for magic numbers (e.g. 100 for cents-per-dollar).
- Add branded types or type aliases where they improve call-site clarity (e.g. Cents, Percent).
- Do NOT change public function signatures (names, param order, return types).
- Do NOT add new dependencies.
- Do NOT change test files — they are the behavioral contract.
- No secrets/PII in output.
Acceptance criteria:
- `npm test` passes with zero changes to test files.
- `npm run typecheck` passes.
- No magic numbers remain in arithmetic expressions.
- Each function is ≤15 lines.
Output:
- The updated source file.
- A short summary: what changed and why, one bullet per refactoring.
Stop rules:
- If all functions are already clean and ≤15 lines, say so and stop.
- If a refactoring would require changing tests, flag it but do not apply.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Refactor the target module for readability,
type safety, and maintainability. Do not change observable behavior — all
existing tests must pass without modification. Run typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
Runtime: Node 22, vitest. No external deps allowed.
</context>

<constraints>
- Replace magic numbers with named constants (e.g. CENTS_PER_DOLLAR = 100).
- Add type aliases where they improve clarity (Cents, Percent).
- Do not change public function signatures or test files.
- Each function ≤15 lines. If already clean, say so and stop.
- No secrets/PII in output.
</constraints>

<output_format>
Updated source file. Short summary: one bullet per refactoring applied.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce test-green + size limit |
| XML | Claude Code | constraints block prevents scope creep into tests |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] `npm test` passes with no test file changes
- [ ] No magic numbers remain; functions ≤15 lines
