# JIRA-4821 — Bug: incorrect fee calculation for premium accounts

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER]

## Description

A customer reported that the transfer fee is charged twice. Reproducible on a
specific account. Anonymized data and a synthetic log are provided below for reproduction.

## Customer data

- Customer: **[CUSTOMER_1]**
- Email: **[REDACTED]**
- Phone: **[REDACTED]**
- Date of birth: **[REDACTED]**
- Card: **\*\*\*\*-1234** (Visa, exp \*\*/\*\*, CVV [REDACTED])
- IBAN: **\<IBAN\>**
- Balance: **[REDACTED]**
- Passport: **[REDACTED]**, Tax ID: **[REDACTED]**

> 🔴 All fields above are PII / banking data. Do not send to any model.
> To reproduce the bug, only the account type (premium) and the scenario (pre-auth → settle) are needed.

## Reproduction steps (synthetic log)

```
2026-05-30 14:02:11 INFO  txn=TX-XXXXX account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-XXXXX fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> 🔴 The DB connection string and API key are **out-of-band**. If they appeared in
> logs or the ticket — **rotate them immediately**.

## Internal logic (from the payments-core repository)

The duplication is in `FeeCalculator.applyTransferFee()` — the fee is applied both in
`preAuthorize()` and in `settle()`. Branch: `feat/PSD2-fee-refactor`.

> 🟡 Method names, branch names, and component names are internal information covered by NDA.
> Use no-train / enterprise tier only (e.g. Claude for Work, Copilot Business).

## Acceptance criteria

- The fee is charged **exactly once** per transfer.
- Regression test for the pre-auth → settle scenario.
- No changes to the public API of `FeeCalculator`.
