import { StyleSheet, Text, View } from 'react-native';

import { BellIcon, HeroHeader, IconButton, Screen, SearchIcon, StateView } from '@/components';
import { colors, spacing, type } from '@/theme';

export default function StartScreen() {
  return (
    <Screen hero>
      <HeroHeader
        photo="quer"
        height={250}
        showWordmarkIcon
        actions={
          <>
            {/* Suche und Postfach folgen in späteren Schritten */}
            <IconButton label="Suchen" icon={<SearchIcon color={colors.ink} size={20} />} />
            <IconButton label="Postfach" icon={<BellIcon color={colors.ink} size={20} />} />
          </>
        }
      />
      <View style={styles.section}>
        <Text style={type.eyebrow}>Neue Folge</Text>
      </View>
      <StateView
        kind="empty"
        title="Noch keine Folgen"
        message="Sobald die erste Folge erschienen ist, findest du sie hier."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.screen,
    marginBottom: -spacing.lg,
  },
});
