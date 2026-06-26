# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER_1]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **[EMAIL_1]**
- телефон: **[PHONE_1]**
- дата народження: **[DOB_1]**
- картка: ******-1234** (Visa, exp 04/27, CVV [CVV_REMOVED])
- IBAN: **<IBAN>**
- баланс: **[BALANCE_1] UAH**
- паспорт: **[PASSPORT_1]**, РНОКПП (ІПН): **[TAX_ID_1]**

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://payments:<SECRET_OUT_OF_BAND>@10.2.4.11:5432/payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
