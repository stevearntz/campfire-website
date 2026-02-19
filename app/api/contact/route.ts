import { NextResponse } from "next/server";
import { sendSlackNotification } from "@/app/lib/slack";
import { upsertHubSpotContact } from "@/app/lib/hubspot";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName = "", lastName = "", email = "", company = "", message = "", partial = false, _hp = "", _t = 0 } = body;

  // --- Spam protection ---

  // 1. Honeypot: if the hidden field has a value, it's a bot
  if (_hp) {
    // Return success so bots think it worked
    return NextResponse.json({ success: true });
  }

  // 2. Time-based: reject full submissions faster than 3 seconds
  if (!partial && _t) {
    const elapsed = Date.now() - _t;
    if (elapsed < 3000) {
      return NextResponse.json({ success: true });
    }
  }

  // 3. Field length limits: reject absurdly long values
  if (firstName.length > 100 || lastName.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ success: true });
  }

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
