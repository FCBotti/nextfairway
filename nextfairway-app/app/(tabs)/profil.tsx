import { Screen, ScreenTitle, StateView } from '@/components';

export default function ProfilScreen() {
  return (
    <Screen>
      <ScreenTitle title="Mein Profil" />
      <StateView
        kind="empty"
        title="Noch nicht angemeldet"
        message="Melde dich an, um deinen Avatar, dein Handicap und deinen Heimatclub einzutragen."
      />
    </Screen>
  );
}
