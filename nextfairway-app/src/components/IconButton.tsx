import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, minTouch } from '@/theme';

type Props = {
  /** Pflicht: Screenreader-Label, z. B. „Suchen" */
  label: string;
  icon: ReactNode;
  onPress?: () => void;
  /** Rote Zahl, z. B. am Postfach. 0 oder undefined blendet sie aus. */
  badgeCount?: number;
};

/** Runder 44er-Button, halbtransparent weiß, für den Kopf auf dem Rasenfoto. */
export function IconButton({ label, icon, onPress, badgeCount }: Props) {
  const showBadge = badgeCount !== undefined && badgeCount > 0;
  const a11yLabel = showBadge ? `${label}, ${badgeCount} neue Einträge` : label;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      hitSlop={4}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {icon}
      {showBadge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount > 99 ? '99+' : badgeCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: minTouch,
    height: minTouch,
    borderRadius: minTouch / 2,
    backgroundColor: colors.onPhoto,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.white,
  },
});
