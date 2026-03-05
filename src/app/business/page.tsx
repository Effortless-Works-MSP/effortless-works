import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { BUSINESS_META, BUSINESS_SECTIONS } from '@/lib/pageData'

export const metadata: Metadata = {
  title: 'Business Templates | Effortless Works',
  description: 'Google Sheets and Notion templates for business — project management, back office, and more.',
}

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E' }}>
        <PageWrapper>
          <PageHero {...BUSINESS_META} />
          {BUSINESS_SECTIONS.map((section, i) => (
            <ProductSectionBlock key={section.id} section={section} index={i} />
          ))}
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
