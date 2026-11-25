import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

// One original office-life joke, a single line under 200 characters.
// The sealed gate requires /output/entry.txt to be UTF-8 text of 1-200
// characters, not only white space; only a valid entry goes before the judge.
const LINE =
  "The office plant died, so HR replaced it with a poster of a plant and called it growth.";

// Validate the line before writing anything.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error("line must be 1-200 characters");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = "/output";

// Clear only the contents of the output folder, never the folder itself.
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(`${outDir}/${entry}`, { recursive: true, force: true });
}

writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Verify the written file matches the line byte-for-byte.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the line byte-for-byte");
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
