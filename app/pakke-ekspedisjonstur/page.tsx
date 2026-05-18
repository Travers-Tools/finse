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
      tags={['2–4 netter', 'Eventyr', 'Friluftsliv']}
      includes={[
        { icon: 'bed', text: 'Overnatting i komfortable rom' },
        { icon: 'food', text: 'Fullpensjon med energirik mat' },
        { icon: 'ski', text: 'Guidede turer (ski, bre eller sykkel)' },
        { icon: 'gear', text: 'Utstyr kan leies på stedet' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      itinerary={[
        {
          label: 'Ankomst og forventning',
          body: 'Toget setter dere av på stasjonen, og hotellet tar imot. Innsjekk, briefing om morgendagens tur, og en kraftig middag som setter tonen for det som venter.'
        },
        {
          label: 'Eventyr på vidda',
          body: 'Tidlig frokost og guidet tur — ski, bre eller Rallarvegen avhengig av sesong. Pause for lunsj underveis, og hjem til avslapning. Festmiddag som markerer dagens bragder.'
        },
        {
          label: 'Avreise i ro',
          body: 'Sen frokost og utsjekk. Tid for en siste fotostopp ved stasjonen før toget tar dere hjem — med gode minner og litt vind i ansiktet.'
        },
      ]}
      ctaNote="Vi tilpasser aktivitetene etter sesong og ønsker."
    />
  )
}
