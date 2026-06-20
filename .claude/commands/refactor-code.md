---
description: Behavior-preserving refactor — improve clarity/structure without changing observable behavior.
argument-hint: <file or function to refactor, e.g. "app/src/money.ts">
---

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
