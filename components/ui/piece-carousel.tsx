'use client'

import { useEffect, useRef, useCallback } from 'react'
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
const PAUSE_MS = 5500

export function PieceCarousel({ pieces }: Readonly<Props>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - CARD_STEP
    el.scrollTo({
      left: atEnd ? 0 : el.scrollLeft + CARD_STEP,
      behavior: atEnd ? 'instant' : 'smooth',
    })
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(advance, PAUSE_MS)
  }, [advance])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  if (pieces.length === 0) return null

  return (
    <div className="carousel-fade-wrap">
    <div
      ref={containerRef}
      onMouseEnter={stop}
      onMouseLeave={start}
      className="carousel-scroll flex"
      style={{
        gap: `${GAP}px`,
        backgroundColor: 'var(--border)',
        borderBottom: '1px solid var(--border)',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      } as React.CSSProperties}
    >
      {pieces.map((piece, i) => {
        const imageUrl = piece.mainImage
          ? urlFor(piece.mainImage).width(480).height(480).url()
          : (piece.localImage ?? null)

        return (
          <Link
            key={`${piece._id}-${i}`}
            href={`/portfolio/${piece.slug.current}`}
            className="group shrink-0 block"
            style={{ width: `${CARD_WIDTH}px`, scrollSnapAlign: 'start' } as React.CSSProperties}
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
                    background: 'linear-gradient(135deg, var(--iron), var(--soot))',
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
