'use client'

import dynamic from 'next/dynamic'
import { useReveal } from '@/lib/useReveal'

import LumaLogoSVG from '@/components/LumaLogoSVG'

const STEPS = [
  {
    num: '01',
    label: 'Get Organized',
    desc: 'Start with the foundation. Use our tools to get your finances, goals, and operations in order — so your business has something solid to run on.',
    icon: '🗂️',
  },
  {
    num: '02',
    label: 'Pick a Business',
    desc: 'Browse business-in-a-box models — crocheting, content creation, automated sales, 3D printing, and more. Every model is fully designed and tested.',
    icon: '💼',
  },
  {
    num: '03',
    label: 'Luma Runs It',
    desc: 'Plug Luma in and step back. Orders, marketing, inventory, outreach — Luma handles your operations while you focus on what matters.',
    icon: '🪞',
  },
]

export default function HowItWorks() {
  const ref = useReveal()

  return (
    <section
      id="how-it-works"
      className="px-6 md:px-16 py-24"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="reveal mb-16">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--sage)' }}>
          How it works
        </p>
        <h2
          className="font-serif font-light leading-tight"
          style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--text)', maxWidth: 600 }}
        >
          Three steps to a{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>running business.</em>
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="flex flex-col gap-5 px-10 py-12"
            style={{
              background: 'var(--surface)',
              borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="font-serif font-light"
                style={{ fontSize: '2.8rem', color: 'var(--sage)', opacity: 0.3, lineHeight: 1 }}
              >
                {step.num}
              </span>
              {step.icon === '🪞'
                ? <LumaLogoSVG size={72} />
                : <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
              }
            </div>
            <h3
              className="font-serif font-light"
              style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', color: 'var(--text)' }}
            >
              {step.label}
            </h3>
            <p className="text-sm leading-loose" style={{ color: 'var(--text-dim)' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
