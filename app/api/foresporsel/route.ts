import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { Lettermint } from 'lettermint'
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

  const lettermint = new Lettermint({ apiToken })

  // Til hotellet — med reply-to satt til kunden. Denne må gå gjennom;
  // feiler den, har ingen fått forespørselen.
  try {
    await lettermint.email
      .from(FRA)
      .to(HOTEL_EPOST)
      .replyTo(p.epost)
      .subject(`Ny forespørsel${p.navn ? ` – ${p.navn}` : ''}${p.bedrift ? ` (${p.bedrift})` : ''}`)
      .html(hotellMail(p))
      .text(hotellTekst(p))
      .send()
  } catch (err) {
    console.error('Lettermint-feil (hotellvarsel):', err)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 502 })
  }

  // Bekreftelse til kunden. Hotellet har allerede fått forespørselen på dette
  // punktet, så en feil her skal ikke be kunden sende inn på nytt.
  try {
    await lettermint.email
      .from(FRA)
      .to(p.epost)
      .replyTo(HOTEL_EPOST)
      .subject('Vi har mottatt forespørselen din – Hotel Finse1222')
      .html(kundeMail(p))
      .text(kundeTekst(p))
      .attach('logo.png', await hentLogo(), LOGO_CID)
      .send()
  } catch (err) {
    console.error('Lettermint-feil (kundebekreftelse):', err)
  }

  return NextResponse.json({ ok: true })
}
