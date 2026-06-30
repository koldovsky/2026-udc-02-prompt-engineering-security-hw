# Data sanitization checklist for AI use

A reusable, bring-to-your-team checklist for preparing any document, log, or ticket
before it touches an AI model. Goal: **the model can still do the task, but no real
secret or PII ever leaves a safe boundary.** Worked example: `docs/sanitized-ticket.md`.

> Rule of thumb: do sanitization **locally** (by hand or a script). Never paste the
> original into a public model "just to clean it" — that is already a leak.

## 1. Classify (traffic light)

- [ ] **🔴 Never to a public/training model:** secrets (API keys, tokens, passwords,
      connection strings), PII (name, email, phone, DOB, passport, tax ID), banking
      data (card, CVV, IBAN, account, balance), production data/dumps, health/
      government/regulated data.
- [ ] **🟡 Enterprise / no-train only:** internal code under NDA, business logic, DB
      schemas, architecture, tickets with internal context, anonymized logs,
      component & branch names.
- [ ] **🟢 Public-safe:** public/OSS code, synthetic data, generic questions,
      docs without data, stack traces with no values.
- [ ] When in doubt → treat as **🔴**.

## 2. Sanitize (pick the technique per category)

- [ ] **Redaction** — remove entirely (`<REDACTED>` / `<EMAIL>`): data the task does
      not need.
- [ ] **Masking** — keep the shape, drop the value (`****-1234`, `<IBAN>`): when the
      model needs the structure but not the data.
- [ ] **Synthetic** — replace with realistic fake values: when you need
      "real-looking" data to reproduce a scenario.
- [ ] **Secrets → out-of-band:** do **not** mask, **do not include at all**
      (env / secret store). Reference as `<SECRET_OUT_OF_BAND:label>`. If they were
      ever exposed → **rotate** them.

## 3. Verify before sending

- [ ] Can a person be re-identified from the remaining fields? (name + DOB + city + role)
- [ ] Does an embedded URL / screenshot / log line still carry something sensitive?
- [ ] Is the **task still understandable** after sanitization?
- [ ] Does the chosen tool/tier match the data category? (no-train for 🟡)
- [ ] No secret remains in the doc **or** in the prompt itself.

## 4. Tool / tier per category (fill in for your team)

| Category | Allowed tool / tier | Why |
|---|---|---|
| 🟢 | Any assistant (default consumer tier) | no sensitive data at stake |
| 🟡 | Enterprise **no-train** tier — e.g. Claude for Work / Team, GitHub Copilot Business/Enterprise | data is excluded from training; admin controls + retention limits; check **data residency** for regulated regions |
| 🔴 | Do **not** send to any model. Keep local; mask/synthesize first, or use a self-hosted/VPC model under contract | secrets/PII/banking must never reach a third party; rotate if exposed |

> Why no-train for 🟡: the data is valuable IP/context that must not become training
> data or leak across tenants. A no-train enterprise agreement (DPA + retention
> controls + region pinning) is the minimum bar; consumer tiers are not.

## 5. If a leak happens

- [ ] Rotate the compromised secrets **immediately**.
- [ ] Notify the responsible owner (security / team lead).
- [ ] Record the incident and update this checklist so it cannot recur.
