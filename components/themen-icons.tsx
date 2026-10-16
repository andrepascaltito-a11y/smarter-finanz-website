// Schlichte Linien-Icons (24 px, currentColor) fuer die Leistungskarten. Rein dekorativ, daher aria-hidden.

import type { ReactNode } from "react";

export type ThemaIcon =
  | "haftpflicht"
  | "inhalt"
  | "cyber"
  | "multirisk"
  | "flotte"
  | "gebaeude"
  | "do"
  | "kaution"
  | "rechtsschutz"
  | "bav"
  | "inhaber"
  | "steuer";

const PFADE: Record<ThemaIcon, ReactNode> = {
  haftpflicht: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  inhalt: (
    <>
      <path d="M4 10l1.5-5h13L20 10" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
    </>
  ),
  cyber: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
      <circle cx="12" cy="15.5" r="1" />
    </>
  ),
  multirisk: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12.5l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  flotte: (
    <>
      <path d="M3 16V7h11v9" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  gebaeude: (
    <>
      <path d="M5 21V5l7-2 7 2v16" />
      <path d="M3 21h18" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
      <path d="M10.5 21v-3h3v3" />
    </>
  ),
  do: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2" />
      <path d="M3.5 13h17" />
    </>
  ),
  kaution: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H21" />
      <path d="M17 12v3M20 12v2" />
    </>
  ),
  rechtsschutz: (
    <>
      <path d="M12 4v16" />
      <path d="M7 20h10" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.5 6a3 3 0 005 0L5 7z" />
      <path d="M19 7l-2.5 6a3 3 0 005 0L19 7z" />
    </>
  ),
  bav: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  inhaber: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M6 20c0-3.4 2.4-5.2 6-5.2s6 1.8 6 5.2" />
    </>
  ),
  steuer: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
    </>
  ),
};

export function ThemenIcon({ name }: { name: ThemaIcon }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PFADE[name]}
    </svg>
  );
}
