<!--
Sanitized version of materials/sensitive-ticket.md (Task B).
Source is SYNTHETIC training data; this output contains NO real values.
Techniques applied: redaction, masking (format-preserving), synthetic
substitution, and out-of-band handling for secrets. The engineering task is
fully preserved — the model can still understand and fix the bug.
-->

# JIRA-4821 — Bug: fee calculated twice for premium accounts

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER_1]

## Description

A customer reported that the transfer fee is charged twice. It reproduces on one
specific account. Customer data and a reproduction log excerpt are below — all
values are masked/synthetic; the defect itself is unchanged.

## Customer data (from CRM)

| Field | Value | Technique |
|---|---|---|
| Name | `[CUSTOMER_1]` | redaction (not needed to fix the bug) |
| Email | `[CUSTOMER_1]@example.test` | masked |
| Phone | `+380 50 ••• •• ••` | masked |
| Date of birth | `[REDACTED]` | redaction (re-identification risk) |
| Card | `****-****-****-1234` (Visa) | masked (last 4 kept for support match) |
| Card exp / CVV | `[REDACTED]` / `[REDACTED]` | redaction (never needed) |
| IBAN | `<IBAN>` | masked |
| Balance | `<AMOUNT> UAH` | redaction (irrelevant to the fee logic) |
| Passport | `[REDACTED]` | redaction |
| Tax ID (RNOKPP) | `[REDACTED]` | redaction |

> Account identifier used only as an opaque token below: `ACCT_TOKEN_1`.

## Reproduction steps (from a production log, scrubbed)

```text
2026-05-30 14:02:11 INFO  txn=TX-0001 account=ACCT_TOKEN_1 amount=<AMOUNT> fee=<FEE>
2026-05-30 14:02:11 INFO  txn=TX-0001 fee applied twice -> total fee = 2 x <FEE>
2026-05-30 14:02:12 DEBUG db=<DB_CONNECTION_STRING_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> 🔴 The original log contained a live DB connection string and an API key.
> These are **secrets**, not data: they were removed entirely and handled
> **out-of-band** (secret store / env), never masked into the document or a
> prompt. If they were ever real, the correct action is to **rotate them**.

## Internal logic (from the payments-core repo)

The doubling is in `FeeCalculator.applyTransferFee()`: the fee is added in both
`preAuthorize()` and `settle()`. Branch: `feat/PSD2-fee-refactor`.

> 🟡 Component/branch/method names are internal (no-train tier). Kept because
> they are needed to locate the fix; route only to an enterprise/no-train tool.

## Acceptance criteria

- The fee is charged **exactly once** per transfer.
- A regression test for the pre-auth → settle scenario.
- No change to the public `FeeCalculator` API.

---

### What was preserved vs removed

- **Preserved (🟢/🟡):** the bug (double-charged fee), the location
  (`applyTransferFee` across `preAuthorize`/`settle`), and the acceptance
  criteria — enough for a model to reason about and fix it.
- **Removed/masked (🔴):** all PII, card/CVV/IBAN/balance, passport, tax ID, and
  both secrets (DB string, API key → out-of-band).

