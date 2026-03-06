'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import { CONTACT_META } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width: '100%', background: '#131416',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12, padding: '13px 16px',
    fontSize: 14, color: '#E8E4DC',
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E' }}>
        <ParallaxStars count={100} />
        <PageWrapper maxWidth={900}>
          <PageHero {...CONTACT_META} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 60, marginTop: 64, marginBottom: 100,
            alignItems: 'start',
          }}>
            {/* Left — contact options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '✉', label: 'Email', value: 'hello@effortlessworks.store', href: 'mailto:hello@effortlessworks.store' },
                { icon: '◈', label: 'Community', value: 'Join the Discord', href: '#', note: 'Coming soon' },
                { icon: '◎', label: 'Effortless Quest', value: 'Network & play', href: '#', note: 'Coming soon' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '20px 22px', borderRadius: 16,
                  background: '#131416',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 18, color: '#7BBFA0', marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 4 }}>
                      {item.label}
                    </p>
                    <a href={item.href} style={{ fontSize: 14, color: '#E8E4DC', textDecoration: 'none' }}>
                      {item.value}
                    </a>
                    {item.note && (
                      <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.3)', marginTop: 3, letterSpacing: '0.05em' }}>
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right — contact form */}
            {sent ? (
              <div style={{
                padding: '60px 40px', borderRadius: 20,
                background: '#131416', border: '1px solid rgba(123,191,160,0.2)',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontStyle: 'italic', color: '#7BBFA0', marginBottom: 12 }}>
                  Message received ✦
                </p>
                <p style={{ fontSize: 14, color: 'rgba(232,228,220,0.5)' }}>
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <div style={{
                padding: '40px', borderRadius: 20,
                background: '#131416',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <input placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = '#7BBFA0')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                  <input placeholder="Email address" type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = '#7BBFA0')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                </div>
                <input placeholder="Subject" value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#7BBFA0')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
                <textarea placeholder="Your message..." value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#7BBFA0')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
                <button
                  onClick={() => { if (form.name && form.email && form.message) setSent(true) }}
                  style={{
                    padding: '14px', borderRadius: 100,
                    background: '#7BBFA0', color: '#0C0D0E',
                    border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, letterSpacing: '0.08em',
                    fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#8fd4b4')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#7BBFA0')}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
