import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ComingSoonPage from '@/components/ui/ComingSoonPage'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'Connection Keeper | Effortless Works' }

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={80} />
        <PageWrapper>
          <ComingSoonPage
            eyebrow="Personal Systems — Being Built"
            name="Connection Keeper"
            description="The people in your life deserve more than a forgotten birthday and a late reply. A dedicated space to stay close, show up intentionally, and remember what matters most to the people who matter most to you."
            includes={[
              'People Directory — name, relationship type, how you met, birthday, location, and contact info all in one place',
              'Connection Log — a running record of every call, lunch, message, and visit with notes and any follow-ups you promised',
              'Milestone Tracker — birthdays, anniversaries, graduations, and big life events organised by person so nothing slips',
              'Reach-Out Planner — who you want to stay close to, how often, when you last connected, and your next scheduled date',
              'Memory Notes — meaningful moments, inside jokes, gifts you have given or received, and things they love or care about',
            ]}
          />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
