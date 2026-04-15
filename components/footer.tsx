import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/shop', label: 'Available Pieces' },
  { href: '/about', label: 'About' },
  { href: '/enquire', label: 'Enquire' },
]

export default function Footer() {
  return (
    <footer
      className="py-14 px-6"
      style={{
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="logo-img relative w-10 h-10 overflow-hidden mb-3">
            <Image
              src="/logo.png"
              alt="Idle Hands"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <p className="font-cinzel text-xs tracking-[0.25em] text-chalk uppercase mb-1">
            Idle Hands
          </p>
          <p className="font-crimson italic text-ash text-sm">
            Handcrafted Metalwork · Dublin
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-crimson text-stone hover:text-chalk transition-colors duration-200 text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Note */}
        <div>
          <p className="font-crimson text-stone text-sm leading-relaxed">
            All pieces are made by hand in Dublin. Commissions open year-round.
            Response within 48 hours.
          </p>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="font-crimson text-ash text-xs">
          © {new Date().getFullYear()} Idle Hands
        </p>
        <p className="font-crimson italic text-ash text-xs">
          Made by hand. Built with care.
        </p>
      </div>
    </footer>
  )
}
