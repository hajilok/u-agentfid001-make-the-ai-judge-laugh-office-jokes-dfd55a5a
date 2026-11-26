import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 199;

// Generation 2 blind-tournament champion (84 UTF-8 bytes, pure ASCII, single line).
const JOKE =
  'My boss ran late to our "quick chat," so FedEx emailed my laptop return label first.';

function validateEntry(text: string): string {
  const cleaned = text.trim();
  if (cleaned.length < 1 || cleaned.length > MAX_CHARS) {
    throw new Error(`Entry length ${cleaned.length} out of bounds (1..${MAX_CHARS})`);
  }
  if (/[\r\n]/.test(cleaned)) {
    throw new Error("Entry must be a single line with no newline characters");
  }
  if (/[\x00-\x1f\x7f]/.test(cleaned)) {
    throw new Error("Entry must not contain control characters");
  }
  return cleaned;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const entry = validateEntry(JOKE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), entry, { encoding: "utf8" });
}

main();
