"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, FormEvent } from "react";

// ── Types ──────────────────────────────────────────────

interface EventData {
  apiId: string;
  name: string;
  description: string;
  descriptionMd: string;
  date: string;
  shortDate: string;
  timezone: string;
  image: string;
  lumaUrl: string;
}

interface Props {
  upcoming: EventData[];
}

// ── Component ──────────────────────────────────────────

export default function EventsManualClient({ upcoming }: Props) {
  const [modalEvent, setModalEvent] = useState<EventData | null>(null);
  const [loadingReg, setLoadingReg] = useState<Record<string, boolean>>({});

  // Close modal on Escape
  useEffect(() => {
    if (!modalEvent) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalEvent(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modalEvent]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalEvent]);

  const handleRegister = useCallback(
    async (eventId: string, name: string, email: string) => {
      setLoadingReg((prev) => ({ ...prev, [eventId]: true }));
      try {
        const res = await fetch("/api/events/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, name, email }),
        });
        const data = await res.json();
        return res.ok && data.success;
      } catch {
        return false;
      } finally {
        setLoadingReg((prev) => ({ ...prev, [eventId]: false }));
      }
    },
    []
  );

  return (
    <>
      {/* Upcoming Events */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-8">
            Upcoming Events
          </p>

          {upcoming.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">
                No upcoming events right now. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {upcoming.map((event) => (
                <ManualCard
                  key={event.apiId}
                  event={event}
                  loading={loadingReg[event.apiId] ?? false}
                  onRegister={handleRegister}
                  onSeeMore={() => setModalEvent(event)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalEvent && (
        <ManualModal
          event={modalEvent}
          loading={loadingReg[modalEvent.apiId] ?? false}
          onRegister={handleRegister}
          onClose={() => setModalEvent(null)}
        />
      )}
    </>
  );
}

// ── Card ──────────────────────────────────────────────

function ManualCard({
  event,
  loading,
  onRegister,
  onSeeMore,
}: {
  event: EventData;
  loading: boolean;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
  onSeeMore: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-0">
        <div className="aspect-[16/10] md:aspect-square md:h-[320px]">
          <Image
            src={event.image}
            alt={event.name}
            width={320}
            height={320}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {event.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon />
            <p className="text-sm text-[#6E3FCC] font-medium">{event.date}</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {truncate(event.description, 180)}
            <button
              onClick={onSeeMore}
              className="text-[#6E3FCC] font-semibold ml-1 hover:underline"
            >
              SEE MORE
            </button>
          </p>

          <ManualRegistrationForm
            eventId={event.apiId}
            loading={loading}
            onRegister={onRegister}
          />
        </div>
      </div>
    </div>
  );
}

// ── Registration Form (always shows, resets after success) ──

function ManualRegistrationForm({
  eventId,
  loading,
  onRegister,
}: {
  eventId: string;
  loading: boolean;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!name.trim() || !email.trim()) return;
    const ok = await onRegister(eventId, name.trim(), email.trim());
    if (ok) {
      setSuccess(true);
      setName("");
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC] transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-[#6E3FCC] focus:ring-1 focus:ring-[#6E3FCC] transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-6 h-10 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide disabled:opacity-70 shrink-0"
          >
            {loading ? "..." : "Register"}
          </button>
        </div>
      </form>
      {success && (
        <div className="flex items-center gap-2 mt-2 text-green-700 text-sm font-medium animate-fade-in">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Registered! Ready for the next one.
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────

function ManualModal({
  event,
  loading,
  onRegister,
  onClose,
}: {
  event: EventData;
  loading: boolean;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
  onClose: () => void;
}) {
  const paragraphs = event.descriptionMd
    .split(/\n\n+/)
    .filter((p) => p.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
          <div className="bg-[#E8F4F8] flex items-center justify-center p-8 md:p-12">
            <Image
              src={event.image}
              alt={event.name}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {event.name}
            </h2>
            <div className="flex items-center gap-2 mb-5">
              <CalendarIcon />
              <p className="text-sm text-[#6E3FCC] font-medium">
                {event.date}
              </p>
            </div>
            <div className="space-y-4 mb-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ManualRegistrationForm
              eventId={event.apiId}
              loading={loading}
              onRegister={onRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

function CalendarIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#6E3FCC] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}
