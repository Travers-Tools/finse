import type { Lang } from '@/lib/i18n'
import type { PackageData } from '@/app/components/PackageTemplate'
import { aktiviteter, morgenbadItem } from './pakker'

const gallery = {
  no: [
    { src: '/assets/images/hotell-tog.jpg', alt: 'Toget stopper rett ved hotellet' },
    { src: '/assets/images/kjokken.jpg', alt: 'Kokkene legger opp i kjøkkenet' },
    { src: '/assets/images/lobby-peis.jpg', alt: 'Lobby med peis' },
    { src: '/assets/images/salong.jpg', alt: 'Salong med utsikt' },
  ],
  en: [
    { src: '/assets/images/hotell-tog.jpg', alt: 'The train stops right by the hotel' },
    { src: '/assets/images/kjokken.jpg', alt: 'The chefs plating up in the kitchen' },
    { src: '/assets/images/lobby-peis.jpg', alt: 'Lobby with fireplace' },
    { src: '/assets/images/salong.jpg', alt: 'Lounge with a view' },
  ],
}

const a = aktiviteter

export const pakkeHotellet: Record<Lang, PackageData> = {
  no: {
    slug: '/pakke-hotellet-for-dere',
    title: 'Hotellet for dere selv',
    subtitle: 'Når dere fortjener hele Finse',
    intro: 'For jubileer, kickoffs, møter, konferanser og feiringer der dere vil ha Hotel Finse1222 helt for dere selv. Fra 30 til 110 gjester. På Finse er alle samlet, og dere har full frihet til å forme oppholdet slik dere vil.',
    heroImage: { src: '/assets/images/hotell-tog.jpg', alt: 'Hotellet for dere selv' },
    gallery: gallery.no,
    includes: [
      { icon: 'hotel', text: 'Hele hotellet for deres gruppe' },
      { icon: 'food', text: 'Frokost, lunsj og middag etter avtale' },
      { icon: 'party', text: 'Arrangementshåndtering' },
      { icon: 'group', text: 'Dedikert personale' },
      { icon: 'fire', text: 'Privat bruk av alle fasiliteter' },
    ],
    suitableFor: ['Julebord/firmafest', 'Kick-off', 'Privat arrangement', 'Konferanse'],
    itinerary: [
      {
        label: 'Ankomst',
        items: [
          { time: '14:00', title: 'Ankomst Finse', desc: 'Velkomstdrink på hotellet.' },
          { time: '15:00', title: 'Innsjekk', desc: 'Hotellet er deres.' },
          { time: '17:00', title: 'Aktivitet', desc: 'Felles tur eller teambuilding.' },
          { time: '19:30', title: 'Festmiddag i restauranten', desc: '' },
        ],
      },
      {
        label: 'Opplevelser',
        items: [
          morgenbadItem.no,
          { time: '08:00', title: 'Frokost og morgenkaffe', desc: '' },
          { time: '10:00', title: 'Valgfri aktivitet', desc: 'Sykkeltur, skitur, brevandring eller møte.' },
          { time: '15:00', title: 'Badstu og avslapning', desc: 'Foran peisen eller i solveggen.' },
          { time: '19:00', title: 'Middag og underholdning', desc: 'Kveld tilpasset dere.' },
        ],
      },
      {
        label: 'Avreise',
        items: [
          { time: '09:00', title: 'Brunch', desc: 'Langsom start.' },
          { time: '11:00', title: 'Siste tur', desc: 'For de som ønsker.' },
          { time: '12:30', title: 'Tog hjem', desc: 'Muligheter for å leie egen togvogn eller togkupé for et avsluttende møte.' },
        ],
      },
    ],
    activities: [a.no.sider, a.no.skiseiling, a.no.morgenbad, a.no.quiz, a.no.baalpanne, a.no.rallarmuseet, a.no.framheim],
    ctaNote: 'Kontakt oss for tilgjengelighet og priser.',
  },
  en: {
    slug: '/pakke-hotellet-for-dere',
    title: 'The hotel to yourselves',
    subtitle: 'When you deserve all of Finse',
    intro: 'For anniversaries, kick-offs, meetings, conferences and celebrations where you want Hotel Finse1222 entirely to yourselves. From 30 to 110 guests. At Finse everyone is in one place, and you have complete freedom to shape the stay as you wish.',
    heroImage: { src: '/assets/images/hotell-tog.jpg', alt: 'The hotel to yourselves' },
    gallery: gallery.en,
    includes: [
      { icon: 'hotel', text: 'The whole hotel for your group' },
      { icon: 'food', text: 'Breakfast, lunch and dinner as agreed' },
      { icon: 'party', text: 'Event management' },
      { icon: 'group', text: 'Dedicated staff' },
      { icon: 'fire', text: 'Private use of all facilities' },
    ],
    suitableFor: ['Christmas party/company party', 'Kick-off', 'Private event', 'Conference'],
    itinerary: [
      {
        label: 'Arrival',
        items: [
          { time: '14:00', title: 'Arrival at Finse', desc: 'Welcome drink at the hotel.' },
          { time: '15:00', title: 'Check-in', desc: 'The hotel is yours.' },
          { time: '17:00', title: 'Activity', desc: 'A walk together or team building.' },
          { time: '19:30', title: 'Celebration dinner in the restaurant', desc: '' },
        ],
      },
      {
        label: 'Experiences',
        items: [
          morgenbadItem.en,
          { time: '08:00', title: 'Breakfast and morning coffee', desc: '' },
          { time: '10:00', title: 'Optional activity', desc: 'Cycling, skiing, a glacier walk or a meeting.' },
          { time: '15:00', title: 'Sauna and downtime', desc: 'By the fire or in the sun against the wall.' },
          { time: '19:00', title: 'Dinner and entertainment', desc: 'An evening shaped around you.' },
        ],
      },
      {
        label: 'Departure',
        items: [
          { time: '09:00', title: 'Brunch', desc: 'A slow start.' },
          { time: '11:00', title: 'One last walk', desc: 'For those who want it.' },
          { time: '12:30', title: 'Train home', desc: 'You can hire your own carriage or compartment for a closing meeting on the way.' },
        ],
      },
    ],
    activities: [a.en.sider, a.en.skiseiling, a.en.morgenbad, a.en.quiz, a.en.baalpanne, a.en.rallarmuseet, a.en.framheim],
    ctaNote: 'Contact us for availability and prices.',
  },
}
