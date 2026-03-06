'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import ParallaxStars from '@/components/ui/ParallaxStars'

const ROADMAP = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'In Progress',
    statusColor: '#7BBFA0',
    items: [
      { name: 'Website Structure Skeleton', done: true },
      { name: 'Core page layouts built', done: true },
      { name: 'Navigation system complete', done: true },
      { name: 'Quest About & How To Play pages', done: true },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Leaderboards & Rewards Center',
    status: 'Coming Soon',
    statusColor: '#FFC864',
    items: [
      { name: 'Individual leaderboard', done: false },
      { name: 'Business leaderboard', done: false },
      { name: 'Weekly / Monthly / Yearly reward cycles', done: false },
      { name: 'Points system', done: false },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'My Team Center',
    status: 'Planned',
    statusColor: 'rgba(232,228,220,0.35)',
    items: [
      { name: 'Team creation and management', done: false },
      { name: 'Team challenges and collective scoring', done: false },
      { name: 'Team leaderboard', done: false },
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Business & Education Centers',
    status: 'Planned',
    statusColor: 'rgba(232,228,220,0.35)',
    items: [
      { name: 'Business networking hub', done: false },
      { name: 'Education center with courses and resources', done: false },
      { name: 'Business challenge tasks', done: false },
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Charity & Invention Centers',
    status: 'Planned',
    statusColor: 'rgba(232,228,220,0.35)',
    items: [
      { name: 'Charity task system with bonus rewards', done: false },
      { name: 'Invention center — idea sharing and collaboration', done: false },
      { name: 'Community voting on inventions', done: false },
    ],
  },
  {
    phase: 'Phase 6',
    title: 'Full Launch',
    status: 'Future',
    statusColor: 'rgba(123,191,160,0.4)',
    items: [
      { name: 'Public launch with onboarding flow', done: false },
      { name: 'Real rewards program activated', done: false },
      { name: 'Integration with Effortless Works tools', done: false },
      { name: 'Community events and campaigns', done: false },
    ],
  },
]

export default function QuestRoadmapPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', color: '#E8E4DC', fontFamily: 'inherit' , position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '56px 40px 100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 44, fontSize: 12, color: 'rgba(232,228,220,0.3)', letterSpacing: '0.08em' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/000005/about" style={{ color: 'inherit', textDecoration: 'none' }}>Quest</Link>
          <span>›</span>
          <span style={{ color: '#7BBFA0' }}>Road Map</span>
        </div>

        <div style={{ marginBottom: 52 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 14px', borderRadius: 100, marginBottom: 20,
            background: 'rgba(123,191,160,0.08)', color: '#7BBFA0',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
            border: '1px solid rgba(123,191,160,0.2)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7BBFA0' }} />
            What's Coming Next
          </span>
          <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(34px, 6vw, 54px)', fontWeight: 600, lineHeight: 1.08, color: '#7BBFA0', letterSpacing: '-0.02em' }}>
            Road Map
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: 'rgba(232,228,220,0.5)', lineHeight: 1.75, maxWidth: 520 }}>
            Effortless Quest is being built in phases. Here's the full plan — where we are, what's coming, and the long-term vision.
          </p>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(123,191,160,0.4), transparent)', marginBottom: 52 }} />

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ROADMAP.map((phase, i) => (
            <div key={phase.phase} style={{ display: 'flex', gap: 0 }}>
              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', flexShrink: 0, marginTop: 22,
                  background: phase.statusColor,
                  boxShadow: phase.status === 'In Progress' ? `0 0 12px ${phase.statusColor}` : 'none',
                }} />
                {i < ROADMAP.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.07)', minHeight: 24, marginTop: 4 }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 32, paddingLeft: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: 'rgba(232,228,220,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {phase.phase}
                  </span>
                  <span style={{
                    padding: '2px 10px', borderRadius: 100, fontSize: 10,
                    background: `${phase.statusColor}18`, color: phase.statusColor,
                    border: `1px solid ${phase.statusColor}30`, letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {phase.status}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 14px', fontSize: 18, color: '#E8E4DC', fontWeight: 500 }}>
                  {phase.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {phase.items.map(item => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                        background: item.done ? 'rgba(123,191,160,0.2)' : 'transparent',
                        border: `1px solid ${item.done ? '#7BBFA0' : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: '#7BBFA0',
                      }}>
                        {item.done ? '✓' : ''}
                      </span>
                      <span style={{ fontSize: 13, color: item.done ? 'rgba(232,228,220,0.55)' : 'rgba(232,228,220,0.3)', lineHeight: 1.5 }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
          <Link href="/000005/about" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 100,
            border: '1px solid rgba(123,191,160,0.22)', color: '#7BBFA0',
            fontSize: 13, letterSpacing: '0.06em', textDecoration: 'none',
          }}>← About Quest</Link>
          <Link href="/000005/howtoplay" style={{
            display: 'inline-block', padding: '13px 32px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none',
          }}>How To Play →</Link>
        </div>
      </div>
    </main>
      <Footer />
    </>
  )
}
