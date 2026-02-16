"use client";

import { useState } from "react";
import Image from "next/image";

const sessions = [
  { name: "Activate Autonomy", desc: "Identify where you want more ownership and learn how to ask for it in a way that builds trust." },
  { name: "Adapting to Change", desc: "Develop your ability to adapt and thrive in change." },
  { name: "Adapt Your Strengths", desc: "Recognize your strengths and adapt them to meet the needs of a current situation." },
  { name: "Beat Imposter Syndrome", desc: "Rewrite one internal monologue that contributes most to feelings of imposter syndrome." },
  { name: "Build Trust on Your Team", desc: "Create an environment where trust flourishes and team members work together efficiently and effectively." },
  { name: "Candid Communication", desc: "Communicate with others in a straightforward, clear way, while also inviting the perspectives of the other person." },
  { name: "Career Mapping", desc: "Identify one meaningful step in your career that brings you closer to your overall vision of success." },
  { name: "Coaching Essentials", desc: "Develop the skills to become effective coaches: tools and techniques to guide meaningful and supportive conversations." },
  { name: "Constructive Conflict", desc: "Learn your natural response as a manager and how to help others control their default responses to conflict." },
  { name: "Cross-Cultural Collaboration", desc: "Recognize and adapt to cultural differences that affect collaboration, communication, and teamwork." },
  { name: "Cultivating Gratitude", desc: "Integrate small, meaningful practices of gratitude into your everyday life to foster a more joyful mindset." },
  { name: "Curiosity in Conversations", desc: "See a team member\u2019s whole self through actively applying curiosity to your conversations." },
  { name: "Decision Making", desc: "Strengthen your ability to make decisions in alignment with your people, purpose, and principles." },
  { name: "Deliberate Listening", desc: "Unlock the power of intentional listening by focusing your mind, space, and body on helping others feel seen." },
  { name: "Deliver Feedback", desc: "Deliver feedback in a way that strengthens relationships, builds trust, and drives growth." },
  { name: "Develop Your Leadership Brand", desc: "Identify the values and strengths that define you\u2014and use them to shape an authentic leadership style." },
  { name: "Develop Your Team", desc: "Make your team indispensable by identifying strengths, addressing gaps, and crafting a development plan." },
  { name: "Emotional Intelligence: Self-Regulation", desc: "Identify one strategy to strengthen your self-regulation in emotionally charged situations." },
  { name: "Executive Communication", desc: "Refine your communication to better resonate with senior stakeholders." },
  { name: "Finance for Better Decisions", desc: "Recognize the financial impact your decisions have on broader business objectives." },
  { name: "Foster Belonging", desc: "Create safety on your team by modelling the building blocks of belonging: value, connection, and support." },
  { name: "Habits for Resilience", desc: "Create habits to help withstand and recover from challenges quickly and combat stress, anxiety, and overwhelm." },
  { name: "Hopes, Fears, and Expectations", desc: "Clarify hopes, fears, and expectations to build a strong foundation for a successful working relationship." },
  { name: "Inclusive Leadership", desc: "Lead with inclusivity by engaging in deeper conversations and uncovering hidden assumptions." },
  { name: "Inspire with Vision", desc: "Establish a vision and align with your team to move towards it together." },
  { name: "Lead Effective Meetings", desc: "Plan and lead meetings that stay focused on the most important outcomes." },
  { name: "Leading Others Through Change", desc: "Support your team through change by creating space for concerns and guiding them toward the future." },
  { name: "Magnify Strengths in Others", desc: "Recognize strengths on your team and support them in using those strengths to create greater impact." },
  { name: "Make the Most of 1-on-1s", desc: "Guide and empower your team with 1-on-1s that build trust, clarity, and momentum." },
  { name: "Manage Your Time", desc: "Protect your time for what matters most by grounding your priorities in people and purpose." },
  { name: "Peer Coaching", desc: "Strengthen your coaching skills by practicing with peers while receiving insights on your own challenges." },
  { name: "Performance Discussions", desc: "Lead successful and constructive performance discussions." },
  { name: "Practicing Self-Awareness", desc: "Cultivate self-awareness to improve decision-making, strengthen relationships, and lead with empathy." },
  { name: "Preventing Burnout", desc: "Identify the risk factors that contribute to burnout and develop strategies to prevent them." },
  { name: "Setting and Achieving Goals", desc: "Take an existing goal and make it more achievable." },
  { name: "Setting Clear Expectations", desc: "Create a strong team culture by identifying key values and needs that everyone needs to succeed." },
  { name: "Strategic Thinking", desc: "Elevate your thinking to tackle complex problems and develop strategies that drive team success." },
  { name: "Successful Delegation", desc: "Sharpen your delegation skills and create space for your most essential work." },
  { name: "The Art of Recognition", desc: "Unlock your team\u2019s best work through tactful recognition." },
];

export default function ContentShowcase() {
  const [active, setActive] = useState(0);
  const s = sessions[active];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr]">
        {/* Left: Text + navigation */}
        <div
          className="p-8 md:px-10 flex flex-col justify-between"
          style={{ backgroundColor: "#403955", paddingTop: "calc(3.5rem + 25px)", paddingBottom: "calc(3.5rem + 25px)" }}
        >
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase mb-4 mt-6" style={{ color: "#9D88ED" }}>
              All Campfire Sessions
            </p>
            <h3 className="text-2xl md:text-[1.75rem] font-bold text-white leading-snug" style={{ maxWidth: "280px" }}>
              {s.name}
            </h3>
            <p className="mt-4 text-white/70 text-sm leading-relaxed" style={{ maxWidth: "280px" }}>
              {s.desc}
            </p>
          </div>

          {/* Carousel navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActive((active - 1 + sessions.length) % sessions.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-1.5 flex-wrap justify-center max-w-[180px]">
              {sessions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === active ? "#9D88ED" : "rgba(157, 136, 237, 0.3)",
                  }}
                  aria-label={`Session ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((active + 1) % sessions.length)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "#9D88ED40", color: "#9D88ED" }}
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3L11 8L6 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Image (placeholder until session illustrations are added) */}
        <div
          className="relative flex flex-col p-6 md:px-8"
          style={{ backgroundColor: "#2f2745", paddingTop: "calc(3rem + 25px)", paddingBottom: "calc(3rem + 25px)" }}
        >
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/content-catalog.webp"
              alt="Campfire content catalog showing leadership workshop topics"
              width={1600}
              height={900}
              className="w-full h-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
