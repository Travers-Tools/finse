import Link from 'next/link'

interface Package {
  href: string
  image: string
  imagePosition?: string
  imageFit?: 'cover' | 'contain'
  tag: string
  title: string
  description: string
  linkText: string
  isCustom?: boolean
}

export default function PackagesSection() {
  const packages: Package[] = [
    {
      href: '/pakke-fokus-paa-vidda',
      image: '/assets/images/akt-fokus-vidda.jpg',
      tag: 'Ledergrupper',
      title: 'Fokus på vidda',
      description: 'For team som trenger tid til de viktige samtalene – langt unna alt som maser.',
      linkText: 'Utforsk'
    },
    {
      href: '/pakke-ekspedisjonstur',
      image: '/assets/images/ekspedisjon-guide.jpg',
      imagePosition: 'center 20%',
      tag: 'Eventyr',
      title: 'Ekspedisjonstur',
      description: 'Dager fulle av turer, ski eller Rallarvegen – og kveldene foran peisen.',
      linkText: 'Utforsk'
    },
    {
      href: '/pakke-hotellet-for-dere',
      image: '/assets/images/hotellet-hero.jpg',
      tag: 'Fra 30 til 110 gjester',
      title: 'Hotellet for dere selv',
      description: 'For jubileer, kickoffs, møter, konferanser og feiringer der dere vil ha Hotel Finse1222 for dere selv.',
      linkText: 'Utforsk'
    },
    {
      href: '/configurator',
      image: '/assets/images/skreddersom.jpg',
      tag: 'Lag ditt eget',
      title: 'Skreddersøm',
      description: 'Har du andre ønsker? Vi hjelper deg å skape det perfekte oppholdet.',
      linkText: 'Start planleggingen',
      isCustom: true
    }
  ]

  return (
    <section className="content-section section-packages">
      <div className="container">
        <div id="pakker" className="packages-grid">
          {packages.map((pkg, index) => (
            <Link
              key={index}
              href={pkg.href}
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
