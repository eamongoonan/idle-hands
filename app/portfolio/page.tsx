import type { Metadata } from 'next'
import { getAllPieces } from '@/sanity/lib/queries'
import { STATIC_PIECES } from '@/lib/static-pieces'
import PortfolioTabs from './portfolio-tabs'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'The full body of work — 3D sculptural pieces and 2D engravings by Idle Hands, Dublin.',
  openGraph: {
    title: 'Portfolio | Idle Hands',
    description:
      'The full body of work — 3D sculptural pieces and 2D engravings by Idle Hands, Dublin.',
    url: 'https://idlehands.ie/portfolio',
  },
}

export default async function PortfolioPage() {
  const sanityPieces = await getAllPieces().catch(() => [])
  const pieces = sanityPieces.length > 0 ? sanityPieces : STATIC_PIECES

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-crimson italic text-ash mb-2">All work</p>
          <h1 className="section-heading mb-3">Portfolio</h1>
          <div
            className="w-16 h-px"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>

        <PortfolioTabs pieces={pieces} />
      </div>
    </div>
  )
}
