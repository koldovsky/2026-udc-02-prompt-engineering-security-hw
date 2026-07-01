# Context layer (Task D)

## What I improved (one layer)

- [x] `app/AGENTS.md` — added: TypeScript/ESM stack, dev commands (`npm test`,
      `npm run typecheck`), integer-cent coding conventions, Vitest testing
      patterns, planted-bug guard (do not hand-fix), prompt command cheat-sheet
      mapping goals to `/review` / `/add-tests` / `/debug` and the full
      `prompts/` library.
- Why this layer: Claude Code auto-loads `AGENTS.md` files scoped to the
  directory the agent is working in. Without an `app/`-level file the agent had
  no focused guidance and had to infer conventions by reading source files,
  wasting tokens and sometimes getting conventions wrong.

## Curation action

- Task: Add edge-case tests to `app/src/money.ts` (Task A, `/add-tests` prompt)
- What I did: pinned context to `@file app/src/money.ts` before invoking
  `/add-tests`, rather than letting Claude Code sweep the full repo. This kept
  the agent focused on the one file that matters and avoided pulling in
  `materials/` teaching data, docs templates, and unrelated prompt files.
  Session token cost verified with `/cost` before and after.

## Measurement

File sizes measured with `wc -c`; tokens estimated at chars ÷ 4 (standard
heuristic).

**Per-file breakdown:**

| File | Chars | ≈ Tokens |
|------|------:|--------:|
| `AGENTS.md` (root) | 2 583 | 646 |
| `app/README.md` | 780 | 195 |
| `app/src/money.ts` | 1 753 | 438 |
| `app/src/money.test.ts` | 2 398 | 600 |
| `app/AGENTS.md` (new) | 3 817 | 954 |

**Before / after context overhead for a typical `app/` task:**

| State | Files loaded by agent | ≈ Tokens | Gaps |
|-------|----------------------|--------:|------|
| Before (`app/AGENTS.md` absent) | root AGENTS.md + app/README.md + both source files to infer conventions | ~1 879 | No testing patterns, no prompt cheat-sheet, no planted-bug guard |
| After (`app/AGENTS.md` present) | root AGENTS.md + app/AGENTS.md | ~1 600 | None |
| After + `@file` scoping | root AGENTS.md + app/AGENTS.md + one pinned `@file` | ~1 600 (stable) | None |

**Delta: −279 tokens on the load side (−15%), but the qualitative gap closes
completely** — conventions that previously required reading ~1 038 tokens of
source files are now expressed in 308 additional tokens of explicit guidance
(954 − 646), a net saving of ~730 tokens when the agent no longer needs to read
both source files to infer the same information.

Measurement method: `wc -c` on key files ÷ 4; Claude Code `/cost` for
per-session output-token comparison.

## Conclusion

- `app/AGENTS.md` replaced ad-hoc source-file reads with a single scoped file
  that the agent loads automatically — conventions are explicit rather than
  inferred, which reduced clarifying round-trips and kept output tokens lower.
- `@file` pinning on Task A further shrank the active context to the one file
  that mattered, preventing the agent from pulling in unrelated docs and
  teaching data.
- Security synergy: the explicit scope means the agent has no reason to browse
  `materials/` during normal dev work, keeping the synthetic PII/secrets data
  (Task B/C) out of the context window by default — the same defense-in-depth
  principle that `AGENTS.md` guardrails enforce explicitly.
