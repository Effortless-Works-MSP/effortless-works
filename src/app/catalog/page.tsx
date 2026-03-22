import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'All Tools | Effortless Works' }

const SERVICES = [
  {
    name: 'Website Builder',
    description: 'A fully designed, production-ready website built to your brand and requirements. From landing pages to multi-page sites.',
    href: 'https://www.fiverr.com/s/zWw3REe',
    tags: ['Next.js', 'Custom Design', 'SEO Ready'],
    external: true,
  },
  {
    name: 'App Builder',
    description: 'Custom web applications tailored to your business workflow — dashboards, portals, tools.',
    href: 'https://www.fiverr.com/s/jjzVZzw',
    tags: ['Web App', 'Dashboard', 'Custom'],
    external: true,
  },
  {
    name: 'Custom Google Sheets',
    description: 'A personalized Google Sheets system built around how your business actually works.',
    href: 'https://www.fiverr.com/s/1qlNwDK',
    tags: ['Google Sheets', 'Automation', 'Tailored'],
    external: true,
  },
  {
    name: 'Custom Notion Workspace',
    description: 'A complete Notion setup designed specifically for your life, team, or business.',
    href: 'https://www.fiverr.com/s/VYl34AV',
    tags: ['Notion', 'Workspace', 'Tailored'],
    external: true,
  },
]

const CATALOG = [
  {
    category: 'Business Systems',
    eyebrow: 'Run your business',
    tools: [
      {
        name: 'Business Dashboard',
        description: 'One connected hub for your entire business — back office, projects, KPIs, and growth all in one place.',
        href: '/business-dashboard',
        comingSoon: true,
        tags: ['Operations', 'Overview'],
      },
      {
        name: 'Back Office',
        description: 'Sales, clients, KPIs, payroll — the operational layer that keeps your business running smoothly.',
        href: '/back-office',
        tags: ['Sales', 'Clients', 'KPIs'],
      },
      {
        name: 'Project Management',
        description: 'Goals, timelines, delivery — track every project from idea to done.',
        href: '/project-management',
        tags: ['Projects', 'Goals', 'Timelines'],
      },
      {
        name: 'Career Compass',
        description: 'Skills, path, milestones — build your career with intention and direction.',
        href: '/career-compass',
        comingSoon: true,
        tags: ['Career', 'Skills', 'Growth'],
      },
    ],
  },
  {
    category: 'Personal Systems',
    eyebrow: 'Run your life',
    tools: [
      {
        name: 'Life Tracker',
        description: 'Your personal command center — everything about your life, health, habits, and goals in one place.',
        href: '/life-tracker',
        tags: ['Overview', 'Wellbeing'],
      },
      {
        name: 'Personal Trackers',
        description: 'Health, habits, finances — the daily systems that keep you on track and moving forward.',
        href: '/personal-trackers',
        tags: ['Health', 'Habits', 'Finance'],
      },
      {
        name: 'Personal Projects',
        description: 'Ideas, side projects, goals — capture and build the things that matter to you outside of work.',
        href: '/personal-projects',
        tags: ['Projects', 'Ideas', 'Goals'],
      },
      {
        name: 'Connection Keeper',
        description: 'Stay close to the people who matter. Track relationships, remember details, show up intentionally.',
        href: '/connection-keeper',
        comingSoon: true,
        tags: ['Relationships', 'People'],
      },
      {
        name: 'Journey Planner',
        description: 'Plan every trip with intention, capture every memory, and build a living record of your experiences.',
        href: '/journey-planner',
        comingSoon: true,
        tags: ['Travel', 'Memories'],
      },
      {
        name: 'Creative Studio',
        description: 'A dedicated workspace for your creative practice — ideas, projects, drafts, and the habit of showing up.',
        href: '/creative-studio',
        comingSoon: true,
        tags: ['Creativity', 'Projects'],
      },
    ],
  },
]

function ToolCard({ name, description, href, comingSoon, tags }: {
  name: string
  description: string
  href: string
  comingSoon?: boolean
  tags: string[]
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="catalog-card" style={{
        padding: '28px 32px',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'pointer',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 400,
            fontSize: 22,
            color: '#E8E4DC',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>{name}</h3>
          {comingSoon && (
            <span style={{
              flexShrink: 0,
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9B8ED4',
              background: 'rgba(155,142,212,0.1)',
              border: '1px solid rgba(155,142,212,0.2)',
              borderRadius: 100,
              padding: '4px 10px',
              marginTop: 3,
            }}>Soon</span>
          )}
        </div>

        <p style={{
          fontSize: 13,
          color: 'rgba(232,228,220,0.45)',
          lineHeight: 1.75,
          margin: 0,
          flex: 1,
        }}>{description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,220,0.25)',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 6,
              padding: '3px 8px',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function CatalogPage() {
  return (
    <>
      <style>{`
        .catalog-card:hover {
          border-color: rgba(123,191,160,0.25) !important;
          background: rgba(123,191,160,0.04) !important;
        }
      `}</style>

      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={60} />
        <PageWrapper>
          <div style={{ padding: '80px 0 160px' }}>

            {/* Header */}
            <div style={{ marginBottom: 72 }}>
              <p style={{
                fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(232,228,220,0.3)', margin: '0 0 20px',
              }}>Everything we make</p>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(42px, 5.5vw, 68px)',
                color: '#E8E4DC',
                margin: '0 0 20px',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>All tools</h1>
              <p style={{
                fontSize: 15,
                color: 'rgba(232,228,220,0.42)',
                lineHeight: 1.8,
                maxWidth: 480,
                margin: 0,
              }}>
                Every system we build lives here. Ready-to-use today, or being built for you this year.
              </p>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
              {CATALOG.map(section => (
                <div key={section.category}>
                  {/* Section header */}
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 16,
                    marginBottom: 32,
                    paddingBottom: 20,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <h2 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontWeight: 400,
                      fontSize: 28,
                      color: '#E8E4DC',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}>{section.category}</h2>
                    <span style={{
                      fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'rgba(232,228,220,0.25)',
                    }}>{section.eyebrow}</span>
                  </div>

                  {/* Tool grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 16,
                  }}>
                    {section.tools.map(tool => (
                      <ToolCard key={tool.name} {...tool} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

              {/* Custom Building Services */}
              <div>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 16,
                  marginBottom: 32,
                  paddingBottom: 20,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 400, fontSize: 28,
                    color: '#E8E4DC', margin: 0, letterSpacing: '-0.01em',
                  }}>Custom Building</h2>
                  <span style={{
                    fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(232,228,220,0.25)',
                  }}>Built for you, on Fiverr</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 16,
                }}>
                  {SERVICES.map(service => (
                    <a
                      key={service.name}
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div className="catalog-card" style={{
                        padding: '28px 32px',
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'border-color 0.2s, background 0.2s',
                        cursor: 'pointer',
                        height: '100%',
                        boxSizing: 'border-box' as const,
                        display: 'flex',
                        flexDirection: 'column' as const,
                        gap: 12,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <h3 style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontWeight: 400, fontSize: 22,
                            color: '#E8E4DC', margin: 0,
                            lineHeight: 1.2, letterSpacing: '-0.01em',
                          }}>{service.name}</h3>
                          <span style={{
                            flexShrink: 0, fontSize: 9, letterSpacing: '0.18em',
                            textTransform: 'uppercase' as const,
                            color: '#7BBFA0',
                            background: 'rgba(123,191,160,0.08)',
                            border: '1px solid rgba(123,191,160,0.2)',
                            borderRadius: 100, padding: '4px 10px', marginTop: 3,
                          }}>Fiverr ↗</span>
                        </div>
                        <p style={{
                          fontSize: 13, color: 'rgba(232,228,220,0.45)',
                          lineHeight: 1.75, margin: 0, flex: 1,
                        }}>{service.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                          {service.tags.map(tag => (
                            <span key={tag} style={{
                              fontSize: 10, letterSpacing: '0.1em',
                              textTransform: 'uppercase' as const,
                              color: 'rgba(232,228,220,0.25)',
                              background: 'rgba(255,255,255,0.04)',
                              borderRadius: 6, padding: '3px 8px',
                            }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            {/* Bottom CTA */}
            <div style={{
              marginTop: 96,
              paddingTop: 48,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24,
            }}>
              <p style={{
                fontSize: 14, color: 'rgba(232,228,220,0.35)',
                margin: 0, maxWidth: 400, lineHeight: 1.7,
              }}>
                Not sure where to start? Let us help you find the right system for where you are right now.
              </p>
              <Link href="/#products" style={{
                padding: '11px 26px',
                borderRadius: 100,
                background: '#7BBFA0',
                color: '#0C0D0E',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                flexShrink: 0,
              }}>Set up my space</Link>
            </div>

          </div>
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
