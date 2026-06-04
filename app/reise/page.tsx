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
          <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" />
          <circle cx="12" cy="9" r="2.5" />
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
  'Fottur i området':                       { bilde: '/assets/images/akt-fottur.jpg', desc: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.' },
  'Sykkeltur på Rallarvegen':               { bilde: '/assets/images/akt-rallarvegen.jpg', desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.' },
  'Brevandring':                            { bilde: '/assets/images/akt-brevandring.jpg', desc: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.' },
  'Skiturer i området':                     { bilde: '/assets/images/Finse_pakker00006.jpg', desc: 'Januar til mai. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold. Utstyr kan leies av oss.' },
  'Trugeturer':                             { bilde: '/assets/images/Finse_pakker00009.jpg', desc: 'Desember til mai. Truger er godt egnet for enkle turer i terrenget rundt Finse. Dette er en vinteraktivitet alle kan ta del i. Truger leies av oss.' },
  'Skiseiling':                             { bilde: '/assets/images/akt-skiseiling.jpg', desc: 'Januar til mai. Skiseiling er en spennende måte å ferdes på i terrenget rundt Finse. Vinden sørger for fremdriften, og aktiviteten er forholdsvis enkel å lære. Noen timer på Finsevann gir garantert mestringsfølelse. Vi har alt nødvendig utstyr til utleie.' },
  'Stjernekikking':                         { bilde: '/assets/images/Finse_pakker00002.jpg', desc: 'Oktober til mars. Med minimalt med kunstig lys og en vid, åpen himmel byr Finse på enestående forhold for å oppleve stjernene, mørket og den skiftende nattehimmelen. Vi samarbeider med en astroguide som kan vise dere himmelen på en helt ny måte.' },
  'Morgenbad i Finsevann':                  { bilde: '/assets/images/akt-morgenbad.jpg', desc: 'Morgenbad, bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen. En enkel opplevelse med stor effekt.' },
  'Sidersmaking':                           { bilde: '/assets/images/akt-sider.jpg',         desc: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.' },
  'Bålpanne og after hike/ski/bike':        { bilde: '/assets/images/akt-baalpanne.jpg', desc: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.' },
  'Finsequiz':                              { bilde: '/assets/images/lobby-peis.jpg', desc: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.' },
  'Rallarmuseet':                           { bilde: '/assets/images/Finseskilt.jpg',        desc: 'Hele året. Lær om Bergensbanen og hvordan jernbanen over fjellet ble bygget av tøffe rallare og dyktige ingeniører på starten av 1900-tallet.' },
  'Polarhistorie i Framheim':               { bilde: '/assets/images/nansen.png',            desc: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.' },
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
  const [heroLoaded, setHeroLoaded] = useState(false)

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
          <a href="/configurator" className="reise-btn reise-btn--cream">Start ny konfigurasjon</a>
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
        <img
          src="/assets/images/pkg-hotellet.jpg"
          alt="Hotel Finse1222"
          className="reise-hero-img"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="reise-hero-overlay" />
        <nav className="reise-hero-nav">
          <div className="reise-inner">
            <a href="/" className="reise-logo-link">
              <img src="/assets/logo/logo.png" alt="Hotel Finse1222" className="reise-logo-img" />
            </a>
          </div>
        </nav>
        <div className={`reise-hero-body ${heroLoaded ? 'is-ready' : ''}`}>
          <div className="reise-inner">
            <p className="reise-hero-subtitle">
              {data.anledning} · 1222 moh.
            </p>
            <h1 className="reise-hero-title">
              {data.bedrift ? `${data.bedrift} på Hotel Finse1222` : 'Deres opphold på Hotel Finse1222'}
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
            Velkommen til Hotel Finse1222, der jernbanen slutter og vidda begynner. Norges høyestliggende fjellstasjon, omgitt av Hardangerjøkulen og stille kilometer med is og lys. Her finnes ingen biler, ingen støy. Bare det som virkelig betyr noe.
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

      {/* ── Amundsen ── */}
      <section className="reise-quote">
        <div className="reise-inner reise-quote-grid">
          <figure className="reise-quote-figure">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Amundsen_in_fur_skins.jpg"
              alt="Roald Amundsen"
              className="reise-quote-img"
            />
            <figcaption className="reise-quote-caption">Roald Amundsen, ca. 1923. Foto: National Library of Norway.</figcaption>
          </figure>
          <div className="reise-quote-body">
            <span className="reise-eyebrow">Et stykke historie</span>
            <blockquote className="reise-quote-text">
              Seier venter den, som har alt i orden. Hell kaller man det. Nederlag er en absolutt følge for den, som har forsømt å ta de nødvendige forholdsregler i tide. Uhell kalles det.
            </blockquote>
            <cite className="reise-quote-attr">Roald Amundsen</cite>
            <p className="reise-quote-context">
              Amundsen brukte Finse som treningsbase før sine polarekspedisjoner. Den samme vidda ligger fortsatt utenfor hotellets vinduer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Del med kollegaer ── */}
      <section className="reise-share-bottom">
        <div className="reise-inner">
          <p className="reise-share-lead">Send det videre til de andre.</p>
          <button className="reise-btn reise-btn--cream" onClick={handleCopy}>
            {copied ? '✓ Lenke kopiert!' : 'Del med kollegaer'}
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <div className="reise-inner reise-footer-inner">
          <img src="/assets/logo/logo.png" alt="Hotel Finse1222" className="reise-footer-logo" />
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
