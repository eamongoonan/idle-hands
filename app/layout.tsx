import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { cinzel, crimsonPro } from '@/lib/fonts'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import CookieBanner from '@/components/cookie-banner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://idlehands.ie'),
  title: {
    default: 'Idle Hands | Handcrafted Metalwork · Dublin',
    template: '%s | Idle Hands',
  },
  description:
    'Bespoke handcrafted metalwork from Dublin — 2D engravings, 3D sculptural pieces, and custom commissions by Patrick Watts.',
  openGraph: {
    siteName: 'Idle Hands',
    type: 'website',
    locale: 'en_IE',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Idle Hands' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Idle Hands',
  description:
    'Bespoke handcrafted metalwork from Dublin — 2D engravings, 3D sculptural pieces, and custom commissions by Patrick Watts.',
  url: 'https://idlehands.ie',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dublin',
    addressCountry: 'IE',
  },
  email: 'Patrick@idlehandsdublin.com',
  priceRange: '€€',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonPro.variable}`}>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-bone antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        {gaId && <CookieBanner gaId={gaId} />}
      </body>
    </html>
  )
}
