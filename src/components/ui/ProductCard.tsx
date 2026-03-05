'use client'

import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

function SheetsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#7BBFA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function NotionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#7BBFA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function CourseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#7BBFA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TypeIcon({ type }: { type: Product['type'] }) {
  if (type === 'Google Sheets') return <SheetsIcon />
  if (type === 'Notion') return <NotionIcon />
  return <CourseIcon />
}

export default function ProductCard({ product }: ProductCardProps) {
  const { available, launchMonth, featured, type, name, description, price, tags, href } = product

  return (
    <div style={{
      background: featured
        ? 'linear-gradient(145deg, #182820 0%, #131416 60%)'
        : '#131416',
      border: `1px solid ${featured ? 'rgba(123,191,160,0.2)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 20,
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
      opacity: available ? 1 : 0.75,
      transition: 'transform 0.25s ease, border-color 0.25s ease',
    }}
      onMouseEnter={e => {
        if (available) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.borderColor = 'rgba(123,191,160,0.35)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = featured ? 'rgba(123,191,160,0.2)' : 'rgba(255,255,255,0.07)'
      }}
    >
      {/* top glow on featured */}
      {featured && (
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, #7BBFA0, transparent)',
        }} />
      )}

      {/* Coming soon badge */}
      {!available && launchMonth && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          padding: '4px 10px', borderRadius: 100,
          background: 'rgba(123,191,160,0.08)',
          border: '1px solid rgba(123,191,160,0.15)',
          fontSize: 10, letterSpacing: '0.15em',
          color: '#7BBFA0', textTransform: 'uppercase',
        }}>
          {launchMonth}
        </div>
      )}

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'rgba(123,191,160,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <TypeIcon type={type} />
      </div>

      {/* Type label */}
      <p style={{
        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#7BBFA0', margin: 0,
      }}>
        {type}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 300, fontSize: 22,
        color: '#E8E4DC', margin: 0, lineHeight: 1.2,
      }}>
        {name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 13, color: 'rgba(232,228,220,0.55)',
        lineHeight: 1.8, margin: 0, flex: 1,
      }}>
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '3px 10px', borderRadius: 100,
              background: 'rgba(123,191,160,0.06)',
              border: '1px solid rgba(123,191,160,0.12)',
              color: 'rgba(123,191,160,0.8)', letterSpacing: '0.06em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 4,
      }}>
        {price ? (
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 26, color: '#E8E4DC',
          }}>
            ${price}
          </span>
        ) : (
          <span style={{ fontSize: 12, color: 'rgba(232,228,220,0.3)', letterSpacing: '0.1em' }}>
            FREE WITH PURCHASE
          </span>
        )}

        {available ? (
          <Link href={href} style={{
            padding: '9px 20px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#8fd4b4')}
            onMouseLeave={e => (e.currentTarget.style.background = '#7BBFA0')}
          >
            Get it →
          </Link>
        ) : (
          <span style={{
            padding: '9px 20px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12, color: 'rgba(232,228,220,0.3)',
            letterSpacing: '0.08em',
          }}>
            Coming Soon
          </span>
        )}
      </div>
    </div>
  )
}
