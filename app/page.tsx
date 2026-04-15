import Link from 'next/link'
import Image from 'next/image'
import Marquee from '@/components/marquee'
import { Button } from '@/components/ui/button'
import { PortfolioGrid } from '@/components/ui/portfolio-grid'
import { getAllPieces } from '@/sanity/lib/queries'
import { STATIC_PIECES } from '@/lib/static-pieces'

export default async function HomePage() {
  const sanityPieces = await getAllPieces().catch(() => [])
  const allPieces = sanityPieces.length > 0 ? sanityPieces : STATIC_PIECES
  const preview = allPieces.slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center px-6 pt-16"
        style={{
          background: 'linear-gradient(160deg, var(--deep) 0%, var(--black) 65%)',
        }}
      >
        {/* Faint ruled line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden lg:block"
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
              Bespoke metalwork — sculpted, engraved, forged by hand in Dublin.
              No two pieces alike. No shortcuts taken.
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
            {/* Large top image: 2D-01 */}
            <div className="piece-img-wrap relative overflow-hidden aspect-[4/3]">
              <Image
                src="/images/2D-01.png"
                alt="Copper relief plate, abstract organic forms"
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>

            {/* Two smaller bottom images */}
            <div className="grid grid-cols-2 gap-px">
              <div className="piece-img-wrap relative overflow-hidden aspect-square">
                <Image
                  src="/images/3D-04.png"
                  alt="Wide hammered silver ring on fist"
                  fill
                  className="object-cover"
                  sizes="20vw"
                  priority
                />
              </div>
              <div className="piece-img-wrap relative overflow-hidden aspect-square">
                <Image
                  src="/images/3D-01.png"
                  alt="Silver chain weave ring on hand"
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
          <div
            className="w-px h-8"
            style={{ backgroundColor: 'var(--stone)' }}
          />
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Portfolio Preview ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-crimson italic text-ash mb-2">Selected work</p>
              <h2 className="section-heading">The Portfolio</h2>
            </div>
            <Link
              href="/portfolio"
              className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-stone hover:text-accent transition-colors duration-200 hidden sm:block"
            >
              View All →
            </Link>
          </div>

          <PortfolioGrid pieces={preview} />

          <div className="mt-12 sm:hidden">
            <Button href="/portfolio" variant="ghost">
              View All Work
            </Button>
          </div>
        </div>
      </section>

      {/* ── About Snippet ── */}
      <section
        className="py-28 px-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-crimson italic text-ash mb-2">The maker</p>
            <h2 className="section-heading mb-6">About Paddy</h2>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-4">
              Paddy is a self-taught metalworker based in Dublin. Working out of
              a small forge, he creates sculptures, engravings, and functional
              art — each piece built from raw stock using traditional and modern
              techniques.
            </p>
            <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
              The work is deliberate and unhurried. Material, form, and finish
              are considered at every stage.
            </p>
            <Link
              href="/about"
              className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Read More →
            </Link>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-px"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {[
              { value: '8+', label: 'Years Making' },
              { value: '200+', label: 'Pieces Completed' },
              { value: '3', label: 'Disciplines' },
              { value: 'Dublin', label: 'Based In' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="py-10 px-8 text-center"
                style={{ backgroundColor: 'var(--deep)' }}
              >
                <p className="font-cinzel text-3xl text-accent mb-1">{value}</p>
                <p className="font-crimson italic text-stone text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry CTA ── */}
      <section
        className="py-36 px-6 text-center"
        style={{
          backgroundColor: 'var(--soot)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-xl mx-auto">
          <p className="font-crimson italic text-ash mb-4 text-lg">
            Start a conversation
          </p>
          <h2 className="section-heading mb-4">Commission a Piece</h2>
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <p className="font-crimson text-stone text-lg mb-10 leading-relaxed">
            Whether you have a clear vision or just an idea, get in touch. All
            commissions are considered.
          </p>
          <Button href="/enquire" variant="primary">
            Make an Enquiry
          </Button>
        </div>
      </section>
    </>
  )
}
