/* ═══════════════════════════════════════════════════════════
   YPO Activating Behaviors — Authoritative framework data
   Source of truth from Design. Do not modify without a
   matching Design drop.
   ═══════════════════════════════════════════════════════════ */

export interface BehaviorItem {
  readonly key: string;
  readonly text: string;
  readonly peerText: string;
}

export interface Circle {
  readonly key: string;
  readonly title: string;
  readonly tagline: string;
  readonly color: string;
  readonly colorDark: string;
  readonly wash: string;
  readonly items: readonly [BehaviorItem, BehaviorItem, BehaviorItem];
  /** Open-ended prompt shown at the end of the section. */
  readonly feedback: {
    /** First-person, shown in the self-assessment. */
    readonly self: string;
    /** Third-person ("This person…"), shown in peer rating. Name-substituted like peerText. */
    readonly peer: string;
  };
}

export const CIRCLES: readonly Circle[] = [
  {
    key: "joy",
    title: "Joy",
    tagline: "We create an environment people want to be in.",
    color: "#F59E2C",
    colorDark: "#9A6F00",
    wash: "rgba(245,158,44,0.14)",
    items: [
      { key: "joy1", text: "I bring a constructive, hopeful attitude when we hit challenges.", peerText: "This person brings a constructive, hopeful attitude when the team hits challenges." },
      { key: "joy2", text: "I stay open and respectful when views differ from mine.", peerText: "This person stays open and respectful when views differ from theirs." },
      { key: "joy3", text: "I work at a sustainable pace that doesn\u2019t lead to burnout.", peerText: "This person works at a sustainable pace that doesn\u2019t lead to burnout." },
    ],
    feedback: {
      self: "What\u2019s one thing you could do to bring more joy or energy to the team?",
      peer: "What\u2019s one thing this person could do to bring more joy or energy to the team?",
    },
  },
  {
    key: "trust",
    title: "Trust",
    tagline: "We do what we say and show up fully.",
    color: "#6E3FCC",
    colorDark: "#5B34AB",
    wash: "rgba(110,63,204,0.12)",
    items: [
      { key: "trust1", text: "I follow through on the commitments I make.", peerText: "This person follows through on the commitments they make." },
      { key: "trust2", text: "I actively contribute ideas and energy to the work.", peerText: "This person actively contributes ideas and energy to the work." },
      { key: "trust3", text: "I listen with curiosity instead of assuming I already know.", peerText: "This person listens with curiosity instead of assuming they already know." },
    ],
    feedback: {
      self: "What’s one thing you could do to build more trust?",
      peer: "What’s one thing this person could do to build more trust?",
    },
  },
  {
    key: "power",
    title: "Power",
    tagline: "We don\u2019t wait. We lead.",
    color: "#E055CB",
    colorDark: "#B23B9F",
    wash: "rgba(224,85,203,0.12)",
    items: [
      { key: "power1", text: "I move work forward proactively rather than waiting.", peerText: "This person moves work forward proactively rather than waiting." },
      { key: "power2", text: "I stay solutions-focused when challenges come up.", peerText: "This person stays solutions-focused when challenges come up." },
      { key: "power3", text: "I stay steady and adaptable through change.", peerText: "This person stays steady and adaptable through change." },
    ],
    feedback: {
      self: "What’s one thing you could do to lead more powerfully or take more initiative?",
      peer: "What’s one thing this person could do to lead more powerfully or take more initiative?",
    },
  },
  {
    key: "part",
    title: "Partnership",
    tagline: "We elevate the whole system.",
    color: "#30B7B7",
    colorDark: "#1F8A8A",
    wash: "rgba(48,183,183,0.14)",
    items: [
      { key: "part1", text: "I create room for others to succeed.", peerText: "This person creates room for others to succeed." },
      { key: "part2", text: "I solve issues rather than assigning blame.", peerText: "This person solves issues rather than assigning blame." },
      { key: "part3", text: "I balance execution with strategy.", peerText: "This person balances execution with strategy." },
    ],
    feedback: {
      self: "What’s one thing you could do to be a stronger partner across the team?",
      peer: "What’s one thing this person could do to be a stronger partner across the team?",
    },
  },
] as const;

/** All 12 item keys in order */
export const ALL_ITEM_KEYS = CIRCLES.flatMap((c) => c.items.map((i) => i.key));

/**
 * Minimum completed peers before results are visible.
 * YPO wants full transparency — results unlock as soon as one peer responds.
 * (Was 3 as an anonymity threshold; anonymity has been removed by request.)
 */
export const MIN_PEERS = 1;

/** Lookup circle by item key */
export function circleForItem(itemKey: string): Circle | undefined {
  return CIRCLES.find((c) => c.items.some((i) => i.key === itemKey));
}

/** Responses map: itemKey → value (1-6) */
export type Responses = Record<string, number>;

/** Compute mean for a circle (returns 0 if no answers) */
export function circleMean(circle: Circle, responses: Responses): number {
  const vals = circle.items.map((i) => responses[i.key]).filter((v) => v != null);
  if (vals.length === 0) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/** Compute sum for a circle (3–18, or 0 if unanswered) */
export function circleSum(circle: Circle, responses: Responses): number {
  const vals = circle.items.map((i) => responses[i.key]).filter((v) => v != null);
  if (vals.length === 0) return 0;
  return vals.reduce((a, b) => a + b, 0);
}

/** Get peer-facing text, substituting first name for "This person" if provided */
export function peerItemText(item: BehaviorItem, firstName?: string): string {
  if (!firstName) return item.peerText;
  return item.peerText.replace(/^This person/, firstName);
}

/** Get the peer-facing open-ended prompt, substituting first name if provided */
export function peerFeedbackText(circle: Circle, firstName?: string): string {
  if (!firstName) return circle.feedback.peer;
  return circle.feedback.peer.replace(/this person/, firstName);
}
