---
name: fix-bug
description: Fix the splitEvenly remainder bug in app/src/money.ts with minimal code change and full test coverage.
version: 1
---

# Fix Bug

## Baseline (weak) — what you started from

```
fix the bug in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript engineer in a Vitest project. Target: `app/src/money.ts`, function `splitEvenly`.
Goal: Fix `splitEvenly` so sum of output always equals `totalCents`. Minimal change — one `Array.from` with conditional increment.
Context:
- Bug: `splitEvenly(10, 3)` → [3,3,3], sum=9; remainder 1 cent silently dropped
- Fix: `Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0))`
- Must also update the bug-doc test in `app/src/money.test.ts`: change `.toBe(9)` to `.toBe(10)` and remove "BUG" from test name
Constraints:
- Edit only `app/src/money.ts` (fix) and `app/src/money.test.ts` (update bug-doc test)
- Public signature `splitEvenly(totalCents: number, n: number): number[]` must not change
- No new npm dependencies; no new imports
- No secrets or PII in output
Acceptance criteria:
- `cd app && npm test` passes, all 19 tests green
- `splitEvenly(10, 3)` → [4,3,3]
- `splitEvenly(9001, 3)` → [3001,3000,3000] (sum=9001)
- `splitEvenly(9000, 3)` → [3000,3000,3000] (no-remainder case unchanged)
Output:
- Both updated files
- One-sentence summary
Stop rules:
- Do not change other functions
- Do not add new imports or deps
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript engineer. Apply a minimal fix to `splitEvenly` in `app/src/money.ts` to stop dropping remainder cents. Update the bug-doc test in `app/src/money.test.ts` accordingly. Run `cd app && npm test` — all 19 tests must be green.
</instructions>

<context>
Fix to apply in app/src/money.ts (function splitEvenly, ~line 35):

Replace:
  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);
  return shares;

With:
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));

Test update in app/src/money.test.ts:
  - Find: it("sum of shares equals total — BUG remainder dropped", ...
  - Change test name to: "sum of shares equals total when there is a remainder"
  - Change: expect(...).toBe(9)  →  expect(...).toBe(10)
  - Remove the BUG comment line
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts
- Do not change function signatures or other functions
- No new imports or npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- Minimal diffs for both files
- `npm test` output showing 19 passed
</output_format>

<stop_rules>
- If tests fail after fix, report the failure without applying a second guess
- Do not touch formatCents, parseAmount, or applyDiscount
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
