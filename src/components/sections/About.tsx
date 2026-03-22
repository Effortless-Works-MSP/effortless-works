'use client'

import { useReveal } from '@/lib/useReveal'
import LumaOrbitScene from './LumaOrbitScene'

export default function About() {
  const ref = useReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal"
      style={{ borderTop: '1px solid var(--border)', padding: '80px 0 60px' }}
    >
      {/* Text header — centred above the scene */}
      <div style={{ textAlign: 'center', padding: '0 40px', marginBottom: 48 }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--sage)', margin: '0 0 20px',
        }}>
          The Vision
        </p>
        <h2
          className="font-serif font-light"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--text)', lineHeight: 1.08, margin: '0 0 22px' }}
        >
          Your business,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>already running.</em>
        </h2>
        <p style={{
          fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85,
          maxWidth: 540, margin: '0 auto',
        }}>
          Most people never start a business because building one from scratch is overwhelming.
          Effortless Works removes that barrier — every model is already designed, automated, and
          powered by Luma. You just pick the one that fits your life and launch.
        </p>
      </div>

      {/* Full-width orbit scene */}
      <div style={{ width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
        <LumaOrbitScene />
      </div>
    </section>
  )
}
