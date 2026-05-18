'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeEkspedisjonstur() {
  return (
    <PackageTemplate
      title="Ekspedisjonstur"
      subtitle="I fotsporene til Nansen og Amundsen"
      intro="Hardangervidda har vært treningsbane for noen av Norges største polfarere. Her får dere kjenne på den samme stillheten, det samme været, det samme mestringsfølelsen — i et tempo som passer gruppen. Hotellet pakker sekken, og guidene kjenner ruta."
      heroImage={{
        src: '/assets/images/R1 04555 0014.jpg',
        alt: 'Ekspedisjonstur på Finse'
      }}
      gallery={[
        { src: '/assets/images/R1 04555 0014.jpg', alt: 'Ekspedisjonstur på Finse' },
        { src: '/assets/images/tur.png', alt: 'På tur' },
        { src: '/assets/images/kart.png', alt: 'Historisk kart' },
        { src: '/assets/images/finse.jpg', alt: 'Finse landskap' },
      ]}
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Fullpensjon med energirik mat' },
        { icon: 'ski', text: 'Guidede turer (ski, bre eller sykkel)' },
        { icon: 'gear', text: 'Utstyr kan leies på stedet' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={['Teambuilding', 'Kick-off', 'Privat arrangement', 'Ledergruppe']}
      itinerary={[
        {
          label: 'Ankomst',
          items: [
            { time: '14:00', title: 'Tog til Finse', desc: 'Nyt turen gjennom fjellet' },
            { time: '16:00', title: 'Innsjekk og briefing', desc: 'Gjennomgang av morgendagens tur' },
            { time: '19:00', title: 'Middag', desc: 'Kraftig og god mat før eventyret' },
          ]
        },
        {
          label: 'Eventyr på vidda',
          items: [
            { time: '07:30', title: 'Tidlig frokost', desc: 'Energi til dagens tur' },
            { time: '09:00', title: 'Guidet tur', desc: 'Ski, brevandring eller Rallarvegen' },
            { time: '16:00', title: 'Avslapning', desc: 'Velfortjent hvile etter turen' },
            { time: '19:30', title: 'Festmiddag', desc: 'Feiring av dagens bragder' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Sen frokost', desc: 'Ta det med ro før hjemreisen' },
            { time: '11:00', title: 'Utsjekk', desc: 'Siste fotostopp ved stasjonen' },
            { time: '12:00', title: 'Tog hjem', desc: 'Med gode minner i bagasjen' },
          ]
        },
      ]}
      ctaNote="Vi tilpasser aktivitetene etter sesong og ønsker."
    />
  )
}
