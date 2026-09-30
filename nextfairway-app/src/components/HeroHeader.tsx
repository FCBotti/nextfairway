import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import { Wordmark } from './Wordmark';

const photos = {
  quer: {
    source: require('../../assets/brand/hero-quer.jpg'),
    position: { left: '35%', top: '50%' },
  },
  hoch: {
    source: require('../../assets/brand/hero-hoch.jpg'),
    position: { left: '50%', top: 0 },
  },
} as const;

type Props = {
  /** quer = Kopf der Startseite, hoch = Anmeldung */
  photo?: keyof typeof photos;
  height: number;
  wordmarkSize?: 'header' | 'login';
  showWordmarkIcon?: boolean;
  /** Buttons oben rechts, z. B. Suche und Glocke */
  actions?: ReactNode;
};

/** Rasenfoto mit Wortmarke unten links. Einziger Ort für die Wortmarke. */
export function HeroHeader({
  photo = 'quer',
  height,
  wordmarkSize = 'header',
  showWordmarkIcon = false,
  actions,
}: Props) {
  const insets = useSafeAreaInsets();
  const p = photos[photo];

  return (
    <View style={[styles.root, { height: height + insets.top }]}>
      <Image
        source={p.source}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition={p.position}
        accessible={false}
      />
      {actions ? (
        <View style={[styles.actions, { top: insets.top + spacing.sm }]}>{actions}</View>
      ) : null}
      <Wordmark size={wordmarkSize} showIcon={showWordmarkIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.screen,
    backgroundColor: colors.grass,
    overflow: 'hidden',
  },
  actions: {
    position: 'absolute',
    right: spacing.lg,
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
