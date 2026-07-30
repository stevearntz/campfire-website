import { cache } from "react";
import { redirect } from "next/navigation";
import { ensureEnrollment, type PresUser, type Enrollment } from "./db";
import { getSessionUser } from "./auth";

/**
 * The current learner, resolved from the magic-link session. Returns null when
 * nobody is signed in — the layout renders the bare (login) chrome and course
 * pages call requireLearner() to redirect to /presentations/login.
 */
const COACH_NAME = "Steve Arntz";

export interface LearnerContext {
  user: PresUser;
  enrollment: Enrollment;
}

export const getCurrentLearner = cache(
  async (): Promise<LearnerContext | null> => {
    const user = await getSessionUser();
    if (!user) return null;
    const enrollment = await ensureEnrollment(user.id, COACH_NAME);
    return { user, enrollment };
  },
);

/** For gated course pages: the learner, or a redirect to the login screen. */
export async function requireLearner(): Promise<LearnerContext> {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/presentations/login");
  return learner;
}

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
