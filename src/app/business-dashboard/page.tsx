import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ComingSoonPage from '@/components/ui/ComingSoonPage'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'Business Dashboard | Effortless Works' }

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={80} />
        <PageWrapper>
          <ComingSoonPage
            eyebrow="Business Systems — Being Built"
            name="Business Dashboard"
            description="One connected hub for your entire business — Back Office, Project Management, KPIs, and growth all linked and visible in one place."
            includes={['Back Office Integration', 'Project Management Hub', 'KPI Overview', 'Revenue Dashboard', 'Team Hub']}
          />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
