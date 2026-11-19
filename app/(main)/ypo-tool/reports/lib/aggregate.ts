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
  selfSum: number; // /18
  peerSum: number; // /18
  gap: number; // selfSum − peerSum
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

  // Real YPO members with a completed self-assessment.
  const assessments = (await sql`
    SELECT a.id, u.id AS user_id
    FROM ypo_assessment a
    JOIN ypo_users u ON u.id = a.user_id
    WHERE a.status = 'complete' AND lower(u.email) LIKE '%@ypo.org'
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
      const prs = (await sql`
        SELECT id FROM ypo_peer_response WHERE invite_id = ${inv[0].id} AND status = 'complete'
      `) as { id: number }[];
      peerResponses += prs.length;
      for (const pr of prs) {
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
    return { key: c.key, title: c.title, color: c.color, selfSum, peerSum, gap: round1(selfSum - peerSum), behaviors };
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
