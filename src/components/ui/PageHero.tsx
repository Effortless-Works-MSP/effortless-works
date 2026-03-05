'use client'

import type { PageMeta } from '@/types'

interface PageHeroProps extends PageMeta {
  children?: React.ReactNode
}

export default function PageHero({ eyebrow, title, subtitle, description, children }: PageHeroProps) {
  return (
    <div style={{
      padding: '80px 0 60px',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '-5%',
        transform: 'translateY(-50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(123,191,160,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p style={{
        fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: '#7BBFA0', marginBottom: 20,
      }}>
        {eyebrow}
      </p>

      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 300,
        fontSize: 'clamp(44px, 6vw, 80px)',
        lineHeight: 1.05,
        color: '#E8E4DC',
        marginBottom: 0,
        letterSpacing: '-0.01em',
      }}>
        {title}<br />
        <em style={{ fontStyle: 'italic', color: '#7BBFA0' }}>{subtitle}</em>
      </h1>

      <p style={{
        marginTop: 24,
        fontSize: 15,
        color: 'rgba(232,228,220,0.55)',
        maxWidth: 480,
        lineHeight: 1.8,
      }}>
        {description}
      </p>

      {children && <div style={{ marginTop: 36 }}>{children}</div>}
    </div>
  )
}
