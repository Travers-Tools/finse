'use client'

import Link from 'next/link'
import { useLang } from '@/lib/useLang'
import { localePath } from '@/lib/i18n'
import { pakkeKort } from '@/content/pakker'

export default function PackagesSection() {
  const lang = useLang()
  const packages = pakkeKort[lang]

  return (
    <section className="content-section section-packages">
      <div className="container">
        <div id="pakker" className="packages-grid">
          {packages.map((pkg, index) => (
            <Link
              key={index}
              href={localePath(lang, pkg.href)}
              className={`package-card ${pkg.isCustom ? 'package-card-custom' : ''}`}
            >
              <div
                className="package-image"
                style={pkg.imageFit === 'contain' ? { background: '#0d1014' } : undefined}
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    ...(pkg.imagePosition ? { objectPosition: pkg.imagePosition } : {}),
                    ...(pkg.imageFit ? { objectFit: pkg.imageFit } : {}),
                  }}
                />
                <div className="package-gradient"></div>
              </div>
              <span className="package-tag">{pkg.tag}</span>
              <div className="package-content">
                <h3 className="package-name">{pkg.title}</h3>
                <p className="package-copy">{pkg.description}</p>
                <span className="package-link">{pkg.linkText}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
