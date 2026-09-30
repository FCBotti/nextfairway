import { StyleSheet, Text, View } from 'react-native';

import { spacing, type } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
};

/** Seitentitel mit optionalem Untertitel, z. B. „Mediathek". */
export function ScreenTitle({ title, subtitle }: Props) {
  return (
    <View style={styles.root}>
      <Text style={type.screenTitle} accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text style={type.screenSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xs,
    paddingHorizontal: spacing.screen,
  },
});
