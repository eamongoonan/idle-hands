import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Run: SANITY_API_TOKEN=your_token node scripts/import-pieces.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: 'xt6zonxj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const pieces = [
  {
    title: 'Abstract Relief I',
    slug: { _type: 'slug', current: 'abstract-relief-i' },
    category: '2d',
    material: 'Copper',
    available: true,
    price: 180,
    description: 'Copper relief plate with abstract organic forms.',
    dimensions: '22 × 16 cm',
  },
  {
    title: 'Hammered Wide Band',
    slug: { _type: 'slug', current: 'hammered-wide-band' },
    category: '3d',
    material: 'Silver',
    available: true,
    price: 280,
    description: 'Wide hammered silver ring worn on fist.',
    size: 'Sizes J–T (EU 49–62) available to order',
  },
  {
    title: 'Menorah & Cityscape',
    slug: { _type: 'slug', current: 'menorah-cityscape' },
    category: '2d',
    material: 'Copper',
    available: false,
    price: 220,
    description: 'Copper relief plate featuring a menorah with cityscape.',
    dimensions: '28 × 20 cm',
  },
  {
    title: 'Chain Weave Ring',
    slug: { _type: 'slug', current: 'chain-weave-ring' },
    category: '3d',
    material: 'Silver',
    available: false,
    price: 240,
    description: 'Silver chain weave ring.',
    size: 'Sizes J–T (EU 49–62) available to order',
  },
  {
    title: 'Dublin Modular',
    slug: { _type: 'slug', current: 'dublin-modular' },
    category: '2d',
    material: 'Copper',
    available: false,
    price: 160,
    description: 'Copper plate with "Dublin Modular" text engraving.',
    dimensions: '18 × 12 cm',
  },
  {
    title: 'Chain Weave Ring II',
    slug: { _type: 'slug', current: 'chain-weave-ring-ii' },
    category: '3d',
    material: 'Silver',
    available: false,
    price: 260,
    description: 'Silver chain weave ring, close-up on hand.',
    size: 'Sizes J–T (EU 49–62) available to order',
  },
  {
    title: 'Open Cuffs',
    slug: { _type: 'slug', current: 'open-cuffs' },
    category: '3d',
    material: 'Aluminium',
    available: true,
    price: 240,
    description: 'Two aluminium open cuffs on wooden anvil block.',
    size: 'S / M / L — inner circumference 155–185 mm, adjustable',
  },
  {
    title: 'Hammered Wide Band II',
    slug: { _type: 'slug', current: 'hammered-wide-band-ii' },
    category: '2d',
    material: 'Copper',
    available: false,
    price: 200,
    description: 'Copper engraved plate.',
    dimensions: '30 × 22 cm',
  },
]

for (const piece of pieces) {
  const doc = { _type: 'piece', ...piece }
  const result = await client.create(doc)
  console.log(`Created: ${piece.title} (${result._id})`)
}

console.log('\nDone. Open the Studio to add images to each piece.')
