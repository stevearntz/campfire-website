"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    logo: "/nuvei-logo.webp",
    logoAlt: "Nuvei",
    name: "Ashley Logan",
    title: "Sr. Director, Talent Development",
    quote:
      "As a team of one, I needed a partner that could amplify our leadership development efforts without adding to my workload. Campfire has been that partner\u2014providing tools and resources to scale impactful programs across our global teams.",
  },
  {
    logo: "/cotopaxi-logo.webp",
    logoAlt: "Cotopaxi",
    name: "Real Life Manager",
    title: "",
    quote:
      "What an incredible space to have, coming together with leaders I\u2019ve never met and in 45 minutes genuinely connecting on the topic and how we can apply the learnings. That\u2019s the power of a campfire, both figuratively and literally.",
  },
  {
    logo: "/cotopaxi-logo.webp",
    logoAlt: "Cotopaxi",
    name: "Liz Berry",
    title: "Sr. Manager, Talent Development",
    quote:
      "Campfire has been a game-changer for our small team of two. Acting as a true extension of our team to help build materials tailored to our needs and goals.",
  },
  {
    logo: "/dermalogica-logo.webp",
    logoAlt: "Dermalogica",
    name: "People Team",
    title: "Dermalogica",
    quote:
      "Our managers started having better conversations within a week. That\u2019s not something we can say about any other program we\u2019ve tried.",
  },
  {
    logo: "/plusgrade-logo.webp",
    logoAlt: "Plusgrade",
    name: "HR Leader",
    title: "Plusgrade",
    quote:
      "Campfire gave us a complete leadership development system we could launch fast and trust to be excellent. Our managers actually look forward to sessions.",
  },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(1);

  const prev = () =>
    setActive((active - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((active + 1) % testimonials.length);

  // Get indices for visible cards: previous, current, next
  const getVisibleIndex = (offset: number) =>
    (active + offset + testimonials.length) % testimonials.length;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold tracking-wider uppercase mb-12" style={{ color: "rgba(147, 151, 171, 0.7)" }}>
          What People Are Saying
        </p>
      </div>

      {/* Carousel track — full browser width, no container constraint */}
      <div className="relative overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${active * (560 + 12)}px - 280px))`,
            }}
          >
            {testimonials.map((t, i) => {
              const isCenter = i === active;

              return (
                <div
                  key={`${t.logoAlt}-${i}`}
                  className={`shrink-0 w-[560px] h-[340px] bg-[#F8F5FC] rounded-2xl p-10 flex flex-col justify-between transition-opacity duration-500 ${
                    isCenter ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div>
                    {/* Logo — top right */}
                    <div className="flex justify-end mb-3">
                      <Image
                        src={t.logo}
                        alt={t.logoAlt}
                        width={140}
                        height={50}
                        className="h-5 w-auto object-contain opacity-30 grayscale"
                      />
                    </div>

                    {/* Purple quote mark */}
                    <svg
                      className="w-10 h-8 text-[#6E3FCC] mb-4"
                      viewBox="0 0 40 30"
                      fill="currentColor"
                    >
                      <path d="M0 30V18C0 7.6 5.6 1.4 16.8 0l1.6 4.4C11.6 6 8.8 10 8.4 15H15v15H0Zm23.2 0V18c0-10.4 5.6-16.6 16.8-18l1.6 4.4C34.8 6 32 10 31.6 15H38.2v15H23.2Z" />
                    </svg>

                    {/* Quote */}
                    <blockquote className="text-gray-700 text-xl leading-relaxed">
                      {t.quote}
                    </blockquote>
                  </div>

                  {/* Attribution */}
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-gray-800">
                      &ndash;{t.name}
                    </span>{" "}
                    {t.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M10 3L5 8L10 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active
                    ? "bg-[#6E3FCC]/40 scale-110"
                    : "bg-gray-800"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#6E3FCC] hover:border-[#6E3FCC]/40 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M6 3L11 8L6 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          {/* <Link
            href="/customers"
            className="inline-block px-7 py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
          >
            Explore Case Studies
          </Link> */}
        </div>
    </section>
  );
}
