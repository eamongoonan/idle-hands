import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './mobile-menu'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/shop', label: 'Available' },
  { href: '/about', label: 'About' },
  { href: '/enquire', label: 'Enquire' },
]

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'var(--deep)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-4 shrink-0">
          <div className="logo-img relative w-16 h-16 shrink-0">
            <Image
              src="/logo.png"
              alt="Idle Hands"
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
          <div className="leading-snug">
            <p className="font-cinzel text-base tracking-[0.2em] text-chalk uppercase">
              Idle Hands
            </p>
            <p className="font-crimson text-sm italic text-stone">
              Handcrafted Metalwork · Dublin
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-stone hover:text-chalk transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  )
}
