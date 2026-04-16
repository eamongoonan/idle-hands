import type { Piece } from '@/sanity/lib/queries'
import { PieceCard } from './piece-card'

interface PortfolioGridProps {
  readonly pieces: Piece[]
}

export function PortfolioGrid({ pieces }: PortfolioGridProps) {
  if (pieces.length === 0) {
    return (
      <div
        className="py-24 text-center"
        style={{ border: '1px solid var(--border)' }}
      >
        <p className="font-crimson italic text-ash text-lg">
          No pieces to display yet.
        </p>
        <p className="font-crimson text-stone text-sm mt-2">
          Connect Sanity CMS to start populating the portfolio.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
      {pieces.map((piece) => (
        <PieceCard key={piece._id} piece={piece} />
      ))}
    </div>
  )
}
