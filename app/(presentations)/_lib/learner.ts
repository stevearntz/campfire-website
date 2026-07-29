import { cache } from "react";
import {
  ensureUser,
  ensureEnrollment,
  type PresUser,
  type Enrollment,
} from "./db";

/**
 * Resolves "the current learner". For now this is a single stubbed dev
 * learner so we can build the screens against real (empty) DB data before
 * auth exists. When magic-link auth lands, replace the body of
 * getCurrentLearner() with cookie -> session -> user resolution, mirroring
 * app/(main)/ypo-tool/lib/auth.ts getSession(). Everything downstream keeps
 * working — it only depends on the returned LearnerContext.
 */
const DEV_LEARNER_EMAIL =
  process.env.PRES_DEV_LEARNER_EMAIL ?? "learner@getcampfire.com";
const DEV_LEARNER_NAME = process.env.PRES_DEV_LEARNER_NAME ?? null;
const DEV_COACH_NAME = "Dana Reyes";

export interface LearnerContext {
  user: PresUser;
  enrollment: Enrollment;
}

export const getCurrentLearner = cache(
  async (): Promise<LearnerContext> => {
    const user = await ensureUser(DEV_LEARNER_EMAIL, DEV_LEARNER_NAME);
    const enrollment = await ensureEnrollment(user.id, DEV_COACH_NAME);
    return { user, enrollment };
  },
);

/** First name for greetings, or null if we don't have a name yet. */
export function firstName(user: PresUser): string | null {
  if (!user.name) return null;
  return user.name.trim().split(/\s+/)[0] || null;
}

/** Avatar initials from the name, falling back to the email's first letter. */
export function initials(user: PresUser): string {
  if (user.name) {
    const parts = user.name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return (user.email[0] ?? "?").toUpperCase();
}
