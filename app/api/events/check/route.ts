import { NextResponse } from "next/server";
import { checkRegistration } from "@/app/lib/luma";

export async function POST(request: Request) {
  const body = await request.json();
  const { eventIds, email } = body;

  if (!email || !Array.isArray(eventIds) || eventIds.length === 0) {
    return NextResponse.json(
      { error: "Email and eventIds are required." },
      { status: 400 }
    );
  }

  // Check registration for each event in parallel
  const results = await Promise.all(
    eventIds.map(async (eventId: string) => {
      const { registered } = await checkRegistration(eventId, email);
      return { eventId, registered };
    })
  );

  const registeredMap: Record<string, boolean> = {};
  for (const r of results) {
    registeredMap[r.eventId] = r.registered;
  }

  return NextResponse.json({ registrations: registeredMap });
}
