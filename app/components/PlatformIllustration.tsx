export default function PlatformIllustration() {
  // Layout: left cards (185w) + 60px gap + video player (722w) + 60px gap + custom program (283w) = 1310
  // Left cards: x=0, Video: x=245, Custom: x=1027

  // Flow paths: left cards → into video player (right edge x=185 → ~60px into player at x=310)
  const brandFlow = "M 185 120 C 215 120, 240 135, 260 155 S 290 185, 310 200";
  const frameworksFlow = "M 185 266 C 215 266, 240 266, 260 266 S 285 266, 310 266";
  const cultureFlow = "M 185 412 C 215 412, 240 400, 260 380 S 290 350, 310 335";

  // Flow paths: custom program → into video player (left edge x=1027 → ~60px into player at x=900)
  const programFlow1 = "M 1027 160 C 1000 160, 975 155, 955 150 S 930 142, 900 135";
  const programFlow2 = "M 1027 266 C 1000 266, 975 260, 955 255 S 930 250, 900 248";
  const programFlow3 = "M 1027 375 C 1000 375, 975 365, 955 350 S 930 335, 900 325";

  return (
    <svg
      viewBox="0 0 1310 533"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="Illustration showing customer brand, culture, frameworks, and custom program content flowing into the Campfire video platform"
    >
      <defs>
        {/* Left flow gradients */}
        <linearGradient id="flowL1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EE80DD" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flowL2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A84AEB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#EE80DD" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flowL3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D65CE9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9D88ED" stopOpacity="0.7" />
        </linearGradient>

        {/* Right flow gradient */}
        <linearGradient id="flowR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EE80DD" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>

        {/* Animated pulse (left → right) */}
        <linearGradient id="pulseL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#EE80DD" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.9;0" dur="2s" repeatCount="indefinite" begin="0.2s" />
          </stop>
          <stop offset="100%" stopColor="#9D88ED" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" begin="0.4s" />
          </stop>
        </linearGradient>

        {/* Animated pulse (right → left) */}
        <linearGradient id="pulseR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.6;0" dur="2.2s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#EE80DD" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.9;0" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
          </stop>
          <stop offset="100%" stopColor="#9D88ED" stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.5;0" dur="2.2s" repeatCount="indefinite" begin="0.6s" />
          </stop>
        </linearGradient>

        {/* Glow filters */}
        <filter id="flowGlow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#EE80DD" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>


      {/* ===== LEFT FLOW STREAMS (cards → video player) ===== */}
      <g filter="url(#flowGlow)">
        <path d={brandFlow} fill="none" stroke="url(#flowL1)" strokeWidth="3" strokeLinecap="round" />
        <path d={brandFlow} fill="none" stroke="url(#pulseL)" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        <path d={frameworksFlow} fill="none" stroke="url(#flowL2)" strokeWidth="3" strokeLinecap="round" />
        <path d={frameworksFlow} fill="none" stroke="url(#pulseL)" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        <path d={cultureFlow} fill="none" stroke="url(#flowL3)" strokeWidth="3" strokeLinecap="round" />
        <path d={cultureFlow} fill="none" stroke="url(#pulseL)" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Left animated particles */}
      <circle r="4" fill="#ffffff">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={brandFlow} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#EE80DD">
        <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.5s" path={brandFlow} />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.6s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle r="2.5" fill="#9D88ED">
        <animateMotion dur="1.6s" repeatCount="indefinite" begin="1s" path={brandFlow} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="1.6s" repeatCount="indefinite" begin="1s" />
      </circle>

      <circle r="4" fill="#EE80DD">
        <animateMotion dur="1.4s" repeatCount="indefinite" path={frameworksFlow} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#ffffff">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.5s" path={frameworksFlow} />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.4s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle r="2.5" fill="#A84AEB">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.9s" path={frameworksFlow} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="1.4s" repeatCount="indefinite" begin="0.9s" />
      </circle>

      <circle r="4" fill="#D65CE9">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={cultureFlow} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#ffffff">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s" path={cultureFlow} />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
      </circle>
      <circle r="2.5" fill="#EE80DD">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.2s" path={cultureFlow} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
      </circle>


      {/* ===== RIGHT FLOW STREAMS (custom program → video player) ===== */}
      <g filter="url(#flowGlow)">
        <path d={programFlow1} fill="none" stroke="url(#flowR)" strokeWidth="3" strokeLinecap="round" />
        <path d={programFlow1} fill="none" stroke="url(#pulseR)" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        <path d={programFlow2} fill="none" stroke="url(#flowR)" strokeWidth="4" strokeLinecap="round" />
        <path d={programFlow2} fill="none" stroke="url(#pulseR)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        <path d={programFlow3} fill="none" stroke="url(#flowR)" strokeWidth="3" strokeLinecap="round" />
        <path d={programFlow3} fill="none" stroke="url(#pulseR)" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
      </g>

      <circle r="4" fill="#ffffff">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={programFlow1} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#EE80DD">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s" path={programFlow1} />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
      </circle>

      <circle r="5" fill="#EE80DD">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={programFlow2} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="#ffffff">
        <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.5s" path={programFlow2} />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.6s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle r="3" fill="#9D88ED">
        <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.1s" path={programFlow2} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="1.6s" repeatCount="indefinite" begin="1.1s" />
      </circle>

      <circle r="4" fill="#D65CE9">
        <animateMotion dur="2s" repeatCount="indefinite" path={programFlow3} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#ffffff">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path={programFlow3} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="2s" repeatCount="indefinite" begin="0.7s" />
      </circle>


      {/* ===== LEFT CARDS: 185w x 120h, 26px vertical gaps, centered ===== */}
      <image href="/your-brand.png" x="0" y="60" width="185" height="120" />
      <image href="/your-frameworks.png" x="0" y="206" width="185" height="120" />
      <image href="/your-culture.png" x="0" y="352" width="185" height="120" />


      {/* ===== CENTER: VIDEO PLAYER — x=245, w=722 ===== */}
      <image href="/video-player.png" x="245" y="0" width="722" height="533" preserveAspectRatio="xMidYMid meet" />


      {/* ===== RIGHT: CUSTOM PROGRAM — x=1027, 283w x 417h, vertically centered ===== */}
      <image href="/custom-program.png" x="1027" y="58" width="283" height="417" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
