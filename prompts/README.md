# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to `.cursor/commands/<name>.md` — invoke with `/name`
   and pass the target via `$ARGUMENTS`.

## Commands (promoted)

| Command | Prompt source | `$ARGUMENTS` | When to use |
|---------|---------------|--------------|-------------|
| `/add-tests` | [`add-tests.md`](./add-tests.md) | module path, e.g. `app/src/money.ts` | Before PR — extend edge-case coverage |
| `/review-pr` | [`review-pr.md`](./review-pr.md) | file or diff target, e.g. `app/src/money.ts` | Before merge — adversarial review |
| `/debug-failing-test` | [`debug-failing-test.md`](./debug-failing-test.md) | pasted vitest failure output | When a test goes red |

Command files live in [`.cursor/commands/`](../.cursor/commands/).

## Index (13 prompts)

| Prompt | Category | Target | Command | Dialect |
|--------|----------|--------|---------|---------|
| `add-tests.md` | tests | `app/src/money.ts` | `/add-tests` | markdown + XML |
| `add-test-case.md` | tests | `app/src/money.test.ts` | — | markdown + XML |
| `find-test-gaps.md` | tests | `app/src/money.ts` | — | markdown + XML |
| `run-regression.md` | tests | `app/` | — | markdown + XML |
| `review-pr.md` | review | `app/src/money.ts` | `/review-pr` | markdown + XML (starter) |
| `review-security.md` | review | `app/src/money.ts` | — | markdown + XML |
| `write-docs.md` | docs | `app/src/money.ts` | — | markdown + XML |
| `explain-module.md` | docs | `app/src/money.ts` | — | markdown + XML |
| `refactor-extract-helpers.md` | refactor | `app/src/money.ts` | — | markdown + XML |
| `refactor-guard-discount.md` | refactor | `app/src/money.ts` | — | markdown + XML |
| `debug-failing-test.md` | debug | vitest output + `money.ts` | `/debug-failing-test` | markdown + XML |
| `fix-split-remainder.md` | debug | `app/src/money.ts` | — | markdown + XML |
| `debug-type-error.md` | debug | `tsc` output + `app/` | — | markdown + XML |

**Categories covered:** tests (4), review (2), docs (2), refactor (2), debug (3).

**Dual dialect (homework requirement):** at least one prompt in **markdown + XML**.
Provided example: `review-pr.md`. Participant prompt: `add-tests.md`.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
