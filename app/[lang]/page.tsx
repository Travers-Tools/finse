'use client'

import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'
import ContentSections from '@/app/components/ContentSections'
import PackagesSection from '@/app/components/PackagesSection'
import TestimonialsSection from '@/app/components/TestimonialsSection'
import TeamSection from '@/app/components/TeamSection'
import Footer from '@/app/components/Footer'
import FAQSection from '@/app/components/FAQSection'

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  return (
    <div className="landing-page">
      <Header />
      <Hero lang={lang} />
      {/* <ContentSections lang={lang} /> */}
      <PackagesSection />
      <TestimonialsSection lang={lang} />
      <TeamSection lang={lang} />
      <FAQSection />
      <Footer />
    </div>
  )
}
