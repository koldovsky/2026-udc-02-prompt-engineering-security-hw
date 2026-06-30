#!/usr/bin/env node
/**
 * Sanitizes a sensitive markdown document according to the checklist rules:
 *
 * 🔴 PII       → Redaction:  replace with [REDACTED] or labelled placeholder
 * 🔴 Banking   → Masking:    preserve format, hide value (****-1234, <IBAN>)
 * 🔴 Secrets   → Out-of-band: replace with <SECRET_OUT_OF_BAND>
 * 🔴 Prod logs → Redact values, keep structure
 * 🟡 Internal  → Keep (no-train tier handles this at the tool level)
 * 🟢 Safe      → Keep as-is
 *
 * Usage:
 *   npx tsx scripts/sanitize.ts <input.md> [output.md]
 *
 * Default output: docs/sanitized-ticket.md
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";

// ---------------------------------------------------------------------------
// Rule type
// ---------------------------------------------------------------------------

type Technique = "redact" | "mask" | "out-of-band";

interface Rule {
  name: string;
  technique: Technique;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
}

// ---------------------------------------------------------------------------
// Sanitization rules — ordered from most-specific to least-specific
// ---------------------------------------------------------------------------

const rules: Rule[] = [
  // ── Secrets (out-of-band) ────────────────────────────────────────────────

  {
    name: "DB connection string with credentials",
    technique: "out-of-band",
    pattern: /\b(postgres|mysql|mongodb|redis):\/\/[^\s"'`]+/gi,
    replacement: "<SECRET_OUT_OF_BAND>",
  },
  {
    name: "API / secret key value",
    technique: "out-of-band",
    // matches  sk-live-xxx  or  key: <value>  or  X-API-Key: <value>
    pattern: /\b(sk|pk|api|secret|token)-[A-Za-z0-9_\-]{8,}/gi,
    replacement: "<SECRET_OUT_OF_BAND>",
  },
  {
    name: "Inline API key assignment",
    technique: "out-of-band",
    // X-API-Key: sk-live-...  or  API_KEY=xxx
    pattern: /(X-API-Key|API[_-]?KEY)\s*[:=]\s*\S+/gi,
    replacement: "$1: <SECRET_OUT_OF_BAND>",
  },

  // ── Banking — masking ────────────────────────────────────────────────────

  {
    name: "Payment card number (16-digit groups)",
    technique: "mask",
    // 4111 1111 1111 1234  →  ****-****-****-1234
    pattern: /\d{4}[\s\-]\d{4}[\s\-]\d{4}[\s\-](\d{4})/g,
    replacement: (_, last4: string) => `****-****-****-${last4}`,
  },
  {
    name: "Card CVV",
    technique: "mask",
    pattern: /\bCVV\s+\d{3,4}\b/gi,
    replacement: "CVV <CVV>",
  },
  {
    name: "Card expiry date in context",
    technique: "mask",
    pattern: /\bexp\s+\d{2}\/\d{2,4}\b/gi,
    replacement: "exp <EXP>",
  },
  {
    name: "IBAN",
    technique: "mask",
    // UA90 3052 9900 0000 0260 0012 3456 789
    pattern: /\b[A-Z]{2}\d{2}[\s\-]?(\d{4}[\s\-]?){4,7}\d{1,4}\b/g,
    replacement: "<IBAN>",
  },
  {
    name: "Account balance with currency",
    technique: "mask",
    pattern: /\b[\d\s,]+\.\d{2}\s+(UAH|USD|EUR|GBP)\b/gi,
    replacement: "<BALANCE>",
  },

  // ── PII — redaction ──────────────────────────────────────────────────────

  {
    name: "Email address",
    technique: "redact",
    pattern: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
    replacement: "[EMAIL_REDACTED]",
  },
  {
    name: "Phone number (Ukrainian / international)",
    technique: "redact",
    // +380 50 123 45 67  or  +1-800-555-0100
    pattern: /\+\d[\d\s\-().]{7,}/g,
    replacement: "[PHONE_REDACTED]",
  },
  {
    name: "Date of birth (DD.MM.YYYY)",
    technique: "redact",
    pattern: /\b\d{2}\.\d{2}\.\d{4}\b/g,
    replacement: "[DOB_REDACTED]",
  },
  {
    name: "Passport number (Cyrillic series + digits)",
    technique: "redact",
    // ФЯ 123456
    pattern: /[А-ЯҐЄІЇЁА-ЯA-Z]{2}\s*\d{6}\b/gu,
    replacement: "[PASSPORT_REDACTED]",
  },
  {
    name: "Ukrainian tax ID (РНОКПП / ІПН) — 10 digits",
    technique: "redact",
    // labelled context: РНОКПП (ІПН): 3012345678
    pattern: /(?:РНОКПП|ІПН)\s*\((?:ІПН|РНОКПП)\)\s*:\s*\*?\*?\d{10}/giu,
    replacement: "РНОКПП (ІПН): [TAX_ID_REDACTED]",
  },
  {
    name: "Full name (Cyrillic, 3 words: surname + first + patronymic)",
    technique: "redact",
    // Олена Петрівна Шевченко — any order of 3 capitalised Cyrillic words
    pattern:
      /\*\*([А-ЯҐЄІЇЁ][а-яґєіїё'ʼ]+\s+){2}[А-ЯҐЄІЇЁ][а-яґєіїё'ʼ]+\*\*/gu,
    replacement: "**[CUSTOMER_1]**",
  },
  {
    name: "Standalone Cyrillic full name (3 words, no bold)",
    technique: "redact",
    pattern:
      /(?<!\*\*)([А-ЯҐЄІЇЁ][а-яґєіїё'ʼ]+\s+){2}[А-ЯҐЄІЇЁ][а-яґєіїё'ʼ]+(?!\*\*)/gu,
    replacement: "[CUSTOMER_1]",
  },

  // ── Production log values ────────────────────────────────────────────────

  {
    name: "Log: account number value",
    technique: "redact",
    pattern: /\baccount=[^\s]+/gi,
    replacement: "account=<ACCOUNT>",
  },
  {
    name: "Log: transaction amount value",
    technique: "redact",
    pattern: /\bamount=[\d.]+/gi,
    replacement: "amount=<AMOUNT>",
  },
  {
    name: "Log: fee value",
    technique: "redact",
    pattern: /\bfee=[\d.]+/gi,
    replacement: "fee=<FEE>",
  },
  {
    name: "Log: total fee value in text",
    technique: "redact",
    pattern: /total fee [\d.]+/gi,
    replacement: "total fee <FEE>",
  },
];

// ---------------------------------------------------------------------------
// Sanitize function
// ---------------------------------------------------------------------------

function sanitize(input: string): { output: string; log: SanitizationEntry[] } {
  const log: SanitizationEntry[] = [];
  let output = input;

  for (const rule of rules) {
    const before = output;
    output = output.replace(rule.pattern, rule.replacement as string);
    if (output !== before) {
      log.push({ name: rule.name, technique: rule.technique });
    }
    // Reset lastIndex for global regexes used in replace
    rule.pattern.lastIndex = 0;
  }

  return { output, log };
}

interface SanitizationEntry {
  name: string;
  technique: Technique;
}

// ---------------------------------------------------------------------------
// Add sanitization report header to output
// ---------------------------------------------------------------------------

function buildOutput(sanitized: string, log: SanitizationEntry[]): string {
  const techniqueIcon: Record<Technique, string> = {
    redact: "🔴 Redaction",
    mask: "🔴 Masking",
    "out-of-band": "🔴 Out-of-band",
  };

  const reportLines = [
    "<!--",
    "  AUTO-SANITIZED by scripts/sanitize.ts",
    "  Rules applied (section 2 of sanitization-checklist.md):",
    ...log.map((e) => `    [${techniqueIcon[e.technique]}] ${e.name}`),
    "  Original file: NOT committed — handle out-of-band.",
    "-->",
    "",
  ];

  return reportLines.join("\n") + sanitized;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error("Usage: npx tsx scripts/sanitize.ts <input.md> [output.md]");
  process.exit(1);
}

const inputPath = resolve(inputArg);
const outputPath = resolve(outputArg ?? "docs/sanitized-ticket.md");

const raw = readFileSync(inputPath, "utf8");
const { output: sanitized, log } = sanitize(raw);
const final = buildOutput(sanitized, log);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, final, "utf8");

console.log(`Sanitized ${log.length} rule(s) applied:`);
log.forEach((e) => console.log(`  [${e.technique}] ${e.name}`));
console.log(`Output written to: ${outputPath}`);
