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
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Fullpensjon med god mat' },
        { icon: 'briefcase', text: 'Møterom og fasiliteter' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={[
        { anledning: 'Ledergruppe', note: 'Fokusert tid sammen, langt unna inboksen og distraksjonene.' },
        { anledning: 'Strategisamling', note: 'Plass og ro til de store beslutningene som krever full oppmerksomhet.' },
        { anledning: 'Konferanse', note: 'Intimt format med møterom og overnatting på samme sted.' },
        { anledning: 'Teambuilding', note: 'Kombinerer arbeidsøkter med felles turer og måltider.' },
      ]}
      itinerary={[
        {
          label: 'Ankomst og innsjekk',
          items: [
            { time: '14:00', title: 'Ankomst Finse', desc: 'Innsjekk og kaffe i lobbyen' },
            { time: '15:30', title: 'Kort vandring', desc: 'Bli kjent med omgivelsene' },
            { time: '19:00', title: 'Middag', desc: 'Lokal meny med sesongvarer' },
          ]
        },
        {
          label: 'Fokus og refleksjon',
          items: [
            { time: '08:00', title: 'Frokost', desc: 'Rolig start på dagen' },
            { time: '09:30', title: 'Arbeidsøkt', desc: 'Strategimøte i møterommet' },
            { time: '12:30', title: 'Lunsj og frisk luft', desc: 'Pause med tur på vidda' },
            { time: '14:30', title: 'Arbeidsøkt', desc: 'Oppsummering og veien videre' },
            { time: '19:00', title: 'Middag ved peisen', desc: 'God mat og gode samtaler' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '08:30', title: 'Frokost', desc: 'Siste måltid på Finse' },
            { time: '10:00', title: 'Oppsummering', desc: 'Ta med innsiktene hjem' },
            { time: '12:00', title: 'Tog hjem', desc: 'Fornyet energi og klare mål' },
          ]
        },
      ]}
      ctaNote="Vi tilpasser oppholdet etter deres behov."
    />
  )
}
