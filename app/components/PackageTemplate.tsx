'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from './Header'
import { Icon, IconName } from './PackageIcons'
import './package.css'

export interface PackageItem {
  icon: IconName
  text: string
}

export interface PackageDay {
  label: string
  body: string
}

export interface PackageData {
  title: string
  subtitle: string
  intro: string
  heroImage: { src: string; alt: string }
  gallery: { src: string; alt: string }[]
  tags: string[]
  includes: PackageItem[]
  itinerary: PackageDay[]
  ctaNote: string
}

export default function PackageTemplate(data: PackageData) {
  const [activeImage, setActiveImage] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)

  return (
    <div className="pkg-page">
      <Header variant="light" showBackButton={true} />

      {/* ── Hero ── */}
      <section className="pkg-hero">
        <img
          src={data.heroImage.src}
          alt={data.heroImage.alt}
          className="pkg-hero-img"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="pkg-hero-overlay" />
        <div className={`pkg-hero-body ${heroLoaded ? 'is-ready' : ''}`}>
          <div className="pkg-inner">
            <p className="pkg-hero-subtitle">{data.subtitle}</p>
            <h1 className="pkg-hero-title">{data.title}</h1>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="pkg-intro">
        <div className="pkg-inner">
          <p className="pkg-intro-body">{data.intro}</p>
        </div>
      </section>

      {/* ── Tags ── */}
      {data.tags.length > 0 && (
        <section className="pkg-tags-section">
          <div className="pkg-inner">
            <ul className="pkg-tags">
              {data.tags.map(t => (
                <li key={t} className="pkg-tag">{t}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section className="pkg-gallery">
        <div className="pkg-inner">
          <div className="pkg-gallery-main">
            <img
              src={data.gallery[activeImage].src}
              alt={data.gallery[activeImage].alt}
            />
          </div>
          <div className="pkg-gallery-thumbs">
            {data.gallery.map((img, i) => (
              <button
                key={i}
                className={`pkg-gallery-thumb ${i === activeImage ? 'is-active' : ''}`}
                onClick={() => setActiveImage(i)}
                aria-label={`Vis bilde ${i + 1}`}
              >
                <img src={img.src} alt={img.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Includes ── */}
      <section className="pkg-includes">
        <div className="pkg-inner">
          <span className="pkg-eyebrow">Inkludert</span>
          <h2 className="pkg-section-title">Dette får dere</h2>
          <ul className="pkg-includes-list">
            {data.includes.map((item, i) => (
              <li key={i} className="pkg-includes-row">
                <span className="pkg-includes-icon"><Icon name={item.icon} /></span>
                <span className="pkg-includes-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Itinerary ── */}
      <section className="pkg-itinerary">
        <div className="pkg-inner">
          <span className="pkg-eyebrow">Programmet</span>
          <h2 className="pkg-section-title">Slik kan oppholdet se ut</h2>
          <ol className="pkg-itinerary-list">
            {data.itinerary.map((day, i) => (
              <li key={i} className="pkg-day">
                <span className="pkg-day-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="pkg-day-content">
                  <h3 className="pkg-day-label">{day.label}</h3>
                  <p className="pkg-day-body">{day.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pkg-cta">
        <div className="pkg-inner">
          <h2 className="pkg-cta-title">Klar for å planlegge?</h2>
          <p className="pkg-cta-lead">{data.ctaNote}</p>
          <Link href="/configurator" className="pkg-btn">
            Start planleggingen
          </Link>
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
