const baseProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<string, React.ReactNode> = {
  bed: (
    <>
      <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" />
      <path d="M3 15h18" />
      <rect x="5" y="9" width="14" height="6" rx="1" />
    </>
  ),
  food: (
    <>
      <path d="M4 3v18M9 3v8a2 2 0 11-4 0V3" />
      <path d="M15 21v-8a4 4 0 014-4V3" />
    </>
  ),
  ski: (
    <>
      <path d="M3 19l18-6" />
      <path d="M7 21l4-12 5 5 5-2" />
      <circle cx="14" cy="5" r="2" />
    </>
  ),
  fire: (
    <>
      <path d="M12 21c4 0 7-3 7-7 0-3-2-5-4-7 0 2-1 3-3 3 0-3 1-5-2-8-1 4-5 6-5 11 0 4 3 8 7 8z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <line x1="3" y1="13" x2="21" y2="13" />
    </>
  ),
  building: (
    <>
      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
      <rect x="7" y="7" width="3" height="3" />
      <rect x="14" y="7" width="3" height="3" />
      <rect x="7" y="13" width="3" height="3" />
      <rect x="14" y="13" width="3" height="3" />
    </>
  ),
  party: (
    <>
      <path d="M5.8 19.6L3 21l1.4-2.8 9.6-9.6 1.4 1.4z" />
      <path d="M14 4l2 2M18 6l2 2M14 8l2-2" />
    </>
  ),
  group: (
    <>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </>
  ),
  guide: (
    <>
      <path d="M9 2v18M15 2v18" />
      <path d="M3 6h6l3 3 3-3h6" />
      <path d="M3 16h6l3 3 3-3h6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.36.16.66.42.86.74.2.31.31.68.31 1.06v.4c0 .38-.11.75-.31 1.06-.2.32-.5.58-.86.74z" />
    </>
  ),
  hotel: (
    <>
      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
      <path d="M3 11h18" />
      <path d="M3 16h18" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({ name }: { name: IconName }) {
  return <svg {...baseProps}>{paths[name]}</svg>
}
