# Data sanitization checklist for AI (team: payments-core)

> Reusable checklist for preparing documents before sending them to an AI tool.
> Goal: keep the *task* intact while removing anything sensitive. Bring this to
> teammates. Derived from `docs/templates/sanitization-checklist.md`.

## 1. Classify (traffic light)

- [ ] **🔴 Never to a public model:** secrets (keys, tokens, passwords,
      connection strings), PII (name, email, phone, DOB, passport, tax ID),
      banking secrecy (card, CVV, IBAN, account, balance), production
      data/dumps, medical/government/regulated data.
- [ ] **🟡 Enterprise / no-train only:** internal code under NDA, business logic,
      DB schemas, architecture, tickets with context, anonymized logs,
      component/branch names.
- [ ] **🟢 Public-safe:** public/OSS code, synthetic data, general questions,
      docs without data, stack traces without values.
- [ ] When in doubt → treat as 🔴.

## 2. Clean (technique per category)

- [ ] **Redaction** — remove entirely (`[REDACTED]`): anything the task doesn't need
      (DOB, CVV, passport, balance).
- [ ] **Masking** — keep the format, drop the value (`****-1234`, `<IBAN>`):
      when the model needs structure, not the real value.
- [ ] **Synthetic** — replace with realistic fake data (`[CUSTOMER_1]`,
      `ACCT_TOKEN_1`): when realistic-looking values are needed to reproduce.
- [ ] **Secrets — out-of-band:** never mask, **never include at all**
      (env / secret store). If they were exposed → **rotate immediately**.

## 3. Verify before sending

- [ ] Can the person be re-identified from remaining fields? (name + DOB + city + role)
- [ ] Does an embedded URL / screenshot / log line still carry something sensitive?
- [ ] Is the **task** still solvable after sanitization?
- [ ] Does the tool/tier match the data category? (no-train for 🟡)

## 4. Tool per category (our team)

| Category | Allowed tool / tier | Notes |
|---|---|---|
| 🟢 | Any (Copilot, ChatGPT, Claude) | synthetic/public only |
| 🟡 | Copilot Business / Claude for Work — **no-train, enterprise, EU data residency** | internal code & ticket context |
| 🔴 | No model — handle locally; mask/redact first, secrets stay in the secret store | rotate if exposed |

### Why this tier for 🟡 data

For internal-but-not-secret material (component names, branch, business logic) we
choose an **enterprise / no-train** tier (e.g. Copilot Business or Claude for
Work): prompts are **not used for training**, there's an **org data-processing
agreement**, and **EU data residency** matches our compliance posture. That lets
us share the context the model needs to locate a fix, without the IP leaking into
a public training set.

## 5. If a leak happens

- [ ] Rotate the compromised secrets immediately.
- [ ] Notify the owner (security / lead).
- [ ] Record the incident and update this checklist.

