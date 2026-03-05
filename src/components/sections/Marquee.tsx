'use client'
import { MARQUEE_ITEMS } from '@/lib/data'

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div className="flex gap-0 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-8 text-xs tracking-widest uppercase"
            style={{ color: 'var(--text-faint)' }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--sage)', opacity: 0.6 }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
