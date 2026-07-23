## Результат generate-changelog промпту

### Data Source
- `git diff main --stat -- app/src/` → 2 файли змінено (238 insertions, 36 deletions).
- `git log main..HEAD -- app/src/` → всі зміни uncommitted (staging area).
- `git status -- app/src/` → money.ts, money.test.ts modified + нові файли (bench, reports).

### Згенерований changelog
Збережено у `app/CHANGELOG.md` у форматі Keep a Changelog.

Категорії:
- **Added** (7 entries): branded types, constructors, validation, lookup table, JSDoc, тести, benchmark.
- **Fixed** (1 entry): splitEvenly remainder bug.
- **Changed** (5 entries): оптимізації, оновлення сигнатур, перенос валідації, розширення тестів.
- **Breaking** (1 entry): функції тепер вимагають branded types замість plain number.

### Примітки
- Дата = день генерації (2026-07-23).
- Порожні секції не додавались.
- Merge-коміти та whitespace-зміни пропущені.
