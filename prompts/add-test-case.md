---
name: add-test-case
description: Add one focused vitest case from a behavior description. Narrow scope.
version: 1
---

# Add test case

## Baseline (weak)

```
додай тест для parseAmount
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer adding a single vitest case in this repo.
Goal: Add exactly one new `it()` for the behavior described below in app/src/money.test.ts.
Context:
- Module: app/src/money.ts (integer cents).
- Behavior to test: $ARGUMENTS (e.g. `parseAmount("12.5")` → 1250 cents).
- Match existing describe block for that function.
Constraints:
- Edit only app/src/money.test.ts; do not change money.ts.
- Add exactly one new `it()` unless the behavior truly needs two assertions in one test.
- Descriptive test name; no new dependencies.
Acceptance criteria:
- cd app && npm test exits 0.
- New test fails if the described behavior is removed (sanity: assertion matches spec).
- Test lives under the correct `describe()` for the target function.
Output:
- Test name + assertion + npm test result.
Stop rules:
- If behavior is ambiguous, stop and ask one clarifying question.
- If production is wrong, report failure — do not fix money.ts in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Add one vitest it() to money.test.ts for: $ARGUMENTS. Tests only. Run npm test.
</instructions>

<context>
money.ts integer cents; ESM import from ./money.js.
</context>

<constraints>
- money.test.ts only; exactly one new it(); no deps.
</constraints>

<output_format>
Test name + expect line + pass/fail.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Narrow chat tasks | single-it rule |
| XML | Claude | $ARGUMENTS = behavior spec |

## Verified

- [x] Run with `parseAmount("12.5") → 1250` — test added; npm test green
