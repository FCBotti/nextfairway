import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

type Props = {
  children: ReactNode;
  /** true, wenn der Screen oben mit einem HeroHeader beginnt */
  hero?: boolean;
};

/** Scrollbarer Screen-Rahmen mit App-Hintergrund und Abschnittsabständen. */
export function Screen({ children, hero = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingTop: hero ? 0 : insets.top + spacing.xl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    gap: spacing.section,
    paddingBottom: spacing.section,
  },
});
