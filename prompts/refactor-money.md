---
name: refactor-money
description: Safe structure-only refactor of money.ts — same behavior and API, tests stay green. Use after fix-prod-code.
version: 1
---

# Refactor money module

Safe refactoring of `app/src/money.ts` after behavior is correct and tests pass.
Complements `prompts/fix-prod-code.md` (logic fixes) — here only **structure,
readability, and stale comments**; observable behavior must not change.

## Baseline (weak) — what you started from

```
перепиши money.ts красивіше
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You refactor safely — tests are the contract.
Goal: Improve structure and readability of `app/src/money.ts` **without** changing public API or runtime behavior.
Context:
- Module: `app/src/money.ts` — integer-cent helpers: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Tests: `app/src/money.test.ts` — full suite (30 cases at last run); all must pass before and after refactor.
- Run `npm test` and `npm run typecheck` from `app/` **before** editing; re-run both **after**.
- Suggested refactor targets (pick 1–3 that add clarity; do not do all if unnecessary):
  - Remove or update **stale JSDoc** on `splitEvenly` (outdated «correctness gap» note if behavior is fixed).
  - Extract **private** helper `assertValidPercent(percent)` used by `applyDiscount` (same file, not exported).
  - Extract `parseAmount` regex to a module-level constant (e.g. `AMOUNT_PATTERN`).
  - Add a one-line comment on `splitEvenly` remainder algorithm (no logic change).
- Chain: typical order — `add-tests` → `fix-prod-code` → **refactor-money**.
Constraints:
- Edit ONLY `app/src/money.ts`. Do NOT change `money.test.ts`, `package.json`, or other files.
- No new dependencies. No new **exported** symbols — private helpers in the same file are allowed.
- **Behavior-preserving only** — no bug fixes, no new validation, no changed formulas; if you find a bug, stop and point to `fix-prod-code.md`.
- Keep exactly four exported functions with identical signatures and return types.
- Minimal diff — refactor what you touch; no drive-by renames across the whole file.
- No secrets/PII in code or comments.
Acceptance criteria:
- `npm test` from `app/` — **all tests green** before edits and after (same count, 0 failures).
- `npm run typecheck` — exits 0 after edits.
- Public API unchanged: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount` — same exports, params, return types.
- Each change is **structure-only** (extract helper, constant, comment, JSDoc) — not behavior.
Output:
- Updated `money.ts` + bullet list per change: what moved/renamed/documented → «structure only, behavior unchanged».
- Note test count before/after (must match).
Stop rules (override «while I'm here»):
- Any test fails after refactor → stop; report failing test name; do not weaken tests or sneak in behavior fixes.
- `npm test` not green before starting → stop; use `fix-prod-code.md` first.
- Refactor requires new exports, API signature changes, or editing tests → stop and ask.
- «Cleaner» would require behavior change → skip that refactor; document why.
- No meaningful structure win without edits → stop; report «nothing to refactor» and do not churn the file.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer (Node 22, vitest). Refactor app/src/money.ts for
readability only — same behavior and public API. Run npm test and npm run typecheck
from app/ before and after. Edit only money.ts. No new exports; private helpers OK.
If tests fail after refactor, stop. If bugs found, point to fix-prod-code.md.
</instructions>

<context>
Module: money.ts — formatCents, parseAmount, splitEvenly, applyDiscount. Integer cents.
Tests: money.test.ts — all green required before/after. After fix-prod-code in chain.
Targets: stale JSDoc, assertValidPercent helper, AMOUNT_PATTERN constant, splitEvenly comment.
</context>

<constraints>
- Only money.ts. No deps. Four exports unchanged. Structure-only diff.
- npm test + typecheck green before and after. No test file edits.
- No secrets/PII.
</constraints>

<output_format>
Updated money.ts + bullets: change → structure only.
Test count before/after. Stop: tests red after refactor; not green before start;
API/export/test changes needed; behavior change required for "cleanliness".
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | explicit refactor targets + before/after test AC |
| XML | Claude Code / Claude | «behavior unchanged» + stop rules hold on long runs |

## When to use

| Situation | Prompt |
|-----------|--------|
| Tests green after `fix-prod-code.md` | **refactor-money** — clean up structure |
| Tests still red | **fix-prod-code** first, not refactor |
| Found a logic bug while refactoring | Stop → **fix-prod-code** |

## Verified

- [x] Run with all tests green; refactor applied; `npm test` + `typecheck` still green (27/27 at the time of the run); API unchanged; `money.ts` reverted after verification
