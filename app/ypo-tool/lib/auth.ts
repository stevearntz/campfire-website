import { cookies } from "next/headers";
import { getSessionByToken, getUserById } from "./db";
import type { YpoSession } from "./constants";

const COOKIE_NAME = "ypo_session";

export async function getSession(): Promise<YpoSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const session = await getSessionByToken(sessionToken);
  if (!session) return null;

  const user = await getUserById(session.userId);
  if (!user) return null;

  return {
    user,
    expiresAt: session.expiresAt,
  };
}

export async function requireSession(): Promise<YpoSession> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
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
