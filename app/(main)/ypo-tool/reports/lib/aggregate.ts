import { CIRCLES } from "@/app/(main)/ypo-tool/lib/behaviors";

/**
 * Team-level aggregates for the YPO reports page. Each MEMBER is weighted
 * equally (a member's peer score is the mean of their own peers, so someone
 * with 10 peers doesn't outweigh someone with 2). Values are circle sums out
 * of 18; behavior means are on the raw 1–6 scale.
 */
export interface BehaviorAgg {
  key: string;
  text: string;
  selfMean: number; // 1–6, team mean of self ratings
  peerMean: number; // 1–6, team mean of per-member peer means
}
export interface CircleAgg {
  key: string;
  title: string;
  color: string;
  selfSum: number; // /18 team mean
  peerSum: number; // /18 team mean
  gap: number; // selfSum − peerSum
  selfValues: number[]; // per-member self circle sums (/18) — for distribution
  peerValues: number[]; // per-member peer-avg circle sums (/18)
  behaviors: BehaviorAgg[];
}
export interface TeamAggregate {
  coverage: { members: number; peerResponses: number; avgPeers: number; asOf: string };
  circles: CircleAgg[];
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const round1 = (n: number) => Math.round(n * 10) / 10;

export async function getTeamAggregate(): Promise<TeamAggregate> {
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.POSTGRES_URL!);

  // Latest completed self-assessment per real YPO member — "where the group
  // stands" reflects each person's most recent state, one row per member.
  const assessments = (await sql`
    SELECT DISTINCT ON (u.id) a.id, u.id AS user_id
    FROM ypo_assessment a
    JOIN ypo_users u ON u.id = a.user_id
    WHERE a.status = 'complete' AND lower(u.email) LIKE '%@ypo.org'
    ORDER BY u.id, a.created_at DESC
  `) as { id: number; user_id: number }[];

  // Per member: self item values, and per-item list of peer means.
  const perMemberSelf: Record<string, number>[] = [];
  const perMemberPeer: Record<string, number>[] = []; // item → mean across that member's peers
  let peerResponses = 0;

  for (const a of assessments) {
    const selfRows = (await sql`
      SELECT item_key, value FROM ypo_response WHERE assessment_id = ${a.id}
    `) as { item_key: string; value: number }[];
    perMemberSelf.push(Object.fromEntries(selfRows.map((r) => [r.item_key, r.value])));

    const inv = (await sql`
      SELECT id FROM ypo_peer_invite WHERE assessment_id = ${a.id}
    `) as { id: number }[];
    const memberPeer: Record<string, number[]> = {};
    if (inv.length) {
      // One response per rater — their most recent. A rater can re-rate over
      // time (progress tracking); the current snapshot uses only their latest.
      const prs = (await sql`
        SELECT id, rater_name, completed_at FROM ypo_peer_response
        WHERE invite_id = ${inv[0].id} AND status = 'complete'
        ORDER BY completed_at DESC NULLS LAST
      `) as { id: number; rater_name: string | null; completed_at: string | null }[];
      const seen = new Set<string>();
      const latest = prs.filter((pr) => {
        const key = (pr.rater_name || "").trim().toLowerCase() || `__id${pr.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      peerResponses += latest.length;
      for (const pr of latest) {
        const ans = (await sql`
          SELECT item_key, value FROM ypo_peer_answer WHERE peer_response_id = ${pr.id}
        `) as { item_key: string; value: number }[];
        for (const r of ans) (memberPeer[r.item_key] ??= []).push(r.value);
      }
    }
    perMemberPeer.push(
      Object.fromEntries(Object.entries(memberPeer).map(([k, v]) => [k, mean(v)])),
    );
  }

  const circles: CircleAgg[] = CIRCLES.map((c) => {
    const behaviors: BehaviorAgg[] = c.items.map((item) => ({
      key: item.key,
      text: item.text,
      selfMean: round1(mean(perMemberSelf.map((m) => m[item.key]).filter((v) => v != null))),
      peerMean: round1(mean(perMemberPeer.map((m) => m[item.key]).filter((v) => v != null))),
    }));
    // Circle sums: team mean of each member's circle sum (/18).
    const selfSums = perMemberSelf
      .map((m) => c.items.reduce((acc, i) => acc + (m[i.key] ?? 0), 0))
      .filter((s) => s > 0);
    const peerSums = perMemberPeer
      .map((m) => c.items.reduce((acc, i) => acc + (m[i.key] ?? 0), 0))
      .filter((s) => s > 0);
    const selfSum = round1(mean(selfSums));
    const peerSum = round1(mean(peerSums));
    return {
      key: c.key, title: c.title, color: c.color, selfSum, peerSum,
      gap: round1(selfSum - peerSum),
      selfValues: selfSums.map(round1),
      peerValues: peerSums.map(round1),
      behaviors,
    };
  });

  return {
    coverage: {
      members: assessments.length,
      peerResponses,
      avgPeers: assessments.length ? round1(peerResponses / assessments.length) : 0,
      asOf: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    },
    circles,
  };
}
