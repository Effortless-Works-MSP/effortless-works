import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { LT_SHEETS_META, LT_SHEETS_SECTION } from '@/lib/pageData'

export const metadata: Metadata = {
  title: 'Life Tracker · Google Sheets | Effortless Works',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E' }}>
        <PageWrapper>
          <PageHero {...LT_SHEETS_META} />
          <ProductSectionBlock section={LT_SHEETS_SECTION} index={0} />
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
