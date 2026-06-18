import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { consumeAuthToken, upsertUser, createSessionRecord } from "@/app/ypo-tool/lib/db";
import { setSessionCookie } from "@/app/ypo-tool/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    redirect("/ypo-tool?error=missing_token");
  }

  try {
    // Atomic consume: only succeeds if token is valid, unexpired, and unused
    const result = await consumeAuthToken(token);

    if (!result) {
      redirect("/ypo-tool?error=invalid_token");
    }

    // Upsert user and create session
    const user = await upsertUser(result.email);
    const sessionToken = await createSessionRecord(user.id);

    // Set cookie
    const cookieStore = await cookies();
    setSessionCookie(cookieStore, sessionToken);
  } catch (error) {
    console.error("Token verification error:", error);
    redirect("/ypo-tool?error=verification_failed");
  }

  redirect("/ypo-tool");
}
