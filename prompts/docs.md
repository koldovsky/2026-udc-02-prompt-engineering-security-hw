---
name: write-docs
description: Write or improve JSDoc/TSDoc comments for a TS module. Covers every exported symbol, documents parameters, return values, throws, and known edge cases. Use when a module is undocumented or its comments are stale.
version: 1
---

# Write docs

Point this at any module in `app/src/` — it will audit existing comments and
write the missing ones. Aim it at `money.ts` and it should produce full JSDoc
for every exported function, including the known correctness gap in
`splitEvenly` and the missing range constraint on `applyDiscount`.

## Baseline (weak) — what you started from

```
add docs to money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS technical writer in this repo (Node 22, TypeScript strict mode). You write precise, developer-facing JSDoc.
Goal: Add or improve TSDoc comments for every exported symbol in $ARGUMENTS. Describe what each function does, its parameters, return value, thrown errors, and any known edge cases or limitations.
Context: `app/src/money.ts` (implementation). Amounts are integer cents; the module is intentionally small and has at least one known correctness gap.
Constraints:
- Files to change: `$ARGUMENTS` only; do NOT change logic, tests, or add new deps.
- Keep the public API identical — no signature changes.
- Document known limitations honestly (e.g. "remainder cents are silently dropped"); do NOT fix the bugs.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` still passes (no accidental logic edits).
- Every `export function` has a JSDoc block with `@param`, `@returns`, and `@throws` (where applicable).
- Any known correctness gap or unvalidated input is noted with `@remarks`.
Output:
- Full content of the changed file, then a one-line summary per function: name | what was added.
Stop rules:
- If a function's behaviour is ambiguous (e.g. what should happen with n=0 in splitEvenly), stop and ask before documenting it.
- If the file has no exported functions, stop and report.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS technical writer (Node 22, strict mode). Add or improve
TSDoc comments for every exported symbol in the target module. Document
parameters, return values, thrown errors, and known limitations honestly —
do NOT fix bugs, just describe them in `@remarks`. Verify no logic changed by
confirming `cd app && npm test` still passes.
</instructions>

<context>
Target: $ARGUMENTS
Stack: TypeScript, integer-cent amounts, Node 22.
Known gaps: `splitEvenly` drops remainder cents; `applyDiscount` does not validate the `percent` range.
</context>

<constraints>
- Touch only the target file; do not change logic, tests, or add new deps.
- Public API must remain identical (no signature changes).
- No secrets/PII in output.
- Stop and ask if a function's intended behaviour for edge inputs is unclear.
</constraints>

<output_format>
Full content of the changed file, then a one-line summary per function:
name | what was added (params / returns / throws / remarks).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; `$ARGUMENTS` slots in cleanly for inline use |
| XML | Claude Code / Claude | block structure keeps the "document gaps, don't fix" rule visible across a long context window |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] All exported functions have JSDoc with `@param`, `@returns`, and `@remarks` for known gaps
