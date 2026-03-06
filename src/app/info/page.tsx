import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import { INFO_META } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export default function InfoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper maxWidth={900}>
          <PageHero {...INFO_META} />

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 48, marginTop: 64,
          }}>
            {/* Mission */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 14 }}>
                The Mission
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: 28, color: '#E8E4DC', marginBottom: 16, lineHeight: 1.3,
              }}>
                Built for the person doing <em style={{ fontStyle: 'italic', color: '#7BBFA0' }}>all of it.</em>
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(232,228,220,0.55)', lineHeight: 1.9 }}>
                Effortless Works started with a simple belief: the people building businesses are the same people working on their faith, their health, their families, and themselves — all at once.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(232,228,220,0.55)', lineHeight: 1.9, marginTop: 14 }}>
                Most productivity tools only see half the picture. We built ours for the full person.
              </p>
            </div>

            {/* What we make */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 14 }}>
                What We Make
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Google Sheets Templates', desc: 'Powerful, ready-to-use spreadsheet systems for business and life.' },
                  { label: 'Notion Workspaces', desc: 'Beautiful Notion templates that connect every area of what you do.' },
                  { label: 'Courses', desc: 'Self-paced and instructor-led courses bundled with every tool.' },
                  { label: 'Custom Builds', desc: 'We build bespoke websites, apps, and systems on Fiverr.' },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: '16px 18px', borderRadius: 14,
                    background: '#131416', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7BBFA0', marginTop: 6, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 13, color: '#E8E4DC', fontWeight: 500, marginBottom: 3 }}>{item.label}</p>
                      <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.45)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Muslim Success Path connection */}
          <div style={{
            marginTop: 60, marginBottom: 100,
            padding: '36px 40px', borderRadius: 20,
            background: 'linear-gradient(145deg, #161e1a 0%, #131416 100%)',
            border: '1px solid rgba(123,191,160,0.18)',
            display: 'flex', gap: 28, alignItems: 'center',
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 10 }}>
                Part of Something Bigger
              </p>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: 24, color: '#E8E4DC', marginBottom: 12,
              }}>
                Muslim Success Path
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(232,228,220,0.55)', lineHeight: 1.8, maxWidth: 480 }}>
                Effortless Works is part of the Muslim Success Path ecosystem — a growing collection of tools, resources, and community built for Muslims who want to thrive in every area of their life.
              </p>
            </div>
            <style>{`.msp-link:hover { background: #7BBFA0 !important; color: #0C0D0E !important; }`}</style>
            <a href="https://www.muslimsuccesspath.com" target="_blank" rel="noopener noreferrer"
              className="msp-link"
              style={{
                padding: '12px 24px', borderRadius: 100,
                border: '1px solid rgba(123,191,160,0.3)',
                color: '#7BBFA0', fontSize: 12, letterSpacing: '0.08em',
                textDecoration: 'none', whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Visit Site ↗
            </a>
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
