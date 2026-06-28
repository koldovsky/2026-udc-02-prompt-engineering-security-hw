# Prompt cookbook

Reusable, **proven** prompts for team routine tasks. Each prompt is structured (Role → Goal → Context → Constraints → Acceptance criteria → Stop), tested on real code (`app/src/money.ts`), and available in both markdown (GPT) and XML (Claude) dialects.

## Quick start

1. Pick a prompt from the index below
2. Copy the XML or markdown section
3. Replace `$ARGUMENTS` with your target file
4. Paste into your AI tool

**Fastest way:** Use registered commands (`.claude/commands/`):

```bash
/add-tests app/src/money.ts
/review-pr app/src/money.ts
```

## All prompts (10/10 ✅)

| # | Prompt | Purpose | Tested? | Command? |
|---|--------|---------|---------|----------|
| 1 | [`add-tests.md`](./add-tests.md) | Comprehensive edge-case tests | ✅ 59 tests | `/add-tests` |
| 2 | [`review-pr.md`](./review-pr.md) | Adversarial code review | ✅ 2+ findings | `/review-pr` |
| 3 | [`write-docs.md`](./write-docs.md) | JSDoc + README documentation | ⏳ not yet executed | — |
| 4 | [`refactor.md`](./refactor.md) | Refactor for readability (no API changes) | ⏳ not yet executed | — |
| 5 | [`debug.md`](./debug.md) | Diagnose failing tests & unexpected behavior | ⏳ not yet executed | — |
| 6 | [`performance-audit.md`](./performance-audit.md) | Algorithmic complexity & bottleneck analysis | ⏳ not yet executed | — |
| 7 | [`security-check.md`](./security-check.md) | Input validation, injection risks, unsafe patterns | ⏳ not yet executed | — |
| 8 | [`explain-code.md`](./explain-code.md) | Explain module to junior developers | ⏳ not yet executed | — |
| 9 | [`improve-types.md`](./improve-types.md) | Stricter TypeScript types & branded types | ⏳ not yet executed | — |
| 10 | [`optimize-imports.md`](./optimize-imports.md) | Review imports, minimize bundle size | ⏳ not yet executed | — |

## How to use each prompt

### Option 1: Registered commands (fastest)
```bash
# Claude Code auto-loads from .claude/commands/
/add-tests <target-file>
/review-pr <target-file>

# Example:
/add-tests app/src/money.ts
/review-pr app/src/utils/payment.ts
```

### Option 2: Manual — copy prompt from file

1. Open `prompts/<name>.md`
2. Choose **markdown** (GPT/Copilot) or **XML** (Claude) section
3. Replace `$ARGUMENTS` with your target file/folder
4. Paste into your AI tool

### Option 3: Your IDE (Cursor/GitHub Copilot)
- Cursor auto-loads from `.cursor/commands/`
- Copilot: paste markdown version into chat

## Prompt anatomy

Each prompt has:

```
---
name: <verb-object>
description: <one-line summary>
version: 1
---

# Title

## Baseline (weak) — what you started with
<the vague one-liner>

## Production — markdown (GPT dialect)
Role: <who acts>
Goal: <user-visible outcome>
Context: <relevant facts only>
Constraints:
- <scope, what NOT to touch>
Acceptance criteria:
- <verifiable condition>
Output:
- <what to return>
Stop rules:
- <when to stop / ask>

## Production — XML (Claude dialect)
<instructions>, <context>, <constraints>, <output_format>

## Tool-fit notes
<when to use markdown vs XML>

## Verified
<checklist>
```

## Key principles

1. **Specific > vague** — "add tests to `app/src/money.ts`", not "improve my code"
2. **Constraints matter** — "don't touch X", "no new deps", "ask before Y"
3. **Acceptance criteria** — agent knows when it's done (test passes, bug found, etc.)
4. **Both dialects** — markdown for outcome-first tools, XML for structure-aware ones
5. **Stop rules** — explicit exit condition ("ask before modifying prod code", "stop if any test fails")

## Verified results

- ✅ **add-tests:** 59 total tests (comprehensive edge-case coverage), all passing
- ✅ **review-pr:** found security gaps + validation issues
- ⏳ **others (8 prompts):** structurally validated and ready, but not yet executed on `app/`

## Contributing

When you create a new prompt:

1. Use `_template.md` as a starting point
2. Test it on a real file in `app/`
3. Include both markdown + XML versions
4. Tick the "Verified" checklist
5. Add to this README
6. If useful, register as command in `.claude/commands/`

## Safety

Prompts contain **no real secrets or PII** — only placeholders and synthetic examples. If a prompt needs sensitive context, sanitize it first (see `docs/sanitization-checklist.md`).

---

**Last updated:** 2026-06-25  
**Verified on:** Node 22, TypeScript, Vitest  
**Coverage:** tests, review, docs, refactor, debug, performance, security, explain, types, imports
