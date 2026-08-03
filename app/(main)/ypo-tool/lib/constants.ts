/* ═══════════════════════════════════════════════════════════
   YPO Activating Behaviors — shared types & auth validation

   The live assessment framework (circles, item text, scoring)
   is the source of truth in ./behaviors.ts. This file holds
   only the cross-cutting pieces the app still uses: the Likert
   scale labels, session/user types, and email-domain validation
   for magic-link auth.
   ═══════════════════════════════════════════════════════════ */

/** 6-point Likert scale, no neutral midpoint by design. */
export const SCALE_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
] as const;

/* ═══ Types ═══ */

export interface YpoUser {
  id: number;
  email: string;
  name: string | null;
}

export interface YpoSession {
  user: YpoUser;
  expiresAt: string;
}

/* ═══ Validation ═══ */

export const ALLOWED_DOMAINS = ["@ypo.org", "@getcampfire.com"];

export function isValidYpoEmail(email: string): boolean {
  const lower = email.toLowerCase();
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower) &&
    ALLOWED_DOMAINS.some((d) => lower.endsWith(d))
  );
}
