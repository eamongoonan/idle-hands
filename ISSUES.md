# Issue Tracker

Local issue log for idle-hands. Mirrors GitHub Issues at:
https://github.com/eamongoonan/idle-hands/issues

To convert any of these to real GitHub Issues (recommended — shows active project management on your profile), open the link above and click "New issue".

Status: `open` | `in progress` | `done`

---

## In Progress

### #001 — UI polish pass (font sizes, nav, carousel, copy, shop)
**Status:** in progress — uncommitted changes across multiple files
**Detail:** Adjustments to font sizes, nav layout, carousel behaviour, about page copy, footer, marquee, button styles, and static piece data. New 2D-05 image added, 3D-05 removed.
**Next:** Review on Vercel preview, commit when satisfied.

---

## Open

### #002 — Connect Sanity CMS to live data
**Status:** open
**Detail:** `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set on Vercel. The site currently runs entirely on static fallback data. Sanity project needs to be created/configured and env vars added to Vercel.
**Depends on:** Client providing content, or seeding CMS with current static pieces.

### #003 — Set up Sanity Studio for client
**Status:** open
**Detail:** Client needs a way to add/edit pieces and update content without touching code. Options: (a) add a `/studio` route to this repo, (b) create a separate Sanity Studio deployment, (c) use sanity.io/manage directly. Need to agree approach with client and document login process.

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

### #009 — Initial site build
**Status:** done — 2026-04-15
**Detail:** All pages scaffolded (home, portfolio, shop, about, enquire, piece detail), Sanity schema defined, static fallback data, Resend integration, deployed to Vercel.

### #010 — Vercel build errors resolved
**Status:** done — 2026-04-16
**Detail:** ESLint errors (prettier plugin conflict, unescaped apostrophes), Next.js config format (`.ts` → `.mjs`), Node version pinned to 20, removed unnecessary `vercel.json`.

### #011 — Homepage redesign
**Status:** done — 2026-04-16
**Detail:** Carousel moved to top, hero text removed, mobile nav added, piece detail pages added. See DECISIONS.md for rationale.
