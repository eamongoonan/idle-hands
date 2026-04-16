# Idle Hands

Website for **Idle Hands** — bespoke handcrafted metalwork by Paddy, based in Dublin. The site showcases 2D engravings and 3D sculptural pieces, handles commission enquiries, and lists available pieces for purchase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) — App Router, React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Fonts | Cinzel (headings) + Crimson Pro (body) via `next/font/google` |
| CMS | [Sanity](https://sanity.io) — headless, client-side only (no studio in this repo) |
| Email | [Resend](https://resend.com) — enquiry form handler |
| Deployment | [Vercel](https://vercel.com) |

---

## Local Setup

### Prerequisites

- Node.js 18.17 or later
- npm 9+

### 1. Clone and install

```bash
git clone <repo-url>
cd idle-hands
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values (see [Environment Variables](#environment-variables) below). The dev server will start with empty values — Sanity queries will return no results and the email route will return a 503, but nothing will crash.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint (Next.js + Prettier rules) |
| `npm run format` | Prettier — format all source files in place |

---

## Environment Variables

All variables live in `.env.local` (gitignored). The `.env.local.example` file is the source of truth for required keys.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

| Variable | Where to find it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard → project settings | Exposed to the browser; safe to be public |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dashboard → datasets | Defaults to `production` |
| `SANITY_API_TOKEN` | Sanity dashboard → API → Tokens | Only needed for authenticated/draft content. Read-only token is sufficient for this site |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | Server-side only — never expose to the client |
| `CONTACT_EMAIL` | Your own inbox | The address that receives enquiry emails from the form |

### Behaviour without env vars

- **Sanity not configured** (`NEXT_PUBLIC_SANITY_PROJECT_ID` empty): all pages fall back to the static piece data in `lib/static-pieces.ts`. The site is fully browsable.
- **Resend not configured** (`RESEND_API_KEY` or `CONTACT_EMAIL` empty): `POST /api/enquire` returns HTTP 503 with a descriptive error. The form shows an error message.

---

## Folder Structure

```
idle-hands/
│
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — mounts fonts, Nav, Footer
│   ├── globals.css             # CSS custom properties + Tailwind directives
│   ├── page.tsx                # Home — hero, marquee, portfolio preview, CTA
│   ├── portfolio/
│   │   ├── page.tsx            # Server component — fetches all pieces
│   │   └── portfolio-tabs.tsx  # Client component — All / 3D / 2D tab state
│   ├── shop/
│   │   ├── page.tsx            # Server component — fetches available pieces
│   │   └── shop-filters.tsx    # Client component — category filter chips
│   ├── about/
│   │   └── page.tsx            # About Paddy — bio, stats, disciplines, process
│   ├── enquire/
│   │   └── page.tsx            # Enquiry form — radio type, controlled fields
│   └── api/
│       └── enquire/
│           └── route.ts        # POST handler — validates and sends via Resend
│
├── components/
│   ├── nav.tsx                 # Fixed header — logo, wordmark, nav links
│   ├── footer.tsx              # Footer — logo, nav links, tagline
│   ├── marquee.tsx             # CSS-only infinite scrolling ticker
│   └── ui/
│       ├── button.tsx          # Primary / ghost button — renders as Link or button
│       ├── portfolio-grid.tsx  # Responsive 3-col grid with empty state
│       └── piece-card.tsx      # Image + meta card — uses piece-img-wrap filter
│
├── lib/
│   ├── fonts.ts                # Cinzel + Crimson Pro next/font instances
│   └── static-pieces.ts        # Fallback piece data pointing at /public/images/
│
├── sanity/
│   ├── lib/
│   │   ├── client.ts           # createClient (null-safe) + urlFor image builder
│   │   └── queries.ts          # GROQ queries + Piece TypeScript type
│   └── schema/
│       ├── piece.ts            # Piece document schema (for reference / future studio)
│       └── index.ts            # Schema type registry
│
├── public/
│   ├── logo.jpg                # Brand mark
│   └── images/                 # Portfolio images (2D-01–03, 3D-01–05)
│
├── .env.local.example          # Template — copy to .env.local and fill in
├── .prettierrc                 # Prettier config
├── tailwind.config.ts          # Custom colour palette + font families
└── next.config.ts              # Sanity CDN remote image pattern
```

---

## CMS: Sanity

This repo contains **only the client-side Sanity integration** — there is no Sanity Studio here. To manage content you have two options:

**Option A — Use Sanity's hosted Studio**
Log into [sanity.io/manage](https://sanity.io/manage), open your project, and use the web-based Studio.

**Option B — Embed a Studio route**
Add a `app/studio/[[...index]]/page.tsx` route using `next-sanity/studio`. The schema definitions in `sanity/schema/` are ready to import.

### Piece document fields

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `category` | string | `"2d"` or `"3d"` — controls tab/filter grouping |
| `material` | string | e.g. Copper, Mild Steel, Silver |
| `price` | number | Euro value — shown on card when set |
| `available` | boolean | `true` shows the piece on the Shop page |
| `mainImage` | image | Hotspot enabled — served via `cdn.sanity.io` |
| `description` | text | Long-form description |

---

## Deployment: Vercel

### First deploy

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel will auto-detect Next.js — no build config needed.
4. Add all five environment variables under **Settings → Environment Variables** before the first production build.

### Environment variables on Vercel

Set each variable from `.env.local.example` in the Vercel dashboard. Make sure `RESEND_API_KEY` and `CONTACT_EMAIL` are scoped to **Production** (and optionally Preview). The two `NEXT_PUBLIC_*` variables are safe to add to all environments.

### Custom domain

Under **Settings → Domains**, add your domain and follow the DNS instructions. Vercel handles SSL automatically.

### Image domains

`next/image` is configured to allow images from `cdn.sanity.io`. If you add images from other sources, add them to the `remotePatterns` array in `next.config.ts`.

---

## Design Notes

The site uses a dark industrial palette defined as CSS custom properties in `globals.css` and mirrored as Tailwind colour tokens in `tailwind.config.ts`.

| Token | Hex | Usage |
|---|---|---|
| `--black` | `#080807` | Page background |
| `--deep` | `#111110` | Nav, footer, card backgrounds |
| `--accent` | `#b5651d` | Copper highlight — buttons, rules, stats |
| `--chalk` | `#c8c4be` | Primary text on dark backgrounds |
| `--stone` | `#9a9794` | Secondary / muted text |
| `--border` | `rgba(200,196,190,0.1)` | All borders — hair-thin, low opacity |

**Image treatment:** portfolio images use `grayscale(70%) brightness(0.75) contrast(1.1)` at rest, lifting to `grayscale(20%) brightness(0.9)` on hover. Apply the `piece-img-wrap` class to any container to get this behaviour. The logo uses `grayscale(100%) brightness(0.55)` via the `logo-img` class.

No rounded corners anywhere — `borderRadius` is overridden to `0` in `tailwind.config.ts`.

