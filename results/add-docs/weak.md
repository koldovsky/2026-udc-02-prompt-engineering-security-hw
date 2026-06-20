# Documentation for `src/money.ts`

Here is the documentation for the code:

## Overview

This module provides money utility functions. It works with cents to avoid floating point issues.

## Functions

### `formatCents(cents: number): string`

Formats cents as a string.

**Parameters:**
- `cents` - the amount in cents

**Returns:** A string like "428.00"

**Example:**
```typescript
formatCents(42800) // "428.00"
```

### `parseAmount(input: string): number`

Parses a string into cents.

**Parameters:**
- `input` - a string like "428.00"

**Returns:** Integer cents

**Example:**
```typescript
parseAmount("428.00") // 42800
```

### `splitEvenly(totalCents: number, n: number): number[]`

Splits a total evenly across n people.

**Parameters:**
- `totalCents` - total amount in cents
- `n` - number of people

**Returns:** Array of shares

### `applyDiscount(cents: number, percent: number): number`

Applies a discount to an amount.

**Parameters:**
- `cents` - the amount
- `percent` - discount percentage

**Returns:** Discounted amount
