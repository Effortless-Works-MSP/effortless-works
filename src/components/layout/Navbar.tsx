'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <style>{`
        .ew-nav-catalog:hover { color: rgba(232,228,220,0.75) !important; }
        .ew-nav-cta:hover { background: #8fd4b4 !important; transform: translateY(-1px); }
        @media (min-width: 768px) {
          .ew-hamburger { display: none !important; }
          .ew-desktop-right { display: flex !important; }
        }
        @media (max-width: 767px) {
          .ew-desktop-right { display: none !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(12,13,14,0.94)' : 'linear-gradient(to bottom, rgba(12,13,14,0.9) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', height: 68,
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Logo size={44} />
          </Link>

          {/* Desktop right */}
          <div className="ew-desktop-right" style={{ alignItems: 'center', gap: 20 }}>
            <Link
              href="/catalog"
              className="ew-nav-catalog"
              style={{
                fontSize: 13, letterSpacing: '0.06em',
                color: 'rgba(232,228,220,0.42)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              Browse all tools
            </Link>
            <Link
              href="/#products"
              className="ew-nav-cta"
              style={{
                padding: '9px 22px', borderRadius: 100,
                background: '#7BBFA0', color: '#0C0D0E',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
              }}
            >
              Set up my space
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="ew-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40, height: 40, background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
            <span style={{ display: 'block', width: 17, height: 1.5, background: '#E8E4DC', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 11, height: 1.5, background: '#7BBFA0', borderRadius: 2 }} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <>
        <div onClick={() => setMobileOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 150,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }} />

        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(300px, 85vw)',
          background: '#131416',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          zIndex: 160,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <Logo size={40} />
            <button onClick={() => setMobileOpen(false)} aria-label="Close" style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'transparent', color: 'rgba(232,228,220,0.5)',
              cursor: 'pointer', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link href="/catalog" onClick={() => setMobileOpen(false)} style={{
              fontSize: 15, color: 'rgba(232,228,220,0.55)',
              textDecoration: 'none', letterSpacing: '0.04em',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              Browse all tools
            </Link>
          </div>

          {/* CTA */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link href="/#products" onClick={() => setMobileOpen(false)} style={{
              display: 'block', width: '100%', textAlign: 'center',
              padding: '13px', borderRadius: 100,
              background: '#7BBFA0', color: '#0C0D0E',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
              textDecoration: 'none',
            }}>
              Set up my space
            </Link>
          </div>
        </div>
      </>

      {/* Height spacer */}
      <div style={{ height: 68 }} />
    </>
  )
}
