# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [reporter_email]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **[client_email]**
- телефон: **[client_phone]**
- дата народження: **[client_birth_date]**
- картка: ******-1234** ([client_card_type], exp [client_card_expiration_date], CVV [client_card_cvv])
- IBAN: **<IBAN>**
- баланс: **[client_balance] UAH**
- паспорт: **[client_passport_seria_and_number]**, РНОКПП (ІПН): **[client_tax_code]**

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
