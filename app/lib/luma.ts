const LUMA_BASE = "https://public-api.luma.com/v1";

function getKey(): string {
  const key = process.env.LUMA_API_KEY;
  if (!key) throw new Error("LUMA_API_KEY is not configured");
  return key;
}

function headers(): HeadersInit {
  return {
    accept: "application/json",
    "content-type": "application/json",
    "x-luma-api-key": getKey(),
  };
}

// ── Types ──────────────────────────────────────────────

export interface LumaEvent {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    // Luma omits these for some events — treat as optional/nullable.
    description: string | null;
    description_md: string | null;
    start_at: string;
    end_at: string;
    duration_interval: string;
    timezone: string;
    cover_url: string | null;
    url: string;
    visibility: string;
    meeting_url: string | null;
    geo_address_json: {
      address: string | null;
      full_address: string | null;
      description: string | null;
    } | null;
  };
  tags: { id: string; name: string }[];
}

export interface LumaGuest {
  id: string;
  user_email: string;
  user_name: string;
  approval_status: string;
  registered_at: string | null;
}

// ── Fetch Events ───────────────────────────────────────

export async function fetchEvents(options?: {
  after?: string;
  before?: string;
  sortDirection?: string;
  limit?: number;
}): Promise<LumaEvent[]> {
  const params = new URLSearchParams();
  params.set("sort_column", "start_at");
  if (options?.after) params.set("after", options.after);
  if (options?.before) params.set("before", options.before);
  params.set("sort_direction", options?.sortDirection ?? "asc");
  if (options?.limit) params.set("pagination_limit", String(options.limit));

  const res = await fetch(`${LUMA_BASE}/calendar/list-events?${params}`, {
    headers: headers(),
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!res.ok) {
    throw new Error(`Luma list-events returned ${res.status}`);
  }

  const data = await res.json();
  return data.entries ?? [];
}

export async function fetchUpcomingEvents(limit?: number): Promise<LumaEvent[]> {
  return fetchEvents({
    after: new Date().toISOString(),
    sortDirection: "asc",
    limit,
  });
}

export async function fetchPastEvents(limit?: number): Promise<LumaEvent[]> {
  return fetchEvents({
    before: new Date().toISOString(),
    sortDirection: "desc",
    limit,
  });
}

// ── Registration ───────────────────────────────────────

export async function registerGuest(
  eventId: string,
  email: string,
  name: string
): Promise<{ success: boolean; guest?: LumaGuest; error?: string }> {
  const res = await fetch(`${LUMA_BASE}/event/add-guests`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      event_api_id: eventId,
      guests: [{ email, name }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, error: `Luma returned ${res.status}: ${text}` };
  }

  const data = await res.json();
  return { success: true, guest: data.guests?.[0] };
}

export async function checkRegistration(
  eventId: string,
  email: string
): Promise<{ registered: boolean; guest?: LumaGuest }> {
  const res = await fetch(
    `${LUMA_BASE}/event/get-guest?event_api_id=${encodeURIComponent(eventId)}&email=${encodeURIComponent(email)}`,
    { headers: headers() }
  );

  if (res.status === 404) {
    return { registered: false };
  }

  if (!res.ok) {
    return { registered: false };
  }

  const data = await res.json();
  if (!data.guest) return { registered: false };

  const status = data.guest.approval_status;
  return {
    registered: status === "approved" || status === "session",
    guest: data.guest,
  };
}

export async function unregisterGuest(
  eventId: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  // First get the guest to find their api_id
  const check = await checkRegistration(eventId, email);
  if (!check.registered || !check.guest) {
    return { success: true }; // already not registered
  }

  const res = await fetch(`${LUMA_BASE}/event/update-guest-status`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      event_api_id: eventId,
      guest: { type: "api_id", api_id: check.guest.id },
      status: "declined",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, error: `Luma returned ${res.status}: ${text}` };
  }

  return { success: true };
}
