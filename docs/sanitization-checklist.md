# Data sanitization checklist for AI (team: Crazy Dudes)

> Reusable checklist — bring it to your team. Run any document through this
> before pasting it into an AI tool. Derived from
> `docs/templates/sanitization-checklist.md`.

## 1. Classify (traffic light)

- [ ] **🔴 Never to a public model:** secrets (keys, tokens, passwords,
      connection strings), PII (name, email, phone, DOB, passport, tax id),
      banking secrecy (card, CVV, IBAN, account, balance), production
      data/dumps, medical/government/regulated data.
- [ ] **🟡 Enterprise / no-train only:** internal code under NDA, business
      logic, DB schemas, architecture, tickets with context, anonymized logs.
- [ ] **🟢 May go to a public model:** public/OSS code, synthetic data, general
      questions, docs without data, stack traces without values.
- [ ] When in doubt → treat as 🔴.

## 2. Clean (technique per category)

- [ ] **Redaction** — remove entirely (`[REDACTED]`): anything the task does not
      need.
- [ ] **Masking** — keep the format, drop the value (`****-1234`, `<IBAN>`):
      when the model needs the structure.
- [ ] **Synthetic** — replace with realistic fake data: when "real-looking"
      values are needed to reproduce.
- [ ] **Secrets — out-of-band:** do not mask, **do not provide at all** (env /
      secret store); if they leaked, **rotate** them.

## 3. Check before sending

- [ ] Can the person be re-identified from the remaining fields?
      (name + DOB + city + role)
- [ ] Does an attached URL / screenshot / log carry anything sensitive?
- [ ] Is the **task** still intact after sanitization?
- [ ] Does the tool/tier match the data category? (no-train for 🟡)

## 4. Tool per category

| Category | Allowed tool / tier | Notes |
|---|---|---|
| 🟢 | Any model (Claude, Copilot, public chat) | No restriction; still avoid pasting volume you don't need. |
| 🟡 | Copilot Business / Claude for Work (Team/Enterprise) — **no-train**, zero data retention | Enterprise tier so prompts are not used for training; check **data residency** if EU-regulated data is involved. |
| 🔴 | **Never to a model** — mask/redact/synthesize locally first | Secrets go to a secret store, never to a prompt; reproduce locally if real values are required. |

## 5. If a leak happens

- [ ] Rotate compromised secrets immediately.
- [ ] Notify the owner (security / lead).
- [ ] Record the incident and update this checklist.
