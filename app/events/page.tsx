import type { Metadata } from "next";
import Image from "next/image";
import SubscribeForm from "../components/SubscribeForm";
import EventRegistration from "../components/EventRegistration";
import { fetchUpcomingEvents, fetchPastEvents, type LumaEvent } from "../lib/luma";

export const metadata: Metadata = {
  title: "Events — Not Another Webinar. A Leadership Room.",
  description:
    "Drop-in events open to all HR and People Ops Professionals. Join Campfire Conversations and connect with leaders who are building better teams.",
  openGraph: {
    title: "Events — Not Another Webinar | Campfire",
    description:
      "Drop-in events open to all HR and People Ops Professionals.",
  },
};

// Cycle through our custom images for events
const eventImages = [
  "/fire.webp",
  "/raft.webp",
  "/bike.webp",
  "/lantern.webp",
  "/hammock.webp",
  "/binoculars.webp",
];

function getEventImage(index: number): string {
  return eventImages[index % eventImages.length];
}

function formatEventDate(startAt: string, endAt: string, timezone: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const dateStr = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });

  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  });

  return `${dateStr} from ${startTime} - ${endTime}`;
}

function formatShortDate(startAt: string, timezone: string): string {
  const start = new Date(startAt);
  return start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });
}

function truncateDescription(text: string, maxLength = 180): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    fetchUpcomingEvents(),
    fetchPastEvents(6),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="py-20"
          style={{
            backgroundImage: "url('/purple-topo.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Events
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Not Another Webinar. A Leadership Room.
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Drop-in events open to all HR and People Ops Professionals
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-[#F8F5FC]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-8">
            Upcoming Events
          </p>

          {upcoming.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">No upcoming events right now. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {upcoming.map((entry: LumaEvent, i: number) => {
                const ev = entry.event;
                return (
                  <div
                    key={ev.api_id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0">
                      {/* Event image */}
                      <div className="aspect-[16/10] md:aspect-auto">
                        <Image
                          src={getEventImage(i)}
                          alt={ev.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Event details */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {ev.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
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
                          <p className="text-sm text-gray-500">
                            {formatEventDate(ev.start_at, ev.end_at, ev.timezone)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {truncateDescription(ev.description)}
                        </p>

                        <EventRegistration
                          eventId={ev.api_id}
                          eventName={ev.name}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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
              {past.map((entry: LumaEvent, i: number) => {
                const ev = entry.event;
                return (
                  <div
                    key={ev.api_id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Event image */}
                    <div className="aspect-[16/10]">
                      <Image
                        src={getEventImage(i + 3)}
                        alt={ev.name}
                        width={400}
                        height={260}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Event details */}
                    <div className="p-5">
                      <h4 className="text-base font-bold text-gray-900 mb-2">
                        {ev.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-3.5 h-3.5 text-[#6E3FCC] shrink-0"
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
                        <p className="text-xs text-gray-500">
                          {formatShortDate(ev.start_at, ev.timezone)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {truncateDescription(ev.description, 120)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="rounded-2xl py-14 px-8 text-center"
            style={{
              backgroundImage:
                "url('/purple-topo.webp'), linear-gradient(135deg, #6E3FCC 0%, #9D88ED 100%)",
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Want these insights in your inbox?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Subscribe to By the Campfire for leadership development ideas
              delivered every week.
            </p>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
