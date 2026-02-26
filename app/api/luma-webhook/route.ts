import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createHmac, timingSafeEqual } from "crypto";

function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const secret = process.env.LUMA_WEBHOOK_SECRET;
  const rawBody = await request.text();

  // Verify signature if secret is configured
  if (secret) {
    const signature = request.headers.get("x-luma-signature");
    if (!verifySignature(rawBody, signature, secret)) {
      console.warn("Luma webhook signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("Luma webhook received:", JSON.stringify(payload).slice(0, 500));

  // Revalidate the events page so it picks up changes
  revalidatePath("/events");

  return NextResponse.json({ received: true });
}
