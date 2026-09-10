/**
 * Språk på nettstedet. Norsk ligger uten prefiks i URL-en (middleware skriver
 * om til /no internt), engelsk ligger under /en.
 */
export const LANGS = ['no', 'en'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'no'

export function isLang(x: unknown): x is Lang {
  return typeof x === 'string' && (LANGS as readonly string[]).includes(x)
}

/** HTML-lang-attributt (norsk bokmål er «nb», ikke «no»). */
export function htmlLang(lang: Lang) {
  return lang === 'no' ? 'nb' : 'en'
}

/** Intern lenke med riktig språkprefiks. `path` skal begynne med «/». */
export function localePath(lang: Lang, path: string) {
  if (lang === DEFAULT_LANG) return path
  return `/en${path === '/' ? '/' : path}`
}

/** Samme side på et annet språk. */
export function switchLangPath(pathname: string, target: Lang) {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  return localePath(target, stripped)
}

/** Ordbok-oppslag: `pick(content, lang)` gir riktig språkvariant. */
export function pick<T>(content: Record<Lang, T>, lang: Lang): T {
  return content[lang]
}
