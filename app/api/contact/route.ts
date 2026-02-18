import { NextResponse } from "next/server";
import { sendSlackNotification } from "@/app/lib/slack";
import { upsertHubSpotContact } from "@/app/lib/hubspot";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName = "", lastName = "", email = "", company = "", message = "", partial = false } = body;

  // Email is required for any capture
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const fields = { firstName, lastName, email, company, message };

  // Fan out — downstream failures never block the user
  const destinations: Promise<unknown>[] = [
    upsertHubSpotContact(fields),
  ];

  if (!partial) {
    destinations.push(sendSlackNotification(fields));
  }

  const results = await Promise.allSettled(destinations);

  // Log failures server-side for debugging
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Contact destination ${i} failed:`, r.reason);
    }
  });

  return NextResponse.json({ success: true });
}
