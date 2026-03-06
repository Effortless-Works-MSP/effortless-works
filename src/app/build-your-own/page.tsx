'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import { BUILD_META, BUILD_SERVICES } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export default function BuildYourOwnPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper>
          <PageHero {...BUILD_META} />

          {/* Intro note */}
          <div style={{
            marginTop: 48, marginBottom: 16,
            padding: '20px 28px',
            background: 'rgba(123,191,160,0.06)',
            border: '1px solid rgba(123,191,160,0.15)',
            borderRadius: 16,
            display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <span style={{ fontSize: 18, marginTop: 1 }}>◎</span>
            <p style={{ fontSize: 13, color: 'rgba(232,228,220,0.65)', lineHeight: 1.8, margin: 0 }}>
              All custom work is handled through <strong style={{ color: '#E8E4DC' }}>Fiverr</strong>. Click any service below to submit your request — you'll be taken directly to the order page where you can describe your needs, timeline, and budget.
            </p>
          </div>

          {/* Services grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
            marginTop: 48,
          }}>
            {BUILD_SERVICES.map((service) => (
              <div key={service.id}
                style={{
                  background: '#131416',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '36px 32px',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  transition: 'transform 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'rgba(123,191,160,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div style={{
                  fontSize: 28, width: 52, height: 52,
                  background: 'rgba(123,191,160,0.08)',
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#7BBFA0',
                }}>
                  {service.icon}
                </div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300, fontSize: 24,
                  color: '#E8E4DC', margin: 0,
                }}>
                  {service.name}
                </h3>

                <p style={{
                  fontSize: 13, color: 'rgba(232,228,220,0.55)',
                  lineHeight: 1.8, margin: 0, flex: 1,
                }}>
                  {service.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {service.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 100,
                      background: 'rgba(123,191,160,0.06)',
                      border: '1px solid rgba(123,191,160,0.12)',
                      color: 'rgba(123,191,160,0.8)', letterSpacing: '0.06em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={service.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', textAlign: 'center',
                  padding: '11px', borderRadius: 100,
                  background: '#7BBFA0', color: '#0C0D0E',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.08em',
                  textDecoration: 'none', marginTop: 4,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#8fd4b4')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#7BBFA0')}
                >
                  {service.cta} ↗
                </a>
              </div>
            ))}
          </div>

          <div style={{ height: 100 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
