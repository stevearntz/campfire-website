import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { upsertUser, createSessionRecord } from "@/app/(main)/ypo-tool/lib/db";
import { setSessionCookie } from "@/app/(main)/ypo-tool/lib/auth";
import { isValidYpoEmail } from "@/app/(main)/ypo-tool/lib/constants";

/**
 * DEV ONLY — create a real session without the magic-link email, so the
 * multi-route flow can be exercised locally. Returns 404 in any non-dev env.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const email = ((body.email as string) || "").trim().toLowerCase();
  if (!isValidYpoEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const user = await upsertUser(email);
    const token = await createSessionRecord(user.id);
    const cookieStore = await cookies();
    setSessionCookie(cookieStore, token);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Dev login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
