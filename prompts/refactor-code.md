---
name: refactor-code
description: Behavior-preserving refactor of a target — improve clarity/structure without changing observable behavior. Use to pay down tech debt safely.
version: 1
---

# Refactor (behavior-preserving)

Point this at a file or function. It should improve readability and structure
while keeping the public API and observable behavior identical, proven by tests.

## Baseline (weak) — what you started from

```
clean this up
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior software engineer working in the target repository and technology stack. Refactor the specified file or function with a focus on readability, maintainability, and code structure while preserving existing behavior.

Goal: Improve the internal organization of the targeted code without changing the public API, external contracts, runtime behavior, side effects, error semantics, or user-visible outcomes. All behavior preservation must be validated by tests.

Context:

Refactor:

- **Target file:** `<path/to/file>`

  - or
- **Target function/class:** `<symbol name>`

Use the existing implementation, tests, and surrounding codebase conventions as the source of truth. The objective is code quality improvement, not feature development.

Constraints:

- Limit changes to:

  - `<path/to/file>`
  - Any directly related test files required to validate behavior preservation.
- Do not change:

  - Public APIs
  - Exported symbols
  - Function signatures
  - Configuration contracts
  - Route definitions
  - Data schemas
  - External integrations
- Do not introduce:

  - New dependencies
  - New frameworks
  - New architectural patterns
- Keep:

  - Inputs and outputs identical
  - Side effects identical
  - Logging behavior identical
  - Error handling semantics identical
- Prefer:

  - Smaller functions
  - Clearer naming
  - Reduced nesting
  - Simplified control flow
  - Extraction of well-named private helpers
  - Removal of duplication
- Follow existing project style and conventions.
- Do not include secrets, credentials, tokens, API keys, or PII in output.

Acceptance criteria:

- All existing tests pass without modification to expected behavior.
- Tests demonstrate that observable behavior remains unchanged.
- The refactored code is easier to read and maintain.
- No public API changes are introduced.
- No functional changes are introduced.
- Any added or updated tests exist solely to verify behavioral equivalence.

Output:

Provide:

1. List of changed files.
2. Unified diffs or code changes.
3. Brief explanation of the refactoring decisions.
4. Test commands executed.
5. Test results demonstrating behavior preservation.

Stop rules:

- Stop and report if preserving behavior requires changing a public API.
- Stop and report if unrelated failing tests prevent verification.
- Stop and report if the target behavior is ambiguous and cannot be safely inferred from code or tests.
- Ask for clarification only if the target file or function has not been specified.
- Do not expand scope beyond the identified refactoring target.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer doing a behavior-preserving refactor. Improve the
target's readability, naming, and structure WITHOUT changing its observable
behavior or public API. This is not a rewrite and not a bug-fix pass: if you
spot a bug, note it separately — do not silently change behavior. Run the test
suite before and after; both runs must produce identical results. If there are
no tests covering the code, say so and add characterization tests first.
</instructions>

<context>
Target: $ARGUMENTS. Follow the surrounding code's idioms, formatting, and
naming. Tests are the contract — they must stay green and unchanged in intent.
</context>

<constraints>
- Preserve the public API and all observable behavior.
- No new dependencies; no scope creep into unrelated files.
- One concern at a time; keep the diff small and reviewable.
- No secrets/PII in output.
</constraints>

<output_format>
The refactored code, a before/after test result confirming parity, a short
rationale per change, and a separate list of any bugs spotted (not fixed here).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | "behavior-preserving + tests parity" curbs rewrites |

## Verified

- [x] Run against a real target
- [x] Tests green before and after; public API unchanged; diff stayed small
