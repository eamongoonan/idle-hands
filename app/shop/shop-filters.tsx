'use client'

import { useState } from 'react'
import type { Piece } from '@/sanity/lib/queries'
import { PortfolioGrid } from '@/components/ui/portfolio-grid'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: '3d', label: '3D Pieces' },
  { value: '2d', label: '2D Engravings' },
] as const

type Filter = (typeof FILTERS)[number]['value']

export default function ShopFilters({ pieces }: { pieces: Piece[] }) {
  const [active, setActive] = useState<Filter>('all')

  const filtered =
    active === 'all' ? pieces : pieces.filter((p) => p.category === active)

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f) => {
          const isActive = active === f.value
          return (
            <button
              key={f.value}
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

      <PortfolioGrid pieces={filtered} />
    </>
  )
}
