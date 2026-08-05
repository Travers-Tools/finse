import { NextRequest, NextResponse } from 'next/server'
import { Lettermint } from 'lettermint'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HOTEL_EPOST = 'events@hotelfinse1222.no'
// Avsender må ligge på et domene som er verifisert i Lettermint.
const FRA = 'Hotel Finse1222 <booking@hotelfinse1222.no>'

type Payload = {
  anledning?: string
  dato?: string
  varighet?: string
  moteromVarighet?: string
  antall?: string
  romtyper?: string[]
  aktiviteter?: string[]
  navn?: string
  bedrift?: string
  epost?: string
  telefon?: string
  merknad?: string
  id?: string
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const rad = (label: string, verdi?: string) =>
  verdi && verdi.trim()
    ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:6px 0;color:#1a1a1a">${esc(verdi)}</td></tr>`
    : ''

function hotellMail(p: Payload) {
  const rader = [
    rad('Navn', p.navn),
    rad('Bedrift', p.bedrift),
    rad('E-post', p.epost),
    rad('Telefon', p.telefon),
    rad('Anledning', p.anledning),
    rad('Dato', p.dato),
    rad('Varighet', p.varighet),
    rad('Møterom', p.moteromVarighet),
    rad('Antall gjester', p.antall),
    rad('Romtyper', p.romtyper?.join(', ')),
    rad('Aktiviteter', p.aktiviteter?.join(', ')),
    rad('Merknad', p.merknad),
  ].join('')

  return `
  <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <h2 style="font-size:18px;margin:0 0 4px">Ny forespørsel fra konfiguratoren</h2>
    <p style="color:#6b6b6b;font-size:13px;margin:0 0 20px">Innsendt via hotelfinse1222.no</p>
    <table style="border-collapse:collapse;font-size:14px;width:100%">${rader}</table>
  </div>`
}

function kundeMail(p: Payload) {
  const oppsummering = [
    rad('Anledning', p.anledning),
    rad('Dato', p.dato),
    rad('Varighet', p.varighet),
    rad('Antall gjester', p.antall),
    rad('Romtyper', p.romtyper?.join(', ')),
    rad('Aktiviteter', p.aktiviteter?.join(', ')),
  ].join('')

  return `
  <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <h2 style="font-size:18px;margin:0 0 12px">Takk for forespørselen, ${esc(p.navn || '')}</h2>
    <p style="font-size:14px;line-height:1.6;color:#333;margin:0 0 16px">
      Vi har mottatt ønskene dine og tar kontakt innen én arbeidsdag. Her er det du sendte oss:
    </p>
    <table style="border-collapse:collapse;font-size:14px;width:100%">${oppsummering}</table>
    <p style="font-size:14px;line-height:1.6;color:#333;margin:20px 0 0">
      Har du spørsmål i mellomtiden, svar gjerne på denne e-posten eller ring oss på +47 56 52 71 00.
    </p>
    <p style="font-size:14px;color:#333;margin:16px 0 0">Vi gleder oss til å ta imot dere.<br/>Hilsen oss på Hotel Finse1222</p>
  </div>`
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

  try {
    // Til hotellet — med reply-to satt til kunden
    await lettermint.email
      .from(FRA)
      .to(HOTEL_EPOST)
      .replyTo(p.epost)
      .subject(`Ny forespørsel${p.navn ? ` – ${p.navn}` : ''}${p.bedrift ? ` (${p.bedrift})` : ''}`)
      .html(hotellMail(p))
      .send()

    // Bekreftelse til kunden
    await lettermint.email
      .from(FRA)
      .to(p.epost)
      .replyTo(HOTEL_EPOST)
      .subject('Vi har mottatt forespørselen din – Hotel Finse1222')
      .html(kundeMail(p))
      .send()

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Lettermint-feil:', err)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 502 })
  }
}
