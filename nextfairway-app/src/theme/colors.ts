/**
 * Design-Tokens nach NextFairway-CI (docs/SPEC.md, Abschnitt Design-System).
 * Farben im App-Code ausschließlich über dieses Objekt verwenden.
 */
export const colors = {
  /** Text, dunkle Buttons, aktive Tabs */
  ink: '#111111',
  /** Karten, Text auf Violett, FAIRWAY in der Wortmarke */
  white: '#FFFFFF',
  /** NEXT in der Wortmarke – nur für die Wortmarke */
  wordmarkBlack: '#000000',
  /** Hauptbuttons, Zitat-Sprechblasen, Namens-Kapseln, Hervorhebungen */
  accent: '#5E17EB',
  /** Nur als Rasenfoto-Hintergrund bzw. Platzhalter beim Laden */
  grass: '#A6BF59',
  /** Helle Fläche für „Geprüft", Hinweise, Freundschaft */
  grassTint: '#EEF3DC',
  /** App-Hintergrund, Eingabefelder */
  surface: '#F5F5F2',
  /** Kartenränder, Trennlinien */
  border: '#E4E4E0',
  /** Sekundärtext, inaktive Tabs */
  textMuted: '#5C5C5C',
  /** Nur die rote Zahl an Glocke und Postfach */
  badge: '#C62828',
  /** Ablehnen, Niederlage, Fehler */
  danger: '#B42318',
  /** Sterne der Platzbewertung */
  star: '#D9A62B',
  /** „In Prüfung", „wartet auf Bestätigung" */
  pendingBg: '#FFF4D6',
  pendingText: '#7A5A12',
  /** Halbtransparente Kreis-Buttons auf dem Rasenfoto */
  onPhoto: 'rgba(255,255,255,0.92)',
} as const;

export type ColorToken = keyof typeof colors;
