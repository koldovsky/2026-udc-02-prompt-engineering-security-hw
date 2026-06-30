<!--
  AUTO-SANITIZED by scripts/sanitize.ts
  Rules applied (section 2 of sanitization-checklist.md):
    [🔴 Out-of-band] DB connection string with credentials
    [🔴 Out-of-band] API / secret key value
    [🔴 Masking] Payment card number (16-digit groups)
    [🔴 Masking] Card CVV
    [🔴 Masking] Card expiry date in context
    [🔴 Masking] Account balance with currency
    [🔴 Redaction] Email address
    [🔴 Redaction] Phone number (Ukrainian / international)
    [🔴 Redaction] Date of birth (DD.MM.YYYY)
    [🔴 Redaction] Passport number (Cyrillic series + digits)
    [🔴 Redaction] Ukrainian tax ID (РНОКПП / ІПН) — 10 digits
    [🔴 Redaction] Full name (Cyrillic, 3 words: surname + first + patronymic)
    [🔴 Redaction] Log: account number value
    [🔴 Redaction] Log: transaction amount value
    [🔴 Redaction] Log: fee value
    [🔴 Redaction] Log: total fee value in text
  Original file: NOT committed — handle out-of-band.
-->
<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [EMAIL_REDACTED]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: [CUSTOMER_1]
- email: [EMAIL_REDACTED]
- телефон: [PHONE_REDACTED]
- дата народження: [DOB_REDACTED]
- картка: ******-****-****-1234** (Visa, exp <EXP>, CVV <CVV>)
- IBAN: **UA90 ****-****-****-0260 0012 3456 789**
- баланс: <BALANCE>
- паспорт: [PASSPORT_REDACTED], РНОКПП (ІПН): [TAX_ID_REDACTED]

## Кроки відтворення (з production-логу)


2026-05-30 14:02:11 INFO  txn=TX-99812 account=<ACCOUNT> amount=<AMOUNT> fee=<FEE>
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee <FEE>
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>


## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
