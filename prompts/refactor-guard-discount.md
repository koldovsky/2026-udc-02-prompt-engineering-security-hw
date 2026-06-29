---
name: refactor-guard-discount
description: Add input validation to applyDiscount without changing other exports.
version: 1
---

# Refactor (guard discount)

## Baseline (weak)

```text
зроби applyDiscount безпечнішим
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer hardening input validation in app/src/money.ts.
Goal: Make `applyDiscount` reject invalid `percent` values; keep other exports untouched.
Context: `applyDiscount(cents, percent)` currently accepts any number. Contract: percent must be 0–100 inclusive. Tests in money.test.ts may document old behavior — update tests to match the new contract.
Constraints:
- Edit app/src/money.ts and app/src/money.test.ts only.
- No new dependencies; do not change other export signatures.
- Throw `Error` with a clear message for invalid percent (match parseAmount error style).
Acceptance criteria:
- applyDiscount throws when percent < 0 or percent > 100.
- applyDiscount(10000, 0), (10000, 10), (10000, 100) behave as before.
- cd app && npm test exits 0; cd app && npm run typecheck exits 0.
- At least one new/updated test asserts throw on invalid percent.
Output:
- Summary: validation rule + test changes.
Stop rules:
- If percent validation breaks unrelated tests, fix tests minimally and stop.
- Do not refactor splitEvenly or other functions in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Add 0–100 validation to applyDiscount in money.ts. Update tests. Run npm test
and typecheck in app/.
</instructions>

<context>
applyDiscount lacks percent bounds; parseAmount throws Error with descriptive text.
</context>

<constraints>
- money.ts + money.test.ts only; no new deps.
</constraints>

<output_format>
Validation rule + test list. Confirm green suite.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT | names the 0–100 contract |
| XML | Claude | narrow scope |

## Verified

- [x] Run against `app/src/money.ts` — percent 0–100 guard + test for throw on 150
