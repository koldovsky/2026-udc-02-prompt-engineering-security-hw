import { appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const enabled = !!process.env.DEBUG;

const __dirname = dirname(fileURLToPath(import.meta.url));
const logDir = process.env.LOG_DIR || join(__dirname, "..", "log");
const logFile = join(logDir, "debug.log");

if (enabled) {
  mkdirSync(logDir, { recursive: true });
}

export function logEntry(fn: string, args: Record<string, unknown>): void {
  if (!enabled) return;
  appendFileSync(logFile, JSON.stringify({ timestamp: new Date().toISOString(), function: fn, event: "enter", args }) + "\n");
}

export function logExit(fn: string, result: unknown): void {
  if (!enabled) return;
  appendFileSync(logFile, JSON.stringify({ timestamp: new Date().toISOString(), function: fn, event: "exit", result }) + "\n");
}
