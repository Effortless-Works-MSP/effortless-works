'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ParallaxStars from '@/components/ui/ParallaxStars'

// ─── Full catalog derived from NAV_ITEMS ──────────────────────────────────────
type ProductType = 'Google Sheets' | 'Notion' | 'Service' | 'Course' | 'Quest'

interface CatalogItem {
  id: string
  name: string
  description: string
  type: ProductType
  category: string
  subcategory: string
  href: string
  tags: string[]
  price?: string
  priceLabel?: string   // e.g. "Custom", "Free", "From $X"
  featured?: boolean
}

const CATALOG: CatalogItem[] = [

  // ══ BUSINESS › Back Office ════════════════════════════════════════════════
  {
    id: 'bo-sheets',
    name: 'Back Office',
    description: 'Full back office tracking suite covering sales, KPIs, client management, commissions, payroll, and recruitment — all in Google Sheets.',
    type: 'Google Sheets',
    category: 'Business',
    subcategory: 'Back Office',
    href: '/000009/bo-sheets',
    tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'],
    price: '49',
    featured: true,
  },
  {
    id: 'bo-notion',
    name: 'Back Office',
    description: 'A complete Notion workspace to run your back office — sales pipelines, KPIs, client records, commissions, payroll, and recruitment.',
    type: 'Notion',
    category: 'Business',
    subcategory: 'Back Office',
    href: '/000009/bo-notion',
    tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'],
    price: '49',
  },

  // ══ BUSINESS › Project Management ════════════════════════════════════════
  {
    id: 'pm-sheets',
    name: 'Project Management',
    description: 'Track every project from kickoff to delivery with a goals dashboard, project folder, version control, and brand set in Google Sheets.',
    type: 'Google Sheets',
    category: 'Business',
    subcategory: 'Project Management',
    href: '/000010/pm-sheets',
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Brand Set'],
    price: '39',
  },
  {
    id: 'pm-notion',
    name: 'Project Management',
    description: 'Manage projects end-to-end in Notion — folders, version control, brand assets, and linked dashboards all in one workspace.',
    type: 'Notion',
    category: 'Business',
    subcategory: 'Project Management',
    href: '/000010/pm-notion',
    tags: ['Project Folder', 'Version Control', 'Brand Set'],
    price: '39',
  },

  // ══ BUSINESS › How Tos ════════════════════════════════════════════════════
  {
    id: 'b-productvideos',
    name: 'Business Product Videos',
    description: 'Watch and learn — step-by-step video walkthroughs covering every business tool in the suite.',
    type: 'Course',
    category: 'Business',
    subcategory: 'How Tos',
    href: '/000011/b-productvideos',
    tags: ['Video', 'Walkthrough', 'Tools'],
    priceLabel: 'Free',
  },
  {
    id: 'b-selfpaced',
    name: 'Business — Self Paced Course',
    description: 'Learn on your schedule with a fully self-paced course covering the complete business toolkit.',
    type: 'Course',
    category: 'Business',
    subcategory: 'How Tos',
    href: '/000011/b-selfpaced',
    tags: ['Self Paced', 'Bundled Tools', 'Flexible'],
    priceLabel: 'From $29',
  },
  {
    id: 'b-instructorled',
    name: 'Business — Instructor Led',
    description: 'Live, guided sessions with an instructor to get you up and running with your business workspace fast.',
    type: 'Course',
    category: 'Business',
    subcategory: 'How Tos',
    href: '/000011/b-instructorled',
    tags: ['Live', 'Guided', 'Bundled Tools'],
    priceLabel: 'From $79',
    featured: true,
  },

  // ══ INDIVIDUALS › Life Tracker ════════════════════════════════════════════
  {
    id: 'lt-sheets',
    name: 'Life Tracker',
    description: 'Track your whole life in one place — goals, projects, version control, and a personal dashboard built for clarity in Google Sheets.',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Life Tracker',
    href: '/000012/lt-sheets',
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
    price: '34',
    featured: true,
  },
  {
    id: 'lt-notion',
    name: 'Life Tracker',
    description: 'Your entire life organized in Notion — linked goals, projects, dashboards, and branch sets all working together.',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Life Tracker',
    href: '/000012/lt-notion',
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
    price: '34',
  },

  // ══ INDIVIDUALS › Personal Trackers ══════════════════════════════════════
  {
    id: 'pt-sheets',
    name: 'Personal Trackers',
    description: 'Habit and goal tracking across every area of life — faith, family, self care, nutrition, exercise, skills, business, and education.',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Personal Trackers',
    href: '/000013/pt-sheets',
    tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],
    price: '29',
  },
  {
    id: 'pt-notion',
    name: 'Personal Trackers',
    description: 'A Notion personal tracker covering every dimension of life — faith, family, wellness, education, and skills.',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Personal Trackers',
    href: '/000013/pt-notion',
    tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],
    price: '29',
  },

  // ══ INDIVIDUALS › Personal Projects ══════════════════════════════════════
  {
    id: 'pp-sheets',
    name: 'Personal Projects',
    description: 'Manage your personal projects with a goals dashboard, project folders, version control, and branch sets — all in Sheets.',
    type: 'Google Sheets',
    category: 'Individuals',
    subcategory: 'Personal Projects',
    href: '/000014/pp-sheets',
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
    price: '29',
  },
  {
    id: 'pp-notion',
    name: 'Personal Projects',
    description: 'Run your personal projects in Notion — linked goal tracking, project folders, version control, and branch sets.',
    type: 'Notion',
    category: 'Individuals',
    subcategory: 'Personal Projects',
    href: '/000014/pp-notion',
    tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'],
    price: '29',
  },

  // ══ INDIVIDUALS › How Tos ═════════════════════════════════════════════════
  {
    id: 'p-productvideos',
    name: 'Personal Product Videos',
    description: 'Video walkthroughs for every personal tool — watch, follow along, and get set up in minutes.',
    type: 'Course',
    category: 'Individuals',
    subcategory: 'How Tos',
    href: '/000015/p-productvideos',
    tags: ['Video', 'Walkthrough', 'Tools'],
    priceLabel: 'Free',
  },
  {
    id: 'p-selfpaced',
    name: 'Personal — Self Paced Course',
    description: 'A flexible, self-paced course walking you through the full personal toolkit at your own speed.',
    type: 'Course',
    category: 'Individuals',
    subcategory: 'How Tos',
    href: '/000015/p-selfpaced',
    tags: ['Self Paced', 'Bundled Tools', 'Flexible'],
    priceLabel: 'From $29',
  },
  {
    id: 'p-instructorled',
    name: 'Personal — Instructor Led',
    description: 'Get personalized live guidance from an instructor to set up and master your personal workspace.',
    type: 'Course',
    category: 'Individuals',
    subcategory: 'How Tos',
    href: '/000015/p-instructorled',
    tags: ['Live', 'Guided', 'Bundled Tools'],
    priceLabel: 'From $79',
  },

  // ══ BUILD YOUR OWN ════════════════════════════════════════════════════════
  {
    id: 'byo-website',
    name: 'Website Builder',
    description: 'A fully custom website designed and built for your brand — from concept to launch.',
    type: 'Service',
    category: 'Build Your Own',
    subcategory: 'Build Your Own',
    href: '/build-your-own',
    tags: ['Design', 'Development', 'Launch'],
    priceLabel: 'Custom',
    featured: true,
  },
  {
    id: 'byo-app',
    name: 'App Builder',
    description: 'Custom mobile or web app built to your exact specification — from idea to shipped product.',
    type: 'Service',
    category: 'Build Your Own',
    subcategory: 'Build Your Own',
    href: '/build-your-own',
    tags: ['Mobile', 'Web App', 'Custom'],
    priceLabel: 'Custom',
  },
  {
    id: 'byo-onboarding',
    name: 'Onboarding Builder',
    description: 'Streamline client or new hire onboarding with a custom-built flow — courses, checklists, and portals.',
    type: 'Service',
    category: 'Build Your Own',
    subcategory: 'Build Your Own',
    href: '/build-your-own',
    tags: ['Client', 'New Hire', 'Courses'],
    priceLabel: 'Custom',
  },
  {
    id: 'byo-sheets',
    name: 'Custom Google Sheets',
    description: 'A bespoke tracking system built in Google Sheets around your unique data, workflows, and automation needs.',
    type: 'Service',
    category: 'Build Your Own',
    subcategory: 'Build Your Own',
    href: '/build-your-own',
    tags: ['Tracking', 'Automation', 'Templates'],
    priceLabel: 'Custom',
  },
  {
    id: 'byo-notion',
    name: 'Custom Notion Templates',
    description: 'A fully custom Notion workspace designed from scratch around your team, systems, and goals.',
    type: 'Service',
    category: 'Build Your Own',
    subcategory: 'Build Your Own',
    href: '/build-your-own',
    tags: ['Workspace', 'Templates', 'Systems'],
    priceLabel: 'Custom',
  },

  // ══ QUEST ═════════════════════════════════════════════════════════════════
  {
    id: 'quest-about',
    name: 'Effortless Quest',
    description: 'A gamified personal development community where your real-life progress earns rewards, XP, and leaderboard glory.',
    type: 'Quest',
    category: 'Quest',
    subcategory: 'Effortless Quest',
    href: '/000005/about',
    tags: ['Community', 'Gamified', 'Personal Dev'],
    priceLabel: 'Free to Join',
    featured: true,
  },
]

// ─── Filter structure ─────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Business', 'Individuals', 'Build Your Own', 'Quest'] as const
type Category = (typeof CATEGORIES)[number]

const TYPE_COLORS: Record<ProductType, { bg: string; border: string; color: string }> = {
  'Google Sheets': { bg: 'rgba(52,168,83,0.1)', border: 'rgba(52,168,83,0.25)', color: '#34a853' },
  'Notion':        { bg: 'rgba(232,228,220,0.07)', border: 'rgba(232,228,220,0.15)', color: 'rgba(232,228,220,0.7)' },
  'Service':       { bg: 'rgba(123,191,160,0.1)', border: 'rgba(123,191,160,0.25)', color: '#7BBFA0' },
  'Course':        { bg: 'rgba(180,140,255,0.1)', border: 'rgba(180,140,255,0.25)', color: '#b48cff' },
  'Quest':         { bg: 'rgba(255,190,80,0.1)', border: 'rgba(255,190,80,0.25)', color: '#ffbe50' },
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function TypeIcon({ type }: { type: ProductType }) {
  const s = { fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const color = TYPE_COLORS[type].color

  if (type === 'Google Sheets') return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} {...s}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
  if (type === 'Notion') return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} {...s}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
  if (type === 'Course') return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} {...s}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
  if (type === 'Quest') return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} {...s}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
  // Service
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} {...s}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CatalogCard({ item }: { item: CatalogItem }) {
  const tc = TYPE_COLORS[item.type]
  const displayPrice = item.price ? `$${item.price}` : item.priceLabel ?? ''

  return (
    <Link
      href={item.href}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="group h-full rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
        style={{
          background: item.featured
            ? 'linear-gradient(145deg, #192a22 0%, var(--surface) 65%)'
            : 'var(--surface)',
          border: item.featured
            ? '1px solid rgba(123,191,160,0.22)'
            : '1px solid var(--border)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-4px)'
          el.style.borderColor = 'rgba(123,191,160,0.3)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.borderColor = item.featured ? 'rgba(123,191,160,0.22)' : 'var(--border)'
        }}
      >
        {/* Glow line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, transparent, var(--sage), transparent)' }}
        />

        {/* Type badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}
          >
            <TypeIcon type={item.type} />
            {item.type}
          </span>
          {item.featured && (
            <span
              className="text-xs tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(123,191,160,0.1)', border: '1px solid rgba(123,191,160,0.22)', color: 'var(--sage)' }}
            >
              Popular
            </span>
          )}
        </div>

        {/* Breadcrumb */}
        <p className="text-xs" style={{ color: 'var(--text-dim)', opacity: 0.45, letterSpacing: '0.02em' }}>
          {item.category} › {item.subcategory}
        </p>

        {/* Name */}
        <h3
          className="font-serif font-light text-xl leading-snug"
          style={{ color: 'var(--text)' }}
        >
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(123,191,160,0.07)', border: '1px solid rgba(123,191,160,0.15)', color: 'var(--sage)' }}
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs self-center" style={{ color: 'var(--text-dim)', opacity: 0.4 }}>
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="font-serif text-xl" style={{ color: 'var(--text)' }}>
            {displayPrice}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
            style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionHeading({ category, count }: { category: string; count: number }) {
  return (
    <div
      className="flex items-center gap-4 mb-6"
      style={{ borderBottom: "1px solid var(--border)", paddingBottom: 20 }}
    >
      <h2 className="font-serif font-light text-2xl" style={{ color: 'var(--text)' }}>
        {category}
      </h2>
      <span
        className="text-xs px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(123,191,160,0.08)', border: '1px solid rgba(123,191,160,0.15)', color: 'var(--sage)' }}
      >
        {count}
      </span>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [activeType, setActiveType] = useState<ProductType | 'All'>('All')
  const [search, setSearch] = useState('')

  const filtered = CATALOG.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false
    if (activeType !== 'All' && item.type !== activeType) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.subcategory.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Group by category for "All" view
  const grouped: Record<string, CatalogItem[]> = {}
  if (activeCategory === 'All' && !search) {
    for (const cat of CATEGORIES.slice(1)) {
      const items = filtered.filter(i => i.category === cat)
      if (items.length) grouped[cat] = items
    }
  }
  const isGrouped = activeCategory === 'All' && !search

  const ALL_TYPES: (ProductType | 'All')[] = ['All', 'Google Sheets', 'Notion', 'Service', 'Course', 'Quest']

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #0C0D0E)', color: 'var(--text, #E8E4DC)' }}>
        <ParallaxStars count={100} />

      {/* ── Hero ── */}
      <section
        className="px-8 md:px-16 pt-20 pb-16"
        style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))' }}
      >
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(232,228,220,0.5)', textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E8E4DC')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.5)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back to Home
        </Link>
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--sage, #7BBFA0)' }}>
          The Full Catalog
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--text)' }}
          >
            Every product &<br />
            service,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--sage, #7BBFA0)' }}>in one place.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-dim, rgba(232,228,220,0.5))' }}>
            Templates, trackers, courses, custom services, and the Effortless Quest — everything we offer, all here.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mt-10">
          {[
            { label: 'Templates', value: String(CATALOG.filter(i => i.type === 'Google Sheets' || i.type === 'Notion').length) },
            { label: 'Courses', value: String(CATALOG.filter(i => i.type === 'Course').length) },
            { label: 'Services', value: String(CATALOG.filter(i => i.type === 'Service').length) },
            { label: 'Total Products', value: String(CATALOG.length) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-serif text-3xl font-light" style={{ color: 'var(--text)' }}>{value}</p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filters ── */}
      <section
        className="px-8 md:px-16 py-6 flex flex-col gap-4 sticky top-[68px] z-40"
        style={{
          background: 'rgba(12,13,14,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
        }}
      >
        {/* Search */}
        <div className="relative max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products, tags…"
            style={{
              width: '100%',
              background: 'var(--surface, rgba(255,255,255,0.03))',
              border: '1px solid var(--border, rgba(255,255,255,0.07))',
              borderRadius: 100,
              padding: '8px 14px 8px 32px',
              fontSize: 13,
              color: 'var(--text)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(123,191,160,0.4)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border, rgba(255,255,255,0.07))')}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mr-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveType('All') }}
                style={{
                  border: activeCategory === cat ? '1px solid var(--sage)' : '1px solid var(--border)',
                  background: activeCategory === cat ? 'rgba(123,191,160,0.1)' : 'transparent',
                  color: activeCategory === cat ? 'var(--sage)' : 'var(--text-dim)',
                  borderRadius: 100,
                  padding: '6px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} />

          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {ALL_TYPES.map(t => {
              const tc = t !== 'All' ? TYPE_COLORS[t] : null
              const isActive = activeType === t
              return (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  style={{
                    border: isActive && tc ? `1px solid ${tc.border}` : isActive ? '1px solid var(--sage)' : '1px solid var(--border)',
                    background: isActive && tc ? tc.bg : isActive ? 'rgba(123,191,160,0.1)' : 'transparent',
                    color: isActive && tc ? tc.color : isActive ? 'var(--sage)' : 'var(--text-dim)',
                    borderRadius: 100,
                    padding: '6px 14px',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>

          <span className="ml-auto text-xs" style={{ color: 'var(--text-dim)', opacity: 0.4 }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── Catalog grid ── */}
      <section className="px-8 md:px-16 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'var(--text-dim)', opacity: 0.4 }}>
            <p className="font-serif text-2xl mb-2">No results found</p>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </div>
        ) : isGrouped ? (
          Object.entries(grouped).map(([cat, items], idx) => (
            <div key={cat} style={{ marginTop: idx === 0 ? 0 : 80 }}>
              <SectionHeading category={cat} count={items.length} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map(item => <CatalogCard key={item.id} item={item} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => <CatalogCard key={item.id} item={item} />)}
          </div>
        )}
      </section>

      {/* ── CTA banner ── */}
      <section
        className="mx-8 md:mx-16 mb-16 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{
          background: 'linear-gradient(135deg, #192a22 0%, rgba(18,20,22,0.8) 100%)',
          border: '1px solid rgba(123,191,160,0.2)',
        }}
      >
        <div>
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>
            Not sure where to start?
          </p>
          <h3 className="font-serif font-light text-3xl" style={{ color: 'var(--text)' }}>
            We'll build it <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>for you.</em>
          </h3>
          <p className="text-sm mt-3 max-w-md" style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
            From custom Sheets to full apps and websites — our Build Your Own service handles everything from design to delivery.
          </p>
        </div>
        <Link
          href="/build-your-own"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: 100,
            background: 'var(--sage)',
            color: '#0C0D0E',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Get Started
        </Link>
      </section>

    </main>
  )
}
