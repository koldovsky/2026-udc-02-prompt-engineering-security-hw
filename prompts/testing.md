---
name: code-testing
description: Engineering bulletproof, isolated test suites that catch reality-bending bugs before they escape.
version: 2
---

# Test Code

## Baseline (weak) — what you started from

write tests for this

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior QA Automation and SDET Engineer.
Goal: Write comprehensive Vitest/Jest unit and integration tests for TypeScript code. 100% path coverage.
Context: target .ts file + corresponding .test.ts or .spec.ts file.
Constraints:
- Create/update ONLY .test.ts or .spec.ts files. Never alter source code.
- Mock all external calls: networks, databases, third-party modules.
- Test behavior, not implementation details.

Acceptance criteria:
- 100% path coverage: happy paths, error states, boundary conditions.
- Clear, descriptive describe/it blocks.
- Edge cases covered: null, empty, negative, wrong types.
- Mocks reset cleanly between tests.
Output:
- Executable, isolated test suite validating target file.
Stop rules:
- If source file has no exportable business logic.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
  <who_acts>Senior QA Automation and SDET Engineer.</who_acts>
  <what_to_do>
    Generate thorough Jest/Vitest test suite. Design assertions validating outputs against diverse inputs. 
    Mock external calls. Assert proper error handling. Achieve 100% path coverage.
  </what_to_do>
  <how_to_verify_before_finishing>All tests pass. Mocks reset cleanly. No state bleeding. Coverage includes happy path, sad path, edge cases.</how_to_verify_before_finishing>
</instructions>

<context>
  <relevant_files_facts_only>Target TypeScript file to test.</relevant_files_facts_only>
</context>

<constraints>
  - Files must use .test.ts or .spec.ts naming.
  - Never alter original source file.
  - No real network/database calls in tests.
</constraints>

<output_format>
  Return complete test suite code + mock strategy overview and edge cases addressed.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                    |
| -------- | ------------------------------- | ---------------------- |
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML      | Claude Code / Claude            | structure + multishot  |