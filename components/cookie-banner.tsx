'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const CONSENT_KEY = 'cookie_consent'

export default function CookieBanner({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored as 'accepted' | 'declined')
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setConsent('declined')
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}
          </Script>
        </>
      )}
      {consent === null && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 px-4 py-5 sm:px-8"
          style={{ backgroundColor: 'var(--deep)', borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-crimson text-stone text-sm leading-relaxed max-w-xl">
              This site uses cookies for analytics. By accepting, you consent to the use of Google
              Analytics to help improve the site.{' '}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="font-cinzel text-xs tracking-[0.15em] uppercase text-stone hover:text-chalk transition-colors duration-200 px-4 py-2"
                style={{ border: '1px solid var(--border)' }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="font-cinzel text-xs tracking-[0.15em] uppercase text-chalk hover:text-accent transition-colors duration-200 px-4 py-2"
                style={{ backgroundColor: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
