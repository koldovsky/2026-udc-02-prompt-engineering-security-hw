---
name: write-docs
description: Add TSDoc block comments to every exported function in a TypeScript file — params, returns, throws, and examples. Use with any module; money.ts is the worked example.
version: 1
---

# Write TSDoc

**Usage:** `/write-docs <file>` — e.g. `/write-docs app/src/money.ts`

A generalizable TSDoc approach. The `app/src/money.ts` module is used as the worked example throughout.

## Baseline (weak) — what you started from

```text
add comments to money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer documenting a public-facing utility module in the `app/` project (Node, ESM, strict TS).
Goal: Add TSDoc block comments to every exported function in `$ARGUMENTS`. Comments must be accurate, concise, and include `@param`, `@returns`, `@throws` (where applicable), and one `@example` per function.
Context:
- Target: `$ARGUMENTS`. Read the file first to discover all exports before writing any doc.
- Document behavior as-is — if a function has a known limitation, capture it in `@returns` or `@throws`; do not fix it.
- Worked example — app/src/money.ts exports (all amounts are integer cents):
    - formatCents(cents: number): string — 42800 → "428.00"
    - parseAmount(input: string): number — @throws {Error} on invalid input
    - splitEvenly — known remainder-cent limitation documented in @returns
    - applyDiscount — unvalidated percent range documented in @param
Constraints:
- Scope: modify only `$ARGUMENTS`; do not touch any other file.
- Documentation only — no logic changes, no bug fixes.
- Preserve all existing inline comments unchanged.
- No real names, secrets, or PII in examples.
- `cd app && npx tsc --noEmit` must exit 0.
Acceptance criteria:
- Every exported function has a TSDoc block (`/** ... */`) immediately above its signature.
- Each block includes `@param` for every parameter, `@returns`, and `@example` with a concrete input → output pair.
- Functions that throw include `@throws {Error}` with the condition.
- `cd app && npx tsc --noEmit` exits 0.
Output:
- Full updated contents of `$ARGUMENTS`.
Stop rules:
- Do not fix any bugs — document behavior as-is, including known limitations.
- If a function's behavior is ambiguous, document what the code does, not what it should do.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Read $ARGUMENTS and add TSDoc block
comments to every exported function. Document behavior as-is — do not fix bugs,
do not change logic. Before finishing, verify: (1) every export has a TSDoc
block with @param, @returns, and @example, (2) throwing functions have @throws,
(3) npx tsc --noEmit exits 0.
</instructions>

<context>
Target: $ARGUMENTS (Node, ESM, strict TS).
Read the file first to discover all exports before writing any doc.

Worked example — app/src/money.ts:
  - formatCents(cents: number): string — 42800 → "428.00"
  - parseAmount(input: string): number — @throws {Error} on invalid input
  - splitEvenly(totalCents, n) — @returns documents remainder-cent limitation
  - applyDiscount(cents, percent) — @param percent documents expected 0–100 range
</context>

<constraints>
- Scope: modify only $ARGUMENTS; do not touch any other file.
- Documentation only — no logic changes, no bug fixes.
- Preserve existing inline comments.
- Each TSDoc block: @param per parameter, @returns, @example, @throws where applicable.
- No real names, secrets, or PII in examples.
</constraints>

<output_format>
Full updated contents of $ARGUMENTS.
</output_format>

<stop_rules>
- Do not fix any bugs — document behavior as-is.
- If behavior is ambiguous, document what the code does, not what it should do.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Run against `app/src/money.ts` (worked example)
- [x] Agent stayed in scope — only `app/src/money.ts` modified
- [x] Every export has TSDoc with @param, @returns, @example
- [x] `cd app && npx tsc --noEmit` exits 0
