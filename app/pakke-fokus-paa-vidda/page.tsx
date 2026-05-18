'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeFokusPaaVidda() {
  return (
    <PackageTemplate
      title="Fokus på vidda"
      subtitle="Tid til de viktige samtalene"
      intro="På Finse er det toget som tar dere frem. Gå på i byen, gå av på vidda — vi møter dere på perrongen. For ledergrupper som trenger fokusert tid sammen og rom til de store beslutningene, langt unna alt som maser."
      heroImage={{
        src: '/assets/images/R1-04554-0028.jpg',
        alt: 'Fokus på vidda'
      }}
      gallery={[
        { src: '/assets/images/R1-04554-0028.jpg', alt: 'Fokus på vidda' },
        { src: '/assets/images/finse1222__182.JPG', alt: 'Interiør' },
        { src: '/assets/images/tak.png', alt: 'Utsikt' },
        { src: '/assets/images/finse.jpg', alt: 'Finse landskap' },
      ]}
      tags={['2–4 netter', 'Ledergrupper', 'Strategi']}
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Fullpensjon med god mat' },
        { icon: 'briefcase', text: 'Møterom og fasiliteter' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      itinerary={[
        {
          label: 'Ankomst og innsjekk',
          body: 'Toget setter dere av på stasjonen. Innsjekk og kaffe i lobbyen, en kort vandring for å bli kjent med omgivelsene, og en middag med lokal meny og sesongvarer.'
        },
        {
          label: 'Fokus og refleksjon',
          body: 'Rolig frokost, så strategimøte i møterommet. Pause med tur på vidda i lunsjen, før dere oppsummerer og legger veien videre. Middag ved peisen — god mat og gode samtaler.'
        },
        {
          label: 'Avreise med klare mål',
          body: 'Siste frokost på Finse og en kort oppsummering av innsiktene. Tog hjem — med fornyet energi og en klar retning.'
        },
      ]}
      ctaNote="Vi tilpasser oppholdet etter deres behov."
    />
  )
}
