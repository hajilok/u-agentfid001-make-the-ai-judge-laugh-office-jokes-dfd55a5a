import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 199;

// Generation 1 preliminary draft; will be replaced with the Generation 2 tournament champion.
const JOKE =
  "I signed the breakroom card 'Best of luck on your next chapter!' before realizing it was a get-well card for Dave's heart surgery.";

function validateEntry(text: string): string {
  const cleaned = text.trim();
  if (cleaned.length < 1 || cleaned.length > MAX_CHARS) {
    throw new Error(`Entry length ${cleaned.length} out of bounds (1..${MAX_CHARS})`);
  }
  if (/[\r\n]/.test(cleaned)) {
    throw new Error("Entry must be a single line with no newline characters");
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
