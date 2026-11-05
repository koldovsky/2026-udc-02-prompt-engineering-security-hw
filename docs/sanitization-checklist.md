# Data sanitization checklist for AI tools (team: <your team>)

> Reusable checklist: run it **every time** before a ticket, log, diff, dump,
> screenshot or document goes into an AI model (chat, agent, review bot).
> Worked example: [`docs/sanitized-ticket.md`](./sanitized-ticket.md).

## Real data rule

Sanitize **locally** — manually or with a script (regex / DLP / log scrubber) —
**before** any model sees the data. Never paste the original into a model and
ask it to sanitize: by then the data has already left your machine.

## 1. Classify (traffic light)

- [ ] **🔴 Never to a model (local only):**
  - Secrets: API keys (`sk-live-…`, `X-API-Key: …`), tokens, passwords,
    private keys, `.env` contents, **connection strings**
    (`postgres://user:<password>@host:port/db`, JDBC/Redis/Mongo URIs).
  - PII: full name, email, phone, date of birth, home address, passport,
    tax ID / national ID, photos of documents.
  - Banking secrecy: card number (PAN), CVV, expiry, IBAN / account number,
    balance, transaction history tied to a person.
  - Production data: DB dumps, raw production **logs** that contain any of the
    above, session cookies, request headers with auth.
  - Infrastructure: **internal IPs** (`10.x`, `172.16–31.x`, `192.168.x`),
    internal hostnames, VPN/bastion addresses.
  - Medical, government, or other regulated data.
- [ ] **🟡 Enterprise / no-train tier only:**
  - Internal code under NDA, business logic, class/method names.
  - DB schemas, architecture diagrams, service names, component and branch names.
  - Tickets with internal context, **anonymized** logs (values masked).
- [ ] **🟢 Any tool:**
  - Public/OSS code, synthetic data, general "how do I…" questions.
  - Documentation without data, stack traces without values.
  - Task description and acceptance criteria without data.
- [ ] In doubt → treat it as 🔴.

## 2. Clean (technique per category)

- [ ] **Redaction**: remove entirely (`[REDACTED]`) when the task doesn't need
      the value (DOB, passport, tax ID, CVV, expiry).
- [ ] **Masking**: keep the format, drop the value, when the model needs the
      structure: `****-1234`, `<IBAN>`, `<EMAIL>`, `<PHONE>`, `<DECIMAL>`,
      `<INTERNAL_HOST>`. Use **stable** placeholders (`[CUSTOMER_1]`,
      `[CUSTOMER_2]`) so relationships between records survive.
- [ ] **Synthetic**: substitute realistic fake data when you need "real-looking"
      input to reproduce a bug (fake IDs in the same pattern, test card numbers,
      `example.test` domains).
- [ ] **Secrets go out-of-band**: don't mask them, **remove** them
      (`<SECRET_OUT_OF_BAND>`). The model never needs a real credential; the
      code reads it from env / secret store at runtime.
- [ ] **Rotate** any secret that was ever in a ticket, log, chat, commit or
      screenshot, even if it is "only internal".
- [ ] Logs: scrub with a script (regex for emails, IBANs, PANs, IPs, `key=`,
      `password=`, `Authorization:`), then keep timestamps, levels, ids
      (synthetic) and numeric values the bug depends on.

## 3. Check before sending

- [ ] **Re-identification:** can a person still be identified from the remaining
      fields combined (name + DOB + city + job title, unique amount + date,
      rare account type)? If yes, generalize or remove more.
- [ ] **Hidden carriers:** URLs (query strings, signed links), screenshots
      (tabs, address bar, notifications), stack traces and logs (headers,
      connection strings), file metadata, git history.
- [ ] **Task preserved?** Read the sanitized version as an outsider: can the
      bug/task still be understood and solved? If not, add back structure
      (masked or synthetic), never real values.
- [ ] **Tool tier matches the category?** 🟡 only to no-train tiers; 🔴 to none.
- [ ] Final scan: grep the output for the original values (or run the scrubber
      again) before sending.

## 4. Tool by category

| Category | Allowed tool / tier | Notes |
|---|---|---|
| 🟢 | Any tool, including free/consumer chats | Still no secrets; data may be used for training. |
| 🟡 | Enterprise / no-train tiers only: Cursor with Privacy Mode ON or Cursor Business, GitHub Copilot Business/Enterprise, Claude for Work (Team/Enterprise), ChatGPT Enterprise/Team | Check data residency and retention if contracts or regulators require them. |
| 🔴 | **Never to any model.** Local only: manual handling, local scripts, or a fully on-prem/local model approved by security | Sanitize first. After sanitizing, the result is 🟡 or 🟢 and follows that row. |

**My current setup:** Cursor Pro, Privacy Mode = **ON**. That means **no training**
on my code/prompts, but it is **not zero data retention**: code may be stored to
provide features such as Background Agent. So:

- 🟢: OK.
- 🟡: OK (no-train). For code under strict NDA or data-residency rules,
  confirm with the team that "stored but not trained on" is acceptable;
  otherwise use a Business/ZDR tier.
- 🔴: **Not OK**, even with Privacy Mode. Sanitize locally first.

## 5. If a leak happens

- [ ] **Rotate** compromised secrets immediately (keys, passwords, tokens);
      revoke sessions.
- [ ] **Notify** the owner (security / team lead / DPO for PII) on the same day.
- [ ] Delete the chat/conversation and request deletion from the vendor if
      the tier allows it; remove the data from commits (history rewrite + rotate).
- [ ] **Record** the incident (what, where, which tool/tier, when) and update
      this checklist, e.g. with a new scrubber regex.
