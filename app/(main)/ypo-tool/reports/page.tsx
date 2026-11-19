import type { Metadata } from "next";
import { cookies } from "next/headers";
import { REPORTS_COOKIE, REPORTS_HASH } from "./lib/gate";
import PasswordGate from "./PasswordGate";
import ReportsView from "./ReportsView";
import { getTeamAggregate } from "./lib/aggregate";

export const metadata: Metadata = {
  title: "Team Reports · Activating Behaviors",
  robots: { index: false, follow: false },
};

// Aggregates read the live DB per request.
export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const authed = (await cookies()).get(REPORTS_COOKIE)?.value === REPORTS_HASH;
  if (!authed) return <PasswordGate />;

  const data = await getTeamAggregate();
  return <ReportsView data={data} />;
}
