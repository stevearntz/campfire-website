import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "Customer Stories — Leadership Development, Your Way | Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "Customer Stories",
    "Every organization hired Campfire for a different reason. The common thread? Leadership development — built their way."
  );
}
