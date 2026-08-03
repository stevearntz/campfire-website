"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { YpoUser } from "../lib/constants";
import AppHeader from "../components/AppHeader";
import TrendChart, { type TrendRound } from "../components/TrendChart";

interface TrendApiRound {
  id: number;
  title: string | null;
  startedAt: string;
  self: Record<string, number>;
  peer: Record<string, number> | null;
}

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function shortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function ProgressPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<YpoUser | null>(null);
  const [rounds, setRounds] = useState<TrendApiRound[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetch("/api/ypo-tool/auth/me").then((r) => r.json());
        if (!me.user) {
          router.replace("/ypo-tool");
          return;
        }
        const trend = await fetch("/api/ypo-tool/rounds/trend").then((r) => r.json());
        if (cancelled) return;
        setUser(me.user);
        setRounds(trend.rounds || []);
        setLoading(false);
      } catch {
        if (!cancelled) router.replace("/ypo-tool");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) return <Spinner />;

  const series: TrendRound[] = rounds.map((r) => ({
    id: r.id,
    label: r.title || shortDate(r.startedAt),
    self: r.self,
    peer: r.peer,
  }));

  return (
    <div className="min-h-screen bg-white">
      <AppHeader email={user?.email} crumb="Progress" />
      <div className="min-h-[calc(100vh-64px)] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p
            className="font-bold uppercase mb-4"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6E3FCC" }}
          >
            Activating Behaviors
          </p>
          <h1
            className="font-extrabold mb-3"
            style={{ fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.1, color: "#1E2A4A" }}
          >
            Your progress over time
          </h1>

          {series.length < 2 ? (
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", maxWidth: 560 }}>
              {series.length === 0
                ? "Once you complete a round, your scores will start charting here."
                : "You’ve completed one round so far. After your next one, you’ll see how your self-view and your peers’ read move over time."}
            </p>
          ) : (
            <>
              <p
                className="mb-10"
                style={{ fontSize: 17, lineHeight: 1.6, color: "#636B7C", maxWidth: 620 }}
              >
                How your self-view and your peers’ read have moved across{" "}
                {series.length} rounds — one line per circle.
              </p>
              <TrendChart rounds={series} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
