---
name: add-tests
description: Add edge-case Vitest tests for app/src/money.ts; covers negatives, bad input, remainder-cents bug, out-of-range discount.
version: 2
---

# Add Tests

## Baseline (weak) — what you started from

```
write tests for money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript engineer in a Vitest project. Target: `app/src/money.ts`; test file: `app/src/money.test.ts`.
Goal: Expand test suite with edge cases listed below. Keep all 4 existing smoke tests. Document the known `splitEvenly` remainder bug with a CI-green test (assert wrong sum; comment explains bug) — do NOT fix `money.ts`.
Context:
- `formatCents(cents)` — int cents → string, e.g. 42800 → "428.00"
- `parseAmount(input)` — "428.00"/"428"/"-1.50" → int cents; throws on garbage
- `splitEvenly(totalCents, n)` — BUG: drops remainder; splitEvenly(10, 3) → [3,3,3], sum=9 not 10
- `applyDiscount(cents, percent)` — rounds to nearest cent; no guard on percent range
Constraints:
- Edit only `app/src/money.test.ts`; do not touch `money.ts`; do not delete existing tests
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- `cd app && npm test` passes — all new and existing tests green
- formatCents: zero, negative (-150 → "-1.50"), single-digit frac (101 → "1.01")
- parseAmount: negative ("-1.50" → -150), single-frac ("1.5" → 150), whitespace trim, throws on empty/"abc"/"1.234"
- splitEvenly: `expect(splitEvenly(10,3).reduce((a,b)=>a+b,0)).toBe(9); // BUG: should be 10`; returns n shares
- applyDiscount: 0% unchanged, 100% → 0, rounding (10001 at 10% → 9001), >100% → negative (documents no guard)
Output:
- Updated `app/src/money.test.ts` only
- One-sentence summary: N new cases across which functions
Stop rules:
- Ambiguous behaviour → add comment in test, don't guess
- Do not modify `money.ts`, other files, or install deps
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript engineer. Add edge-case tests to `app/src/money.test.ts` for every public function in `app/src/money.ts`. Preserve all 4 existing smoke tests. Do NOT modify `money.ts`. Before finishing, run `cd app && npm test` — all tests must be green.
</instructions>

<context>
Gaps per function:

formatCents(cents):
  - zero: 0 → "0.00"
  - negative: -150 → "-1.50", -5 → "-0.05"
  - single-digit frac: 101 → "1.01"

parseAmount(input):
  - negative: "-1.50" → -150
  - single-digit frac: "1.5" → 150
  - whitespace trim: "  10.00  " → 1000
  - throws: empty string, "abc", "1.2.3", three-decimal "1.234"

splitEvenly(totalCents, n):
  - KNOWN BUG: remainder cents dropped. Document it with a CI-green test like:
    it("sum of shares equals total — BUG remainder dropped", () => {
      const shares = splitEvenly(10, 3);
      // BUG: should be 10; remainder 1 cent is silently dropped
      expect(shares.reduce((a, b) => a + b, 0)).toBe(9);
    });
  - Also: splitEvenly(9000, 3) sum still equals 9000; result has length n

applyDiscount(cents, percent):
  - 0%: amount unchanged
  - 100%: result is 0
  - rounding: 10001 cents at 10% → 9001
  - percent > 100: result goes negative — documents no guard exists
</context>

<constraints>
- Edit only app/src/money.test.ts; do not delete existing tests
- Do not modify money.ts or any other file
- No new npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- The edited app/src/money.test.ts (show only, do not re-output the whole file in a block — apply the edit directly)
- One sentence: N new cases added covering which functions
</output_format>

<stop_rules>
- Ambiguous behaviour → add comment in test noting assumption; do not guess expected value
- If tests fail and root cause is in money.ts → report the issue; do not fix money.ts
- Do not install deps or touch files outside money.test.ts
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
