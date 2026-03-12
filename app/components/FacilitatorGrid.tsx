"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Facilitator {
  name: string;
  location: string;
  sessions: string;
  image: string;
  linkedin: string;
  bio: string;
  certifications: string;
  background: string;
  audiences: string;
  loveCampfire: string;
}

const facilitators: Facilitator[] = [
  {
    name: "Isabel Pollen",
    location: "London, UK",
    sessions: "250+ Sessions",
    image: "/facilitator-isabel.webp",
    linkedin: "https://www.linkedin.com/in/isabelpollen/",
    bio: "30 years as a professional actress and 16 years as a facilitator and coach with global teams. Works with everyone from graduates to group CEOs across corporate giants and ambitious startups.",
    certifications: "Royal Academy of Dramatic Art, Certified Physical Intelligence Coach, Positive Intelligence (PQ) Coach",
    background: "Almost 30 years as a professional actress around the globe, and 16 years as a facilitator and coach with global teams. Building digital fluency with AI and always focused on building human capital alongside the agents.",
    audiences: "From graduates to group CEOs \u2014 individuals and teams at all levels within a diverse range of industries, from corporate giants to ambitious startups.",
    loveCampfire: "The team. Special blend of talent. The impact this platform creates for every human heart that chooses to connect with it.",
  },
  {
    name: "Sigrid Rapp",
    location: "Dallas, TX",
    sessions: "250+ Sessions",
    image: "/facilitator-sigrid.webp",
    linkedin: "https://www.linkedin.com/in/sigridrapp/",
    bio: "15+ years in leadership development, coaching, and facilitation. ICF-certified coach who works with interns to executives, nonprofits to Fortune 100s \u2014 creating space for real, human conversations.",
    certifications: "PCC (Professional Certified Coach, ICF), TRACOM\u00ae Certified SOCIAL STYLE\u00ae & Versatility Instructor, Integrative Enneagram Practitioner",
    background: "15+ years in leadership development, coaching, and facilitation \u2014 with a past life in executive recruiting.",
    audiences: "Interns to executives, nonprofits to Fortune 100s \u2014 creating space for real, human conversations.",
    loveCampfire: "The vibe. It\u2019s real, refreshing, and built on the kind of connection that actually changes how people show up as leaders.",
  },
  {
    name: "Nami Prakash",
    location: "Atlanta, GA",
    sessions: "60+ Sessions",
    image: "/facilitator-nami.webp",
    linkedin: "https://www.linkedin.com/in/nami-prakash-5a9393/",
    bio: "20+ years in senior leadership across advertising, healthcare, and executive coaching. Has facilitated 350+ workshops for corporate teams and senior leaders across healthcare, life sciences, and professional services.",
    certifications: "Certified Life & Success Coach, Executive Coaching",
    background: "For over two decades, held senior leadership roles across advertising, healthcare communications, and executive coaching. Work sits at the intersection of leadership, mindset, and human-centered facilitation.",
    audiences: "350+ leadership and development workshops for corporate teams, senior leaders, and cross-functional groups across healthcare, life sciences, professional services, and creative industries.",
    loveCampfire: "Campfire does not just talk about leadership, it invites people to live it. The conversations are real, the community is rich, and the space feels like a breath of fresh air.",
  },
  {
    name: "Jordan Taylor",
    location: "Mesa, AZ / Sofia, Bulgaria",
    sessions: "50+ Sessions",
    image: "/facilitator-jordan.webp",
    linkedin: "https://www.linkedin.com/in/jordontaylor/",
    bio: "15+ years in corporate learning and development, leading global L&D teams across tech, logistics, retail, and government. Delivers onboarding, continuing education, and leadership training worldwide.",
    certifications: "ATD Managing Learning Programs & Trainer Certificate, Lean Six Sigma Yellow Belt, Situational Leadership, Crucial Conversations, Microsoft Generative AI Essentials",
    background: "Corporate learning and development for over fifteen years. Has led global L&D teams for a variety of companies across tech, logistics, retail, and government.",
    audiences: "Onboarding, continuing education, and leadership all over the world both live and virtual.",
    loveCampfire: "The Campfire platform is built from the ground up to create engaging and interactive learning experiences that don\u2019t end when the session is over, but continue to reinforce the learning long after.",
  },
  {
    name: "Cate Czerwinski",
    location: "Berlin, Germany",
    sessions: "20+ Sessions",
    image: "/facilitator-cate.webp",
    linkedin: "https://www.linkedin.com/in/catec/",
    bio: "15+ years in project and product management before becoming a workshop facilitator and corporate trainer. Certified Agile Coach who works with executives, early-career professionals, and tech teams.",
    certifications: "ICAgile \u2013 Certified Agile Coach, Institute for Experiential Learning \u2013 Experiential Learning Facilitator, Scrum Alliance \u2013 Certified ScrumMaster",
    background: "Before becoming a workshop facilitator and corporate trainer, spent 15+ years in project and product management in both startup and enterprise environments.",
    audiences: "Executives, early-career professionals, and tech teams \u2014 helping them learn, reflect, and connect in coaching, L&D, and workshop settings ranging from 2 to 100 participants.",
    loveCampfire: "Campfire makes room for meaningful conversations and genuine connection, even in just an hour.",
  },
  {
    name: "Selena Blackmore",
    location: "Eiken, Switzerland",
    sessions: "20+ Sessions",
    image: "/facilitator-selena.webp",
    linkedin: "https://www.linkedin.com/in/selena-blackmore/",
    bio: "20 years in large pharma, 13+ years leading global teams, and 4+ years in freelance facilitation and coaching. CTI-certified coach who has worked with global audiences of 500+ across mentoring and training programs.",
    certifications: "BA Hons Media & Communication, CTI Coaching Certification, Certified Transpersonal Breathwork & Meditation Guide",
    background: "20 years large pharma, 13+ years leading global teams, 3 years leadership development & corporate communications. 4+ years freelance facilitation and coaching.",
    audiences: "Global audiences (500+), mentoring programs, global training programs.",
    loveCampfire: "People are storytellers and we have been sitting around campfires for thousands of years. Campfire offers this experience in a virtual setting but with the focus still being on human connection and learning together.",
  },
  {
    name: "Ella Wright",
    location: "Indianapolis, IN",
    sessions: "250+ Sessions",
    image: "/facilitator-ella.webp",
    linkedin: "https://www.linkedin.com/in/ellawright801/",
    bio: "8+ years in Training and Development and Leadership roles. Has delivered remote training for 6 years, leading keynotes, peer coaching groups, and sessions across logistics, tech, finance, and e-commerce.",
    certifications: "Masters of Science, Organizational Leadership",
    background: "8+ years in Training and Development and Leadership roles. A \u201Cbuilder\u201D who\u2019s created everything from onboarding, competencies and career plans, to mentorship and leadership development programs.",
    audiences: "Keynotes, peer coaching groups, and sessions with leaders in logistics, transportation, tech, landscaping, finance, and e-commerce.",
    loveCampfire: "The session isn\u2019t just the content \u2014 it\u2019s the people, the moment, the questions, and the connections we have. Our content and platform simply creates the space to achieve that.",
  },
  {
    name: "Steve Arntz",
    location: "Salt Lake City, UT",
    sessions: "750+ Sessions",
    image: "/steve.webp",
    linkedin: "https://www.linkedin.com/in/stevearntz/",
    bio: "CEO of Campfire with 10+ years in talent development. Background in technology, leadership development, product, and marketing. Works with executives and teams of all experience levels.",
    certifications: "750+ sessions facilitated in six years since starting Campfire.",
    background: "CEO of Campfire with 10+ years working in talent development. Background in technology, leadership development, product development, and marketing.",
    audiences: "Executives, leadership teams, and individuals and groups of all types and experience levels.",
    loveCampfire: "The focus on reflection creates a more inclusive experience for participants. I\u2019ve seen a profound shift by letting people think before they speak.",
  },
];

const LinkedInIcon = ({ size = "sm" }: { size?: "sm" | "lg" }) => (
  <svg className={`${size === "lg" ? "w-6 h-6 top-[-2px]" : "w-4 h-4 top-[-1px]"} text-[#0A66C2] relative`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function FacilitatorGrid() {
  const [selected, setSelected] = useState<Facilitator | null>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
        {facilitators.map((f) => (
          <div key={f.name}>
            <button
              onClick={() => setSelected(f)}
              className="block w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 cursor-pointer"
            >
              <Image
                src={f.image}
                alt={f.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </button>
            <p className="font-semibold text-gray-900 text-xl flex items-center gap-1.5">
              <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline [&:visited]:text-inherit [&:hover]:text-inherit">{f.name}</a>
              <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`}>
                <LinkedInIcon />
              </a>
            </p>
            <p className="text-base text-[#6E3FCC]">{f.location}</p>
            <p className="text-base text-gray-400">{f.sessions}</p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{f.bio}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Card */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
              {/* Left: Photo + Identity */}
              <div
                className="p-8 md:p-10 flex flex-col items-center md:items-start"
                style={{
                  background: "linear-gradient(135deg, #F3EFFE 0%, #E8DFFB 100%)",
                }}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <a href={selected.linkedin} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline [&:visited]:text-inherit [&:hover]:text-inherit">{selected.name}</a>
                  <a href={selected.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${selected.name} on LinkedIn`}>
                    <LinkedInIcon size="lg" />
                  </a>
                </h2>
                <p className="text-lg text-[#6E3FCC] font-medium mb-1">{selected.location}</p>
                <p className="text-[0.95rem] text-gray-400 italic">{selected.sessions}</p>
              </div>

              {/* Right: Profile Details */}
              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-[#6E3FCC] mb-2">Certifications</p>
                  <p className="text-[0.95rem] text-gray-600 leading-relaxed">{selected.certifications}</p>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-[#6E3FCC] mb-2">Professional Background</p>
                  <p className="text-[0.95rem] text-gray-600 leading-relaxed">{selected.background}</p>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-[#6E3FCC] mb-2">Facilitation Experience</p>
                  <p className="text-[0.95rem] text-gray-600 leading-relaxed">{selected.audiences}</p>
                </div>
                <div className="rounded-xl p-6" style={{ backgroundColor: "#F8F5FC" }}>
                  <p className="text-sm font-bold tracking-wider uppercase text-[#6E3FCC] mb-2">What I Love About Campfire</p>
                  <p className="text-[0.95rem] text-gray-700 leading-relaxed italic">&ldquo;{selected.loveCampfire}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
