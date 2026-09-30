import { Screen, ScreenTitle, StateView } from '@/components';

export default function MediathekScreen() {
  return (
    <Screen>
      <ScreenTitle
        title="Mediathek"
        subtitle="Alle Folgen als Video, dazu Vlogs und Extras vom YouTube-Kanal"
      />
      <StateView
        kind="empty"
        title="Noch keine Videos"
        message="Neue Folgen und Videos erscheinen hier automatisch."
      />
    </Screen>
  );
}
