<!--
============================================================================
⚠️  SYNTHETIC TRAINING DATA — NOT REAL.
Every name, email, phone, card, IBAN, key, and log line below is fabricated
for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task
(Task B) is to classify and sanitize this document — see docs/walkthrough.md.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** email masked

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.

## Дані клієнта (з CRM)

- ПІБ: **[CUSTOMER_1]**
- email: **email masked**
- телефон: **phone masker**
- дата народження: **birth date masked**
- картка: ** ****-1234 ** (Visa)
- IBAN: **<IBAN>**
- баланс: **<AMOUNT>**
- паспорт: **passport masker**, РНОКПП (ІПН): **taxCode masked**

## Кроки відтворення (з production-логу)

```
2026-05-30 14:02:11 INFO  account=<IBAN> amount=<AMOUNT_1> fee=2.50
2026-05-30 14:02:11 INFO  fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  /payments_prod
2026-05-30 14:02:12 DEBUG  calling fee-service
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
