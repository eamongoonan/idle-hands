# Decision Log

Architectural, design, and strategic decisions made during development.
Format: decision → why → alternatives considered.

---

## 2026-04-15

### Tech stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v3
Next.js App Router is the current industry standard for React sites — server components, built-in routing, and Vercel deploy with zero config. TypeScript strict mode catches errors early. Tailwind keeps styles co-located with components and avoids stylesheet bloat.
**Alternatives considered:** Plain React + Vite (no SSR/SEO), Astro (less familiar ecosystem for future devs).

### Headless CMS: Sanity
The client needs to add pieces and update content without touching code. Sanity provides a hosted studio at sanity.io/manage, a strong free tier, and a typed GROQ query language that integrates cleanly with TypeScript.
**Alternatives considered:** Contentful (more expensive at scale), Prismic (weaker image handling), markdown files in repo (requires client to use Git).

### Email: Resend
Simple REST API for transactional email, generous free tier, and a Next.js-native SDK. Handles the enquiry form without needing a backend service.
**Alternatives considered:** Nodemailer (requires SMTP config), SendGrid (heavier setup).

### Static fallback data
When `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset the site falls back to hardcoded piece data in `lib/static-pieces.ts`. This means the site builds and runs locally without any env setup, and Vercel deployments never show empty pages if the CMS connection drops.

### Typography: Cinzel (headings) + Crimson Pro (body)
Cinzel's Roman letterforms reference craft tradition and historical making without being ornate. Crimson Pro is elegant, readable, and pairs well at small sizes for piece descriptions.
**Alternatives considered:** Playfair Display (too editorial/magazine), GT Sectra (requires license).

### Dark industrial palette
Colour tokens — `black`, `deep`, `accent`, `chalk`, `stone`, `border` — defined as CSS custom properties and mirrored in Tailwind. The palette suits the metalwork/jewellery subject matter and makes piece photography stand out.

### Zero border radius
`borderRadius` overridden to `0` for all Tailwind values except `full`. Reinforces the architectural, industrial aesthetic — no softness anywhere in the UI.

### Portfolio image filter: grayscale + brightness lift on hover
Class `piece-img-wrap` applies a desaturating filter at rest. Hovering reveals full colour with a subtle lift. This creates a cohesive gallery feel across pieces shot in different lighting conditions.

### 2D / 3D portfolio split
The artist works across two distinct disciplines (drawings/prints and sculptural jewellery). A tab/filter split lets visitors self-select rather than mixing mediums in one grid.

---

## 2026-04-16

### Homepage: carousel at top, hero text removed
Early version had a split hero with headline copy. Revised to lead directly with the carousel of work — the pieces speak more effectively than descriptive text, and buyers want to see the work immediately.

### Carousel: user-scrollable with snap, pauses on hover
Auto-advancing carousels frustrate users who want to linger. Snap scrolling gives a clean controlled feel; pause on hover respects user intent. Both behaviours implemented in pure CSS + minimal JS.

### Copy: stone setting + family engraving tradition
Added specific craft details (stone setting, multi-generational tradition) to the about/homepage copy. These details build trust and differentiate from generic jewellery sellers — specificity is more persuasive than general claims of quality.

### Worldwide shipping stated explicitly
International buyers often assume a small studio won't ship to them. Stating it removes a conversion barrier without requiring any policy change.

### Colour piece images in shop, 2D images in shop page
Shop page now shows colour images (vs. greyscale-filtered portfolio grid) — purchasing context warrants seeing the actual piece as it will arrive. 2D pieces added to shop so all available work is discoverable in one place.
