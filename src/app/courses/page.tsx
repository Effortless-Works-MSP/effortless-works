'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import {
  B_VIDEOS_SECTION,
  B_SELFPACED_SECTION,
  B_INSTRUCTOR_SECTION,
  P_VIDEOS_SECTION,
  P_SELFPACED_SECTION,
  P_INSTRUCTOR_SECTION,
} from '@/lib/pageData'
import type { ProductSection } from '@/types'

const COURSES_META = {
  eyebrow: 'All Courses',
  title: 'Learn every',
  subtitle: 'tool.',
  description:
    'Every course Effortless Works offers in one place. Product walkthroughs, self-paced deep dives, and live instructor-led sessions — for both Business and Individuals tools.',
}

interface CourseSection {
  section: ProductSection
  audience: 'Business' | 'Individuals'
  type: 'Videos' | 'Self Paced' | 'Instructor Led'
  id: string
}

const ALL_SECTIONS: CourseSection[] = [
  { section: B_VIDEOS_SECTION,     audience: 'Business',    type: 'Videos',         id: 'b-videos' },
  { section: B_SELFPACED_SECTION,  audience: 'Business',    type: 'Self Paced',     id: 'b-selfpaced' },
  { section: B_INSTRUCTOR_SECTION, audience: 'Business',    type: 'Instructor Led', id: 'b-instructor' },
  { section: P_VIDEOS_SECTION,     audience: 'Individuals', type: 'Videos',         id: 'p-videos' },
  { section: P_SELFPACED_SECTION,  audience: 'Individuals', type: 'Self Paced',     id: 'p-selfpaced' },
  { section: P_INSTRUCTOR_SECTION, audience: 'Individuals', type: 'Instructor Led', id: 'p-instructor' },
]

const AUDIENCE_FILTERS = ['All', 'Business', 'Individuals'] as const
const TYPE_FILTERS     = ['All Types', 'Videos', 'Self Paced', 'Instructor Led'] as const

type AudienceFilter = typeof AUDIENCE_FILTERS[number]
type TypeFilter     = typeof TYPE_FILTERS[number]

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 18px',
        borderRadius: 100,
        border: `1px solid ${active ? '#7BBFA0' : 'rgba(255,255,255,0.1)'}`,
        background: active ? 'rgba(123,191,160,0.12)' : 'transparent',
        color: active ? '#7BBFA0' : 'rgba(232,228,220,0.45)',
        fontSize: 12,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        whiteSpace: 'nowrap' as const,
        transition: 'all 0.15s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(123,191,160,0.35)'
          e.currentTarget.style.color = 'rgba(232,228,220,0.7)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
          e.currentTarget.style.color = 'rgba(232,228,220,0.45)'
        }
      }}
    >
      {label}
    </button>
  )
}

export default function CoursesPage() {
  const [audience, setAudience] = useState<AudienceFilter>('All')
  const [type, setType]         = useState<TypeFilter>('All Types')

  const filtered = ALL_SECTIONS.filter(s => {
    const matchAudience = audience === 'All'      || s.audience === audience
    const matchType     = type    === 'All Types' || s.type     === type
    return matchAudience && matchType
  })

  const bizSections = filtered.filter(s => s.audience === 'Business')
  const indSections = filtered.filter(s => s.audience === 'Individuals')

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E' }}>
        <PageWrapper>
          <PageHero {...COURSES_META} />

          {/* Filter pills */}
          <div style={{
            marginTop: 40,
            padding: '20px 24px',
            background: '#131416',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,220,0.25)',
              marginRight: 4,
              flexShrink: 0,
            }}>
              Filter
            </span>

            {AUDIENCE_FILTERS.map(f => (
              <Pill key={f} label={f} active={audience === f} onClick={() => setAudience(f)} />
            ))}

            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

            {TYPE_FILTERS.map(f => (
              <Pill key={f} label={f} active={type === f} onClick={() => setType(f)} />
            ))}

            {/* Result count pushed to the right */}
            <span style={{
              marginLeft: 'auto',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'rgba(232,228,220,0.2)',
            }}>
              {filtered.length} of {ALL_SECTIONS.length}
            </span>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '100px 0',
              color: 'rgba(232,228,220,0.25)',
              fontSize: 14,
              letterSpacing: '0.06em',
            }}>
              No courses match that combination.
            </div>
          )}

          {/* Business group */}
          {bizSections.length > 0 && (
            <>
              <div style={{ marginTop: 56 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 4 }}>
                  For Business
                </p>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300, fontSize: 'clamp(24px, 3vw, 36px)',
                  color: 'rgba(232,228,220,0.3)', margin: 0,
                  borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16,
                }}>
                  Business Tools
                </h2>
              </div>
              {bizSections.map((s, i) => (
                <ProductSectionBlock key={s.id} section={s.section} index={i} />
              ))}
            </>
          )}

          {/* Individuals group */}
          {indSections.length > 0 && (
            <>
              <div style={{ marginTop: 56 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 4 }}>
                  For Individuals
                </p>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300, fontSize: 'clamp(24px, 3vw, 36px)',
                  color: 'rgba(232,228,220,0.3)', margin: 0,
                  borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16,
                }}>
                  Personal Tools
                </h2>
              </div>
              {indSections.map((s, i) => (
                <ProductSectionBlock key={s.id} section={s.section} index={i} />
              ))}
            </>
          )}

          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
