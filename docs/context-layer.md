# Context layer (Task D)

## Що покращив (один шар)

- [Х] `app/AGENTS.md` — додав конвенції для фіксів:
- Propose changes first; apply only after user approval. Suggest critical and important first.
- You may rename functions if the current name is unclear — suggest the new name first.
- Skip cosmetic issues; flag only technical problems.

## Дія курації

- find money.ts and suggest logical improvements
- Що зробив: відповідь зі змінами які були виявлені агентом були не стурктуровані.
- після: відповідь стара більш стуктурована зі зменшеною кількістю не релевантних пропозицій, зменшення кількості затрачених токенів.

## Вимірювання

| Метрика | До | Після |
|---|---|---|
| Контекст (токени) | відобразилось на графіку | відобразилось на графіку |
| Output токени за задачу (≈) | 80000| 70000|
| Ітерацій до результату | 0 | 0 |

вимір через usage
1.1k · Out: 130.1k
In: 1.1k · Out: 130.9k


In: 1.1k · Out: 133.2k
In: 1.1k · Out: 133.9k

Як міряв: `/cost`

## Висновок

З покращеними правилами видався більш зручний для користувача результат + зменшилась кількість спожитих токенів.
