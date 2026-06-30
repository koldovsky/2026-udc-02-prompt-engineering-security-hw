# JIRA-4821 (sanitized) — Bug: transfer fee charged twice for premium accounts

> Sanitized version of `materials/sensitive-ticket.md`, prepared for safe AI use.
> All real values are masked, replaced with placeholders, or moved out-of-band.
> The underlying task is preserved so a model can still reason about the bug.
> Technique: redaction / masking / synthetic. See `docs/sanitization-checklist.md`.

**Priority:** High · **Component:** `payments-core` (🟡 internal) · **Reporter:** `[REPORTER]`

## Description

A customer reported that the transfer fee is charged **twice**. It reproduces on a
specific premium account. Customer data and a reproduction log are below — all
sanitized.

## Customer data (from CRM) — masked

| Field | Sanitized value | Technique |
|---|---|---|
| Full name | `[CUSTOMER_1]` | placeholder |
| Email | `<EMAIL>` | redaction |
| Phone | `<PHONE>` | redaction |
| Date of birth | `<DOB>` | redaction |
| Card | `****-1234` | masking (shape kept, last 4 only) |
| IBAN | `<IBAN>` | redaction |
| Balance | `<BALANCE>` | redaction (banking secrecy) |
| Passport | `<PASSPORT>` | redaction |
| Tax ID (RNOKPP) | `<TAX_ID>` | redaction |

## Reproduction steps (from a production log) — sanitized

Secrets that appeared in the original log are **not** included here. They are
referenced out-of-band and must be **rotated** (see note below). The
amount/fee lines are kept because they demonstrate the bug.

```
<TIMESTAMP> INFO  txn=<TXN_ID> account=<IBAN> amount=1000.00 fee=2.50
<TIMESTAMP> INFO  txn=<TXN_ID> fee applied twice -> total fee 5.00
<TIMESTAMP> DEBUG db=<SECRET_OUT_OF_BAND:db-connection-string>   # rotate
<TIMESTAMP> DEBUG calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND:fee-service-api-key>   # rotate
```

## Internal logic (🟡 internal — keep only for no-train/enterprise tooling)

The fee is applied **twice**: `FeeCalculator.applyTransferFee()` adds it in both
`preAuthorize()` and `settle()`. Working branch: `<BRANCH>`.

> The method names are kept because they are needed to understand and fix the bug.
> For a **public** model, generalize them too (e.g. "the fee helper is invoked in
> both the pre-authorize and settle steps").

## Acceptance criteria (🟢 safe)

- The fee is charged **exactly once** per transfer.
- A regression test covers the pre-authorize → settle scenario.
- No change to the public `FeeCalculator` API.

---

## What was removed and why

| Category | Items | Action |
|---|---|---|
| 🔴 Secrets | DB connection string (with password), fee-service `X-API-Key` | moved **out-of-band**, flagged for **rotation** — never placed in this doc or any prompt |
| 🔴 PII | name, email, phone, DOB, passport, tax ID | redaction / placeholder |
| 🔴 Banking | card number, IBAN, balance, account in log | masking (`****-1234`) / redaction |
| 🟡 Internal | component, method names, branch | kept (needed for the task); branch generalized to `<BRANCH>`; use no-train/enterprise tooling only |
| 🟢 Safe | bug description, amount/fee figures, acceptance criteria | kept as-is |

**Re-identification check:** with name, DOB, and account all removed, the remaining
fields cannot single out a person. **Task preserved:** the double-charge in
`preAuthorize()` + `settle()` is still fully understandable.
