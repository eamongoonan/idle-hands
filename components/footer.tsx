import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      className="py-14 px-4 sm:px-8"
      style={{
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-10">
        {/* Brand */}
        <div>
          <div className="logo-img relative w-14 h-14 mb-3">
            <Image
              src="/logo.png"
              alt="Idle Hands"
              fill
              className="object-contain"
              sizes="56px"
            />
          </div>
          <p className="font-cinzel text-xs tracking-[0.25em] text-chalk uppercase mb-1">
            Idle Hands
          </p>
          <p className="font-crimson italic text-ash text-sm">
            Handcrafted Metalwork · Dublin
          </p>
        </div>

        {/* Commission note + Instagram */}
        <div className="sm:text-right max-w-xs sm:max-w-sm flex flex-col gap-6">
          <div>
            <p className="font-crimson text-stone text-sm leading-relaxed mb-3">
              All pieces are made by hand in Dublin. Commissions open year-round —
              response within 48 hours.
            </p>
            <Link
              href="/enquire"
              className="font-cinzel text-xs tracking-[0.18em] uppercase text-accent hover:text-chalk transition-colors duration-200"
            >
              Make an Enquiry →
            </Link>
          </div>

          <a
            href="https://www.instagram.com/idlehandsdublin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:justify-end group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-stone group-hover:text-chalk transition-colors duration-200"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-cinzel text-xs tracking-[0.18em] uppercase text-stone group-hover:text-chalk transition-colors duration-200">
              @idlehandsdublin
            </span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto mt-12 pt-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="font-crimson text-ash text-xs">
          © 2024 Idle Hands
        </p>
      </div>
    </footer>
  )
}
