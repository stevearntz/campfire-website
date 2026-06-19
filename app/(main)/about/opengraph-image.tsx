import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "About Campfire — The Human Side of Leadership Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "The Human Side of Leadership Development",
    "Leadership development should feel human — practical, honest, and built around real challenges."
  );
}
