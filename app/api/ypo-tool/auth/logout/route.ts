import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteSession } from "@/app/ypo-tool/lib/db";
import { getSessionToken, clearSessionCookie } from "@/app/ypo-tool/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = getSessionToken(cookieStore);

    if (sessionToken) {
      await deleteSession(sessionToken);
    }

    clearSessionCookie(cookieStore);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: true });
  }
}
