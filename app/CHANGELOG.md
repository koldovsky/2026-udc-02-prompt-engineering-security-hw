## [Unreleased] — 2026-07-23

### Added
- Added branded types `Cents` and `Percent` to enforce type-safe money operations at compile time.
- Added constructor functions `cents()` and `percent()` for creating branded values with runtime validation.
- Added input validation: `splitEvenly` throws on `n < 1`, `percent()` throws on values outside [0, 100].
- Added pre-computed `FRAC_LOOKUP` table ("00"–"99") for zero-allocation fractional formatting.
- Added full JSDoc documentation with `@param`, `@returns`, `@throws`, and `@example` for all exported functions.
- Added comprehensive test suite covering positive, negative, boundary cases, and error paths.
- Added `money.bench.ts` with Vitest benchmarks for `formatCents` and `splitEvenly` (100k iterations).

### Fixed
- Fixed `splitEvenly` dropping remainder cents — shares now sum to exact `totalCents`.

### Changed
- Optimized `formatCents` with lookup table and bitwise truncation instead of `padStart` + `Math.floor`.
- Replaced `Array.fill()` + separate mutation loop with single-pass direct assignment in `splitEvenly`.
- Updated all function signatures to accept/return branded `Cents`/`Percent` types instead of plain `number`.
- Moved percent range validation from `applyDiscount` into `percent()` constructor (single source of truth).
- Expanded test suite from 4 smoke tests to full edge-case coverage with regex-verified error messages.

### Breaking
- All public functions now require branded `Cents`/`Percent` arguments — callers must wrap raw numbers with `cents()` / `percent()`.
