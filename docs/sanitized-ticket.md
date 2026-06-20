# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [REDACTED]@examplebank.test

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **[CUSTOMER_1]@gmail.test**
- телефон: **+380 [REDACTED] (Ukrainian mobile number, 9 digits)**
- дата народження: **[REDACTED]**
- картка: `**** **** **** 1234` (Visa, exp [REDACTED], CVV [REDACTED])
- IBAN: **UA[IBAN] (private account 2620, not entrepreneur)**
- баланс: **[REDACTED] UAH**
- паспорт: **ФЯ [REDACTED] (old fashion passport, not an id card)**, РНОКПП (ІПН): **[REDACTED]**

## Кроки відтворення (з production-логу)

```text
2026-05-30 14:02:11 INFO  txn=TX-99812 account=UA90...789 amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://<username>:<password>@<url>:5432/<db table>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: [PROD_KEY_1]
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
