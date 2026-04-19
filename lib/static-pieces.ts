import type { Piece } from '@/sanity/lib/queries'

/**
 * Static piece data backed by /public/images/*.png.
 * Used as fallback when Sanity is not yet configured.
 */
export const STATIC_PIECES: Piece[] = [
  {
    _id: 'static-2d-01',
    title: '[PLACEHOLDER] Abstract Relief I',
    slug: { current: 'abstract-relief-i' },
    category: '2d',
    material: 'Copper',
    available: false,
    localImage: '/images/2D-01.png',
    description: 'This is a placeholder piece. Add your own work via the Studio.',
    dimensions: '22 × 16 cm',
  },
  {
    _id: 'static-3d-04',
    title: '[PLACEHOLDER] Hammered Wide Band',
    slug: { current: 'hammered-wide-band' },
    category: '3d',
    material: 'Silver',
    available: false,
    localImage: '/images/3D-04.png',
    description: 'This is a placeholder piece. Add your own work via the Studio.',
    size: 'Sizes J–T (EU 49–62) available to order',
  },
  {
    _id: 'static-3d-03',
    title: '[PLACEHOLDER] Open Cuffs',
    slug: { current: 'open-cuffs' },
    category: '3d',
    material: 'Aluminium',
    available: false,
    localImage: '/images/3D-03.png',
    description: 'This is a placeholder piece. Add your own work via the Studio.',
    size: 'S / M / L — inner circumference 155–185 mm, adjustable',
  },
  {
    _id: 'static-2d-02',
    title: '[PLACEHOLDER] Menorah & Cityscape',
    slug: { current: 'menorah-cityscape' },
    category: '2d',
    material: 'Copper',
    available: false,
    localImage: '/images/2D-02.png',
    description: 'This is a placeholder piece. Add your own work via the Studio.',
    dimensions: '28 × 20 cm',
  },
]

export const STATIC_AVAILABLE = STATIC_PIECES.filter((p) => p.available)
