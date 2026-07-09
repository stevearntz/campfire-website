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
  assessment: { id: number; status: string } | null;
}

/**
 * Shared loader for the signed-in member routes. Fetches the current user and
 * their latest assessment (responses + feedback). If the visitor isn't
 * authenticated, redirects to the tool entry (/ypo-tool), which shows sign-in.
 * Each page applies its own status-based guard on top of this.
 */
export function useMember(): MemberData {
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
        const cur = await fetch("/api/ypo-tool/assessment/current").then((r) =>
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
  }, [router]);

  return data;
}
