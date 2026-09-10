import type { Lang } from '@/lib/i18n'
import { configurator } from '@/content/configurator'

/** Nøklene i faktalisten på reise-siden. Ikonvalget henger på nøkkelen, ikke på etiketten. */
export type FaktaKey = 'anledning' | 'dato' | 'deltakere' | 'overnatting' | 'moterom'

export const reise: Record<Lang, {
  tom: { tittel: string; tekst: string; cta: string }
  gjester: (antall: string) => string
  fakta: Record<FaktaKey, string>
  hero: {
    foresporsel: string
    foresporselPaa: (anledning: string) => string
    moh: string
    tittelMedBedrift: (bedrift: string) => string
    tittel: string
    lesMer: string
  }
  intro: { status: string; body: string }
  bestilt: { eyebrow: string; tittel: string }
  aktiviteter: { eyebrow: string; desc: string; valgt: string; ingenValgt: string }
  sitat: { caption: string; eyebrow: string; tekst: string; attr: string; kontekst: string }
  del: { lead: string; knapp: string; kopiert: string }
  footer: { tagline: string; nyForesporsel: string; svartid: string }
}> = {
  no: {
    tom: {
      tittel: 'Reisen ble ikke funnet',
      tekst: 'Lenken kan ha utløpt eller data er slettet fra nettleseren.',
      cta: 'Start ny konfigurasjon',
    },
    gjester: antall => `${antall} gjester`,
    fakta: {
      anledning: 'Anledning',
      dato: 'Dato',
      deltakere: 'Deltakere',
      overnatting: 'Overnatting',
      moterom: 'Møterom',
    },
    hero: {
      foresporsel: 'Forespørsel',
      foresporselPaa: anledning => `Forespørsel på ${anledning}`,
      moh: '1222 moh.',
      tittelMedBedrift: bedrift => `${bedrift} på Hotel Finse1222`,
      tittel: 'Deres opphold på Hotel Finse1222',
      lesMer: 'Les mer',
    },
    intro: {
      status: 'Dette er forespørselen deres slik den ble sendt inn. Vi kommer tilbake med et forslag til pakke innen én arbeidsdag.',
      body: 'Velkommen til Hotel Finse1222, der jernbanen slutter og vidda begynner. Norges høyestliggende fjellstasjon, omgitt av Hardangerjøkulen og stille kilometer med is og lys. Her finnes ingen biler, ingen støy. Bare det som virkelig betyr noe.',
    },
    bestilt: {
      eyebrow: 'Forespørselen',
      tittel: 'Det dere har bedt om',
    },
    aktiviteter: {
      eyebrow: 'Aktiviteter',
      desc: 'Finse byr på noe for alle. Sykkel og fottur på vidda om sommeren, ski og truger om vinteren, eller en stille kveld med bålpanne, quiz eller vinsmaking. Hotellet låner ut utstyr og kjenner området ut og inn.',
      valgt: ' Her er det dere har valgt for deres opphold:',
      ingenValgt: ' Si gjerne fra om dere ønsker å legge til noe. Vi tilpasser etter ønsker og vær.',
    },
    sitat: {
      caption: 'Roald Amundsen, ca. 1923. Foto: National Library of Norway.',
      eyebrow: 'Et stykke historie',
      tekst: 'Seier venter den, som har alt i orden. Hell kaller man det. Nederlag er en absolutt følge for den, som har forsømt å ta de nødvendige forholdsregler i tide. Uhell kalles det.',
      attr: 'Roald Amundsen',
      kontekst: 'Amundsen brukte Finse som treningsbase før sine polarekspedisjoner. Den samme vidda ligger fortsatt utenfor hotellets vinduer.',
    },
    del: {
      lead: 'Send det videre til de andre.',
      knapp: 'Del med kollegaer',
      kopiert: '✓ Lenke kopiert!',
    },
    footer: {
      tagline: 'Norges høyestliggende hotell · 1222 moh.',
      nyForesporsel: 'Start en ny forespørsel →',
      svartid: 'Vi svarer innen én arbeidsdag',
    },
  },
  en: {
    tom: {
      tittel: 'We could not find this trip',
      tekst: 'The link may have expired, or the data has been cleared from your browser.',
      cta: 'Start a new request',
    },
    gjester: antall => `${antall} guests`,
    fakta: {
      anledning: 'Occasion',
      dato: 'Dates',
      deltakere: 'Participants',
      overnatting: 'Accommodation',
      moterom: 'Meeting room',
    },
    hero: {
      foresporsel: 'Request',
      foresporselPaa: anledning => `Request for ${anledning}`,
      moh: '1,222 m a.s.l.',
      tittelMedBedrift: bedrift => `${bedrift} at Hotel Finse1222`,
      tittel: 'Your stay at Hotel Finse1222',
      lesMer: 'Read more',
    },
    intro: {
      status: 'This is your request as it was submitted. We will come back to you with a proposed package within one working day.',
      body: 'Welcome to Hotel Finse1222, where the railway ends and the high plateau begins. Norway’s highest mountain station, surrounded by the Hardangerjøkulen glacier and quiet kilometres of ice and light. There are no cars here, and no noise. Only what truly matters.',
    },
    bestilt: {
      eyebrow: 'The request',
      tittel: 'What you have asked for',
    },
    aktiviteter: {
      eyebrow: 'Activities',
      desc: 'Finse has something for everyone. Cycling and hiking on the plateau in summer, skiing and snowshoeing in winter, or a quiet evening by the fire pit with a quiz or a tasting. The hotel lends out equipment and knows the area inside out.',
      valgt: ' Here is what you have chosen for your stay:',
      ingenValgt: ' Let us know if you would like to add anything. We adapt to your wishes and the weather.',
    },
    sitat: {
      caption: 'Roald Amundsen, c. 1923. Photo: National Library of Norway.',
      eyebrow: 'A piece of history',
      tekst: 'Victory awaits those who have everything in order. People call it luck. Defeat is certain for those who have neglected to take the necessary precautions in time. People call that bad luck.',
      attr: 'Roald Amundsen',
      kontekst: 'Amundsen used Finse as a training base before his polar expeditions. The same plateau still lies outside the hotel windows.',
    },
    del: {
      lead: 'Pass it on to the others.',
      knapp: 'Share with colleagues',
      kopiert: '✓ Link copied',
    },
    footer: {
      tagline: 'Norway’s highest hotel · 1,222 m a.s.l.',
      nyForesporsel: 'Start a new request →',
      svartid: 'We reply within one working day',
    },
  },
}

/**
 * Aktivitetene på reise-siden. Nøkkelen er navnet slik konfiguratoren lagrer det
 * i forespørselen (norsk), så oppslaget virker uavhengig av hvilket språk siden
 * vises på. Beskrivelsen finnes på begge språk.
 */
export const aktivitetData: Record<string, { bilde: string; desc: Record<Lang, string> }> = {
  'Fottur i området': {
    bilde: '/assets/images/akt-fottur-kart.jpg',
    desc: {
      no: 'Juni til oktober. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold.',
      en: 'June to October. A welcome break from the meeting room. We choose the destination to suit your schedule and the conditions.',
    },
  },
  'Sykkeltur på Rallarvegen': {
    bilde: '/assets/images/akt-rallarvegen.jpg',
    desc: {
      no: 'Juli til september. Ikonisk rute med utsikt over Hardangervidda. Vi tilpasser turen etter tidsskjema og egne ønsker. Sykler og hjelmer leies fra hotellet.',
      en: 'July to September. An iconic route with views across the Hardangervidda plateau. We adapt the ride to your schedule and wishes. Bikes and helmets can be hired from the hotel.',
    },
  },
  'Brevandring': {
    bilde: '/assets/images/akt-brevandring.jpg',
    desc: {
      no: 'Juli til september. Opplev isbreen på nært hold og utforsk blåisen på Hardangerjøkulen sammen med en erfaren guide.',
      en: 'July to September. Experience the glacier up close and explore the blue ice of Hardangerjøkulen with an experienced guide.',
    },
  },
  'Skiturer i området': {
    bilde: '/assets/images/akt-skitur.jpg',
    desc: {
      no: 'Januar til mai. En fin pause fra møterommet. Vi tilpasser turmålet etter tid og forhold. Utstyr kan leies av oss.',
      en: 'January to May. A welcome break from the meeting room. We choose the destination to suit your schedule and the conditions. Equipment can be hired from us.',
    },
  },
  'Trugeturer': {
    bilde: '/assets/images/akt-truger.jpg',
    desc: {
      no: 'Desember til mai. Truger er godt egnet for enkle turer i terrenget rundt Finse. Dette er en vinteraktivitet alle kan ta del i. Truger leies av oss.',
      en: 'December to May. Snowshoes are well suited to easy walks in the terrain around Finse. This is a winter activity everyone can join. Snowshoes can be hired from us.',
    },
  },
  'Skiseiling': {
    bilde: '/assets/images/akt-skiseiling.jpg',
    desc: {
      no: 'Januar til mai. Skiseiling er en spennende måte å ferdes på i terrenget rundt Finse. Vinden sørger for fremdriften, og aktiviteten er forholdsvis enkel å lære. Noen timer på Finsevann gir garantert mestringsfølelse. Vi har alt nødvendig utstyr til utleie.',
      en: 'January to May. Ski sailing is an exhilarating way to travel across the terrain around Finse. The wind does the work, and the technique is fairly easy to pick up. A few hours on Lake Finsevann leave everyone with a real sense of achievement. We hire out all the equipment you need.',
    },
  },
  'Stjernekikking': {
    bilde: '/assets/images/akt-stjerner.jpg',
    desc: {
      no: 'Oktober til mars. Med minimalt med kunstig lys og en vid, åpen himmel byr Finse på enestående forhold for å oppleve stjernene, mørket og den skiftende nattehimmelen. Vi samarbeider med en astroguide som kan vise dere himmelen på en helt ny måte.',
      en: 'October to March. With almost no artificial light and a wide, open sky, Finse offers exceptional conditions for experiencing the stars, the darkness and the shifting night sky. We work with an astronomy guide who can show you the sky in a whole new way.',
    },
  },
  'Morgenbad i Finsevann': {
    bilde: '/assets/images/akt-morgenbad.jpg',
    desc: {
      no: 'Morgenbad, bålpanne og varmt drikke, med utsikt til blåisen på Hardangerjøkulen. En enkel opplevelse med stor effekt.',
      en: 'A morning swim, a fire pit and a hot drink, with a view of the blue ice of Hardangerjøkulen. A simple experience with a lasting effect.',
    },
  },
  'Sidersmaking': {
    bilde: '/assets/images/akt-sider.jpg',
    desc: {
      no: 'Hele året. Bli bedre kjent med siderproduksjonen i Hardanger. Vi smaker og forteller historiene bak de lokale siderne.',
      en: 'All year. Get to know the cider-making of Hardanger. We taste our way through the local ciders and tell the stories behind them.',
    },
  },
  'Bålpanne og after hike/ski/bike': {
    bilde: '/assets/images/akt-baalpanne.jpg',
    desc: {
      no: 'Hele året. Avslutt dagen ved Framheim ved Finsevann. Vi fyrer opp bålpanne og serverer snacks og god drikke.',
      en: 'All year. Round off the day at Framheim by Lake Finsevann. We light the fire pit and serve snacks and something good to drink.',
    },
  },
  'Finsequiz': {
    bilde: '/assets/images/tog.png',
    desc: {
      no: 'Hele året. Kveldsunderholdning foran peisen inne på hotellet. Kategoriene tilpasses, men vi sniker alltid med noen spørsmål om natur og Finse-historie.',
      en: 'All year. Evening entertainment in front of the fireplace inside the hotel. The categories can be tailored, but we always slip in a few questions about nature and the history of Finse.',
    },
  },
  'Rallarmuseet': {
    bilde: '/assets/images/Finseskilt.jpg',
    desc: {
      no: 'Hele året. Lær om Bergensbanen og hvordan jernbanen over fjellet ble bygget av tøffe rallare og dyktige ingeniører på starten av 1900-tallet.',
      en: 'All year. Learn about the Bergen Line and how the railway across the mountains was built by hardy navvies and skilled engineers in the early 1900s.',
    },
  },
  'Polarhistorie i Framheim': {
    bilde: '/assets/images/nansen.png',
    desc: {
      no: 'Hele året. På Finse har vi en tro kopi av Roald Amundsens base i Antarktis. Vi tør påstå at ingen steder i Norge er bedre egnet til å få fortellingen om de store norske og internasjonale polarheltene enn inne i Framheim ved Finsevann.',
      en: 'All year. At Finse we have a faithful replica of Roald Amundsen’s base in Antarctica. We would argue that nowhere in Norway is better suited to hearing the story of the great Norwegian and international polar explorers than inside Framheim by Lake Finsevann.',
    },
  },
}

/* ── Oversetting av verdier fra forespørselen ─────────────────
   Konfiguratoren lagrer alltid den norske visningsstrengen (option.id) i
   forespørselen, uavhengig av språk. På engelsk slår vi opp id-en i den
   engelske ordboken og viser label/title. Ukjent verdi (f.eks. fritekst
   under «Annet») vises som den er. */

const finn = (liste: { id: string; label: string }[], verdi: string) =>
  liste.find(o => o.id === verdi)?.label ?? verdi

export function visAnledning(verdi: string, lang: Lang) {
  return lang === 'no' ? verdi : finn(configurator.en.step1.options, verdi)
}

export function visRomtype(verdi: string, lang: Lang) {
  return lang === 'no' ? verdi : finn(configurator.en.step4.options, verdi)
}

export function visMoterom(verdi: string, lang: Lang) {
  return lang === 'no' ? verdi : finn(configurator.en.step5.options, verdi)
}

export function visAktivitet(verdi: string, lang: Lang) {
  if (lang === 'no') return verdi
  const s6 = configurator.en.step6
  return [...s6.summer, ...s6.winter, ...s6.allYear].find(a => a.id === verdi)?.title ?? verdi
}

/** «dd.mm.åååå → dd.mm.åååå» blir dd/mm/yyyy; «Mars 2027» får engelsk månedsnavn. */
export function visDato(verdi: string, lang: Lang) {
  if (lang === 'no') return verdi
  const medSkraastrek = verdi.replace(/\b(\d{2})\.(\d{2})\.(\d{4})\b/g, '$1/$2/$3')
  if (medSkraastrek !== verdi) return medSkraastrek
  const [maaned, ...rest] = verdi.split(' ')
  const idx = configurator.no.months.indexOf(maaned)
  return idx === -1 ? verdi : [configurator.en.months[idx], ...rest].join(' ')
}
