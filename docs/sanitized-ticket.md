<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** o.****yk@examplebank.test

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **ol***.*******ko@gmail.test**
- телефон: **+380 50 *** ** 67**
- дата народження: **14.**.******
- картка: **\<CARD_NUMBER>** (Visa, exp 04/**, CVV ***)
- IBAN: **\<IBAN>**
- баланс: **~800.50 UAH** (точна сума замаскована)
- паспорт: **Ф* ****56**, РНОКПП (ІПН): **********78**

## Кроки відтворення (з production-логу)

```log
2026-05-30 14:02:11 INFO  txn=TX-99812 account=UA90...789 amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://payments:<SECRET_OUT_OF_BAND>/payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
