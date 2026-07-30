import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createAuthToken,
  isAllowlisted,
} from "@/app/(presentations)/_lib/db";
import { sendMagicLink } from "@/app/(presentations)/_lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // 5 link requests per email per hour.
    const rate = await checkRateLimit(email, "magic_link_send", 5, 60);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rate.retryAfterSeconds}s.` },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
      );
    }

    // Silent allowlist gate: a non-invited address gets the same success
    // response and NO email — never an enumeration signal.
    const allowed = await isAllowlisted(email);
    if (allowed) {
      const token = await createAuthToken(email);
      await sendMagicLink(email, token);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("auth send error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
