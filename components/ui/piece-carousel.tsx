import Image from 'next/image'
import Link from 'next/link'
import type { Piece } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/client'

interface Props {
  readonly pieces: Piece[]
}

export function PieceCarousel({ pieces }: Readonly<Props>) {
  if (pieces.length === 0) return null

  // Duplicate for seamless infinite loop
  const track = [...pieces, ...pieces]

  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="carousel-track"
        style={{ backgroundColor: 'var(--border)' }}
      >
        {track.map((piece, i) => {
          const imageUrl = piece.mainImage
            ? urlFor(piece.mainImage).width(480).height(480).url()
            : (piece.localImage ?? null)

          return (
            <Link
              key={`${piece._id}-${i}`}
              href={`/portfolio/${piece.slug.current}`}
              className="group shrink-0 block"
              style={{ width: '260px' }}
            >
              <div
                className="piece-img-wrap relative overflow-hidden"
                style={{
                  width: '260px',
                  height: '260px',
                  backgroundColor: 'var(--iron)',
                }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={piece.mainImage?.alt ?? piece.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="260px"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--iron), var(--soot))',
                    }}
                  />
                )}
              </div>
              <div
                className="px-4 pt-3 pb-4"
                style={{ backgroundColor: 'var(--deep)' }}
              >
                <p className="font-cinzel text-[0.6rem] tracking-widest uppercase text-chalk truncate">
                  {piece.title}
                </p>
                <p className="font-crimson italic text-ash text-xs mt-0.5">
                  {piece.category === '2d' ? '2D Engraving' : '3D Piece'}
                  {piece.material ? ` · ${piece.material}` : ''}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
