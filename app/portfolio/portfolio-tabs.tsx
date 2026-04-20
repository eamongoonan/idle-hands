'use client'

import { useState } from 'react'
import type { Piece } from '@/sanity/lib/queries'
import { PortfolioGrid } from '@/components/ui/portfolio-grid'

const TABS = [
  { value: 'all', label: 'All Work' },
  { value: '3d', label: '3D Pieces' },
  { value: '2d', label: '2D Pieces' },
] as const

type Tab = (typeof TABS)[number]['value']

export default function PortfolioTabs({ pieces }: { pieces: Piece[] }) {
  const [active, setActive] = useState<Tab>('all')

  const filtered =
    active === 'all' ? pieces : pieces.filter((p) => p.category === active)

  return (
    <>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Filter work by category"
        className="flex gap-0 mb-14 overflow-x-auto"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => setActive(tab.value)}
            className="font-cinzel text-sm tracking-[0.2em] uppercase px-6 py-3.5 shrink-0 whitespace-nowrap transition-colors duration-200"
            style={{
              color: active === tab.value ? 'var(--chalk)' : 'var(--ash)',
              borderBottom:
                active === tab.value
                  ? '2px solid var(--accent)'
                  : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <PortfolioGrid pieces={filtered} />
    </>
  )
}
