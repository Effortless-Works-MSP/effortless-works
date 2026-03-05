'use client'

import { useReveal } from '@/lib/useReveal'

export default function Quote() {
  const ref = useReveal()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal text-center px-16 py-24 relative overflow-hidden"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* decorative large quote mark */}
      <span
        className="pointer-events-none select-none absolute font-serif"
        style={{
          top: -20, left: '50%', transform: 'translateX(-50%)',
          fontSize: 300, color: 'var(--sage)', opacity: 0.04, lineHeight: 1,
        }}
      >
        "
      </span>

      <p
        className="relative font-serif font-light italic mx-auto mb-8 leading-snug"
        style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          color: 'var(--text)',
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        "When everything has a home, you stop wasting energy finding it — and start using it."
      </p>
      <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-faint)' }}>
        — The Effortless Works Promise
      </p>
    </div>
  )
}
