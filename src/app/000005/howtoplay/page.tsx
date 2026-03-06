'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import ParallaxStars from '@/components/ui/ParallaxStars'

const STEPS = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up as an Individual or a Business. Set your goals, choose your focus areas, and introduce yourself to the Quest community.',
    tags: ['Individual', 'Business', 'Profile', 'Goals'],
  },
  {
    number: '02',
    title: 'Join the Game',
    description: 'Effortless Quest runs as a living game. Accept weekly and monthly challenges across the six centers — Business, Education, Charity, Invention, and more.',
    tags: ['Challenges', 'Weekly', 'Monthly', 'Centers'],
  },
  {
    number: '03',
    title: 'Complete Tasks & Earn Points',
    description: 'Every completed task earns points toward your individual and business rank. Charity tasks earn bonus points and special recognition on the leaderboard.',
    tags: ['Points', 'Tasks', 'Charity Bonus', 'Ranking'],
  },
  {
    number: '04',
    title: 'Climb the Leaderboard',
    description: 'Watch your rank rise weekly, monthly, and yearly. Top businesses and individuals are celebrated and earn real rewards at every milestone.',
    tags: ['Leaderboard', 'Rank', 'Weekly', 'Yearly Rewards'],
  },
  {
    number: '05',
    title: 'Build Your Team',
    description: 'Invite your team to Quest. Collaborate on team challenges, track collective progress in My Team Center, and multiply your impact together.',
    tags: ['Team', 'Collaboration', 'My Team Center', 'Multiplier'],
  },
  {
    number: '06',
    title: 'Network & Grow',
    description: 'Connect with other businesses and individuals who are actively building. Quest is designed for people who take growth seriously and want a community that does too.',
    tags: ['Network', 'Community', 'Partnerships', 'Growth'],
  },
]

const REWARDS = [
  { period: 'Weekly', description: 'Top performers earn recognition and points bonuses each week.', color: '#7BBFA0' },
  { period: 'Monthly', description: 'Monthly leaderboard winners earn prizes and featured placement in the community.', color: '#FFC864' },
  { period: 'Yearly', description: 'Annual champions earn the biggest rewards — and their place in Quest history.', color: '#E8E4DC' },
]

export default function QuestHowToPlayPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', color: '#E8E4DC', fontFamily: 'inherit' , position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '56px 40px 100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 44, fontSize: 12, color: 'rgba(232,228,220,0.3)', letterSpacing: '0.08em' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/000005/about" style={{ color: 'inherit', textDecoration: 'none' }}>Quest</Link>
          <span>›</span>
          <span style={{ color: '#7BBFA0' }}>How To Play</span>
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
            Guide · Effortless Quest
          </span>
          <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(34px, 6vw, 54px)', fontWeight: 600, lineHeight: 1.08, color: '#7BBFA0', letterSpacing: '-0.02em' }}>
            How To Play
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: 'rgba(232,228,220,0.5)', lineHeight: 1.75, maxWidth: 560 }}>
            Effortless Quest is a living game layered on top of real life. Here's how it works from signing up to climbing the leaderboard.
          </p>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(123,191,160,0.4), transparent)', marginBottom: 52 }} />

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 60 }}>
          {STEPS.map((step, i) => (
            <div key={step.number} style={{
              background: '#131416', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '24px 28px',
              display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20, alignItems: 'start',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '5%', right: '5%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(123,191,160,0.25), transparent)',
              }} />
              <div style={{
                fontSize: 11, fontWeight: 600, color: '#7BBFA0', letterSpacing: '0.1em',
                paddingTop: 3, opacity: 0.7,
              }}>
                {step.number}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 style={{ margin: 0, fontSize: 16, color: '#E8E4DC', fontWeight: 500 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(232,228,220,0.4)', lineHeight: 1.7 }}>{step.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {step.tags.map(t => (
                    <span key={t} style={{
                      padding: '3px 10px', borderRadius: 100,
                      background: 'rgba(123,191,160,0.07)', border: '1px solid rgba(123,191,160,0.15)',
                      color: 'rgba(232,228,220,0.4)', fontSize: 11,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <h2 style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 24, fontWeight: 500 }}>
          Reward Cycles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 52 }}>
          {REWARDS.map(r => (
            <div key={r.period} style={{
              background: '#131416', border: `1px solid ${r.color}18`,
              borderRadius: 14, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <span style={{ fontSize: 12, color: r.color, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                {r.period}
              </span>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(232,228,220,0.4)', lineHeight: 1.65 }}>{r.description}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/000005/about" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 100,
            border: '1px solid rgba(123,191,160,0.22)', color: '#7BBFA0',
            fontSize: 13, letterSpacing: '0.06em', textDecoration: 'none',
          }}>← About Quest</Link>
          <Link href="/000005/roadmap" style={{
            display: 'inline-block', padding: '13px 32px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none',
          }}>See the Road Map →</Link>
        </div>
      </div>
    </main>
      <Footer />
    </>
  )
}
