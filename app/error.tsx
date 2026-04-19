'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <p className="font-cinzel text-sm tracking-[0.3em] uppercase text-accent mb-4">
          Error
        </p>
        <h1 className="section-heading mb-6">Something Went Wrong</h1>
        <p className="font-crimson text-stone text-lg leading-relaxed mb-10">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <Link
          href="/"
          className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
        >
          Go Home →
        </Link>
      </div>
    </div>
  )
}
