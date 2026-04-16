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

**Enquiry API:** [app/api/enquire/route.ts](app/api/enquire/route.ts) validates `name`, `email`, and `message`, then sends via Resend. Returns 503 if env vars are missing, 400 for bad input, 500 on Resend failure.

**The `Piece` type** is defined in [sanity/lib/queries.ts](sanity/lib/queries.ts) and is the single shared type used across the entire app. It includes an optional `localImage` field (a `/public` path) used only by static fallback pieces.

## Styling conventions

- Dark industrial palette defined as CSS custom properties in `app/globals.css` and mirrored as Tailwind colour tokens in [tailwind.config.ts](tailwind.config.ts). Use the token names (`black`, `deep`, `accent`, `chalk`, `stone`, `border`) — not raw hex.
- `borderRadius` is overridden to `0` for all Tailwind values except `full`. No rounded corners anywhere.
- Fonts: `font-cinzel` for headings, `font-crimson` for body.
- Portfolio image treatment: apply class `piece-img-wrap` to any image container to get the grayscale/brightness filter with hover lift. Apply `logo-img` to the logo.

## Environment variables

Copy `.env.local.example` to `.env.local`. Required:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

The dev server starts without them — Sanity pages show static fallback data, the enquire route returns 503.

## Sanity CMS

There is no Sanity Studio in this repo — content is managed via [sanity.io/manage](https://sanity.io/manage) or by embedding a studio route. The schema definitions in [sanity/schema/](sanity/schema/) are ready to import if a studio is added. The `piece` document type has fields: `title`, `slug`, `category` (`"2d"` | `"3d"`), `material`, `price`, `available`, `mainImage` (hotspot), `description`.
