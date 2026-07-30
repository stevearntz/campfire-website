import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/app/(presentations)/_lib/db";
import { getSessionToken, clearSessionCookie } from "@/app/(presentations)/_lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    if (token) await deleteSession(token);
    clearSessionCookie(cookieStore);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("auth logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
