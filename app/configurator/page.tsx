'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './configurator.css'

const STEP_IMAGES = [
  '/assets/images/finse1222__242.JPG',
  '/assets/images/finse1222__182.JPG',
  '/assets/images/finse.jpg',
  '/assets/images/oss.JPG',
  '/assets/images/mat_finse.jpg',
  '/assets/images/Finseskilt.jpg',
]

const SOMMER_AKTIVITETER = [
  { navn: 'Bålpanne & bading ved Framheim',       bilde: '/assets/images/Finse_pakker00010.jpg', beskrivelse: 'Morgenbad eller «after hike» ved Framheim – med bålpanne og varmt drikke. Hotellet ordner alt av utstyr. En enkel opplevelse med stor effekt.' },
  { navn: 'Sykkeltur til Fagernut og tilbake',    bilde: '/assets/images/Finse_pakker00004.jpg', beskrivelse: 'Juli–september. Ikonisk rute med utsikt over Hardangervidda. Hotellet pakker nistepakke og låner ut sykler og hjelmer. Mestring og snakkestoff garantert.' },
  { navn: 'Fotturer i området',                   bilde: '/assets/images/Finse_pakker00007.jpg', beskrivelse: 'Juli–september. Lille Finsenut, Jomfrunut-runden eller egentilpasset løype. Kan arrangeres med lokal guide. Hotellet låner ut utstyr og pakker sekken.' },
]

const HELARS_AKTIVITETER = [
  { navn: 'Finsequiz',                            bilde: '/assets/images/oss.JPG',                              beskrivelse: 'Kveldsunderholdning med hotellet som sceneteppe. Spørsmål om natur, historie og Finse-trivia. Passer like godt etter middag som etter en lang dag ute.' },
  { navn: 'Vin- og sidersmaking',                 bilde: '/assets/images/mat_finse.jpg',                        beskrivelse: 'Kurerte viner og lokale sidere med historiene bak glasset, ledet av hotellets personale. Inkluderer smaksprøver og småretter. En avslappet avslutning på dagen.' },
  { navn: 'Bålpanne og after hike/ski',           bilde: '/assets/images/Finse_configurator_background.jpg',    beskrivelse: 'Avslutt dagen ute ved Framheim med bålpanne og varmt drikke. Hotellet ordner utstyr og plasser. Enkelt, stemningsfullt og minneverdig.' },
]

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const isoDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const formatDate = (iso: string) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export default function Configurator() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)

  const [monthOffset, setMonthOffset] = useState(0)
  const MONTH_SLOT = 89    // 81px card + 8px gap
  const MONTH_VISIBLE = 5  // cards shown at once

  const now = new Date()
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [hoverDay, setHoverDay] = useState('')

  const [form, setForm] = useState({
    anledning: '',
    annetAnledning: '',
    datoModus: 'datoer' as 'datoer' | 'fleksibel',
    datoFra: '',
    datoTil: '',
    fleksibeltManed: '',
    fleksibeltNetter: '',
    fleksibeltUkeDel: [] as string[],
    moteromVarighet: '',
    antall: '',
    romtyper: [] as string[],
    aktiviteter: [] as string[],
    navn: '',
    bedrift: '',
    epost: '',
    telefon: '',
    merknad: '',
  })

  const TOTAL = 7

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1)
    setStep(target)
  }
  const next = () => { if (step < TOTAL) goTo(step + 1) }
  const prev = () => { if (step > 1) goTo(step - 1) }

  const set = (field: string, value: string | boolean) =>
    setForm(p => ({ ...p, [field]: value }))

  const toggleAktivitet = (navn: string) => {
    setForm(p => ({
      ...p,
      aktiviteter: p.aktiviteter.includes(navn)
        ? p.aktiviteter.filter(v => v !== navn)
        : [...p.aktiviteter, navn],
    }))
  }

  const isAktivitetSelected = (navn: string) => form.aktiviteter.includes(navn)

  const toggleRomtype = (romtype: string) => {
    setForm(p => ({
      ...p,
      romtyper: p.romtyper.includes(romtype)
        ? p.romtyper.filter(v => v !== romtype)
        : [...p.romtyper, romtype],
    }))
  }

  // ── Calendar helpers ──
  const today = now.toISOString().split('T')[0]

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }
  const isAtMinMonth = calYear === now.getFullYear() && calMonth === now.getMonth()

  const handleDayClick = (iso: string) => {
    if (!form.datoFra || form.datoTil) {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    } else if (iso > form.datoFra) {
      setForm(p => ({ ...p, datoTil: iso }))
    } else {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    }
  }

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(calYear, calMonth, 1).getDay() + 6) % 7
  const calCells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) calCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d)
  while (calCells.length % 7 !== 0) calCells.push(null)

  const nights = form.datoFra && form.datoTil
    ? Math.round((new Date(form.datoTil).getTime() - new Date(form.datoFra).getTime()) / 86400000)
    : 0

  // Upcoming 12 months for flexible mode
  const upcomingMonths = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  })

  const monthMax = upcomingMonths.length - MONTH_VISIBLE

  // June (5) – September (8) er sommersesong
  const isSommerManed = (monthIndex: number) => monthIndex >= 5 && monthIndex <= 8
  const viseSommerAktiviteter = (() => {
    if (form.datoModus === 'datoer' && form.datoFra) {
      return isSommerManed(new Date(form.datoFra).getMonth())
    }
    if (form.datoModus === 'fleksibel' && form.fleksibeltManed) {
      const idx = MONTHS.indexOf(form.fleksibeltManed.split(' ')[0])
      return isSommerManed(idx)
    }
    return true // ingen dato valgt → vis alt
  })()

  // ── Drag-to-scroll for aktivitetsraden ──
  const actRowRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null)

  const onActMouseDown = (e: React.MouseEvent) => {
    if (!actRowRef.current) return
    dragStart.current = { x: e.pageX, scrollLeft: actRowRef.current.scrollLeft }
    actRowRef.current.style.cursor = 'grabbing'
  }
  const onActMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || !actRowRef.current) return
    e.preventDefault()
    actRowRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x)
  }
  const onActMouseUp = () => {
    dragStart.current = null
    if (actRowRef.current) actRowRef.current.style.cursor = 'grab'
  }

  const handleSubmit = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const dato = form.datoModus === 'datoer'
      ? `${formatDate(form.datoFra)} → ${formatDate(form.datoTil)}`
      : form.fleksibeltManed
    const varighet = form.datoModus === 'datoer'
      ? `${nights} ${nights === 1 ? 'natt' : 'netter'}`
      : form.fleksibeltNetter
    const payload = {
      ...form,
      anledning: form.anledning === 'Annet' ? form.annetAnledning : form.anledning,
      dato,
      varighet,
      id,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(id, JSON.stringify(payload))
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    window.location.href = `/reise?id=${id}#d=${encoded}`
  }

  return (
    <div className="konfig-bg">
      <div className="konfig-overlay" />
      <a href="/" className="konfig-logo">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" />
      </a>
      <div className="konfig-card">
        <div className={`konfig-body${step === 6 ? ' konfig-body--full' : ''}`}>
          <div className="konfig-left">
            <div className="konfig-segments">
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className={`konfig-seg ${i <= step ? 'filled' : ''}`} />
              ))}
            </div>

            <div className={`konfig-step ${dir > 0 ? 'slide-right' : 'slide-left'}`} key={step}>
              <span className="konfig-indicator">Steg {step} av {TOTAL}</span>

              {/* ── Step 1: Anledning ── */}
              {step === 1 && (
                <>
                  <h1 className="konfig-title">Hva er anledningen?</h1>
                  <p className="konfig-subtitle">Velg det som passer best</p>
                  <div className="konfig-pills">
                    {['Ledergruppe', 'Teambuilding', 'Strategisamling', 'Kick-off', 'Julebord/firmafest', 'Konferanse', 'Privat arrangement', 'Annet'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.anledning === opt ? 'selected' : ''}`}
                        onClick={() => set('anledning', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {form.anledning === 'Annet' && (
                    <input
                      type="text"
                      className="konfig-input konfig-annet-input"
                      placeholder="Beskriv anledningen din"
                      value={form.annetAnledning}
                      onChange={e => set('annetAnledning', e.target.value)}
                      autoFocus
                    />
                  )}
                </>
              )}

              {/* ── Step 2: Dato ── */}
              {step === 2 && (
                <>
                  <h1 className="konfig-title">Når ønsker dere å komme?</h1>

                  {/* Mode toggle */}
                  <div className="konfig-mode-toggle">
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'datoer' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'datoer')}
                    >
                      Datoer
                    </button>
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'fleksibel' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'fleksibel')}
                    >
                      Fleksibel
                    </button>
                  </div>

                  {/* ── Exact dates mode ── */}
                  {form.datoModus === 'datoer' && (
                    <>
                      <div className="konfig-cal-header">
                        <button className="konfig-cal-nav" onClick={prevMonth} disabled={isAtMinMonth}>‹</button>
                        <span className="konfig-cal-month">{MONTHS[calMonth]} {calYear}</span>
                        <button className="konfig-cal-nav" onClick={nextMonth}>›</button>
                      </div>

                      <div className="konfig-cal-weekdays">
                        {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                          <span key={d} className="konfig-cal-wd">{d}</span>
                        ))}
                      </div>

                      <div className="konfig-cal-grid">
                        {calCells.map((day, idx) => {
                          if (!day) return <span key={idx} className="konfig-cal-empty" />
                          const iso = isoDate(calYear, calMonth, day)
                          const isPast = iso < today
                          const isStart = iso === form.datoFra
                          const isEnd = iso === form.datoTil
                          const rangeEnd = form.datoTil || (form.datoFra && !form.datoTil ? hoverDay : '')
                          const isInRange = !!(form.datoFra && rangeEnd && iso > form.datoFra && iso < rangeEnd)
                          const isRangeStart = isStart && !!(form.datoTil || hoverDay)
                          const isRangeEnd = isEnd || !!(form.datoFra && !form.datoTil && iso === hoverDay && hoverDay > form.datoFra)
                          return (
                            <button
                              key={idx}
                              className={[
                                'konfig-cal-day',
                                isPast ? 'is-past' : '',
                                isStart ? 'is-start' : '',
                                isEnd ? 'is-end' : '',
                                isInRange ? 'is-range' : '',
                                isRangeStart ? 'is-range-start' : '',
                                isRangeEnd ? 'is-range-end' : '',
                              ].filter(Boolean).join(' ')}
                              disabled={isPast}
                              onClick={() => handleDayClick(iso)}
                              onMouseEnter={() => { if (form.datoFra && !form.datoTil) setHoverDay(iso) }}
                              onMouseLeave={() => setHoverDay('')}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>

                      <div className="konfig-cal-status">
                        {!form.datoFra && (
                          <span className="konfig-cal-hint">Velg ankomstdato</span>
                        )}
                        {form.datoFra && !form.datoTil && (
                          <span className="konfig-cal-hint">
                            Ankomst <strong>{formatDate(form.datoFra)}</strong> — velg avreisedato
                          </span>
                        )}
                        {form.datoFra && form.datoTil && (
                          <span className="konfig-cal-confirmed">
                            {formatDate(form.datoFra)} → {formatDate(form.datoTil)}
                            <em>{nights} {nights === 1 ? 'natt' : 'netter'}</em>
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Flexible mode ── */}
                  {form.datoModus === 'fleksibel' && (
                    <>
                      <p className="konfig-flex-label">Hvor lenge ønsker dere å bli?</p>
                      <div className="konfig-duration-row">
                        {['1 natt', '2-3 netter', '4-5 netter', 'En uke', 'Over en uke'].map(opt => (
                          <button
                            key={opt}
                            className={`konfig-duration-btn ${form.fleksibeltNetter === opt ? 'selected' : ''}`}
                            onClick={() => set('fleksibeltNetter', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <p className="konfig-flex-label">Når på året?</p>
                      <div className="konfig-month-row">
                        <button
                          className={`konfig-month-arrow ${monthOffset === 0 ? 'disabled' : ''}`}
                          onClick={() => setMonthOffset(o => Math.max(0, o - 1))}
                          disabled={monthOffset === 0}
                          aria-label="Forrige måneder"
                        ><ChevronLeft size={18} /></button>

                        <div className="konfig-month-viewport">
                          <div
                            className="konfig-month-track"
                            style={{ transform: `translateX(-${monthOffset * MONTH_SLOT}px)` }}
                          >
                            {upcomingMonths.map(m => {
                              const [monthName, year] = m.split(' ')
                              return (
                                <button
                                  key={m}
                                  className={`konfig-month-card ${form.fleksibeltManed === m ? 'selected' : ''}`}
                                  onClick={() => set('fleksibeltManed', m)}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <span className="konfig-month-name">{monthName}</span>
                                  <span className="konfig-month-year">{year}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <button
                          className={`konfig-month-arrow ${monthOffset >= monthMax ? 'disabled' : ''}`}
                          onClick={() => setMonthOffset(o => Math.min(monthMax, o + 1))}
                          disabled={monthOffset >= monthMax}
                          aria-label="Neste måneder"
                        ><ChevronRight size={18} /></button>
                      </div>

                      <p className="konfig-flex-label">Når i uken kommer dere?</p>
                      <div className="konfig-ukedel-row">
                        {['Midt i uken', 'Helg'].map(opt => {
                          const active = form.fleksibeltUkeDel.includes(opt)
                          return (
                            <button
                              key={opt}
                              className={`konfig-ukedel-btn ${active ? 'selected' : ''}`}
                              onClick={() => setForm(p => ({
                                ...p,
                                fleksibeltUkeDel: active
                                  ? p.fleksibeltUkeDel.filter(v => v !== opt)
                                  : [...p.fleksibeltUkeDel, opt],
                              }))}
                            >
                              <span className="konfig-ukedel-check">{active ? '✓' : ''}</span>
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}

                </>
              )}

              {/* ── Step 3: Hvem kommer ── */}
              {step === 3 && (
                <>
                  <h1 className="konfig-title">Hvor mange kommer?</h1>
                  <label className="konfig-label">Antall gjester</label>
                  <div className="konfig-pills konfig-pills--3col">
                    {['1–4', '5–15', '15–30', '30–60', '60–110', 'Over 110'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.antall === opt ? 'selected' : ''}`}
                        onClick={() => set('antall', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 4: Romtype ── */}
              {step === 4 && (
                <>
                  <h1 className="konfig-title">Hvilke romtyper ønsker dere?</h1>
                  <p className="konfig-subtitle">Velg gjerne flere – vi setter opp pris på ulike kombinasjoner</p>

                  <div className="konfig-rooms konfig-rooms--grid2">
                    {[
                      {
                        id: 'Enkeltrom',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="7" y="9" width="4" height="6" rx="1" /></svg>,
                      },
                      {
                        id: 'Dobbeltrom med separate senger',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="5" y="9" width="4" height="6" rx="1" /><rect x="11" y="9" width="4" height="6" rx="1" /></svg>,
                      },
                      {
                        id: 'Flersengsrom med separate senger',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="4" y="9" width="3" height="6" rx="1" /><rect x="10" y="9" width="3" height="6" rx="1" /><rect x="16" y="9" width="3" height="6" rx="1" /></svg>,
                      },
                      {
                        id: 'Dobbeltrom med dobbeltseng',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="5" y="9" width="14" height="6" rx="1" /></svg>,
                      },
                    ].map(({ id, svg }) => (
                      <button
                        key={id}
                        className={`konfig-room konfig-room--grid ${form.romtyper.includes(id) ? 'selected' : ''}`}
                        onClick={() => toggleRomtype(id)}
                      >
                        {svg}
                        <span className="konfig-room-name">{id}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 5: Møterom ── */}
              {step === 5 && (
                <>
                  <h1 className="konfig-title">Trenger dere møterom?</h1>
                  <p className="konfig-subtitle">Valgfritt – kan legges til senere</p>

                  <div className="konfig-rooms konfig-rooms--grid2">
                    {[
                      {
                        id: 'Hel dag',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10" width="14" height="4" rx="0.5" /><circle cx="3" cy="12" r="1.2" /><circle cx="21" cy="12" r="1.2" /><circle cx="8" cy="7" r="1.2" /><circle cx="12" cy="7" r="1.2" /><circle cx="16" cy="7" r="1.2" /><circle cx="8" cy="17" r="1.2" /><circle cx="12" cy="17" r="1.2" /><circle cx="16" cy="17" r="1.2" /></svg>,
                      },
                      {
                        id: 'Halv dag',
                        svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21h16" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><circle cx="15" cy="12" r="0.6" fill="currentColor" /></svg>,
                      },
                    ].map(({ id, svg }) => (
                      <button
                        key={id}
                        className={`konfig-room konfig-room--grid ${form.moteromVarighet === id ? 'selected' : ''}`}
                        onClick={() => set('moteromVarighet', form.moteromVarighet === id ? '' : id)}
                      >
                        {svg}
                        <span className="konfig-room-name">{id}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 6: Aktiviteter ── */}
              {step === 6 && (
                <>
                  <h1 className="konfig-title">Hva ønsker dere å oppleve?</h1>
                  <p className="konfig-subtitle">Hotellet leier ut utstyr</p>

                  <div
                    className="konfig-act-row"
                    ref={actRowRef}
                    onMouseDown={onActMouseDown}
                    onMouseMove={onActMouseMove}
                    onMouseUp={onActMouseUp}
                    onMouseLeave={onActMouseUp}
                  >
                    {viseSommerAktiviteter && (
                      <div className="konfig-act-group">
                        <p className="konfig-act-season-label">Sommer <span>juni – sept</span></p>
                        <div className="konfig-act-group-cards">
                          {SOMMER_AKTIVITETER.map(({ navn, bilde, beskrivelse }) => {
                            const selected = isAktivitetSelected(navn)
                            return (
                              <button key={navn} className={`konfig-act-card ${selected ? 'selected' : ''}`} onClick={() => toggleAktivitet(navn)}>
                                <div className="konfig-act-card-img-wrap"><img src={bilde} alt={navn} className="konfig-act-card-img" /></div>
                                <div className="konfig-act-card-body">
                                  <p className="konfig-act-card-title">{navn}</p>
                                  <p className="konfig-act-card-desc">{beskrivelse}</p>
                                </div>
                                {selected && <div className="konfig-act-card-check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div className="konfig-act-group">
                      <p className="konfig-act-season-label">Helårs</p>
                      <div className="konfig-act-group-cards">
                        {HELARS_AKTIVITETER.map(({ navn, bilde, beskrivelse }) => {
                          const selected = isAktivitetSelected(navn)
                          return (
                            <button key={navn} className={`konfig-act-card ${selected ? 'selected' : ''}`} onClick={() => toggleAktivitet(navn)}>
                              <div className="konfig-act-card-img-wrap"><img src={bilde} alt={navn} className="konfig-act-card-img" /></div>
                              <div className="konfig-act-card-body">
                                <p className="konfig-act-card-title">{navn}</p>
                                <p className="konfig-act-card-desc">{beskrivelse}</p>
                              </div>
                              {selected && <div className="konfig-act-card-check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                </>
              )}

              {/* ── Step 7: Kontakt ── */}
              {step === 7 && (
                <>
                  <h1 className="konfig-title">La oss ta kontakt</h1>
                  <div className="konfig-form-grid">
                    <div className="konfig-field">
                      <label className="konfig-label">Navn</label>
                      <input type="text" className="konfig-input" placeholder="Ditt fulle navn" value={form.navn} onChange={e => set('navn', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">Bedrift</label>
                      <input type="text" className="konfig-input" placeholder="Bedriftsnavn" value={form.bedrift} onChange={e => set('bedrift', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">E-post</label>
                      <input type="email" className="konfig-input" placeholder="din@epost.no" value={form.epost} onChange={e => set('epost', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">Telefon</label>
                      <input type="tel" className="konfig-input" placeholder="+47" value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div className="konfig-field">
                    <textarea className="konfig-input konfig-textarea" placeholder="Noe annet vi bør vite? (valgfritt)" rows={3} value={form.merknad} onChange={e => set('merknad', e.target.value)} />
                  </div>
                  <button className="konfig-submit" disabled={!form.navn || !form.epost} onClick={handleSubmit}>
                    Send forespørsel
                  </button>
                  <p className="konfig-hint">Vi svarer innen én arbeidsdag · Ingen binding</p>
                </>
              )}
            </div>

            {/* ── Shared nav — outside animated step so it never jumps ── */}
            <div className="konfig-nav">
              {step > 1
                ? <button className="konfig-back" onClick={prev}>Tilbake</button>
                : <span />
              }
              {step < TOTAL && <button className="konfig-next" onClick={next}>Neste</button>}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="konfig-right">
            <div className="konfig-img-wrap">
              {STEP_IMAGES.map((src, i) => (
                <img key={i} src={src} alt="" className={`konfig-img ${step === i + 1 && step < 7 && step !== 6 ? 'visible' : ''}`} />
              ))}
              {step === 7 && (
                <div className="konfig-summary">
                  <div className="konfig-summary-hero">
                    <img src="/assets/images/Finse_configurator_background.jpg" alt="" className="konfig-summary-hero-img" />
                    <div className="konfig-summary-hero-overlay" />
                    <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="konfig-summary-hero-logo" />
                  </div>
                  <h3 className="konfig-summary-title">Oppsummering</h3>
                  <div className="konfig-summary-list">
                    {[
                      { label: 'Anledning', value: form.anledning === 'Annet' ? form.annetAnledning : form.anledning },
                      { label: 'Ankomst', value: form.datoModus === 'datoer' ? formatDate(form.datoFra) : '' },
                      { label: 'Avreise', value: form.datoModus === 'datoer' ? formatDate(form.datoTil) : '' },
                      { label: 'Ønsket måned', value: form.datoModus === 'fleksibel' ? form.fleksibeltManed : '' },
                      { label: 'Varighet', value: form.datoModus === 'fleksibel' ? form.fleksibeltNetter : '' },
                      { label: 'Antall gjester', value: form.antall },
                      { label: 'Romtype', value: form.romtyper.join(', ') },
                      { label: 'Møterom', value: form.moteromVarighet || '' },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="konfig-summary-row">
                        <span className="konfig-summary-key">{item.label}</span>
                        <span className="konfig-summary-val">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {form.aktiviteter.length > 0 && (() => {
                    const alleAktiviteter = [...SOMMER_AKTIVITETER, ...HELARS_AKTIVITETER]
                    return (
                      <div className="konfig-summary-activities">
                        <span className="konfig-summary-key">Aktiviteter</span>
                        <div className="konfig-summary-activity-grid">
                          {form.aktiviteter.map(navn => {
                            const match = alleAktiviteter.find(a => a.navn === navn)
                            return (
                              <div key={navn} className="konfig-summary-activity-item">
                                {match && <img src={match.bilde} alt={navn} />}
                                <span>{navn}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}

                  <p className="konfig-summary-note">
                    Navneliste med matintoleranser og kjøreplan trengs 4 uker før ankomst.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
