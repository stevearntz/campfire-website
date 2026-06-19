import type { Metadata } from "next";
import { League_Spartan, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Clarity from "./components/Clarity";
import RB2B from "./components/RB2B";
import GoogleAnalytics from "./components/GoogleAnalytics";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
});

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://getcampfire.com"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://getcampfire.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Campfire — Flexible Leadership Development for Growing Teams",
    template: "%s | Campfire",
  },
  description:
    "Flexible leadership development designed for modern, growing teams. Scalable workshops and programs that create direction, grow skills, and align your people.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Campfire",
    title: "Explore Campfire",
    description:
      "Everything you expect from leadership development \u2014 made flexible to fit your brand, your frameworks, and your culture. Designed for modern teams.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Explore Campfire" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://client.crisp.chat" />
        <link rel="preconnect" href="https://www.clarity.ms" />
      </head>
      <body className={`${spartan.variable} ${dmSerif.variable} antialiased font-sans`}>
        {children}
        <Clarity />
        <RB2B />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
