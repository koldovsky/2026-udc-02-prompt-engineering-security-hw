---
name: improve-parse-errors
description: Improve parseAmount error messages and add tests — minimal change.
version: 1
---

# Improve parse errors (debug)

## Baseline (weak)

```
parseAmount дає незрозумілі помилки
```

## Production — markdown (GPT dialect)

```markdown
Role: Debugger improving DX for money parsing errors.
Goal: Clearer Error messages from `parseAmount` without changing successful parses.
Context: `app/src/money.ts`, tests in `app/src/money.test.ts`.
Constraints: Change only parseAmount and its tests. Generic messages only.
Acceptance criteria: Message mentions expected format; test asserts substring; npm test green.
Output: Before/after message + test name.
```

## Verified

- [x] Run against `app/src/money.ts`
