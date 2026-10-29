---
name: app-functionality-description
description: Generate docs/app-functionality.md — API reference for exported functions in app/src/money.ts. Use for onboarding or docs prompts.
version: 1
---

# App functionality description

Produces `docs/app-functionality.md` — a detailed reference of **existing**
exported functions in `app/src/money.ts`: signatures, types, inputs, outputs,
errors, and behavior derived **only** from that source file.

## Baseline (weak) — what you started from

```
опиши що робить money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer and senior TS engineer. You document the public API exactly as implemented — no invented methods or parameters.
Goal: Create or update `docs/app-functionality.md` with a complete reference of all exported functions in `app/src/money.ts`.
Context:
- Single source file: `app/src/money.ts` — **the only file you may read** for content of the documentation.
- Module: integer-cent money helpers (`formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`).
- Derive purpose, types, behavior, errors, and examples from: exported signatures, JSDoc comments, and implementation logic in `money.ts`.
- Convention (from source comments): all monetary amounts are **integer cents** unless noted otherwise.
- Prompt metadata (not a rule from `money.ts`): if you mention how other files import the module, use `import { … } from "./money.js"` (ESM, `.js` extension). Do not treat that path as documented behavior in the source.
Constraints:
- Create or overwrite ONLY `docs/app-functionality.md`. Do NOT change `money.ts` or any other file.
- Read ONLY `app/src/money.ts` — do NOT open `money.test.ts`, `README.md`, or other repo files for behavior or examples.
- Document **only exported functions** that exist in `money.ts` — no planned API, no private helpers.
- If behavior is not stated in JSDoc and is unclear from implementation, write "not specified" or describe what the code literally does and label as "implementation detail".
- Never read `.env` or secret files. No secrets/PII in examples — use synthetic amounts (e.g. 42800 cents = 428.00).
- Language: Ukrainian or English (match user request; default Ukrainian if unclear).
Acceptance criteria:
- `docs/app-functionality.md` exists and includes at minimum:
  1. **Overview** — module purpose, cents convention, source file path, list of exported function names (from `money.ts` only).
  2. **Module API summary** — table: function | parameters (types) | return type | throws?
  3. **Per-function sections** (`### formatCents`, etc.) each containing:
     - **Signature** — TypeScript signature in a fenced code block (copied from `money.ts`)
     - **Parameters** — name, type, meaning, valid range / format if inferable from source
     - **Returns** — type, meaning, format if string
     - **Throws** — when and error message pattern (from `throw` statements / JSDoc), or "does not throw"
     - **Behavior** — bullet rules inferred from implementation and JSDoc (edge cases visible in code)
     - **Examples** — 2–3 short input → output examples derivable from JSDoc or straightforward reading of the implementation
  4. **Error messages** — consolidated list of thrown errors and triggering conditions (from `money.ts` only).
  5. **Types & conventions** — `number` as cents, string amount format for `parseAmount`, array length for `splitEvenly` — as implied by source.
  6. **Generated** — note that doc was produced from `prompts/app-functionality-description.md`; sole source: `app/src/money.ts`.
- Every exported function in `money.ts` has its own section; no omissions.
- Signatures and types match `money.ts` exactly.
Output:
- Path: `docs/app-functionality.md`
- Short chat summary: functions documented; confirm only `app/src/money.ts` was used as source.
Stop rules:
- `app/src/money.ts` missing or has no exports → stop; do not invent API.
- Need to read any file other than `app/src/money.ts` to complete the doc → stop and ask (except writing `docs/app-functionality.md`).
- Need to edit files other than `docs/app-functionality.md` → stop and ask.
- `docs/app-functionality.md` already exists → overwrite (this prompt is a full regenerate) unless user asked to patch only.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer. Create docs/app-functionality.md — API reference for
all exported functions in app/src/money.ts. Read ONLY app/src/money.ts for content.
Derive signatures, behavior, throws, and examples from that file (JSDoc + code).
Overwrite only docs/app-functionality.md. Do not open tests or README.
</instructions>

<context>
Sole source for behavior: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Integer cents per module comments.
Prompt metadata (not from money.ts): ESM import from ./money.js.
</context>

<constraints>
- Output: docs/app-functionality.md only. Ukrainian or English per user.
- Input for documentation: app/src/money.ts ONLY.
- Sections: Overview, Module API summary table, per-function detail
  (signature, parameters, returns, throws, behavior, examples), Error messages,
  Types & conventions, Generated note (cite sole source).
- No invented exports. No code changes. Synthetic examples only.
</constraints>

<output_format>
Full docs/app-functionality.md + chat summary: functions documented; only money.ts read.
Stop if money.ts missing; if other source files needed; if other output files need edits.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | explicit single-source rule + per-function AC |
| XML | Claude Code / Claude | "ONLY money.ts" holds across long runs |

## Verified

- [x] Run against `app/src/money.ts`; `docs/app-functionality.md` lists all exports
- [x] Agent used only `app/src/money.ts` as documentation source; no application code changes
