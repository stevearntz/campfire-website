"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useProgressiveCapture } from "@/app/hooks/useProgressiveCapture";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loadTime] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submitted = status === "success";
  const fields = { firstName, lastName, email, message };

  useProgressiveCapture(fields, submitted);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, partial: false, _hp: honeypot, _t: loadTime }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Let&apos;s Chat Leadership
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Whether you know the program you want to build or you just want to
              start exploring, we&apos;d love to geek out on all things talent
              development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Schedule a conversation
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                The best way to see if Campfire can help is a conversation with
                our team. We&apos;ll learn about your organization, your people
                challenges, and share how we&apos;ve helped companies like yours
                build stronger leaders.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    What to expect
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    A 30-minute, low-pressure conversation about your company
                    culture and talent development goals. No pitch deck. No
                    pressure. Just a real conversation about what you&apos;re
                    trying to build.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Email us directly
                  </h3>
                  <a
                    href="mailto:hello@getcampfire.com"
                    className="text-[#6E3FCC] text-sm font-medium hover:underline"
                  >
                    hello@getcampfire.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Connect with us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/company/getcampfire"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-[#6E3FCC] text-sm font-medium hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                      href="https://bythecampfire.beehiiv.com/"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-[#6E3FCC] text-sm font-medium hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                      Newsletter
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust signal — testimonial */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex gap-4">
                  <Image
                    src="/liz berry.png"
                    alt="Liz Berry"
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                      &ldquo;What Campfire has done is create a space where
                      managers actually want to show up and grow. That&apos;s
                      rare.&rdquo;
                    </p>
                    <p className="mt-2 text-xs font-semibold text-gray-900">
                      Liz Berry
                    </p>
                    <p className="text-xs text-gray-400">
                      Sr. Manager, Talent Development &middot; Cotopaxi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="bg-[#F8F5FC] border border-[#6E3FCC]/10 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#6E3FCC]/10 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-[#6E3FCC]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.5 6.5 0 0012 12.5a6.5 6.5 0 003.362-7.286z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    We&apos;re excited to connect!
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Someone from our team will reach out within one business day.
                    In the meantime, feel free to{" "}
                    <a
                      href="https://tools.getcampfire.com/courses"
                      className="text-[#6E3FCC] font-medium hover:underline"
                    >
                      explore Campfire on your own
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div className="bg-[#F8F5FC] border border-[#6E3FCC]/10 rounded-2xl p-8">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Honeypot — hidden from real users, bots fill it */}
                    <div className="absolute opacity-0 -z-10" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What are you looking for?
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6E3FCC]/20 focus:border-[#6E3FCC] resize-none"
                        placeholder="Tell us a bit about your team and what you're hoping to achieve..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide disabled:opacity-70"
                    >
                      {status === "loading" ? "Sending..." : "Connect With Us"}
                    </button>

                    {status === "error" && (
                      <p className="text-red-600 text-sm text-center">{errorMsg}</p>
                    )}

                    <p className="text-xs text-gray-400 text-center">
                      We&apos;ll respond within one business day. No spam, ever.
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <a
                      href="https://calendly.com/getcampfire/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 text-sm font-semibold leading-none text-[#6E3FCC] bg-white border border-[#6E3FCC]/30 rounded-lg hover:bg-[#6E3FCC]/5 transition-colors uppercase tracking-wide text-center block"
                    >
                      Book a Time Directly
                    </a>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
