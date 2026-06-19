import { NextResponse } from "next/server";
import { getSession } from "@/app/(main)/ypo-tool/lib/auth";
import { createAssessment, getUserAssessments } from "@/app/(main)/ypo-tool/lib/db";
import { validateScores } from "@/app/(main)/ypo-tool/lib/scoring";
import type { AssessmentInput } from "@/app/(main)/ypo-tool/lib/constants";
import { CATEGORY_ORDER } from "@/app/(main)/ypo-tool/lib/constants";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, scores, strength, growth, targetName, observation, encouragement } = body;

    // Validate type
    if (type !== "self" && type !== "peer") {
      return NextResponse.json({ error: "Invalid assessment type" }, { status: 400 });
    }

    // Validate scores
    if (!validateScores(scores)) {
      return NextResponse.json(
        { error: "All behaviors must be rated 1-6" },
        { status: 400 },
      );
    }

    let input: AssessmentInput;

    if (type === "self") {
      // Validate strength/growth picks
      if (
        !strength?.category ||
        !CATEGORY_ORDER.includes(strength.category) ||
        typeof strength.behaviorIndex !== "number" ||
        strength.behaviorIndex < 0 ||
        strength.behaviorIndex > 2
      ) {
        return NextResponse.json(
          { error: "Invalid strength selection" },
          { status: 400 },
        );
      }
      if (
        !growth?.category ||
        !CATEGORY_ORDER.includes(growth.category) ||
        typeof growth.behaviorIndex !== "number" ||
        growth.behaviorIndex < 0 ||
        growth.behaviorIndex > 2
      ) {
        return NextResponse.json(
          { error: "Invalid growth selection" },
          { status: 400 },
        );
      }

      input = { type: "self", scores, strength, growth };
    } else {
      // Validate peer fields
      if (!targetName || typeof targetName !== "string" || targetName.trim().length === 0) {
        return NextResponse.json(
          { error: "Target name is required for peer assessments" },
          { status: 400 },
        );
      }
      if (targetName.length > 200) {
        return NextResponse.json(
          { error: "Target name is too long" },
          { status: 400 },
        );
      }
      if (typeof observation !== "string" || observation.length > 2000) {
        return NextResponse.json(
          { error: "Observation must be under 2000 characters" },
          { status: 400 },
        );
      }
      if (typeof encouragement !== "string" || encouragement.length > 2000) {
        return NextResponse.json(
          { error: "Encouragement must be under 2000 characters" },
          { status: 400 },
        );
      }

      input = {
        type: "peer",
        targetName: targetName.trim(),
        scores,
        observation: observation.trim(),
        encouragement: encouragement.trim(),
      };
    }

    const record = await createAssessment(session.user.id, input);
    return NextResponse.json({ success: true, assessment: record });
  } catch (error) {
    console.error("Create assessment error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assessments = await getUserAssessments(session.user.id);
    return NextResponse.json({ assessments });
  } catch (error) {
    console.error("List assessments error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
