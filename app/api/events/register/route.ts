import { NextResponse } from "next/server";
import { registerGuest, checkRegistration } from "@/app/lib/luma";
import { upsertHubSpotContact } from "@/app/lib/hubspot";

export async function POST(request: Request) {
  const body = await request.json();
  const { eventId, name, email } = body;

  if (!eventId || !email || !name) {
    return NextResponse.json(
      { error: "Name, email, and event are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Check if already registered
  const existing = await checkRegistration(eventId, email);
  if (existing.registered) {
    return NextResponse.json({ success: true, alreadyRegistered: true });
  }

  // Register on Luma
  const result = await registerGuest(eventId, email, name);

  if (!result.success) {
    console.error("Luma registration failed:", result.error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }

  // Also upsert to HubSpot (fire-and-forget)
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");
  upsertHubSpotContact({
    firstName,
    lastName,
    email,
    company: "",
    message: `Registered for event via getcampfire.com`,
  }).catch((err) => console.error("HubSpot upsert failed:", err));

  return NextResponse.json({ success: true, alreadyRegistered: false });
}
