import Link from 'next/link'
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
      {/* ── Hero ── */}
      <section
        className="px-8 pt-36 pb-16"
        style={{
          background: 'linear-gradient(160deg, var(--deep) 0%, var(--black) 65%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-crimson italic text-stone text-lg mb-5 tracking-wide">
            Handcrafted in Dublin
          </p>
          <h1
            className="font-cinzel font-bold text-chalk uppercase leading-none mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              letterSpacing: '0.04em',
            }}
          >
            Idle Hands
          </h1>
          <div
            className="w-20 h-px mb-8"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <p className="font-crimson text-stone text-xl max-w-xl leading-relaxed">
            Bespoke jewellery and metal engravings, made entirely by hand in
            Dublin. Commissions welcomed — finished pieces available to buy.
          </p>
        </div>
      </section>

      {/* ── Selected Work carousel ── */}
      <section
        className="pt-12 pb-0 px-8"
        style={{
          background: 'linear-gradient(160deg, var(--deep) 0%, var(--black) 65%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-end justify-between mb-6">
          <p className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-ash">
            Selected Work
          </p>
          <Link
            href="/portfolio"
            className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-stone hover:text-accent transition-colors duration-200"
          >
            View All →
          </Link>
        </div>
      </section>
      <PieceCarousel pieces={allPieces} />

      {/* ── Buttons ── */}
      <section className="px-8 py-12" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
          <Button href="/portfolio" variant="primary">
            View Portfolio
          </Button>
          <Button href="/enquire" variant="ghost">
            Commission a Piece
          </Button>
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
          <div className="px-8 md:px-12 py-16" style={{ backgroundColor: 'var(--deep)' }}>
            <div className="w-8 h-px mb-8" style={{ backgroundColor: 'var(--accent)' }} />
            <p className="font-crimson italic text-ash mb-2">Ready to ship</p>
            <h2 className="font-cinzel text-chalk uppercase tracking-[0.12em] text-2xl mb-6">
              Available Pieces
            </h2>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-8 max-w-sm">
              A selection of finished pieces — ready to purchase with no wait.
              Each one is unique and will not be remade.
            </p>
            <Link
              href="/shop"
              className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Browse Available Pieces →
            </Link>
          </div>

          <div className="px-8 md:px-12 py-16" style={{ backgroundColor: 'var(--iron)' }}>
            <div className="w-8 h-px mb-8" style={{ backgroundColor: 'var(--accent)' }} />
            <p className="font-crimson italic text-ash mb-2">Made to order</p>
            <h2 className="font-cinzel text-chalk uppercase tracking-[0.12em] text-2xl mb-6">
              Commission a Piece
            </h2>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-8 max-w-sm">
              Describe what you have in mind — material, form, size. All
              commissions are considered. Response within 48 hours.
            </p>
            <Link
              href="/enquire"
              className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Make an Enquiry →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className="py-28 px-8">
        <div className="max-w-2xl mx-auto">
          <p className="font-crimson italic text-ash mb-2">The maker</p>
          <h2 className="section-heading mb-6">About Paddy</h2>
          <p className="font-crimson text-stone text-lg leading-relaxed mb-4">
            Paddy is a self-taught metalworker based in Dublin. He makes
            jewellery in silver and gold — rings, bands, and wearable pieces —
            alongside copper engravings worked by hand.
          </p>
          <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
            The work is deliberate and unhurried. Material, form, and finish
            are considered at every stage. No two pieces are the same.
          </p>
          <Link
            href="/about"
            className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            Read More →
          </Link>
        </div>
      </section>
    </>
  )
}
