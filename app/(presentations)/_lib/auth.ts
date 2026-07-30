import { cookies } from "next/headers";
import { getSessionByToken, getUserById, type PresUser } from "./db";

/** Session helpers for the presentations course. Mirrors the YPO tool's
 *  app/(main)/ypo-tool/lib/auth.ts (cookie → session → user). */
const COOKIE_NAME = "pres_session";

export async function getSessionUser(): Promise<PresUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const session = await getSessionByToken(sessionToken);
  if (!session) return null;

  return getUserById(session.userId);
}

export function setSessionCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  sessionToken: string,
) {
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
}

export function clearSessionCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getSessionToken(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): string | undefined {
  return cookieStore.get(COOKIE_NAME)?.value;
}
