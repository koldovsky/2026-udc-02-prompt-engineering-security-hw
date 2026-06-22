<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** o***k@examplebank.test

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

```
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

- [x] Redaction: ПІБ, дата народження, картка + CVV, баланс, паспорт, ІПН, DB credentials, API key, amount
- [x] Masking: emails, телефон, IBAN, txn ID, IP, account
- [x] Preserved: технічний контекст (методи, гілка, значення fee для відтворення бага)
