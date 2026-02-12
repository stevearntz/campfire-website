import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CrispChat from "./components/CrispChat";
import Clarity from "./components/Clarity";
import RB2B from "./components/RB2B";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campfire | Build Better Leaders — Your Way, at Scale",
  description:
    "Flexible leadership development designed for modern, growing teams. Scalable workshops and programs that create direction, grow skills, and align your people.",
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
      </body>
    </html>
  );
}
