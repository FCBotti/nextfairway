import { Tabs } from 'expo-router';
import type { ComponentType } from 'react';
import { Text, type ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CommunityIcon, HomeIcon, MediaIcon, ProfileIcon } from '@/components';
import { colors, fonts, type } from '@/theme';

type TabDef = {
  name: string;
  title: string;
  Icon: ComponentType<{ color: ColorValue; size?: number }>;
};

const tabs: TabDef[] = [
  { name: 'index', title: 'Start', Icon: HomeIcon },
  { name: 'mediathek', title: 'Mediathek', Icon: MediaIcon },
  { name: 'community', title: 'Community', Icon: CommunityIcon },
  { name: 'profil', title: 'Profil', Icon: ProfileIcon },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: bottom,
          height: 8 + 56 + bottom,
        },
        tabBarItemStyle: { minHeight: 44, gap: 4 },
        sceneStyle: { backgroundColor: colors.surface },
      }}
    >
      {tabs.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarAccessibilityLabel: title,
            tabBarIcon: ({ color }) => <Icon color={color} />,
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={[
                  type.tabLabel,
                  { color, fontFamily: focused ? fonts.bold : fonts.semibold },
                ]}
              >
                {title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
