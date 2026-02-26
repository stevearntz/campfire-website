import { NextResponse } from "next/server";
import { unregisterGuest } from "@/app/lib/luma";

export async function POST(request: Request) {
  const body = await request.json();
  const { eventId, email } = body;

  if (!eventId || !email) {
    return NextResponse.json(
      { error: "Event and email are required." },
      { status: 400 }
    );
  }

  const result = await unregisterGuest(eventId, email);

  if (!result.success) {
    console.error("Luma unregister failed:", result.error);
    return NextResponse.json(
      { error: "Failed to unregister. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
