#!/usr/bin/env node
// ---------------------------------------------------------------------------
// scripts/sanitize.mjs — local, deterministic data sanitizer (WS2 Task B).
//
// Why a script (not a prompt): you must NEVER paste a raw doc with secrets/PII
// into a model. This runs locally, applies fixed rules, and writes a shareable
// copy. Secrets are matched and DROPPED (out-of-band), never masked in place.
//
// Usage:
//   node scripts/sanitize.mjs [inputFile] [outputFile]
// Defaults:
//   in  = materials/sensitive-ticket.md
//   out = docs/sanitized-ticket.md
//
// Exit codes: 0 ok · 1 input missing · 2 leak check failed (secret survived)
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const IN = process.argv[2] ?? "materials/sensitive-ticket.md";
const OUT = process.argv[3] ?? "docs/sanitized-ticket.md";

// Each rule: traffic-light class, technique, the pattern, its replacement, and
// a short reason. The same list drives BOTH the substitution and the redaction
// log in the output, so they can never drift apart.
const RULES = [
  // --- 🔴 Secrets: remove entirely (out-of-band), do NOT mask ---------------
  { cls: "🔴", tech: "out-of-band", why: "DB connection string w/ password",
    re: /postgres:\/\/[^\s`]+/g, to: "<SECRET_OUT_OF_BAND>" },
  { cls: "🔴", tech: "out-of-band", why: "live API key",
    re: /sk-live-[0-9a-zA-Z]+/g, to: "<SECRET_OUT_OF_BAND>" },

  // --- 🔴 Banking secrecy ---------------------------------------------------
  // IBAN first: it contains 4-4-4-4 digit groups, so it must be consumed before
  // the card-PAN rule or the card rule will eat the middle of the IBAN.
  { cls: "🔴", tech: "masking", why: "IBAN (full)",
    re: /\bUA\d{2}[\d ]{10,}\d\b/g, to: "<IBAN>" },
  { cls: "🔴", tech: "masking", why: "IBAN (elided in logs)",
    re: /UA\d{2}\.\.\.\d{3}/g, to: "<IBAN>" },
  { cls: "🔴", tech: "masking", why: "card PAN (keep last 4 for support)",
    re: /\b\d{4} \d{4} \d{4} (\d{4})\b/g, to: "XXXX-XXXX-XXXX-$1" },
  { cls: "🔴", tech: "redaction", why: "card expiry",
    re: /exp \d{2}\/\d{2}/g, to: "exp [REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "card CVV",
    re: /CVV \d{3}/g, to: "CVV [REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "account balance (bank secrecy)",
    re: /\b[\d ]+\.\d{2} UAH\b/g, to: "[BALANCE_REDACTED]" },

  // --- 🔴 PII ---------------------------------------------------------------
  { cls: "🔴", tech: "synthetic", why: "customer full name",
    re: /Олена Петрівна Шевченко/g, to: "[CUSTOMER_1]" },
  { cls: "🔴", tech: "redaction", why: "email address (any)",
    re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, to: "[EMAIL_REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "phone number",
    re: /\+380[\d ]+\d/g, to: "[PHONE_REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "date of birth (dd.mm.yyyy)",
    re: /\b\d{2}\.\d{2}\.\d{4}\b/g, to: "[DOB_REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "passport (2 Cyrillic + 6 digits)",
    re: /[А-ЯІЇЄҐ]{2} \d{6}\b/g, to: "[PASSPORT_REDACTED]" },
  { cls: "🔴", tech: "redaction", why: "TIN / РНОКПП (10 digits)",
    re: /\b\d{10}\b/g, to: "[TIN_REDACTED]" },

  // --- 🟡 Internal: keep meaning, synthesize identifiers --------------------
  { cls: "🟡", tech: "synthetic", why: "transaction id (stable, fake)",
    re: /TX-99812/g, to: "TX-0001" },
  { cls: "🟡", tech: "masking", why: "internal branch name",
    re: /feat\/PSD2-fee-refactor/g, to: "<internal-branch>" },
];

// Order matters: card/IBAN (spaced 16/long digits) run before the 10-digit TIN
// rule so they aren't partially eaten. RULES above is already in safe order.

function sanitize(text) {
  let out = text;
  const counts = [];
  for (const r of RULES) {
    // Count first (match), then replace with the STRING form so that capture-
    // group backreferences like `$1` in the replacement are honoured.
    const m = out.match(r.re);
    const n = m ? m.length : 0;
    out = out.replace(r.re, r.to);
    counts.push({ ...r, n });
  }
  // Drop the original synthetic-data banner and the 🔴🟡🟢 classification marks.
  out = out.replace(/<!--[\s\S]*?-->\n*/, "");
  out = out.replace(/[🔴🟡🟢]\s?/g, "");
  out = out.replace(/^##Опис/m, "## Опис"); // fix glued heading from source
  return { out, counts };
}

function redactionLog(counts) {
  const rows = counts
    .filter((c) => c.n > 0)
    .map((c) => {
      const shown = c.to.replace("$1", "<last4>"); // display, not a backref
      return `| ${c.cls} | ${c.why} | ${c.tech} | \`${shown}\` | ${c.n} |`;
    })
    .join("\n");
  return [
    "## Redaction log (auto-generated)",
    "",
    "| Class | Original (what) | Technique | Placeholder | Count |",
    "|---|---|---|---|---|",
    rows,
  ].join("\n");
}

if (!existsSync(IN)) {
  console.error(`✗ input not found: ${IN}`);
  process.exit(1);
}

const raw = readFileSync(IN, "utf8");
const { out, counts } = sanitize(raw);

const header = [
  "<!-- AUTO-GENERATED by scripts/sanitize.mjs — DO NOT hand-edit. -->",
  `<!-- Source: ${IN} · Regenerate: node scripts/sanitize.mjs -->`,
  "<!-- Safe to share with AI tools at the right tier: no real secrets/PII. -->",
  "",
  "> Sanitized copy of a sensitive ticket. The **bug is preserved** (fee applied",
  "> twice in pre-auth + settle) while every 🔴 value is redacted/masked and every",
  "> secret is pulled out-of-band. 🟡 internal logic is kept but is **no-train /",
  "> enterprise tier only** — do not paste into a public model.",
  "",
].join("\n");

const body = `${header}\n${out.trim()}\n\n${redactionLog(counts)}\n`;

// Leak check: assert no known secret/PII shape survived into the output.
// The grouped-digits check (\d{4} \d{4} \d{4}) catches any unmasked card OR
// leftover IBAN fragment — the failure mode from the first run.
const LEAKS = [
  /postgres:\/\//, /sk-live-/, /S3cr3t/, /4111 1111/, /CVV \d{3}/,
  /\b\d{4} \d{4} \d{4}\b/, /UA\d{2} \d{4}/, /\$1/,
  /Шевченко/, /@gmail\.test/, /@examplebank\.test/,
  /\+380 \d/, /14\.03\.1987/,
];
const survived = LEAKS.filter((re) => re.test(body)).map((re) => re.source);
if (survived.length) {
  console.error(`✗ LEAK CHECK FAILED — these patterns survived: ${survived.join(", ")}`);
  process.exit(2);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, body, "utf8");

const applied = counts.filter((c) => c.n > 0);
const total = applied.reduce((s, c) => s + c.n, 0);
console.log(`✓ sanitized ${IN} -> ${OUT}`);
console.log(`  ${total} substitutions across ${applied.length} rule(s); leak check passed`);