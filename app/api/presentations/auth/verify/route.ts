import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  validateAuthToken,
  isAllowlisted,
  ensureUser,
  createSessionRecord,
} from "@/app/(presentations)/_lib/db";
import { setSessionCookie } from "@/app/(presentations)/_lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const loginUrl = new URL("/presentations/login", request.url);

  const fail = (reason: string) => {
    loginUrl.searchParams.set("error", reason);
    return NextResponse.redirect(loginUrl);
  };

  try {
    if (!token) return fail("invalid");

    const result = await validateAuthToken(token);
    if (!result) return fail("expired");

    // Re-check the allowlist at verify time so revocation takes effect.
    const allowed = await isAllowlisted(result.email);
    if (!allowed) return fail("not_allowed");

    const user = await ensureUser(result.email, allowed.name, allowed.role);
    const sessionToken = await createSessionRecord(user.id);
    const cookieStore = await cookies();
    setSessionCookie(cookieStore, sessionToken);

    return NextResponse.redirect(new URL("/presentations", request.url));
  } catch (error) {
    console.error("auth verify error:", error);
    return fail("failed");
  }
}
