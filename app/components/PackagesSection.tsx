import Link from 'next/link'

export default function PackagesSection() {
  const packages = [
    {
      href: '/pakke-fokus-paa-vidda',
      image: '/assets/images/R1-04554-0028.jpg',
      imagePosition: 'center 100%',
      imageScale: 1.8,
      tag: 'Ledergrupper',
      title: 'Fokus på vidda',
      description: 'For team som trenger tid til de viktige samtalene – langt unna alt som maser.',
      linkText: 'Utforsk'
    },
    {
      href: '/pakke-ekspedisjonstur',
      image: '/assets/images/ekspedisjon-guide.jpg',
      tag: 'Eventyr',
      title: 'Ekspedisjonstur',
      description: 'Dager fulle av turer, ski eller Rallarvegen – og kveldene foran peisen.',
      linkText: 'Utforsk'
    },
    {
      href: '/pakke-hotellet-for-dere',
      image: '/assets/images/hotellet-hero.jpg',
      tag: 'Opp til 110 gjester',
      title: 'Hotellet for dere selv',
      description: 'For jubileer, kickoffs og feiringer der dere vil ha Hotel Finse1222 for dere selv.',
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
              <div className="package-image">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    ...(pkg.imagePosition ? { objectPosition: pkg.imagePosition } : {}),
                    ...(pkg.imageScale ? { transform: `scale(${pkg.imageScale})` } : {}),
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
