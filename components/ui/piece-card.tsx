import Image from 'next/image'
import Link from 'next/link'
import type { Piece } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/client'

interface PieceCardProps {
  readonly piece: Piece
}

export function PieceCard({ piece }: Readonly<PieceCardProps>) {
  const imageUrl = piece.mainImage
    ? urlFor(piece.mainImage).width(700).height(700).url()
    : (piece.localImage ?? null)

  return (
    <Link href={`/portfolio/${piece.slug.current}`} className="group block">
    <article
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Image */}
      <div
        className="piece-img-wrap relative overflow-hidden aspect-square mb-5"
        style={{ backgroundColor: 'var(--iron)' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={piece.mainImage?.alt ?? piece.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--iron), var(--soot))',
            }}
          >
            <span className="font-cinzel text-[0.6rem] tracking-widest text-ash uppercase">
              No Image
            </span>
          </div>
        )}

        {/* Available badge */}
        {piece.available && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <span className="font-cinzel text-[0.6rem] tracking-widest uppercase text-white">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="pb-7">
        <p className="font-crimson italic text-ash text-sm mb-1 capitalize">
          {piece.category === '2d' ? '2D Engraving' : '3D Piece'}
          {piece.material ? ` · ${piece.material}` : ''}
        </p>
        <h3 className="font-cinzel text-xs tracking-widest uppercase text-chalk mb-2">
          {piece.title}
        </h3>
        {piece.price ? (
          <p className="font-crimson text-stone text-base">
            €{piece.price.toLocaleString('en-IE')}
          </p>
        ) : null}
      </div>
    </article>
    </Link>
  )
}
