import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { PT_SHEETS_META, PT_SHEETS_SECTION } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = {
  title: 'Personal Trackers · Google Sheets | Effortless Works',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper>
           <PageHero {...PT_SHEETS_META} />
          <ProductSectionBlock section={PT_SHEETS_SECTION} index={0} />
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}