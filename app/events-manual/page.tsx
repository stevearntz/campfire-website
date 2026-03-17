import type { Metadata } from "next";
import EventsManualClient from "../components/EventsManualClient";
import { fetchUpcomingEvents } from "../lib/luma";

export const metadata: Metadata = {
  title: "Manual Registration — Campfire Events",
  robots: { index: false, follow: false },
};

const eventImages = [
  "/fire.webp",
  "/raft.webp",
  "/bike.webp",
  "/lantern.webp",
  "/hammock.webp",
  "/binoculars.webp",
];

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
  return new Date(startAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });
}

export default async function EventsManualPage() {
  const upcomingRaw = await fetchUpcomingEvents();

  const upcoming = upcomingRaw.map((entry, i) => ({
    apiId: entry.event.api_id,
    name: entry.event.name,
    description: entry.event.description,
    descriptionMd: entry.event.description_md,
    date: formatEventDate(entry.event.start_at, entry.event.end_at, entry.event.timezone),
    shortDate: formatShortDate(entry.event.start_at, entry.event.timezone),
    timezone: entry.event.timezone,
    image: i === 0
      ? (entry.event.cover_url || eventImages[i % eventImages.length])
      : eventImages[i % eventImages.length],
    lumaUrl: entry.event.url,
  }));

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
              Manual Registration
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Register Participants
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Register people for upcoming events one at a time. The form resets after each registration.
            </p>
          </div>
        </div>
      </section>

      <EventsManualClient upcoming={upcoming} />
    </main>
  );
}
