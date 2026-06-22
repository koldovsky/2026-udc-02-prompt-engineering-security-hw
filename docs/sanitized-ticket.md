# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** `[REPORTER_1]@example.test`

> Санітизована версія `materials/sensitive-ticket.md`. Усі PII/секрети замасковані або винесені out-of-band.

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на конкретному premium-рахунку.

## Дані клієнта (санітизовано)

- ПІБ: `[CUSTOMER_1]`
- email: `[CUSTOMER_1]@example.test`
- телефон: `+380 ** *** ** **` (masked)
- дата народження: `[DOB_REDACTED]`
- картка: `****-****-****-1234` (Visa, exp `**/**`, CVV `[REDACTED]`)
- IBAN: `<IBAN>`
- баланс: `[BALANCE_REDACTED] UAH`
- паспорт / ІПН: `[REDACTED]`

## Кроки відтворення (санітизований лог)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN_SUFFIX> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<CONNECTION_STRING_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> Секрети (DB connection string, API key) — **out-of-band**: отримати з secret store / env, не вставляти в промпт.

## Внутрішня логіка (🟡 — enterprise/no-train)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в `preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
