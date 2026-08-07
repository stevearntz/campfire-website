// Host-key check for the control routes. Falls back to a default so the game
// works without setting an env var; set AWARDS_HOST_KEY in Vercel to lock it
// down for the live event.
export const DEFAULT_HOST_KEY = "campfire-host";

export function isHostKey(key: string | null | undefined): boolean {
  const expected = process.env.AWARDS_HOST_KEY || DEFAULT_HOST_KEY;
  return typeof key === "string" && key === expected;
}
