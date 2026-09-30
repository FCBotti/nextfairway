import { ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black/400Regular';
import { Barlow_400Regular } from '@expo-google-fonts/barlow/400Regular';
import { Barlow_500Medium } from '@expo-google-fonts/barlow/500Medium';
import { Barlow_600SemiBold } from '@expo-google-fonts/barlow/600SemiBold';
import { Barlow_700Bold } from '@expo-google-fonts/barlow/700Bold';
import { BarlowCondensed_300Light } from '@expo-google-fonts/barlow-condensed/300Light';

/** Schriftdateien für useFonts im Root-Layout. */
export const fontAssets = {
  ArchivoBlack_400Regular,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
  BarlowCondensed_300Light,
};

/**
 * Jede Schriftstärke ist eine eigene Familie. Deshalb nie fontWeight setzen,
 * sondern die passende Familie wählen.
 */
export const fonts = {
  /** Wortmarke, Überschriften, Abschnittstitel */
  display: 'ArchivoBlack_400Regular',
  regular: 'Barlow_400Regular',
  medium: 'Barlow_500Medium',
  semibold: 'Barlow_600SemiBold',
  bold: 'Barlow_700Bold',
  /** Claim „Der Golf-Podcast" */
  claim: 'BarlowCondensed_300Light',
} as const;
