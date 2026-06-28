---
name: add-tests
description: Generate a complete Vitest unit-test suite for any TypeScript source file, covering all exports, edge cases, and invalid input.
version: 1
---

# Add Tests

**Usage:** `/add-tests <source-file>` — e.g. `/add-tests app/src/money.ts`

## Baseline (weak) — what you started from

```text
напиши тести для money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer in a Node 22, ESM, strict-TS, Vitest project.
Goal: Produce a complete Vitest test suite for $ARGUMENTS covering all exported
      functions with happy-path, edge-case, and invalid-input tests.
Context:
- Target: $ARGUMENTS. Read it first to discover exports, types, and documented
  behavior (JSDoc / inline comments).
- Test file: same directory as the source, named <basename>.test.ts.
  (e.g. src/money.ts → src/money.test.ts). Create or overwrite it.
- Test runner: Vitest. Import with the .js extension (ESM).
Constraints:
- Write only the test file; do not modify the source file.
- No new npm dependencies.
- Use only Vitest APIs (test, it, expect, describe, vi, beforeAll, beforeEach,
  afterEach, afterAll); no Jest-specific globals.
  vi is allowed for mocking, spying, and timer control (vi.mock, vi.spyOn, vi.useFakeTimers).
- Type all it.each / test.each callbacks explicitly — no implicit any.
- One describe block per exported function.
- No real names, secrets, credentials, or PII in test data.
Acceptance criteria:
- Every exported function has a describe block.
- Each describe block has: ≥ 1 happy-path case, ≥ 1 edge case, invalid-input
  throws test where the function documents throwing.
- If actual behavior differs from the docs, assert the actual value and add a
  comment: // bug: expected <correct> — do NOT use test.fails or not.toEqual.
- Minimum 20 distinct expect calls total.
- cd <project-root> && npx vitest run exits 0.
Output:
- Full contents of the new test file.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do not fix bugs in the source — document actual behavior in tests.
- Do not add test helpers or fixtures beyond what fits in a single file.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Read $ARGUMENTS first, then write a
complete Vitest test file for it. One describe block per exported function.
Cover happy-path, edge cases, and invalid-input throws. If actual behavior
differs from the docs, assert the actual value with an inline comment explaining
the correct behavior — do NOT use test.fails or not.toEqual (both pass silently
after a fix). Before finishing, verify: (1) every export has a describe block,
(2) npx vitest run exits 0, (3) ≥ 20 distinct expect calls.
</instructions>

<context>
Source file: $ARGUMENTS
Read it to discover: exported names, parameter types, return types, documented
throws, and any inline notes about known bugs or edge cases.
Test file location: same directory, <basename>.test.ts. Create or overwrite.
Test runner: Vitest (ESM). Import: `import { ... } from "./<basename>.js"`.
</context>

<constraints>
- Write only the test file; do not modify the source.
- No new npm packages.
- Vitest APIs only (test, it, expect, describe, vi, beforeAll, beforeEach,
  afterEach, afterAll); no Jest globals.
  vi is allowed for mocking, spying, and timer control (vi.mock, vi.spyOn, vi.useFakeTimers).
- Type all it.each / test.each callbacks — no implicit any.
- One describe block per exported function.
- No secrets, credentials, or PII in test data.
- Minimum 20 distinct expect calls.
</constraints>

<output_format>
Full contents of the test file.
One-sentence comment above each known-bug assertion explaining the correct behavior.
</output_format>

<stop_rules>
- If the source has no exported functions, stop and say so.
- Do not fix bugs in the source — document actual behavior in the tests.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Run against `app/src/money.ts` — all tests passed
- [x] Only the test file was written; source untouched
- [x] All exported functions covered with happy-path, edge cases, and invalid input
