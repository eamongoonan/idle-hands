'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/shop', label: 'Available' },
  { href: '/about', label: 'About' },
  { href: '/enquire', label: 'Enquire' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
      >
        <span
          className="block w-6 h-px transition-all duration-300 origin-center"
          style={{
            backgroundColor: 'var(--chalk)',
            transform: open ? 'translateY(7px) rotate(45deg)' : undefined,
          }}
        />
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            backgroundColor: 'var(--chalk)',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-px transition-all duration-300 origin-center"
          style={{
            backgroundColor: 'var(--chalk)',
            transform: open ? 'translateY(-7px) rotate(-45deg)' : undefined,
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <nav
          className="absolute top-full left-0 right-0 flex flex-col py-6"
          style={{
            backgroundColor: 'var(--deep)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-cinzel text-sm tracking-[0.22em] uppercase text-stone hover:text-chalk transition-colors duration-200 px-6 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
