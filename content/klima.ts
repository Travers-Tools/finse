import type { Lang } from '@/lib/i18n'

export interface KlimaFigure {
  route: string
  value: string
  finse?: boolean
}

/** Tallgrunnlaget. Ti personer, tur/retur fra Oslo. */
export const klimaFigures: Record<Lang, KlimaFigure[]> = {
  no: [
    { route: 'Oslo–Finse, tog', value: '50 kg CO₂', finse: true },
    { route: 'Oslo–Lofoten, fly', value: '2,4 tonn CO₂' },
    { route: 'Oslo–Svalbard, fly', value: '5,1 tonn CO₂' },
    { route: 'Oslo–Marbella, fly', value: '7,2 tonn CO₂' },
    { route: 'Oslo–Marbella, fly på business', value: '16,2 tonn CO₂' },
  ],
  en: [
    { route: 'Oslo–Finse, by train', value: '50 kg CO₂', finse: true },
    { route: 'Oslo–Lofoten, by air', value: '2.4 tonnes CO₂' },
    { route: 'Oslo–Svalbard, by air', value: '5.1 tonnes CO₂' },
    { route: 'Oslo–Marbella, by air', value: '7.2 tonnes CO₂' },
    { route: 'Oslo–Marbella, by air in business class', value: '16.2 tonnes CO₂' },
  ],
}

export const klimaSource: Record<Lang, string> = {
  no: 'Samlet utslipp for ti personer tur/retur, beregnet med Klimatsmartsemester.se.',
  en: 'Total emissions for ten people, return journey, calculated with Klimatsmartsemester.se.',
}

/* Chip, modal og forsidebånd (Klima.tsx). */
export const klima: Record<Lang, {
  chipLabel: string
  modalAria: string
  close: string
  modalTitle: string
  modalBody: string
  readFull: string
  bandStatement: [string, string, string]
  bandSub: string
  seeFigures: string
  moreAbout: string
}> = {
  no: {
    chipLabel: 'Klimasmart valg',
    modalAria: 'Klimaavtrykk',
    close: 'Lukk',
    modalTitle: 'Finse er bare tilgjengelig med tog',
    modalBody:
      'Når vi reiser, ligger omtrent 75 prosent av reisens klimaavtrykk i transporten. Av tog, elbil og fly er toget den mest klimavennlige måten å forflytte seg på. Toget er den eneste måten å komme helt fram til Finse på, og da følger det lave avtrykket med på kjøpet.',
    readFull: 'Les hele regnestykket',
    bandStatement: [
      'En jobbsamling på Finse har et klimaavtrykk som er omtrent ',
      '150 ganger lavere',
      ' enn et tilsvarende arrangement på en flybasert destinasjon i Sør-Europa.',
    ],
    bandSub:
      'Omtrent 75 prosent av en reises klimaavtrykk ligger i transporten, og Finse er bare tilgjengelig med tog. Det gjelder alle oppholdene våre.',
    seeFigures: 'Se regnestykket',
    moreAbout: 'Mer om klimaavtrykket',
  },
  en: {
    chipLabel: 'Climate-smart choice',
    modalAria: 'Climate footprint',
    close: 'Close',
    modalTitle: 'Finse can only be reached by train',
    modalBody:
      'When we travel, around 75 per cent of the trip’s climate footprint comes from transport. Of train, electric car and plane, the train is the most climate-friendly way to get around. It is also the only way to get all the way to Finse, so the low footprint comes with the trip.',
    readFull: 'Read the full calculation',
    bandStatement: [
      'A company gathering at Finse has a climate footprint roughly ',
      '150 times lower',
      ' than a comparable event at a fly-to destination in southern Europe.',
    ],
    bandSub:
      'Around 75 per cent of a trip’s climate footprint comes from transport, and Finse can only be reached by train. That goes for every one of our stays.',
    seeFigures: 'See the calculation',
    moreAbout: 'More about the climate footprint',
  },
}

/* Klimasiden (/klima). */
export const klimaPage: Record<Lang, {
  kicker: string
  title: string
  lede: string
  p1: string
  p2: string
  figuresTitle: string
  figuresSub: string
  p3: string
  p4: string
  asideTitle: string
  asideBody: string
  ctaPackages: string
  ctaConfigurator: string
}> = {
  no: {
    kicker: 'Klima',
    title: 'En enkel måte å kutte bedriftens klimaavtrykk på',
    lede:
      'Noen ganger er det nødvendig å reise bort. En fellestur med jobben kan bety mye for arbeidsmiljøet, og noen dager utenfor kontoret er ofte både nyttige og samlende. For ledergruppa kan en strategisamling gi faglig påfyll og rom for nye tanker.',
    p1:
      'Samtidig koster det å reise. Når vi forflytter oss, ligger omtrent 75 prosent av reisens klimaavtrykk i transporten. Av tog, elbil og fly er toget den mest klimavennlige måten å komme seg fram på. Og toget er den eneste måten å komme helt til Finse på.',
    p2:
      'På Finse skreddersyr vi opplegg med god mat, møterom, naturbaserte aktiviteter og omgivelser som setter seg i folk. Det er det jo mange andre steder i Norge som også kan. Men vi tror det er få steder der så eksotiske omgivelser kommer med et like lavt klimaavtrykk.',
    figuresTitle: 'Regnestykket',
    figuresSub:
      'Ti personer fra en Oslo-bedrift skal på felles jobbsamling. Slik ser gruppas samlede utslipp ut for reisen til og fra reisemålet.',
    p3:
      'For denne gruppa er Finse altså et nesten 50 ganger mer klimasmart valg enn en flybasert tur til Lofoten. Sammenlignet med en tur til Marbella er Finse rundt 150 ganger så klimasmart.',
    p4:
      'I mange bedrifter utgjør de ansattes jobbreiser en betydelig del av det samlede klimaavtrykket. Å legge jobbturen til Finse framfor en flybasert destinasjon gir derfor et merkbart utslag, både i den enkeltes personlige avtrykk og når bedriften skal gjøre opp sitt årlige klimaregnskap.',
    asideTitle: 'Møtet kan begynne på perrongen',
    asideBody:
      'Et togbasert reisemål har flere fordeler enn klimaregnskapet. Sammen med Vy kan vi legge til rette for at bedriftsgrupper får egen kupé eller vogn på turen. Da starter møtet med en gang dere reiser hjemmefra, og ikke først når dere kommer fram.',
    ctaPackages: 'Se oppholdene våre',
    ctaConfigurator: 'Eller lag deres eget',
  },
  en: {
    kicker: 'Climate',
    title: 'A simple way to cut your company’s climate footprint',
    lede:
      'Sometimes you need to get away. A trip with colleagues can do a lot for the working environment, and a few days out of the office are often both useful and unifying. For a leadership team, a strategy retreat can offer fresh input and room for new thinking.',
    p1:
      'Travel has a cost, though. When we move around, roughly 75 per cent of a trip’s climate footprint comes from transport. Of train, electric car and plane, the train is the most climate-friendly way to get there. And the train is the only way to get all the way to Finse.',
    p2:
      'At Finse we tailor programmes with good food, meeting rooms, nature-based activities and surroundings that stay with people. Plenty of other places in Norway can do that too. But we believe there are few places where surroundings this striking come with such a low climate footprint.',
    figuresTitle: 'The calculation',
    figuresSub:
      'Ten people from an Oslo company are going on a team retreat. This is what the group’s combined emissions look like for the journey to and from the destination.',
    p3:
      'For this group, Finse is almost 50 times more climate-smart than a fly-to trip to Lofoten. Compared with a trip to Marbella, Finse is around 150 times as climate-smart.',
    p4:
      'In many companies, employee travel makes up a significant share of the overall climate footprint. Choosing Finse over a fly-to destination therefore makes a noticeable difference, both in each person’s individual footprint and when the company draws up its annual climate accounts.',
    asideTitle: 'The meeting can start on the platform',
    asideBody:
      'A train-based destination has advantages beyond the climate accounts. Together with Vy, the rail operator, we can arrange for company groups to have their own compartment or carriage for the journey. The meeting then begins the moment you leave home, not when you arrive.',
    ctaPackages: 'See our stays',
    ctaConfigurator: 'Or build your own',
  },
}
