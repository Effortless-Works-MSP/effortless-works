import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Areas from '@/components/sections/Areas'
import Quote from '@/components/sections/Quote'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Areas />
        <Quote />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
