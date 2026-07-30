// Seed the presentations invite allowlist. Idempotent.
//   node --env-file=.env.local "app/(presentations)/_lib/seed-allowlist.mjs"
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);
const INVITED_BY = "steve@getcampfire.com";

const PEOPLE = [
  { email: "celestemerrill@gmail.com", name: "Celeste Merrill", role: "learner" },
  { email: "steve@getcampfire.com", name: "Steve Arntz", role: "admin" },
];

for (const p of PEOPLE) {
  await sql`
    INSERT INTO pres_allowed_emails (email, name, role, invited_by)
    VALUES (${p.email.toLowerCase()}, ${p.name}, ${p.role}, ${INVITED_BY})
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name, role = EXCLUDED.role, revoked_at = NULL
  `;
}

const rows = await sql`SELECT email, name, role FROM pres_allowed_emails ORDER BY email`;
console.log("allowlist:");
for (const r of rows) console.log(`  - ${r.email} (${r.role}) — ${r.name}`);
