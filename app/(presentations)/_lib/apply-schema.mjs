// Apply the presentations learner-data schema to Neon.
// Idempotent (CREATE ... IF NOT EXISTS). Run with the Neon connection in env:
//   node --env-file=.env.local "app/(presentations)/_lib/apply-schema.mjs"
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const url = process.env.POSTGRES_URL;
if (!url) {
  console.error("POSTGRES_URL is not set");
  process.exit(1);
}

const sql = neon(url);
const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "schema.sql"), "utf8");

// Strip line comments, then split into individual statements.
const statements = raw
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  await sql.query(stmt);
}

const tables = await sql`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name LIKE 'pres_%'
  ORDER BY table_name
`;
console.log(`Applied ${statements.length} statements.`);
console.log("pres_ tables now present:");
for (const t of tables) console.log("  -", t.table_name);
