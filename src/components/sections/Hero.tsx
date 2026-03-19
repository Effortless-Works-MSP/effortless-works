'use client'

import Link from 'next/link'
import HeroIllustration from './HeroIllustration'
import ParallaxStars from '@/components/ui/ParallaxStars'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden"
    >
      <ParallaxStars count={200} />
      <HeroIllustration /> 
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '20%', right: '-10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(123,191,160,0.08) 0%, transparent 70%)',
        }}
      />

      <p
        className="text-sm tracking-widest uppercase mb-7 opacity-0 animate-fade-up animation-delay-200 text-center md:text-left"
        style={{ color: 'var(--sage)' }}
      >
        Your whole life, organized
      </p>

      <h1
        className="font-serif font-light leading-tight opacity-0 animate-fade-up animation-delay-400 text-center md:text-left"
        style={{
          fontSize: 'clamp(40px, 7vw, 96px)',
          color: 'var(--text)',
          maxWidth: 780,
          letterSpacing: '-0.01em',
        }}
      >
        A home for every{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>version of you.</em>
      </h1>

      <p
        className="mt-7 text-md leading-loose max-w-md opacity-0 animate-fade-up animation-delay-600 text-center md:text-left mx-auto md:mx-0"
        style={{ color: 'var(--text-dim)' }}
      >
        Templates, spreadsheets, and courses for the person who is building something — in business, in life, family and faith.
      </p>

      <div className="mt-11 flex gap-4 items-center opacity-0 animate-fade-up animation-delay-800 justify-center md:justify-start">
        <Link
          href="#products"
          className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 no-underline"
          style={{ background: 'var(--sage)', color: 'var(--bg)' }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#8fd4b4'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--sage)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Help Me Build My Dreams
        </Link>
        <Link
          href="#about"
          className="text-sm tracking-wide flex items-center gap-2 transition-colors duration-200 no-underline after:content-['→']"
          style={{ color: 'var(--text-dim)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          See how it works
        </Link>
      </div>

      <div
        className="absolute bottom-10 left-6 md:left-16 text-xs tracking-widest uppercase flex items-center gap-3 opacity-0 animate-fade-up animation-delay-1200"
        style={{ color: 'var(--text-faint)' }}
      >
        <span className="block w-10 h-px" style={{ background: 'var(--text-faint)' }} />
        Scroll
      </div>
    </section>
  )
}
