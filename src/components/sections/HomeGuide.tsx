'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Result {
  id: string
  symbol: string
  name: string
  description: string
  includes: string[]
  href: string
  price: number | null
  tag: string
  comingSoon?: boolean
}

interface Choice {
  symbol: string
  label: string
  description: string
  next?: string
  results?: string[]
}

interface Step {
  id: string
  eyebrow: string
  question: string
  choices: Choice[]
}

// ─── Products ─────────────────────────────────────────────────────────────────

const RESULTS: Record<string, Result> = {
  'bo-sheets':  { id: 'bo-sheets',  symbol: '▦', name: 'Back Office',        description: 'Six trackers that keep every corner of your business clean — from first sale to final paycheck.',        includes: ['Sales Tracking', 'KPI Dashboard', 'Client CRM', 'Commission Calculator', 'Payroll Tracker', 'Recruitment Pipeline'], href: '/000009/bo-sheets',  price: 49,   tag: 'Google Sheets' },
  'bo-notion':  { id: 'bo-notion',  symbol: '❖', name: 'Back Office',        description: 'All six back office systems rebuilt as a single connected Notion workspace — everything linked.',          includes: ['Sales Tracking', 'KPI Dashboard', 'Client CRM', 'Commission Calculator', 'Payroll Tracker', 'Recruitment Pipeline'], href: '/000009/bo-notion',  price: 49,   tag: 'Notion'        },
  'pm-sheets':  { id: 'pm-sheets',  symbol: '▦', name: 'Project Management', description: 'From goal-setting to delivery — a five-template system that keeps every project on track.',              includes: ['Goals Dashboard', 'Project Dashboard', 'Project Folder Template', 'Version Control', 'Individual Brand Set'],          href: '/000010/pm-sheets',  price: 39,   tag: 'Google Sheets' },
  'pm-notion':  { id: 'pm-notion',  symbol: '❖', name: 'Project Management', description: 'Project folders, version control, and brand sets all linked inside one clean Notion workspace.',          includes: ['Project Folder Template', 'Version Control', 'Individual Brand Set'],                                                  href: '/000010/pm-notion',  price: 39,   tag: 'Notion'        },
  'lt-sheets':  { id: 'lt-sheets',  symbol: '▦', name: 'Life Tracker',       description: 'Your entire life — goals, projects, habits, and growth — organized into one Google Sheets system.',       includes: ['Goals Dashboard', 'Project Dashboard', 'Project Folder Set', 'Version Control', 'Individual Branch Set'],             href: '/000012/lt-sheets',  price: 34,   tag: 'Google Sheets' },
  'lt-notion':  { id: 'lt-notion',  symbol: '❖', name: 'Life Tracker',       description: 'The full Life Tracker rebuilt as one connected Notion workspace. Every area of your life, linked.',       includes: ['Goals Dashboard', 'Project Dashboard', 'Project Folder Set', 'Version Control', 'Individual Branch Set'],             href: '/000012/lt-notion',  price: 34,   tag: 'Notion'        },
  'pt-sheets':  { id: 'pt-sheets',  symbol: '▦', name: 'Personal Trackers',  description: 'Eight milestone trackers — one for every area of life — that slot together into a single dashboard.',    includes: ['Faith Milestones', 'Family Milestones', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],     href: '/000013/pt-sheets',  price: 29,   tag: 'Google Sheets' },
  'pt-notion':  { id: 'pt-notion',  symbol: '❖', name: 'Personal Trackers',  description: 'All eight life trackers connected inside one Notion workspace. Every milestone, in one place.',           includes: ['Faith Milestones', 'Family Milestones', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'],     href: '/000013/pt-notion',  price: 29,   tag: 'Notion'        },
  'pp-sheets':  { id: 'pp-sheets',  symbol: '▦', name: 'Personal Projects',  description: 'The same structure the pros use — goals dashboard, folders, version control — built for your personal work.', includes: ['Goals Dashboard', 'Project Dashboard', 'Project Folder Set', 'Version Control', 'Individual Branch Set'],          href: '/000014/pp-sheets',  price: 29,   tag: 'Google Sheets' },
  'pp-notion':  { id: 'pp-notion',  symbol: '❖', name: 'Personal Projects',  description: 'All five personal project templates pre-linked inside one Notion workspace, ready from day one.',          includes: ['Goals Dashboard', 'Project Dashboard', 'Project Folder Set', 'Version Control', 'Individual Branch Set'],             href: '/000014/pp-notion',  price: 29,   tag: 'Notion'        },
  'byo-website': { id: 'byo-website', symbol: '⬡', name: 'Website Builder',        description: 'A fully designed, production-ready website built to your brand — from concept to launch.',          includes: ['Custom Design', 'Next.js Development', 'Mobile Responsive', 'SEO Ready', 'Launch Support'],                           href: '/build-your-own', price: null, tag: 'Custom' },
  'byo-app':     { id: 'byo-app',     symbol: '◈', name: 'App Builder',            description: 'Custom web apps and dashboards built to your exact workflow — from idea to shipped product.',             includes: ['Web App', 'Custom Dashboard', 'Tailored to your workflow', 'Delivered on Fiverr'],                                    href: '/build-your-own', price: null, tag: 'Custom' },
  'byo-sheets':  { id: 'byo-sheets',  symbol: '▦', name: 'Custom Google Sheets',   description: 'A bespoke tracking system built in Google Sheets around your unique data, workflow, and team.',          includes: ['Custom Structure', 'Automation', 'Tailored to your process', 'Delivered on Fiverr'],                                   href: '/build-your-own', price: null, tag: 'Custom' },
  'byo-notion':  { id: 'byo-notion',  symbol: '❖', name: 'Custom Notion Workspace',description: 'A complete Notion setup designed from scratch around your team, systems, and goals.',                   includes: ['Custom Workspace', 'Linked Databases', 'Tailored to your systems', 'Delivered on Fiverr'],                             href: '/build-your-own', price: null, tag: 'Custom' },

  // ── Coming soon ───────────────────────────────────────────────────────────
  'career-tracker':      { id: 'career-tracker',      symbol: '✦', name: 'Career Compass',     description: 'Map your career path, track goals, and document every win — from where you are to where you want to be.',          includes: ['Career Goal Tracker', 'Skills Map', 'Milestone Log', 'Wins & Feedback Journal', 'Quarterly Review'],                  href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'finance-tracker':     { id: 'finance-tracker',     symbol: '◉', name: 'Finance Tracker',    description: 'Total clarity over your money — income, expenses, savings goals, and net worth all in one place.',                 includes: ['Income Dashboard', 'Expense Tracker', 'Savings Goals', 'Net Worth Calculator', 'Monthly Review'],                     href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'mindfulness-tracker': { id: 'mindfulness-tracker', symbol: '◌', name: 'Mind Space',         description: 'A dedicated home for your inner life — daily reflection, gratitude, mood tracking, and mindfulness practice.',     includes: ['Daily Journal', 'Mood & Energy Log', 'Gratitude Practice', 'Reflection Prompts', 'Weekly Review'],                    href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'relationship-keeper': { id: 'relationship-keeper', symbol: '◎', name: 'Connection Keeper',  description: 'Stay close to the people who matter — track relationships, remember important details, and show up intentionally.', includes: ['People Directory', 'Connection Log', 'Milestone Tracker', 'Reach-Out Reminders', 'Memory Notes'],                    href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'travel-planner':      { id: 'travel-planner',      symbol: '⊹', name: 'Journey Planner',    description: 'Plan every trip, capture every memory, and build a living record of the experiences that shape your life.',        includes: ['Trip Planner', 'Bucket List', 'Travel Log', 'Experience Journal', 'Budget Tracker'],                                  href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'creativity-log':      { id: 'creativity-log',      symbol: '◈', name: 'Creative Studio',    description: 'A dedicated workspace for your creative practice — ideas, projects, drafts, and a habit of showing up.',           includes: ['Idea Capture', 'Project Log', 'Practice Tracker', 'Inspiration Board', 'Works in Progress'],                         href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'legacy-journal':      { id: 'legacy-journal',      symbol: '○', name: 'Legacy Journal',     description: 'Document the life you are living — milestones, turning points, values, and the story you want to leave behind.',   includes: ['Life Milestones', 'Values & Intentions', 'Letters to the Future', 'Annual Review', 'Legacy Map'],                      href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
  'community-board':     { id: 'community-board',     symbol: '❖', name: 'Community Board',    description: 'Track your contributions, mentorship relationships, and the impact you are making in the communities you serve.',   includes: ['Contribution Log', 'Mentorship Tracker', 'Teaching Notes', 'Impact Journal', 'Community Connections'],                href: '#', price: null, tag: 'Coming Soon', comingSoon: true },
}

// ─── Decision tree ────────────────────────────────────────────────────────────

const STEPS: Record<string, Step> = {

  // ── Level 1 — Life areas ──────────────────────────────────────────────────
  start: {
    id: 'start', eyebrow: 'Let\'s find your fit',
    question: 'Which area of life do you want to build?',
    choices: [
      { symbol: '◈', label: 'Work & Business',       description: 'Career, business, and professional growth',     next: 'area-work'    },
      { symbol: '◎', label: 'Mind & Growth',         description: 'Habits, goals, skills, and inner development',  next: 'area-mind'    },
      { symbol: '⬡', label: 'Body & Health',         description: 'Fitness, nutrition, and self care',             next: 'area-health'  },
      { symbol: '○', label: 'Spirit & Faith',        description: 'Faith, mindfulness, and spiritual practice',    next: 'area-spirit'  },
      { symbol: '❖', label: 'People & Relationships',description: 'Family, friends, and community',               next: 'area-people'  },
      { symbol: '✦', label: 'Life & Adventures',     description: 'Travel, hobbies, experiences, and creativity',  next: 'area-life'    },
      { symbol: '▦', label: 'Projects & Legacy',     description: 'Personal projects, milestones, and impact',    next: 'area-legacy'  },
    ],
  },

  // ── Work & Business ───────────────────────────────────────────────────────
  'area-work': {
    id: 'area-work', eyebrow: 'Work & Business',
    question: 'What does your work life need most?',
    choices: [
      { symbol: '✦', label: 'Career planning',          description: 'Goals, growth, and my professional path',   results: ['career-tracker']  },
      { symbol: '◈', label: 'Running a business',       description: 'Operations, sales, clients, and payroll',   next: 'build-business'       },
      { symbol: '▦', label: 'Managing projects',        description: 'Timelines, goals, and version control',     next: 'tool-pm'              },
      { symbol: '◉', label: 'Tracking finances',        description: 'Income, expenses, and financial clarity',   results: ['finance-tracker'] },
      { symbol: '⬡', label: 'Building something custom',description: 'A website, app, or custom tool',            next: 'build-custom'         },
    ],
  },

  // ── Business sub-branch ───────────────────────────────────────────────────
  'build-business': {
    id: 'build-business', eyebrow: 'Running a business',
    question: 'Where does your business need the most support?',
    choices: [
      { symbol: '▦', label: 'Running operations',    description: 'Sales, clients, KPIs, payroll',       next: 'tool-bo'      },
      { symbol: '◈', label: 'Managing projects',     description: 'Goals, timelines, version control',   next: 'tool-pm'      },
      { symbol: '◎', label: 'I\'m just starting out',description: 'I need a full system from scratch',   next: 'tool-biz-all' },
    ],
  },

  // ── Mind & Growth ─────────────────────────────────────────────────────────
  'area-mind': {
    id: 'area-mind', eyebrow: 'Mind & Growth',
    question: 'What are you working on within yourself?',
    choices: [
      { symbol: '◎', label: 'Daily habits & milestones',  description: 'Track the eight areas of my life',          next: 'tool-pt'                      },
      { symbol: '◈', label: 'Goals & personal projects',   description: 'Ideas and personal work I am pursuing',     next: 'tool-pp'                      },
      { symbol: '◌', label: 'Mindfulness & inner growth',  description: 'Reflection, meditation, and presence',     results: ['mindfulness-tracker']      },
      { symbol: '❖', label: 'All of it — full life system',description: 'Goals, projects, and every milestone',     next: 'tool-lt'                      },
    ],
  },

  // ── Body & Health ─────────────────────────────────────────────────────────
  'area-health': {
    id: 'area-health', eyebrow: 'Body & Health',
    question: 'What are you tracking for your health?',
    choices: [
      { symbol: '◎', label: 'Fitness, nutrition & self care', description: 'Routines, meals, and wellness goals',      next: 'tool-pt' },
      { symbol: '❖', label: 'All areas of life together',     description: 'Health as part of a complete life system', next: 'tool-lt' },
    ],
  },

  // ── Spirit & Faith ────────────────────────────────────────────────────────
  'area-spirit': {
    id: 'area-spirit', eyebrow: 'Spirit & Faith',
    question: 'How do you want to nurture your spiritual life?',
    choices: [
      { symbol: '○', label: 'Faith milestones & practice', description: 'Log intentions, prayers, and spiritual goals', next: 'tool-pt'                  },
      { symbol: '◌', label: 'Mindfulness & reflection',    description: 'Daily presence, journaling, and inner work',  results: ['mindfulness-tracker']  },
      { symbol: '❖', label: 'All of life, connected',      description: 'Spirit as part of your complete life system', next: 'tool-lt'                  },
    ],
  },

  // ── People & Relationships ────────────────────────────────────────────────
  'area-people': {
    id: 'area-people', eyebrow: 'People & Relationships',
    question: 'What matters most in your relationships?',
    choices: [
      { symbol: '◎', label: 'Nurturing connections',      description: 'Stay close to the people who matter most',    results: ['relationship-keeper'] },
      { symbol: '❖', label: 'Family milestones & moments',description: 'Goals, memories, and intentions for family',  next: 'tool-pt'                  },
      { symbol: '○', label: 'All of life, including people',description: 'Community as part of your full system',     next: 'tool-lt'                  },
    ],
  },

  // ── Life & Adventures ─────────────────────────────────────────────────────
  'area-life': {
    id: 'area-life', eyebrow: 'Life & Adventures',
    question: 'What experiences are you building toward?',
    choices: [
      { symbol: '⊹', label: 'Travel & adventures',  description: 'Plan trips and capture every experience',    results: ['travel-planner'] },
      { symbol: '◈', label: 'Hobbies & creativity', description: 'A dedicated space for creative practice',    results: ['creativity-log'] },
      { symbol: '❖', label: 'Track everything',     description: 'A full life system for every area',          next: 'tool-lt'             },
    ],
  },

  // ── Projects & Legacy ─────────────────────────────────────────────────────
  'area-legacy': {
    id: 'area-legacy', eyebrow: 'Projects & Legacy',
    question: 'What legacy are you building?',
    choices: [
      { symbol: '▦', label: 'Personal projects',        description: 'Ideas, goals, and work I\'m actively pursuing', next: 'tool-pp'              },
      { symbol: '○', label: 'Community & mentorship',   description: 'Teaching, contributing, and giving back',       results: ['community-board'] },
      { symbol: '◈', label: 'Life milestones & legacy', description: 'Document the story and impact you\'re building',results: ['legacy-journal']  },
      { symbol: '❖', label: 'Everything — full life OS',description: 'Goals, projects, milestones, all connected',    next: 'tool-lt'              },
    ],
  },

  // ── Custom build ──────────────────────────────────────────────────────────
  'build-custom': {
    id: 'build-custom', eyebrow: 'Building something custom',
    question: 'What do you need built?',
    choices: [
      { symbol: '⬡', label: 'A website',           description: 'Designed and built for your brand',   results: ['byo-website'] },
      { symbol: '◈', label: 'An app',              description: 'Web app or custom dashboard',          results: ['byo-app']     },
      { symbol: '▦', label: 'A custom spreadsheet',description: 'Google Sheets tailored to you',        results: ['byo-sheets']  },
      { symbol: '❖', label: 'A Notion workspace',  description: 'Custom Notion built for your systems', results: ['byo-notion']  },
    ],
  },

  // ── Shared tool-select steps ──────────────────────────────────────────────
  'tool-bo': {
    id: 'tool-bo', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['bo-sheets']            },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['bo-notion']            },
      { symbol: '○', label: 'Open to either',description: 'Show me both',                         results: ['bo-sheets','bo-notion'] },
    ],
  },
  'tool-pm': {
    id: 'tool-pm', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['pm-sheets']            },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['pm-notion']            },
      { symbol: '○', label: 'Open to either',description: 'Show me both',                         results: ['pm-sheets','pm-notion'] },
    ],
  },
  'tool-biz-all': {
    id: 'tool-biz-all', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['bo-sheets','pm-sheets']                       },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['bo-notion','pm-notion']                       },
      { symbol: '○', label: 'Open to either',description: 'Show me everything',                   results: ['bo-sheets','pm-sheets','bo-notion','pm-notion'] },
    ],
  },
  'tool-pt': {
    id: 'tool-pt', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['pt-sheets']            },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['pt-notion']            },
      { symbol: '○', label: 'Open to either',description: 'Show me both',                         results: ['pt-sheets','pt-notion'] },
    ],
  },
  'tool-pp': {
    id: 'tool-pp', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['pp-sheets']            },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['pp-notion']            },
      { symbol: '○', label: 'Open to either',description: 'Show me both',                         results: ['pp-sheets','pp-notion'] },
    ],
  },
  'tool-lt': {
    id: 'tool-lt', eyebrow: 'Almost there',
    question: 'Where do you do your best work?',
    choices: [
      { symbol: '▦', label: 'Google Sheets', description: 'Spreadsheets — familiar and powerful', results: ['lt-sheets']            },
      { symbol: '❖', label: 'Notion',        description: 'Visual, connected, flexible',          results: ['lt-notion']            },
      { symbol: '○', label: 'Open to either',description: 'Show me both',                         results: ['lt-sheets','lt-notion'] },
    ],
  },
}

// ─── 3D Carousel ─────────────────────────────────────────────────────────────

const CARD_W = 164
const CARD_H = 196
const RADIUS_X = 240   // horizontal spread on the disc
const RADIUS_Z = 90    // depth of the disc
const Y_TILT   = 18    // front items sit slightly higher than back items

interface CarouselProps {
  choices: Choice[]
  onSelect: (c: Choice) => void
}

// ─── Mobile carousel (flat, one card at a time) ───────────────────────────────

function MobileCarousel({ choices, onSelect }: CarouselProps) {
  const N = choices.length
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(0) // -1 left, 1 right, for animation
  const [animKey, setAnimKey] = useState(0)
  const touchStartX = useRef<number | null>(null)

  function go(next: number) {
    const d = next > idx ? 1 : -1
    setDir(d)
    setIdx(next)
    setAnimKey(k => k + 1)
  }
  function prev() { go((idx - 1 + N) % N) }
  function next() { go((idx + 1) % N) }

  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) { if (dx > 0) prev(); else next() }
    touchStartX.current = null
  }

  const choice = choices[idx]
  const arrowStyle: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 44, height: 44, borderRadius: '50%',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
    color: 'rgba(232,228,220,0.45)', fontSize: 18, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit', zIndex: 10,
  }

  return (
    <div style={{ userSelect: 'none' }}>
      <style>{`
        @keyframes mob-slide-in-r { from { opacity: 0; transform: translateX(40px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes mob-slide-in-l { from { opacity: 0; transform: translateX(-40px) } to { opacity: 1; transform: translateX(0) } }
      `}</style>

      {/* Card area */}
      <div
        style={{ position: 'relative', padding: '0 56px', height: 220 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={prev} style={{ ...arrowStyle, left: 0 }}>←</button>
        <button onClick={next} style={{ ...arrowStyle, right: 0 }}>→</button>

        <div
          key={animKey}
          style={{
            animation: `${dir >= 0 ? 'mob-slide-in-r' : 'mob-slide-in-l'} 0.22s ease`,
            textAlign: 'center', padding: '28px 16px 20px',
            background: 'linear-gradient(155deg, rgba(123,191,160,0.12) 0%, rgba(123,191,160,0.03) 100%)',
            border: '1px solid rgba(123,191,160,0.3)',
            borderRadius: 24,
            height: 220, boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 56, color: '#7BBFA0', lineHeight: 1, marginBottom: 16 }}>{choice.symbol}</div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 26, color: '#E8E4DC', margin: '0 0 12px', lineHeight: 1.15,
          }}>{choice.label}</p>
          <p style={{ fontSize: 13, color: 'rgba(232,228,220,0.45)', margin: 0, lineHeight: 1.75 }}>
            {choice.description}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
        {choices.map((_, i) => (
          <button
            key={i} onClick={() => go(i)}
            style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 3, padding: 0, border: 'none',
              background: i === idx ? '#7BBFA0' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          />
        ))}
      </div>

      {/* Confirm */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          onClick={() => onSelect(choice)}
          style={{
            padding: '13px 48px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            border: 'none', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Choose this →
        </button>
      </div>
    </div>
  )
}

// ─── Desktop 3D carousel ──────────────────────────────────────────────────────

function DesktopCarousel({ choices, onSelect }: CarouselProps) {
  const N = choices.length
  const step = 360 / N

  // We use a continuous rotation value animated via rAF for smoothness
  const rotRef = useRef(0)          // current visual rotation (degrees)
  const targetRef = useRef(0)       // target rotation
  const frameRef = useRef<number>()
  const animatingRef = useRef(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const symRefs  = useRef<(HTMLElement | null)[]>([])
  const lblRefs  = useRef<(HTMLElement | null)[]>([])
  const glowRefs = useRef<(HTMLElement | null)[]>([])
  const descRef = useRef<HTMLParagraphElement | null>(null)
  const activeIdxRef = useRef(0)
  const touchStartX = useRef<number | null>(null)

  // Apply positions directly to DOM for smooth animation without React re-renders
  function applyPositions(rot: number) {
    const activeIdx = Math.round(-rot / step + N * 1000) % N
    if (activeIdxRef.current !== activeIdx) {
      activeIdxRef.current = activeIdx
      if (descRef.current) {
        descRef.current.style.opacity = '0'
        setTimeout(() => {
          if (descRef.current) {
            descRef.current.textContent = choices[activeIdx]?.description ?? ''
            descRef.current.style.opacity = '1'
          }
        }, 120)
      }
    }

    for (let i = 0; i < N; i++) {
      const el = itemRefs.current[i]
      if (!el) continue

      const angleDeg = (i * step) + rot
      const rad = (angleDeg * Math.PI) / 180
      const x = Math.sin(rad) * RADIUS_X
      const depth = Math.cos(rad)
      const y = -depth * Y_TILT
      const t = (depth + 1) / 2
      const scale = 0.48 + t * 0.58
      const opacity = depth < -0.65 ? 0 : 0.22 + t * 0.78
      const zIndex = Math.round(t * 100)
      const isActive = i === activeIdx

      el.style.transform = `translate(${x - CARD_W / 2}px, ${y - CARD_H / 2}px) scale(${scale})`
      el.style.opacity = String(opacity)
      el.style.zIndex = String(zIndex)
      el.style.background = isActive
        ? 'linear-gradient(155deg, rgba(123,191,160,0.14) 0%, rgba(123,191,160,0.04) 100%)'
        : 'linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
      el.style.borderColor = isActive ? 'rgba(123,191,160,0.38)' : 'rgba(255,255,255,0.06)'
      el.style.boxShadow = isActive ? '0 24px 64px rgba(0,0,0,0.45)' : 'none'

      const sym = symRefs.current[i]
      if (sym) sym.style.color = isActive ? '#7BBFA0' : 'rgba(232,228,220,0.22)'

      const lbl = lblRefs.current[i]
      if (lbl) lbl.style.color = isActive ? '#E8E4DC' : 'rgba(232,228,220,0.38)'

      const glow = glowRefs.current[i]
      if (glow) glow.style.background = isActive
        ? 'linear-gradient(90deg, transparent, rgba(123,191,160,0.55), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)'
    }
  }

  function startRaf() {
    if (animatingRef.current) return
    animatingRef.current = true
    const tick = () => {
      const diff = targetRef.current - rotRef.current
      if (Math.abs(diff) > 0.05) {
        rotRef.current += diff * 0.2
        applyPositions(rotRef.current)
        frameRef.current = requestAnimationFrame(tick)
      } else {
        rotRef.current = targetRef.current
        applyPositions(rotRef.current)
        animatingRef.current = false
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  // rAF loop — starts on demand, stops when done
  useEffect(() => {
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices])

  // Reset when choices change (new step)
  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    animatingRef.current = false
    rotRef.current = 0
    targetRef.current = 0
    activeIdxRef.current = 0
    applyPositions(0)
    if (descRef.current) {
      descRef.current.textContent = choices[0]?.description ?? ''
      descRef.current.style.opacity = '1'
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices])

  function goLeft()  { targetRef.current += step; startRaf() }
  function goRight() { targetRef.current -= step; startRaf() }

  function clickItem(i: number) {
    const cur = Math.round(-targetRef.current / step + N * 1000) % N
    if (cur === i) {
      onSelect(choices[i])
      return
    }
    // Shortest path
    const fwd = ((i - cur) + N) % N
    const bck = ((cur - i) + N) % N
    if (fwd <= bck) targetRef.current -= fwd * step
    else             targetRef.current += bck * step
    startRaf()
  }

  function confirmActive() {
    const cur = Math.round(-targetRef.current / step + N * 1000) % N
    onSelect(choices[cur])
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx > 0) { targetRef.current += step; startRaf() }
      else         { targetRef.current -= step; startRaf() }
    }
    touchStartX.current = null
  }

  return (
    <div style={{ userSelect: 'none' }}>
      {/* ── Stage ── */}
      <div
        style={{ position: 'relative', height: 340 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Ellipse platform */}
        <div style={{
          position: 'absolute', bottom: 18, left: '50%',
          transform: 'translateX(-50%) scaleY(0.22)',
          width: 580, height: 200,
          borderRadius: '50%',
          border: '1px solid rgba(123,191,160,0.2)',
          background: 'radial-gradient(ellipse, rgba(123,191,160,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Soft glow beneath center */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(123,191,160,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ← Arrow */}
        <button
          onClick={goLeft}
          className="car-arrow"
          aria-label="Previous"
          style={{
            position: 'absolute', zIndex: 200,
            left: 8, top: '50%',
            transform: 'translateY(-50%)',
            width: 46, height: 46, borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(232,228,220,0.45)',
            fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(123,191,160,0.1)'; e.currentTarget.style.borderColor = 'rgba(123,191,160,0.35)'; e.currentTarget.style.color = '#7BBFA0' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(232,228,220,0.45)' }}
        >←</button>

        {/* → Arrow */}
        <button
          onClick={goRight}
          className="car-arrow"
          aria-label="Next"
          style={{
            position: 'absolute', zIndex: 200,
            right: 8, top: '50%',
            transform: 'translateY(-50%)',
            width: 46, height: 46, borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(232,228,220,0.45)',
            fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(123,191,160,0.1)'; e.currentTarget.style.borderColor = 'rgba(123,191,160,0.35)'; e.currentTarget.style.color = '#7BBFA0' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(232,228,220,0.45)' }}
        >→</button>

        {/* Item container — centered in stage */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 0, height: 0,
        }}>
          {choices.map((choice, i) => (
            <div
              key={choice.label}
              ref={el => { itemRefs.current[i] = el }}
              onClick={() => clickItem(i)}
              style={{
                position: 'absolute',
                width: CARD_W, height: CARD_H,
                borderRadius: 22,
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 14, padding: '24px 18px',
                overflow: 'hidden',
                willChange: 'transform, opacity',
              }}
            >
              {/* Top edge glow */}
              <div ref={el => { glowRefs.current[i] = el }} style={{
                position: 'absolute', top: 0, left: '18%', right: '18%', height: 1,
                pointerEvents: 'none',
              }} />

              {/* Symbol */}
              <div ref={el => { symRefs.current[i] = el }} style={{
                fontSize: 50, lineHeight: 1,
                fontFamily: 'inherit',
                transition: 'color 0.25s',
              }}>
                {choice.symbol}
              </div>

              {/* Label */}
              <p ref={el => { lblRefs.current[i] = el }} style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 16, fontWeight: 400,
                margin: 0, textAlign: 'center', lineHeight: 1.3,
                transition: 'color 0.25s',
              }}>
                {choice.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Below stage: description + confirm ── */}
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <p
          ref={descRef}
          style={{
            fontSize: 14, color: 'rgba(232,228,220,0.42)',
            lineHeight: 1.85, margin: '0 auto 32px',
            maxWidth: 320,
            minHeight: 44,
            transition: 'opacity 0.15s',
          }}
        >
          {choices[0]?.description}
        </p>

        <button
          onClick={confirmActive}
          style={{
            padding: '13px 48px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            border: 'none', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.08em', cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8fd4b4'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#7BBFA0'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Choose this →
        </button>
      </div>
    </div>
  )
}

function Carousel({ choices, onSelect }: CarouselProps) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  if (isMobile) return <MobileCarousel choices={choices} onSelect={onSelect} />
  return <DesktopCarousel choices={choices} onSelect={onSelect} />
}

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: Result }) {
  const [priceRevealed, setPriceRevealed] = useState(false)
  const isComingSoon = result.comingSoon === true
  const tagColor = isComingSoon ? '#9B8ED4' : result.tag === 'Custom' ? 'rgba(232,228,220,0.5)' : '#7BBFA0'

  return (
    // Gradient border wrapper
    <div className="hg-result-wrap" style={{
      background: `linear-gradient(135deg, ${tagColor}55 0%, rgba(255,255,255,0.06) 50%, ${tagColor}30 100%)`,
      borderRadius: 26, padding: '1px',
      height: '100%', boxSizing: 'border-box',
      transition: 'all 0.3s',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #181b1e 0%, #0f1012 55%, #0c0d0e 100%)',
        borderRadius: 25, height: '100%',
        padding: '36px 30px 30px',
        display: 'flex', flexDirection: 'column', gap: 18,
        position: 'relative', overflow: 'hidden',
        boxSizing: 'border-box',
      }}>

        {/* Glass sheen — static highlight at top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 90,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 100%)',
          pointerEvents: 'none', borderRadius: '25px 25px 0 0',
        }} />

        {/* Shimmer sweep on hover (CSS-driven) */}
        <div className="hg-shimmer" style={{
          position: 'absolute', top: 0, bottom: 0, left: '-80%', width: '60%',
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.055) 50%, transparent 70%)',
          pointerEvents: 'none', transform: 'skewX(-12deg)',
        }} />

        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: '12%', right: '12%', height: 1,
          background: `linear-gradient(90deg, transparent, ${tagColor}90, transparent)`,
          pointerEvents: 'none',
        }} />

        {/* Symbol + tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: 22, color: tagColor,
            filter: `drop-shadow(0 0 8px ${tagColor}60)`,
          }}>{result.symbol}</span>
          <span style={{
            fontSize: 10, padding: '3px 11px', borderRadius: 100,
            background: `${tagColor}12`, border: `1px solid ${tagColor}30`,
            color: tagColor, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          }}>{result.tag}</span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300, fontSize: 32,
          color: '#E8E4DC', margin: 0, lineHeight: 1.1,
          letterSpacing: '-0.01em',
        }}>{result.name}</h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: 'rgba(232,228,220,0.48)',
          margin: 0, lineHeight: 1.9,
        }}>{result.description}</p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* What's included */}
        <div>
          <p style={{
            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(232,228,220,0.3)', margin: '0 0 12px',
          }}>What's included</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {result.includes.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                  background: tagColor, opacity: 0.7,
                }} />
                <span style={{ fontSize: 12.5, color: 'rgba(232,228,220,0.55)', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* Price / CTA */}
        {isComingSoon ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 24,
              color: 'rgba(232,228,220,0.28)', letterSpacing: '-0.01em', fontStyle: 'italic',
            }}>In development</span>
            <span style={{
              padding: '9px 20px', borderRadius: 100,
              background: `${tagColor}12`, border: `1px solid ${tagColor}30`,
              color: tagColor, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>Coming soon</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              {/* Blurred price (always rendered so layout stays stable) */}
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 34,
                color: '#E8E4DC', letterSpacing: '-0.01em',
                filter: priceRevealed ? 'none' : 'blur(10px)',
                transition: 'filter 0.45s ease',
                userSelect: priceRevealed ? 'auto' : 'none',
              }}>
                {result.price ? `$${result.price}` : 'Custom'}
              </span>

              {/* Overlay tap button — fades out on reveal */}
              {!priceRevealed && (
                <button
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setPriceRevealed(true) }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                  }}
                >
                  <span style={{
                    fontSize: 11, color: tagColor, letterSpacing: '0.1em',
                    borderBottom: `1px solid ${tagColor}50`,
                    paddingBottom: 1,
                    whiteSpace: 'nowrap',
                  }}>
                    ✦ Reveal price
                  </span>
                </button>
              )}
            </div>

            <Link
              href={result.href}
              style={{
                padding: '10px 22px', borderRadius: 100,
                background: tagColor, color: '#0C0D0E',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s, transform 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View product →
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

// ─── Plan data ────────────────────────────────────────────────────────────────

interface PlanSegment {
  stepLabel: string
  intro: string
  actions: string[]
  resultId: string
}

const PLAN_STEPS: Record<string, { intro: string; actions: string[] }> = {
  'bo-sheets': {
    intro: "Here's how to get your Back Office running in Google Sheets.",
    actions: [
      'Make a copy of the template to your Google Drive and rename it for your business.',
      'Open the Sales Tracking tab — add your products, services, and pricing structure.',
      'Move your existing client list into the CRM tab: name, contact, status, and deal value.',
      'Set your KPI targets in the dashboard — monthly revenue goal, lead count, close rate.',
      'Add your team to the Payroll Tracker with their roles and pay rates.',
      'Return each week to log new sales, update client stages, and check where you stand.',
    ],
  },
  'bo-notion': {
    intro: "Here's how to set up Back Office inside Notion.",
    actions: [
      'Duplicate the workspace into your Notion account and give it your business name.',
      'Open the CRM database and import your existing clients — name, company, stage, deal value.',
      'Link the CRM to the KPI dashboard so your numbers update as deals move forward.',
      'Set your monthly revenue and lead targets in the KPI view.',
      'Add your team to the Payroll section with their roles, rates, and pay cycle dates.',
      'Use the Recruitment Pipeline whenever you hire — it flows directly into the CRM.',
    ],
  },
  'pm-sheets': {
    intro: "Here's how to get your Project Management system set up.",
    actions: [
      'Make a copy of the template to your Google Drive.',
      'Open the Goals Dashboard and write your top 3 business goals for this quarter.',
      'Create a Project Dashboard entry for every active project you are running right now.',
      'Set up a Project Folder for each one — timeline, tasks, owner, and current status.',
      'Add your brand assets to the Individual Brand Set tab for easy reference.',
      'Check the dashboard weekly and update project statuses and milestone progress.',
    ],
  },
  'pm-notion': {
    intro: "Here's how to set up Project Management in Notion.",
    actions: [
      'Duplicate the workspace into your Notion account.',
      'Open the Goals database and add your top 3 goals for this quarter with due dates.',
      'Create a project entry for every active initiative — assign owners and set timelines.',
      "Use the Project Folder template to structure each project's tasks, files, and versions.",
      'Add your brand assets to the Brand Set database so they are always one click away.',
      'Set a weekly review reminder to update project statuses and check goal progress.',
    ],
  },
  'lt-sheets': {
    intro: "Here's how to set up your Life Tracker in Google Sheets.",
    actions: [
      'Make a copy of the template to your Google Drive.',
      'Open the Goals Dashboard and write your top goals — personal, professional, and everything between.',
      'Create a project entry for each goal you are actively working toward right now.',
      'Use the Project Folder template for anything that needs step-by-step planning.',
      "Add version control notes as your projects evolve so you can see how far you've come.",
      'Set a recurring weekly check-in to review progress, celebrate wins, and decide what comes next.',
    ],
  },
  'lt-notion': {
    intro: "Here's how to get your Life Tracker running in Notion.",
    actions: [
      'Duplicate the workspace into your Notion account.',
      'Open the Goals database and add every goal you are working toward — personal and professional.',
      'Link each goal to a Project entry so every ambition has a real plan attached.',
      'Use the Project Folder for anything that needs phase-by-phase tracking.',
      'Log version notes as you iterate — it keeps your thinking clear and your history visible.',
      'Open your Life Tracker at the start of each week and update where everything stands.',
    ],
  },
  'pt-sheets': {
    intro: "Here's how to set up your Personal Trackers.",
    actions: [
      'Make a copy of the template to your Google Drive.',
      'Start with the areas that matter most right now — you do not have to fill everything in at once.',
      'Open Faith Milestones and log your intentions, prayers, and spiritual goals.',
      'Fill in Family Milestones with the moments and memories you want to track and celebrate.',
      'Set up Self Care, Nutrition, and Exercise with your current routines and targets.',
      'Open the unified dashboard to see all eight areas of your life connected in one place.',
    ],
  },
  'pt-notion': {
    intro: "Here's how to set up your Personal Trackers in Notion.",
    actions: [
      'Duplicate the workspace into your Notion account.',
      'Start with the areas that feel most urgent — you can add others as you go.',
      'Add your first entries to Faith Milestones and Family Milestones.',
      'Log your current Self Care, Nutrition, and Exercise habits in their tabs.',
      'Fill in Skills, Business, and Education with what you are currently working on.',
      'Use the linked overview to check all eight trackers together in one connected view.',
    ],
  },
  'pp-sheets': {
    intro: "Here's how to set up your Personal Projects system.",
    actions: [
      'Make a copy of the template to your Google Drive.',
      'Open the Goals Dashboard and write down every personal project you are working toward.',
      'Create a Project Dashboard entry for each one — even the ideas still in early stage.',
      'Use the Project Folder template to plan tasks, timelines, and next steps for each.',
      'Log version history as your projects grow — it helps you see the progress you are making.',
      'Set a weekly check-in to update progress and decide what to focus on next.',
    ],
  },
  'pp-notion': {
    intro: "Here's how to set up your Personal Projects workspace in Notion.",
    actions: [
      'Duplicate the workspace into your Notion account.',
      'Open the Goals database and add everything you want to work on — big or small.',
      'Create a Project entry for each goal and link it so everything is connected.',
      'Use the Project Folder template to break each project into phases and concrete tasks.',
      'Log version notes as you iterate — keeps your thinking sharp and your history clear.',
      'Open your workspace weekly and update where each project stands.',
    ],
  },
  'byo-website': {
    intro: "Here's how to get started with your custom website.",
    actions: [
      'Go to the Fiverr gig and place your order — include a note about your brand and goals.',
      'Prepare your brand assets: logo, color palette, fonts, and any existing copy.',
      'Write a short brief — what you do, who you serve, and what you want visitors to do.',
      'Share examples of websites you love and specific things you want to avoid.',
      'Review the first design concept and give clear, specific feedback.',
      'Once approved, your site goes live — test it on mobile and desktop before sharing.',
    ],
  },
  'byo-app': {
    intro: "Here's how to get started building your custom app.",
    actions: [
      'Go to the Fiverr gig and message before ordering to describe what you need built.',
      'Write out the core problem your app solves — in one clear sentence.',
      'List the key features: what needs to work on day one, and what can come later?',
      'Sketch or describe the main screens and the path a user would take through them.',
      'Share any tools, databases, or workflows your app needs to connect with.',
      'Review the first build in real conditions, test it with actual use cases, and share feedback.',
    ],
  },
  'byo-sheets': {
    intro: "Here's how to get your custom Google Sheets built.",
    actions: [
      'Go to the Fiverr gig and describe what you need — be as specific as possible up front.',
      'Share a sample of your existing data or explain the structure you are currently working with.',
      'List every column, formula, calculation, or automation you need the sheet to handle.',
      'Describe who will use it — just you, or a whole team with different access needs?',
      'Review the first version inside your real workflow — not just with placeholder data.',
      'Request any revisions, then make a copy and start using it for real.',
    ],
  },
  'byo-notion': {
    intro: "Here's how to get your custom Notion workspace built.",
    actions: [
      'Go to the Fiverr gig and describe your systems — what you track, manage, and plan.',
      'List the databases and views you know you need from the start.',
      'Share examples of Notion setups you have liked or templates you have tried before.',
      'Describe how you or your team will use it day to day — the actual workflow, not the ideal.',
      'Review the first build with real information — not placeholder data.',
      'Request refinements, then duplicate it into your own Notion and start building on it.',
    ],
  },

  // ── Coming soon ───────────────────────────────────────────────────────────
  'career-tracker': {
    intro: 'Your career is one of the biggest investments of your life. Here\'s how to take it seriously.',
    actions: [
      'Write down where you are right now — your role, your strengths, and what feels missing.',
      'Define where you want to be in 1 year, 3 years, and 10 years. Be specific about title, income, and impact.',
      'Map the skills and experiences you need to develop to close the gap from here to there.',
      'Start documenting every win, completed project, and piece of meaningful feedback you receive.',
      'Set quarterly career goals — one skill to build, one connection to make, one milestone to hit.',
      'Career Compass is coming soon — it will bring your entire professional path into one dedicated workspace.',
    ],
  },
  'finance-tracker': {
    intro: 'Financial clarity isn\'t about having more — it\'s about knowing exactly where you stand.',
    actions: [
      'Write down every income source you have — active, passive, and any side income.',
      'List every recurring expense and sort them honestly: needs, wants, and investments.',
      'Set a monthly savings target and automate it before you spend anything else.',
      'Start tracking your net worth monthly — assets minus liabilities, in one honest number.',
      'Review your numbers each week, even for just ten minutes. Awareness changes everything.',
      'Finance Tracker is coming soon — it will give you total clarity over your money in one place.',
    ],
  },
  'mindfulness-tracker': {
    intro: 'Inner peace isn\'t found — it\'s built, one small practice at a time.',
    actions: [
      'Choose one grounding practice to start with: meditation, journaling, breathwork, or a daily walk.',
      'Set a consistent time each day for that practice — morning often works best, even ten minutes.',
      'Journal on three things each day: what you\'re grateful for, what\'s on your mind, what today needs.',
      'Notice patterns in your mood and energy over time — write them down without judgment.',
      'Every few weeks, review what is working and let go of what no longer serves you.',
      'Mind Space is coming soon — it will bring your mindfulness practice and inner growth into one focused home.',
    ],
  },
  'relationship-keeper': {
    intro: 'The relationships you invest in define the quality of your life more than almost anything else.',
    actions: [
      'List the people who matter most to you — family, close friends, mentors, and community.',
      'Decide how often you want to genuinely connect with each person and put it in your calendar.',
      'Start keeping a small record of meaningful moments, conversations, and things you want to remember.',
      'Be intentional about how you show up — a thoughtful message, a call, or simply being present.',
      'Review your relationships each month and ask: who have I been neglecting? Then reach out.',
      'Connection Keeper is coming soon — it will help you nurture every important relationship in one place.',
    ],
  },
  'travel-planner': {
    intro: 'The experiences you create on purpose become the stories you tell for the rest of your life.',
    actions: [
      'Write down every place you want to go and every experience you want to have — the full dream list.',
      'Pick one upcoming trip and plan it properly: dates, budget, what you actually want to do and feel.',
      'Research and book well in advance — the best experiences reward the most intention.',
      'When you travel, document it in real time — photos, notes, what you want to remember.',
      'After each trip, reflect on what it gave you, what surprised you, and what you want next.',
      'Journey Planner is coming soon — it will bring your travel goals and memories into one living record.',
    ],
  },
  'creativity-log': {
    intro: 'Creativity isn\'t a talent — it\'s a practice you build by consistently showing up.',
    actions: [
      'Name the creative work that calls to you most — writing, art, music, design, building, making.',
      'Set aside dedicated time each week for that work — protected, uninterrupted, just yours.',
      'Start a project log: ideas, drafts, experiments, and things that did not work the way you hoped.',
      'Share your work, even before it feels finished or ready — that tension will make you sharper.',
      'Build a habit of noticing beauty, ideas, and inspiration in everyday life. Write them down immediately.',
      'Creative Studio is coming soon — it will give your creative life its own dedicated home.',
    ],
  },
  'legacy-journal': {
    intro: 'What you leave behind is shaped entirely by what you choose to document and act on today.',
    actions: [
      'Write about the person you want to be remembered as — honestly, in one paragraph.',
      'Document the milestones of your life: the decisions, turning points, and experiences that shaped you.',
      'Identify the values you want to pass on and the specific impact you want to make.',
      'Write letters to your future self, your children, or your community — things worth saying now.',
      'Review your legacy intentions once a year and ask: am I actually living in alignment with this?',
      'Legacy Journal is coming soon — it will give you one beautiful place to hold your whole life\'s story.',
    ],
  },
  'community-board': {
    intro: 'The work you do for others — teaching, mentoring, contributing — is some of the most important work you will ever do.',
    actions: [
      'Identify the communities you are already part of and the ones you genuinely want to serve.',
      'Write down one concrete way you could contribute right now: teach what you know, mentor someone newer.',
      'Make a regular commitment — even one hour a week of giving back compounds into something remarkable.',
      'Track the impact you are having: the stories, the milestones, the people you have helped move forward.',
      'Build real relationships with others doing similar work — that network will sustain you over time.',
      'Community Board is coming soon — it will help you track your contributions and the people you are pouring into.',
    ],
  },
}

const PAIRS_WELL_WITH: Record<string, string[]> = {
  'bo-sheets':   ['pm-sheets'],
  'bo-notion':   ['pm-notion'],
  'pm-sheets':   ['bo-sheets'],
  'pm-notion':   ['bo-notion'],
  'lt-sheets':   ['pt-sheets', 'pp-sheets'],
  'lt-notion':   ['pt-notion', 'pp-notion'],
  'pt-sheets':   ['pp-sheets'],
  'pt-notion':   ['pp-notion'],
  'pp-sheets':   ['pt-sheets'],
  'pp-notion':   ['pt-notion'],
  'byo-website': ['byo-app'],
  'byo-app':     ['byo-website'],
  'byo-sheets':  ['byo-notion'],
  'byo-notion':  ['byo-sheets'],
}

function buildPlan(resultIds: string[], history: string[]): { segments: PlanSegment[]; pairsIds: string[] } {
  const lastStep = history[history.length - 1]

  if (resultIds.length === 1) {
    const id = resultIds[0]
    const steps = PLAN_STEPS[id] ?? { intro: RESULTS[id].description, actions: [] }
    return {
      segments: [{ stepLabel: 'Your match', intro: steps.intro, actions: steps.actions, resultId: id }],
      pairsIds: (PAIRS_WELL_WITH[id] ?? []).filter(pid => !!RESULTS[pid]),
    }
  }

  const isOptions = ['tool-bo', 'tool-pm', 'tool-pt', 'tool-pp', 'tool-lt'].includes(lastStep)

  const segments: PlanSegment[] = resultIds.map((id, i) => {
    const steps = PLAN_STEPS[id] ?? { intro: RESULTS[id].description, actions: [] }
    let prefix = ''
    if (isOptions) {
      prefix = i === 0
        ? 'Option one — the Sheets version. '
        : 'Option two — the Notion version. '
    } else {
      prefix = i === 0 ? 'Start here. ' : i === resultIds.length - 1 ? "Once that's running — add this. " : 'Build on it. '
    }
    return { stepLabel: `Step ${i + 1}`, intro: prefix + steps.intro, actions: steps.actions, resultId: id }
  })

  return { segments, pairsIds: [] }
}

// ─── Mini card (pairs section) ────────────────────────────────────────────────

function MiniCard({ result }: { result: Result }) {
  const tagColor = result.tag === 'Custom' ? 'rgba(232,228,220,0.5)' : '#7BBFA0'
  return (
    <div style={{
      background: `linear-gradient(135deg, ${tagColor}40 0%, rgba(255,255,255,0.04) 60%, ${tagColor}18 100%)`,
      borderRadius: 18, padding: '1px', flex: '1 1 220px',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #181b1e 0%, #0c0d0e 100%)',
        borderRadius: 17, padding: '22px 22px 20px',
        display: 'flex', flexDirection: 'column', gap: 9,
        position: 'relative', overflow: 'hidden', height: '100%', boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: `linear-gradient(90deg, transparent, ${tagColor}55, transparent)`,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, color: tagColor }}>{result.symbol}</span>
          <span style={{
            fontSize: 9, padding: '2px 9px', borderRadius: 100,
            background: `${tagColor}10`, border: `1px solid ${tagColor}22`,
            color: tagColor, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          }}>{result.tag}</span>
        </div>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300, fontSize: 20, color: '#E8E4DC',
          margin: 0, lineHeight: 1.15,
        }}>{result.name}</p>
        <p style={{
          fontSize: 12, color: 'rgba(232,228,220,0.36)',
          margin: 0, lineHeight: 1.7,
        }}>{result.description}</p>
        <Link href={result.href} style={{
          marginTop: 6, fontSize: 11, color: tagColor,
          textDecoration: 'none', letterSpacing: '0.06em',
          borderBottom: `1px solid ${tagColor}35`, paddingBottom: 1,
          alignSelf: 'flex-start',
        }}>Explore →</Link>
      </div>
    </div>
  )
}

// ─── Plan screen ──────────────────────────────────────────────────────────────

const STEP_STORAGE_KEY = 'ew_guide_progress'

function PlanScreen({
  segments,
  pairsIds,
  onBack,
  onReset,
}: {
  segments: PlanSegment[]
  pairsIds: string[]
  onBack: () => void
  onReset: () => void
}) {
  const [pacing, setPacing] = useState<'all' | 'step' | null>(null)
  // Completed lines per segment (index 0 = intro, 1+ = actions)
  const [segLines, setSegLines] = useState<string[][]>(segments.map(() => []))
  const [currentSeg, setCurrentSeg] = useState(-1)
  const [currentLine, setCurrentLine] = useState(-1)
  const [currentTyped, setCurrentTyped] = useState('')
  const [cardsVisible, setCardsVisible] = useState<boolean[]>(segments.map(() => false))
  const [waitingForNext, setWaitingForNext] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [savedStep, setSavedStep] = useState<number | null>(null)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pacingRef = useRef<'all' | 'step' | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STEP_STORAGE_KEY)
      if (raw) {
        const s = JSON.parse(raw) as { count: number; next: number }
        if (s.count === segments.length && s.next > 0 && s.next < segments.length) setSavedStep(s.next)
      }
    } catch {}
    return () => { if (typingRef.current) clearInterval(typingRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveProgress(idx: number) {
    try { localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify({ count: segments.length, next: idx })) } catch {}
  }
  function clearProgress() {
    try { localStorage.removeItem(STEP_STORAGE_KEY) } catch {}
  }

  function getAllLines(segIdx: number) {
    const s = segments[segIdx]
    return [s.intro, ...s.actions]
  }

  function typeLine(segIdx: number, lineIdx: number) {
    if (typingRef.current) clearInterval(typingRef.current)
    const lines = getAllLines(segIdx)
    const text = lines[lineIdx]
    const isIntro = lineIdx === 0
    // "all" mode types faster (12ms/char) vs "step" mode (22ms/char)
    const speed = pacingRef.current === 'all' ? 12 : 22
    let pos = 0

    typingRef.current = setInterval(() => {
      pos++
      setCurrentTyped(text.slice(0, pos))
      if (pos >= text.length) {
        clearInterval(typingRef.current!)
        setSegLines(prev => { const n = prev.map(a => [...a]); n[segIdx] = [...n[segIdx], text]; return n })
        setCurrentTyped('')
        const nextLine = lineIdx + 1
        const pause = isIntro ? (pacingRef.current === 'all' ? 200 : 350) : (pacingRef.current === 'all' ? 60 : 100)
        setTimeout(() => {
          if (nextLine < lines.length) {
            setCurrentLine(nextLine)
            typeLine(segIdx, nextLine)
          } else {
            // Segment done — show card
            setTimeout(() => {
              setCardsVisible(prev => { const n = [...prev]; n[segIdx] = true; return n })
              setTimeout(() => {
                const nextSeg = segIdx + 1
                if (nextSeg < segments.length) {
                  if (pacingRef.current === 'step') { setWaitingForNext(true); saveProgress(nextSeg) }
                  else { setCurrentSeg(nextSeg); setCurrentLine(0); typeLine(nextSeg, 0) }
                } else { setAllDone(true); clearProgress() }
              }, pacingRef.current === 'all' ? 300 : 550)
            }, 200)
          }
        }, pause)
      }
    }, speed)
  }

  function beginTyping(segIdx: number, lineIdx = 0) {
    setCurrentSeg(segIdx)
    setCurrentLine(lineIdx)
    setCurrentTyped('')
    typeLine(segIdx, lineIdx)
  }

  function skipCurrentSeg() {
    if (typingRef.current) clearInterval(typingRef.current)
    const allLines = getAllLines(currentSeg)
    setSegLines(prev => { const n = prev.map(a => [...a]); n[currentSeg] = allLines; return n })
    setCurrentTyped('')
    setCurrentLine(-1)
    setTimeout(() => {
      setCardsVisible(prev => { const n = [...prev]; n[currentSeg] = true; return n })
      setTimeout(() => {
        const nextSeg = currentSeg + 1
        if (nextSeg < segments.length) {
          if (pacingRef.current === 'step') { setWaitingForNext(true); saveProgress(nextSeg) }
          else { setCurrentSeg(nextSeg); setCurrentLine(0); typeLine(nextSeg, 0) }
        } else { setAllDone(true); clearProgress() }
      }, 450)
    }, 200)
  }

  function startAll() {
    pacingRef.current = 'all'
    clearProgress()
    setSavedStep(null)
    setPacing('all')
    beginTyping(0)
  }

  function startStep(fromSeg = 0) {
    pacingRef.current = 'step'
    setSavedStep(null)
    setPacing('step')
    beginTyping(fromSeg)
  }

  function handleContinue() {
    setWaitingForNext(false)
    const next = currentSeg + 1
    setCurrentSeg(next)
    setCurrentLine(0)
    typeLine(next, 0)
  }

  // ── Pacing choice screen ──
  if (pacing === null) {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', margin: '0 0 20px' }}>
            Your plan is ready
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 58px)',
            color: '#E8E4DC', margin: '0 auto', lineHeight: 1.1, maxWidth: 520,
          }}>
            How do you want to see it?
          </h2>
          {savedStep !== null && (
            <div style={{ marginTop: 28 }}>
              <button onClick={() => startStep(savedStep)} style={{
                padding: '10px 24px', borderRadius: 100,
                background: 'rgba(123,191,160,0.1)', border: '1px solid rgba(123,191,160,0.3)',
                color: '#7BBFA0', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.07em',
              }}>↩ Resume from step {savedStep + 1}</button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 620, margin: '0 auto 48px' }}>
          {([
            { mode: 'all' as const, title: 'All at once', desc: 'Watch the full roadmap write itself out. Great for saving as a PDF.', symbol: '◎' },
            { mode: 'step' as const, title: 'One step at a time', desc: "I'll walk you through each step. Come back when you're ready for the next one.", symbol: '○' },
          ]).map(opt => (
            <button key={opt.mode} onClick={() => opt.mode === 'all' ? startAll() : startStep()} style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: '34px 28px',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(155deg, rgba(123,191,160,0.1) 0%, rgba(123,191,160,0.03) 100%)'; e.currentTarget.style.borderColor = 'rgba(123,191,160,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <div style={{ fontSize: 28, color: '#7BBFA0', marginBottom: 16 }}>{opt.symbol}</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 24, color: '#E8E4DC', margin: '0 0 10px', lineHeight: 1.1 }}>{opt.title}</p>
              <p style={{ fontSize: 13, color: 'rgba(232,228,220,0.38)', margin: 0, lineHeight: 1.8 }}>{opt.desc}</p>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onBack} style={{
            padding: '11px 28px', borderRadius: 100, background: 'transparent',
            border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(232,228,220,0.38)',
            fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(232,228,220,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(232,228,220,0.38)' }}
          >← Back</button>
        </div>
      </div>
    )
  }

  const isStep = pacing === 'step'
  const isTypingAnything = currentSeg >= 0 && currentLine >= 0 && !waitingForNext && !allDone

  return (
    <>
      <style>{`
        @keyframes hg-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hg-cursor { display:inline-block; animation:hg-blink 0.9s step-end infinite; color:#7BBFA0; margin-left:1px; }
        @media print {
          body * { visibility: hidden; }
          .hg-print-view, .hg-print-view * { visibility: visible; }
          .hg-print-view {
            position: fixed; top: 0; left: 0; width: 100%; padding: 48px 56px;
            background: white; color: #1a1a1a;
            font-family: Georgia, serif;
          }
          .hg-print-view h1 { font-size: 28px; font-weight: 400; margin: 0 0 8px; color: #1a1a1a; }
          .hg-print-view .hg-print-seg { margin-bottom: 40px; page-break-inside: avoid; }
          .hg-print-view .hg-print-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin: 0 0 10px; }
          .hg-print-view .hg-print-intro { font-size: 15px; color: #333; margin: 0 0 14px; line-height: 1.7; }
          .hg-print-view .hg-print-action { font-size: 13px; color: #444; margin: 0 0 8px; line-height: 1.65; display: flex; gap: 10px; }
          .hg-print-view .hg-print-num { color: #999; min-width: 18px; }
          .hg-print-view .hg-print-product { font-size: 12px; color: #777; margin-top: 10px; font-style: italic; }
        }
      `}</style>

      {/* Print-only clean view */}
      <div className="hg-print-view" style={{ display: 'none' }}>
        <h1>{segments.length === 1 ? "Your next steps" : "Your roadmap"}</h1>
        <p style={{ fontSize: 12, color: '#999', margin: '0 0 40px' }}>effortless.works</p>
        {segments.map((seg, i) => (
          <div key={i} className="hg-print-seg">
            <p className="hg-print-label">{seg.stepLabel}</p>
            <p className="hg-print-intro">{seg.intro}</p>
            {seg.actions.map((action, j) => (
              <div key={j} className="hg-print-action">
                <span className="hg-print-num">{j + 1}.</span>
                <span>{action}</span>
              </div>
            ))}
            <p className="hg-print-product">→ {RESULTS[seg.resultId]?.name}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', margin: '0 0 20px' }}>
          Your roadmap
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300, fontSize: 'clamp(38px, 4.5vw, 58px)',
          color: '#E8E4DC', margin: 0, lineHeight: 1.1,
        }}>
          {segments.length === 1 ? "Here's where to start." : "Here's your next steps."}
        </h2>
        {isTypingAnything && (
          <button onClick={skipCurrentSeg} className="hg-no-print" style={{
            marginTop: 24, padding: '7px 20px', borderRadius: 100, background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,228,220,0.25)',
            fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.08em', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(232,228,220,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,228,220,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >skip →</button>
        )}
      </div>

      {/* Segments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        {segments.map((seg, i) => {
          if (isStep && i > currentSeg) return null
          const completed = segLines[i] || []
          const isCurrent = i === currentSeg
          const cardVis = cardsVisible[i]
          const typingLineIdx = isCurrent ? currentLine : -1

          return (
            <div key={i}>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7BBFA0', margin: '0 0 22px' }}>
                {seg.stepLabel}
              </p>

              {/* Intro line */}
              {completed.length > 0 ? (
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 300,
                  color: 'rgba(232,228,220,0.75)', lineHeight: 1.85,
                  margin: '0 0 28px', maxWidth: 660,
                }}>{completed[0]}</p>
              ) : typingLineIdx === 0 ? (
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 300,
                  color: 'rgba(232,228,220,0.75)', lineHeight: 1.85,
                  margin: '0 0 28px', maxWidth: 660,
                }}>{currentTyped}<span className="hg-cursor">|</span></p>
              ) : null}

              {/* Action lines */}
              {(completed.length > 1 || typingLineIdx > 0) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36, paddingLeft: 2 }}>
                  {completed.slice(1).map((line, li) => (
                    <div key={li} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{
                        fontSize: 11, color: '#7BBFA0', fontFamily: 'Cormorant Garamond, serif',
                        minWidth: 22, lineHeight: 1.9, opacity: 0.7, flexShrink: 0,
                      }}>{li + 1}.</span>
                      <p style={{ fontSize: 14, color: 'rgba(232,228,220,0.55)', margin: 0, lineHeight: 1.85 }}>{line}</p>
                    </div>
                  ))}
                  {isCurrent && typingLineIdx > 0 && currentTyped && (
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{
                        fontSize: 11, color: '#7BBFA0', fontFamily: 'Cormorant Garamond, serif',
                        minWidth: 22, lineHeight: 1.9, opacity: 0.7, flexShrink: 0,
                      }}>{completed.length}.</span>
                      <p style={{ fontSize: 14, color: 'rgba(232,228,220,0.55)', margin: 0, lineHeight: 1.85 }}>
                        {currentTyped}<span className="hg-cursor">|</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Product card */}
              <div style={{
                opacity: cardVis ? 1 : 0,
                transform: cardVis ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                maxWidth: segments.length === 1 ? 460 : 500,
              }}>
                {cardVis && <ResultCard result={RESULTS[seg.resultId]} />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue button (step mode) */}
      {waitingForNext && (
        <div style={{ marginTop: 52 }} className="hg-no-print">
          <button onClick={handleContinue} style={{
            padding: '13px 40px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            border: 'none', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8fd4b4'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7BBFA0'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Continue to {segments[currentSeg + 1]?.stepLabel} →</button>
        </div>
      )}

      {/* Done */}
      {allDone && (
        <>
          {pairsIds.length > 0 && (
            <div style={{ marginTop: 96, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.28)', margin: '0 0 12px' }}>
                  While you're building
                </p>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300, fontSize: 'clamp(26px, 3vw, 36px)',
                  color: '#E8E4DC', margin: '0 0 10px', lineHeight: 1.15,
                }}>These pair well together.</h3>
                <p style={{ fontSize: 13, color: 'rgba(232,228,220,0.32)', margin: 0, lineHeight: 1.75, maxWidth: 440 }}>
                  Not required — just worth knowing about when you're ready to expand.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {pairsIds.map(id => RESULTS[id] && <MiniCard key={id} result={RESULTS[id]} />)}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 64 }} className="hg-no-print">
            <button onClick={() => window.print()} style={{
              padding: '11px 28px', borderRadius: 100,
              background: 'rgba(123,191,160,0.08)', border: '1px solid rgba(123,191,160,0.25)',
              color: '#7BBFA0', fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(123,191,160,0.14)'; e.currentTarget.style.borderColor = 'rgba(123,191,160,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(123,191,160,0.08)'; e.currentTarget.style.borderColor = 'rgba(123,191,160,0.25)' }}
            >↓ Save as PDF</button>

            {([['← Back', onBack], ['Start over', onReset]] as [string, () => void][]).map(([label, fn]) => (
              <button key={label} onClick={fn} style={{
                padding: '11px 28px', borderRadius: 100,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(232,228,220,0.38)', fontSize: 13,
                cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(232,228,220,0.65)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(232,228,220,0.38)' }}
              >{label}</button>
            ))}
          </div>
        </>
      )}
    </>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const GUIDE_STATE_KEY = 'ew_guide_state'

export default function HomeGuide() {
  const [history, setHistory] = useState<string[]>(['start'])
  const [results, setResults] = useState<string[] | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [visible, setVisible] = useState(true)

  const currentStep = STEPS[history[history.length - 1]]
  const canGoBack = history.length > 1 || results !== null

  // Restore state when navigating back from a product page
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(GUIDE_STATE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as { history: string[]; results: string[] }
        setHistory(saved.history)
        setResults(saved.results)
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep sessionStorage in sync so back-navigation can restore
  useEffect(() => {
    if (results !== null) {
      try { sessionStorage.setItem(GUIDE_STATE_KEY, JSON.stringify({ history, results })) } catch {}
    } else {
      try { sessionStorage.removeItem(GUIDE_STATE_KEY) } catch {}
    }
  }, [history, results])

  // Push a browser history entry whenever the guide advances
  useEffect(() => {
    if (history.length > 1 || results !== null) {
      window.history.pushState({ guideStep: history.length, hasResults: !!results }, '')
    }
  }, [history, results])

  // Browser back button navigates back within the guide
  useEffect(() => {
    function onPop() {
      transition(() => {
        if (results) { setResults(null) }
        else if (history.length > 1) { setHistory(h => h.slice(0, -1)) }
      })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, results])

  function transition(fn: () => void) {
    setVisible(false)
    setTimeout(() => { fn(); setAnimKey(k => k + 1); setVisible(true) }, 260)
  }

  function handleSelect(choice: Choice) {
    transition(() => {
      if (choice.results) { setResults(choice.results) }
      else if (choice.next) { setHistory(h => [...h, choice.next!]); setResults(null) }
    })
  }

  function goBack() {
    // Trigger browser popstate (which our listener handles), keeping history in sync
    window.history.back()
  }

  function reset() {
    transition(() => { setHistory(['start']); setResults(null) })
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const plan = results ? buildPlan(results, history) : null

  return (
    <section
      id="products"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '120px 0 160px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes hg-shimmer-sweep {
          0%   { left: -80%; }
          100% { left: 160%; }
        }
        .hg-result-wrap:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(123,191,160,0.15);
        }
        .hg-result-wrap:hover .hg-shimmer {
          animation: hg-shimmer-sweep 0.75s ease forwards;
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(123,191,160,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>

        {/* Animated panel */}
        <div
          key={animKey}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.26s ease, transform 0.26s ease',
          }}
        >
          {plan ? (
            /* ── Plan screen ── */
            <PlanScreen
              segments={plan.segments}
              pairsIds={plan.pairsIds}
              onBack={goBack}
              onReset={reset}
            />

          ) : (
            /* ── Carousel question ── */
            <div>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', margin: '0 0 20px' }}>
                  {currentStep.eyebrow}
                </p>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 60px)',
                  color: '#E8E4DC', margin: '0 auto', lineHeight: 1.1,
                  maxWidth: 600,
                }}>
                  {currentStep.question}
                </h2>
              </div>

              <Carousel
                key={currentStep.id}
                choices={currentStep.choices}
                onSelect={handleSelect}
              />

              {canGoBack && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                  <button onClick={goBack} style={{
                    padding: '11px 28px', borderRadius: 100,
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(232,228,220,0.38)', fontSize: 13,
                    cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em',
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(232,228,220,0.65)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(232,228,220,0.38)' }}
                  >← Back</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
