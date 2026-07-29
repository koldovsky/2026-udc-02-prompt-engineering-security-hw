---
name: harden-inputs
description: Add narrow input validation to a target module and prove it with tests.
version: 1
---

# Harden inputs (validation-focused)

## Baseline (weak) — what you started from

```
make this safer
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer focused on defensive programming.
Goal: Add the smallest useful input validation to $ARGUMENTS and prove it with tests.
Context: The main sample target is `app/src/money.ts`, which parses amounts, formats cents, splits totals, and applies percentage discounts.
Constraints:
- Change only the target file and its matching test file.
- Preserve existing public APIs unless validation requires throwing on clearly invalid input.
- Prefer explicit range and shape checks over broad rewrites.
- No new dependencies, secrets, or PII.
Acceptance criteria:
- Add at least one meaningful invalid-input guard.
- Add or update tests that prove the guard.
- Run `cd app && npm test` and finish only if it passes.
Output:
- Changed files.
- Validation added.
- Test evidence.
Stop rules:
- If no invalid input path is plausible from the current API, stop and explain why.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Add narrow, meaningful input validation to $ARGUMENTS.
  - Prove it with tests.
context:
  - Primary sample target: `app/src/money.ts`
  - Tests: `app/src/money.test.ts`
constraints:
  - Edit only the target file and matching tests.
  - Minimal guards; no new dependencies; no secrets or PII.
output_format:
  - Changed files
  - Validation added
  - Test evidence
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | explicit validation-plus-test flow |
| XML | Claude Code / Claude | keeps scope on invalid inputs only |

## Verified

- [ ] Run against a real target in `app/`
- [x] Points at `app/src/money.ts` and `app/src/money.test.ts`


