import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, minTouch, radii, spacing, type } from '@/theme';

import { AlertIcon } from './icons';

type Props =
  | { kind: 'loading'; title?: string }
  | { kind: 'empty'; title: string; message?: string }
  | { kind: 'error'; title?: string; message?: string; onRetry?: () => void };

/** Einheitlicher Lade-, Leer- und Fehlerzustand für alle Screens. */
export function StateView(props: Props) {
  if (props.kind === 'loading') {
    return (
      <View style={styles.root} accessibilityLabel={props.title ?? 'Wird geladen'}>
        <ActivityIndicator color={colors.ink} />
        {props.title ? <Text style={type.bodyMuted}>{props.title}</Text> : null}
      </View>
    );
  }

  if (props.kind === 'error') {
    return (
      <View style={styles.root} accessibilityRole="alert">
        <AlertIcon color={colors.danger} size={28} />
        <Text style={styles.title}>{props.title ?? 'Das hat nicht geklappt'}</Text>
        <Text style={[type.bodyMuted, styles.center]}>
          {props.message ?? 'Prüfe deine Verbindung und versuch es noch einmal.'}
        </Text>
        {props.onRetry ? (
          <Pressable
            onPress={props.onRetry}
            accessibilityRole="button"
            style={({ pressed }) => [styles.retry, pressed && styles.pressed]}
          >
            <Text style={[type.button, styles.retryText]}>Erneut versuchen</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{props.title}</Text>
      {props.message ? (
        <Text style={[type.bodyMuted, styles.center]}>{props.message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.screen,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.screen,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  title: {
    ...type.label,
    fontSize: 16,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  retry: {
    marginTop: spacing.sm,
    minHeight: minTouch,
    paddingHorizontal: spacing.screen,
    borderRadius: radii.button,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
});
