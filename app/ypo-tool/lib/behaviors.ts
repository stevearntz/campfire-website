/* ═══════════════════════════════════════════════════════════
   YPO Activating Behaviors — Authoritative framework data
   Source of truth from Design. Do not modify without a
   matching Design drop.
   ═══════════════════════════════════════════════════════════ */

export interface BehaviorItem {
  readonly key: string;
  readonly text: string;
}

export interface Circle {
  readonly key: string;
  readonly title: string;
  readonly tagline: string;
  readonly color: string;
  readonly colorDark: string;
  readonly wash: string;
  readonly items: readonly [BehaviorItem, BehaviorItem, BehaviorItem];
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
      { key: "joy1", text: "I bring a constructive, hopeful attitude when we hit challenges." },
      { key: "joy2", text: "I stay open and respectful when views differ from mine." },
      { key: "joy3", text: "I work at a sustainable pace that doesn\u2019t lead to burnout." },
    ],
  },
  {
    key: "trust",
    title: "Trust",
    tagline: "We do what we say and show up fully.",
    color: "#6E3FCC",
    colorDark: "#5B34AB",
    wash: "rgba(110,63,204,0.12)",
    items: [
      { key: "trust1", text: "I follow through on the commitments I make." },
      { key: "trust2", text: "I actively contribute ideas and energy to the work." },
      { key: "trust3", text: "I listen with curiosity instead of assuming I already know." },
    ],
  },
  {
    key: "power",
    title: "Power",
    tagline: "We don\u2019t wait. We lead.",
    color: "#E055CB",
    colorDark: "#B23B9F",
    wash: "rgba(224,85,203,0.12)",
    items: [
      { key: "power1", text: "I move work forward proactively rather than waiting." },
      { key: "power2", text: "I stay solutions-focused when challenges come up." },
      { key: "power3", text: "I stay steady and adaptable through change." },
    ],
  },
  {
    key: "part",
    title: "Partnership",
    tagline: "We elevate the whole system.",
    color: "#30B7B7",
    colorDark: "#1F8A8A",
    wash: "rgba(48,183,183,0.14)",
    items: [
      { key: "part1", text: "I create room for others to succeed." },
      { key: "part2", text: "I solve issues rather than assigning blame." },
      { key: "part3", text: "I balance execution with strategy." },
    ],
  },
] as const;

/** All 12 item keys in order */
export const ALL_ITEM_KEYS = CIRCLES.flatMap((c) => c.items.map((i) => i.key));

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
