'use client'

import { useReveal } from '@/lib/useReveal'
import { PRODUCTS } from '@/lib/data'
import type { Product } from '@/types'

function ProductIcon({ type }: { type: Product['type'] }) {
  const cls = "w-5 h-5"
  const stroke = { stroke: 'var(--sage)', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  if (type === 'Google Sheets') return (
    <svg viewBox="0 0 24 24" className={cls} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
  if (type === 'Notion') return (
    <svg viewBox="0 0 24 24" className={cls} {...stroke}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className={cls} {...stroke}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function Products() {
  const ref = useReveal()

  return (
    <section
      id="products"
      className="px-16 py-28"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16"
      >
        <div>
          <p className="text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--sage)' }}>
            The Shop
          </p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(36px, 4vw, 54px)', color: 'var(--text)' }}
          >
            Everything you need<br />to get{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>organized.</em>
          </h2>
        </div>
        <a
          href="#"
          className="mt-6 md:mt-0 text-md tracking-wide flex items-center gap-2 no-underline after:content-['→'] transition-colors duration-200"
          style={{ color: 'var(--text-dim)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          View all products
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRODUCTS.map((product, i) => (
          <div
            key={product.id}
            className="reveal group rounded-2xl p-10 flex flex-col gap-5 cursor-pointer relative overflow-hidden transition-all duration-300"
            style={{
              background: product.featured
                ? 'linear-gradient(145deg, #192a22 0%, var(--surface) 60%)'
                : 'var(--surface)',
              border: product.featured
                ? '1px solid rgba(123,191,160,0.25)'
                : '1px solid var(--border)',
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(123,191,160,0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = product.featured
                ? 'rgba(123,191,160,0.25)'
                : 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* top highlight on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, var(--sage), transparent)' }}
            />

            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--sage-dim)' }}
            >
              <ProductIcon type={product.type} />
            </div>

            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
              {product.type}
            </p>

            <h3
              className="font-serif font-light text-2xl leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {product.name}
            </h3>

            <p className="text-sm leading-loose flex-1" style={{ color: 'var(--text-dim)' }}>
              {product.description}
            </p>

            <div
              className="flex items-center justify-between pt-5"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <span className="font-serif text-2xl" style={{ color: 'var(--text)' }}>
                ${product.price}
              </span>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}
              >
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
