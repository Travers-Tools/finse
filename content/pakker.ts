import type { Lang } from '@/lib/i18n'
import type { PackageActivity } from '@/app/components/PackageTemplate'

/** UI-tekster i pakkemalen (PackageTemplate). */
export const pakkeUi: Record<Lang, {
  showAll: string
  lightboxLabel: string
  close: string
  prev: string
  next: string
  showImage: (n: number) => string
  includes: string
  itinerary: string
  itineraryNote: string
  day: (n: number) => string
  activities: string
  /** Trekker ut sesongen fra starten av aktivitetsteksten («Hele året. …», «Januar til mai. …»). */
  periodRegex: RegExp
  host: string
  hostName: string
  hostRole: string
  hostIntro: string
  cardTitle: string
  cardBody: string
  cardCta: string
  cardNote: string
  others: string
}> = {
  no: {
    showAll: 'Vis alle bilder',
    lightboxLabel: 'Alle bilder',
    close: 'Lukk bildegalleri',
    prev: 'Forrige bilde',
    next: 'Neste bilde',
    showImage: n => `Vis bilde ${n}`,
    includes: 'Dette er inkludert',
    itinerary: 'Slik kan oppholdet se ut',
    itineraryNote: 'Dette er kun et forslag. Vi tilpasser programmet etter gruppen og egne ønsker.',
    day: n => `Dag ${n}`,
    activities: 'Opplevelser',
    periodRegex: /^(Hele året|[A-ZÆØÅ][a-zæøå]+ til [a-zæøå]+)[.:]\s*/,
    host: 'Vertskap',
    hostName: 'Vertskapet på Hotel Finse1222',
    hostRole: 'events@hotelfinse1222.no',
    hostIntro: 'Vi sørger for at alt er klart når dere kommer. Si fra hva dere ønsker, så tilpasser vi.',
    cardTitle: 'Skreddersy pakke',
    cardBody: 'Fortell oss hva som passer for gruppen. Vi setter sammen et forslag og svarer innen én arbeidsdag.',
    cardCta: 'Start planleggingen',
    cardNote: 'Gratis og uforpliktende',
    others: 'Andre pakker',
  },
  en: {
    showAll: 'Show all photos',
    lightboxLabel: 'All photos',
    close: 'Close photo gallery',
    prev: 'Previous photo',
    next: 'Next photo',
    showImage: n => `Show photo ${n}`,
    includes: 'What is included',
    itinerary: 'How your stay might look',
    itineraryNote: 'This is only a suggestion. We adapt the programme to your group and your wishes.',
    day: n => `Day ${n}`,
    activities: 'Experiences',
    periodRegex: /^(All year|[A-Z][a-z]+ to [A-Za-z]+)[.:]\s*/,
    host: 'Your hosts',
    hostName: 'Your hosts at Hotel Finse1222',
    hostRole: 'events@hotelfinse1222.no',
    hostIntro: 'We make sure everything is ready when you arrive. Tell us what you would like, and we adapt.',
    cardTitle: 'Tailor your package',
    cardBody: 'Tell us what suits your group. We put together a proposal and reply within one working day.',
    cardCta: 'Start planning',
    cardNote: 'Free and without obligation',
    others: 'Other packages',
  },
}

export const HOST_IMAGE = '/assets/images/lobby-peis.jpg'

/** Kortene under «Andre pakker». Slugs er norske på begge språk. */
export const allePakker: Record<Lang, { slug: string; title: string; subtitle: string; image: string }[]> = {
  no: [
    { slug: '/pakke-ekspedisjonstur', title: 'Ekspedisjonstur', subtitle: 'I fotsporene til Nansen og Amundsen', image: '/assets/images/ekspedisjon-bre.jpg' },
    { slug: '/pakke-fokus-paa-vidda', title: 'Fokus på vidda', subtitle: 'Tid til de viktige samtalene', image: '/assets/images/pkg-fokus-kort.jpg' },
    { slug: '/pakke-hotellet-for-dere', title: 'Hotellet for dere selv', subtitle: 'Når dere fortjener hele Finse', image: '/assets/images/hotell-tog.jpg' },
  ],
  en: [
    { slug: '/pakke-ekspedisjonstur', title: 'Expedition', subtitle: 'In the footsteps of Nansen and Amundsen', image: '/assets/images/ekspedisjon-bre.jpg' },
    { slug: '/pakke-fokus-paa-vidda', title: 'Focus on the plateau', subtitle: 'Time for the conversations that matter', image: '/assets/images/pkg-fokus-kort.jpg' },
    { slug: '/pakke-hotellet-for-dere', title: 'The hotel to yourselves', subtitle: 'When you deserve all of Finse', image: '/assets/images/hotell-tog.jpg' },
  ],
}

/** Pakkekortene i rutenettet på forsiden (PackagesSection). */
export const pakkeKort: Record<Lang, {
  href: string
  image: string
  imagePosition?: string
  imageFit?: 'cover' | 'contain'
  tag: string
  title: string
  description: string
  linkText: string
  isCustom?: boolean
}[]> = {
  no: [
    {
      href: '/pakke-fokus-paa-vidda',
      image: '/assets/images/pkg-fokus-kort.jpg',
      tag: 'Ledergrupper',
      title: 'Fokus på vidda',
      description: 'For team som trenger tid til de viktige samtalene, langt unna alt som maser.',
      linkText: 'Utforsk',
    },
    {
      href: '/pakke-ekspedisjonstur',
      image: '/assets/images/ekspedisjon-bre.jpg',
      imagePosition: 'center 20%',
      tag: 'Eventyr',
      title: 'Ekspedisjonstur',
      description: 'Dager fulle av turer, ski eller sykling. Kvelder foran peisen.',
      linkText: 'Utforsk',
    },
    {
      href: '/pakke-hotellet-for-dere',
      image: '/assets/images/hotell-tog.jpg',
      tag: 'Fra 30 til 110 gjester',
      title: 'Hotellet for dere selv',
      description: 'For jubileer, kickoffs, møter, konferanser og feiringer der dere vil ha Hotel Finse1222 for dere selv.',
      linkText: 'Utforsk',
    },
    {
      href: '/configurator',
      image: '/assets/images/akt-fottur-kart.jpg',
      imagePosition: 'center 30%',
      tag: 'Lag ditt eget',
      title: 'Skreddersøm',
      description: 'Har du andre ønsker? Vi hjelper deg å skape det perfekte oppholdet.',
      linkText: 'Start planleggingen',
      isCustom: true,
    },
  ],
  en: [
    {
      href: '/pakke-fokus-paa-vidda',
      image: '/assets/images/pkg-fokus-kort.jpg',
      tag: 'Leadership teams',
      title: 'Focus on the plateau',
      description: 'For teams that need time for the conversations that matter, far from everything that clamours for attention.',
      linkText: 'Explore',
    },
    {
      href: '/pakke-ekspedisjonstur',
      image: '/assets/images/ekspedisjon-bre.jpg',
      imagePosition: 'center 20%',
      tag: 'Adventure',
      title: 'Expedition',
      description: 'Days full of hiking, skiing or cycling. Evenings by the fire.',
      linkText: 'Explore',
    },
    {
      href: '/pakke-hotellet-for-dere',
      image: '/assets/images/hotell-tog.jpg',
      tag: '30 to 110 guests',
      title: 'The hotel to yourselves',
      description: 'For anniversaries, kick-offs, meetings, conferences and celebrations where you want Hotel Finse1222 all to yourselves.',
      linkText: 'Explore',
    },
    {
      href: '/configurator',
      image: '/assets/images/akt-fottur-kart.jpg',
      imagePosition: 'center 30%',
      tag: 'Build your own',
      title: 'Tailor-made',
      description: 'Have something else in mind? We help you shape the stay that suits you.',
      linkText: 'Start planning',
      isCustom: true,
    },
  ],
}

/**
 * Felles aktivitetstekster. De samme opplevelsene går igjen på flere pakkesider,
 * så de ligger ett sted og hentes med nøkkel.
 */
export type AktivitetKey =
  | 'sider'
  | 'skiseiling'
  | 'morgenbad'
  | 'quiz'
  | 'baalpanne'
  | 'rallarmuseet'
  | 'framheim'
  | 'fottur'
  | 'skitur'
  | 'truger'
  | 'rallarvegen'
  | 'sykkeltur'
  | 'brevandring'

export const aktiviteter: Record<Lang, Record<AktivitetKey, PackageActivity>> = {
  no: {
    sider: {
      name: 'Sidersmaking',
      desc: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.',
      image: '/assets/images/akt-sider.jpg',
    },
    skiseiling: {
      name: 'Skiseiling',
      desc: 'Januar til mai. Skiseiling er en spennende måte å ferdes på i terrenget rundt Finse. Vinden sørger for fremdriften, og aktiviteten er forholdsvis enkel å lære. Noen timer på Finsevann gir garantert mestringsfølelse. Vi har alt nødvendig utstyr til utleie.',
      image: '/assets/images/akt-skiseiling.jpg',
    },
    morgenbad: {
      name: 'Badstue og bading',
      desc: 'Hele året. Badstue og bading i Finsevann, eller snøbading om vinteren. Bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen.',
      image: '/assets/images/akt-morgenbad.jpg',
    },
    quiz: {
      name: 'Finsequiz',
      desc: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.',
      image: '/assets/images/tog.png',
    },
    baalpanne: {
      name: 'Bålpanne og after hike/ski/bike',
      desc: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.',
      image: '/assets/images/akt-baalpanne.jpg',
    },
    rallarmuseet: {
      name: 'Rallarmuseet',
      desc: 'Hele året. Lær om Bergensbanen og hvordan jernbanen over fjellet ble bygget av tøffe rallare og dyktige ingeniører på starten av 1900-tallet.',
      image: '/assets/images/Finseskilt.jpg',
    },
    framheim: {
      name: 'Polarhistorie i Framheim',
      desc: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.',
      image: '/assets/images/nansen.png',
    },
    fottur: {
      name: 'Fottur i området',
      desc: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.',
      image: '/assets/images/akt-fottur-sti.jpg',
    },
    skitur: {
      name: 'Skiturer i området',
      desc: 'Januar til mai. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold. Utstyr kan leies av oss.',
      image: '/assets/images/akt-skitur.jpg',
    },
    truger: {
      name: 'Trugeturer',
      desc: 'Desember til mai. Truger er godt egnet for enkle turer i terrenget rundt Finse. Dette er en vinteraktivitet alle kan ta del i. Truger leies av oss.',
      image: '/assets/images/akt-truger.jpg',
    },
    sykkeltur: {
      name: 'Sykkeltur i området',
      desc: 'Juli til oktober. Vi tilpasser turmål etter tid og ønske. Vi har sykler til utlån.',
      image: '/assets/images/akt-sykkel-omraadet.jpg',
    },
    rallarvegen: {
      name: 'Sykkeltur på Rallarvegen',
      desc: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.',
      image: '/assets/images/akt-rallarvegen-sol.jpg',
    },
    brevandring: {
      name: 'Brevandring',
      desc: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.',
      image: '/assets/images/akt-brevandring.jpg',
    },
  },
  en: {
    sider: {
      name: 'Cider tasting',
      desc: 'All year. Get to know the cider makers of Hardanger. We taste our way through the local ciders and tell the stories behind them.',
      image: '/assets/images/akt-sider.jpg',
    },
    skiseiling: {
      name: 'Ski sailing',
      desc: 'January to May. Ski sailing is an exhilarating way to travel across the terrain around Finse. The wind does the work, and the technique is fairly easy to pick up. A few hours on Lake Finsevann leave you with a real sense of mastery. We rent out all the equipment you need.',
      image: '/assets/images/akt-skiseiling.jpg',
    },
    morgenbad: {
      name: 'Sauna and swimming',
      desc: 'All year. Sauna and a swim in Lake Finsevann, or a roll in the snow in winter. A fire pit and something hot to drink, with a view of the blue ice on Hardangerjøkulen.',
      image: '/assets/images/akt-morgenbad.jpg',
    },
    quiz: {
      name: 'Finse quiz',
      desc: 'All year. Evening entertainment in front of the fire inside the hotel. We tailor the categories, but always sneak in a few questions about nature and the history of Finse.',
      image: '/assets/images/tog.png',
    },
    baalpanne: {
      name: 'Fire pit and after hike/ski/bike',
      desc: 'All year. End the day at Framheim by Lake Finsevann. We light the fire pit and serve snacks and good drinks.',
      image: '/assets/images/akt-baalpanne.jpg',
    },
    rallarmuseet: {
      name: 'The Navvy Museum',
      desc: 'All year. Learn about the Bergen Line and how the railway across the mountains was built by hardy navvies and skilled engineers in the early 1900s.',
      image: '/assets/images/Finseskilt.jpg',
    },
    framheim: {
      name: 'Polar history at Framheim',
      desc: 'All year. At Finse we have a faithful replica of Roald Amundsen’s base in Antarctica. We would argue there is no better place in Norway to hear the story of the great Norwegian and international polar explorers than inside Framheim by Lake Finsevann.',
      image: '/assets/images/nansen.png',
    },
    fottur: {
      name: 'Hiking in the area',
      desc: 'June to October. A welcome break from the meeting room. We choose the route to suit the time you have and the conditions.',
      image: '/assets/images/akt-fottur-sti.jpg',
    },
    skitur: {
      name: 'Ski touring in the area',
      desc: 'January to May. A welcome break from the meeting room. We choose the route to suit the time you have and the conditions. Equipment can be rented from us.',
      image: '/assets/images/akt-skitur.jpg',
    },
    truger: {
      name: 'Snowshoe walks',
      desc: 'December to May. Snowshoes are well suited to easy walks in the terrain around Finse. This is a winter activity everyone can join. Snowshoes are rented from us.',
      image: '/assets/images/akt-truger.jpg',
    },
    sykkeltur: {
      name: 'Cycling in the area',
      desc: 'July to October. We adapt the route to your time and wishes. Bikes are available to borrow.',
      image: '/assets/images/akt-sykkel-omraadet.jpg',
    },
    rallarvegen: {
      name: 'Cycling the Rallarvegen',
      desc: 'July to September. An iconic route along the old railway construction road, with views across the Hardangervidda plateau. We adapt the ride to your schedule and wishes. Bikes and helmets are rented from the hotel.',
      image: '/assets/images/akt-rallarvegen-sol.jpg',
    },
    brevandring: {
      name: 'Glacier walk',
      desc: 'July to September. Experience the glacier up close and explore the blue ice of Hardangerjøkulen together with an experienced guide.',
      image: '/assets/images/akt-brevandring.jpg',
    },
  },
}

/** Den samme morgenbad-posten går igjen i alle tre programmene. */
export const morgenbadItem: Record<Lang, { time: string; title: string; desc: string }> = {
  no: {
    time: '07:00',
    title: 'Mulighet for badstue og morgenbad',
    desc: 'Om ønskelig fyrer vi opp badstuen og bålpannen for morgenfugler som vil starte dagen med et bad i Finsevann, eller i snøen om vinteren, med utsikt mot blåisen på Hardangerjøkulen.',
  },
  en: {
    time: '07:00',
    title: 'Optional sauna and morning swim',
    desc: 'If you like, we heat the sauna and light the fire pit for the early birds who want to start the day with a swim in Lake Finsevann, or in the snow in winter, looking out at the blue ice of Hardangerjøkulen.',
  },
}
