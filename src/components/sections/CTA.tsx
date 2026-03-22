'use client'

import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'

export default function CTA() {
  const leftRef = useReveal()
  const rightRef = useReveal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (email) setSubmitted(true)
  }

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 min-h-96"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div
        ref={leftRef as React.RefObject<HTMLDivElement>}
        className="reveal px-16 py-20 flex flex-col justify-center"
      >
        <p className="text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--sage)' }}>
          Join the waitlist
        </p>
        <h2
          className="font-serif font-light leading-tight mb-5"
          style={{ fontSize: 'clamp(32px, 3vw, 48px)', color: 'var(--text)' }}
        >
          New business models,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>coming soon.</em>
        </h2>
        <p className="text-md leading-loose max-w-sm" style={{ color: 'var(--text-dim)' }}>
          Be the first to know when new business-in-a-box models launch — fully built, Luma-powered, and ready to run.
        </p>
      </div>

      <div
        ref={rightRef as React.RefObject<HTMLDivElement>}
        className="reveal reveal-delay-2 px-16 py-20 flex flex-col justify-center gap-4 relative overflow-hidden"
        style={{
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: -100, right: -100,
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(123,191,160,0.08) 0%, transparent 70%)',
          }}
        />

        {submitted ? (
          <p className="font-serif font-light italic text-2xl" style={{ color: 'var(--sage)' }}>
            You're on the list. ✦
          </p>
        ) : (
          <>
            <p className="text-md leading-loose" style={{ color: 'var(--text-dim)' }}>
              No noise. Just early access to new business models — delivered to your inbox.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="flex-1 px-5 py-3.5 rounded-full text-md outline-none transition-colors duration-200"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3.5 rounded-full text-md font-medium whitespace-nowrap transition-colors duration-200"
                style={{ background: 'var(--sage)', color: 'var(--bg)', fontFamily: 'inherit' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#8fd4b4')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--sage)')}
              >
                Join waitlist
              </button>
            </div>
            <p className="text-sm tracking-wide" style={{ color: 'var(--text-faint)' }}>
              Free to join. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
