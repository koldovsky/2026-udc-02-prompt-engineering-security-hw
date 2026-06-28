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
| `prompts/_template.md` · `prompts/review.md` | Prompt template + one worked example |
| `docs/templates/` | Skeletons for your reports |
| `.github/pull_request_template.md` | PR checklist (auto-applied) |
| `.coderabbit.yaml` | CodeRabbit auto-review tuned to this homework's DoD |
| `AGENTS.md` | Baseline guidance for your Agentic IDE |

You create: `prompts/*.md` (10+), `.cursor/commands/` or `.claude/commands/`,
`docs/sanitized-ticket.md`, `docs/sanitization-checklist.md`,
`docs/injection-report.md`, `docs/context-layer.md`, and (bonus)
`docs/ab-experiment.md`.

> ⚠️ Everything in `materials/` is **synthetic** — a teaching example of "what
> sensitive looks like", not real people. Your PR must contain **no real
> secrets or PII**.

## Tools

Cursor / Claude Code / GitHub Copilot (at least one) + a GitHub account +
Node 22+. Questions → the course chat (feedback within 2 weeks).
