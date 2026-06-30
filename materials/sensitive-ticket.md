<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** o.melnyk@examplebank.test 🔴

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **Олена Петрівна Шевченко** 🔴
- email: **olena.shevchenko@gmail.test** 🔴
- телефон: **+380 50 123 45 67** 🔴
- дата народження: **14.03.1987** 🔴
- картка: **4111 1111 1111 1234** (Visa, exp 04/27, CVV 123) 🔴
- IBAN: **UA90 3052 9900 0000 0260 0012 3456 789** 🔴
- баланс: **428 800.50 UAH** 🔴
- паспорт: **ФЯ 123456**, РНОКПП (ІПН): **3012345678** 🔴

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=UA90...789 amount=1000.00 fee=2.50 🔴
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00 🔴
2026-05-30 14:02:12 DEBUG  db=postgres://payments:S3cr3t-P@ss@10.2.4.11:5432/payments_prod 🔴
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: sk-live-9f3a2b7c1d8e4f60a1b2c3d4e5f6 🔴
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
