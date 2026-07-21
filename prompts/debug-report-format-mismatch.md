---
name: debug-report-format-mismatch
description: Investigate a bug report that turns out to be a documented scope limit, not a bug — demonstrates staying in scope instead of silently adding a feature. Use when a report describes input the module was never meant to accept.
version: 1
---

# Debug: thousands-separator report (triage, not a fix)

"Debug" cookbook entry #2. The point of this one is the *opposite* outcome
of `debug-parse-overflow.md`: sometimes the right output of a debug prompt is
"this is not a bug," and a good prompt has to make that an acceptable answer
instead of pressuring the agent to patch something anyway.

## Baseline (weak)

```
parseAmount падає на "1,234.56", почини
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer triaging a reported bug in this repo.
Goal: Investigate the report "parseAmount throws on '1,234.56'" against
app/src/money.ts. Determine whether this is a bug or expected behavior before
changing anything.
Context: parseAmount's documented contract (see its JSDoc) is "428.00" / "428"
style input; the regex requires `\d+` with no separators.
Constraints:
- Do NOT add thousands-separator support without explicit confirmation — that
  is a new feature (a format decision), not a bug fix, and changes what
  strings the function accepts.
- If it's expected behavior, make it verifiable: add/confirm a test and a
  doc line that lock in the current contract, so the next report on this
  input is a 10-second lookup, not a re-investigation.
Acceptance criteria:
- A clear verdict: bug vs. expected behavior, with the reasoning.
- If expected: a test asserting the throw, and a JSDoc line stating the
  limitation, both already present or added.
- If a real bug: stop and ask before implementing a fix (out of this prompt's
  scope — hand off to a fix-scoped prompt instead).
Output:
- The verdict and, if applicable, the diff that documents it.
Stop rules:
- Never silently expand parseAmount's accepted input formats as a side effect
  of "fixing" a report.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Investigate the report "parseAmount throws on '1,234.56'". Decide bug vs.
expected behavior before touching any code.
</instructions>

<context>
parseAmount's contract: "428.00"/"428" only, no thousands separators (see
JSDoc / regex in app/src/money.ts).
</context>

<constraints>
- Do not add separator support without explicit confirmation — that's a new
  feature, not a bug fix.
- If expected behavior: lock it in with a test + doc line, don't just close
  the report verbally.
</constraints>

<output_format>
Verdict (bug / expected) + reasoning. If expected, the diff that documents it.
If a real bug, stop and ask rather than fixing here.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | ticket-triage phrasing |
| XML | Claude Code | explicit "stop and ask" tag resists the pull to just patch it |

## Verified

- [x] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [x] Verdict: **expected behavior, not a bug.** `parseAmount`'s contract was
      always "428.00"/"428"-shaped input; thousands separators were never
      documented or supported.
- [x] Locked it in: JSDoc on `parseAmount` now states the limitation
      explicitly, and `money.test.ts` has a regression test
      (`"throws on thousands-separated input (documented limitation, not a
      bug)"`) so a future report on the same input resolves in seconds.
- [x] Did not add separator-stripping/parsing logic — no scope expansion, per
      stop rule.
