import type { TextStyle } from 'react-native';

import { colors } from './colors';
import { fonts } from './fonts';

/** Textstile aus dem Mockup. */
export const type = {
  /** Seitentitel wie „Mediathek", „Clubhaus", „Mein Profil" */
  screenTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  /** Untertitel unter dem Seitentitel */
  screenSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  /** Abschnittstitel in Versalien, z. B. „THEMENBEREICHE" */
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
    color: colors.ink,
  },
  /** Kleine violette Überzeile, z. B. „NEUE FOLGE" */
  eyebrow: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  bodyMuted: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.ink,
  },
  button: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  tabLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
} satisfies Record<string, TextStyle>;
