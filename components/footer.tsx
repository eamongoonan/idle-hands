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

        {/* Commission note */}
        <div className="sm:text-right max-w-xs sm:max-w-sm">
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
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto mt-12 pt-6 flex flex-row justify-between items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="font-crimson text-ash text-xs">
          © {new Date().getFullYear()} Idle Hands
        </p>
        <a
          href="https://www.instagram.com/idlehandsdublin"
          target="_blank"
          rel="noopener noreferrer"
          className="font-crimson text-ash text-xs hover:text-stone transition-colors duration-200"
        >
          @idlehandsdublin
        </a>
      </div>
    </footer>
  )
}
