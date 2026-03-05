'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const FOOTER_LINKS = [
  { label: 'Shop', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: 'mailto:hello@effortlessworks.com' },
  { label: 'Privacy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-5 px-16 py-10"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <Logo size={28} />
        <span className="text-xs tracking-wide" style={{ color: 'var(--text-faint)' }}>
          © {new Date().getFullYear()} Effortless Works
        </span>
      </div>

      <ul className="flex gap-7 list-none">
        {FOOTER_LINKS.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-xs tracking-widest no-underline transition-colors duration-200"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
