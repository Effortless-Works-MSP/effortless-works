'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Decision tree ────────────────────────────────────────────────────────────
// Each node has a question, choices, and either a next node id or a result.

interface Choice {
  label: string
  description?: string
  next?: string       // id of next node
  result?: Result[]   // final recommendation
}

interface Node {
  id: string
  question: string
  subtitle?: string
  choices: Choice[]
}

interface Result {
  label: string
  description: string
  href: string
  tag: string
}

const TREE: Node[] = [
  {
    id: 'start',
    question: 'What are you trying to organize?',
    subtitle: 'Pick the one that fits best.',
    choices: [
      { label: 'My business',       description: 'Sales, clients, projects, operations', next: 'business-what' },
      { label: 'My personal life',  description: 'Goals, habits, health, growth',        next: 'personal-what' },
      { label: 'Both',              description: 'I need tools for work and life',        next: 'both-tool' },
      { label: 'I need something custom built', description: 'Website, app, or custom template', result: [
        { label: 'Build Your Own', description: 'Custom websites, apps, Notion workspaces, and Google Sheets — built for you.', href: '/build-your-own', tag: 'Service' },
      ]},
    ],
  },

  // ── Business branch ──────────────────────────────────────────────────────
  {
    id: 'business-what',
    question: 'What does your business need most?',
    choices: [
      { label: 'Track sales, clients & operations', description: 'KPIs, payroll, recruitment', next: 'business-bo-tool' },
      { label: 'Manage projects & goals',           description: 'Dashboards, folders, version control', next: 'business-pm-tool' },
      { label: 'Learn how to use the tools',        description: 'Courses and walkthroughs', next: 'business-courses' },
      { label: 'All of the above',                  next: 'business-bo-tool' },
    ],
  },
  {
    id: 'business-bo-tool',
    question: 'Which tool do you prefer?',
    subtitle: 'Both do the same job — just pick your favorite.',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Back Office — Google Sheets', description: 'Sales, KPIs, clients, commissions, payroll, and recruitment tracking in one system.', href: '/000009/bo-sheets', tag: 'Business' },
        { label: 'Project Management — Google Sheets', description: 'Goals dashboard, project tracking, version control, and brand sets.', href: '/000010/pm-sheets', tag: 'Business' },
      ]},
      { label: 'Notion', result: [
        { label: 'Back Office — Notion', description: 'All six back office trackers rebuilt as a connected Notion workspace.', href: '/000009/bo-notion', tag: 'Business' },
        { label: 'Project Management — Notion', description: 'Project folders, version control, and brand sets — all linked in Notion.', href: '/000010/pm-notion', tag: 'Business' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Back Office — Google Sheets', description: 'Sales, KPIs, clients, commissions, payroll, and recruitment tracking in one system.', href: '/000009/bo-sheets', tag: 'Business' },
        { label: 'Back Office — Notion', description: 'The same system rebuilt as a connected Notion workspace.', href: '/000009/bo-notion', tag: 'Business' },
      ]},
    ],
  },
  {
    id: 'business-pm-tool',
    question: 'Which tool do you prefer?',
    subtitle: 'Both do the same job — just pick your favorite.',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Project Management — Google Sheets', description: 'Goals dashboard, project tracking, version control, and brand sets.', href: '/000010/pm-sheets', tag: 'Business' },
      ]},
      { label: 'Notion', result: [
        { label: 'Project Management — Notion', description: 'Project folders, version control, and brand sets — all linked in Notion.', href: '/000010/pm-notion', tag: 'Business' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Project Management — Google Sheets', description: 'Goals dashboard, project tracking, version control, and brand sets.', href: '/000010/pm-sheets', tag: 'Business' },
        { label: 'Project Management — Notion', description: 'Project folders, version control, and brand sets — all linked in Notion.', href: '/000010/pm-notion', tag: 'Business' },
      ]},
    ],
  },
  {
    id: 'business-courses',
    question: 'How do you like to learn?',
    choices: [
      { label: 'Watch videos', description: 'Free walkthrough videos for every tool', result: [
        { label: 'Business Product Videos', description: 'Free video walkthroughs for every Business tool.', href: '/000011/b-productvideos', tag: 'Course' },
      ]},
      { label: 'Self-paced course', description: 'Go deep at your own speed', result: [
        { label: 'Business Self Paced Courses', description: 'Courses bundled with every Business template.', href: '/000011/b-selfpaced', tag: 'Course' },
      ]},
      { label: 'Live with an instructor', description: 'Get set up with real-time help', result: [
        { label: 'Business Instructor Led', description: 'Live guided sessions to set up your business system right.', href: '/000011/b-instructorled', tag: 'Course' },
      ]},
    ],
  },

  // ── Personal branch ──────────────────────────────────────────────────────
  {
    id: 'personal-what',
    question: 'What part of your life do you want to organize?',
    choices: [
      { label: 'Track habits & milestones', description: 'Faith, family, health, skills, growth', next: 'personal-trackers-tool' },
      { label: 'Manage personal projects',  description: 'Goals, dashboards, version control',   next: 'personal-projects-tool' },
      { label: 'Everything — my whole life', description: 'The complete personal OS',             next: 'personal-lt-tool' },
      { label: 'Learn how to use the tools', description: 'Courses and walkthroughs',             next: 'personal-courses' },
    ],
  },
  {
    id: 'personal-trackers-tool',
    question: 'Which tool do you prefer?',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Personal Trackers — Google Sheets', description: 'Milestone trackers for faith, family, self care, nutrition, exercise, skills, business, and education.', href: '/000013/pt-sheets', tag: 'Individuals' },
      ]},
      { label: 'Notion', result: [
        { label: 'Personal Trackers — Notion', description: 'All eight trackers connected inside one Notion workspace.', href: '/000013/pt-notion', tag: 'Individuals' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Personal Trackers — Google Sheets', description: 'Milestone trackers for faith, family, self care, nutrition, exercise, skills, business, and education.', href: '/000013/pt-sheets', tag: 'Individuals' },
        { label: 'Personal Trackers — Notion', description: 'All eight trackers connected inside one Notion workspace.', href: '/000013/pt-notion', tag: 'Individuals' },
      ]},
    ],
  },
  {
    id: 'personal-projects-tool',
    question: 'Which tool do you prefer?',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Personal Projects — Google Sheets', description: 'Goals dashboard, project tracker, version control, and branch sets for personal use.', href: '/000014/pp-sheets', tag: 'Individuals' },
      ]},
      { label: 'Notion', result: [
        { label: 'Personal Projects — Notion', description: 'All five personal project templates linked inside one Notion workspace.', href: '/000014/pp-notion', tag: 'Individuals' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Personal Projects — Google Sheets', description: 'Goals dashboard, project tracker, version control, and branch sets for personal use.', href: '/000014/pp-sheets', tag: 'Individuals' },
        { label: 'Personal Projects — Notion', description: 'All five personal project templates linked inside one Notion workspace.', href: '/000014/pp-notion', tag: 'Individuals' },
      ]},
    ],
  },
  {
    id: 'personal-lt-tool',
    question: 'Which tool do you prefer?',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Life Tracker — Google Sheets', description: 'Your complete personal operating system — goals, projects, trackers, version control, and branches all in one.', href: '/000012/lt-sheets', tag: 'Individuals' },
      ]},
      { label: 'Notion', result: [
        { label: 'Life Tracker — Notion', description: 'The full Life Tracker rebuilt as one connected Notion workspace.', href: '/000012/lt-notion', tag: 'Individuals' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Life Tracker — Google Sheets', description: 'Your complete personal operating system — all in one Google Sheets system.', href: '/000012/lt-sheets', tag: 'Individuals' },
        { label: 'Life Tracker — Notion', description: 'The full Life Tracker rebuilt as one connected Notion workspace.', href: '/000012/lt-notion', tag: 'Individuals' },
      ]},
    ],
  },
  {
    id: 'personal-courses',
    question: 'How do you like to learn?',
    choices: [
      { label: 'Watch videos', description: 'Free walkthrough videos for every tool', result: [
        { label: 'Individuals Product Videos', description: 'Free video walkthroughs for every personal tool.', href: '/000015/p-productvideos', tag: 'Course' },
      ]},
      { label: 'Self-paced course', description: 'Go deep at your own speed', result: [
        { label: 'Individuals Self Paced Courses', description: 'Courses bundled with every personal template.', href: '/000015/p-selfpaced', tag: 'Course' },
      ]},
      { label: 'Live with an instructor', description: 'Get set up with real-time help', result: [
        { label: 'Individuals Instructor Led', description: 'Live guided sessions to set up your personal system right.', href: '/000015/p-instructorled', tag: 'Course' },
      ]},
    ],
  },

  // ── Both branch ──────────────────────────────────────────────────────────
  {
    id: 'both-tool',
    question: 'Which tool do you prefer?',
    subtitle: 'We\'ll find the right bundle for you.',
    choices: [
      { label: 'Google Sheets', result: [
        { label: 'Back Office — Google Sheets', description: 'Sales, KPIs, clients, commissions, payroll, and recruitment tracking.', href: '/000009/bo-sheets', tag: 'Business' },
        { label: 'Project Management — Google Sheets', description: 'Goals, project dashboards, version control, and brand sets.', href: '/000010/pm-sheets', tag: 'Business' },
        { label: 'Life Tracker — Google Sheets', description: 'Your complete personal OS — all life areas in one system.', href: '/000012/lt-sheets', tag: 'Individuals' },
      ]},
      { label: 'Notion', result: [
        { label: 'Back Office — Notion', description: 'All six back office trackers rebuilt as a connected Notion workspace.', href: '/000009/bo-notion', tag: 'Business' },
        { label: 'Project Management — Notion', description: 'Project folders, version control, and brand sets — all linked.', href: '/000010/pm-notion', tag: 'Business' },
        { label: 'Life Tracker — Notion', description: 'The full Life Tracker rebuilt as one connected Notion workspace.', href: '/000012/lt-notion', tag: 'Individuals' },
      ]},
      { label: 'Not sure yet', result: [
        { label: 'Business Tools', description: 'Browse all Google Sheets and Notion templates for business.', href: '/business', tag: 'Business' },
        { label: 'Individuals Tools', description: 'Browse all Google Sheets and Notion templates for personal life.', href: '/individuals', tag: 'Individuals' },
      ]},
    ],
  },
]

const NODE_MAP = Object.fromEntries(TREE.map(n => [n.id, n]))

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: Result }) {
  const tagColors: Record<string, string> = {
    Business: '#7BBFA0', Individuals: '#7BBFA0',
    Course: '#FFC864', Service: 'rgba(232,228,220,0.6)',
  }
  const color = tagColors[result.tag] ?? '#7BBFA0'

  return (
    <Link href={result.href} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          background: 'rgba(123,191,160,0.05)',
          border: `1px solid rgba(123,191,160,0.15)`,
          display: 'flex', alignItems: 'center', gap: 16,
          transition: 'background 0.15s, border-color 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(123,191,160,0.1)'
          e.currentTarget.style.borderColor = 'rgba(123,191,160,0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(123,191,160,0.05)'
          e.currentTarget.style.borderColor = 'rgba(123,191,160,0.15)'
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#E8E4DC', fontWeight: 500 }}>{result.label}</p>
            <span style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 100,
              background: `${color}15`, border: `1px solid ${color}30`,
              color, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>{result.tag}</span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(232,228,220,0.45)', lineHeight: 1.6 }}>{result.description}</p>
        </div>
        <span style={{ color: '#7BBFA0', fontSize: 16, flexShrink: 0 }}>→</span>
      </div>
    </Link>
  )
}

// ─── Choice button ────────────────────────────────────────────────────────────

function ChoiceButton({ choice, onClick }: { choice: Choice; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left',
        padding: '14px 18px', borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#E8E4DC', cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s, border-color 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(123,191,160,0.08)'
        e.currentTarget.style.borderColor = 'rgba(123,191,160,0.25)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 14, color: '#E8E4DC', fontWeight: 500 }}>{choice.label}</p>
        {choice.description && (
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(232,228,220,0.4)' }}>{choice.description}</p>
        )}
      </div>
      <span style={{ color: 'rgba(123,191,160,0.6)', fontSize: 14, flexShrink: 0 }}>→</span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface GetStartedChatProps {
  open: boolean
  onClose: () => void
}

export default function GetStartedChat({ open, onClose }: GetStartedChatProps) {
  const [history, setHistory] = useState<string[]>(['start']) // stack of node ids
  const [results, setResults] = useState<Result[] | null>(null)

  const currentId = history[history.length - 1]
  const currentNode = NODE_MAP[currentId]
  const canGoBack = history.length > 1

  function handleChoice(choice: Choice) {
    if (choice.result) {
      setResults(choice.result)
    } else if (choice.next) {
      setHistory(h => [...h, choice.next!])
      setResults(null)
    }
  }

  function goBack() {
    if (results) {
      setResults(null)
      return
    }
    setHistory(h => h.slice(0, -1))
  }

  function reset() {
    setHistory(['start'])
    setResults(null)
  }

  // Reset when closed
  function handleClose() {
    onClose()
    setTimeout(reset, 400)
  }

  const progress = results
    ? 100
    : Math.round(((history.length - 1) / 3) * 100)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '100%', maxWidth: 460,
        background: '#0E0F11',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-24px 0 80px rgba(0,0,0,0.6)',
      }}>

        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0' }}>
              Find your tools
            </p>
            {/* Progress bar */}
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 100,
                background: '#7BBFA0',
                width: `${progress}%`,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>

          {/* Back button */}
          {canGoBack && (
            <button
              onClick={goBack}
              style={{
                padding: '6px 12px', borderRadius: 100,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(232,228,220,0.5)', fontSize: 12,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.color = 'rgba(232,228,220,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(232,228,220,0.5)'
              }}
            >
              ← Back
            </button>
          )}

          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(232,228,220,0.45)', fontSize: 18,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'inherit', lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>

          {results ? (
            /* Results screen */
            <div>
              <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0' }}>
                Your match{results.length > 1 ? 'es' : ''}
              </p>
              <h2 style={{
                margin: '0 0 6px',
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300, fontSize: 28,
                color: '#E8E4DC', lineHeight: 1.2,
              }}>
                Here's where to start.
              </h2>
              <p style={{ margin: '0 0 28px', fontSize: 13, color: 'rgba(232,228,220,0.4)', lineHeight: 1.7 }}>
                Click any card to go to that page and see everything it includes.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.map(r => <ResultCard key={r.href} result={r} />)}
              </div>

              {/* Start over */}
              <button
                onClick={reset}
                style={{
                  marginTop: 28, width: '100%',
                  padding: '11px', borderRadius: 100,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(232,228,220,0.35)', fontSize: 12,
                  letterSpacing: '0.06em', cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'rgba(232,228,220,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(232,228,220,0.35)'
                }}
              >
                Start over
              </button>
            </div>
          ) : (
            /* Question screen */
            <div>
              <h2 style={{
                margin: '0 0 6px',
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300, fontSize: 26,
                color: '#E8E4DC', lineHeight: 1.25,
              }}>
                {currentNode.question}
              </h2>
              {currentNode.subtitle && (
                <p style={{ margin: '0 0 24px', fontSize: 13, color: 'rgba(232,228,220,0.4)' }}>
                  {currentNode.subtitle}
                </p>
              )}
              {!currentNode.subtitle && <div style={{ height: 24 }} />}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentNode.choices.map(choice => (
                  <ChoiceButton
                    key={choice.label}
                    choice={choice}
                    onClick={() => handleChoice(choice)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ewSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
