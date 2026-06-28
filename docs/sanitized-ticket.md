<!--
============================================================================
SANITIZED for AI use. Derived from materials/sensitive-ticket.md (synthetic).
All 🔴 values (PII, banking data, secrets) have been redacted, masked, or
synthesized. Secrets were NOT placed in this document — they were handed over
out-of-band. The reported bug remains fully diagnosable. See Task B in
docs/walkthrough.md and docs/sanitization-checklist.md.
============================================================================
-->

# JIRA-4821 — Bug: incorrect fee calculation for premium accounts

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER]

## Description

A customer reported that the transfer fee is charged twice. Reproducible on a
specific account. Customer data and a log excerpt for reproduction are below.

## Customer data (from CRM)

- Name: **[CUSTOMER_1]**
- email: **[CUSTOMER_1_EMAIL]**
- phone: **+380 ** *** ** ****
- date of birth: **[REDACTED — DOB]**
- card: **\*\*\*\*-\*\*\*\*-\*\*\*\*-1234** (Visa, exp [REDACTED], CVV [REDACTED])
- IBAN: **<IBAN>**
- balance: **[REDACTED — balance]**
- passport: **[REDACTED — passport]**, tax id (RNOKPP): **[REDACTED — tax id]**

> Card masked to last 4 digits so the support team can still match the
> account; CVV is never stored or shared.

## Reproduction steps (from production log)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> The connection string and API key from the original log are **secrets** —
> removed here and shared out-of-band (secret store / env). If they were ever
> exposed in a real log, they must be rotated.

## Internal logic (from payments-core repo) — 🟡 enterprise / no-train only

Double charge in `FeeCalculator.applyTransferFee()` — the fee is added both in
`preAuthorize()` and in `settle()`. Branch: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- The fee is charged **exactly once** per transfer.
- Regression test for the pre-auth → settle scenario.
- No change to the public `FeeCalculator` API.
