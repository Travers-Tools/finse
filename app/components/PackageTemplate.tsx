'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import { Icon, IconName } from './PackageIcons'
import { KlimaChip } from './Klima'
import { useLang } from '@/lib/useLang'
import { localePath } from '@/lib/i18n'
import { pakkeUi, allePakker, HOST_IMAGE } from '@/content/pakker'
import './package.css'

export interface PackageItem {
  icon: IconName
  text: string
}

export interface PackageDayItem {
  time: string
  title: string
  desc: string
}

export interface PackageDay {
  label: string
  items: PackageDayItem[]
}

export interface PackageActivity {
  name: string
  desc: string
  image: string
}

export interface PackageData {
  /** Norsk sti til denne pakken, f.eks. «/pakke-fokus-paa-vidda». Brukes til å filtrere «Andre pakker». */
  slug: string
  title: string
  subtitle: string
  intro: string
  heroImage: { src: string; alt: string }
  gallery: { src: string; alt: string }[]
  includes: PackageItem[]
  suitableFor: string[]
  itinerary: PackageDay[]
  activities: PackageActivity[]
  ctaNote: string
}

export default function PackageTemplate(data: PackageData) {
  const lang = useLang()
  const t = pakkeUi[lang]
  const visibleImages = data.gallery.slice(0, 3)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [openDays, setOpenDays] = useState<number[]>([])

  const galleryCount = data.gallery.length
  const openGallery = (i: number) => {
    setGalleryIndex(i)
    setGalleryOpen(true)
  }
  const showPrev = () =>
    setGalleryIndex(i => (i - 1 + galleryCount) % galleryCount)
  const showNext = () =>
    setGalleryIndex(i => (i + 1) % galleryCount)

  const toggleDay = (i: number) => {
    setOpenDays(curr =>
      curr.includes(i) ? curr.filter(d => d !== i) : [...curr, i]
    )
  }

  useEffect(() => {
    if (!galleryOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGalleryOpen(false)
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [galleryOpen, galleryCount])

  return (
    <div className="pkg-page">
      <Header variant="light" showBackButton={false} faqHref="/#faq" />

      {/* ── Photo grid hero ── */}
      <section className="pkg-gallery-hero">
        <div className="pkg-inner">
          <div className="pkg-photo-grid">
            {visibleImages.map((img, i) => (
              <figure key={i} className={`pkg-photo pkg-photo-${i + 1}`}>
                <img src={img.src} alt={img.alt} />
              </figure>
            ))}
            {data.gallery.length > visibleImages.length && (
              <button
                type="button"
                className="pkg-show-all"
                onClick={() => openGallery(0)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                {t.showAll}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Lightbox modal ── */}
      {galleryOpen && (
        <div className="pkg-lightbox" role="dialog" aria-modal="true" aria-label={t.lightboxLabel}>
          <div className="pkg-lightbox-bar">
            <span className="pkg-lightbox-counter">{galleryIndex + 1} / {galleryCount}</span>
            <button
              type="button"
              className="pkg-lightbox-close"
              onClick={() => setGalleryOpen(false)}
              aria-label={t.close}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div
            className="pkg-lightbox-stage"
            onClick={(e) => e.currentTarget === e.target && setGalleryOpen(false)}
          >
            {galleryCount > 1 && (
              <button
                type="button"
                className="pkg-lightbox-nav pkg-lightbox-prev"
                onClick={showPrev}
                aria-label={t.prev}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <figure className="pkg-lightbox-figure">
              <img
                key={galleryIndex}
                src={data.gallery[galleryIndex].src}
                alt={data.gallery[galleryIndex].alt}
              />
            </figure>

            {galleryCount > 1 && (
              <button
                type="button"
                className="pkg-lightbox-nav pkg-lightbox-next"
                onClick={showNext}
                aria-label={t.next}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {galleryCount > 1 && (
            <div className="pkg-lightbox-thumbs">
              {data.gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pkg-lightbox-thumb ${i === galleryIndex ? 'is-active' : ''}`}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={t.showImage(i + 1)}
                >
                  <img src={img.src} alt={img.alt} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Two-column content ── */}
      <section className="pkg-content">
        <div className="pkg-inner">
          <div className="pkg-content-grid">
            {/* Main column */}
            <div className="pkg-main">
              {/* Title */}
              <div className="pkg-title-block">
                <p className="pkg-eyebrow">{data.subtitle}</p>
                <h1 className="pkg-title">{data.title}</h1>
                <ul className="pkg-suitable-list">
                  <li>
                    <KlimaChip />
                  </li>
                  {data.suitableFor.map(s => (
                    <li key={s} className="pkg-suitable-chip">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Intro */}
              <div className="pkg-block">
                <p className="pkg-intro-body">{data.intro}</p>
              </div>

              {/* Includes */}
              <div className="pkg-block">
                <h2 className="pkg-block-title">{t.includes}</h2>
                <ul className="pkg-includes-grid">
                  {data.includes.map((item, i) => (
                    <li key={i} className="pkg-includes-item">
                      <span className="pkg-includes-icon"><Icon name={item.icon} /></span>
                      <span className="pkg-includes-text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Itinerary */}
              <div className="pkg-block">
                <h2 className="pkg-block-title">{t.itinerary}</h2>
                <p className="pkg-block-note">{t.itineraryNote}</p>
                <ol className="pkg-itinerary-list">
                  {data.itinerary.map((day, i) => {
                    const isOpen = openDays.includes(i)
                    return (
                      <li key={i} className={`pkg-day ${isOpen ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="pkg-day-head"
                          onClick={() => toggleDay(i)}
                          aria-expanded={isOpen}
                          aria-controls={`pkg-day-content-${i}`}
                        >
                          <span className="pkg-day-num">{t.day(i + 1)}</span>
                          <h3 className="pkg-day-label">{day.label}</h3>
                          <span className="pkg-day-chevron" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>
                        <div
                          id={`pkg-day-content-${i}`}
                          className="pkg-day-content"
                        >
                          <ul className="pkg-day-timeline">
                            {day.items.map((item, j) => (
                              <li key={j} className="pkg-day-item">
                                <span className="pkg-day-time">{item.time}</span>
                                <div className="pkg-day-item-body">
                                  <strong className="pkg-day-item-title">{item.title}</strong>
                                  {item.desc && <p className="pkg-day-item-desc">{item.desc}</p>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Activities */}
              {data.activities.length > 0 && (
                <div className="pkg-block">
                  <h2 className="pkg-block-title">{t.activities}</h2>
                  <ul className="pkg-activities-grid">
                    {data.activities.map(a => {
                      const periodMatch = a.desc.match(t.periodRegex)
                      const periode = periodMatch ? periodMatch[1] : null
                      const desc = periodMatch ? a.desc.slice(periodMatch[0].length) : a.desc
                      return (
                        <li key={a.name} className="pkg-activity">
                          <div className="pkg-activity-img">
                            <img src={a.image} alt={a.name} />
                            {periode && <span className="pkg-activity-pill">{periode}</span>}
                          </div>
                          <div className="pkg-activity-body">
                            <h3 className="pkg-activity-name">{a.name}</h3>
                            <p className="pkg-activity-desc">{desc}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Host */}
              <div className="pkg-block pkg-host">
                <h2 className="pkg-block-title">{t.host}</h2>
                <div className="pkg-host-card">
                  <img src={HOST_IMAGE} alt={t.hostName} className="pkg-host-img" />
                  <div className="pkg-host-body">
                    <p className="pkg-host-name">{t.hostName}</p>
                    <p className="pkg-host-role">{t.hostRole}</p>
                    <p className="pkg-host-intro">{t.hostIntro}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky info card */}
            <aside className="pkg-aside">
              <div className="pkg-card">
                <h3 className="pkg-card-title">{t.cardTitle}</h3>
                <p className="pkg-card-body">{t.cardBody}</p>
                <Link href={localePath(lang, '/configurator')} className="pkg-btn">
                  {t.cardCta}
                </Link>
                <p className="pkg-card-note">{t.cardNote}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Andre pakker ── */}
      <section className="pkg-others">
        <div className="pkg-inner">
          <h2 className="pkg-others-title">{t.others}</h2>
          <div className="pkg-others-grid">
            {allePakker[lang].filter(p => p.slug !== data.slug).map(p => (
              <Link key={p.slug} href={localePath(lang, p.slug)} className="pkg-other">
                <div className="pkg-other-img">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="pkg-other-body">
                  <p className="pkg-other-subtitle">{p.subtitle}</p>
                  <h3 className="pkg-other-title">
                    {p.title}
                    <span className="pkg-other-arrow" aria-hidden="true">→</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
