# JIRA-4821 — Bug: incorrect transfer-fee calculation for premium accounts

> **Sanitized for AI use.** RED data (PII, card/IBAN/balance, secrets, prod dump)
> removed or replaced with synthetic placeholders; secrets handled out-of-band;
> internal identifiers (🟡) generalized. The bug is fully reproducible from this
> description. Method: see `docs/sanitization-checklist.md`.

**Priority:** High · **Component:** `<INTERNAL_COMPONENT>` · **Reporter:** `[REPORTER_1]`

## Description

A customer reports that the transfer fee is charged twice. Reproducible on one
specific account. Customer data and a log excerpt are referenced below in
sanitized form.

## Customer data (from CRM) — synthetic placeholders

- Name: `[CUSTOMER_1]`
- email: `<EMAIL>`
- phone: `<PHONE>`
- date of birth: `<DOB>`
- card: `****-1234` (Visa, exp `<EXP>`; CVV — not stored)
- IBAN: `<IBAN>`
- balance: `<AMOUNT> UAH`
- passport: `<PASSPORT>`; tax ID (РНОКПП): `<TAX_ID>`

## Reproduction steps (sanitized log excerpt)

```
<TS> INFO  txn=<TXN_ID> account=<IBAN> amount=1000.00 fee=2.50
<TS> INFO  txn=<TXN_ID> fee applied twice -> total fee 5.00
<TS> DEBUG db=<SECRET_OUT_OF_BAND>
<TS> DEBUG calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

(Synthetic amounts kept to show the doubling: a `2.50` fee applied twice → `5.00`.)

## Internal logic (generalized)

The fee is added in **both** the pre-authorization step and the settle step of the
transfer-fee calculation, so it is applied twice. Exact class/method and branch
names are omitted (🟡 internal) — available on a trusted/enterprise channel if a
reviewer needs them.

## Acceptance criteria

- The fee is charged **exactly once** per transfer.
- Regression test for the pre-auth → settle scenario.
- No change to the public API of the fee calculator.

---

**Out-of-band (never paste into a prompt or doc):** the production DB connection
string and the live `X-API-Key` from the original log go through a secret manager /
secure channel — and must be **rotated**, since the original ticket exposed them.
