# UDC Workshop 2 — Homework (prompt engineering & security)

Starter repo for the second homework of the UDC "Modern Development with Agentic
AI" course.

> Workshop 2: **Промпт-інженерія та безпека роботи з AI** (Prompt engineering & security)
> Автор: В'ячеслав Колдовський (Programming Mentor)

This is an **artifacts-first** exercise: you build a reusable **prompt cookbook**,
a **data-sanitization checklist**, and a **prompt-injection defense** — concrete
files you can bring straight to your team. ~2–3 hours.

## Quick start

```bash
gh repo fork koldovsky/2026-udc-02-prompt-engineering-security-hw --clone
cd 2026-udc-02-prompt-engineering-security-hw
git checkout -b ws02/<github-username>
cd app && npm install && npm test && cd ..
# follow docs/walkthrough.md
gh pr create --title "WS2: <your name>" --fill
```

Full step-by-step instructions: [`docs/walkthrough.md`](docs/walkthrough.md).

## What's in here

| Path | Purpose |
|---|---|
| `docs/walkthrough.md` | Step-by-step: setup, Tasks A–D, Definition of Done |
| `app/` | Tiny TS sample — the cookbook target (has a bug to review) |
| `materials/weak-prompt.md` | Weak prompt to improve (Task A) |
| `materials/sensitive-ticket.md` | **Synthetic** sensitive doc to sanitize (Task B) |
| `materials/decoy-doc.md` | Prompt-injection decoy (Task C) |
| `prompts/_template.md` · `prompts/review-pr.md` | Prompt template + one worked example |
| `docs/templates/` | Skeletons for your reports |
| `.github/pull_request_template.md` | PR checklist (auto-applied) |
| `.coderabbit.yaml` | CodeRabbit auto-review tuned to this homework's DoD |
| `AGENTS.md` | Baseline guidance for your Agentic IDE |
| `scripts/sanitize.mjs` | Local, deterministic data sanitizer (Task B) — see below |

You create: `prompts/*.md` (10+), `.cursor/commands/` or `.claude/commands/`,
`docs/sanitized-ticket.md`, `docs/sanitization-checklist.md`,
`docs/injection-report.md`, `docs/context-layer.md`, and (bonus)
`docs/ab-experiment.md`.

> ⚠️ Everything in `materials/` is **synthetic** — a teaching example of "what
> sensitive looks like", not real people. Your PR must contain **no real
> secrets or PII**.

## Data sanitizer (Task B)

`scripts/sanitize.mjs` turns a sensitive document into a shareable copy
**locally** — the original never goes near a model. It applies a single ordered
list of traffic-light rules (redaction / masking / synthetic / secrets
out-of-band), preserves the underlying task, appends a redaction log, and runs a
**leak check** that exits non-zero if any known secret/PII pattern survives.

```bash
node scripts/sanitize.mjs                                   # defaults below
node scripts/sanitize.mjs <input.md> <output.md>            # explicit paths
# default in : materials/sensitive-ticket.md
# default out: docs/sanitized-ticket.md
# exit codes : 0 ok · 1 input missing · 2 leak check failed
```

Why a script and not a prompt: you must never paste raw secrets/PII into a public
model. A local, deterministic script is auditable, repeatable, and safe — see
`docs/sanitization-checklist.md` for the full team process.

## Tools

Cursor / Claude Code / GitHub Copilot (at least one) + a GitHub account +
Node 22+. Questions → the course chat (feedback within 2 weeks).
