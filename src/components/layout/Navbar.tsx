'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/navData'
import type { NavItem } from '@/lib/navData'
import Logo from '@/components/ui/Logo'
import GetStartedChat from '@/components/GetStartedChat'

// ─── Floating Bubble Box ─────────────────────────────────────
const BUBBLE_VARIANTS = [
  { bg: 'rgba(123,191,160,0.12)', color: '#7BBFA0', border: '1px solid rgba(123,191,160,0.25)' },
  { bg: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.45)', border: '1px solid rgba(255,255,255,0.08)' },
  { bg: 'rgba(232,228,220,0.05)', color: 'rgba(232,228,220,0.35)', border: '1px solid rgba(232,228,220,0.1)' },
]

interface BubbleState {
  tag: string
  x: number
  y: number
  vx: number
  vy: number
  variant: typeof BUBBLE_VARIANTS[number]
}

function FloatingBubbleBox({ tags, active }: { tags: string[]; active: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<BubbleState[]>([])
  const rafRef = useRef<number | null>(null)
  const elRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [ready, setReady] = useState(false)

  // initialise bubble positions once the box is measured
  useEffect(() => {
    if (!active || !boxRef.current) return
    const box = boxRef.current
    const W = box.offsetWidth
    const H = box.offsetHeight

    // wait one frame so span elements are rendered and measurable
    const id = requestAnimationFrame(() => {
      bubblesRef.current = tags.map((tag, i) => {
        const el = elRefs.current[i]
        const bw = el ? el.offsetWidth : 60
        const bh = el ? el.offsetHeight : 20
        const speed = 0.18 + Math.random() * 0.22
        const angle = Math.random() * Math.PI * 2
        return {
          tag,
          x: Math.random() * Math.max(0, W - bw),
          y: Math.random() * Math.max(0, H - bh),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          variant: BUBBLE_VARIANTS[i % BUBBLE_VARIANTS.length],
        }
      })
      setReady(true)
    })
    return () => cancelAnimationFrame(id)
  }, [active, tags])

  // animation loop
  useEffect(() => {
    if (!active || !ready || !boxRef.current) return
    const box = boxRef.current

    const animate = () => {
      const W = box.offsetWidth
      const H = box.offsetHeight
      bubblesRef.current.forEach((b, i) => {
        const el = elRefs.current[i]
        if (!el) return
        const bw = el.offsetWidth
        const bh = el.offsetHeight
        b.x += b.vx
        b.y += b.vy
        if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx) }
        if (b.x + bw >= W) { b.x = W - bw; b.vx = -Math.abs(b.vx) }
        if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy) }
        if (b.y + bh >= H) { b.y = H - bh; b.vy = -Math.abs(b.vy) }
        el.style.transform = `translate(${b.x}px, ${b.y}px)`
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, ready])

  return (
    <div
      ref={boxRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 64,
        borderRadius: 10,
        border: `1px solid ${active ? 'rgba(123,191,160,0.2)' : 'rgba(255,255,255,0.06)'}`,
        background: 'rgba(0,0,0,0.2)',
        overflow: 'hidden',
        marginTop: 6,
        transition: 'border-color 0.2s',
      }}
    >
      {tags.map((tag, i) => {
        const v = BUBBLE_VARIANTS[i % BUBBLE_VARIANTS.length]
        return (
          <span
            key={tag}
            ref={el => { elRefs.current[i] = el }}
            style={{
              position: 'absolute',
              borderRadius: 100,
              padding: '3px 9px',
              fontSize: 9.5,
              fontFamily: 'inherit',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              background: v.bg,
              color: v.color,
              border: v.border,
              opacity: active && ready ? 1 : 0,
              transition: 'opacity 0.3s',
              transform: 'translate(0px, 0px)',
            }}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DropdownPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.dropdown) return null
  const { sections } = item.dropdown
  const cols = Math.min(sections.length, 4)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '50%',
      transform: 'translateX(-50%)',
      minWidth: cols <= 2 ? 340 : cols === 3 ? 500 : 660,
      background: '#131416',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
      padding: '28px 32px 32px',
      zIndex: 200,
      animation: 'ewDropIn 0.2s ease forwards',
    }}>
      {/* top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
        background: 'linear-gradient(90deg, transparent, #7BBFA0, transparent)',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 28,
        alignItems: 'start',
      }}>
        {sections.map((section) => (
          <div key={section.title} style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{
              fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#7BBFA0', fontWeight: 500, textAlign: 'center',
              borderBottom: '0.5px solid rgba(123,191,160,0.3)', paddingBottom: 6,
              margin: '0 0 10px 0',
              height: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            }}>
              {section.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {section.items.map((subItem) => {
                const key = `${section.title}-${subItem.label}`
                return (
                  <Link key={subItem.href + subItem.label} href={subItem.href} onClick={onClose}
                    style={{ textDecoration: 'none' }}>
                    <div
                      className="ew-dropdown-item"
                      style={{ padding: '8px 10px', borderRadius: 10, transition: 'background 0.15s' }}
                    >
                      <span style={{ display: 'block', fontSize: 16, color: '#E8E4DC', lineHeight: 1.3 }}>
                        {subItem.label}
                      </span>
                      {subItem.tags && subItem.tags.length > 0 && (
                        <FloatingBubbleBox tags={subItem.tags} active={true} />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) setTimeout(() => setExpanded(null), 350)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.3s',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(340px, 88vw)',
        background: '#131416',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        zIndex: 160,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* Drawer header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <Logo size={44} />
          <button onClick={onClose} aria-label="Close menu" style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'transparent', color: 'rgba(232,228,220,0.5)',
            cursor: 'pointer', fontSize: 20, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, paddingTop: 8 }}>
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 24px',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: expanded === item.label ? '#7BBFA0' : '#E8E4DC',
                      fontSize: 15, letterSpacing: '0.04em',
                      fontFamily: 'inherit',
                      transition: 'color 0.15s',
                    }}>
                    {item.label}
                    <Chevron open={expanded === item.label} />
                  </button>

                  <div style={{
                    maxHeight: expanded === item.label ? 800 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}>
                    <div style={{ padding: '4px 0 16px' }}>
                      {item.dropdown.sections.map((section) => (
                        <div key={section.title} style={{ padding: '6px 24px 4px 32px' }}>
                          <p style={{
                            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                            color: '#7BBFA0', marginBottom: 6, fontWeight: 500,
                          }}>{section.title}</p>
                          {section.items.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href} onClick={onClose} style={{
                              display: 'block', padding: '7px 10px', marginBottom: 1,
                              fontSize: 14, color: 'rgba(232,228,220,0.6)',
                              textDecoration: 'none', borderRadius: 8,
                              transition: 'color 0.15s',
                            }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#E8E4DC')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.6)')}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href ?? '/'} onClick={onClose} style={{
                  display: 'block', padding: '14px 24px',
                  fontSize: 15, letterSpacing: '0.04em',
                  color: '#E8E4DC', textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7BBFA0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#E8E4DC')}
                >
                  {item.label}
                </Link>
              )}
              {idx < NAV_ITEMS.length - 1 && (
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 24px' }} />
              )}
            </div>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <Link href="/000002/contact" onClick={onClose} style={{
            display: 'block', textAlign: 'center',
            padding: '13px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.08em',
            textDecoration: 'none',
          }}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── Main export ────────────────────────────────────────────
export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  function openDropdown(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  useEffect(() => {
    setActiveDropdown(null)
    setMobileOpen(false)
    setChatOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes ewDropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (min-width: 1024px) {
          .ew-desktop-nav { display: flex !important; }
          .ew-hamburger   { display: none !important; }
          .ew-cta-btn     { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .ew-desktop-nav { display: none !important; }
          .ew-cta-btn     { display: none !important; }
        }
        .ew-nav-link:hover { color: #E8E4DC !important; }
        .ew-cta-btn:hover { background: #7BBFA0 !important; color: #0C0D0E !important; }
        .ew-dropdown-item:hover { background: rgba(123,191,160,0.08) !important; }
      `}</style>

      <header ref={navRef} style={{
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

          {/* ── Logo ── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Logo size={44} />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="ew-desktop-nav" style={{ alignItems: 'center', gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.dropdown && openDropdown(item.label)}
                onMouseLeave={() => item.dropdown && scheduleClose()}
              >
                {item.dropdown ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '7px 14px', borderRadius: 100,
                      background: activeDropdown === item.label ? 'rgba(123,191,160,0.09)' : 'transparent',
                      border: 'none', cursor: 'pointer',
                      color: activeDropdown === item.label ? '#E8E4DC' : 'rgba(232,228,220,0.55)',
                      fontSize: 15, letterSpacing: '0.04em',
                      fontFamily: 'inherit',
                      transition: 'color 0.15s, background 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                    <Chevron open={activeDropdown === item.label} />
                  </button>
                ) : (
                  <Link href={item.href ?? '/'} className="ew-nav-link" style={{
                    display: 'block', padding: '7px 14px', borderRadius: 100,
                    color: pathname === item.href ? '#E8E4DC' : 'rgba(232,228,220,0.55)',
                    fontSize: 15, letterSpacing: '0.04em',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  >
                    {item.label}
                  </Link>
                )}

                {item.dropdown && activeDropdown === item.label && (
                  <DropdownPanel item={item} onClose={() => setActiveDropdown(null)} />
                )}
              </div>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <button
              onClick={() => setChatOpen(true)}
              className="ew-cta-btn"
              style={{
                alignItems: 'center',
                padding: '9px 22px', borderRadius: 100,
                border: '1px solid #7BBFA0',
                color: '#7BBFA0', fontSize: 12, letterSpacing: '0.08em',
                background: 'transparent',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Get Started
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="ew-hamburger"
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
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <GetStartedChat open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Height spacer */}
      <div style={{ height: 68 }} />
    </>
  )
}
