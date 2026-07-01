# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** o.melnyk@examplebank.test

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: [CUSTOMER_1]
- email: ***@gmail.test
- телефон: +380 ** *** ** **
- дата народження: [BIRTHDAY_1]
- картка: **** **** **** 1234 (Visa)
- IBAN: UA90 **** **** **** **** **** **** 789
- баланс: [BALANCE_1]
- паспорт: [PASSPORT_1], РНОКПП (ІПН): ********78

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=UA90...789 amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://payments:.....@10.2.4.11:5432/payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: [API-KEY]
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
