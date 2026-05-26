# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- Font: League Spartan via Google Fonts (CSS variable `--font-spartan`)
- Deployed on Vercel (auto-deploys on push)

## Architecture

### App Router Structure

All pages live under `app/` using the Next.js App Router convention. Root layout (`app/layout.tsx`) injects the font, wraps pages with `<Navbar>` and `<Footer>`, and sets metadata with dynamic `metadataBase` from Vercel env vars.

### Contact Form Hub (`app/api/contact/route.ts`)

POST route that fans out with `Promise.allSettled`:
- **Always**: `upsertHubSpotContact` via `app/lib/hubspot.ts` (search by email → update or create)
- **Full submit only**: `sendSlackNotification` via `app/lib/slack.ts` (Block Kit webhook)
- Partial captures (from progressive capture hook) set `partial=true` and skip Slack

### Progressive Capture (`app/hooks/useProgressiveCapture.ts`)

Auto-saves form data on page leave (`visibilitychange` + `beforeunload` via `sendBeacon`) and 30s inactivity (via `fetch` with `keepalive`). Deduplicates by comparing JSON payloads.

### Newsletter (`app/api/subscribe/route.ts`)

Beehiiv API integration for newsletter signups. Requires `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`.

### Session Data (`app/data/sessions.json`)

39 leadership session entries with `name`, `desc`, and `image` (nullable — 6 sessions lack illustrations and are filtered from the carousel).

### Blog (`app/blog/`)

Dynamic routes via `[slug]/page.tsx` pulling content from Beehiiv. Remote images configured in `next.config.ts`. Hero section includes an inline newsletter subscribe form.

### Events (`app/events/`)

Pulls upcoming and past events from Luma API (`app/lib/luma.ts`). First upcoming event uses Luma cover image (`cover_url`), rest use rotating illustrations. Registration via `add-guests` API (counts as Luma "import" against plan limit). Cookie-based detection shows returning visitors their registration status.

### Events Manual (`app/events-manual/`)

Hidden admin page (`noindex`) for registering participants without cookie state. Form always shows fresh and resets after each successful registration. Uses the same Luma registration API. Shows detailed error messages for debugging.

### Landing Pages

Several standalone landing pages follow the same architecture pattern: a thin server component (`page.tsx`) for metadata + a large `"use client"` component for all interactive content.

#### `/effective-org` (v1)
Organizational effectiveness messaging. Flow: Hero → Equation (Execution = Clarity x Alignment / Coordination Cost) → Why Now → What Campfire Does (3 pillars) → Use Cases (5 team cards + purple CTA card) → How It Helps (6 cards) → Research → Pull Quote → Booking Form. Form submits to `/api/contact` with `[Source: Effective Org page]` tag.

#### `/effective-org-v2` (v2 — problem-first reframe)
Same content restructured to lead with the problem before presenting the framework. Flow: Hero → **Problem** (5 pain cards + purple CTA card) → Equation → What Campfire Does (reframed as "strategic alignment and execution system") → Use Cases → **How It Works** (3 mechanism cards: Alignment sessions, Living documentation, Ongoing reinforcement) → Research → Pull Quote → Booking Form. Form submits with `[Source: Effective Org v2 page]` tag. Form includes ICP-aligned challenge options (scaling with leaner teams, distributed/hybrid coordination).

#### `/human-coordination`
Human coordination systems messaging. 8 sections with scrollspy nav, pain tabs with auto-scroll, offer expand/interested toggles. Form submits to `/api/contact` with `[Source: Human Coordination page]` tag.

#### `/strategic-alignment`
Strategic alignment messaging with lighthouse hero illustration.

#### `/ypo-sow`
YPO-specific scope of work page.

### Shared Landing Page Patterns

- **Scrollspy nav**: `IntersectionObserver` with `rootMargin: "-30% 0px -55% 0px"`, pinned below the main navbar at `top-[64px]`, horizontal scroll with hidden scrollbar, auto-scroll on active change via `useEffect`
- **Auto-scroll tabs**: On tap, scroll container so selected tab's `offsetLeft` aligns with container's left edge; on scrollspy change, same behavior fires automatically
- **Section alternation**: `bg-[#F8F5FC]` / `bg-white` for light sections, `bg-[#1C1334]` for dark sections
- **Form validation**: Client-side name + email required, email regex check, inline error messages
- **Form submission**: POST to `/api/contact` with firstName, lastName, email, company, message (includes source tag), `_t` timestamp

### Positioning Framework (for effective-org pages)

- **Equation**: Execution = Clarity x Alignment / Coordination Cost
- **Three pillars**: Clarity (orange `#F59E2C`), Alignment (purple `#6E3FCC`), Coordination (pink `#E055CB`)
- **Problem framing**: Organizations moving faster than people can stay aligned — fragmentation, inconsistent execution, coordination breakdowns
- **Solution**: Strategic alignment and execution system (not "leadership development")
- **How it works**: Alignment sessions → Living documentation → Ongoing reinforcement (with operating rhythms)
- **ICP**: Mid-market orgs (~200-5,000 employees) navigating growth, change, or AI transformation
- **Category**: Organizational Effectiveness

## Environment Variables

Required in `.env.local`:
- `HUBSPOT_ACCESS_TOKEN` — HubSpot Private App token
- `SLACK_CONTACT_WEBHOOK_URL` — Slack Incoming Webhook
- `BEEHIIV_API_KEY` — Beehiiv newsletter API key
- `BEEHIIV_PUBLICATION_ID` — Beehiiv publication ID
- `LUMA_API_KEY` — Luma calendar API key for events

## Design System

- **Primary purple**: `#6E3FCC`, accent `#9D88ED`, dark bg `#1C1334`
- **Pink CTA button**: `#E055CB` — used for prominent action buttons (homepage hero, subscribe, content CTA)
- **Light bg**: `#F8F5FC` (alternates with `bg-white` between sections)
- **Card left borders**: Gradient via absolute-positioned `w-1` div
- **CTA banners**: Gradient backgrounds, straddle sections with `translate-y-1/2`
- **Hero backgrounds**: `/purple-topo.webp` or `/hero-bg.webp`
- **Calendly**: All booking links go to `https://calendly.com/getcampfire/`

## Git Workflow

- Work on `development` branch; PRs target `main`
- Commit messages: descriptive, end with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- Vercel auto-deploys on push (env-var-only deploys show default Next.js page — always push code)
