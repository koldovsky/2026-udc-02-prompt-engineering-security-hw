---
name: add-jsdoc
description: Add accurate JSDoc to exported functions in money.ts — comments only, no logic changes. Use after tests are green.
version: 1
---

# Add JSDoc

Inline API documentation for `app/src/money.ts`. Complements
`prompts/app-functionality-description.md` (external `docs/*.md`) — here JSDoc
lives **in source** for IDE and agents. **Comments only** — no behavior changes.

## Baseline (weak) — what you started from

```
додай коментарі до money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer and senior TS engineer. You write JSDoc that matches actual behavior — not wishful API docs.
Goal: Add or improve JSDoc on all exported functions in `app/src/money.ts` and the module block — **without changing executable code**.
Context:
- Module: `app/src/money.ts` — integer-cent helpers: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Tests: `app/src/money.test.ts` — read for `@throws` patterns and examples; do not edit tests.
- Run `npm test` and `npm run typecheck` from `app/` **before** editing; re-run both **after**.
- JSDoc targets per function:
  - **Module block** — keep homework context; update any comment that contradicts current behavior (e.g. «planted bug» if code is already fixed).
  - **`formatCents`** — `@param cents`, `@returns` (string format), `@example` for whole, fractional, negative, zero.
  - **`parseAmount`** — `@param input` (accepted formats), `@returns` (cents), `@throws` (`Not a valid amount: …`), `@example`.
  - **`splitEvenly`** — `@param totalCents`, `@param n`, `@returns`; document remainder rule (first `total % n` shares get +1 cent); **remove stale NOTE** if it contradicts implementation.
  - **`applyDiscount`** — `@param cents`, `@param percent` (0–100), `@returns`, `@throws` (`percent must be between 0 and 100, got …`).
- Use standard JSDoc tags; do not duplicate TypeScript types already in signatures unless clarifying units (cents).
Constraints:
- Edit ONLY `app/src/money.ts` — **comments and blank lines around JSDoc only**; zero changes to statements, expressions, imports, or exports.
- Do NOT create or modify `docs/*.md` or any other file.
- No new dependencies. Exactly four exported functions; signatures unchanged.
- JSDoc must match implementation and tests — no documented behavior that code does not perform.
- No secrets/PII in `@example` — synthetic amounts only (e.g. 42800, `"428.00"`).
- Language: English in JSDoc (code convention); chat summary in Ukrainian or English per user.
Acceptance criteria:
- Every exported function has a JSDoc block with `@param`(s) and `@returns`.
- Functions that throw have `@throws` matching actual error messages/patterns.
- `splitEvenly` JSDoc does not claim a known correctness gap if remainder is implemented.
- `npm test` from `app/` — all tests green before and after (same count, 0 failures).
- `npm run typecheck` — exits 0 after edits.
- Diff is comments-only — no logic, no new exports, no signature changes.
Output:
- Updated `money.ts` (comments only) + table: function | JSDoc tags added/updated.
- Test count before/after (must match).
Stop rules (override «document the ideal API»):
- Correct JSDoc would require code changes → stop; cite function; point to `fix-prod-code.md`.
- `npm test` not green before starting → stop; fix tests/code first.
- Need to edit `money.test.ts` or other files → stop and ask.
- JSDoc already complete and accurate → stop; report «nothing to add» and do not churn comments.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer and senior TS engineer. Add accurate JSDoc to all exports
in app/src/money.ts — comments only, no executable code changes. Read money.test.ts
for throws/examples; do not edit tests. Run npm test and typecheck from app/ before
and after. No docs/*.md files.
</instructions>

<context>
Module: money.ts — formatCents, parseAmount, splitEvenly, applyDiscount. Integer cents.
Tests: money.test.ts — green required before/after. Tags: @param @returns @throws @example.
Fix stale splitEvenly NOTE if behavior distributes remainder.
</context>

<constraints>
- Only money.ts; comments-only diff. Four exports unchanged. No docs/*.md.
- JSDoc matches implementation and tests. Synthetic @example values only.
</constraints>

<output_format>
Updated money.ts + table: function → JSDoc tags added/updated. Test count before/after.
Stop: code change needed for accurate JSDoc; tests red before start; other files needed;
JSDoc already adequate.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | per-function JSDoc checklist + comments-only AC |
| XML | Claude Code / Claude | «no executable changes» holds on long reads |

## When to use

| Situation | Prompt |
|-----------|--------|
| Tests green; IDE/docs in code thin | **add-jsdoc** |
| Need external markdown API doc | **app-functionality-description** |
| Want helpers + constants | **refactor-money** (different scope) |

## Verified

- [x] Run with tests green; JSDoc added; comments-only diff; `npm test` + `typecheck` still green
