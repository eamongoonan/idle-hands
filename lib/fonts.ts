import { Cinzel, Crimson_Pro } from 'next/font/google'

export const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})
