---
name: environment-description
description: Generate docs/env.md with an accurate stack and environment inventory from repo sources. Use for onboarding or context curation.
version: 1
---

# Environment description

Produces `docs/env.md` — a factual inventory of technologies, libraries (with
versions), tooling, and runtime requirements for this homework repo and its
`app/` sample project.

## Baseline (weak) — what you started from

```
опиши стек проекту
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer and staff engineer in this repo. You document only what you can verify from files and commands.
Goal: Create or update `docs/env.md` with a detailed, accurate description of the project environment and technology stack.
Context:
- Monorepo-style homework repo (UDC WS2): root holds docs, prompts, materials; runnable code lives in `app/`.
- Primary sources (read these — do not guess):
  - `app/package.json`, `app/package-lock.json` (if present) — dependencies and resolved versions
  - `app/tsconfig.json` — TypeScript compiler options
  - `app/README.md`, root `README.md`, `AGENTS.md`, `docs/walkthrough.md` — setup, Node version, purpose
  - `.coderabbit.yaml`, `.github/pull_request_template.md` — review/CI context (brief)
- Verify versions: run `node -v` and `npm test` / `npm run typecheck` from `app/` when possible; if lockfile exists, cite resolved versions from it.
Constraints:
- Create or overwrite ONLY `docs/env.md`. Do NOT change application code, `package.json`, or other docs.
- Facts only — no marketing fluff. If a value is unknown, write "not specified" rather than inventing it.
- Never read `.env` or files containing secrets (`KEY`, `TOKEN`, `SECRET`). Do not include secret paths or real credentials.
- No PII. Placeholder examples only if needed.
- Language: Ukrainian or English (match the language of the user request; default Ukrainian if unclear).
Acceptance criteria:
- `docs/env.md` exists and includes at minimum these sections (use `##` headings):
  1. **Overview** — what the repo is and what `app/` is for (1 short paragraph).
  2. **Runtime requirements** — Node.js version (from walkthrough/docs), package manager (npm), OS notes if documented (e.g. Windows/Git Bash).
  3. **Application stack (`app/`)** — TypeScript, module system (`"type": "module"`), target/module settings from `tsconfig.json`.
  4. **Dependencies** — table or bullet list: package name, version (exact from lockfile or semver from `package.json`), role (e.g. test runner, compiler); separate **production** vs **dev** if applicable.
  5. **npm scripts** — each script from `app/package.json` with one-line explanation.
  6. **Project layout** — key paths (`app/src/`, `prompts/`, `materials/`, `docs/`) and what they contain.
  7. **Tooling & workflow** — vitest usage, typecheck, CodeRabbit auto-review, Agentic IDE context (`AGENTS.md`) — factual, brief.
  8. **Common commands** — copy-paste block: install, test, typecheck, from correct directory.
  9. **Generated** — date or note "versions as of …" based on files read.
- Versions in the doc must match `package.json` / lockfile (no stale or hallucinated numbers).
- Document is readable standalone (new teammate can onboard without reading the whole repo).
Output:
- Path: `docs/env.md`
- Short summary in chat: sections written + how versions were verified (lockfile / npm list / package.json).
Stop rules:
- Required source files missing (e.g. no `app/package.json`) → stop and list what is missing; do not create `docs/env.md` with guessed stack.
- Need to modify files other than `docs/env.md` → stop and ask.
- `.env` or secret files would be needed for accuracy → stop; document only non-secret stack.
- `docs/env.md` already exists and is accurate → ask before overwriting, or update only stale version numbers if user requested refresh.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer in this homework repo. Create docs/env.md — factual
stack and environment inventory. Read app/package.json, lockfile if present,
app/tsconfig.json, README/AGENTS/walkthrough. Verify versions from files or
npm/node commands. Never read .env or secret files. Overwrite only docs/env.md.
</instructions>

<context>
Repo: UDC WS2 homework — prompts/materials/docs at root; sample TS app in app/.
Stack centers on TypeScript + vitest. Node 22+ per walkthrough. ESM ("type":"module").
</context>

<constraints>
- Output file: docs/env.md only. Ukrainian or English per user preference.
- Sections: Overview, Runtime requirements, Application stack, Dependencies (with
  versions), npm scripts, Project layout, Tooling & workflow, Common commands, Generated note.
- Facts from repo only; "not specified" if unknown. No secrets/PII.
</constraints>

<output_format>
docs/env.md (full markdown) + chat summary: sections + version verification method.
Stop if app/package.json missing; if other files need edits; if secrets required.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | section checklist + verification workflow |
| XML | Claude Code / Claude | holds "facts only" and file-scope across long reads |

## Verified

- [x] Run against this repo; `docs/env.md` created with real versions from `app/`
- [x] Agent stayed in scope; no code or `package.json` changes
