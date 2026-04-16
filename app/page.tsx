import Link from 'next/link'
import Image from 'next/image'
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
        className="relative min-h-screen flex items-center px-8 pt-24"
        style={{
          background: 'linear-gradient(160deg, var(--deep) 0%, var(--black) 65%)',
        }}
      >
        {/* Faint ruled line */}
        <div
          className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
          style={{ backgroundColor: 'var(--border)' }}
        />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20 items-center py-28">
          {/* ── Text ── */}
          <div>
            <p className="font-crimson italic text-stone text-lg mb-6 tracking-wide">
              Handcrafted in Dublin
            </p>
            <h1
              className="font-cinzel font-bold text-chalk uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                letterSpacing: '0.04em',
              }}
            >
              Idle
              <br />
              Hands
            </h1>
            <div
              className="w-20 h-px mb-8"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <p className="font-crimson text-stone text-xl max-w-lg mb-12 leading-relaxed">
              Bespoke jewellery and metal engravings, made entirely by hand in
              Dublin. Commissions welcomed — finished pieces available to buy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/portfolio" variant="primary">
                View Portfolio
              </Button>
              <Button href="/enquire" variant="ghost">
                Commission a Piece
              </Button>
            </div>
          </div>

          {/* ── Image trio ── */}
          <div
            className="hidden lg:flex flex-col gap-px"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <div className="piece-img-wrap relative overflow-hidden aspect-[4/3]">
              <Image
                src="/images/2D-01.png"
                alt="Copper engraving, abstract organic forms"
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-px">
              <div className="piece-img-wrap relative overflow-hidden aspect-square">
                <Image
                  src="/images/3D-04.png"
                  alt="Wide hammered silver ring"
                  fill
                  className="object-cover"
                  sizes="20vw"
                  priority
                />
              </div>
              <div className="piece-img-wrap relative overflow-hidden aspect-square">
                <Image
                  src="/images/3D-01.png"
                  alt="Silver chain weave ring"
                  fill
                  className="object-cover"
                  sizes="20vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-stone">
            Scroll
          </span>
          <div className="w-px h-8" style={{ backgroundColor: 'var(--stone)' }} />
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Selected Work carousel ── */}
      <section className="py-14 px-8" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto flex items-end justify-between mb-8">
          <div>
            <p className="font-crimson italic text-ash mb-1">A selection</p>
            <h2 className="section-heading">Selected Work</h2>
          </div>
          <Link
            href="/portfolio"
            className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-stone hover:text-accent transition-colors duration-200 hidden sm:block"
          >
            View All →
          </Link>
        </div>
      </section>
      <PieceCarousel pieces={allPieces} />

      {/* ── Available + Commission CTAs ── */}
      <section
        className="px-8 py-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px"
          style={{ backgroundColor: 'var(--border)' }}
        >
          {/* Available Now */}
          <div
            className="px-12 py-16"
            style={{ backgroundColor: 'var(--deep)' }}
          >
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

          {/* Commission */}
          <div
            className="px-12 py-16"
            style={{ backgroundColor: 'var(--iron)' }}
          >
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
      <section
        className="py-28 px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
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
