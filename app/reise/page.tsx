'use client'

import { useEffect, useState } from 'react'
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

function factIcon(label: string): React.ReactNode {
  switch (label) {
    case 'Anledning':
      return (
        <svg {...iconBase}>
          <path d="M12 2l2.4 5 5.6.5-4.3 3.7 1.3 5.5L12 13.8l-5 2.9 1.3-5.5L4 7.5l5.6-.5z" />
        </svg>
      )
    case 'Dato':
      return (
        <svg {...iconBase}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    case 'Deltakere':
      return (
        <svg {...iconBase}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'Overnatting':
      return (
        <svg {...iconBase}>
          <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" />
          <path d="M3 15h18" />
          <rect x="5" y="9" width="14" height="6" rx="1" />
        </svg>
      )
    case 'Møterom':
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

const ACTIVITY_DATA: Record<string, { bilde: string; desc: string }> = {
  'Bålpanne & bading ved Framheim':     { bilde: '/assets/images/Finse_pakker00010.jpg', desc: 'Morgenbad eller «after hike» ved Framheim, med bålpanne og varmt drikke. Hotellet ordner alt av utstyr. En enkel opplevelse med stor effekt.' },
  'Sykkeltur til Fagernut og tilbake':  { bilde: '/assets/images/Finse_pakker00004.jpg', desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Hotellet pakker nistepakke og låner ut sykler og hjelmer. Mestring og snakkestoff garantert.' },
  'Fotturer i området':                 { bilde: '/assets/images/Finse_pakker00007.jpg', desc: 'Juli til september. Lille Finsenut, Jomfrunut-runden eller egentilpasset løype. Kan arrangeres med lokal guide. Hotellet låner ut utstyr og pakker sekken.' },
  'Finsequiz':                          { bilde: '/assets/images/oss.JPG', desc: 'Kveldsunderholdning med hotellet som sceneteppe. Spørsmål om natur, historie og Finse-trivia. Passer like godt etter middag som etter en lang dag ute.' },
  'Vin- og sidersmaking':               { bilde: '/assets/images/mat_finse.jpg', desc: 'Kurerte viner og lokale sidere med historiene bak glasset, ledet av hotellets personale. Inkluderer smaksprøver og småretter. En avslappet avslutning på dagen.' },
  'Bålpanne og after hike/ski':         { bilde: '/assets/images/Finse_configurator_background.jpg', desc: 'Avslutt dagen ute ved Framheim med bålpanne og varmt drikke. Hotellet ordner utstyr og plasser. Enkelt, stemningsfullt og minneverdig.' },
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
}

export default function ReisePage() {
  const [data, setData] = useState<TripData | null>(null)
  const [copied, setCopied] = useState(false)

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
          <h1 className="reise-empty-title">Reisen ble ikke funnet</h1>
          <p className="reise-empty-text">Lenken kan ha utløpt eller data er slettet fra nettleseren.</p>
          <a href="/configurator" className="reise-btn reise-btn--dark">Start ny konfigurasjon</a>
        </div>
      </div>
    )
  }

  const aktiviteter = (data.aktiviteter || []).filter(Boolean)

  const antallText = data.antall ? `${data.antall} gjester` : ''
  const moteromText = data.moteromVarighet ? data.moteromVarighet.toLowerCase() : ''
  const romTypeText = data.romtyper?.length > 0 ? data.romtyper.join(', ') : ''

  const details: { label: string; value: string }[] = [
    { label: 'Anledning',   value: data.anledning },
    { label: 'Dato',        value: data.dato },
    { label: 'Deltakere',   value: antallText },
    { label: 'Overnatting', value: romTypeText },
    { label: 'Møterom',     value: moteromText },
  ].filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <section className="reise-hero">
        <img src="/assets/images/finse1222__242.JPG" alt="Finse 1222" className="reise-hero-img" />
        <div className="reise-hero-overlay" />
        <nav className="reise-hero-nav">
          <div className="reise-inner">
            <a href="/" className="reise-logo-link">
              <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-logo-img" />
            </a>
          </div>
        </nav>
        <div className="reise-hero-body">
          <div className="reise-inner">
            <p className="reise-hero-subtitle">
              {data.anledning} · 1222 moh.
            </p>
            <h1 className="reise-hero-title">
              {data.bedrift ? `${data.bedrift} på Finse 1222` : 'Deres opphold på Finse 1222'}
            </h1>
            <div className="reise-hero-cta">
              <button
                className="reise-btn reise-btn--cream"
                onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Les mer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="reise-intro" id="intro">
        <div className="reise-inner">
          <p className="reise-intro-body">
            Finse 1222 ligger der jernbanen slutter og vidda begynner. Norges høyestliggende fjellstasjon, omgitt av Hardangerjøkulen og stille kilometer med is og lys. Her finnes ingen biler, ingen støy. Bare det som virkelig betyr noe.
          </p>
        </div>
      </section>

      {/* ── Reisen i kort ── */}
      {details.length > 0 && (
        <section className="reise-facts-section">
          <div className="reise-inner">
            <span className="reise-eyebrow">Reisen</span>
            <h2 className="reise-section-title">Det dere har valgt</h2>
            <ul className="reise-facts-list">
              {details.map(d => {
                const icon = factIcon(d.label)
                return (
                  <li key={d.label} className="reise-facts-row">
                    <span className="reise-facts-icon">{icon}</span>
                    <span className="reise-facts-key">{d.label}</span>
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
          <span className="reise-eyebrow">Aktiviteter</span>
          <p className="reise-program-desc">
            Finse byr på noe for alle. Sykkel og fottur på vidda om sommeren, ski og truger om vinteren, eller en stille kveld med bålpanne, quiz eller vinsmaking. Hotellet låner ut utstyr og kjenner området ut og inn.
            {aktiviteter.length > 0
              ? ' Her er det dere har valgt for deres opphold:'
              : ' Si gjerne fra om dere ønsker å legge til noe. Vi tilpasser etter ønsker og vær.'}
          </p>
        </div>
        {aktiviteter.length > 0 && (
          <div className="reise-act-list">
            {aktiviteter.map((navn, i) => {
              const act = ACTIVITY_DATA[navn]
              return (
                <article key={navn} className="reise-act-row">
                  <div className="reise-act-row-inner">
                    <div className="reise-act-row-img">
                      <img src={act?.bilde || '/assets/images/Finse_pakker00002.jpg'} alt={navn} />
                    </div>
                    <div className="reise-act-row-body">
                      <span className="reise-act-row-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="reise-act-row-title">{navn}</h3>
                      {act?.desc && <p className="reise-act-row-desc">{act.desc}</p>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Pull quote — full-bleed dark ── */}
      <section className="reise-quote">
        <div className="reise-inner">
          <blockquote className="reise-quote-text">
            Seier venter den, som har alt i orden. Hell kaller man det.
          </blockquote>
          <cite className="reise-quote-attr">Roald Amundsen</cite>
        </div>
      </section>

      {/* ── Del med kollegaer ── */}
      <section className="reise-share-bottom">
        <div className="reise-inner">
          <p className="reise-share-lead">Send det videre til de andre.</p>
          <button className="reise-btn reise-btn--dark" onClick={handleCopy}>
            {copied ? '✓ Lenke kopiert!' : 'Del med kollegaer'}
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <div className="reise-inner reise-footer-inner">
          <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-footer-logo" />
          <p className="reise-footer-tagline">Norges høyestliggende hotell · 1222 moh.</p>
          <div className="reise-footer-meta">
            <a href="/configurator" className="reise-footer-link">Start en ny forespørsel →</a>
            <span className="reise-footer-divider">·</span>
            <span className="reise-footer-note">Vi svarer innen én arbeidsdag</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
