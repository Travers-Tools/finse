import Link from 'next/link'
import { localePath, type Lang } from '@/lib/i18n'
import { hero } from '@/content/hero'

export default function Hero({ lang }: { lang: Lang }) {
  const t = hero[lang]
  return (
    <main className="hero">
      <div className="hero-content">
        <p className="hero-kicker">{t.kicker}</p>
        <h1 className="hero-title">
          <span className="hero-title-line">{t.title[0]}</span>{' '}
          <span className="hero-title-line">{t.title[1]}</span>
        </h1>
        <p className="hero-subtitle">
          {t.subtitle[0]}{' '}<br />
          {t.subtitle[1]}
        </p>
        <div className="hero-buttons">
          <a href="#pakker" className="btn btn-tertiary">{t.pakker}</a>
          <Link href={localePath(lang, '/configurator')} className="btn btn-outline-light">{t.skreddersy}</Link>
        </div>
      </div>
    </main>
  )
}
