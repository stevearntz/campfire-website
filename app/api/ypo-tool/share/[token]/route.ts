import { NextResponse } from "next/server";
import { getSession } from "@/app/ypo-tool/lib/auth";
import { getAssessmentByShareToken } from "@/app/ypo-tool/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token } = await params;
    if (!token || token.length !== 36) {
      return NextResponse.json(
        { error: "Invalid share token" },
        { status: 400 },
      );
    }

    const assessment = await getAssessmentByShareToken(token);
    if (!assessment) {
      return NextResponse.json(
        { error: "Shared assessment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Get shared assessment error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
