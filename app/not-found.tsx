import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-md">
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <p className="font-cinzel text-sm tracking-[0.3em] uppercase text-accent mb-4">
          404
        </p>
        <h1 className="font-cinzel text-chalk uppercase tracking-[0.1em] text-3xl mb-6">
          Page Not Found
        </h1>
        <p className="font-crimson text-stone text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
          >
            Return Home →
          </Link>
          <Link
            href="/portfolio"
            className="font-cinzel text-sm tracking-[0.18em] uppercase text-stone hover:text-chalk transition-colors duration-200"
          >
            View Portfolio →
          </Link>
        </div>
      </div>
    </div>
  )
}
