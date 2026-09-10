'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { localePath, type Lang } from '@/lib/i18n'
import { useLang } from '@/lib/useLang'
import { configurator, type ConfigOption } from '@/content/configurator'
import './configurator.css'

const STEP_IMAGES = [
  '/assets/images/pkg-hotellet.jpg',
  '/assets/images/dato-kart.jpg',
  '/assets/images/blasalen-stoler.jpg',
  '/assets/images/suite.jpg',
  '/assets/images/peisestua.jpg',
  '/assets/images/lobby-peis.jpg',
]

/** Bilder per aktivitet. Nøkkelen er aktivitetens id (den norske tittelen), som også sendes til hotellet. */
const ACTIVITY_IMAGES: Record<string, string> = {
  'Fottur i området': '/assets/images/akt-fottur-kart.jpg',
  'Sykkeltur på Rallarvegen': '/assets/images/akt-rallarvegen.jpg',
  'Brevandring': '/assets/images/akt-brevandring.jpg',
  'Skiturer i området': '/assets/images/akt-skitur.jpg',
  'Trugeturer': '/assets/images/akt-truger.jpg',
  'Skiseiling': '/assets/images/akt-skiseiling.jpg',
  'Stjernekikking': '/assets/images/akt-stjerner.jpg',
  'Morgenbad i Finsevann': '/assets/images/akt-morgenbad.jpg',
  'Sidersmaking': '/assets/images/akt-sider.jpg',
  'Bålpanne og after hike/ski/bike': '/assets/images/akt-baalpanne.jpg',
  'Finsequiz': '/assets/images/tog.png',
  'Rallarmuseet': '/assets/images/Finseskilt.jpg',
  'Polarhistorie i Framheim': '/assets/images/nansen.png',
}

/** Norske månedsnavn er nøkkelen som lagres i skjemaet og sendes til hotellet, uavhengig av språk. */
const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const labelOf = (options: ConfigOption[], id: string) =>
  options.find(o => o.id === id)?.label ?? id

const isoDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

/** Norsk datoformat (dd.mm.åååå) brukes i det som sendes til hotellet. */
const formatDate = (iso: string, lang: Lang = 'no') => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return lang === 'no' ? `${d}.${m}.${y}` : `${d}/${m}/${y}`
}

export default function Configurator() {
  const lang = useLang()
  const t = configurator[lang]
  const fmt = (iso: string) => formatDate(iso, lang)
  const allActivities = [...t.step6.summer, ...t.step6.winter, ...t.step6.allYear]
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
    return {
      value: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
      monthName: t.months[d.getMonth()],
      year: String(d.getFullYear()),
    }
  })
  /** Vis lagret månedsverdi («Mars 2027») på gjeldende språk. */
  const displayMonth = (value: string) => {
    const [name, year] = value.split(' ')
    const idx = MONTHS.indexOf(name)
    return idx === -1 ? value : `${t.months[idx]} ${year}`
  }

  const monthMax = upcomingMonths.length - MONTH_VISIBLE

  // June (5) – September (8) er sommersesong, resten er vinter/skuldersesong
  const isSommerManed = (monthIndex: number) => monthIndex >= 5 && monthIndex <= 8
  const valgtManedIndex = (() => {
    if (form.datoModus === 'datoer' && form.datoFra) {
      return new Date(form.datoFra).getMonth()
    }
    if (form.datoModus === 'fleksibel' && form.fleksibeltManed) {
      return MONTHS.indexOf(form.fleksibeltManed.split(' ')[0])
    }
    return -1
  })()
  const viseSommerAktiviteter = valgtManedIndex === -1 || isSommerManed(valgtManedIndex)
  const viseVinterAktiviteter = valgtManedIndex === -1 || !isSommerManed(valgtManedIndex)

  // Datovalg er påkrevd før man går videre fra steg 2
  const datoValgt = form.datoModus === 'datoer'
    ? !!(form.datoFra && form.datoTil)
    : !!form.fleksibeltManed
  const kanGaVidere = step !== 2 || datoValgt

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

  const [sender, setSender] = useState(false)

  const handleSubmit = async () => {
    if (sender) return
    setSender(true)

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
      lang,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(id, JSON.stringify(payload))

    try {
      const res = await fetch('/api/foresporsel/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Send feilet')
    } catch (err) {
      console.error(err)
      setSender(false)
      alert(t.errors.sendFailed)
      return
    }

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    window.location.href = `${localePath(lang, '/reise')}?id=${id}#d=${encoded}`
  }

  return (
    <div className="konfig-bg">
      <div className="konfig-overlay" />
      <a href={localePath(lang, '/')} className="konfig-logo">
        <img src="/assets/logo/logo.png" alt={t.logoAlt} />
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
              <span className="konfig-indicator">{t.stepIndicator(step, TOTAL)}</span>

              {/* ── Step 1: Anledning ── */}
              {step === 1 && (
                <>
                  <h1 className="konfig-title">{t.step1.title}</h1>
                  <p className="konfig-subtitle">{t.step1.subtitle}</p>
                  <div className="konfig-pills">
                    {t.step1.options.map(opt => (
                      <button
                        key={opt.id}
                        className={`konfig-pill ${form.anledning === opt.id ? 'selected' : ''}`}
                        onClick={() => set('anledning', opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {form.anledning === 'Annet' && (
                    <input
                      type="text"
                      className="konfig-input konfig-annet-input"
                      placeholder={t.step1.otherPlaceholder}
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
                  <h1 className="konfig-title">{t.step2.title}</h1>

                  {/* Mode toggle */}
                  <div className="konfig-mode-toggle">
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'datoer' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'datoer')}
                    >
                      {t.step2.modeDates}
                    </button>
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'fleksibel' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'fleksibel')}
                    >
                      {t.step2.modeFlexible}
                    </button>
                  </div>

                  {/* ── Exact dates mode ── */}
                  {form.datoModus === 'datoer' && (
                    <>
                      <div className="konfig-cal-header">
                        <button className="konfig-cal-nav" onClick={prevMonth} disabled={isAtMinMonth} aria-label={t.step2.prevMonth}>‹</button>
                        <span className="konfig-cal-month">{t.months[calMonth]} {calYear}</span>
                        <button className="konfig-cal-nav" onClick={nextMonth} aria-label={t.step2.nextMonth}>›</button>
                      </div>

                      <div className="konfig-cal-weekdays">
                        {t.weekdays.map(d => (
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
                          <span className="konfig-cal-hint">{t.step2.pickArrival}</span>
                        )}
                        {form.datoFra && !form.datoTil && (
                          <span className="konfig-cal-hint">
                            {t.step2.arrivalPrefix}<strong>{fmt(form.datoFra)}</strong>{t.step2.arrivalSuffix}
                          </span>
                        )}
                        {form.datoFra && form.datoTil && (
                          <span className="konfig-cal-confirmed">
                            {fmt(form.datoFra)} → {fmt(form.datoTil)}
                            <em>{t.nights(nights)}</em>
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Flexible mode ── */}
                  {form.datoModus === 'fleksibel' && (
                    <>
                      <p className="konfig-flex-label">{t.step2.howLong}</p>
                      <div className="konfig-duration-row">
                        {t.step2.durations.map(opt => (
                          <button
                            key={opt.id}
                            className={`konfig-duration-btn ${form.fleksibeltNetter === opt.id ? 'selected' : ''}`}
                            onClick={() => set('fleksibeltNetter', opt.id)}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      <p className="konfig-flex-label">{t.step2.whenInYear}</p>
                      <div className="konfig-month-row">
                        <button
                          className={`konfig-month-arrow ${monthOffset === 0 ? 'disabled' : ''}`}
                          onClick={() => setMonthOffset(o => Math.max(0, o - 1))}
                          disabled={monthOffset === 0}
                          aria-label={t.step2.prevMonths}
                        ><ChevronLeft size={18} /></button>

                        <div className="konfig-month-viewport">
                          <div
                            className="konfig-month-track"
                            style={{ transform: `translateX(-${monthOffset * MONTH_SLOT}px)` }}
                          >
                            {upcomingMonths.map(({ value, monthName, year }) => {
                              return (
                                <button
                                  key={value}
                                  className={`konfig-month-card ${form.fleksibeltManed === value ? 'selected' : ''}`}
                                  onClick={() => set('fleksibeltManed', value)}
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
                          aria-label={t.step2.nextMonths}
                        ><ChevronRight size={18} /></button>
                      </div>

                      <p className="konfig-flex-label">{t.step2.whenInWeek}</p>
                      <div className="konfig-ukedel-row">
                        {t.step2.weekParts.map(opt => {
                          const active = form.fleksibeltUkeDel.includes(opt.id)
                          return (
                            <button
                              key={opt.id}
                              className={`konfig-ukedel-btn ${active ? 'selected' : ''}`}
                              onClick={() => setForm(p => ({
                                ...p,
                                fleksibeltUkeDel: active
                                  ? p.fleksibeltUkeDel.filter(v => v !== opt.id)
                                  : [...p.fleksibeltUkeDel, opt.id],
                              }))}
                            >
                              <span className="konfig-ukedel-check">{active ? '✓' : ''}</span>
                              {opt.label}
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
                  <h1 className="konfig-title">{t.step3.title}</h1>
                  <label className="konfig-label">{t.step3.label}</label>
                  <div className="konfig-pills konfig-pills--3col">
                    {t.step3.options.map(opt => (
                      <button
                        key={opt.id}
                        className={`konfig-pill ${form.antall === opt.id ? 'selected' : ''}`}
                        onClick={() => set('antall', opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 4: Romtype ── */}
              {step === 4 && (
                <>
                  <h1 className="konfig-title">{t.step4.title}</h1>
                  <p className="konfig-subtitle">{t.step4.subtitle}</p>

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
                        <span className="konfig-room-name">{labelOf(t.step4.options, id)}</span>
                        {form.romtyper.includes(id) && <span className="konfig-room-check"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 5: Møterom ── */}
              {step === 5 && (
                <>
                  <h1 className="konfig-title">{t.step5.title}</h1>
                  <p className="konfig-subtitle">{t.step5.subtitle}</p>

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
                        <span className="konfig-room-name">{labelOf(t.step5.options, id)}</span>
                        {form.moteromVarighet === id && <span className="konfig-room-check"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 6: Aktiviteter ── */}
              {step === 6 && (
                <>
                  <h1 className="konfig-title">{t.step6.title}</h1>
                  <p className="konfig-subtitle">{t.step6.subtitle}</p>

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
                        <div className="konfig-act-group-cards">
                          {t.step6.summer.map(({ id, title, description }) => {
                            const selected = isAktivitetSelected(id)
                            return (
                              <button key={id} className={`konfig-act-card ${selected ? 'selected' : ''}`} onClick={() => toggleAktivitet(id)}>
                                <div className="konfig-act-card-img-wrap"><img src={ACTIVITY_IMAGES[id]} alt={title} className="konfig-act-card-img" /></div>
                                <div className="konfig-act-card-body">
                                  <p className="konfig-act-card-title">{title}</p>
                                  <p className="konfig-act-card-desc">{description}</p>
                                </div>
                                {selected && <div className="konfig-act-card-check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {viseVinterAktiviteter && (
                      <div className="konfig-act-group">
                        <div className="konfig-act-group-cards">
                          {t.step6.winter.map(({ id, title, description }) => {
                            const selected = isAktivitetSelected(id)
                            return (
                              <button key={id} className={`konfig-act-card ${selected ? 'selected' : ''}`} onClick={() => toggleAktivitet(id)}>
                                <div className="konfig-act-card-img-wrap"><img src={ACTIVITY_IMAGES[id]} alt={title} className="konfig-act-card-img" /></div>
                                <div className="konfig-act-card-body">
                                  <p className="konfig-act-card-title">{title}</p>
                                  <p className="konfig-act-card-desc">{description}</p>
                                </div>
                                {selected && <div className="konfig-act-card-check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div className="konfig-act-group">
                      <div className="konfig-act-group-cards">
                        {t.step6.allYear.map(({ id, title, description }) => {
                          const selected = isAktivitetSelected(id)
                          return (
                            <button key={id} className={`konfig-act-card ${selected ? 'selected' : ''}`} onClick={() => toggleAktivitet(id)}>
                              <div className="konfig-act-card-img-wrap"><img src={ACTIVITY_IMAGES[id]} alt={title} className="konfig-act-card-img" /></div>
                              <div className="konfig-act-card-body">
                                <p className="konfig-act-card-title">{title}</p>
                                <p className="konfig-act-card-desc">{description}</p>
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
                  <h1 className="konfig-title">{t.step7.title}</h1>
                  <div className="konfig-form-grid">
                    <div className="konfig-field">
                      <label className="konfig-label">{t.step7.name}</label>
                      <input type="text" className="konfig-input" placeholder={t.step7.namePlaceholder} value={form.navn} onChange={e => set('navn', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">{t.step7.company}</label>
                      <input type="text" className="konfig-input" placeholder={t.step7.companyPlaceholder} value={form.bedrift} onChange={e => set('bedrift', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">{t.step7.email}</label>
                      <input type="email" className="konfig-input" placeholder={t.step7.emailPlaceholder} value={form.epost} onChange={e => set('epost', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">{t.step7.phone}</label>
                      <input type="tel" className="konfig-input" placeholder={t.step7.phonePlaceholder} value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div className="konfig-field">
                    <textarea className="konfig-input konfig-textarea" placeholder={t.step7.notePlaceholder} rows={3} value={form.merknad} onChange={e => set('merknad', e.target.value)} />
                  </div>
                  <button className="konfig-submit" disabled={!form.navn || !form.epost || sender} onClick={handleSubmit}>
                    {sender ? t.step7.sending : t.step7.submit}
                  </button>
                  <p className="konfig-hint">{t.step7.hint}</p>
                </>
              )}
            </div>

            {/* ── Shared nav — outside animated step so it never jumps ── */}
            <div className="konfig-nav">
              {step > 1
                ? <button className="konfig-back" onClick={prev}>{t.nav.back}</button>
                : <span />
              }
              {step < TOTAL && <button className="konfig-next" onClick={next} disabled={!kanGaVidere}>{t.nav.next}</button>}
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
                    <img src="/assets/images/akt-baalpanne.jpg" alt="" className="konfig-summary-hero-img" />
                    <div className="konfig-summary-hero-overlay" />
                    <img src="/assets/logo/logo.png" alt={t.logoAlt} className="konfig-summary-hero-logo" />
                  </div>
                  <h3 className="konfig-summary-title">{t.summary.title}</h3>
                  <div className="konfig-summary-list">
                    {[
                      { label: t.summary.occasion, value: form.anledning === 'Annet' ? form.annetAnledning : labelOf(t.step1.options, form.anledning) },
                      { label: t.summary.arrival, value: form.datoModus === 'datoer' ? fmt(form.datoFra) : '' },
                      { label: t.summary.departure, value: form.datoModus === 'datoer' ? fmt(form.datoTil) : '' },
                      { label: t.summary.preferredMonth, value: form.datoModus === 'fleksibel' && form.fleksibeltManed ? displayMonth(form.fleksibeltManed) : '' },
                      { label: t.summary.duration, value: form.datoModus === 'fleksibel' && form.fleksibeltNetter ? labelOf(t.step2.durations, form.fleksibeltNetter) : '' },
                      { label: t.summary.guests, value: form.antall ? labelOf(t.step3.options, form.antall) : '' },
                      { label: t.summary.roomType, value: form.romtyper.map(r => labelOf(t.step4.options, r)).join(', ') },
                      { label: t.summary.meetingRoom, value: form.moteromVarighet ? labelOf(t.step5.options, form.moteromVarighet) : '' },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="konfig-summary-row">
                        <span className="konfig-summary-key">{item.label}</span>
                        <span className="konfig-summary-val">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {form.aktiviteter.length > 0 && (
                    <div className="konfig-summary-activities">
                      <span className="konfig-summary-key">{t.summary.activities}</span>
                      <div className="konfig-summary-activity-grid">
                        {form.aktiviteter.map(id => {
                          const title = allActivities.find(a => a.id === id)?.title ?? id
                          return (
                            <div key={id} className="konfig-summary-activity-item">
                              {ACTIVITY_IMAGES[id] && <img src={ACTIVITY_IMAGES[id]} alt={title} />}
                              <span>{title}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <p className="konfig-summary-note">
                    {t.summary.note}
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
