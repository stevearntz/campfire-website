import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "Solutions — Scalable Leadership Programs | Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "Scalable Leadership Programs",
    "Practical support for real challenges. Solutions that adapt to your culture."
  );
}
