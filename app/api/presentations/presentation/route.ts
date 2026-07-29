import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/app/(presentations)/_lib/learner";
import { createPresentation, insertSlides } from "@/app/(presentations)/_lib/db";
import { SLIDES } from "@/app/(presentations)/_data/course";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const source = body.source === "case_study" ? "case_study" : "own";

    const { enrollment } = await getCurrentLearner();

    if (source === "case_study") {
      // Seed the sample "manager gap" deck from content.
      const presentation = await createPresentation(enrollment.id, {
        title: "The manager gap is quietly costing us our best people",
        mode: "Persuade",
        spine: "SCQA",
        audience: "Leadership team",
        durationMin: 20,
        source: "case_study",
      });
      await insertSlides(
        presentation.id,
        SLIDES.map((s, i) => ({
          position: i + 1,
          beat: s.beat,
          actionTitle: s.title,
          speakerNote: s.note,
          supportNote: s.support,
        })),
      );
      return NextResponse.json({ id: presentation.id });
    }

    // Own presentation from the setup form.
    const title = String(body.title ?? "").trim() || null;
    const durationRaw = Number(body.durationMin);
    const presentation = await createPresentation(enrollment.id, {
      title,
      mode: body.mode ? String(body.mode) : null,
      spine: body.spine ? String(body.spine) : null,
      audience: body.audience ? String(body.audience).trim() || null : null,
      durationMin: Number.isFinite(durationRaw) ? durationRaw : null,
      source: "own",
    });
    // Start them with one blank title slide.
    await insertSlides(presentation.id, [
      {
        position: 1,
        beat: "Title",
        actionTitle: title ?? "",
        speakerNote: "",
        supportNote: null,
      },
    ]);
    return NextResponse.json({ id: presentation.id });
  } catch (error) {
    console.error("presentation create error:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
