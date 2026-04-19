import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enquire',
  description:
    'Commission a bespoke piece or enquire about available work. All commissions considered — response within 48 hours.',
  openGraph: {
    title: 'Enquire | Idle Hands',
    description:
      'Commission a bespoke piece or enquire about available work. All commissions considered — response within 48 hours.',
    url: 'https://idlehands.ie/enquire',
  },
}

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
