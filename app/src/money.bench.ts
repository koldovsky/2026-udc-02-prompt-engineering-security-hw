import { bench, describe } from "vitest";
import { formatCents, splitEvenly } from "./money.js";

describe("formatCents", () => {
  bench("format positive amount", () => {
    formatCents(42800);
  });

  bench("format negative amount", () => {
    formatCents(-12345);
  });

  bench("format small fractional", () => {
    formatCents(7);
  });

  bench("batch 100k calls", () => {
    for (let i = 0; i < 100_000; i++) {
      formatCents(i);
    }
  });
});

describe("splitEvenly", () => {
  bench("even split (3 people)", () => {
    splitEvenly(9000, 3);
  });

  bench("uneven split (7 people)", () => {
    splitEvenly(10000, 7);
  });

  bench("batch 100k calls", () => {
    for (let i = 0; i < 100_000; i++) {
      splitEvenly(1000 + i, 3);
    }
  });
});
