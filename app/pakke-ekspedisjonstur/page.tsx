'use client'

import PackageTemplate from '../components/PackageTemplate'

export default function PakkeEkspedisjonstur() {
  return (
    <PackageTemplate
      title="Ekspedisjonstur"
      subtitle="I fotsporene til Nansen og Amundsen"
      intro="Finse og omgivelsene rundt hotellet har vært base for norske polfarere i over hundre år. Her får dere kjenne på det selv, i et tempo som passer gruppen. Turene og utfordringene tilpasses deres eget ambisjonsnivå og program."
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
          label: 'Ankomst og forberedelser',
          items: [
            { time: '12:00', title: 'Ankomst, innsjekk og lunsj', desc: 'Lunsj serveres etter ønske.' },
            { time: '13:00', title: 'Arbeidsøkt', desc: 'Tid i møterommet fram til 16:00.' },
            { time: '16:00', title: 'Briefing', desc: 'Vi går gjennom morgendagens tur, planlegger og tilpasser utstyr.' },
            { time: '19:00', title: 'Tre retters middag', desc: 'Med utsikt mot Hardangerjøkulen.' },
          ]
        },
        {
          label: 'Eventyr på vidda',
          items: [
            { time: '07:00', title: 'Mulighet for morgenbading', desc: 'Om ønskelig kan vi fyre opp bålpannen og servere kaffe til morgenfugler som vil starte dagen med et bad i Finsevann, med utsikt mot blåisen på Hardangerjøkulen.' },
            { time: '08:00', title: 'Tidlig frokost', desc: 'Energi til dagen.' },
            { time: '09:00', title: 'Guidet tur', desc: 'Ski, brevandring eller sykkeltur på Rallarvegen.' },
            { time: '16:00', title: 'Hjem til hotellet', desc: 'Hvile, badstu, peis eller noe å drikke i solveggen.' },
            { time: '19:30', title: 'Festmiddag', desc: 'God mat og godt drikke.' },
          ]
        },
        {
          label: 'Avreise',
          items: [
            { time: '09:00', title: 'Sen frokost', desc: 'Ta det med ro.' },
            { time: '10:00', title: 'Kaffe', desc: 'Foran peisen eller foran bålpannen ute.' },
            { time: '10:30', title: 'Tog hjem', desc: 'Muligheter for å leie egen togvogn eller togkupé for et avsluttende møte.' },
          ]
        },
      ]}
      activities={[
        {
          name: 'Sykkeltur på Rallarvegen',
          desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.',
          image: '/assets/images/Finse_pakker00004.jpg',
        },
        {
          name: 'Brevandring',
          desc: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.',
          image: '/assets/images/Finse_pakker00003.jpg',
        },
        {
          name: 'Fottur i området',
          desc: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.',
          image: '/assets/images/Finse_pakker00007.jpg',
        },
        {
          name: 'Morgenbad i Finsevann',
          desc: 'Morgenbad, bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen. En enkel opplevelse med stor effekt.',
          image: '/assets/images/Finse_pakker00010.jpg',
        },
      ]}
      ctaNote="Vi tilpasser aktivitetene etter sesong og ønsker."
    />
  )
}
