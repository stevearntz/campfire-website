import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/app/(presentations)/_lib/learner";
import { upsertWorksheet, setProgress } from "@/app/(presentations)/_lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const moduleSlug = String(body.moduleSlug || "").trim();
    if (!moduleSlug) {
      return NextResponse.json({ error: "moduleSlug required" }, { status: 400 });
    }
    const data =
      body.data && typeof body.data === "object" ? body.data : {};
    const submit = body.submit === true;

    const { enrollment } = await getCurrentLearner();
    await upsertWorksheet(enrollment.id, moduleSlug, data, submit);
    // Submitting completes the module; a draft save marks it in progress.
    await setProgress(enrollment.id, moduleSlug, submit ? "done" : "in_progress");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("worksheet save error:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
