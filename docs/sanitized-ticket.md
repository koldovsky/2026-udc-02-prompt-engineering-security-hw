# JIRA-4821 — Bug: incorrect fee calculation for premium accounts

**Priority:** High  
**Component:** payments-core  
**Reporter:** `[INTERNAL_REPORTER_EMAIL]`

## Sanitization Summary

This version preserves the engineering task while removing or replacing customer
identity data, banking details, production secrets, and production-only values.

| Category | Original risk | Sanitized handling |
|---|---|---|
| Customer identity | PII: name, email, phone, date of birth, passport, tax ID | Replaced with stable placeholders |
| Banking data | Card, CVV, IBAN, balance | Masked or replaced with placeholders |
| Production logs | Account identifiers, transaction values, internal host details | Kept as synthetic/minimal reproduction logs |
| Secrets | Database password, connection string, API key | Removed out-of-band; not included in prompt context |
| Internal implementation | Component, method names, branch | Kept as enterprise/no-train context |

## Description

A premium-account customer reported that a transfer fee is applied twice. The
issue reproduces for a premium account during the pre-authorization to settlement
flow.

## Customer Data From CRM

- Customer: `[CUSTOMER_1]`
- Email: `[CUSTOMER_1_EMAIL]`
- Phone: `[CUSTOMER_1_PHONE]`
- Date of birth: `[CUSTOMER_1_DOB]`
- Card: `****-1234` (Visa, expiry `[CARD_EXPIRY]`, CVV `[CVV_REDACTED]`)
- IBAN: `<IBAN>`
- Balance: `<ACCOUNT_BALANCE>`
- Passport: `[PASSPORT_REDACTED]`
- Tax ID: `[TAX_ID_REDACTED]`

## Reproduction Steps From Sanitized Log

```text
2026-05-30 14:02:11 INFO  txn=TX-SYNTH-001 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-SYNTH-001 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<DB_CONNECTION_STRING_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

Secrets are intentionally not provided to the model. If the original values were
ever exposed outside approved systems, rotate them and record a security
incident.

## Internal Logic

The suspected double charge is in `FeeCalculator.applyTransferFee()`: the fee is
added in both `preAuthorize()` and `settle()`. Branch:
`feat/PSD2-fee-refactor`.

This section is 🟡 enterprise/no-train context because it contains internal
business logic and repository details.

## Acceptance Criteria

- Fee is applied exactly once per transfer.
- Add a regression test for the pre-auth -> settle scenario.
- Do not change the public API of `FeeCalculator`.

## AI-Ready Prompt Context

Use only this sanitized context when asking an AI assistant for help:

```markdown
We have a payments-core bug for premium accounts. During a transfer flow, a fee
is applied in both preAuthorize() and settle(), causing the total fee to double.
Target area: FeeCalculator.applyTransferFee().

Acceptance criteria:
- Fee is applied exactly once per transfer.
- Add a regression test for the pre-auth -> settle scenario.
- Do not change the public API of FeeCalculator.

Constraints:
- Treat customer/account/log data as sanitized examples.
- Do not request or use secrets, production connection strings, API keys, raw
  customer identifiers, or production dumps.
```
