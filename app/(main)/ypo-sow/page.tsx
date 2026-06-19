import type { Metadata } from "next";
import YpoSowClient from "./YpoSowClient";

export const metadata: Metadata = {
  title: "Statement of Work — YPO Marcoms",
  robots: { index: false, follow: false },
};

export default function YpoSowPage() {
  return <YpoSowClient />;
}
