import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/app/(presentations)/_lib/learner";
import { upsertQuizAttempt } from "@/app/(presentations)/_lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lessonKey = String(body.lessonKey || "").trim();
    if (!lessonKey) {
      return NextResponse.json({ error: "lessonKey required" }, { status: 400 });
    }
    const answers =
      body.answers && typeof body.answers === "object" ? body.answers : {};
    const score = Number.isFinite(body.score) ? Number(body.score) : 0;

    const { enrollment } = await getCurrentLearner();
    await upsertQuizAttempt(enrollment.id, lessonKey, answers, score);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("quiz save error:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
