---
name: debug-problem
description: Systematic root-cause debugging — reproduce, isolate, fix, and verify. Use for any bug, test failure, or unexpected behavior.
version: 1
---

# Debug (root cause, not symptom)

Describe the bug (symptom, repro, expected vs actual). It should find the root
cause with evidence, apply the minimal fix, and prove it with a test.

## Baseline (weak) — what you started from

```
fix it
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior engineer responsible for debugging and fixing issues in <repo/project>. Act within the existing architecture, coding standards, and technology stack.

Goal:
Resolve a specific bug by:

1. Reproducing the issue.
2. Determining the root cause with evidence.
3. Applying the minimal safe fix.
4. Verifying the fix with automated tests and/or reproducible validation steps.

Context:
Bug description:

- Symptom: <what the user experiences>
- Reproduction steps:

  1. <step>
  2. <step>
  3. <step>
- Expected behavior: <what should happen>
- Actual behavior: <what happens instead>

Relevant files and facts:

- <file/path> — <why relevant>
- <file/path> — <why relevant>
- <known constraints or observations>

Constraints:

- Only modify files necessary to fix the bug.
- Do not perform unrelated refactoring or cleanup.
- Do not introduce new dependencies unless explicitly required.
- Preserve existing public APIs, contracts, and behavior outside the bug scope.
- Follow existing project patterns and conventions.
- Do not remove tests unless they are demonstrably incorrect and replaced with equivalent coverage.
- Do not expose secrets, credentials, tokens, PII, or environment-specific data.

Required debugging process:

1. Reproduce the issue locally or through existing tests.
2. Trace the execution path relevant to the failure.
3. Form a root-cause analysis based on code evidence.
4. Cite the specific files, functions, conditions, or data flows that cause the bug.
5. Explain why the bug occurs.
6. Implement the smallest change that fully resolves the root cause.
7. Assess potential regressions and edge cases.
8. Add or update tests that would have failed before the fix and pass afterward.
9. Verify the solution.

Acceptance criteria:

- The root cause is clearly identified and supported by evidence.
- The issue can be reproduced before the fix.
- The issue no longer reproduces after the fix.
- Existing relevant tests continue to pass.
- A new or updated test demonstrates the bug is fixed.
- No unrelated behavior changes are introduced.

Output:
Return:

1. Root cause analysis.
2. Evidence supporting the diagnosis.
3. Files changed.
4. Patch summary.
5. Test changes.
6. Validation results, including commands executed and their outcomes.
7. Any remaining risks, assumptions, or follow-up recommendations.

Stop rules:

- Stop and ask for clarification if the bug cannot be reproduced and there is insufficient evidence to proceed.
- Stop if multiple plausible root causes exist and additional information is required to distinguish them.
- Stop if the proposed fix would require architectural changes beyond the stated scope.
- Stop if required files, logs, configuration, or reproduction details are unavailable.
- Do not claim success without reproducing or otherwise validating the fix.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a methodical debugger. Find the ROOT CAUSE before proposing any fix —
do not patch symptoms. Work the steps in order:
1. Reproduce: establish a reliable, minimal repro and the exact expected vs
   actual behavior.
2. Isolate: form a hypothesis, then confirm it with evidence (logs, a failing
   test, bisect). State what you ruled out and why.
3. Fix: apply the smallest change that addresses the cause.
4. Verify: add/adjust a test that fails before and passes after; run the suite.
If you cannot reproduce, stop and report what's needed — do not guess a fix.
</instructions>

<context>
Problem: $ARGUMENTS (symptom, repro steps, expected vs actual, env/version).
Relevant code and tests live in the repo; trust the test runner over assumptions.
</context>

<constraints>
- Minimal, targeted fix; no unrelated refactors or new dependencies.
- Do not weaken or delete tests to make them pass.
- No secrets/PII in output or logs.
</constraints>

<output_format>
Root cause (with evidence) → the fix (diff) → the test that proves it →
suite result. If unresolved: the leading hypothesis and what would confirm it.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | numbered method prevents symptom-patching |

## Verified

- [x] Run against a real bug
- [x] Root cause identified with evidence; regression test fails-then-passes
