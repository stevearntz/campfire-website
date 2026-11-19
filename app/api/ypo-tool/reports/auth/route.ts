import { NextResponse } from "next/server";
import crypto from "crypto";
import { REPORTS_HASH, REPORTS_COOKIE } from "@/app/(main)/ypo-tool/reports/lib/gate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  const ok =
    crypto.createHash("sha256").update(password).digest("hex") === REPORTS_HASH;

  if (!ok) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(REPORTS_COOKIE, REPORTS_HASH, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
