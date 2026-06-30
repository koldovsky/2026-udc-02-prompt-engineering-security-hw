---
name: refactor-module
description: Behavior-preserving cleanup of a TS module. Tests must stay green before and after. Use to reduce complexity, not change outputs.
version: 1
---

# Refactor (behavior-preserving)

Improves structure without changing behavior. Point it at `app/src/money.ts`.
The planted bugs are NOT in scope here — changing an output is a bug fix, not a
refactor.

## Baseline (weak) — what you started from

```
відрефактор money.ts, зроби красивіше
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS refactorer in this repo (Node 22, ESM, vitest).
Goal: Improve readability/structure of $ARGUMENTS with zero behavior change.
Context: Integer-cent money helpers; tests in src/*.test.ts pin behavior.
Constraints:
- Public API (names, signatures, exports) unchanged. No new dependencies.
- Do NOT fix the planted bugs (separate prompt). If an output would change, stop.
- No secrets/PII.
Acceptance criteria:
- `cd app && npm test` green BEFORE and AFTER (run it first to capture baseline).
- `cd app && npm run typecheck` clean. Diff is structure-only.
Output:
- Changed file + a summary of what was simplified and why behavior is identical.
Stop rules:
- If a change alters any test's expected value, STOP — it's a bug fix, not refactor.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS refactorer. Improve structure of the target with zero behavior
change. Run `cd app && npm test` first to capture a green baseline, then again
after — both must pass. Public API unchanged.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent helpers). Tests in src/*.test.ts pin behavior.
The planted bugs are out of scope — do not change any output.
</context>

<constraints>
- No API/signature changes, no new deps, no secrets/PII.
- Diff must be structure-only.
</constraints>

<output_format>
Changed file + summary explaining why behavior is identical.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | "run tests before AND after" survives long edits |

## Verified

- [ ] Authored against `app/src/money.ts`; ready to run (behavior-preserving scope)