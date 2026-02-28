import { ImageResponse } from "next/og";

export async function generateOGImage(title: string, subtitle?: string) {
  const fontData = await fetch(
    new URL("./fonts/LeagueSpartan-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #A84AEB 0%, #7F28CC 40%, #4E0DA9 100%)",
          fontFamily: "League Spartan",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 36,
            opacity: 0.85,
            marginBottom: "20px",
          }}
        >
          Campfire
        </div>
        <div
          style={{
            display: "flex",
            width: "60px",
            height: "4px",
            backgroundColor: "#EE81DD",
            borderRadius: "2px",
            marginBottom: "32px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? 48 : title.length > 35 ? 56 : 64,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              opacity: 0.75,
              marginTop: "24px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "50px",
            left: "80px",
            fontSize: 20,
            opacity: 0.45,
          }}
        >
          getcampfire.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "League Spartan",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
