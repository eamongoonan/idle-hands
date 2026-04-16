import type { Piece } from '@/sanity/lib/queries'

/**
 * Static piece data backed by /public/images/*.png.
 * Used as fallback when Sanity is not yet configured.
 */
export const STATIC_PIECES: Piece[] = [
  {
    _id: 'static-2d-01',
    title: 'Abstract Relief I',
    slug: { current: 'abstract-relief-i' },
    category: '2d',
    material: 'Copper',
    available: true,
    price: 180,
    localImage: '/images/2D-01.png',
    description: 'Copper relief plate with abstract organic forms.',
  },
  {
    _id: 'static-3d-04',
    title: 'Hammered Wide Band',
    slug: { current: 'hammered-wide-band' },
    category: '3d',
    material: 'Silver',
    available: true,
    price: 280,
    localImage: '/images/3D-04.png',
    description: 'Wide hammered silver ring worn on fist.',
  },
  {
    _id: 'static-2d-02',
    title: 'Menorah & Cityscape',
    slug: { current: 'menorah-cityscape' },
    category: '2d',
    material: 'Copper',
    available: false,
    localImage: '/images/2D-02.png',
    description: 'Copper relief plate featuring a menorah with cityscape.',
  },
  {
    _id: 'static-3d-02',
    title: 'Chain Weave Ring',
    slug: { current: 'chain-weave-ring' },
    category: '3d',
    material: 'Silver',
    available: true,
    price: 320,
    localImage: '/images/3D-02.png',
    description: 'Silver chain weave ring.',
  },
  {
    _id: 'static-2d-03',
    title: 'Dublin Modular',
    slug: { current: 'dublin-modular' },
    category: '2d',
    material: 'Copper',
    available: false,
    localImage: '/images/2D-03.png',
    description: 'Copper plate with "Dublin Modular" text engraving.',
  },
  {
    _id: 'static-3d-01',
    title: 'Chain Weave Ring II',
    slug: { current: 'chain-weave-ring-ii' },
    category: '3d',
    material: 'Silver',
    available: false,
    localImage: '/images/3D-01.png',
    description: 'Silver chain weave ring, close-up on hand.',
  },
  {
    _id: 'static-3d-03',
    title: 'Open Cuffs',
    slug: { current: 'open-cuffs' },
    category: '3d',
    material: 'Aluminium',
    available: false,
    localImage: '/images/3D-03.png',
    description: 'Two aluminium open cuffs on wooden anvil block.',
  },
  {
    _id: 'static-3d-05',
    title: 'Hammered Wide Band II',
    slug: { current: 'hammered-wide-band-ii' },
    category: '3d',
    material: 'Silver',
    available: true,
    price: 280,
    localImage: '/images/3D-05.png',
    description: 'Wide hammered silver ring, close-up on fist.',
  },
]

export const STATIC_AVAILABLE = STATIC_PIECES.filter((p) => p.available)
