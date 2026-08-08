import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

/* Attune type: Cormorant Garamond stands in for the licensed Canela display
   face; Inter is the body/UI sans. Scoped to /assessment only. */
const attuneSerif = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-attune-serif",
});

const attuneSans = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-attune-sans",
});

export const metadata: Metadata = {
  title: "Attune — Organizational Assessment",
  robots: { index: false, follow: false }, // prototype: keep out of search + nav
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${attuneSerif.variable} ${attuneSans.variable} min-h-screen`}
      style={{
        fontFamily: "var(--font-attune-sans), Inter, sans-serif",
        backgroundColor: "#F3F0EA", // --stone-100, warm paper
        color: "#2D2F33", // --ink-800
      }}
    >
      {children}
    </div>
  );
}
