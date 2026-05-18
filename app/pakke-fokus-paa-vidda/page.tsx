'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeFokusPaaVidda() {
  return (
    <PackageTemplate
      title="Fokus på vidda"
      subtitle="Tid til de viktige samtalene"
      intro="På Finse er det toget som tar dere frem. Gå på i byen, gå av på vidda. Vi møter dere på perrongen. For ledergrupper som trenger fokusert tid sammen, langt unna alt som maser."
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
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Fullpensjon med god mat' },
        { icon: 'briefcase', text: 'Møterom og fasiliteter' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={['Ledergruppe', 'Strategisamling', 'Konferanse', 'Teambuilding']}
      itinerary={[
        {
          label: 'Ankomst og innsjekk',
          items: [
            { time: '14:00', title: 'Ankomst Finse', desc: 'Innsjekk og kaffe i lobbyen' },
            { time: '15:30', title: 'Kort vandring', desc: 'Strekk på beina' },
            { time: '19:00', title: 'Middag', desc: 'Lokal meny, sesongvarer' },
          ]
        },
        {
          label: 'Fokus og refleksjon',
          items: [
            { time: '08:00', title: 'Frokost', desc: '' },
            { time: '09:30', title: 'Arbeidsøkt', desc: 'Strategimøte i møterommet' },
            { time: '12:30', title: 'Lunsj og frisk luft', desc: 'Tur på vidda' },
            { time: '14:30', title: 'Arbeidsøkt', desc: 'Oppsummering og veien videre' },
            { time: '19:00', title: 'Middag ved peisen', desc: '' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '08:30', title: 'Frokost', desc: '' },
            { time: '10:00', title: 'Oppsummering', desc: '' },
            { time: '12:00', title: 'Tog hjem', desc: '' },
          ]
        },
      ]}
      ctaNote="Vi tilpasser oppholdet etter deres behov."
    />
  )
}
