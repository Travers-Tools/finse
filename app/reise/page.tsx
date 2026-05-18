'use client'

import { useEffect, useState } from 'react'
import './reise.css'

const ACTIVITY_DATA: Record<string, { bilde: string; desc: string }> = {
  'Bålpanne & bading ved Framheim':     { bilde: '/assets/images/Finse_pakker00010.jpg', desc: 'Morgenbad eller «after hike» ved Framheim – med bålpanne og varmt drikke. Hotellet ordner alt av utstyr. En enkel opplevelse med stor effekt.' },
  'Sykkeltur til Fagernut og tilbake':  { bilde: '/assets/images/Finse_pakker00004.jpg', desc: 'Juli–september. Ikonisk rute med utsikt over Hardangervidda. Hotellet pakker nistepakke og låner ut sykler og hjelmer. Mestring og snakkestoff garantert.' },
  'Fotturer i området':                 { bilde: '/assets/images/Finse_pakker00007.jpg', desc: 'Juli–september. Lille Finsenut, Jomfrunut-runden eller egentilpasset løype. Kan arrangeres med lokal guide. Hotellet låner ut utstyr og pakker sekken.' },
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
  const moteromText = data.moteromVarighet ? `${data.moteromVarighet.toLowerCase()}` : ''
  const romTypeCount = data.romtyper?.length || 0
  const romTypeText = romTypeCount > 0
    ? `${romTypeCount} ${romTypeCount === 1 ? 'romtype' : 'romtyper'}`
    : ''

  const details: { label: string; value: string }[] = [
    { label: 'Anledning',  value: data.anledning },
    { label: 'Dato',       value: data.dato },
    { label: 'Deltakere',  value: antallText },
    { label: 'Overnatting', value: romTypeText },
    { label: 'Møterom',    value: moteromText },
  ].filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <section className="reise-hero">
        <img src="/assets/images/finse.jpg" alt="Finse 1222" className="reise-hero-img" />
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
            <h1 className="reise-hero-title">
              {data.bedrift ? `${data.bedrift} på Finse 1222` : 'Deres opphold på Finse 1222'}
            </h1>
            <p className="reise-hero-subtitle">
              {data.anledning} — 1222 moh.
            </p>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="reise-intro">
        <div className="reise-inner">
          <p className="reise-intro-body">
            Finse 1222 ligger der jernbanen slutter og vidda begynner — Norges høyestliggende fjellstasjon, omgitt av Hardangerjøkulen og stille kilometer med is og lys. Her finnes ingen biler, ingen støy. Bare det som virkelig betyr noe.
          </p>
          <div className="reise-intro-cta">
            <button className="reise-btn reise-btn--dark" onClick={handleCopy}>
              {copied ? '✓ Lenke kopiert!' : 'Del med kollegaer'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Nøkkelinfo som liste ── */}
      {details.length > 0 && (
        <section className="reise-facts-section">
          <div className="reise-inner">
            <span className="reise-eyebrow">Reisen i kort</span>
            <ul className="reise-facts-list">
              {details.map(d => (
                <li key={d.label} className="reise-facts-row">
                  <span className="reise-facts-key">{d.label}</span>
                  <span className="reise-facts-value">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Activities ── */}
      <section className="reise-program">
        <div className="reise-inner">
          <span className="reise-eyebrow">Aktiviteter</span>
          <h2 className="reise-section-title">Opplevelser hele året</h2>
          <p className="reise-program-desc">
            Finse byr på noe for alle — sykkel og fottur på vidda om sommeren, ski og truger om vinteren, eller en stille kveld med bålpanne, quiz eller vinsmaking. Hotellet låner ut utstyr og kjenner området ut og inn.
            {aktiviteter.length > 0
              ? ' Her er det dere har valgt for deres opphold:'
              : ' Si gjerne fra om dere ønsker å legge til noe — vi tilpasser etter ønsker og vær.'}
          </p>
          {aktiviteter.length > 0 && (
            <div className="reise-act-editorial">
              {aktiviteter.map(navn => {
                const act = ACTIVITY_DATA[navn]
                return (
                  <div key={navn} className="reise-act-card">
                    <div className="reise-act-card-img">
                      <img src={act?.bilde || '/assets/images/Finse_pakker00002.jpg'} alt={navn} />
                    </div>
                    <div className="reise-act-card-body">
                      <h3 className="reise-act-title">{navn}</h3>
                      {act?.desc && <p className="reise-act-desc">{act.desc}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Merknad ── */}
      {data.merknad && (
        <section className="reise-merknad">
          <div className="reise-inner">
            <span className="reise-eyebrow">Merknad fra dere</span>
            <p className="reise-merknad-text">{data.merknad}</p>
          </div>
        </section>
      )}

      {/* ── Pull quote ── */}
      <section className="reise-quote">
        <div className="reise-inner">
          <blockquote className="reise-quote-text">
            «Seier venter den, som har alt i orden – hell kaller man det. Nederlag er en absolutt følge for den, som har forsømt å ta de nødvendige forholdsregler i tide – uhell kalles det.»
          </blockquote>
          <cite className="reise-quote-attr">— Roald Amundsen</cite>
        </div>
      </section>

      {/* ── Room type ── */}
      {data.romtyper?.length > 0 && (
        <section className="reise-romtype">
          <div className="reise-inner">
            <span className="reise-eyebrow">Overnatting</span>
            <h2 className="reise-section-title">Romtyper dere har valgt</h2>
            <div className="reise-romtype-body">
              <div className="reise-romtype-cards">
              {data.romtyper.map(r => {
                const svgMap: Record<string, React.ReactNode> = {
                  'Enkeltrom': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14"/><path d="M3 15h18"/><rect x="7" y="9" width="4" height="6" rx="1"/></svg>,
                  'Dobbeltrom med separate senger': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14"/><path d="M3 15h18"/><rect x="5" y="9" width="4" height="6" rx="1"/><rect x="11" y="9" width="4" height="6" rx="1"/></svg>,
                  'Flersengsrom med separate senger': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14"/><path d="M3 15h18"/><rect x="4" y="9" width="3" height="6" rx="1"/><rect x="10" y="9" width="3" height="6" rx="1"/><rect x="16" y="9" width="3" height="6" rx="1"/></svg>,
                  'Dobbeltrom med dobbeltseng': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14"/><path d="M3 15h18"/><rect x="5" y="9" width="14" height="6" rx="1"/></svg>,
                }
                return (
                  <div key={r} className="reise-romtype-card">
                    <div className="reise-romtype-card-icon">{svgMap[r]}</div>
                    <span className="reise-romtype-card-name">{r}</span>
                  </div>
                )
              })}
              </div>
              <div className="reise-romtype-img-wrap">
                <img src="/assets/images/finse1222__242.JPG" alt="Romtype" className="reise-romtype-img" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Hva skjer nå ── */}
      <section className="reise-next">
        <div className="reise-inner">
          <span className="reise-eyebrow">Hva skjer nå</span>
          <h2 className="reise-section-title">Tre enkle steg videre</h2>
          <div className="reise-next-grid">
            <div className="reise-next-step">
              <span className="reise-next-num">01</span>
              <h3 className="reise-next-title">Forespørselen er sendt</h3>
              <p className="reise-next-desc">Vi har mottatt valgene dere har gjort og setter sammen et forslag tilpasset gruppen.</p>
            </div>
            <div className="reise-next-step">
              <span className="reise-next-num">02</span>
              <h3 className="reise-next-title">Svar innen én arbeidsdag</h3>
              <p className="reise-next-desc">Dere får et personlig svar fra hotellet med pris, romoppsett og forslag til program.</p>
            </div>
            <div className="reise-next-step">
              <span className="reise-next-num">03</span>
              <h3 className="reise-next-title">Vi finpusser sammen</h3>
              <p className="reise-next-desc">Sammen lander vi detaljene — fra ankomsttid og bagasjehåndtering til måltider og aktiviteter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Share card ── */}
      <div className="reise-share-wrap">
        <div className="reise-inner">
        <section className="reise-share">
          <h2 className="reise-share-title">Del med teamet</h2>
          <p className="reise-share-desc">
            Send lenken til kollegaene dine — la dem se hva som venter på Finse.
          </p>
          <div className="reise-share-btns">
            <button className="reise-btn reise-btn--light" onClick={handleCopy}>
              {copied ? '✓ Lenke kopiert!' : 'Kopier lenke'}
            </button>
          </div>
          <p className="reise-share-note">Vi svarer innen én arbeidsdag · Ingen binding</p>
        </section>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-footer-logo" />
        <a href="/configurator" className="reise-footer-link">Start en ny forespørsel →</a>
      </footer>

    </div>
  )
}
