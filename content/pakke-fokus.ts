import type { Lang } from '@/lib/i18n'
import type { PackageData } from '@/app/components/PackageTemplate'
import { aktiviteter, morgenbadItem } from './pakker'

const gallery = {
  no: [
    { src: '/assets/images/pkg-fokus-kort.jpg', alt: 'To kolleger ved Finsevann' },
    { src: '/assets/images/salong.jpg', alt: 'Salong med utsikt' },
    { src: '/assets/images/pkg-fokus.jpg', alt: 'Møterom med utsikt mot vidda' },
    { src: '/assets/images/fokus-hero.jpg', alt: 'Finsevann og Hardangerjøkulen en sommerdag' },
  ],
  en: [
    { src: '/assets/images/pkg-fokus-kort.jpg', alt: 'Two colleagues by Lake Finsevann' },
    { src: '/assets/images/salong.jpg', alt: 'Lounge with a view' },
    { src: '/assets/images/pkg-fokus.jpg', alt: 'Meeting room looking out over the plateau' },
    { src: '/assets/images/fokus-hero.jpg', alt: 'Lake Finsevann and Hardangerjøkulen on a summer day' },
  ],
}

const a = aktiviteter

export const pakkeFokus: Record<Lang, PackageData> = {
  no: {
    slug: '/pakke-fokus-paa-vidda',
    title: 'Fokus på vidda',
    subtitle: 'Tid til de viktige samtalene',
    intro: 'På Finse er det toget som tar dere frem. Gå på toget i byen, gå av på vidda. For ledergrupper som trenger fokusert tid sammen, langt unna alt som maser.',
    heroImage: { src: '/assets/images/pkg-fokus-kort.jpg', alt: 'Fokus på vidda' },
    gallery: gallery.no,
    includes: [
      { icon: 'bed', text: 'Overnatting i komfortable rom' },
      { icon: 'food', text: 'Frokost, lunsj og middag basert på sesongens råvarer' },
      { icon: 'briefcase', text: 'Møterom og fasiliteter' },
      { icon: 'fire', text: 'Kvelder ved peisen' },
    ],
    suitableFor: ['Ledergruppe', 'Strategisamling', 'Konferanse', 'Teambuilding'],
    itinerary: [
      {
        label: 'Ankomst og første kveld',
        items: [
          { time: '12:00', title: 'Ankomst, innsjekk og lunsj', desc: 'Lunsj serveres etter ønske.' },
          { time: '13:00', title: 'Arbeidsøkt', desc: 'Uforstyrret tid i møterommet fram til 15:30.' },
          { time: '15:30', title: 'Aktivitet', desc: 'Kort vandring, sykkeltur, skitur eller tilrettelagt aktivitet.' },
          { time: '19:00', title: 'Middag', desc: 'Basert på sesongens råvarer, med utsikt mot Hardangerjøkulen.' },
        ],
      },
      {
        label: 'Fokus og refleksjon',
        items: [
          morgenbadItem.no,
          { time: '08:00', title: 'Frokost', desc: '' },
          { time: '09:30', title: 'Arbeidsøkt', desc: 'Strategimøte i møterommet.' },
          { time: '12:30', title: 'Lunsj og frisk luft', desc: 'Tur på vidda.' },
          { time: '14:30', title: 'Arbeidsøkt', desc: 'Oppsummering og veien videre.' },
          { time: '19:00', title: 'Middag ved peisen', desc: '' },
        ],
      },
      {
        label: 'Avreise',
        items: [
          { time: '08:30', title: 'Frokost', desc: '' },
          { time: '10:00', title: 'Oppsummering', desc: '' },
          { time: '12:00', title: 'Tog hjem', desc: 'Mulighet for å leie egen togvogn eller togkupé for et avsluttende møte.' },
        ],
      },
    ],
    activities: [a.no.fottur, a.no.sykkeltur, a.no.skitur, a.no.morgenbad, a.no.sider, a.no.baalpanne, a.no.framheim, a.no.quiz],
    ctaNote: 'Vi tilpasser oppholdet etter deres behov.',
  },
  en: {
    slug: '/pakke-fokus-paa-vidda',
    title: 'Focus on the plateau',
    subtitle: 'Time for the conversations that matter',
    intro: 'At Finse, the train is what brings you here. Board in the city, step off on the mountain plateau. For leadership teams that need focused time together, far from everything that clamours for attention.',
    heroImage: { src: '/assets/images/pkg-fokus-kort.jpg', alt: 'Focus on the plateau' },
    gallery: gallery.en,
    includes: [
      { icon: 'bed', text: 'Accommodation in comfortable rooms' },
      { icon: 'food', text: 'Breakfast, lunch and dinner based on seasonal produce' },
      { icon: 'briefcase', text: 'Meeting room and facilities' },
      { icon: 'fire', text: 'Evenings by the fire' },
    ],
    suitableFor: ['Leadership team', 'Strategy retreat', 'Conference', 'Team building'],
    itinerary: [
      {
        label: 'Arrival and first evening',
        items: [
          { time: '12:00', title: 'Arrival, check-in and lunch', desc: 'Lunch is served as you wish.' },
          { time: '13:00', title: 'Work session', desc: 'Undisturbed time in the meeting room until 15:30.' },
          { time: '15:30', title: 'Activity', desc: 'A short walk, a bike ride, a ski tour or an organised activity.' },
          { time: '19:00', title: 'Dinner', desc: 'Based on seasonal produce, with a view of Hardangerjøkulen.' },
        ],
      },
      {
        label: 'Focus and reflection',
        items: [
          morgenbadItem.en,
          { time: '08:00', title: 'Breakfast', desc: '' },
          { time: '09:30', title: 'Work session', desc: 'Strategy meeting in the meeting room.' },
          { time: '12:30', title: 'Lunch and fresh air', desc: 'A walk on the plateau.' },
          { time: '14:30', title: 'Work session', desc: 'Summing up and the way forward.' },
          { time: '19:00', title: 'Dinner by the fire', desc: '' },
        ],
      },
      {
        label: 'Departure',
        items: [
          { time: '08:30', title: 'Breakfast', desc: '' },
          { time: '10:00', title: 'Summing up', desc: '' },
          { time: '12:00', title: 'Train home', desc: 'You can hire your own carriage or compartment for a closing meeting on the way.' },
        ],
      },
    ],
    activities: [a.en.fottur, a.en.sykkeltur, a.en.skitur, a.en.morgenbad, a.en.sider, a.en.baalpanne, a.en.framheim, a.en.quiz],
    ctaNote: 'We adapt the stay to your needs.',
  },
}
