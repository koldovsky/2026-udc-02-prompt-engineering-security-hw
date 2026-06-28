---
name: write-readme
description: Write app/src/README.md documenting the money.ts module — what it does, how to use each function, known limitations, and gotchas.
version: 1
---

# Write README for money.ts Module

## Baseline (weak) — what you started from

```text
write a readme for money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer writing internal documentation for the `app/src/money.ts` utility module.

Goal: Produce `app/src/README.md` that explains what the module does, documents each exported function with signature, description, examples, and known limitations, and warns about gotchas (integer-cents contract, remainder bug, unvalidated percent).

Context:
- `app/src/money.ts` exports four functions (all amounts are integer cents):
  - `formatCents(cents: number): string` — 42800 → "428.00".
  - `parseAmount(input: string): number` — "428.00" → 42800; throws on invalid input.
  - `splitEvenly(totalCents: number, n: number): number[]` — known bug: drops remainder cents.
  - `applyDiscount(cents: number, percent: number): number` — no validation on percent.
- Audience: other engineers in this repo who want to use or extend the module.
- The README should document behavior as-is — not the intended future behavior.

Constraints:
- Create only `app/src/README.md`; do not modify any other file.
- Use concrete code examples (TypeScript) for each function.
- Document the remainder bug in `splitEvenly` clearly — do not hide it.
- Document the missing validation in `applyDiscount`.
- No real names, secrets, or PII in examples.

Acceptance criteria:
- README has sections: Overview, Installation/Import, API (one subsection per function), Known Limitations, Gotchas.
- Each API section includes: signature, description, example input → output, edge cases.
- Known Limitations section explicitly lists: remainder-cent drop in splitEvenly, no percent validation in applyDiscount.
- All code examples are valid TypeScript that would compile.

Output:
- Full contents of `app/src/README.md`.

Stop rules:
- Do not modify `money.ts` or any test file.
- Do not document planned future behavior — only current behavior.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Write app/src/README.md documenting the
money.ts module for other engineers. Cover all four exports with signatures,
examples, and edge cases. Prominently document the splitEvenly remainder bug
and the missing applyDiscount validation — do not hide known issues.
Before finishing, verify all code examples are valid TypeScript.
</instructions>

<context>
File: app/src/money.ts
Exports (all amounts are integer cents — never floats):
  - formatCents(cents: number): string — 42800 → "428.00", 0 → "0.00", -500 → "-5.00"
  - parseAmount(input: string): number — "428.00" → 42800; throws on garbage
  - splitEvenly(totalCents: number, n: number): number[]
      KNOWN BUG: drops remainder cents. splitEvenly(100,3) → [33,33,33] not [34,33,33]
  - applyDiscount(cents: number, percent: number): number
      NO VALIDATION: percent outside 0–100 produces out-of-range results
Audience: engineers in this repo.
</context>

<constraints>
- Create only app/src/README.md; do not modify any other file.
- Document current behavior, not intended behavior.
- All code examples must be valid TypeScript.
- No secrets, real names, or PII in examples.
</constraints>

<output_format>
Full contents of app/src/README.md with sections:
Overview | Installation/Import | API | Known Limitations | Gotchas
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] app/src/README.md created
- [x] README includes all required sections: Overview, Installation/Import, API, Known Limitations, Gotchas
- [x] All four functions documented with examples
- [x] Known Limitations section lists remainder bug and missing validation
- [x] No modifications to money.ts or money.test.ts
