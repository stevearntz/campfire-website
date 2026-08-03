"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { YpoUser } from "./constants";
import type { Responses } from "./behaviors";

export interface MemberData {
  loading: boolean;
  user: YpoUser | null;
  responses: Responses;
  feedback: Record<string, string>;
  assessment: {
    id: number;
    status: string;
    closed_at?: string | null;
    title?: string | null;
  } | null;
}

/**
 * Shared loader for the signed-in member routes. Fetches the current user and
 * an assessment (responses + feedback) — the member's current round by
 * default, or a specific owned round when `roundId` is given (for viewing
 * history read-only). Unauthenticated visitors are redirected to /ypo-tool.
 */
export function useMember(roundId?: string | null): MemberData {
  const router = useRouter();
  const [data, setData] = useState<MemberData>({
    loading: true,
    user: null,
    responses: {},
    feedback: {},
    assessment: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetch("/api/ypo-tool/auth/me").then((r) => r.json());
        if (!me.user) {
          router.replace("/ypo-tool");
          return;
        }
        const q = roundId ? `?round=${encodeURIComponent(roundId)}` : "";
        const cur = await fetch(`/api/ypo-tool/assessment/current${q}`).then((r) =>
          r.json(),
        );
        if (cancelled) return;
        setData({
          loading: false,
          user: me.user,
          responses: cur.responses || {},
          feedback: cur.feedback || {},
          assessment: cur.assessment || null,
        });
      } catch {
        if (!cancelled) router.replace("/ypo-tool");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, roundId]);

  return data;
}
