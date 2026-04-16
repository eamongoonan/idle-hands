import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Idle Hands | Handcrafted Metalwork · Dublin',
  description:
    'Bespoke jewellery and metal engravings, made entirely by hand in Dublin. Commissions welcomed — finished pieces available to buy.',
  openGraph: {
    title: 'Idle Hands | Handcrafted Metalwork · Dublin',
    description:
      'Bespoke jewellery and metal engravings, made entirely by hand in Dublin. Commissions welcomed — finished pieces available to buy.',
    url: 'https://idle-hands-chi.vercel.app',
  },
}
import Marquee from '@/components/marquee'
import { Button } from '@/components/ui/button'
import { PieceCarousel } from '@/components/ui/piece-carousel'
import { getAllPieces } from '@/sanity/lib/queries'
import { STATIC_PIECES } from '@/lib/static-pieces'

export default async function HomePage() {
  const sanityPieces = await getAllPieces().catch(() => [])
  const allPieces = sanityPieces.length > 0 ? sanityPieces : STATIC_PIECES

  return (
    <>
      {/* ── Selected Work carousel — first thing below the nav ── */}
      <section
        className="pt-20 md:pt-28 pb-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-end justify-between py-8">
          <p className="font-cinzel text-sm tracking-[0.2em] uppercase text-ash">
            Selected Work
          </p>
          <Link
            href="/portfolio"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-stone hover:text-accent transition-colors duration-200"
          >
            View All →
          </Link>
        </div>
      </section>
      <PieceCarousel pieces={allPieces} />

      {/* ── Description + buttons ── */}
      <section
        className="px-4 sm:px-8 py-16"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <p className="font-crimson text-stone text-xl max-w-xl leading-relaxed">
            Bespoke jewellery and metal engravings, made entirely by hand in
            Dublin. Commissions welcomed — finished pieces available to buy.
          </p>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Button href="/portfolio" variant="primary">
              View Portfolio
            </Button>
            <Button href="/enquire" variant="ghost">
              Commission a Piece
            </Button>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Available + Commission CTAs ── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="grid md:grid-cols-2 gap-px"
          style={{ backgroundColor: 'var(--border)' }}
        >
          <div className="px-4 sm:px-8 md:px-12 py-16" style={{ backgroundColor: 'var(--iron)' }}>
            <div className="w-8 h-px mb-8" style={{ backgroundColor: 'var(--accent)' }} />
            <p className="font-crimson italic text-ash mb-2 text-base">Made to order</p>
            <h2 className="font-cinzel text-chalk uppercase tracking-[0.12em] text-2xl mb-6">
              Commission a Piece
            </h2>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-8 max-w-sm">
              Describe what you have in mind — material, form, size. All
              commissions are considered. Response within 48 hours.
            </p>
            <Link
              href="/enquire"
              className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Make an Enquiry →
            </Link>
          </div>

          <div className="px-4 sm:px-8 md:px-12 py-16" style={{ backgroundColor: 'var(--deep)' }}>
            <div className="w-8 h-px mb-8" style={{ backgroundColor: 'var(--accent)' }} />
            <p className="font-crimson italic text-ash mb-2 text-base">Ready to ship</p>
            <h2 className="font-cinzel text-chalk uppercase tracking-[0.12em] text-2xl mb-6">
              Available Pieces
            </h2>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-8 max-w-sm">
              A selection of finished pieces — ready to purchase with no wait.
              Each one is unique and will not be remade.
            </p>
            <Link
              href="/shop"
              className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Browse Available Pieces →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className="py-16 md:py-28 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="font-crimson italic text-ash mb-2 text-base">The maker</p>
          <h2 className="section-heading mb-6">About Patrick</h2>
          <p className="font-crimson text-stone text-lg leading-relaxed mb-4">
            Patrick Watts is a metalworker based in Dublin. He makes jewellery in silver
            and gold — set with diamonds and precious stones — alongside copper
            engravings that continue a family tradition reaching back to his
            grandfather.
          </p>
          <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
            The work is deliberate and unhurried. No two pieces are the same.
          </p>
          <Link
            href="/about"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            Read More →
          </Link>
        </div>
      </section>
    </>
  )
}
