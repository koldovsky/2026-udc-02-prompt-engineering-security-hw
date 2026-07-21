---
name: meta-improve-prompt
description: Meta-prompting technique — ask the agent to critique/improve a prompt before running it, and read the acceptance criteria it adds back as a signal of what was missing. Use on any weak one-liner before spending a run on it.
version: 1
---

# Meta-prompting: improve the prompt before running it

Task A.3 of the homework. Not a task prompt for `app/` itself — a prompt
*about* prompts. The "feature" is that instead of guessing what's missing
from a weak instruction, you ask the agent to name it out loud first, then
compare that list against what you'd have written by hand.

## The technique

```markdown
Before you do anything, don't execute this prompt yet. First rewrite it into
a structured prompt (Role / Goal / Context / Constraints / Acceptance
criteria / Output / Stop rules), and explain what you added and why. Then
wait for my go-ahead before running it.

Prompt to improve:
"допоможи з тестами для app"
```

## Worked example — before / after

**Before (baseline):** `materials/weak-prompt.md` —
`допоможи з тестами для app`. No file, no goal, no AC, no stop rule.

**After meta-prompting**, the agent's rewrite named these gaps and proposed
AC for each — this is exactly the delta that ended up in `add-tests.md`:

| Gap the agent named | AC it proposed | Landed in `add-tests.md` as |
|---|---|---|
| No target file | "point at a specific file under `app/src`" | `Context: app/src/money.ts` |
| No definition of "edge case" | "enumerate: remainder handling, negative values, invalid input, out-of-range params" | the 5-item edge-case list in Acceptance criteria |
| No done signal | "a command that proves success" | `cd app && npm test` passes, 0 failures |
| No scope fence | "restrict to test files unless a bug is found" | Constraints: scope to `money.ts` + `money.test.ts`, fix only what a failing test requires |
| No stop condition | "say so if nothing needed fixing, don't pad with busywork" | Stop rules: don't invent extra assertions to look thorough |

## Why this is worth doing before every weak prompt

The agent's self-critique is a cheap signal for **what a human reviewer would
have asked "wait, but what about...?" for** — surfacing it before the run is
strictly cheaper than discovering it after a scope-crept diff. It's not a
replacement for writing the structured prompt yourself; it's a fast way to
check your own draft for gaps, or to bootstrap a first draft from a one-liner.

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Any chat-style tool | this is instructions-about-instructions; XML tags add no value when the "task" is prose critique, not a code change with a scope fence |

## Verified

- [x] Applied to `materials/weak-prompt.md`'s baseline before writing
      `prompts/add-tests.md`.
- [x] Every AC the meta-prompting pass proposed is traceable to a line in
      `prompts/add-tests.md`'s Acceptance criteria / Constraints / Stop rules
      (see table above) — confirms the technique isn't just generic advice,
      it produced the specific gaps that mattered for this file.
