'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Piece } from '@/sanity/lib/queries'
import { PortfolioGrid } from '@/components/ui/portfolio-grid'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: '3d', label: '3D Pieces' },
  { value: '2d', label: '2D Pieces' },
] as const

type Filter = (typeof FILTERS)[number]['value']

export default function ShopFilters({ pieces }: { pieces: Piece[] }) {
  const [active, setActive] = useState<Filter>('all')

  const filtered =
    active === 'all' ? pieces : pieces.filter((p) => p.category === active)

  if (pieces.length === 0) {
    return (
      <div className="py-16 md:py-24 text-center">
        <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: 'var(--accent)' }} />
        <p className="font-cinzel text-sm tracking-[0.2em] uppercase text-ash mb-4">
          Nothing available right now
        </p>
        <p className="font-crimson text-stone text-lg leading-relaxed mb-10 max-w-sm mx-auto">
          All current pieces are spoken for. New work is added as it&apos;s completed — or commission something made to order.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/portfolio"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            View Portfolio →
          </Link>
          <span className="text-stone">·</span>
          <Link
            href="/enquire"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            Commission a Piece →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Filter chips */}
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f) => {
          const isActive = active === f.value
          return (
            <button
              key={f.value}
              aria-pressed={isActive}
              onClick={() => setActive(f.value)}
              className="font-cinzel text-sm tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-200"
              style={{
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? 'var(--white)' : 'var(--stone)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent)' : 'var(--border-hover)',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-crimson italic text-ash text-lg mb-4">
            No available pieces in this category.
          </p>
          <button
            onClick={() => setActive('all')}
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            Show All →
          </button>
        </div>
      ) : (
        <PortfolioGrid pieces={filtered} />
      )}
    </>
  )
}
