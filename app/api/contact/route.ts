import { NextResponse } from "next/server";
import { sendSlackNotification } from "@/app/lib/slack";

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
  const destinations: Promise<unknown>[] = [];

  if (!partial) {
    destinations.push(sendSlackNotification(fields));
    // Future: destinations.push(createAirtableRecord(fields));
  }

  // Future: always upsert to CRM for both partial + full
  // destinations.push(upsertContact(fields));

  const results = await Promise.allSettled(destinations);

  // Log failures server-side for debugging
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Contact destination ${i} failed:`, r.reason);
    }
  });

  return NextResponse.json({ success: true });
}
