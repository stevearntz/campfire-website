import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Easter Egg Hunt — 50+ Hidden Secrets | Campfire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#06021B",
          backgroundImage:
            "radial-gradient(ellipse at 30% 50%, rgba(110,63,204,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(238,129,221,0.2) 0%, transparent 50%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Decorative eggs */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            fontSize: "48px",
            opacity: 0.3,
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "100px",
            fontSize: "36px",
            opacity: 0.2,
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "120px",
            fontSize: "40px",
            opacity: 0.25,
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            fontSize: "44px",
            opacity: 0.2,
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "40px",
            fontSize: "28px",
            opacity: 0.15,
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "200px",
            right: "40px",
            fontSize: "32px",
            opacity: 0.15,
            display: "flex",
          }}
        >
          🥚
        </div>

        {/* Main content */}
        <div
          style={{
            fontSize: "72px",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          🥚
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#E8E2F9",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "16px",
            display: "flex",
          }}
        >
          The Easter Egg Hunt
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#9D88ED",
            textAlign: "center",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          50+ hidden secrets to find
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#9D88ED",
            opacity: 0.7,
            letterSpacing: "3px",
            textTransform: "uppercase" as const,
            display: "flex",
          }}
        >
          getcampfire.com
        </div>
      </div>
    ),
    { ...size }
  );
}
