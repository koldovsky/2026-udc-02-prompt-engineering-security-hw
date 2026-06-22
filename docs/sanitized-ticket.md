---
title: Sanitized Ticket - JIRA-4821
status: Task Saved
date_processed: 2026-06-18
---

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** o***e@examplebank.test

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: [REDACTED]
- email: o***e@gmail.test
- телефон: +380-50-XXXX-XXXX
- дата народження: [REDACTED]
- картка: [REDACTED] (Visa, exp 04/27, CVV [REDACTED])
- IBAN: UA90-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
- баланс: [REDACTED] UAH
- паспорт: [REDACTED], РНОКПП (ІПН): [REDACTED]

## Кроки відтворення (з production-логу)

```text
2026-05-30 14:02:11 INFO  txn=TX-XXXXX account=UA90-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX amount=[REDACTED] fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-XXXXX fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=postgres://[REDACTED]@10.2.x.x:5432/payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: [REDACTED]
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.

## Sanitization Log

- [x] Redaction applied to PII (ПІБ, дата народження, картка, IBAN, баланс, паспорт, РНОКПП)
- [x] Redaction applied to secrets (DB credentials, API keys)
- [x] Masking applied to email, account, txn IDs, IP addresses
- [x] Technical context preserved (fee logic, methods, branches)
- Status: **Task Saved Successfully to docs/sanitized-ticket.md**
