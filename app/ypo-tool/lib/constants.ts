/* ═══════════════════════════════════════════════════════════
   YPO Activating Behaviors — Framework Data & Types
   ═══════════════════════════════════════════════════════════ */

export const CATEGORIES = {
  JOY: "joy",
  TRUST: "trust",
  POWER: "power",
  PARTNERSHIP: "partnership",
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export const CATEGORY_ORDER: Category[] = [
  "joy",
  "trust",
  "power",
  "partnership",
];

export const SCALE_POINTS = 6;

export const SCALE_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
] as const;

export const FRAMEWORK: Record<
  Category,
  {
    title: string;
    subtitle: string;
    color: string;
    behaviors: [string, string, string];
  }
> = {
  joy: {
    title: "JOY",
    subtitle: "We create an environment people want to be in.",
    color: "#F59E2C",
    behaviors: [
      "Maintains a constructive and hopeful attitude, even during challenges",
      "Responds to differing opinions with openness and respect",
      "Works in a sustainable way that reduces burnout for themselves and others",
    ],
  },
  trust: {
    title: "TRUST",
    subtitle: "We do what we say and show up fully.",
    color: "#6E3FCC",
    behaviors: [
      "Follows through on commitments reliably and consistently",
      "Actively contributes ideas, perspectives, and engagement",
      "Listens to others with curiosity rather than assumptions",
    ],
  },
  power: {
    title: "POWER",
    subtitle: "We don\u2019t wait. We lead.",
    color: "#E055CB",
    behaviors: [
      "Moves work forward proactively rather than reactively",
      "Approaches challenges with a solutions-focused mindset",
      "Remains steady and adaptable during uncertainty or change",
    ],
  },
  partnership: {
    title: "PARTNERSHIP",
    subtitle: "We elevate the whole system.",
    color: "#30B7B7",
    behaviors: [
      "Creates opportunities for others to contribute and succeed",
      "Focuses on solving issues rather than assigning blame",
      "Balances execution with strategic thinking and prioritization",
    ],
  },
};

export const REFLECTION_PROMPTS: Record<Category, string[]> = {
  joy: [
    "What situations tend to challenge your ability to maintain a constructive attitude?",
    "How might focusing on this behavior improve your team dynamics?",
    "What one practice could you implement this week to grow in this area?",
  ],
  trust: [
    "When do you notice this behavior slipping?",
    "What impact might strengthening this have on your relationships?",
    "Who could you ask for feedback on this behavior?",
  ],
  power: [
    "What holds you back from demonstrating this behavior more consistently?",
    "How would your team benefit if you strengthened this?",
    "What small step could you take today to practice this?",
  ],
  partnership: [
    "In what contexts do you find this behavior most challenging?",
    "How might this behavior shift the way others experience working with you?",
    "What specific action could help you develop this skill?",
  ],
};

export const CIRCLES_FRAMEWORK = {
  control: {
    label: "Control",
    description: "What you can directly change through your own actions",
  },
  influence: {
    label: "Influence",
    description:
      "What you can affect through relationships, communication, and example",
  },
  concern: {
    label: "Concern",
    description: "What you can notice and be aware of, but cannot control",
  },
} as const;

/* ═══ TypeScript Types ═══ */

export interface BehaviorScores {
  joy: [number, number, number];
  trust: [number, number, number];
  power: [number, number, number];
  partnership: [number, number, number];
}

export interface CategoryAverages {
  joy: number;
  trust: number;
  power: number;
  partnership: number;
}

export interface StrengthGrowth {
  category: Category;
  behaviorIndex: number; // 0, 1, or 2
}

export interface SelfAssessmentInput {
  type: "self";
  scores: BehaviorScores;
  strength: StrengthGrowth;
  growth: StrengthGrowth;
}

export interface PeerAssessmentInput {
  type: "peer";
  targetName: string;
  scores: BehaviorScores;
  observation: string;
  encouragement: string;
}

export type AssessmentInput = SelfAssessmentInput | PeerAssessmentInput;

export interface AssessmentRecord {
  id: number;
  userId: number;
  type: "self" | "peer";
  targetName?: string;
  scores: BehaviorScores;
  averages: CategoryAverages;
  strength?: StrengthGrowth;
  growth?: StrengthGrowth;
  observation?: string;
  encouragement?: string;
  shareToken?: string;
  viewCount: number;
  createdAt: string;
}

export interface YpoUser {
  id: number;
  email: string;
  name: string | null;
}

export interface YpoSession {
  user: YpoUser;
  expiresAt: string;
}

/* ═══ Validation ═══ */

export const ALLOWED_DOMAIN = "@ypo.org";

export function isValidYpoEmail(email: string): boolean {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.toLowerCase().endsWith(ALLOWED_DOMAIN)
  );
}
