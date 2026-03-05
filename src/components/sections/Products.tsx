'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import type { Product } from '@/types'

// ─── Products aligned to NAV_ITEMS structure ──────────────────────────────────
const PRODUCTS: (Omit<Product, 'price' | 'available'> & { price: number | string; available?: boolean; category: string; subcategory: string; href: string; tags: string[] })[] = [

  // ── BUSINESS › Back Office ────────────────────────────────────────────────
  {
    id: 'bo-sheets',
    name: 'Back Office — Google Sheets',
    type: 'Google Sheets',
    category: 'Business',
    subcategory: 'Back Office',
    href: '/000009/bo-sheets',
    description: 'Full back office tracking suite covering sales, KPIs, client management, commissions, payroll, and recruitment.',
    price: 49,
    featured: true,
    tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'],
  },
  {
    id: 'bo-notion',
    name: 'Back Office — Notion',
    type: 'Notion',
    category: 'Business',
    subcategory: 'Back Office',
    href: '/000009/bo-notion',
    description: 'A complete Notion workspace to manage your back office — sales pipelines, KPIs, client records, and more.',
    price: '49',
    featured: false,
    tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'],
  },

  // ── BUSINESS › Project Management ────────────────────────────────────────
  {
    id: 'pm-sheets',
    name: 'Project Management — Google Sheets',
    type: 'Google Sheets',
    category: 'Business',
    subcategory: 'Project Management',
    href: '/000010/pm-sheets',
    description: 'Track every project from kickoff to delivery with a goals dashboard, project folder, version control, and brand set.',
    price: '39',
    featured: false,
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Brand Set'],
  },
  {
    id: 'pm-notion',
    name: 'Project Management — Notion',
    type: 'Notion',
    category: 'Business',
    subcategory: 'Project Management',
    href: '/000010/pm-notion',
    description: 'Manage projects end-to-end in Notion — project folders, version control, brand assets, and linked dashboards.',
    price: '39',
    featured: false,
    tags: ['Project Folder', 'Version Control', 'Brand Set'],
  },

  // ── INDIVIDUALS › Life Tracker ────────────────────────────────────────────
  {
    id: 'lt-sheets',
    name: 'Life Tracker — Google Sheets',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Life Tracker',
    href: '/000012/lt-sheets',
    description: 'Track your whole life in one place — goals, projects, version control, and a personal dashboard built for clarity.',
    price: '34',
    featured: true,
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
  },
  {
    id: 'lt-notion',
    name: 'Life Tracker — Notion',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Life Tracker',
    href: '/000012/lt-notion',
    description: 'Your entire life organized in a Notion workspace — linked goals, projects, dashboards, and branch sets.',
    price: '34',
    featured: false,
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
  },

  // ── INDIVIDUALS › Personal Trackers ──────────────────────────────────────
  {
    id: 'pt-sheets',
    name: 'Personal Trackers — Google Sheets',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Personal Trackers',
    href: '/000013/pt-sheets',
    description: 'Habit and goal tracking across every area of life — faith, family, self care, nutrition, exercise, skills, and more.',
    price: '29',
    featured: true,
    tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],
  },
  {
    id: 'pt-notion',
    name: 'Personal Trackers — Notion',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Personal Trackers',
    href: '/000013/pt-notion',
    description: 'A Notion personal tracker covering every dimension of life — faith, family, wellness, education, and skills.',
    price: '29',
    featured: false,
    tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],
  },

  // ── INDIVIDUALS › Personal Projects ──────────────────────────────────────
  {
    id: 'pp-sheets',
    name: 'Personal Projects — Google Sheets',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Personal Projects',
    href: '/000014/pp-sheets',
    description: 'Manage your personal projects with a goals dashboard, project folders, version control, and branch sets in Sheets.',
    price: '29',
    featured: false,
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
  },
  {
    id: 'pp-notion',
    name: 'Personal Projects — Notion',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Personal Projects',
    href: '/000014/pp-notion',
    description: 'Run your personal projects in Notion — linked goal tracking, project folders, version control, and more.',
    price: '29',
    featured: false,
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
  },
]

// ─── Filter config ────────────────────────────────────────────────────────────
const TOP_FILTERS = ['All', 'Business', 'Individuals'] as const
type TopFilter = (typeof TOP_FILTERS)[number]

const SUBCATEGORY_MAP: Record<string, string[]> = {
  Business: ['Back Office', 'Project Management'],
  Individuals: ['Life Tracker', 'Personal Trackers', 'Personal Projects'],
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ProductIcon({ type }: { type: Product['type'] }) {
  const cls = 'w-5 h-5'
  const stroke = {
    stroke: 'var(--sage)',
    fill: 'none',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (type === 'Google Sheets')
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    )
  if (type === 'Notion')
    return (
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

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function TagPill({ label }: { label: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full"
      style={{
        background: 'rgba(123,191,160,0.08)',
        border: '1px solid rgba(123,191,160,0.18)',
        color: 'var(--sage)',
        letterSpacing: '0.03em',
      }}
    >
      {label}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Products() {
  const ref = useReveal()
  const [activeTop, setActiveTop] = useState<TopFilter>('All')
  const [activeSub, setActiveSub] = useState<string | null>(null)

  function handleTopFilter(cat: TopFilter) {
    setActiveTop(cat)
    setActiveSub(null)
  }

  const subcategories = activeTop !== 'All' ? SUBCATEGORY_MAP[activeTop] ?? [] : []

  const filtered = PRODUCTS.filter((p) => {
    if (activeTop !== 'All' && p.category !== activeTop) return false
    if (activeSub && p.subcategory !== activeSub) return false
    return true
  })

  return (
    <section
      id="products"
      className="px-16 py-28"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="reveal flex flex-col md:flex-row md:items-end justify-between mb-10"
      >
        <div>
          <p className="text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--sage)' }}>
            The Shop
          </p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(36px, 4vw, 54px)', color: 'var(--text)' }}
          >
            Everything you need
            <br />
            to get{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>organized.</em>
          </h2>
        </div>
        <a
          href="/shop"
          className="mt-6 md:mt-0 text-md tracking-wide flex items-center gap-2 no-underline after:content-['→'] transition-colors duration-200"
          style={{ color: 'var(--text-dim)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          View all products
        </a>
      </div>

      {/* Top filters: All / Business / Individuals */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {TOP_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => handleTopFilter(cat)}
            className="text-sm tracking-wide px-5 py-2 rounded-full transition-all duration-200"
            style={{
              border: activeTop === cat ? '1px solid var(--sage)' : '1px solid var(--border)',
              background: activeTop === cat ? 'rgba(123,191,160,0.1)' : 'transparent',
              color: activeTop === cat ? 'var(--sage)' : 'var(--text-dim)',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10" style={{ minHeight: 36 }}>
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(activeSub === sub ? null : sub)}
            className="text-xs tracking-widest uppercase px-4 py-1.5 rounded-full transition-all duration-200"
            style={{
              border: activeSub === sub ? '1px solid rgba(123,191,160,0.5)' : '1px solid var(--border)',
              background: activeSub === sub ? 'rgba(123,191,160,0.07)' : 'transparent',
              color: activeSub === sub ? 'var(--sage)' : 'var(--text-dim)',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {sub}
          </button>
        ))}
        <span className="text-xs ml-auto" style={{ color: 'var(--text-dim)', opacity: 0.45 }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, i) => (
          <a
            key={product.id}
            href={product.href}
            className="group rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 no-underline"
            style={{
              background: product.featured
                ? 'linear-gradient(145deg, #192a22 0%, var(--surface) 60%)'
                : 'var(--surface)',
              border: product.featured
                ? '1px solid rgba(123,191,160,0.25)'
                : '1px solid var(--border)',
              transitionDelay: `${i * 0.05}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(123,191,160,0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = product.featured
                ? 'rgba(123,191,160,0.25)'
                : 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Hover glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, var(--sage), transparent)' }}
            />

            {/* Featured badge */}
            {product.featured && (
              <span
                className="absolute top-4 right-4 text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(123,191,160,0.12)',
                  border: '1px solid rgba(123,191,160,0.25)',
                  color: 'var(--sage)',
                }}
              >
                Popular
              </span>
            )}

            {/* Icon + type + subcategory */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--sage-dim)' }}
              >
                <ProductIcon type={product.type} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
                  {product.type}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-dim)', opacity: 0.55 }}>
                  {product.category} › {product.subcategory}
                </p>
              </div>
            </div>

            {/* Name */}
            <h3
              className="font-serif font-light text-xl leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm leading-loose flex-1" style={{ color: 'var(--text-dim)' }}>
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.tags.slice(0, 4).map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
              {product.tags.length > 4 && (
                <span className="text-xs self-center" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
                  +{product.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Price + CTA */}
            <div
              className="flex items-center justify-between pt-4"
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
          </a>
        ))}
      </div>
    </section>
  )
}
