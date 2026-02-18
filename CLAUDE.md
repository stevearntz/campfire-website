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

Dynamic routes via `[slug]/page.tsx` pulling content from Beehiiv. Remote images configured in `next.config.ts`.

## Environment Variables

Required in `.env.local`:
- `HUBSPOT_ACCESS_TOKEN` — HubSpot Private App token
- `SLACK_CONTACT_WEBHOOK_URL` — Slack Incoming Webhook
- `BEEHIIV_API_KEY` — Beehiiv newsletter API key
- `BEEHIIV_PUBLICATION_ID` — Beehiiv publication ID

## Design System

- **Primary purple**: `#6E3FCC`, accent `#9D88ED`, dark bg `#1C1334`
- **Light bg**: `#F8F5FC` (alternates with `bg-white` between sections)
- **Card left borders**: Gradient via absolute-positioned `w-1` div
- **CTA banners**: Gradient backgrounds, straddle sections with `translate-y-1/2`
- **Hero backgrounds**: `/purple-topo.webp` or `/hero-bg.webp`
- **Calendly**: All booking links go to `https://calendly.com/getcampfire/`

## Git Workflow

- Work on `development` branch; PRs target `main`
- Commit messages: descriptive, end with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- Vercel auto-deploys on push (env-var-only deploys show default Next.js page — always push code)
