'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from './Header'
import { Icon, IconName } from './PackageIcons'
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

const DEFAULT_HOST = {
  name: 'Henriette & Daniel',
  role: 'Dine verter på Finse 1222',
  image: '/assets/images/oss.JPG',
  intro: 'Vi tar imot dere på perrongen og sørger for at alt er klart når dere kommer. Si fra hva dere ønsker, så tilpasser vi.',
}

export default function PackageTemplate(data: PackageData) {
  const visibleImages = data.gallery.slice(0, 3)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [openDays, setOpenDays] = useState<number[]>([])

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
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [galleryOpen])

  return (
    <div className="pkg-page">
      <Header variant="light" showBackButton={false} />

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
                onClick={() => setGalleryOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Vis alle bilder
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Lightbox modal ── */}
      {galleryOpen && (
        <div className="pkg-lightbox" role="dialog" aria-modal="true" aria-label="Alle bilder">
          <button
            type="button"
            className="pkg-lightbox-close"
            onClick={() => setGalleryOpen(false)}
            aria-label="Lukk bildegalleri"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="pkg-lightbox-inner" onClick={(e) => e.currentTarget === e.target && setGalleryOpen(false)}>
            <div className="pkg-lightbox-grid">
              {data.gallery.map((img, i) => (
                <figure key={i} className="pkg-lightbox-photo">
                  <img src={img.src} alt={img.alt} />
                </figure>
              ))}
            </div>
          </div>
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
                {data.suitableFor.length > 0 && (
                  <ul className="pkg-suitable-list">
                    {data.suitableFor.map(s => (
                      <li key={s} className="pkg-suitable-chip">{s}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Intro */}
              <div className="pkg-block">
                <p className="pkg-intro-body">{data.intro}</p>
              </div>

              {/* Includes */}
              <div className="pkg-block">
                <h2 className="pkg-block-title">Dette er inkludert</h2>
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
                <h2 className="pkg-block-title">Slik kan oppholdet se ut</h2>
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
                          <span className="pkg-day-num">Dag {i + 1}</span>
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
                  <h2 className="pkg-block-title">Opplevelser</h2>
                  <ul className="pkg-activities-grid">
                    {data.activities.map(a => (
                      <li key={a.name} className="pkg-activity">
                        <div className="pkg-activity-img">
                          <img src={a.image} alt={a.name} />
                        </div>
                        <div className="pkg-activity-body">
                          <h3 className="pkg-activity-name">{a.name}</h3>
                          <p className="pkg-activity-desc">{a.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Host */}
              <div className="pkg-block pkg-host">
                <h2 className="pkg-block-title">Vertskap</h2>
                <div className="pkg-host-card">
                  <img src={DEFAULT_HOST.image} alt={DEFAULT_HOST.name} className="pkg-host-img" />
                  <div className="pkg-host-body">
                    <p className="pkg-host-name">{DEFAULT_HOST.name}</p>
                    <p className="pkg-host-role">{DEFAULT_HOST.role}</p>
                    <p className="pkg-host-intro">{DEFAULT_HOST.intro}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky info card */}
            <aside className="pkg-aside">
              <div className="pkg-card">
                <h3 className="pkg-card-title">Skreddersy pakke</h3>
                <p className="pkg-card-body">Fortell oss hva som passer for gruppen. Vi setter sammen et forslag og svarer innen én arbeidsdag.</p>
                <Link href="/configurator" className="pkg-btn">
                  Start planleggingen
                </Link>
                <p className="pkg-card-note">Få gratis pristilbud</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pkg-footer">
        <div className="pkg-inner pkg-footer-inner">
          <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="pkg-footer-logo" />
          <p className="pkg-footer-tagline">Norges høyestliggende hotell · 1222 moh.</p>
          <div className="pkg-footer-meta">
            <Link href="/configurator" className="pkg-footer-link">Start planleggingen →</Link>
            <span className="pkg-footer-divider">·</span>
            <span className="pkg-footer-note">post@finse1222.no · +47 56 52 71 00</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
