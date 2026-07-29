/**
 * Feature flag for the "Tell It So It Moves" presentations course.
 *
 * The whole /presentations section stays dark in production until the
 * integration lead flips FEATURE_PRESENTATIONS=true. Preview deploys and
 * local dev can opt in via .env.local. Defaults to ON outside production so
 * the design is reviewable on Vercel previews.
 */
export function presentationsEnabled(): boolean {
  const flag = process.env.FEATURE_PRESENTATIONS;
  if (flag === "true") return true;
  if (flag === "false") return false;
  // No explicit flag: on everywhere except production.
  return process.env.VERCEL_ENV !== "production";
}
