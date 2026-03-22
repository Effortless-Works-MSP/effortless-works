'use client'

import Link from 'next/link'

interface ComingSoonPageProps {
  eyebrow: string
  name: string
  description: string
  includes: string[]
}

export default function ComingSoonPage({ eyebrow, name, description, includes }: ComingSoonPageProps) {
  return (
    <div style={{ padding: '100px 0 160px', maxWidth: 640 }}>

      <p style={{
        fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: '#9B8ED4', margin: '0 0 24px',
      }}>{eyebrow}</p>

      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(44px, 6vw, 72px)',
        color: '#E8E4DC', margin: '0 0 8px', lineHeight: 1.05,
        letterSpacing: '-0.01em',
      }}>{name}</h1>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '6px 16px', borderRadius: 100,
        background: 'rgba(155,142,212,0.1)', border: '1px solid rgba(155,142,212,0.3)',
        margin: '0 0 32px',
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9B8ED4', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#9B8ED4', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Being built</span>
      </div>

      <p style={{
        fontSize: 15, color: 'rgba(232,228,220,0.55)',
        lineHeight: 1.85, margin: '0 0 48px', maxWidth: 520,
      }}>{description}</p>

      {/* What it will include */}
      <div style={{
        padding: '1px', borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(155,142,212,0.2) 0%, rgba(255,255,255,0.04) 60%, rgba(155,142,212,0.1) 100%)',
        marginBottom: 48,
      }}>
        <div style={{
          background: 'linear-gradient(160deg, #181b1e 0%, #0c0d0e 100%)',
          borderRadius: 17, padding: '30px 32px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(155,142,212,0.5), transparent)',
          }} />
          <p style={{
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(232,228,220,0.3)', margin: '0 0 18px',
          }}>What it will include</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {includes.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#9B8ED4', opacity: 0.6, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(232,228,220,0.55)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link href="/#products" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 13, color: 'rgba(232,228,220,0.38)',
        textDecoration: 'none', letterSpacing: '0.05em',
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.7)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.38)')}
      >
        ← Explore what's available now
      </Link>
    </div>
  )
}
