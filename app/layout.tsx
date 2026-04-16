import type { Metadata } from 'next'
import './globals.css'
import { cinzel, crimsonPro } from '@/lib/fonts'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://idle-hands-chi.vercel.app'),
  title: {
    default: 'Idle Hands | Handcrafted Metalwork · Dublin',
    template: '%s | Idle Hands',
  },
  description:
    'Bespoke handcrafted metalwork from Dublin — 2D engravings, 3D sculptural pieces, and custom commissions by Patrick.',
  openGraph: {
    siteName: 'Idle Hands',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonPro.variable}`}>
      <body className="bg-black text-bone antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
