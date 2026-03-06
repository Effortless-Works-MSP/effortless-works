'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useState } from 'react'

const PILLARS = [
  { icon: '🏆', title: 'Leaderboards & Rewards', description: 'Businesses and individuals compete in a real-life gamified system with weekly, monthly, and yearly rewards for top performers.' },
  { icon: '🤝', title: 'Business Center', description: 'Network with other mission-driven businesses. Collaborate, compete, and grow together in a community built around real results.' },
  { icon: '📚', title: 'Education Center', description: 'Access learning resources, courses, and knowledge to level up your skills and business — all inside the Quest ecosystem.' },
  { icon: '❤️', title: 'Charity Center', description: 'Earn rewards for doing good. Businesses that complete charity tasks and give back are celebrated and elevated on the platform.' },
  { icon: '💡', title: 'Invention Center', description: 'A space to bring new ideas to life. Share concepts, get feedback, and connect with collaborators inside the Quest community.' },
  { icon: '👥', title: 'My Team Center', description: 'Build and manage your team inside Quest. Track collective progress, assign challenges, and celebrate wins together.' },
]

export default function QuestAboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', color: '#E8E4DC', fontFamily: 'inherit' }}>
      {/* Animated stars background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(1px 1px at 15% 25%, rgba(123,191,160,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 10%, rgba(232,228,220,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 45% 60%, rgba(123,191,160,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 75%, rgba(232,228,220,0.2) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 90%, rgba(123,191,160,0.25) 0%, transparent 100%),
          linear-gradient(rgba(123,191,160,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,191,160,0.02) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, auto, auto, auto, 48px 48px, 48px 48px',
      }} />
      <div style={{
        position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 600,
        background: 'radial-gradient(ellipse, rgba(123,191,160,0.08) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '56px 40px 100px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 44, fontSize: 12, color: 'rgba(232,228,220,0.3)', letterSpacing: '0.08em' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#7BBFA0' }}>Quest</span>
          <span>›</span>
          <span style={{ color: 'rgba(232,228,220,0.6)' }}>About</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100, marginBottom: 24,
            background: 'rgba(123,191,160,0.08)', color: '#7BBFA0',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
            border: '1px solid rgba(123,191,160,0.2)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7BBFA0', animation: 'pulse 2s infinite' }} />
            Coming Soon — Join the Waitlist
          </div>

          <h1 style={{
            margin: '0 0 20px', fontSize: 'clamp(38px, 7vw, 64px)',
            fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #E8E4DC 0%, #7BBFA0 60%, #E8E4DC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Effortless Quest
          </h1>
          <p style={{ margin: '0 auto', fontSize: 17, color: 'rgba(232,228,220,0.5)', lineHeight: 1.8, maxWidth: 580 }}>
            A gamified community platform where people who love personal development and building businesses compete, collaborate, and grow together — in a real-life game with real rewards.
          </p>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(123,191,160,0.4), transparent)', marginBottom: 56 }} />

        {/* What is it */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 20, fontWeight: 500 }}>
            What is Effortless Quest?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(232,228,220,0.55)', lineHeight: 1.85, maxWidth: 680, margin: 0 }}>
            Effortless Quest is a place to network with other people and businesses in a gamified environment. Businesses compete in a real-life game with monthly, weekly, and yearly rewards for participants. There are rewards at the individual level too — and special recognition for businesses that do charity work and complete community-driven tasks.
          </p>
        </div>

        {/* Pillars grid */}
        <h2 style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 24, fontWeight: 500 }}>
          The Six Centers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16, marginBottom: 60 }}>
          {PILLARS.map(p => (
            <div key={p.title} style={{
              background: '#131416', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(123,191,160,0.3), transparent)',
              }} />
              <div style={{ fontSize: 22 }}>{p.icon}</div>
              <h3 style={{ margin: 0, fontSize: 15, color: '#E8E4DC', fontWeight: 500 }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(232,228,220,0.4)', lineHeight: 1.65 }}>{p.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/000005/howtoplay" style={{
            display: 'inline-block', padding: '13px 32px', borderRadius: 100,
            background: '#7BBFA0', color: '#0C0D0E',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none',
          }}>
            How To Play →
          </Link>
          <Link href="/000005/roadmap" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 100,
            border: '1px solid rgba(123,191,160,0.22)', color: '#7BBFA0',
            fontSize: 13, letterSpacing: '0.06em', textDecoration: 'none',
          }}>
            See the Road Map
          </Link>
        </div>
      </div>
    </main>
      <Footer />
    </>
  )
}
