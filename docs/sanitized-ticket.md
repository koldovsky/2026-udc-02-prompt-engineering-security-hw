<!--

============================================================================

⚠️  SYNTHETIC TRAINING DATA — NOT REAL.

Every name, email, phone, card, IBAN, key, and log line below is fabricated

for the WS2 sanitization exercise. Do NOT treat as real PII/secrets. Your task

(Task B) is to classify and sanitize this document — see docs/walkthrough.md.

============================================================================

-->



# JIRA-1111 — Bug: невірний розрахунок комісії для premium-рахунків



**Priority:** High · **Component:** payments-core · **Reporter:** o.user_1@example.test



## Опис



Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на

конкретному рахунку. Нижче — дані клієнта й витяг з логів для відтворення.



## Дані клієнта (з CRM)



- ПІБ: **[CUSTOMER_1]**

- email: **customer_1@example.test**

- телефон: **+380 00 000 00 00**

- дата народження: **[DOB]**

- картка: `****-1234` (Visa, exp [REDACTED], CVV [REDACTED])

- IBAN: **<IBAN>**

- баланс: **<BALANCE> UAH**

- паспорт: **ХХ 111111**, РНОКПП (ІПН): **112233445**



## Кроки відтворення (з production-логу)



```text

2026-05-30 14:02:11 INFO  txn=TX-99812 account=UAХХ...ХХХ amount=хххх.00 fee=2.50

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

