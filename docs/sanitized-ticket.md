# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core **Reporter:** user@example.test

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **[REDACTED]**
- телефон: **[REDACTED]**
- дата народження: **[REDACTED]**
- картка: **[CARD_NUMBER]** (Visa, exp [REDACTED], CVV [REDACTED])
- IBAN: **<IBAN>**
- баланс: **[REDACTED] UAH**
- паспорт: **[REDACTED]**, РНОКПП (ІПН): **[REDACTED]**

## Кроки відтворення (з production-логу)

```text
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with auth=<SECRET_OUT_OF_BAND>
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.