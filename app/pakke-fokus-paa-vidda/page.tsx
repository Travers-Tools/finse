'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeFokusPaaVidda() {
  return (
    <PackageTemplate
      title="Fokus på vidda"
      subtitle="Tid til de viktige samtalene"
      intro="På Finse er det toget som tar dere frem. Gå på toget i byen, gå av på vidda. Vi møter dere på perrongen. For ledergrupper som trenger fokusert tid sammen, langt unna alt som maser."
      heroImage={{
        src: '/assets/images/R1-04554-0028.jpg',
        alt: 'Fokus på vidda'
      }}
      gallery={[
        { src: '/assets/images/R1-04554-0028.jpg', alt: 'Ro ved vinduet mot vidda' },
        { src: '/assets/images/salong.jpg', alt: 'Salong med utsikt' },
        { src: '/assets/images/pkg-fokus.jpg', alt: 'Møterom med utsikt mot vidda' },
        { src: '/assets/images/finse1222__182.JPG', alt: 'Avslapning i solveggen' },
      ]}
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Frokost, lunsj og treretters middag' },
        { icon: 'briefcase', text: 'Møterom og fasiliteter' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={['Ledergruppe', 'Strategisamling', 'Konferanse', 'Teambuilding']}
      itinerary={[
        {
          label: 'Ankomst og første kveld',
          items: [
            { time: '12:00', title: 'Ankomst, innsjekk og lunsj', desc: 'Vi møter dere på perrongen. Lunsj serveres etter ønske.' },
            { time: '13:00', title: 'Arbeidsøkt', desc: 'Uforstyrret tid i møterommet fram til 15:30.' },
            { time: '15:30', title: 'Aktivitet', desc: 'Kort vandring, sykkeltur, skitur eller tilrettelagt aktivitet.' },
            { time: '19:00', title: 'Tre retters middag', desc: 'Med utsikt mot Hardangerjøkulen.' },
          ]
        },
        {
          label: 'Fokus og refleksjon',
          items: [
            { time: '07:00', title: 'Mulighet for morgenbading', desc: 'Om ønskelig kan vi fyre opp bålpannen og servere kaffe til morgenfugler som vil starte dagen med et bad i Finsevann, med utsikt mot blåisen på Hardangerjøkulen.' },
            { time: '08:00', title: 'Frokost', desc: '' },
            { time: '09:30', title: 'Arbeidsøkt', desc: 'Strategimøte i møterommet.' },
            { time: '12:30', title: 'Lunsj og frisk luft', desc: 'Tur på vidda.' },
            { time: '14:30', title: 'Arbeidsøkt', desc: 'Oppsummering og veien videre.' },
            { time: '19:00', title: 'Middag ved peisen', desc: '' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '08:30', title: 'Frokost', desc: '' },
            { time: '10:00', title: 'Oppsummering', desc: '' },
            { time: '12:00', title: 'Tog hjem', desc: 'Mulighet for å leie egen togvogn eller togkupé for et avsluttende møte.' },
          ]
        },
      ]}
      activities={[
        {
          name: 'Fottur i området',
          desc: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.',
          image: '/assets/images/akt-fottur.jpg',
        },
        {
          name: 'Sidersmaking',
          desc: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.',
          image: '/assets/images/akt-sider.jpg',
        },
        {
          name: 'Bålpanne og after hike/ski/bike',
          desc: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.',
          image: '/assets/images/akt-baalpanne.jpg',
        },
        {
          name: 'Finsequiz',
          desc: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.',
          image: '/assets/images/lobby-peis.jpg',
        },
      ]}
      ctaNote="Vi tilpasser oppholdet etter deres behov."
    />
  )
}
