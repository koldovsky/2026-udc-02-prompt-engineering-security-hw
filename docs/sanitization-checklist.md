# Data Sanitization Checklist for AI Use

Use this checklist before pasting tickets, logs, code snippets, screenshots, or
documents into any AI tool.

## 1. Classify With The Traffic Light

- [ ] **Red: never send to public AI tools.** Secrets, API keys, tokens,
      passwords, private keys, connection strings, session cookies, raw customer
      PII, payment card data, CVV, IBAN/account numbers, balances, passports,
      tax IDs, production database dumps, medical data, government identifiers,
      regulated data, and anything that can identify a person.
- [ ] **Yellow: enterprise/no-train only.** Internal business logic,
      non-public code, repository names, branch names, architecture diagrams,
      sanitized logs, internal ticket context, customer scenarios with all
      identifiers removed, and implementation details under NDA.
- [ ] **Green: acceptable for normal tooling.** Public documentation, OSS code,
      synthetic examples, generic technical questions, and sanitized snippets
      that cannot identify a person, system credential, account, or private
      business process.
- [ ] When unsure, classify the data as **red** until security or a lead
      confirms otherwise.

## 2. Remove Or Transform Sensitive Values

- [ ] **Redact** values that are not needed for the task:
      `[PASSPORT_REDACTED]`, `[TAX_ID_REDACTED]`, `[CVV_REDACTED]`.
- [ ] **Mask** values when shape matters but identity does not:
      `****-1234`, `<IBAN>`, `<ACCOUNT_ID>`, `<CUSTOMER_EMAIL>`.
- [ ] **Synthesize** safe examples when realistic data helps reproduction:
      `TX-SYNTH-001`, `[CUSTOMER_1]`, `amount=1000.00`.
- [ ] **Move secrets out-of-band.** Do not paste secrets into prompts, docs, PRs,
      chat, screenshots, or logs. Use a secret store or approved environment
      channel. If a secret was exposed, rotate it.
- [ ] Preserve only the minimum data needed for the engineering question.

## 3. Specific Fields To Search For

- [ ] Names, emails, phone numbers, addresses, dates of birth, usernames.
- [ ] Passport numbers, tax IDs, government IDs, employee IDs.
- [ ] Card numbers, CVV, expiry dates, IBAN, account numbers, balances.
- [ ] API keys, bearer tokens, OAuth tokens, passwords, private keys,
      connection strings, database URLs.
- [ ] Production hostnames, IP addresses, internal URLs, tenant IDs, request IDs
      that can be linked back to a real user.
- [ ] Screenshots, attachments, stack traces, and URLs that include sensitive
      query parameters.

## 4. Pre-Flight Review Before Sending

- [ ] Could a person or account be re-identified from the remaining fields?
- [ ] Did every red value become redacted, masked, synthetic, or out-of-band?
- [ ] Does the sanitized version still preserve the actual task?
- [ ] Is the selected AI tool approved for the highest remaining category?
- [ ] Are prompts and outputs free of real secrets and real PII?

## 5. Tool / Tier Choice

| Category | Allowed tool / tier | Notes |
|---|---|---|
| Green | Standard approved AI tools | Public or fully synthetic data only. |
| Yellow | Enterprise/no-train tier with company account, access controls, and data residency where required | Suitable for sanitized internal code, business logic, and ticket context. |
| Red | Do not send to AI tools as-is | Sanitize locally first. Keep secrets out-of-band. Use approved internal systems only. |

For this homework ticket, the sanitized engineering context remains **yellow**
because it includes internal component names, method names, branch names, and
business logic. I would use an enterprise/no-train coding assistant with company
SSO, retention controls, and data residency aligned with company policy.

## 6. If Sensitive Data Was Exposed

- [ ] Rotate exposed secrets immediately.
- [ ] Revoke affected tokens, sessions, or credentials.
- [ ] Notify the security owner or team lead.
- [ ] Record where the data was sent and who had access.
- [ ] Replace the source document with a sanitized version.
- [ ] Update this checklist if the miss reveals a new pattern.
