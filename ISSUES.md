# Issue Tracker

Local issue log for idle-hands. Mirrors GitHub Issues at:
https://github.com/eamongoonan/idle-hands/issues

To convert any of these to real GitHub Issues (recommended — shows active project management on your profile), open the link above and click "New issue".

Status: `open` | `in progress` | `done`

---

## Open

### #004 — SEO metadata

### #004 — SEO metadata
**Status:** open
**Detail:** Pages are missing `<title>`, `<meta description>`, and Open Graph tags. These affect search ranking and how links appear when shared. Next.js App Router handles this via `export const metadata` in each page file.

### #005 — Mobile layout review
**Status:** open
**Detail:** Site has a mobile nav but the full layout (carousel sizing, portfolio grid, piece detail page) hasn't been reviewed on small screens. Should test at 375px and 390px (iPhone SE / iPhone 15).

### #006 — Piece detail page
**Status:** open
**Detail:** `/portfolio/[slug]` route exists but content and layout needs review — particularly for pieces with longer descriptions, and for the enquiry CTA on individual pieces.

### #007 — Enquiry form: piece pre-selection
**Status:** open
**Detail:** When a user clicks "enquire" from a specific piece, the form should pre-select that piece or include its name. Currently the form is generic.

### #008 — Launch checklist
**Status:** open
**Detail:** Before going live: custom domain on Vercel, Sanity env vars set, Resend API key + CONTACT_EMAIL set, test enquiry form end-to-end, check 404 page, confirm no console errors in production build.

---

## Done

### #001 — UI polish pass
**Status:** done — 2026-04-16
**Detail:** Mobile-responsive spacing across all pages, nav/logo scaling, Instagram footer link, piece category fix, DECISIONS.md and ISSUES.md added.

### #002 — Connect Sanity CMS to live data
**Status:** done — 2026-04-16
**Detail:** Sanity project created (ID: xt6zonxj), env vars added to Vercel, studio embedded at /studio.

### #003 — Set up Sanity Studio for client
**Status:** done — 2026-04-16
**Detail:** Studio embedded at /studio route using next-sanity v9. Client accesses via the live domain.

### #009 — Initial site build
**Status:** done — 2026-04-15
**Detail:** All pages scaffolded (home, portfolio, shop, about, enquire, piece detail), Sanity schema defined, static fallback data, Resend integration, deployed to Vercel.

### #010 — Vercel build errors resolved
**Status:** done — 2026-04-16
**Detail:** ESLint errors (prettier plugin conflict, unescaped apostrophes), Next.js config format (`.ts` → `.mjs`), Node version pinned to 20, removed unnecessary `vercel.json`.

### #011 — Homepage redesign
**Status:** done — 2026-04-16
**Detail:** Carousel moved to top, hero text removed, mobile nav added, piece detail pages added. See DECISIONS.md for rationale.
