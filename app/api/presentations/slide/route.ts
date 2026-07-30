import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/app/(presentations)/_lib/learner";
import {
  updateSlideById,
  presentationOwnedBy,
} from "@/app/(presentations)/_lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const presentationId = Number(body.presentationId);
    const slideId = Number(body.slideId);
    if (!presentationId || !slideId) {
      return NextResponse.json(
        { error: "presentationId and slideId required" },
        { status: 400 },
      );
    }

    const learner = await getCurrentLearner();
    if (!learner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { enrollment } = learner;
    const owns = await presentationOwnedBy(presentationId, enrollment.id);
    if (!owns) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await updateSlideById(slideId, {
      actionTitle: String(body.actionTitle ?? ""),
      speakerNote: String(body.speakerNote ?? ""),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("slide save error:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
