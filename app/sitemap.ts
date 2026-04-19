import type { MetadataRoute } from 'next'
import { getAllPieces } from '@/sanity/lib/queries'

const BASE = 'https://idlehands.ie'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/portfolio`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/shop`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/enquire`, changeFrequency: 'yearly', priority: 0.7 },
  ]

  const pieces = await getAllPieces().catch(() => [])
  const pieceRoutes: MetadataRoute.Sitemap = pieces.map((p) => ({
    url: `${BASE}/portfolio/${p.slug.current}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...pieceRoutes]
}
