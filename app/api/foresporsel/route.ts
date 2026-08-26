import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import {
  LOGO_CID,
  hotellMail,
  hotellTekst,
  kundeMail,
  kundeTekst,
  type Payload,
} from './epost'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Overstyres med FORESPORSEL_MOTTAKER, f.eks. ved testing.
const HOTEL_EPOST = process.env.FORESPORSEL_MOTTAKER || 'events@hotelfinse1222.no'
// Avsender må ligge på et domene som er verifisert i Lettermint.
const FRA = 'Hotel Finse1222 <booking@hotelfinse1222.no>'

/**
 * Logoen legges ved i selve e-posten framfor å lenkes til. Da er den ikke
 * avhengig av at appens domene lever videre, og den vises også hos mottakere
 * som blokkerer eksterne bilder. Leses én gang og gjenbrukes.
 */
let logoBase64: string | null = null
async function hentLogo() {
  if (logoBase64 === null) {
    // Mørk variant: logo.png er laget for mørk bakgrunn og forsvinner mot
    // kremfargen i e-posten. Webben løser det med et CSS-filter, som ikke
    // finnes i e-postklienter.
    const fil = path.join(process.cwd(), 'public', 'assets', 'logo', 'logo-mork.png')
    logoBase64 = (await readFile(fil)).toString('base64')
  }
  return logoBase64
}

/**
 * Delelenken til reise-siden. Den må bygges her og ikke tas imot fra klienten:
 * ruten sender e-post til en adresse avsenderen selv oppgir, så en lenke vi
 * ikke kontrollerer ville gjort den til et verktøy for å sende hva som helst
 * fra hotellets verifiserte domene.
 *
 * Dataene ligger i fragmentet (#d=), som aldri sendes til en server. Derfor
 * fungerer siden for kollegaer som ikke har noe i egen localStorage — men
 * derfor er lenken også ømfintlig for omskriving, se sendMail nedenfor.
 */
function byggLenke(req: NextRequest, p: Payload) {
  const host = req.headers.get('host')
  if (!host) return undefined
  const proto = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const base = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || `${proto}://${host}`
  const kodet = Buffer.from(JSON.stringify(p), 'utf8').toString('base64')
  return `${base}/reise/?id=${encodeURIComponent(p.id || '')}#d=${kodet}`
}

type Vedlegg = { filename: string; content: string; content_id?: string }

/**
 * Sender direkte mot API-et framfor gjennom SDK-en. Byggmesteren i lettermint
 * eksponerer ikke settings.track_clicks, og med lenkesporing på skrives lenker
 * om til en sporings-URL. Fragmenter overlever ikke en slik omskriving, så
 * delelenken ville pekt på en tom reise-side. Vi slår sporingen av eksplisitt
 * framfor å stole på at standardinnstillingen aldri endres.
 */
async function sendMail(apiToken: string, brev: {
  from: string
  to: string
  reply_to: string
  subject: string
  html: string
  text: string
  attachments?: Vedlegg[]
}) {
  const res = await fetch('https://api.lettermint.co/v1/send', {
    method: 'POST',
    headers: { 'x-lettermint-token': apiToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: brev.from,
      to: [brev.to],
      reply_to: [brev.reply_to],
      subject: brev.subject,
      html: brev.html,
      text: brev.text,
      attachments: brev.attachments,
      settings: { track_clicks: false },
    }),
  })
  if (!res.ok) {
    throw new Error(`Lettermint svarte ${res.status}: ${await res.text()}`)
  }
  return res.json()
}

export async function POST(req: NextRequest) {
  const apiToken = process.env.LETTERMINT_API_TOKEN
  if (!apiToken) {
    return NextResponse.json({ error: 'E-post er ikke konfigurert' }, { status: 500 })
  }

  let p: Payload
  try {
    p = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ugyldig forespørsel' }, { status: 400 })
  }

  if (!p.navn || !p.epost) {
    return NextResponse.json({ error: 'Navn og e-post er påkrevd' }, { status: 400 })
  }

  const lenke = byggLenke(req, p)

  // Til hotellet — med reply-to satt til kunden. Denne må gå gjennom;
  // feiler den, har ingen fått forespørselen.
  try {
    await sendMail(apiToken, {
      from: FRA,
      to: HOTEL_EPOST,
      reply_to: p.epost,
      subject: `Ny forespørsel${p.navn ? ` – ${p.navn}` : ''}${p.bedrift ? ` (${p.bedrift})` : ''}`,
      html: hotellMail(p),
      text: hotellTekst(p),
    })
  } catch (err) {
    console.error('Lettermint-feil (hotellvarsel):', err)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 502 })
  }

  // Bekreftelse til kunden. Hotellet har allerede fått forespørselen på dette
  // punktet, så en feil her skal ikke be kunden sende inn på nytt.
  try {
    await sendMail(apiToken, {
      from: FRA,
      to: p.epost,
      reply_to: HOTEL_EPOST,
      subject: 'Vi har mottatt forespørselen din – Hotel Finse1222',
      html: kundeMail(p, lenke),
      text: kundeTekst(p, lenke),
      attachments: [{ filename: 'logo.png', content: await hentLogo(), content_id: LOGO_CID }],
    })
  } catch (err) {
    console.error('Lettermint-feil (kundebekreftelse):', err)
  }

  return NextResponse.json({ ok: true })
}
