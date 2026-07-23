---
name: generate-changelog
description: "Згенерувати changelog на основі git diff відносно main"
---

# Goal
Згенерувати changelog для змінених файлів у `app/src/` на основі різниці
з гілкою `main`, згрупований за типом зміни.

# Data Source
1. `git diff main --stat -- app/src/` — список змінених файлів.
2. `git diff main -- app/src/` — повний diff для аналізу змін.
3. `git log main..HEAD --oneline -- app/src/` — коміти для контексту.

Якщо uncommitted зміни є (`git status`) — включи їх також.

# Format
[Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased] — YYYY-MM-DD

### Added
- <нова функціональність або файл>

### Fixed
- <виправлення бага>

### Changed
- <рефакторинг, оптимізація, зміна поведінки>

### Breaking
- <зміни, що ламають зворотну сумісність (якщо є)>
```

# Rules
- Дата = сьогодні (день генерації).
- Кожен entry — один рядок англійською, дієслово у Past Simple.
- Групуй за категорією, не за файлом чи комітом.
- Включай зміни в документації лише якщо додано нові JSDoc-теги або змінено public API docs.
- Пропускай: merge-коміти, зміни у форматуванні (prettier/whitespace).
- Секцію `### Breaking` додавай тільки якщо змінились сигнатури або типи параметрів.
- Аудиторія — розробники, що імпортують функції з цього модуля.

# Example Entry
```markdown
### Fixed
- Fixed remainder distribution in `splitEvenly` — shares now sum to exact total.
```

# Acceptance Criteria
1. Кожна семантична зміна (не whitespace) з diff відображена.
2. Категорії не порожні — якщо нема Fixed, не додавай порожню секцію.
3. Формат проходить перевірку Keep a Changelog.
4. Збережено як `app/CHANGELOG.md` (append зверху якщо файл існує).

# Stop
Зупинись після створення/оновлення `app/CHANGELOG.md`.
