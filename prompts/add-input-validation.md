---
name: add-input-validation
description: Add boundary guards to all four functions in app/src/money.ts (NaN, Infinity, n<=0, percent range) without changing happy-path behaviour.
version: 1
---

# Add Input Validation

## Baseline (weak) — what you started from

```
add validation to money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript engineer hardening a financial utility module. Target: `app/src/money.ts`.
Goal: Add early-return / throw guards for invalid inputs to all four exported functions. Happy-path behaviour must not change.
Context:
- `formatCents(cents)` — no guard: NaN → "NaN.aN", Infinity → "Infinity.00", non-integer silently floors
- `parseAmount(input)` — regex catches most garbage, but no max-length guard (DoS vector for huge strings)
- `splitEvenly(totalCents, n)` — n=0 → division by zero (Infinity); n<0 → negative-length array
- `applyDiscount(cents, percent)` — percent<0 increases price; percent>100 returns negative; NaN propagates silently
Constraints:
- Edit only `app/src/money.ts`; also add tests for the new guards in `app/src/money.test.ts`
- Do not change existing function signatures or happy-path logic
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- `cd app && npm test` passes, all existing tests still green
- formatCents(NaN) throws `Error("cents must be a finite integer")`
- splitEvenly(100, 0) throws `Error("n must be a positive integer")`
- applyDiscount(100, -1) throws `Error("percent must be between 0 and 100")`
- parseAmount input truncated / rejected if length > 30 characters
Output:
- Updated `app/src/money.ts` and `app/src/money.test.ts`
- One-sentence summary of guards added
Stop rules:
- Do not change regex in parseAmount beyond length guard
- Do not fix the splitEvenly remainder bug in this PR (separate concern)
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript engineer. Add input-validation guards to all four exported functions in `app/src/money.ts`. Also add tests for each new guard in `app/src/money.test.ts`. Run `cd app && npm test` — all tests must pass.
</instructions>

<context>
Guards to add per function:

formatCents(cents: number):
  if (!Number.isFinite(cents) || !Number.isInteger(cents))
    throw new Error("cents must be a finite integer");

parseAmount(input: string):
  after trimmed = input.trim():
  if (trimmed.length > 30)
    throw new Error(`Not a valid amount: ${input}`);
  (existing regex check follows unchanged)

splitEvenly(totalCents: number, n: number):
  if (!Number.isInteger(n) || n <= 0)
    throw new Error("n must be a positive integer");

applyDiscount(cents: number, percent: number):
  if (percent < 0 || percent > 100)
    throw new Error("percent must be between 0 and 100");

Tests to add in app/src/money.test.ts (new describe blocks or extra its):
  formatCents(NaN) → throws "cents must be a finite integer"
  formatCents(Infinity) → throws "cents must be a finite integer"
  splitEvenly(100, 0) → throws "n must be a positive integer"
  splitEvenly(100, -1) → throws "n must be a positive integer"
  applyDiscount(100, -1) → throws "percent must be between 0 and 100"
  applyDiscount(100, 101) → throws "percent must be between 0 and 100"
  parseAmount("1".repeat(31)) → throws "Not a valid amount"
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts
- Do not change existing function signatures or happy-path logic
- Do not fix the splitEvenly remainder bug (separate prompt: refactor-function.md)
- No new npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- Updated app/src/money.ts and app/src/money.test.ts
- `npm test` output showing all tests green
</output_format>

<stop_rules>
- If a guard breaks an existing test, report the conflict rather than silently changing the test
- Do not add guards that change what valid inputs return
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
