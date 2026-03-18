# Campfire Website

Marketing website for [Campfire](https://getcampfire.com) — a leadership development platform with 50+ live workshops, scalable facilitation, and program support for growing companies.

## Tech Stack

- **Next.js 16** (App Router) with **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- **Font**: League Spartan via Google Fonts (`--font-spartan`)
- **Hosting**: Vercel (auto-deploys on push)
- **DNS**: Cloudflare

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Other Commands

```bash
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # Run ESLint
```

## Environment Variables

Create `.env.local` with:

```
HUBSPOT_ACCESS_TOKEN=       # HubSpot Private App token
SLACK_CONTACT_WEBHOOK_URL=  # Slack Incoming Webhook for contact form notifications
BEEHIIV_API_KEY=            # Beehiiv newsletter API key
BEEHIIV_PUBLICATION_ID=     # Beehiiv publication ID
LUMA_API_KEY=               # Luma calendar API key for events
```

## Architecture

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero with animated platform illustration, outcomes, testimonials, product showcase |
| Solutions | `/solutions` | Platform capabilities and use cases |
| Content | `/content` | Session catalog, bundles, and framework details |
| About | `/about` | Team and company story |
| Contact | `/contact` | Contact form with progressive capture + Calendly booking |
| Blog | `/blog` | Dynamic routes via Beehiiv API, inline subscribe form in hero |
| Customers | `/customers` | Customer stories and case studies |
| Product | `/product` | Platform features, testimonials, CTA |
| Events | `/events` | Upcoming/past events with Luma API registration |
| Events Manual | `/events-manual` | Hidden admin page for registering participants (no cookies) |

### Key Components

| Component | Description |
|-----------|-------------|
| `PlatformIllustration` | SVG composition with 5 product images and animated flow streams |
| `SessionWalkthrough` | 8-step narrative timeline with activity details |
| `TestimonialCarousel` | Horizontal carousel with peek cards and navigation |
| `ContentShowcase` | Session carousel with autoplay (33 illustrated sessions) |
| `ProductShowcase` | 3-slide product demo carousel (Content, Experience, Insights) |
| `Navbar` | Sticky nav with Get Demo (Calendly) + Log In buttons |
| `Footer` | Platform/Company/Get Started columns + newsletter signup |

### Contact Form Hub (`app/api/contact/route.ts`)

POST route that fans out with `Promise.allSettled`:
- **Always**: Upsert contact in HubSpot (search by email, create or update)
- **Full submit only**: Send Slack notification via webhook
- **Partial captures**: Progressive capture hook auto-saves on page leave / 30s inactivity

#### Spam Protection

Three layers, all invisible to users:
1. **Honeypot field** — hidden input bots auto-fill; server silently discards
2. **Time-based check** — rejects submissions under 3 seconds
3. **Field length limits** — names max 100 chars, email 254, message 5000

### Integrations

- **HubSpot** — Free CRM, contact upsert via Private App token
- **Slack** — Contact form notifications via Incoming Webhook (Block Kit)
- **Calendly** — Direct booking at `https://calendly.com/getcampfire/`
- **Beehiiv** — Blog API for listing and individual post pages
- **Luma** — Events API for listing events and guest registration (`LUMA_API_KEY`)

### Newsletter (`app/api/subscribe/route.ts`)

Beehiiv API integration for newsletter signups from the footer and blog hero.

### Event Registration (`app/api/events/register/route.ts`)

Registers guests via Luma `add-guests` API, also upserts to HubSpot. Note: Luma counts API registrations as "imports" against your plan limit (self-registrations via Luma event page are unlimited).

## Design System

| Token | Value |
|-------|-------|
| Primary purple | `#6E3FCC` |
| Accent purple | `#9D88ED` |
| Dark background | `#1C1334` |
| Light section bg | `#F8F5FC` (alternates with `bg-white`) |
| Card background | `#F7F6F7` |
| Pink accent | `#EE80DD` |
| Pink CTA button | `#E055CB` |

### Patterns

- **Card left borders**: Gradient via absolute-positioned `w-1` div
- **CTA banners**: Gradient backgrounds, straddle section boundaries with `translate-y-1/2`
- **Hero backgrounds**: Transparent topo textures over CSS gradients
- **Logo sizing**: Optical per-logo heights to match wordmark text size

## Deploy Workflow

1. Work on `development` branch — Vercel auto-deploys previews
2. Push to prod:
   ```bash
   gh pr create --base main --head development
   gh pr merge <number> --merge
   ```
3. Vercel auto-deploys `main` to `getcampfire.com`

## Data

- **Session catalog**: `app/data/sessions.json` — 39 entries with name, description, and image (6 lack illustrations, filtered from carousel)
- **Blog content**: Fetched from Beehiiv API at build time and on-demand

## Git Conventions

- Commit messages: descriptive, end with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- PRs from `development` → `main`
