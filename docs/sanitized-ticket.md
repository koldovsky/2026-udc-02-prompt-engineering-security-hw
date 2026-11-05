# Sanitized ticket — JIRA-4821 (Task B)

- **Source:** `materials/sensitive-ticket.md` (synthetic training data, not real people or systems).
- **Method:** manual traffic-light classification (🔴 / 🟡 / 🟢), then per-field
  technique: **redaction**, **masking**, **synthetic replacement**, and **out-of-band**
  for secrets. The original was translated to English; structure and task kept 1:1.
- **Real-data rule:** for real data, sanitization must be done **locally** —
  manually or by a script (regex/DLP) — **before** any model sees the document.
  Never paste the original into a public model to "ask it to sanitize".

## Classification

| # | Field (by type) | Category | Technique | Replacement |
|---|---|---|---|---|
| 1 | Reporter's work email (employee PII) | 🔴 | Synthetic | `[REPORTER_1]` |
| 2 | Customer full name | 🔴 | Synthetic placeholder | `[CUSTOMER_1]` |
| 3 | Customer personal email | 🔴 | Masking | `<EMAIL>` |
| 4 | Customer phone number | 🔴 | Masking | `<PHONE>` |
| 5 | Date of birth | 🔴 | Redaction | `[REDACTED]` |
| 6 | Card number (PAN) | 🔴 | Masking (last 4 only) | `****-1234` |
| 7 | Card brand, expiry date, CVV | 🔴 | Redaction (CVV/expiry never kept) | removed |
| 8 | IBAN | 🔴 | Masking | `<IBAN>` |
| 9 | Account balance | 🔴 | Masking | `<DECIMAL>` |
| 10 | Passport number | 🔴 | Redaction | `[REDACTED]` |
| 11 | Tax ID (RNOKPP / ІПН) | 🔴 | Redaction | `[REDACTED]` |
| 12 | Account number in log lines (partially masked IBAN) | 🔴 | Masking | `<IBAN>` |
| 13 | Production transaction id | 🟡 | Synthetic (same `TX-NNNNN` pattern) | `TX-00001` |
| 14 | DB connection string (user, password, host, port, prod DB name) | 🔴 secret | Out-of-band (removed, not masked) | `<SECRET_OUT_OF_BAND>` |
| 15 | Internal DB host / private IP | 🔴 | Masking | `<INTERNAL_HOST>` |
| 16 | Live API key for fee-service | 🔴 secret | Out-of-band (removed, not masked) + rotate | `<SECRET_OUT_OF_BAND>` |
| 17 | Ticket id, component name, branch name | 🟡 | Kept (see note) | unchanged |
| 18 | Class/method names, fee logic description | 🟡 | Kept — needed for the fix | unchanged |
| 19 | Timestamps, amount, fee values 2.50 / 5.00, log levels | 🟢 | Kept — reproduce the bug | unchanged |
| 20 | Bug description, acceptance criteria | 🟢 | Kept | unchanged |

**Note on 🟡 items (component / branch / internal logic):** these are internal but
contain no PII or secrets, and the model needs them to locate the bug. They are
kept **only** because the target tool is a no-train tier (Cursor Pro with Privacy
Mode ON). For a 🟢-only (public/consumer) tool, replace them with `<COMPONENT>`,
`<BRANCH>` and a generic description of the fee flow.

## Sanitized ticket

> # JIRA-4821 — Bug: incorrect fee calculation for premium accounts
>
> **Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER_1]
>
> ## Description
>
> A customer complained that the transfer fee is charged twice. Reproducible on
> a specific account. Customer data and a log excerpt for reproduction are below.
>
> ## Customer data (from CRM)
>
> - Full name: **[CUSTOMER_1]**
> - email: **<EMAIL>**
> - phone: **<PHONE>**
> - date of birth: **[REDACTED]**
> - card: **\*\*\*\*-1234** (expiry and CVV removed)
> - IBAN: **<IBAN>**
> - balance: **<DECIMAL>**
> - passport: **[REDACTED]**, tax ID: **[REDACTED]**
>
> ## Reproduction steps (from production log)
>
> ```
> 2026-05-30 14:02:11 INFO  txn=TX-00001 account=<IBAN> amount=1000.00 fee=2.50
> 2026-05-30 14:02:11 INFO  txn=TX-00001 fee applied twice -> total fee 5.00
> 2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND> (host: <INTERNAL_HOST>)
> 2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
> ```
>
> ## Internal logic (from the payments-core repository)
>
> The doubling is in `FeeCalculator.applyTransferFee()` — the fee is added in both
> `preAuthorize()` and `settle()`. Branch: `feat/PSD2-fee-refactor`.
>
> ## Acceptance criteria
>
> - The fee is charged **exactly once** per transfer.
> - A regression test for the pre-auth → settle scenario.
> - No change to the public API of `FeeCalculator`.

## Task preserved?

Yes. The log still shows one 1000.00 transfer with fee 2.50 turning into a total
fee of 5.00, and the ticket names the cause: `applyTransferFee()` runs in both
`preAuthorize()` and `settle()`. A model can apply the fee in one phase only, add
a pre-auth → settle regression test, and keep the `FeeCalculator` API unchanged.
None of the removed values (identity, card, IBAN, balance, credentials) is needed for that.
