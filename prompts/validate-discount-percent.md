---
name: validate-discount-percent
description: Add/strengthen percent argument validation in applyDiscount. Use when the discount-percent guard is missing or too weak (e.g. lets NaN/Infinity slip through).
version: 1
---

# Validate `percent` in applyDiscount

Hardens `applyDiscount(cents, percent)` in `app/src/money.ts`. The function
already calls `validateRange(percent, 0, 100)`, but `validateRange` uses
`value < min || value > max` — and `NaN`/`-NaN` comparisons are always false,
so `applyDiscount(10000, NaN)` silently returns `NaN` instead of throwing.
The goal is to reject non-finite input too.

## Baseline (weak) — what you started from

```
додай валідацію percent у applyDiscount
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You write minimal,
idiomatic TypeScript — no new dependencies, no unnecessary abstractions.
Goal: Make applyDiscount(cents, percent) in app/src/money.ts validate `percent`
robustly — reject any value outside [0, 100] AND any non-finite value
(NaN, Infinity, -Infinity) — and add tests in app/src/money.test.ts.
Context: app/src/money.ts has a private helper validateRange(value, min, max, name)
used by both applyDiscount and addTax; it throws when value < min || value > max.
Because NaN comparisons are always false, applyDiscount(10000, NaN) currently
returns NaN instead of throwing — that is the gap to close.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts; do NOT touch any other file.
- Extend/reuse the existing validateRange helper rather than inlining a separate
  check, so addTax stays consistent; keep the public API and valid-input behaviour unchanged.
- No new npm dependencies (vitest is already installed).
- No secrets or PII in code or test data — synthetic values only.
Acceptance criteria:
- applyDiscount(10000, NaN), (10000, Infinity), (10000, -1), (10000, 101) all throw.
- applyDiscount(10000, 0) === 10000, (10000, 100) === 0, (10000, 20) === 8000 still hold.
- `npx vitest run` exits 0 with all pre-existing tests still passing.
Output:
- The updated app/src/money.ts and app/src/money.test.ts (no explanatory prose).
Stop rules:
- If percent validation already rejects NaN/non-finite values, report that and
  stop without editing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Strengthen percent validation in
applyDiscount(cents, percent) in app/src/money.ts so it throws for values
outside [0, 100] AND for non-finite values (NaN, Infinity, -Infinity), then add
covering tests in app/src/money.test.ts. Verify all pre-existing tests still
pass before finishing.
</instructions>

<context>
Target: app/src/money.ts (integer-cent helpers — formatCents, parseAmount,
splitEvenly, applyDiscount, addTax). Tests live in app/src/money.test.ts
(vitest, Node 22). A private validateRange(value, min, max, name) helper, shared
by applyDiscount and addTax, throws on value < min || value > max. NaN slips
through that guard (NaN comparisons are always false), so applyDiscount(10000, NaN)
returns NaN today — that is the bug to fix.
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts; do not modify any other file.
- Extend/reuse validateRange rather than inlining a new check; keep addTax consistent.
- Keep the public API and existing valid-input behaviour unchanged.
- No new npm dependencies; no secrets or PII — synthetic test values only.
- Add new cases inside the existing applyDiscount describe block.
</constraints>

<output_format>
Return both updated files in full — first app/src/money.ts, then
app/src/money.test.ts. Complete file contents only, no prose, no diff.
</output_format>

<stop_rules>
- If applyDiscount already rejects NaN/non-finite percent, report it and stop.
- If vitest is not present in package.json, report it and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; acceptance criteria as prose reads naturally |
| XML | Claude Code / Claude | tags keep context, constraints, and stop rules cleanly separated |

## Verified

- [ ] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [ ] Agent added a non-finite guard; `applyDiscount(10000, NaN)` throws; `npx vitest run` exits 0
