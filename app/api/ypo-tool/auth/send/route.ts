import { NextResponse } from "next/server";
import { isValidYpoEmail } from "@/app/(main)/ypo-tool/lib/constants";
import { checkRateLimit, createAuthToken, upsertUser } from "@/app/(main)/ypo-tool/lib/db";
import { sendMagicLink } from "@/app/(main)/ypo-tool/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !isValidYpoEmail(email)) {
      return NextResponse.json(
        { error: "Please use a valid @ypo.org or @getcampfire.com email address." },
        { status: 400 },
      );
    }

    // Rate limit: 3 per email per hour
    const rateCheck = await checkRateLimit(email, "magic_link_send", 3, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        },
      );
    }

    // Ensure user exists
    await upsertUser(email);

    // Generate token and send email
    const token = await createAuthToken(email);
    await sendMagicLink(email, token);

    // Always return success (don't reveal if email exists)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Magic link send error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
