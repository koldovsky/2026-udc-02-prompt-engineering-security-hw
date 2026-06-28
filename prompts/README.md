# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (12 prompts — all verified against `app/`)

| Prompt | Category | Target (`$ARGUMENTS`) | Verified | Command? |
|--------|----------|------------------------|:--------:|----------|
| `review.md` | review | a file or diff | ✅ | ✅ `/review` |
| `add-tests.md` | tests | a TS source file | ✅ | ✅ `/add-tests` |
| `tests-from-bug.md` | tests / debug | a bug / failing case | ✅ | |
| `security-review.md` | review / security | a file or diff | ✅ | |
| `write-docs.md` | docs | a module | ✅ | |
| `usage-examples.md` | docs | a module | ✅ | |
| `refactor-safe.md` | refactor | a file | ✅ | |
| `tighten-types.md` | refactor | a file | ✅ | |
| `add-validation.md` | refactor / hardening | a function / file | ✅ | |
| `debug-failure.md` | debug | a stack trace / failing output | ✅ | |
| `pr-description.md` | workflow / docs | a diff / branch | ✅ | |
| `sanitize-doc.md` | data hygiene | a doc with sensitive data | ✅ | |

**Coverage met:** tests, review, docs, refactoring, debug (+ security & data
hygiene). Every prompt ships **both dialects** (markdown + XML); all use the
`$ARGUMENTS` convention. See `docs/walkthrough.md` for the full checklist.

## Using the commands

Two prompts are promoted to Claude Code slash commands in `.claude/commands/`.
Claude Code auto-discovers them — type `/` to list them. Whatever you type after
the command name replaces `$ARGUMENTS` in the command body.

```bash
# Generate the edge-case tests a file's smoke tests skip
/add-tests app/src/money.ts

# Adversarially review a file before merge
/review app/src/money.ts

# Review a diff instead of a file (shell substitution runs before send)
/review "$(git diff main...HEAD)"
```

Notes:

- **`argument-hint`** in each command's frontmatter previews the expected arg as
  you type (e.g. `<path to file under test>`).
- **No argument?** `$ARGUMENTS` is empty, so the command falls back to asking you
  for a target — always pass one.
- **Scope:** project commands live in `.claude/commands/` (shared via git);
  personal ones go in `~/.claude/commands/`.
- **Other tools:** Cursor reads `.cursor/commands/`. For GPT/Copilot/ChatGPT,
  there's no `/command` — open the matching `prompts/<name>.md`, copy the markdown
  block, and substitute the file path for `$ARGUMENTS` by hand.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
