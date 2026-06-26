import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateAuthToken, upsertUser, createSessionRecord } from "@/app/(main)/ypo-tool/lib/db";
import { setSessionCookie } from "@/app/(main)/ypo-tool/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    redirect("/ypo-tool?error=missing_token");
  }

  // Do all the work inside the try, but DON'T redirect here — redirect()
  // throws NEXT_REDIRECT, which this catch would swallow and mislabel.
  // Decide an outcome, then redirect once, outside the try/catch.
  let outcome: "ok" | "invalid" | "failed" = "failed";
  try {
    // Multi-use until expiry — tolerant of email link pre-scanners.
    const result = await validateAuthToken(token);

    if (!result) {
      outcome = "invalid"; // expired or unknown token
    } else {
      const user = await upsertUser(result.email);
      const sessionToken = await createSessionRecord(user.id);
      const cookieStore = await cookies();
      setSessionCookie(cookieStore, sessionToken);
      outcome = "ok";
    }
  } catch (error) {
    console.error("Token verification error:", error);
    outcome = "failed";
  }

  if (outcome === "invalid") redirect("/ypo-tool?error=invalid_token");
  if (outcome === "failed") redirect("/ypo-tool?error=verification_failed");
  redirect("/ypo-tool");
}
