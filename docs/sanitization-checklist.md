# Data Sanitization Checklist for AI (Team: <…>)

## 1. Classify (Traffic Light)

- [ ] 🔴 — Never public:** secrets (keys, tokens, passwords, connection strings), PII (name, email, phone, date of birth, passport, tax ID), banking data (card, CVV, IBAN, account, balance), production data/dumps, medical/government/regulated data, private SSH/TLS keys, internal service credentials, audit/access logs with user actions.
- [ ] 🟡 — Enterprise/no-train only:** internal code under NDA, business logic, DB schemas, architecture, tickets with context, anonymized logs, non-public test configurations, internal tooling scripts, meeting notes with business context.
- [ ] 🟢— Safe to share publicly:** public/OSS code, synthetic data, general questions, documentation without data, stack traces without values, unit test code, public changelogs, generic error messages without sensitive values.
- [ ] When in doubt — treat as Red.

## 2. Clean (Technique by Category)

- [ ] **Redaction** — remove entirely (`[REDACTED]`): anything not needed for the task, use this technique for 🔴 PII data.
- [ ] **Masking** — preserve format, hide value (`****-1234`, `<IBAN>`): when the model needs the structure. use this technique for 🔴 banking data.
- [ ] **Synthetic** — replace with realistic fictional data: when you need "real-looking" data for reproduction for 🟡.
- [ ] **Secrets — out-of-band:** don't mask them, **don't provide them at all** (env / secret store); if they were exposed — rotate them.

## 3. Check Before Sending

- [ ] Can a person be re-identified from the remaining fields? (name + DoB + city + job title)
- [ ] Does the pasted URL / screenshot / log carry sensitive data?
- [ ] Is the **task** still preserved after sanitization?
- [ ] Does the tool/tier match the data category? (no-train for Yellow)

## 4. Tool by Category (fill in for your team)

| Category | Allowed tool / tier | Notes |
|---|---|---|
| Green | Any AI tool |  |
| Yellow | Copilot Business, GitHub Copilot |  |
| Red | internal script, local model | |

## 5. If a Leak Occurs

- [ ] Rotate compromised secrets immediately.
- [ ] Notify the responsible person (security/lead).
- [ ] Document the incident and update this checklist.
