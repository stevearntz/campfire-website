import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/app/(presentations)/_lib/learner";
import { saveModuleJournal } from "@/app/(presentations)/_lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const moduleSlug = String(body.moduleSlug || "").trim();
    if (!moduleSlug) {
      return NextResponse.json({ error: "moduleSlug required" }, { status: 400 });
    }
    const text = String(body.body ?? "");

    const learner = await getCurrentLearner();
    if (!learner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { enrollment } = learner;
    await saveModuleJournal(enrollment.id, moduleSlug, text);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("journal save error:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
