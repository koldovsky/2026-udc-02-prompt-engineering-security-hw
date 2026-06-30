<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** <core-service> · **Reporter:** [REPORTER_EMAIL]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: [CUSTOMER_NAME]
- email: [CUSTOMER_EMAIL]
- телефон: ****-4567
- дата народження: [CUSTOMER_B_D]
- картка: ****-1234 (Visa, exp **/**, CVV ***)
- IBAN: **UA90....789**
- баланс: **428 800.50 UAH**
- паспорт:[CUSTOMER_DOC], РНОКПП (ІПН): [CUSTOMER_INN]

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=UA90...789 amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<DB_URL>
2026-05-30 14:02:12 DEBUG  calling <service_for_culc_fee> with X-API-Key: sk-live-9f3a***********d4e5f6
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
