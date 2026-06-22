# A/B промптів (Task E, bonus)

Задача (на `app/`): <напр. «додати валідацію percent у applyDiscount»>

## Промпт A — базовий

>make money.ts looks that it written by ork mekboy

## Промпт B — структурований

```markdown
Role: An elite Ork Mekboy obsessed with speed, loud noises, explosions, and slapping together working machinery out of pure scrap metal.
Goal: Rewrite the provided TypeScript code and comments so they scream with chaotic Ork energy, while ensuring the actual code still compiles perfectly and works.
Context: all .ts files
Constraints:
- Change only .ts files. Do not break strict compilation, variables, or runtime business logic.
- Do not introduce syntax errors; the "machine spirit" must still run.
- No secrets/PII in the output.

Acceptance criteria:
- All comments, JSDoc blocks, and documentation must be written in aggressive, loud Ork slang (e.g., using ALL CAPS, words like 'WAAAGH!', 'DA BOYZ', 'MORE DAKKA!', 'CHOPPA', 'KRUZER', and phonetic spelling like 'TAZKS' instead of 'tasks').
- Rename only private/local functions, variables, and internal module state to sound like Orkish engineering (e.g., rename `executeProcess` to `START_DA_STOMPA`, `isProcessing` to `IS_IT_RAMMING_TIME`, or `dataArray` to `SCRAP_PILE`). Preserve exported/public symbols and object shapes.
- Introduce completely unhinged ASCII art of gears, choppas, or explosions in the file headers.
- The actual executable logic must stay completely valid—use more aggressive but functional approaches to solve tasks so it feels like the code was "slapped together with extra rivets."

Output:
- Fully operational, perfectly compiling TypeScript code that reads like a chaotic greenskin blueprint.
Stop rules:
- if file is empty
```

## Порівняння

| Критерій | make money.ts looks that it written by ork mekboy | run ork-mekboy-forge.md prompt |
|---|---|---|
| Ітерацій до прийняття | 2 | 1 |
| Output токени (≈) | ~4.1k (sonnet) + 14 (haiku) | ~4.7k (sonnet) + 14 (haiku) |
| Вартість сесії | $0.2188 | $0.1660 |
| Зміни коду | +79 / -38 рядків | +50 / -25 рядків |
| Якість результату | Потрібні уточнення, перша відповідь неповна | Прийнято з першого разу |
| Правки безпеки/валідації | Довелось просити окремо | Враховано одразу (constraints у промпті) |

## Висновок

Структурований промпт (B) має менше ітерацій, нижчу вартість ($0.17 vs $0.22), менше змін коду. Незважаючи на більше output токенів, загальна вартість нижча завдяки меншому cache read. Явні `constraints` і `acceptance criteria` у промпті усунули необхідність окремих уточнень щодо компіляції та збереження інтерфейсів.

Найсуттєвішим певно є економія часу, не потрібні постійні уточнення що доробити, і нема зайвих змін коду.
