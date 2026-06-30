---
name: enrich-jsdoc
description: Add @param, @returns, @throws, and @example JSDoc tags to every exported function in a TS file.
version: 1
---

# Enrich JSDoc in TypeScript module

## Baseline (weak)

```
add comments to money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript technical writer enriching documentation in an existing module.
Goal: Add @param, @returns, @throws, and @example JSDoc tags to every exported function in $ARGUMENTS. Do NOT change any runtime code — doc-comments only.
Context: Integer-cent money helpers. One-liner comments already exist above each function; you are extending them with structured tags.
Constraints:
- Edit ONLY the JSDoc block above each exported function.
- Do not add @deprecated, @internal, or unrelated annotations.
- @example values must be synthetic (no real amounts or PII).
- Do not touch unexported or private code.
Acceptance criteria:
- Every exported function has @param (one per argument), @returns, and at least one @example.
- Functions that throw have a @throws tag explaining the trigger condition.
- The file compiles without errors after your edits (tsc --noEmit).
Output:
- Full updated file.
- Table: function name | tags added.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do not run npm install or any git commands.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TypeScript technical writer. Enrich JSDoc in the target file by adding
@param, @returns, @throws, and @example tags to every exported function.
Edit ONLY doc-comment blocks. Do NOT change any runtime code.
After editing, verify tsc --noEmit passes.
</instructions>

<context>
Target: $ARGUMENTS — integer-cent money helpers (app/src/money.ts).
Existing one-liner comments are already present above each function.
Extend them; do not replace or shorten existing text.
</context>

<constraints>
- Touch ONLY the JSDoc block above each exported function.
- Each exported function must get: @param (per arg), @returns, @example (synthetic values only).
- Functions that throw: add @throws with the trigger condition.
- No @deprecated, @internal, or unrelated tags.
- File must pass tsc --noEmit with strict: true after changes.
</constraints>

<output_format>
1. Full updated file content.
2. Table: function | tags added.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / GPT | Shorter, outcome-first |
| XML | Claude Code | Preservation rule ("don't replace existing") holds reliably |

## Verified

- [x] Run against `app/src/money.ts`
- [x] All four functions received @param, @returns, @throws (parseAmount), @example; file compiled cleanly
