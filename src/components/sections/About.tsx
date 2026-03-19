'use client'

import { useReveal } from '@/lib/useReveal'
import { PILLARS } from '@/lib/data'

export default function About() {
  const ref = useReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal grid grid-cols-1 md:grid-cols-2 gap-24 px-16 py-28"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* Visual card */}
      <div className="relative h-96 md:h-auto min-h-96">
        {/* Main card with grid lines */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-end p-8 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, var(--surface2) 0%, var(--surface) 100%)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <p
            className="relative z-10 font-serif font-light italic text-2xl leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            "The goal isn't to do more. It's to finally feel like everything has a place."
          </p>
        </div>

        {/* Floating stat card */}
        <div
          className="absolute top-10 -right-6 w-48 rounded-2xl p-7 z-10"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div className="font-serif font-light text-5xl leading-none" style={{ color: 'var(--sage)' }}>
            12+
          </div>
          <div className="text-xs mt-1.5" style={{ color: 'var(--text-dim)' }}>
            Areas of life covered
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center">
        <p className="text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--sage)' }}>
          The Philosophy
        </p>
        <h2
          className="font-serif font-light leading-tight mb-7"
          style={{ fontSize: 'clamp(36px, 4vw, 54px)', color: 'var(--text)' }}
        >
          Built for the person<br />doing{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>all of it.</em>
        </h2>

        <p className="text-md leading-loose mb-5 max-w-md" style={{ color: 'var(--text-dim)' }}>
          You're not just running a business. You're also working on yourself — your health, your
          relationships, your family, maybe your faith. And you're doing it all at the same time.
        </p>
        <p className="text-md leading-loose mb-8 max-w-md" style={{ color: 'var(--text-dim)' }}>
          Effortless Works exists to give every part of your life a home. Not a system that
          overwhelms — a space that welcomes.
        </p>

        <div className="flex flex-wrap gap-3">
          {PILLARS.map((pillar) => (
            <span
              key={pillar}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wide"
              style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sage)' }} />
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
