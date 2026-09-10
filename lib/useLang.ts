'use client'

import { useParams } from 'next/navigation'
import { DEFAULT_LANG, isLang, type Lang } from './i18n'

/** Språket i gjeldende rute, for klientkomponenter. */
export function useLang(): Lang {
  const params = useParams<{ lang?: string }>()
  return isLang(params?.lang) ? params.lang : DEFAULT_LANG
}
