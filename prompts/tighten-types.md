---
name: tighten-types
description: Strengthen a file's TypeScript types — remove `any`, narrow inputs/outputs, exploit strict & noUncheckedIndexedAccess — without changing runtime behavior. Pass the file as $ARGUMENTS.
version: 1
---

# Tighten types

Make illegal states unrepresentable; let the compiler catch the bugs. Verified
against `app/src/money.ts` (repo runs `strict` + `noUncheckedIndexedAccess`).

## Baseline (weak) — what you started from

```
improve the types here
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TS type specialist (Node 22; tsconfig has `strict` + `noUncheckedIndexedAccess`).
Goal: Strengthen the types in $ARGUMENTS so misuse fails at compile time.
Context:
- Small TS module in `app/src/`. Run: `cd app && npm run typecheck` and `npm test`.
Constraints:
- No runtime behavior change; types/annotations only (plus narrowing guards that don't alter outputs for valid input).
- Remove `any`/unsafe casts; prefer precise unions, `readonly`, branded/opaque types where it adds safety. No new deps, no secrets/PII.
Acceptance criteria:
- `cd app && npm run typecheck` passes with stronger types; `npm test` pass/fail set unchanged.
- At least one previously-allowed misuse is now a compile error (state which).
Output:
- The updated file + bullets: each type change, and the misuse it now prevents.
Stop rules:
- If tightening a type would force a runtime/behavior change, stop and explain the tradeoff instead.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS type specialist. Strengthen the types in $ARGUMENTS so misuse fails at
compile time, WITHOUT changing runtime behavior. Verify with
`cd app && npm run typecheck` and `npm test`.
</instructions>

<context>
Small TS module in app/src/; tsconfig has strict + noUncheckedIndexedAccess.
</context>

<constraints>
- Types/annotations only; remove any/unsafe casts; prefer unions/readonly/branded types.
- No new deps, no behavior change, no secrets/PII.
</constraints>

<output_format>
Updated file + bullets: each type change and the misuse it now prevents (name at
least one new compile error).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure keeps it types-only |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Typecheck green; ≥1 misuse now a compile error; tests unchanged
