// The 25 Campfire Superlatives, transcribed from "Campfire Awards.pdf".
// Each certificate in the source deck uses one of six accent colors, cycling
// in order every six awards — so we derive the color from the award number
// rather than storing it per-award. (Verified against all 25 source pages.)

export interface Award {
  no: number;
  title: string;
  /** Override the default "Presented in recognition of being" lead-in. */
  preamble?: string;
}

export const DEFAULT_PREAMBLE = "Presented in recognition of being";

export const AWARDS: Award[] = [
  { no: 1, title: "Most likely to turn a group chat idea into an actual LLC" },
  { no: 2, title: "Most likely to still be using a Campfire-branded item in 10 years" },
  { no: 3, title: "Most likely to reply to Slack at 11:47 PM" },
  { no: 4, title: "Most likely to become weirdly famous" },
  { no: 5, title: "Most likely to make something quietly beautiful and never mention it" },
  { no: 6, title: "Most likely to be right a year before anyone agrees" },
  { no: 7, title: "Most likely to say “I have one thought…” and then completely change the plan" },
  { no: 8, title: "Most likely to fix the thing nobody noticed was broken" },
  { no: 9, title: "Most likely to actually use something they learned at Campfire in parenting" },
  { no: 10, title: "Most likely to run into a former Campfire customer at Costco" },
  { no: 11, title: "Most likely to text the group chat six months from now with a random Campfire memory" },
  {
    no: 12,
    title: "Best unofficial Campfire catchphrase",
    preamble: "Presented in recognition of",
  },
  {
    no: 13,
    title: "Most likely to end a 40-minute debate with one sentence",
    preamble: "Presented in recognition of outstanding achievement as",
  },
  { no: 14, title: "Most Campfire thing that ever happened" },
  { no: 15, title: "Most likely to send one link that ends the conversation" },
  { no: 16, title: "Most likely to have a spreadsheet nobody asked for" },
  { no: 17, title: "Most likely to join the call from a parking lot" },
  { no: 18, title: "Most likely to name a future pet Ember" },
  { no: 19, title: "Most likely to still be in this Slack workspace in 2031" },
  { no: 20, title: "Most likely to be quietly running three other businesses" },
  { no: 21, title: "Most likely to deliver a whole monologue on mute" },
  { no: 22, title: "Most likely to remember the exact date everything happened" },
  { no: 23, title: "Most likely to become the group chat’s tech support" },
  { no: 24, title: "Most likely to say “sorry, one more thing” at minute 59" },
  { no: 25, title: "Most likely to organize the reunion nobody scheduled" },
];

export interface AwardColor {
  /** Accent (borders, corner ticks, "AWARD NO." + stamp). */
  accent: string;
  /** Softer tint of the accent for glows/fills. */
  tint: string;
  name: string;
}

// The six-color rotation, matching the source deck order.
const PALETTE: AwardColor[] = [
  { name: "purple", accent: "#6E3FCC", tint: "#EDE7FA" },
  { name: "teal", accent: "#2E9E92", tint: "#E1F1EF" },
  { name: "rose", accent: "#DB466F", tint: "#FbE5EB" },
  { name: "gold", accent: "#C08A2B", tint: "#F6ECD8" },
  { name: "blue", accent: "#3B57C4", tint: "#E5E9F8" },
  { name: "ember", accent: "#D2502A", tint: "#FAE7DF" },
];

export function colorForAward(no: number): AwardColor {
  return PALETTE[(no - 1) % PALETTE.length];
}

export const TOTAL_AWARDS = AWARDS.length;

export function awardByNo(no: number): Award | undefined {
  return AWARDS.find((a) => a.no === no);
}
