'use client'

import { useEffect, useState } from 'react'
import { localePath } from '@/lib/i18n'
import { useLang } from '@/lib/useLang'
import {
  reise, aktivitetData, type FaktaKey,
  visAnledning, visRomtype, visMoterom, visAktivitet, visDato,
} from '@/content/reise'
import './reise.css'

const iconBase = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function factIcon(key: FaktaKey): React.ReactNode {
  switch (key) {
    case 'anledning':
      return (
        <svg {...iconBase}>
          <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )
    case 'dato':
      return (
        <svg {...iconBase}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    case 'deltakere':
      return (
        <svg {...iconBase}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'overnatting':
      return (
        <svg {...iconBase}>
          <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" />
          <path d="M3 15h18" />
          <rect x="5" y="9" width="14" height="6" rx="1" />
        </svg>
      )
    case 'moterom':
      return (
        <svg {...iconBase}>
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    default:
      return null
  }
}

interface TripData {
  id: string
  anledning: string
  moterom: boolean
  moteromVarighet: string
  dato: string
  varighet: string
  antall: string
  romtyper: string[]
  aktiviteter: string[]
  navn: string
  bedrift: string
  epost: string
  telefon: string
  merknad: string
  createdAt: string
  lang?: 'no' | 'en'
}

export default function ReisePage() {
  const [data, setData] = useState<TripData | null>(null)
  const [copied, setCopied] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  // Språket følger ruten, ikke forespørselen. Lenken avgjør.
  const lang = useLang()
  const t = reise[lang]

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#d=')) {
      try {
        const decoded = decodeURIComponent(escape(atob(hash.slice(3))))
        setData(JSON.parse(decoded))
        return
      } catch { /* fall through to localStorage */ }
    }
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (!id) return
    const raw = localStorage.getItem(id)
    if (raw) {
      try { setData(JSON.parse(raw)) } catch { /* noop */ }
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!data) {
    return (
      <div className="reise-page">
        <div className="reise-empty">
          <h1 className="reise-empty-title">{t.tom.tittel}</h1>
          <p className="reise-empty-text">{t.tom.tekst}</p>
          <a href={localePath(lang, '/configurator')} className="reise-btn reise-btn--cream">{t.tom.cta}</a>
        </div>
      </div>
    )
  }

  const aktiviteter = (data.aktiviteter || []).filter(Boolean)

  const antallText = data.antall ? t.gjester(data.antall) : ''
  const moteromText = data.moteromVarighet ? visMoterom(data.moteromVarighet, lang).toLowerCase() : ''
  const romTypeText = data.romtyper?.length > 0 ? data.romtyper.map(r => visRomtype(r, lang)).join(', ') : ''
  const anledningText = data.anledning ? visAnledning(data.anledning, lang) : ''
  const datoText = data.dato ? visDato(data.dato, lang) : ''

  const details = ([
    { key: 'anledning',   value: anledningText },
    { key: 'dato',        value: datoText },
    { key: 'deltakere',   value: antallText },
    { key: 'overnatting', value: romTypeText },
    { key: 'moterom',     value: moteromText },
  ] as { key: FaktaKey; value: string }[]).filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <section className="reise-hero">
        <img
          src="/assets/images/pkg-hotellet.jpg"
          alt="Hotel Finse1222"
          className="reise-hero-img"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="reise-hero-overlay" />
        <nav className="reise-hero-nav">
          <div className="reise-inner">
            <a href={localePath(lang, '/')} className="reise-logo-link">
              <img src="/assets/logo/logo.png" alt="Hotel Finse1222" className="reise-logo-img" />
            </a>
          </div>
        </nav>
        <div className={`reise-hero-body ${heroLoaded ? 'is-ready' : ''}`}>
          <div className="reise-inner">
            <p className="reise-hero-subtitle">
              {anledningText ? t.hero.foresporselPaa(anledningText) : t.hero.foresporsel} · {t.hero.moh}
            </p>
            <h1 className="reise-hero-title">
              {data.bedrift ? t.hero.tittelMedBedrift(data.bedrift) : t.hero.tittel}
            </h1>
            <div className="reise-hero-cta">
              <button
                className="reise-btn reise-btn--cream"
                onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.lesMer}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="reise-intro" id="intro">
        <div className="reise-inner">
          <p className="reise-intro-status">{t.intro.status}</p>
          <p className="reise-intro-body">{t.intro.body}</p>
        </div>
      </section>

      {/* ── Reisen i kort ── */}
      {details.length > 0 && (
        <section className="reise-facts-section">
          <div className="reise-inner">
            <span className="reise-eyebrow">{t.bestilt.eyebrow}</span>
            <h2 className="reise-section-title">{t.bestilt.tittel}</h2>
            <ul className="reise-facts-list">
              {details.map(d => {
                const icon = factIcon(d.key)
                return (
                  <li key={d.key} className="reise-facts-row">
                    <span className="reise-facts-icon">{icon}</span>
                    <span className="reise-facts-key">{t.fakta[d.key]}</span>
                    <span className="reise-facts-value">{d.value}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ── Aktiviteter ── */}
      <section className="reise-program">
        <div className="reise-inner">
          <span className="reise-eyebrow">{t.aktiviteter.eyebrow}</span>
          <p className="reise-program-desc">
            {t.aktiviteter.desc}
            {aktiviteter.length > 0 ? t.aktiviteter.valgt : t.aktiviteter.ingenValgt}
          </p>
        </div>
        {aktiviteter.length > 0 && (
          <div className="reise-act-list">
            {aktiviteter.map((navn, i) => {
              const act = aktivitetData[navn]
              const desc = act?.desc[lang]
              return (
                <article key={navn} className="reise-act-row">
                  <div className="reise-act-row-inner">
                    <div className="reise-act-row-img">
                      <img src={act?.bilde || '/assets/images/akt-stjerner.jpg'} alt={visAktivitet(navn, lang)} />
                    </div>
                    <div className="reise-act-row-body">
                      <span className="reise-act-row-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="reise-act-row-title">{visAktivitet(navn, lang)}</h3>
                      {desc && <p className="reise-act-row-desc">{desc}</p>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Amundsen ── */}
      <section className="reise-quote">
        <div className="reise-inner reise-quote-grid">
          <figure className="reise-quote-figure">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Amundsen_in_fur_skins.jpg"
              alt="Roald Amundsen"
              className="reise-quote-img"
            />
            <figcaption className="reise-quote-caption">{t.sitat.caption}</figcaption>
          </figure>
          <div className="reise-quote-body">
            <span className="reise-eyebrow">{t.sitat.eyebrow}</span>
            <blockquote className="reise-quote-text">{t.sitat.tekst}</blockquote>
            <cite className="reise-quote-attr">{t.sitat.attr}</cite>
            <p className="reise-quote-context">{t.sitat.kontekst}</p>
          </div>
        </div>
      </section>

      {/* ── Del med kollegaer ── */}
      <section className="reise-share-bottom">
        <div className="reise-inner">
          <p className="reise-share-lead">{t.del.lead}</p>
          <button className="reise-btn reise-btn--cream" onClick={handleCopy}>
            {copied ? t.del.kopiert : t.del.knapp}
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <div className="reise-inner reise-footer-inner">
          <img src="/assets/logo/logo.png" alt="Hotel Finse1222" className="reise-footer-logo" />
          <p className="reise-footer-tagline">{t.footer.tagline}</p>
          <div className="reise-footer-meta">
            <a href={localePath(lang, '/configurator')} className="reise-footer-link">{t.footer.nyForesporsel}</a>
            <span className="reise-footer-divider">·</span>
            <span className="reise-footer-note">{t.footer.svartid}</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
