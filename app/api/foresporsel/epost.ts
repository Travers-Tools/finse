/**
 * E-postmaler for forespørsler fra konfiguratoren.
 *
 * E-post er ikke web. Ingen webfonter lastes, Outlook rendrer med Word-motoren,
 * og rgba() er upålitelig. Derfor: tabeller, inline-stiler, solide hex-farger og
 * Georgia som stedfortreder for Crimson Pro. Fargene er hentet fra
 * designsystemet i globals.css og gjort om til faste verdier.
 */

const F = {
  bg:        '#f5f2e8', // --color-bg-dark
  kort:      '#fcfaf3',
  kant:      '#e3ddcc',
  strek:     '#eae4d4',
  tekst:     '#2c2a25', // --color-cream
  tekst2:    '#57534a',
  dempet:    '#8a8477',
  brun:      '#5c4033', // --color-brown
}

const SERIF = "Georgia, 'Times New Roman', Times, serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

export const LOGO_CID = 'finselogo'

export type Payload = {
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
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

type Rad = [string, string | undefined]

const rader = (r: Rad[]) => r.filter(([, v]) => v && v.trim()) as [string, string][]

/** Etikett/verdi-rad. Etiketten er dempet og smal, verdien bærer blikket. */
const radHtml = ([label, verdi]: [string, string]) => `
  <tr>
    <td style="padding:9px 20px 9px 0;font-family:${SANS};font-size:13px;line-height:1.45;color:${F.dempet};vertical-align:top;white-space:nowrap">${esc(label)}</td>
    <td style="padding:9px 0;font-family:${SANS};font-size:15px;line-height:1.5;color:${F.tekst};vertical-align:top">${esc(verdi)}</td>
  </tr>`

const tabell = (r: Rad[]) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
    ${rader(r).map(radHtml).join('')}
  </table>`

const strek = `<div style="height:1px;line-height:1px;font-size:0;background:${F.strek}">&nbsp;</div>`

/** Skjult forhåndsvisningstekst — det mottakeren ser i innboksen før hun åpner. */
const forhandsvisning = (t: string) => `
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${esc(t)}</div>
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>`

const dokument = (tittel: string, preheader: string, innhold: string) => `<!doctype html>
<html lang="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(tittel)}</title>
</head>
<body style="margin:0;padding:0;background:${F.bg};-webkit-font-smoothing:antialiased">
${forhandsvisning(preheader)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${F.bg};border-collapse:collapse">
  <tr>
    <td align="center" style="padding:40px 16px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="width:560px;max-width:100%;border-collapse:collapse">
        ${innhold}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`

const bunnlinje = `
  <tr>
    <td style="padding:26px 4px 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${F.dempet}">
      Hotel Finse1222 &middot; Norges h&oslash;yestliggende hotell &middot; 1222 moh.
    </td>
  </tr>`

/* ── Til hotellet ─────────────────────────────────────────────
   Arbeidsverktøy, ikke merkevaremoment. Kontaktinfo øverst, så
   detaljene. Skal kunne skummes på fem sekunder. */

export function hotellMail(p: Payload) {
  const detaljer: Rad[] = [
    ['Anledning', p.anledning],
    ['Dato', p.dato],
    ['Varighet', p.varighet],
    ['Møterom', p.moteromVarighet],
    ['Antall gjester', p.antall],
    ['Romtyper', p.romtyper?.join(', ')],
    ['Aktiviteter', p.aktiviteter?.join(', ')],
  ]

  const tittel = [p.navn, p.bedrift].filter(Boolean).join(' · ') || 'Ny forespørsel'
  const preheader = [p.anledning, p.dato, p.antall && `${p.antall} gjester`]
    .filter(Boolean).join(' · ') || 'Ny forespørsel fra konfiguratoren'

  const innhold = `
  <tr>
    <td style="background:${F.kort};border:1px solid ${F.kant};border-radius:8px;padding:32px 32px 28px">

      <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;line-height:1.4;color:${F.dempet}">Ny foresp&oslash;rsel fra konfiguratoren</p>
      <h1 style="margin:0 0 18px;font-family:${SERIF};font-size:24px;line-height:1.25;font-weight:normal;color:${F.tekst}">${esc(tittel)}</h1>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
        <tr>
          <td style="padding:2px 20px 2px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${F.tekst}">
            ${p.epost ? `<a href="mailto:${esc(p.epost)}" style="color:${F.brun};text-decoration:underline">${esc(p.epost)}</a><br>` : ''}
            ${p.telefon ? `<a href="tel:${esc(p.telefon.replace(/\s+/g, ''))}" style="color:${F.brun};text-decoration:underline">${esc(p.telefon)}</a>` : ''}
          </td>
        </tr>
      </table>

      <div style="height:22px;line-height:22px;font-size:0">&nbsp;</div>
      ${strek}
      <div style="height:8px;line-height:8px;font-size:0">&nbsp;</div>

      ${tabell(detaljer)}

      ${p.merknad && p.merknad.trim() ? `
      <div style="height:8px;line-height:8px;font-size:0">&nbsp;</div>
      ${strek}
      <div style="height:20px;line-height:20px;font-size:0">&nbsp;</div>
      <p style="margin:0 0 6px;font-family:${SANS};font-size:13px;line-height:1.4;color:${F.dempet}">Merknad</p>
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${F.tekst}">${esc(p.merknad).replace(/\n/g, '<br>')}</p>` : ''}

      <div style="height:24px;line-height:24px;font-size:0">&nbsp;</div>
      <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${F.dempet}">
        Svar p&aring; denne e-posten, s&aring; g&aring;r svaret rett til ${esc(p.navn || 'avsenderen')}.
      </p>

    </td>
  </tr>
  ${bunnlinje}`

  return dokument(`Ny forespørsel – ${tittel}`, preheader, innhold)
}

export function hotellTekst(p: Payload) {
  const linjer = rader([
    ['Navn', p.navn],
    ['Bedrift', p.bedrift],
    ['E-post', p.epost],
    ['Telefon', p.telefon],
    ['Anledning', p.anledning],
    ['Dato', p.dato],
    ['Varighet', p.varighet],
    ['Møterom', p.moteromVarighet],
    ['Antall gjester', p.antall],
    ['Romtyper', p.romtyper?.join(', ')],
    ['Aktiviteter', p.aktiviteter?.join(', ')],
    ['Merknad', p.merknad],
  ]).map(([k, v]) => `${k}: ${v}`)

  return [
    'Ny forespørsel fra konfiguratoren',
    '',
    ...linjer,
    '',
    `Svar på denne e-posten, så går svaret rett til ${p.navn || 'avsenderen'}.`,
  ].join('\n')
}

/* ── Til kunden ───────────────────────────────────────────────
   Her er det merkevaren møter dem. Logo, rolig serif, sitatet fra
   1914 nederst — samme som i footeren på nettsiden. */

export function kundeMail(p: Payload) {
  const oppsummering: Rad[] = [
    ['Anledning', p.anledning],
    ['Dato', p.dato],
    ['Varighet', p.varighet],
    ['Antall gjester', p.antall],
    ['Romtyper', p.romtyper?.join(', ')],
    ['Aktiviteter', p.aktiviteter?.join(', ')],
  ]

  const fornavn = (p.navn || '').trim().split(/\s+/)[0] || ''

  const innhold = `
  <tr>
    <td style="background:${F.kort};border:1px solid ${F.kant};border-radius:8px;padding:36px 32px 32px">

      <!-- Luften under logoen ligger i cellen, ikke som margin på bildet.
           Gmail fjerner margin på img. -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
        <tr>
          <td align="center" style="padding:0 0 30px">
            <img src="cid:${LOGO_CID}" alt="Hotel Finse1222" width="116" style="display:block;width:116px;max-width:116px;height:auto;border:0">
          </td>
        </tr>
      </table>

      <h1 style="margin:0 0 16px;font-family:${SERIF};font-size:27px;line-height:1.3;font-weight:normal;color:${F.tekst};text-align:center">
        Takk for foresp&oslash;rselen${fornavn ? `, ${esc(fornavn)}` : ''}
      </h1>

      <p style="margin:0 0 14px;font-family:${SANS};font-size:15px;line-height:1.7;color:${F.tekst2};text-align:center">
        Vi kommer tilbake med et forslag til en skreddersydd pakke innen &eacute;n arbeidsdag.
      </p>

      <div style="height:16px;line-height:16px;font-size:0">&nbsp;</div>
      ${strek}
      <div style="height:18px;line-height:18px;font-size:0">&nbsp;</div>

      ${tabell(oppsummering)}

      <div style="height:10px;line-height:10px;font-size:0">&nbsp;</div>
      ${strek}
      <div style="height:20px;line-height:20px;font-size:0">&nbsp;</div>

      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${F.tekst2}">
        Har dere sp&oslash;rsm&aring;l i mellomtiden, svar gjerne p&aring; denne e-posten eller ring oss p&aring;
        <a href="tel:+4756527100" style="color:${F.brun};text-decoration:underline;white-space:nowrap">+47 56 52 71 00</a>.
      </p>

    </td>
  </tr>

  <tr>
    <td style="padding:26px 20px 0;text-align:center;font-family:${SANS};font-size:12px;line-height:1.6;color:${F.dempet}">
      Hotel Finse1222 &middot; Norges h&oslash;yestliggende hotell &middot; 1222 moh.
    </td>
  </tr>`

  return dokument(
    'Vi har mottatt forespørselen din',
    'Vi tar kontakt innen én arbeidsdag.',
    innhold,
  )
}

export function kundeTekst(p: Payload) {
  const linjer = rader([
    ['Anledning', p.anledning],
    ['Dato', p.dato],
    ['Varighet', p.varighet],
    ['Antall gjester', p.antall],
    ['Romtyper', p.romtyper?.join(', ')],
    ['Aktiviteter', p.aktiviteter?.join(', ')],
  ]).map(([k, v]) => `${k}: ${v}`)

  const fornavn = (p.navn || '').trim().split(/\s+/)[0]

  return [
    `Takk for forespørselen${fornavn ? `, ${fornavn}` : ''}`,
    '',
    'Vi kommer tilbake med et forslag til en skreddersydd pakke innen én arbeidsdag.',
    '',
    ...linjer,
    '',
    'Har dere spørsmål i mellomtiden, svar gjerne på denne e-posten eller ring',
    'oss på +47 56 52 71 00.',
    '',
    '—',
    'Hotel Finse1222 · Norges høyestliggende hotell · 1222 moh.',
  ].join('\n')
}
