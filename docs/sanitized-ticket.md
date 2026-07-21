<!--
============================================================================
Sanitized version of materials/sensitive-ticket.md for Task B (WS2).
All 🔴 values redacted/masked/synthetic. Secrets moved out-of-band.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [REPORTER_1]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — маскований витяг даних клієнта та логів для
відтворення.

## Дані клієнта (з CRM) — masked / synthetic

- ПІБ: **[CUSTOMER_1]**
- email: **[REDACTED_EMAIL]**
- телефон: **+380 XX XXX XX XX**
- дата народження: **[REDACTED_DOB]**
- картка: **\*\*\*\*-1234** (Visa, exp XX/XX, CVV `<REDACTED>`)
- IBAN: **`<IBAN>`**
- баланс: **`<AMOUNT>` UAH**
- паспорт: **`<REDACTED>`**, РНОКПП (ІПН): **`<REDACTED>`**

## Кроки відтворення (з production-логу, санітизовано)

```
2026-05-30 14:02:11 INFO  txn=TX-99812 account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-99812 fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://<SECRET_OUT_OF_BAND>@<REDACTED_HOST>:5432/payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

> Секрети (connection string, API key) вилучено повністю — вони не потрібні
> моделі для розуміння бага і мають зберігатись лише в secret store /
> env-змінних поза документом і поза промптом. Якщо ці значення реально
> "світилися" в логах — їх треба ротувати негайно.

## Внутрішня логіка (з репозиторію payments-core) — 🟡 no-train only

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
