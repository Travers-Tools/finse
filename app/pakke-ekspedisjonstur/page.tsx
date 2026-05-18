'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeEkspedisjonstur() {
  return (
    <PackageTemplate
      title="Ekspedisjonstur"
      subtitle="I fotsporene til Nansen og Amundsen"
      intro="Hardangervidda har vært treningsbane for norske polfarere i over hundre år. Her får dere kjenne på det selv, i et tempo som passer gruppen. Hotellet pakker sekken og guidene kjenner ruta."
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
        { icon: 'food', text: 'Frokost, matpakke og treretters middag' },
        { icon: 'ski', text: 'Guidede turer (ski, bre eller sykkel)' },
        { icon: 'gear', text: 'Utstyr kan leies på stedet' },
        { icon: 'fire', text: 'Kvelder ved peisen' },
      ]}
      suitableFor={['Teambuilding', 'Kick-off', 'Privat arrangement', 'Ledergruppe']}
      itinerary={[
        {
          label: 'Ankomst',
          items: [
            { time: '14:00', title: 'Tog til Finse', desc: 'Gjennom fjellet' },
            { time: '16:00', title: 'Innsjekk og briefing', desc: 'Vi går gjennom morgendagens tur' },
            { time: '19:00', title: 'Middag', desc: 'Solid mat før dere drar ut' },
          ]
        },
        {
          label: 'Eventyr på vidda',
          items: [
            { time: '07:30', title: 'Tidlig frokost', desc: 'Energi til dagen' },
            { time: '09:00', title: 'Guidet tur', desc: 'Ski, brevandring eller Rallarvegen' },
            { time: '16:00', title: 'Hjem til hotellet', desc: 'Hvile, badstu, peis' },
            { time: '19:30', title: 'Festmiddag', desc: 'God mat og god vin' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Sen frokost', desc: 'Ta det med ro' },
            { time: '11:00', title: 'Utsjekk', desc: 'Siste fotostopp ved stasjonen' },
            { time: '12:00', title: 'Tog hjem', desc: '' },
          ]
        },
      ]}
      activities={[
        {
          name: 'Sykkeltur til Fagernut',
          desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Sykler og hjelmer fra hotellet.',
          image: '/assets/images/Finse_pakker00004.jpg',
        },
        {
          name: 'Fottur i området',
          desc: 'Juli til september. Lille Finsenut, Jomfrunut-runden eller egen løype. Med eller uten guide.',
          image: '/assets/images/Finse_pakker00007.jpg',
        },
        {
          name: 'Bålpanne og after hike/ski',
          desc: 'Avslutt dagen ved Framheim med bålpanne og varmt drikke. Hotellet ordner utstyret.',
          image: '/assets/images/Finse_configurator_background.jpg',
        },
        {
          name: 'Bålpanne & bading ved Framheim',
          desc: 'Morgenbad eller after hike med bålpanne og varmt drikke. En enkel opplevelse med stor effekt.',
          image: '/assets/images/Finse_pakker00010.jpg',
        },
      ]}
      ctaNote="Vi tilpasser aktivitetene etter sesong og ønsker."
    />
  )
}
