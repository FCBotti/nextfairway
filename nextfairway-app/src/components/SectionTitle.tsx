import { Text } from 'react-native';

import { type } from '@/theme';

/** Abschnittstitel in Versalien, z. B. „THEMENBEREICHE". */
export function SectionTitle({ children }: { children: string }) {
  return (
    <Text style={type.sectionTitle} accessibilityRole="header">
      {children}
    </Text>
  );
}
