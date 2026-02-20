import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CrispChat from "./components/CrispChat";
import Clarity from "./components/Clarity";
import RB2B from "./components/RB2B";
import ConsoleGreeting from "./components/ConsoleGreeting";

const spartan = League_Spartan({
  variable: "--font-spartan",
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
    default: "Campfire - Learn More",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spartan.variable} antialiased font-sans`}>
        <Navbar />
        {children}
        <Footer />
        <CrispChat />
        <Clarity />
        <RB2B />
        <ConsoleGreeting />
      </body>
    </html>
  );
}
