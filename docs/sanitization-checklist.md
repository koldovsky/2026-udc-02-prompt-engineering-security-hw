# Data Sanitization Checklist for AI

> Reusable team reference. Before pasting any document into a model, work through
> this list top to bottom.

---

## 1. Classify (traffic light)

- [ ] **🔴 Never public** — secrets (keys, tokens, passwords, connection strings),
      PII (full name, email, phone, date of birth, passport, tax ID), banking data
      (card number, CVV, IBAN, account number, balance), production dumps and real
      logs, medical / government / regulated data.
- [ ] **🟡 Enterprise / no-train only** — internal business logic under NDA, method /
      component / branch names, DB schemas, architecture decisions, tickets with
      context, anonymized logs without real values.
- [ ] **🟢 Safe to share publicly** — public / OSS code, synthetic examples, general
      technical questions, documentation without data, stack traces without real values.
- [ ] **When in doubt → treat as 🔴.**

---

## 2. What to look for (quick scan)

| What | Example | Class |
|------|---------|-------|
| Full name | Elena Petrівna Shevchenko | 🔴 |
| Email, phone | user@example.com, +380 50 … | 🔴 |
| Date of birth, passport, tax ID | 14.03.1987, ФЯ 123456 | 🔴 |
| Card, CVV, IBAN, balance | 4111 …, UA90 … | 🔴 |
| Connection string / DSN | postgres://user:pass@host/db | 🔴 |
| API key / token / secret | sk-live-…, ghp_… | 🔴 |
| Production log with real IDs/values | txn=TX-99812 account=UA90… | 🔴 |
| Internal method / component / branch | FeeCalculator, feat/PSD2-fee-refactor | 🟡 |
| Internal service / repo name | payments-core, fee-service | 🟡 |
| General task description, AC without data | "fee is charged twice" | 🟢 |

---

## 3. How to sanitize (technique by category)

| Technique | When to use | Example |
|-----------|-------------|---------|
| **Redaction** — remove entirely | Field is not needed for the task | `phone: [REDACTED]` |
| **Masking** — keep format, remove value | Model needs structure (e.g. card type) | `****-1234`, `<IBAN>` |
| **Synthetic** — replace with realistic fake | A "real-looking" value is needed for reproduction | `[CUSTOMER_1]`, `TX-XXXXX` |
| **Out-of-band** — do not provide at all | Secrets (keys, passwords, DSNs) | `<SECRET_OUT_OF_BAND>` — never write into the document; pass via env / secret store |

> ⚠️ Secrets must **not be masked — they must not be provided at all**. If a secret
> has already appeared in a ticket or log — **rotate it immediately**, even if it
> looks synthetic in this example.

---

## 4. Verify before sending

- [ ] Can a person be re-identified from the remaining fields? (name + DOB + city + role → yes)
- [ ] Is there sensitive data in an embedded URL, screenshot, attachment, or log?
- [ ] Is the **task still intact** after sanitization? (the model must still understand the bug)
- [ ] Does the tool/tier match the data category? (🟡 → no-train, 🔴 → do not send)

---

## 5. Tool / tier by category

| Category | Allowed tool / tier | Notes |
|----------|---------------------|-------|
| 🟢 | Any public tool (ChatGPT free, Claude.ai, Copilot) | No restrictions |
| 🟡 | **Claude for Work** (no-train) / **GitHub Copilot Business** / **Azure OpenAI** (data residency) | Confirm the org has disabled training on data; prefer data residency in the required region (EU / Ukraine) |
| 🔴 | **Do not send to any model.** Process locally only — manually or via script. If unavoidable, use an air-gapped self-hosted model (e.g. Ollama, private Azure). | Rotate secrets after any suspected exposure |

> **Tier choice for 🟡 data:** Claude for Work and Copilot Business are the recommended
> team default. Both offer no-train guarantees (data is not used for fine-tuning), and
> Azure OpenAI additionally provides data residency — critical for financial organizations
> subject to GDPR / NBU regulations.

---

## 6. If a leak occurs

- [ ] Rotate compromised secrets **immediately** (even if you think "nothing happened").
- [ ] Notify the security lead / DPO within 1 hour.
- [ ] Document: what was exposed, where, when, which model/tier was used.
- [ ] Update this checklist to prevent recurrence.
