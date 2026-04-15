import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    return {
      width: () => ({ height: () => ({ url: () => '' }) }),
      url: () => '',
    }
  }
  return builder.image(source)
}
