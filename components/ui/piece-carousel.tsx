'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Piece } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/client'

interface Props {
  readonly pieces: Piece[]
}

const CARD_WIDTH = 300
const GAP = 1
const CARD_STEP = CARD_WIDTH + GAP
const PAUSE_MS = 3500
const TRANSITION_MS = 700

export function PieceCarousel({ pieces }: Readonly<Props>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el || pieces.length === 0) return

    const advance = () => {
      const next = indexRef.current + 1

      // Animate to next position (may be in the duplicate set — that's fine)
      el.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
      el.style.transform = `translateX(-${next * CARD_STEP}px)`
      indexRef.current = next

      // After the transition, silently snap back to the equivalent position in the
      // original set so the loop is seamless
      if (next >= pieces.length) {
        setTimeout(() => {
          el.style.transition = 'none'
          el.style.transform = 'translateX(0)'
          indexRef.current = 0
          el.getBoundingClientRect() // force reflow before next transition
        }, TRANSITION_MS)
      }
    }

    const id = setInterval(advance, PAUSE_MS)
    return () => clearInterval(id)
  }, [pieces.length])

  if (pieces.length === 0) return null

  // Duplicate the list so the seamless snap-back is invisible
  const track = [...pieces, ...pieces]

  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${GAP}px`, backgroundColor: 'var(--border)' }}
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
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <div
                className="piece-img-wrap relative overflow-hidden"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_WIDTH}px`,
                  backgroundColor: 'var(--iron)',
                }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={piece.mainImage?.alt ?? piece.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="300px"
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

                {piece.available && (
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <span className="font-cinzel text-xs tracking-widest uppercase text-white">
                      Available
                    </span>
                  </div>
                )}
              </div>
              <div
                className="px-4 pt-3 pb-5"
                style={{ backgroundColor: 'var(--deep)' }}
              >
                <p className="font-cinzel text-xs tracking-[0.18em] uppercase text-accent mb-1">
                  {piece.category === '2d' ? '2D' : '3D'}
                  {piece.material ? ` · ${piece.material}` : ''}
                </p>
                <p className="font-cinzel text-sm tracking-wider uppercase text-chalk truncate">
                  {piece.title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
