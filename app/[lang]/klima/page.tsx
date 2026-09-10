'use client'

import Link from 'next/link'
import { localePath } from '@/lib/i18n'
import { useLang } from '@/lib/useLang'
import { klimaPage } from '@/content/klima'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { KLIMA_FIGURES, KLIMA_SOURCE } from '@/app/components/Klima'
import '@/app/components/klima.css'
import './klima-side.css'

export default function KlimaPage() {
  const lang = useLang()
  const t = klimaPage[lang]
  const figures = KLIMA_FIGURES[lang]

  return (
    <div className="klima klima-page">
      <Header variant="light" showBackButton={false} faqHref="/#faq" />

      <article className="klima-page-inner">
        <header className="klima-page-head">
          <span className="klima-modal-label">{t.kicker}</span>
          <h1 className="klima-page-title">{t.title}</h1>
        </header>

        <section className="klima-prose">
          <p className="klima-lede">{t.lede}</p>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </section>

        <section className="klima-page-figures">
          <h2 className="klima-page-h2">{t.figuresTitle}</h2>
          <p className="klima-page-h2-sub">{t.figuresSub}</p>

          <ul className="klima-figures">
            {figures.map(f => (
              <li
                key={f.route}
                className={`klima-figure ${f.finse ? 'is-finse' : ''}`}
              >
                <span className="klima-figure-route">{f.route}</span>
                <span className="klima-figure-value">{f.value}</span>
              </li>
            ))}
          </ul>

          <p className="klima-figures-caption">{KLIMA_SOURCE[lang]}</p>
        </section>

        <section className="klima-prose">
          <p>{t.p3}</p>
          <p>{t.p4}</p>
        </section>

        <section className="klima-page-aside">
          <h2 className="klima-page-h2">{t.asideTitle}</h2>
          <p>{t.asideBody}</p>
        </section>

        <div className="klima-page-cta">
          <Link href={localePath(lang, '/#pakker')} className="klima-band-btn klima-page-cta-btn">
            {t.ctaPackages}
          </Link>
          <Link href={localePath(lang, '/configurator')} className="klima-link">
            {t.ctaConfigurator}
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
