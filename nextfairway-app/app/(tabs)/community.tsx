import { Screen, ScreenTitle, StateView } from '@/components';

export default function CommunityScreen() {
  return (
    <Screen>
      <ScreenTitle
        title="Clubhaus"
        subtitle="Die NextFairway-Community: fragen, teilen, voneinander lernen"
      />
      <StateView
        kind="empty"
        title="Noch keine Diskussionen"
        message="Hier findest du bald Themenbereiche und aktuelle Diskussionen."
      />
    </Screen>
  );
}
