# Website Optimization — Remaining Work

Last updated: Feb 28, 2026

## What's Done

- [x] Google Search Console — verified via Cloudflare DNS
- [x] GA4 Analytics — `G-RV461N17XK`, tracking on all 24+ CTAs site-wide
- [x] Lighthouse audit — accessibility fixes deployed (2 pages at 100, 1 at 92)
- [x] Preload hints + preconnect for LCP optimization
- [x] WCAG AA contrast fixes across all pages
- [x] Heading hierarchy fixes (h3/h4 mismatches)
- [x] Aria-labels on interactive elements
- [x] Web app manifest (`app/manifest.ts`)
- [x] Luma webhook signature verification
- [x] TrackedLink component for conversion tracking from server components
- [x] SEO metadata on all pages
- [x] JSON-LD structured data
- [x] **#4** — Dynamic OG images for Solutions, About, Customers, Events, Blog (purple gradient + League Spartan)
- [x] **#5** — Customer logos on homepage (7 logos in hero section: Cotopaxi, Dermalogica, Cricut, Nuvei, PDQ, Plusgrade, Enveda)
- [x] **#6** — CTA hierarchy in nav ("Get Demo" is filled purple, "Log In" is outline)
- [x] **#7** — Internal cross-links across 6 pages (homepage, solutions, content, customers, contact, blog)
- [x] **#8** — Page-specific CTAs (About: "Start a Conversation", Customers: "Build Something Like This", Blog posts: "Let's Talk About This")
- [x] Contact page image fix — `liz berry.png` (450KB) → `liz-berry.webp` (37KB)

---

## All optimization items complete!

## Unresolved questions

- **6 illustration PNGs** (bike, binoculars, fire, hammock, lantern, raft) — now used as rotating event images on `/events` and `/events-manual` pages. Source PNGs still in public/ alongside WebP versions.
- **liz-berry.webp** — new image, now used on contact page. Old `liz berry.png` can be deleted.
- **6 missing session illustrations** — Adapting to Change, Adapt Your Strengths, Cross-Cultural Collaboration, Emotional Intelligence: Self-Regulation, Executive Communication, Finance for Better Decisions

## Quick Reference

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (verify before push)
git push         # Auto-deploys to Vercel preview on development branch
```

Ship to production:
```bash
gh pr create --base main --head development --title "..." --body "..."
gh pr merge <number> --merge
```
