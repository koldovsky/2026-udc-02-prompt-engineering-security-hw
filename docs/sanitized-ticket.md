# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER_1]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — анонімізовані дані для відтворення.

## Дані клієнта (синтетичні — реальні дані видалено)

- ПІБ: **[CUSTOMER_1]**
- email: **[CUSTOMER_1_EMAIL]**
- телефон: **[CUSTOMER_1_PHONE]**
- дата народження: **[CUSTOMER_1_DOB]**
- картка: **\*\*\*\*-1234** (Visa, exp \*\*/\*\*)  — CVV: `<SECRET_OUT_OF_BAND>`
- IBAN: **`<IBAN>`**
- баланс: **`<BALANCE>`**
- паспорт: **`<PASSPORT>`**, РНОКПП (ІПН): **`<TAX_ID>`**

> Реальні значення зберігаються лише в захищеній CRM-системі. Не вставляйте
> їх у промпти або тікети.

## Кроки відтворення (з лог-рядків — credentials видалено)

```
2026-05-30 14:02:11 INFO  txn=TX-XXXXX account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-XXXXX fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> DB connection string та API key — out-of-band. Отримати у vault/secrets manager.

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
