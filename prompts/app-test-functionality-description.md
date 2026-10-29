---
name: app-test-functionality-description
description: Generate docs/app-test-functionality.md — inventory of vitest cases in money.test.ts. Use for test coverage docs or onboarding.
version: 1
---

# App test functionality description

Produces `docs/app-test-functionality.md` — a detailed reference of **existing**
test cases in `app/src/money.test.ts`: `describe`/`it` structure, inputs,
expected outcomes, assertion types, and matchers — derived **only** from that
source file.

## Baseline (weak) — what you started from

```
опиши тести в money.test.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer and senior TS test engineer. You document tests exactly as written — no invented cases or assertions.
Goal: Create or update `docs/app-test-functionality.md` with a complete inventory of all test cases in `app/src/money.test.ts`.
Context:
- Single source file: `app/src/money.test.ts` — **the only file you may read** for content of the documentation.
- Test runner: vitest (`describe`, `it`, `expect`); imports from `./money.js`.
- Functions under test (names visible in test file only): `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Derive structure, inputs, expected values, and matchers from: `describe` blocks, `it` titles, `expect(...)` calls, and inline comments in `money.test.ts`.
Constraints:
- Create or overwrite ONLY `docs/app-test-functionality.md`. Do NOT change `money.test.ts` or any other file.
- Read ONLY `app/src/money.test.ts` — do NOT open `money.ts`, `README.md`, or other repo files to infer production behavior beyond what the test file shows.
- Document **only existing** `describe` / `it` blocks — no suggested tests, no gaps analysis from other files.
- If a test bundles multiple `expect` calls in one `it`, document each assertion separately.
- Never read `.env` or secret files. No secrets/PII in examples — use values literally from the test file.
- Language: Ukrainian or English (match user request; default Ukrainian if unclear).
Acceptance criteria:
- `docs/app-test-functionality.md` exists and includes at minimum:
  1. **Overview** — source file path, test framework (vitest), imported symbols, total count of `describe` blocks and `it` cases.
  2. **Suite summary** — table: `describe` block | function under test | number of `it` cases | short theme.
  3. **Per-`describe` sections** (`### formatCents`, etc.) with intro line from block purpose (from `it` titles / comments in source).
  4. **Per-`it` subsections** each containing:
     - **Title** — exact `it("...")` string
     - **Target** — which function is invoked (from test body)
     - **Inputs** — argument values and inferred TypeScript types (`number`, `string`, etc.)
     - **Assertion** — matcher used (`toBe`, `toEqual`, `toThrow`, …) and expected value or regex
     - **Setup** — local variables if any (e.g. `const shares = ...`), or "none"
  5. **Assertion reference** — list of vitest matchers used in this file and what they check (derived from occurrences only).
  6. **Comments in source** — verbatim or paraphrased block comments from `money.test.ts` if present.
  7. **Generated** — note that doc was produced from `prompts/app-test-functionality-description.md`; sole source: `app/src/money.test.ts`.
- Every `it(...)` in `money.test.ts` has a documented entry; no omissions.
- Titles, inputs, and expected values match the test file literally.
Output:
- Path: `docs/app-test-functionality.md`
- Short chat summary: count of `it` cases documented; confirm only `app/src/money.test.ts` was used as source.
Stop rules:
- `app/src/money.test.ts` missing or contains no `it` blocks → stop; do not invent tests.
- Need to read any file other than `app/src/money.test.ts` to complete the doc → stop and ask (except writing `docs/app-test-functionality.md`).
- Need to edit files other than `docs/app-test-functionality.md` → stop and ask.
- `docs/app-test-functionality.md` already exists → overwrite (full regenerate) unless user asked to patch only.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer. Create docs/app-test-functionality.md — full inventory
of vitest cases in app/src/money.test.ts. Read ONLY money.test.ts for content.
Document every describe and it: inputs, matchers, expected values.
Overwrite only docs/app-test-functionality.md. Do not open money.ts or README.
</instructions>

<context>
Sole source: app/src/money.test.ts. Vitest describe/it/expect.
Functions invoked: formatCents, parseAmount, splitEvenly, applyDiscount (from imports/calls in test file).
</context>

<constraints>
- Output: docs/app-test-functionality.md only. Ukrainian or English per user.
- Input for documentation: app/src/money.test.ts ONLY.
- Sections: Overview, Suite summary table, per-describe and per-it detail
  (title, target, inputs, assertion, setup), Assertion reference, Source comments, Generated note.
- No invented tests. No code changes.
</constraints>

<output_format>
Full docs/app-test-functionality.md + chat summary: it count; only money.test.ts read.
Stop if test file missing; if other source files needed; if other output files need edits.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | per-it checklist + literal-values AC |
| XML | Claude Code / Claude | "ONLY money.test.ts" holds across long runs |

## Verified

- [x] Run against `app/src/money.test.ts`; `docs/app-test-functionality.md` lists every `it`
- [x] Agent used only `app/src/money.test.ts` as documentation source; no test code changes
