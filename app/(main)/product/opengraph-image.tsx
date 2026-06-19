import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "Our Product — More Than a Meeting Platform | Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "Our Product",
    "More Than a Meeting Platform"
  );
}
