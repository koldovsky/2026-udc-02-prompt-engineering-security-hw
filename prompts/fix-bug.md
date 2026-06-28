---
name: fix-bug
description: Fix the splitEvenly remainder-cent bug in app/src/money.ts so shares always sum to totalCents.
version: 1
---

# Fix Bug: splitEvenly Remainder Cents

## Baseline (weak) — what you started from

```text
fix splitEvenly in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer fixing a correctness bug in `app/src/money.ts`.

Goal: Fix `splitEvenly` so that shares always sum to `totalCents`. Distribute remainder cents one per share starting from index 0.

Context:
- `app/src/money.ts`, function `splitEvenly(totalCents: number, n: number): number[]`.
- Bug: `Math.floor(totalCents / n)` fills all shares equally; `totalCents % n` remainder cents are silently dropped.
- Example: `splitEvenly(100, 3)` currently returns `[33, 33, 33]` (sum = 99); correct result is `[34, 33, 33]` (sum = 100).
- Fix strategy: compute `remainder = ((totalCents % n) + n) % n` (mathematical modulo — always non-negative, handles negative `totalCents` correctly); add 1 to the first `remainder` shares.
- The existing bug-characterization test in `app/src/money.test.ts` asserts the wrong output — it must be updated to the correct one.

Constraints:
- Modify only files inside `app/src/`.
- Do not change the function signature of `splitEvenly`.
- Do not modify any function other than `splitEvenly`.
- No new npm dependencies.
- No secrets or PII.

Acceptance criteria:
- `splitEvenly(100, 3)` returns `[34, 33, 33]`.
- `splitEvenly(99, 3)` returns `[33, 33, 33]` (no remainder, unchanged).
- `splitEvenly(0, 3)` returns `[0, 0, 0]`.
- `splitEvenly(1, 1)` returns `[1]`.
- All shares always sum to `totalCents`: `shares.reduce((a, b) => a + b, 0) === totalCents`.
- `splitEvenly(-100, 3)` returns `[-33, -33, -34]` (sum = -100; JS `%` on negative numbers requires mathematical modulo).
- `cd app && npx vitest run` exits 0.
- Update the bug-characterization test to assert `[34, 33, 33]` and remove the bug comment.

Output:
- Updated `app/src/money.ts` (splitEvenly only).
- Updated `app/src/money.test.ts` (bug test only).

Stop rules:
- Do not fix or change any other function.
- If the fix requires changing the function signature, stop and ask.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Fix splitEvenly in app/src/money.ts so
shares always sum to totalCents. Strategy: remainder = ((totalCents % n) + n) % n
(mathematical modulo — always non-negative, handles negative totalCents correctly);
add 1 cent to the first `remainder` shares. Also update the bug-characterization
test in app/src/money.test.ts to assert the correct output. Before finishing,
verify: (1) splitEvenly(100,3) === [34,33,33], (2) splitEvenly(99,3) === [33,33,33],
(3) splitEvenly(-100,3) === [-33,-33,-34], (4) npx vitest run exits 0.
</instructions>

<context>
File: app/src/money.ts — splitEvenly(totalCents, n)
Current bug: const base = Math.floor(totalCents / n); new Array(n).fill(base)
             drops totalCents % n remainder cents.
Fix: const remainder = ((totalCents % n) + n) % n; for (let i = 0; i &lt; remainder; i++) shares[i]++
File: app/src/money.test.ts — add tests asserting [34,33,33] (positive remainder) and [-33,-33,-34] (negative total).
</context>

<constraints>
- Modify only app/src/money.ts (splitEvenly only) and app/src/money.test.ts (bug test only).
- Do not change the function signature.
- No new npm packages.
- No secrets or PII.
</constraints>

<output_format>
1. Updated splitEvenly implementation.
2. Updated bug-characterization test assertion.
3. Confirmation: npx vitest run result.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] splitEvenly(100, 3) → [34, 33, 33]
- [x] splitEvenly(99, 3) → [33, 33, 33]
- [x] splitEvenly(-100, 3) → [-33, -33, -34]
- [x] shares.reduce((a,b)=>a+b,0) === totalCents for all cases
- [x] Ran `cd app && npx vitest run` — all tests passed
