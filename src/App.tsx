import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { AndroidFrame } from './components/AndroidFrame';
import { QuestsView } from './components/QuestsView';
import { BossRaidView } from './components/BossRaidView';
import { SkillTreeView } from './components/SkillTreeView';
import { ArmoryShopView } from './components/ArmoryShopView';
import { ProfileView } from './components/ProfileView';
import { AddChoreModal } from './components/AddChoreModal';
import { LootCrateModal } from './components/LootCrateModal';
import { LevelUpModal } from './components/LevelUpModal';

const AppContent: React.FC = () => {
  const { activeTab } = useGame();

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'quests':
        return <QuestsView />;
      case 'raids':
        return <BossRaidView />;
      case 'skills':
        return <SkillTreeView />;
      case 'armory':
        return <ArmoryShopView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <QuestsView />;
    }
  };

  return (
    <AndroidFrame>
      {renderCurrentTab()}
      <AddChoreModal />
      <LootCrateModal />
      <LevelUpModal />
    </AndroidFrame>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
