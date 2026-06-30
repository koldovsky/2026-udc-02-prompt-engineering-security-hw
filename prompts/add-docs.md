---
name: add-docs
description: Generate JSDoc and a README for a TS module. Use after tests pass.
version: 2
---

# Add docs

Point it at `app/src/money.ts` and it should produce complete JSDoc for every
export plus a short `app/README.md` with usage examples and edge-case notes.

## Baseline (weak)

```text
documented money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS tech writer in this repo (Node 22, vitest). You value clarity and brevity.
Goal: Add complete documentation for $ARGUMENTS so a new team member can use the module without reading the source.
Context: Integer-cent money helpers. Tests in src/*.test.ts. The module uses integer cents to avoid floating-point drift.
Constraints:
- Add JSDoc with @param, @returns, @throws, and @example to every exported function.
- Each @example must be a valid TS expression that could be pasted into a REPL.
- Create or update app/README.md with: one-paragraph purpose, install/usage snippet, function reference table (name | signature | description), edge-case warnings section.
- Do NOT change any runtime logic or test files.
- No secrets/PII in the output.
Acceptance criteria:
- Every exported function has a JSDoc block with at least one @example.
- app/README.md exists and lists all exports with signatures.
- `npm run typecheck` still passes.
Output:
- The updated source file and the new/updated README.
- A short summary listing each function documented.
Stop rules:
- If the file has no exported functions, stop and say so.
- If runtime logic needs changing, stop and flag it — do not fix it in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS tech writer. Add complete documentation for the target
module so a new team member can use it without reading the source.
Do not change runtime logic or tests. Run typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
Amounts are integer cents to avoid floating-point drift.
</context>

<constraints>
- JSDoc every export: @param, @returns, @throws, @example (at least one valid TS example each).
- Create/update app/README.md: one-paragraph purpose, install/usage, function reference table, edge-case warnings.
- No runtime or test changes. If a bug is found, flag it — do not fix.
- No secrets/PII in output.
</constraints>

<output_format>
Updated source file + README. Short summary listing each function documented.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, acceptance criteria enforce completeness |
| XML | Claude Code | structure keeps scope tight (no runtime edits) |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] Every export has JSDoc with @example; README exists with reference table
