---
name: typecheck-cleanup
description: Resolve TypeScript typecheck failures with minimal behavior change.
version: 1
---

# Typecheck Cleanup

## Baseline (weak) — what you started from

```
fix TS errors
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer focused on type safety and minimal diffs.
Goal: Resolve TypeScript errors in $ARGUMENTS without changing runtime behavior unless required.
Context:
- Typecheck command: cd app && npm run typecheck
- Test command: cd app && npm test
- TS config: app/tsconfig.json
- Source: app/src/money.ts and app/src/money.test.ts
Constraints:
- Prefer precise types over any or broad casts.
- Do not add dependencies.
- Do not change tsconfig unless the error is clearly a config issue.
- Keep public APIs stable.
- No secrets or PII in output.
Acceptance criteria:
- cd app && npm run typecheck passes.
- cd app && npm test passes.
- Any runtime behavior change is explicitly called out.
Output:
- Type errors found.
- Changed files.
- Verification command results.
Stop rules:
- If a type error reveals an ambiguous product behavior, ask before changing behavior.
- If a dependency type package is needed, stop and explain why before adding it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Resolve TypeScript typecheck failures with minimal behavior change. Verify with
typecheck and tests before completion.
</instructions>

<context>
Typecheck: cd app && npm run typecheck
Tests: cd app && npm test
Argument: $ARGUMENTS
</context>

<constraints>
- Avoid any and broad casts.
- Keep public APIs stable.
- No dependencies unless explicitly approved.
- No secrets or PII in output.
</constraints>

<output_format>
Type errors, changed files, verification results, and behavior-change notes.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex / Copilot | Command-driven verification |
| XML | Claude Code | Compact constraints for type work |

## Verified

- [x] Checked against `app/package.json` scripts
- [x] Scope is limited to TypeScript cleanup
