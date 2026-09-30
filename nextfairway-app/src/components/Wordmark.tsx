import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts } from '@/theme';

const sizes = {
  /** Kopf der Startseite */
  header: { mark: 44, claim: 22, letterSpacing: -1 },
  /** Anmelde-Screen */
  login: { mark: 52, claim: 24, letterSpacing: -1.2 },
} as const;

type Props = {
  size?: keyof typeof sizes;
  /** Kleines Linien-Icon neben NEXT, wie im Kopf der Startseite */
  showIcon?: boolean;
};

/**
 * Wortmarke NEXT / FAIRWAY mit Claim.
 * Farben sind fest und nicht überschreibbar. Nur innerhalb von HeroHeader
 * verwenden, damit sie immer auf dem Rasenfoto steht.
 */
export function Wordmark({ size = 'header', showIcon = false }: Props) {
  const s = sizes[size];
  const mark = {
    fontSize: s.mark,
    lineHeight: Math.round(s.mark * 0.92),
    letterSpacing: s.letterSpacing,
  };

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="NextFairway – Der Golf-Podcast"
      style={styles.root}
    >
      <View style={styles.firstLine}>
        <Text style={[styles.mark, mark, styles.next]}>NEXT</Text>
        {showIcon ? <TeeCupIcon /> : null}
      </View>
      <Text style={[styles.mark, mark, styles.fairway]}>FAIRWAY</Text>
      <Text style={[styles.claim, { fontSize: s.claim }]}>Der Golf-Podcast</Text>
    </View>
  );
}

function TeeCupIcon() {
  return (
    <Svg
      width={30}
      height={34}
      viewBox="0 0 30 34"
      fill="none"
      stroke={colors.white}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={styles.icon}
    >
      <Path d="M9 12l4 16h8l3-12z" />
      <Path d="M11 12V4M14 12V2M17 12V5" />
      <Path d="M10 4l3-1M13 2l3-1M16 5l3 0" />
      <Path d="M2 32h26" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  mark: {
    fontFamily: fonts.display,
    includeFontPadding: false,
  },
  next: {
    color: colors.wordmarkBlack,
  },
  fairway: {
    color: colors.white,
  },
  claim: {
    marginTop: 6,
    fontFamily: fonts.claim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.wordmarkBlack,
    includeFontPadding: false,
  },
  icon: {
    marginBottom: 4,
  },
});
