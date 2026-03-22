'use client'

import { useReveal } from '@/lib/useReveal'
import { LIFE_AREAS } from '@/lib/data'

export default function Areas() {
  const introRef = useReveal()

  return (
    <section className="px-16 py-28" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        ref={introRef as React.RefObject<HTMLDivElement>}
        className="reveal max-w-xl mb-20"
      >
        <p className="text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--sage)' }}>
          Business Catalog
        </p>
        <h2
          className="font-serif font-light leading-tight mb-5"
          style={{ fontSize: 'clamp(36px, 4vw, 54px)', color: 'var(--text)' }}
        >
          Every model, fully{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>built for you.</em>
        </h2>
        <p className="text-md leading-loose" style={{ color: 'var(--text-dim)' }}>
          Don't start from scratch. Every business model is designed, tested, and automated — ready for you to plug in and launch.
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{
          border: '1px solid var(--border)',
          borderRadius: 20,
          overflow: 'hidden',
          gap: 1,
          background: 'var(--border)',
        }}
      >
        {LIFE_AREAS.map((area, i) => (
          <div
            key={area.number}
            className={`flex flex-col gap-4 p-8 transition-colors duration-300`}
            style={{ background: 'var(--surface)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
          >
            <div
              className="font-serif font-light text-5xl leading-none"
              style={{ color: 'var(--text-faint)' }}
            >
              {area.number}
            </div>
            <div className="font-serif font-light text-2xl" style={{ color: 'var(--text)' }}>
              {area.name}
            </div>
            <div className="text-xs leading-loose" style={{ color: 'var(--text-dim)' }}>
              {area.description}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {area.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full tracking-wide"
                  style={{
                    background: 'var(--sage-glow)',
                    border: '1px solid rgba(123,191,160,0.15)',
                    color: 'var(--sage)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
