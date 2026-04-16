# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint (Next.js + Prettier rules)
npm run format    # Prettier — format all source files in place
```

There are no tests in this project.

## Architecture

This is a Next.js 15 (App Router, React 19) website with TypeScript strict mode, Tailwind CSS v3, Sanity as headless CMS, and Resend for email.

**Data flow:** Pages are server components that call query functions in [sanity/lib/queries.ts](sanity/lib/queries.ts). Those functions call `client.fetch()` with GROQ queries. If `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set, `client` is `null` and all query functions return `[]` — pages then fall back to the static data in [lib/static-pieces.ts](lib/static-pieces.ts). Client components (`portfolio-tabs.tsx`, `shop-filters.tsx`) receive pieces as props and handle tab/filter state.

**Sanity client:** [sanity/lib/client.ts](sanity/lib/client.ts) exports a nullable `client` and a null-safe `urlFor()` image builder. Always guard against `client` being null — the pattern is already established in the query functions.

**Enquiry API:** [app/api/enquire/route.ts](app/api/enquire/route.ts) validates `name`, `email`, and `message`, then sends via Resend to `CONTACT_EMAIL`. Also fires a confirmation email to the customer (non-critical — failure does not affect the 200 response). Returns 503 if env vars are missing, 400 for bad input, 500 on Resend failure.

**The `Piece` type** is defined in [sanity/lib/queries.ts](sanity/lib/queries.ts) and is the single shared type used across the entire app. It includes optional `localImage` (a `/public` path, static fallback only), `size` (3D pieces), and `dimensions` (2D pieces).

**Sanity Studio** is embedded at `/studio` via `app/studio/[[...tool]]/page.tsx` and `sanity.config.ts`. The `piece` schema is in [sanity/schema/piece.ts](sanity/schema/piece.ts).

**OG image** is generated at `/opengraph-image` via [app/opengraph-image.tsx](app/opengraph-image.tsx) using the Next.js `ImageResponse` edge API. No `<meta>` tags needed — Next.js wires it automatically.

**Analytics:** Google Analytics GA4 is wired in [app/layout.tsx](app/layout.tsx). Scripts only load when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set — no-op without it.

## Styling conventions

- Dark industrial palette defined as CSS custom properties in `app/globals.css` and mirrored as Tailwind colour tokens in [tailwind.config.ts](tailwind.config.ts). Use the token names (`black`, `deep`, `accent`, `chalk`, `stone`, `border`) — not raw hex.
- `borderRadius` is overridden to `0` for all Tailwind values except `full`. No rounded corners anywhere.
- Fonts: `font-cinzel` for headings, `font-crimson` for body.
- Portfolio image treatment: apply class `piece-img-wrap` to any image container to get the grayscale/brightness filter with hover lift. Apply `logo-img` to the logo.
- Profile/portrait images use Tailwind `grayscale` class directly on the `<Image>` component.

## Category labels

Pieces have category `"2d"` or `"3d"`. Display labels are consistently **"2D Piece(s)"** and **"3D Piece(s)"** everywhere — not "Engraving", "Jewelry", "Sculpture", etc.

## Environment variables

Copy `.env.local.example` to `.env.local`. Required:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xt6zonxj
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=   # optional — GA4 Measurement ID e.g. G-XXXXXXXXXX
```

The dev server starts without them — Sanity pages show static fallback data, the enquire route returns 503, analytics does not load.

## Sanity CMS

Sanity Studio is embedded at `/studio`. The `piece` document type fields: `title`, `slug`, `category` (`"2d"` | `"3d"`), `material`, `size` (3D only, conditionally shown), `dimensions` (2D only, conditionally shown), `price`, `available`, `mainImage` (hotspot), `description`.

After adding new schema fields, redeploy the Studio schema (`sanity deploy` or via the Studio UI).

## Known issues / open decisions

- `@vercel/analytics` is in `package.json` but not used — the site is moving off Vercel to its own domain, GA4 is used instead. The package can be removed once the migration is confirmed.
- The site domain is not yet finalised. The `from` address in the Resend emails (`noreply@idlehands.ie`) and the hardcoded URL in the confirmation email body will need updating once the domain is live.
- No cookie consent banner implemented. GA4 is active — this is technically required under GDPR/ePrivacy for Irish visitors. Decision deferred.
