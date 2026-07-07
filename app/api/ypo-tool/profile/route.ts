import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { updateUserName } from "@/app/(main)/ypo-tool/lib/db";

/** POST — set the signed-in member's display name (required before self-assessment). */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const name = ((body.name as string) || "").trim().slice(0, 200);

    if (!name) {
      return NextResponse.json(
        { error: "Name is required.", code: "name_required" },
        { status: 400 },
      );
    }

    const user = await updateUserName(session.user.id, name);
    return NextResponse.json({ user: user ?? { ...session.user, name } });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
