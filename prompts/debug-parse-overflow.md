---
name: debug-parse-overflow
description: Root-cause a numeric-precision bug report against parseAmount, reproduce it with a failing test, then fix with a guard. Use for "the numbers are slightly off" style reports.
version: 1
---

# Debug: parseAmount precision loss

"Debug" cookbook entry #1 — starts from a bug-report-shaped prompt, not a
direct instruction to change code.

## Baseline (weak)

```
чомусь суми не збігаються, глянь parseAmount
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer triaging a reported bug, in this repo (Node 22, vitest).
Goal: Investigate the report "amounts don't match after round-tripping through
parseAmount for very large numbers" against app/src/money.ts. Root-cause it,
write a failing test that reproduces it, then fix.
Context: parseAmount converts a decimal string to integer cents via
`Number(whole) * 100 + Number(frac)`. JS numbers lose integer precision past
Number.MAX_SAFE_INTEGER (2^53 - 1).
Constraints:
- Scope: app/src/money.ts + app/src/money.test.ts only.
- Write the reproducing test FIRST (it should fail on the current code before
  your fix), then make the minimal fix.
- Prefer "throw with a clear error" over "silently return an imprecise value"
  for out-of-range input — don't try to support arbitrary precision (no bignum
  dependency).
Acceptance criteria:
- A test exists that would have failed before the fix and passes after.
- `cd app && npm test` passes; no new dependency added.
Output:
- Root cause (1-2 sentences), the diff, and which test proves the fix.
Stop rules:
- Don't add BigInt/arbitrary-precision support — that's a scope expansion
  beyond "don't silently corrupt data", not what was reported.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Triage the report: "amounts don't match after round-tripping through
parseAmount for very large numbers." Root-cause against app/src/money.ts,
write a failing test that reproduces it, then apply the minimal fix.
</instructions>

<context>
parseAmount computes `Number(whole) * 100 + Number(frac)`; JS loses integer
precision past Number.MAX_SAFE_INTEGER.
</context>

<constraints>
- Scope: money.ts + money.test.ts only.
- Reproduce with a test before fixing.
- Throw on out-of-range input rather than adding bignum support.
</constraints>

<acceptance_criteria>
- Reproducing test fails pre-fix, passes post-fix. npm test green overall.
</acceptance_criteria>

<output_format>Root cause, diff, and the test that proves it.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | reads like a bug ticket triage |
| XML | Claude Code | "reproduce before fixing" constraint holds up well as a tag |

## Verified

- [x] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [x] Root cause: `Number(whole) * 100` silently loses integer precision once
      `whole` exceeds `Number.MAX_SAFE_INTEGER / 100`, so very large inputs
      parse to a nearby-but-wrong cents value instead of throwing.
- [x] Reproduced with `parseAmount("999999999999999999")` (fails silently
      before the fix — returns an imprecise number instead of an error).
- [x] Fix: added `Number.isSafeInteger(cents)` guard that throws `RangeError`
      instead of returning corrupted data.
- [x] `cd app && npm test` — 14/14 passing; no bignum dependency added, per
      stop rule.
