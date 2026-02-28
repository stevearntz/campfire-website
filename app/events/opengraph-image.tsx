import { generateOGImage } from "@/app/lib/og";

export const runtime = "edge";
export const alt = "Events — Not Another Webinar | Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage(
    "Not Another Webinar",
    "Drop-in events open to all HR and People Ops professionals."
  );
}
