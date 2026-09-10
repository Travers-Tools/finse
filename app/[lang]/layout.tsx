import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANGS, htmlLang, isLang } from '@/lib/i18n'
import '../globals.css'

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const en = params.lang === 'en'
  return {
    title: en ? 'Hotel Finse1222 – Corporate bookings' : 'Hotel Finse1222 – Bedriftsbooking',
    description: en
      ? 'Finse for business. Step out of the everyday, at Finse. Find focus and calm 1,222 metres above sea level.'
      : 'Finse for bedrifter. Finn fokus og ro 1222 meter over havet. Ingen forstyrrelser, bare dere og fjellet.',
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLang(params.lang)) notFound()
  return (
    <html lang={htmlLang(params.lang)}>
      <head>
        <link rel="preload" href="/fonts/orpheus-pro.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
