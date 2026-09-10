import type { Lang } from '@/lib/i18n'
import type { PackageData } from '@/app/components/PackageTemplate'
import { aktiviteter, morgenbadItem } from './pakker'

const gallery = {
  no: [
    { src: '/assets/images/ekspedisjon-guide.jpg', alt: 'Guide briefer gruppen før turen' },
    { src: '/assets/images/ekspedisjon-sommer.jpg', alt: 'Sykkeltur mot Hardangerjøkulen' },
    { src: '/assets/images/pkg-hotellet.jpg', alt: 'Finse om sommeren' },
    { src: '/assets/images/pkg-ekspedisjon.jpg', alt: 'Skiseiling på vidda' },
  ],
  en: [
    { src: '/assets/images/ekspedisjon-guide.jpg', alt: 'Guide briefing the group before the trip' },
    { src: '/assets/images/ekspedisjon-sommer.jpg', alt: 'Cycling towards Hardangerjøkulen' },
    { src: '/assets/images/pkg-hotellet.jpg', alt: 'Finse in summer' },
    { src: '/assets/images/pkg-ekspedisjon.jpg', alt: 'Ski sailing on the plateau' },
  ],
}

const a = aktiviteter

export const pakkeEkspedisjon: Record<Lang, PackageData> = {
  no: {
    slug: '/pakke-ekspedisjonstur',
    title: 'Ekspedisjonstur',
    subtitle: 'I fotsporene til Nansen og Amundsen',
    intro: 'Finse og omgivelsene rundt hotellet har vært base for norske polfarere i over hundre år. Her får dere kjenne på det selv, i et tempo som passer gruppen. Turene og utfordringene tilpasses deres eget ambisjonsnivå og program.',
    heroImage: { src: '/assets/images/ekspedisjon-guide.jpg', alt: 'Guide briefer gruppen før turen' },
    gallery: gallery.no,
    includes: [
      { icon: 'bed', text: 'Overnatting i komfortable rom' },
      { icon: 'food', text: 'Frokost, matpakke og treretters middag' },
      { icon: 'ski', text: 'Guidede turer (ski, bre eller sykkel)' },
      { icon: 'gear', text: 'Utstyr kan leies på stedet' },
      { icon: 'fire', text: 'Kvelder ved peisen' },
    ],
    suitableFor: ['Teambuilding', 'Kick-off', 'Privat arrangement', 'Ledergruppe'],
    itinerary: [
      {
        label: 'Ankomst og forberedelser',
        items: [
          { time: '12:00', title: 'Ankomst, innsjekk og lunsj', desc: 'Lunsj serveres etter ønske.' },
          { time: '13:00', title: 'Arbeidsøkt', desc: 'Tid i møterommet fram til 16:00.' },
          { time: '16:00', title: 'Briefing', desc: 'Vi går gjennom morgendagens tur, planlegger og tilpasser utstyr.' },
          { time: '19:00', title: 'Tre retters middag', desc: 'Med utsikt mot Hardangerjøkulen.' },
        ],
      },
      {
        label: 'Eventyr på vidda',
        items: [
          morgenbadItem.no,
          { time: '08:00', title: 'Tidlig frokost', desc: 'Energi til dagen.' },
          { time: '09:00', title: 'Guidet tur', desc: 'Ski, brevandring eller sykkeltur på Rallarvegen.' },
          { time: '16:00', title: 'Hjem til hotellet', desc: 'Hvile, badstu, peis eller noe å drikke i solveggen.' },
          { time: '19:30', title: 'Festmiddag', desc: 'God mat og godt drikke.' },
        ],
      },
      {
        label: 'Avreise',
        items: [
          { time: '09:00', title: 'Sen frokost', desc: 'Ta det med ro.' },
          { time: '10:00', title: 'Kaffe', desc: 'Foran peisen eller foran bålpannen ute.' },
          { time: '10:30', title: 'Tog hjem', desc: 'Muligheter for å leie egen togvogn eller togkupé for et avsluttende møte.' },
        ],
      },
    ],
    activities: [a.no.skiseiling, a.no.skitur, a.no.truger, a.no.stjerner, a.no.rallarvegen, a.no.brevandring, a.no.fottur, a.no.morgenbad, a.no.framheim, a.no.rallarmuseet],
    ctaNote: 'Vi tilpasser aktivitetene etter sesong og ønsker.',
  },
  en: {
    slug: '/pakke-ekspedisjonstur',
    title: 'Expedition',
    subtitle: 'In the footsteps of Nansen and Amundsen',
    intro: 'Finse and the landscape around the hotel have been a base for Norwegian polar explorers for more than a hundred years. Here you get to feel it for yourselves, at a pace that suits the group. The trips and challenges are adapted to your own ambitions and programme.',
    heroImage: { src: '/assets/images/ekspedisjon-guide.jpg', alt: 'Guide briefing the group before the trip' },
    gallery: gallery.en,
    includes: [
      { icon: 'bed', text: 'Accommodation in comfortable rooms' },
      { icon: 'food', text: 'Breakfast, packed lunch and a three-course dinner' },
      { icon: 'ski', text: 'Guided trips (ski, glacier or bike)' },
      { icon: 'gear', text: 'Equipment can be rented on site' },
      { icon: 'fire', text: 'Evenings by the fire' },
    ],
    suitableFor: ['Team building', 'Kick-off', 'Private event', 'Leadership team'],
    itinerary: [
      {
        label: 'Arrival and preparations',
        items: [
          { time: '12:00', title: 'Arrival, check-in and lunch', desc: 'Lunch is served as you wish.' },
          { time: '13:00', title: 'Work session', desc: 'Time in the meeting room until 16:00.' },
          { time: '16:00', title: 'Briefing', desc: 'We go through tomorrow’s trip, plan the route and fit the equipment.' },
          { time: '19:00', title: 'Three-course dinner', desc: 'With a view of Hardangerjøkulen.' },
        ],
      },
      {
        label: 'Adventure on the plateau',
        items: [
          morgenbadItem.en,
          { time: '08:00', title: 'Early breakfast', desc: 'Fuel for the day.' },
          { time: '09:00', title: 'Guided trip', desc: 'Skiing, a glacier walk or cycling on the Rallarvegen, the old railway construction road.' },
          { time: '16:00', title: 'Back to the hotel', desc: 'Rest, sauna, the fire or a drink in the sun against the wall.' },
          { time: '19:30', title: 'Celebration dinner', desc: 'Good food and good drink.' },
        ],
      },
      {
        label: 'Departure',
        items: [
          { time: '09:00', title: 'Late breakfast', desc: 'Take it easy.' },
          { time: '10:00', title: 'Coffee', desc: 'By the fire inside or by the fire pit outside.' },
          { time: '10:30', title: 'Train home', desc: 'You can hire your own carriage or compartment for a closing meeting on the way.' },
        ],
      },
    ],
    activities: [a.en.skiseiling, a.en.skitur, a.en.truger, a.en.stjerner, a.en.rallarvegen, a.en.brevandring, a.en.fottur, a.en.morgenbad, a.en.framheim, a.en.rallarmuseet],
    ctaNote: 'We adapt the activities to the season and your wishes.',
  },
}
