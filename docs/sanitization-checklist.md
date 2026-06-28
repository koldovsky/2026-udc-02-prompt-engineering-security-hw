# Data sanitization checklist for AI (team: SecondLine Team)

> Reusable checklist for preparing any document before sending it to an AI tool.
> Goal: keep the **task** intact while stripping anything sensitive. Sanitize
> **locally** — never paste the original (unsanitized) content into a public
> model. When in doubt, treat data as 🔴. Derived from
> `docs/templates/sanitization-checklist.md`.

## 1. Classify (traffic light)

- [ ] **🔴 Never to a public model:** secrets (keys, tokens, passwords, connection
      strings), PII (name, email, phone, DOB, passport, tax ID), banking secrecy
      (card, CVV, IBAN, account, balance), production data/dumps,
      medical/government/regulated data.
- [ ] **🟡 Enterprise / no-train only:** internal code under NDA, business logic,
      DB schemas, architecture, component/branch names, tickets with context,
      anonymized logs.
- [ ] **🟢 Public-safe:** public/OSS code, synthetic data, general questions, docs
      without data, stack traces without values.
- [ ] When in doubt → treat as 🔴.

## 2. Clean (technique per category)

- [ ] **Redaction** — remove entirely (`[REDACTED]`): fields the task doesn't need
      (e.g. CVV, DOB, passport, balance).
- [ ] **Masking** — keep the format, drop the value (`****-1234`, `<IBAN>`): when the
      model needs the shape, not the real value.
- [ ] **Synthetic** — substitute realistic fake values (`[CUSTOMER_1]`, `ACCT_TOKEN_1`):
      when real-looking data is needed to reproduce the issue.
- [ ] **Secrets — out-of-band:** never mask, **never include at all** (env / secret
      store). If they were ever exposed → **rotate immediately**.

## 3. Verify before sending

- [ ] Can the person be re-identified from the remaining fields? (name + DOB + city + role)
- [ ] Does an embedded URL / screenshot / log line still carry something sensitive?
- [ ] Is the **task** still solvable after sanitization?
- [ ] Does the tool/tier match the data category? (no-train for 🟡)

## 4. Tool per category

| Category | Allowed tool / tier | Notes |
|---|---|---|
| 🟢 | Any (Copilot, ChatGPT, Claude) | synthetic / public only |
| 🟡 | Copilot Business / Claude for Work — **no-train, enterprise, EU data residency** | sanitized internal code & ticket context |
| 🔴 | **No model** — handle locally; mask/redact first; secrets stay in the secret store | rotate if exposed |

## 5. If a leak happens

- [ ] Rotate the compromised secrets immediately.
- [ ] Notify the owner (security / lead).
- [ ] Record the incident and update this checklist.
