import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  // TODO: verify webhook signature once we have the signing secret
  // const signature = request.headers.get("x-luma-signature");

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Log for debugging
  console.log("Luma webhook received:", JSON.stringify(payload).slice(0, 500));

  // Revalidate the events page so it picks up changes
  revalidatePath("/events");

  return NextResponse.json({ received: true });
}
