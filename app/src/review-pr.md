## Результат review-pr промпту (adversarial pre-merge review)

### Data Source
`git diff main -- app/src/` — 2 файли, 238 insertions, 36 deletions.

### Findings

```
1. [MEDIUM] app/src/money.ts:65
   Problem: `abs - whole * 100` може дати frac поза 0–99 для значень біля MAX_SAFE_INTEGER.
   Impact: FRAC_LOOKUP[frac] повертає undefined.
   Fix: Використати `abs % 100` замість віднімання.
   Test: expect(formatCents(cents(Number.MAX_SAFE_INTEGER - 1))).toMatch(/\.\d{2}$/)
```

```
2. [MEDIUM] app/src/money.ts:21
   Problem: `cents()` не валідує вхід — приймає NaN, Infinity, дробові числа.
   Impact: formatCents(cents(NaN)) → "NaN.undefined", splitEvenly(cents(NaN), 3) → [NaN, NaN, NaN].
   Fix: Додати guard: `if (!Number.isInteger(value)) throw new Error("cents must be an integer")`
   Test: expect(() => cents(NaN)).toThrow(); expect(() => cents(3.5)).toThrow()
```

```
3. [MEDIUM] app/src/money.ts:88
   Problem: splitEvenly з від'ємним totalCents дає неінтуїтивний розподіл залишку.
   Impact: Для додатних — перші shares більші, для від'ємних — навпаки.
   Fix: Задокументувати або використати Math.trunc для симетрії.
   Test: const s = splitEvenly(cents(-1000), 3); expect(s.reduce((a,b)=>a+b,0)).toBe(-1000)
```

```
4. [LOW] app/src/money.ts:44
   Problem: FRAC_LOOKUP алокується при імпорті модуля навіть якщо formatCents не викликається.
   Impact: ~2KB зайвої пам'яті — negligible.
   Fix: Прийняти як trade-off або lazy init.
   Test: N/A
```

### Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 3 |
| LOW | 1 |

**Verdict: APPROVE with suggestions**
