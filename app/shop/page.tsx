import type { Metadata } from 'next'
import { getAvailablePieces } from '@/sanity/lib/queries'
import { STATIC_AVAILABLE } from '@/lib/static-pieces'
import ShopFilters from './shop-filters'

export const metadata: Metadata = {
  title: 'Available Pieces',
  description:
    'One-of-a-kind pieces available to purchase — 3D sculptures and 2D engravings by Idle Hands, Dublin.',
}

export default async function ShopPage() {
  const sanityPieces = await getAvailablePieces().catch(() => [])
  const pieces = sanityPieces.length > 0 ? sanityPieces : STATIC_AVAILABLE

  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="font-crimson italic text-ash mb-2">For sale</p>
          <h1 className="section-heading mb-3">Available Pieces</h1>
          <div
            className="w-16 h-px mb-8"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <p className="font-crimson text-stone text-lg max-w-xl leading-relaxed">
            Each piece is one of a kind. Once sold, it&apos;s gone. Worldwide shipping from Dublin — enquire for details.
          </p>
        </div>

        {/* Separator */}
        <div
          className="my-12"
          style={{ borderTop: '1px solid var(--border)' }}
        />

        <ShopFilters pieces={pieces} />
      </div>
    </div>
  )
}
