import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  isAllowlisted,
  ensureUser,
  createSessionRecord,
} from "@/app/(presentations)/_lib/db";
import { setSessionCookie } from "@/app/(presentations)/_lib/auth";

// Dev-only shortcut to sign in without email (magic link needs RESEND_API_KEY,
// absent locally). Disabled in production.
export async function GET(request: Request) {
  if (process.env.VERCEL_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const url = new URL(request.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const loginUrl = new URL("/presentations/login", request.url);

  const allowed = await isAllowlisted(email);
  if (!allowed) {
    loginUrl.searchParams.set("error", "not_allowed");
    return NextResponse.redirect(loginUrl);
  }

  const user = await ensureUser(email, allowed.name, allowed.role);
  const sessionToken = await createSessionRecord(user.id);
  const cookieStore = await cookies();
  setSessionCookie(cookieStore, sessionToken);
  return NextResponse.redirect(new URL("/presentations", request.url));
}
