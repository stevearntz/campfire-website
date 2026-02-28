import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "Blog — By the Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "By the Campfire",
    "Ideas, insights, and practical advice on leadership development, team culture, and building better managers."
  );
}
