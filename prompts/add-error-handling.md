---
name: add-error-handling
description: Add robust, intentional error handling and input validation to a target — fail loudly and safely, no swallowed errors. Use to harden code.
version: 1
---

# Add error handling

Point this at code with missing or weak error handling. It should add
validation and failure paths that surface problems clearly, without hiding them.

## Baseline (weak) — what you started from

```
handle errors
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior software engineer working in the target repository and technology stack. Review the existing codebase for missing, inconsistent, or weak error handling and improve it while preserving the project's intended behavior and architecture.

Goal: Improve the reliability and diagnosability of the application by adding robust error handling, input validation, and explicit failure paths. Problems should be surfaced clearly to developers, operators, and users where appropriate, rather than being silently ignored or hidden.

Context:

- Analyze the existing implementation before making changes.
- Identify areas where errors are swallowed, ignored, logged without action, converted into misleading success states, or allowed to fail with unclear messages.
- Pay particular attention to external integrations, network requests, file I/O, database operations, API boundaries, background jobs, asynchronous workflows, configuration loading, and user input handling.
- Follow existing project conventions for logging, exceptions, validation, and error reporting.

Constraints:

- Only modify files directly related to error handling, validation, and failure-path behavior.
- Do not introduce new dependencies unless they are already present in the project and required by existing patterns.
- Do not change public APIs, request/response contracts, database schemas, or user-facing functionality unless necessary to expose accurate error states.
- Do not suppress exceptions without a documented and justified recovery strategy.
- Preserve existing successful execution paths.
- Ensure no secrets, credentials, tokens, personal data, or sensitive internal details are exposed in logs, errors, or output.

Acceptance criteria:

- Invalid inputs are validated as early as practical and produce clear, actionable errors.
- Failures from external systems and internal operations are handled explicitly.
- Error messages contain sufficient context for debugging without exposing sensitive information.
- Silent failures, empty catch blocks, ignored return values, and generic error swallowing are eliminated where appropriate.
- Logging is consistent with project conventions and includes relevant diagnostic context.
- Existing tests continue to pass.
- New or updated tests cover the added validation and error-handling behavior.
- Running the project's test suite shows no regressions.
- Error scenarios produce observable and verifiable outcomes (exceptions, status codes, logs, UI states, or test assertions).

Output:

- List of changed files.
- Brief summary of each change.
- Summary of newly added validation and error-handling behavior.
- Tests added or updated.
- Any remaining risks, assumptions, or areas requiring follow-up.

Stop rules:

- Stop when all identified error-handling gaps within scope have been addressed and verified.
- If intended behavior is ambiguous, multiple valid error-handling strategies exist, or a change would alter a public contract, stop and request clarification before proceeding.
- Do not invent requirements, business rules, or recovery behavior that cannot be inferred from the codebase.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You harden code against bad input and failure. Add error handling that is
intentional, not blanket: validate inputs at boundaries, handle the failure
modes that can actually occur, and fail loudly with actionable messages. Do NOT
swallow errors (no empty catches, no silent defaults that mask bugs). Preserve
the happy-path behavior and public API. Match the repo's existing error style
(exceptions vs result types vs error codes) rather than introducing a new one.
</instructions>

<context>
Target: $ARGUMENTS. Identify untrusted inputs, external calls, and edge cases
(null/empty, out-of-range, type mismatch, I/O and network failure, concurrency).
</context>

<constraints>
- No catch-all that hides root causes; every caught error is handled or rethrown.
- Don't change the success-path contract or add dependencies.
- Error messages must not leak secrets, tokens, or PII.
- Add tests for each new failure path.
</constraints>

<output_format>
The changed code, a list of failure modes now covered (and any deliberately
left out, with reasoning), and tests exercising the error paths.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | "no swallowed errors" + per-path tests keep it honest |

## Verified

- [x] Run against a real target
- [x] Failure modes covered + tested; no empty catches; messages leak nothing
