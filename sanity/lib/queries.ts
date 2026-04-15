import { client } from './client'

export type Piece = {
  _id: string
  title: string
  slug: { current: string }
  category: '2d' | '3d'
  material?: string
  price?: number
  available: boolean
  mainImage?: {
    asset: { _ref: string }
    alt?: string
  }
  /** Local /public path used as fallback when mainImage is absent (static pieces) */
  localImage?: string
  description?: string
}

const PIECE_FIELDS = `
  _id,
  title,
  slug,
  category,
  material,
  price,
  available,
  mainImage { asset, alt },
  description
`

const ALL_PIECES_QUERY = `*[_type == "piece"] | order(_createdAt desc) { ${PIECE_FIELDS} }`

const PIECES_BY_CATEGORY_QUERY = `*[_type == "piece" && category == $category] | order(_createdAt desc) { ${PIECE_FIELDS} }`

const AVAILABLE_PIECES_QUERY = `*[_type == "piece" && available == true] | order(_createdAt desc) { ${PIECE_FIELDS} }`

export async function getAllPieces(): Promise<Piece[]> {
  if (!client) return []
  return client.fetch<Piece[]>(ALL_PIECES_QUERY)
}

export async function getPiecesByCategory(
  category: '2d' | '3d'
): Promise<Piece[]> {
  if (!client) return []
  return client.fetch<Piece[]>(PIECES_BY_CATEGORY_QUERY, { category })
}

export async function getAvailablePieces(): Promise<Piece[]> {
  if (!client) return []
  return client.fetch<Piece[]>(AVAILABLE_PIECES_QUERY)
}
