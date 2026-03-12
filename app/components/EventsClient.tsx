"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, FormEvent } from "react";
import { trackEvent } from "@/app/lib/analytics";

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
  past: EventData[];
}

// ── Cookie helpers ─────────────────────────────────────

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

// ── Component ──────────────────────────────────────────

export default function EventsClient({ upcoming, past }: Props) {
  const [modalEvent, setModalEvent] = useState<EventData | null>(null);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Record<string, boolean>>({});
  const [loadingReg, setLoadingReg] = useState<Record<string, boolean>>({});

  // Load saved email from cookie on mount
  useEffect(() => {
    const email = getCookie("campfire_reg_email");
    const name = getCookie("campfire_reg_name");
    if (email) {
      setSavedEmail(email);
      setSavedName(name);
    }
  }, []);

  // Check registration status when we have a saved email
  useEffect(() => {
    if (!savedEmail || upcoming.length === 0) return;
    const eventIds = upcoming.map((e) => e.apiId);
    fetch("/api/events/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventIds, email: savedEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.registrations) setRegistrations(data.registrations);
      })
      .catch(() => {});
  }, [savedEmail, upcoming]);

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
        if (res.ok && data.success) {
          setCookie("campfire_reg_email", email);
          setCookie("campfire_reg_name", name);
          setSavedEmail(email);
          setSavedName(name);
          setRegistrations((prev) => ({ ...prev, [eventId]: true }));
          trackEvent("event_registration", { event_id: eventId });
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        setLoadingReg((prev) => ({ ...prev, [eventId]: false }));
      }
    },
    []
  );

  const handleUnregister = useCallback(
    async (eventId: string) => {
      if (!savedEmail) return;
      setLoadingReg((prev) => ({ ...prev, [eventId]: true }));
      try {
        const res = await fetch("/api/events/unregister", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, email: savedEmail }),
        });
        if (res.ok) {
          setRegistrations((prev) => ({ ...prev, [eventId]: false }));
        }
      } catch {
        // silent
      } finally {
        setLoadingReg((prev) => ({ ...prev, [eventId]: false }));
      }
    },
    [savedEmail]
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
                <UpcomingCard
                  key={event.apiId}
                  event={event}
                  registered={registrations[event.apiId] ?? false}
                  loading={loadingReg[event.apiId] ?? false}
                  savedEmail={savedEmail}
                  savedName={savedName}
                  onRegister={handleRegister}
                  onUnregister={handleUnregister}
                  onSeeMore={() => setModalEvent(event)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Previous Events */}
      {past.length > 0 && (
        <section className="py-16 bg-[#F8F5FC]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-8">
              Previous Events
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <div
                  key={event.apiId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-[16/10]">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={400}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-gray-900 mb-2">
                      {event.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon size="small" />
                      <p className="text-xs text-gray-500">{event.shortDate}</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {truncate(event.description, 120)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal */}
      {modalEvent && (
        <EventModal
          event={modalEvent}
          registered={registrations[modalEvent.apiId] ?? false}
          loading={loadingReg[modalEvent.apiId] ?? false}
          savedEmail={savedEmail}
          savedName={savedName}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
          onClose={() => setModalEvent(null)}
        />
      )}
    </>
  );
}

// ── Upcoming Card ──────────────────────────────────────

function UpcomingCard({
  event,
  registered,
  loading,
  savedEmail,
  savedName,
  onRegister,
  onUnregister,
  onSeeMore,
}: {
  event: EventData;
  registered: boolean;
  loading: boolean;
  savedEmail: string | null;
  savedName: string | null;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
  onUnregister: (eventId: string) => Promise<void>;
  onSeeMore: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
        <div className="aspect-[16/10] md:min-h-[320px]">
          <Image
            src={event.image}
            alt={event.name}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {event.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon size="normal" />
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

          <RegistrationAction
            eventId={event.apiId}
            registered={registered}
            loading={loading}
            savedEmail={savedEmail}
            savedName={savedName}
            onRegister={onRegister}
            onUnregister={onUnregister}
          />
        </div>
      </div>
    </div>
  );
}

// ── Registration Action (form or button) ───────────────

function RegistrationAction({
  eventId,
  registered,
  loading,
  savedEmail,
  savedName,
  onRegister,
  onUnregister,
}: {
  eventId: string;
  registered: boolean;
  loading: boolean;
  savedEmail: string | null;
  savedName: string | null;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
  onUnregister: (eventId: string) => Promise<void>;
}) {
  const [name, setName] = useState(savedName ?? "");
  const [email, setEmail] = useState(savedEmail ?? "");
  const [error, setError] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);

  // Update fields when saved values change
  useEffect(() => {
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, [savedName, savedEmail]);

  if (registered || justRegistered) {
    return (
      <div className="mt-5">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex-1">
            <svg
              className="w-4 h-4 text-green-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="text-green-800 font-semibold text-sm">
              Looks like you&apos;re already registered!
            </span>
          </div>
          <button
            onClick={() => {
              onUnregister(eventId);
              setJustRegistered(false);
            }}
            disabled={loading}
            className="flex items-center justify-center px-6 h-10 text-sm font-semibold text-gray-400 border border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-500 transition-colors uppercase tracking-wide disabled:opacity-50 shrink-0"
          >
            {loading ? "..." : "Unregister"}
          </button>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) return;
    const success = await onRegister(eventId, name.trim(), email.trim());
    if (success) {
      setJustRegistered(true);
    } else {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}

// ── Event Modal ────────────────────────────────────────

function EventModal({
  event,
  registered,
  loading,
  savedEmail,
  savedName,
  onRegister,
  onUnregister,
  onClose,
}: {
  event: EventData;
  registered: boolean;
  loading: boolean;
  savedEmail: string | null;
  savedName: string | null;
  onRegister: (eventId: string, name: string, email: string) => Promise<boolean>;
  onUnregister: (eventId: string) => Promise<void>;
  onClose: () => void;
}) {
  // Render markdown paragraphs
  const paragraphs = event.descriptionMd
    .split(/\n\n+/)
    .filter((p) => p.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
          {/* Image */}
          <div className="bg-[#E8F4F8] flex items-center justify-center p-8 md:p-12">
            <Image
              src={event.image}
              alt={event.name}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {event.name}
            </h2>
            <div className="flex items-center gap-2 mb-5">
              <CalendarIcon size="normal" />
              <p className="text-sm text-[#6E3FCC] font-medium">
                {event.date}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <RegistrationAction
              eventId={event.apiId}
              registered={registered}
              loading={loading}
              savedEmail={savedEmail}
              savedName={savedName}
              onRegister={onRegister}
              onUnregister={onUnregister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

function CalendarIcon({ size }: { size: "small" | "normal" }) {
  const cls = size === "small" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <svg
      className={`${cls} text-[#6E3FCC] shrink-0`}
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
