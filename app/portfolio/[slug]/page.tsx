import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPieceBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/client'
import { STATIC_PIECES } from '@/lib/static-pieces'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piece =
    (await getPieceBySlug(slug).catch(() => null)) ??
    STATIC_PIECES.find((p) => p.slug.current === slug) ??
    null

  if (!piece) return {}
  const description = piece.description ?? `${piece.title} — handcrafted metalwork by Idle Hands, Dublin.`
  return {
    title: piece.title,
    description,
    openGraph: {
      title: `${piece.title} | Idle Hands`,
      description,
      url: `https://idle-hands-chi.vercel.app/portfolio/${slug}`,
    },
  }
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params
  const sanityPiece = await getPieceBySlug(slug).catch(() => null)
  const piece =
    sanityPiece ?? STATIC_PIECES.find((p) => p.slug.current === slug) ?? null

  if (!piece) notFound()

  const imageUrl = piece.mainImage
    ? urlFor(piece.mainImage).width(1200).height(1200).url()
    : (piece.localImage ?? null)

  const categoryLabel = piece.category === '2d' ? '2D Piece' : '3D Piece'

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-cinzel text-sm tracking-[0.18em] uppercase text-stone hover:text-chalk transition-colors duration-200 mb-8 md:mb-14"
        >
          ← All Work
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-start">

          {/* Image */}
          <div className="lg:sticky lg:top-28">
          <div
            className="piece-img-wrap relative overflow-hidden aspect-square w-full"
            style={{ backgroundColor: 'var(--iron)' }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={piece.mainImage?.alt ?? piece.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--iron), var(--soot))' }}
              >
                <span className="font-cinzel text-[0.6rem] tracking-widest text-ash uppercase">
                  No Image
                </span>
              </div>
            )}

            {piece.available && (
              <div
                className="absolute top-4 right-4 px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <span className="font-cinzel text-[0.6rem] tracking-widest uppercase text-white">
                  Available
                </span>
              </div>
            )}
          </div>
          </div>

          {/* Detail */}
          <div className="lg:pt-4">
            <p className="font-crimson italic text-ash text-base mb-3">
              {categoryLabel}
              {piece.material ? ` · ${piece.material}` : ''}
            </p>

            <h1 className="font-cinzel text-chalk uppercase tracking-[0.1em] leading-tight mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
            >
              {piece.title}
            </h1>

            <div className="w-16 h-px mb-8" style={{ backgroundColor: 'var(--accent)' }} />

            <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
              {piece.description ?? `A hand-crafted ${categoryLabel.toLowerCase()} made in Dublin. Each piece is unique — no two are identical in texture, finish, or form.`}
            </p>

            {/* Additional template copy when no Sanity description */}
            {!piece.description && (
              <>
                <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
                  {piece.category === '3d'
                    ? 'Worked entirely by hand — forged, filed, and finished without casting or moulding. The surface carries the marks of the process.'
                    : 'Engraved directly into the metal surface using hand tools. The depth and texture of the line work is built up over many passes.'}
                </p>
                <p className="font-crimson text-stone text-lg leading-relaxed mb-8">
                  Commission enquiries for similar pieces are welcome. Materials, dimensions, and finish can all be adapted to your brief.
                </p>
              </>
            )}

            {/* Specs */}
            <div
              className="mb-10 py-6"
              style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
            >
              <dl className="flex flex-col gap-3">
                {piece.material && (
                  <div className="flex justify-between">
                    <dt className="font-cinzel text-sm tracking-widest uppercase text-ash">Material</dt>
                    <dd className="font-crimson italic text-chalk text-sm">{piece.material}</dd>
                  </div>
                )}
                {piece.category === '3d' && piece.size && (
                  <div className="flex justify-between">
                    <dt className="font-cinzel text-sm tracking-widest uppercase text-ash">Size</dt>
                    <dd className="font-crimson italic text-chalk text-sm">{piece.size}</dd>
                  </div>
                )}
                {piece.category === '2d' && piece.dimensions && (
                  <div className="flex justify-between">
                    <dt className="font-cinzel text-sm tracking-widest uppercase text-ash">Dimensions</dt>
                    <dd className="font-crimson italic text-chalk text-sm">{piece.dimensions}</dd>
                  </div>
                )}
                {piece.price && (
                  <div className="flex justify-between">
                    <dt className="font-cinzel text-sm tracking-widest uppercase text-ash">Price</dt>
                    <dd className="font-crimson text-accent text-base">
                      €{piece.price.toLocaleString('en-IE')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                href={
                  piece.available && piece.price
                    ? `/enquire?piece=${encodeURIComponent(piece.title)}&price=${piece.price}&buy=1`
                    : `/enquire?piece=${encodeURIComponent(piece.title)}`
                }
                variant="primary"
              >
                {piece.available ? 'Enquire to Purchase' : 'Commission Similar'}
              </Button>
              <Button href="/portfolio" variant="ghost">
                View All Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
