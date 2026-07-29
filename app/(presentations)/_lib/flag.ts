/**
 * Feature flag for the "Tell It So It Moves" presentations course.
 *
 * Live by default (including production) so it's reachable at
 * getcampfire.com/presentations. It's an ungated design preview — the real
 * invite-only magic-link gate lands in the auth phase. Kill switch: set
 * FEATURE_PRESENTATIONS=false in the environment to hide the whole section.
 */
export function presentationsEnabled(): boolean {
  return process.env.FEATURE_PRESENTATIONS !== "false";
}
