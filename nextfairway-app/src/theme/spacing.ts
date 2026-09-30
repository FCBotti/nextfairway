/** Abstände und Radien aus dem Mockup. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  /** Seitenrand der Screens */
  screen: 20,
  xl: 24,
  /** Abstand zwischen Abschnitten */
  section: 28,
} as const;

export const radii = {
  button: 12,
  buttonLarge: 14,
  card: 16,
  cardLarge: 20,
  pill: 999,
} as const;

/** Mindest-Tippfläche nach CI (44 × 44). */
export const minTouch = 44;
