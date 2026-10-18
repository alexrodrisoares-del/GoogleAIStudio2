import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_BOSSES,
  INITIAL_CHORES,
  INITIAL_CRATES,
  INITIAL_PROFILE,
  INITIAL_SHOP_ITEMS,
  INITIAL_SKILLS,
  RANK_TIERS,
} from '../data/initialData';
import { soundFx } from '../services/soundEffects';
import {
  BossMonster,
  ChoreCategory,
  ChoreTask,
  CombatPopup,
  ItemRarity,
  LootCrate,
  ShopItem,
  SkillNode,
  UserProfile,
} from '../types/game';

interface GameContextType {
  profile: UserProfile;
  chores: ChoreTask[];
  bosses: BossMonster[];
  activeBoss: BossMonster | null;
  activeBossIndex: number;
  skills: SkillNode[];
  shopItems: ShopItem[];
  lootCrates: LootCrate[];
  activeTab: 'quests' | 'raids' | 'skills' | 'armory' | 'profile';
  soundMuted: boolean;
  popups: CombatPopup[];
  activeLevelUpModal: { oldLevel: number; newLevel: number; newTitle: string; bonusCredits: number } | null;
  activeLootReward: { crateId: string; rarity: ItemRarity; credits: number; xp: number; itemName?: string } | null;
  isAddingChore: boolean;
  setActiveTab: (tab: 'quests' | 'raids' | 'skills' | 'armory' | 'profile') => void;
  setIsAddingChore: (val: boolean) => void;
  toggleSound: () => void;
  completeChore: (id: string) => void;
  uncompleteChore: (id: string) => void;
  addChore: (chore: Omit<ChoreTask, 'id' | 'completed' | 'streak'>) => void;
  deleteChore: (id: string) => void;
  strikeBossWithAdrenaline: () => void;
  unlockSkill: (skillId: string) => void;
  buyItem: (itemId: string) => void;
  toggleEquipItem: (itemId: string) => void;
  openLootCrate: (crateId: string) => void;
  closeLootModal: () => void;
  closeLevelUpModal: () => void;
  resetAllData: () => void;
  selectBoss: (index: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'cyberquest_profile_v1',
  CHORES: 'cyberquest_chores_v1',
  BOSSES: 'cyberquest_bosses_v1',
  SKILLS: 'cyberquest_skills_v1',
  SHOP: 'cyberquest_shop_v1',
  CRATES: 'cyberquest_crates_v1',
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [chores, setChores] = useState<ChoreTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHORES);
      return saved ? JSON.parse(saved) : INITIAL_CHORES;
    } catch {
      return INITIAL_CHORES;
    }
  });

  const [bosses, setBosses] = useState<BossMonster[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOSSES);
      return saved ? JSON.parse(saved) : INITIAL_BOSSES;
    } catch {
      return INITIAL_BOSSES;
    }
  });

  const [activeBossIndex, setActiveBossIndex] = useState<number>(0);

  const [skills, setSkills] = useState<SkillNode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHOP);
      return saved ? JSON.parse(saved) : INITIAL_SHOP_ITEMS;
    } catch {
      return INITIAL_SHOP_ITEMS;
    }
  });

  const [lootCrates, setLootCrates] = useState<LootCrate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CRATES);
      return saved ? JSON.parse(saved) : INITIAL_CRATES;
    } catch {
      return INITIAL_CRATES;
    }
  });

  const [activeTab, setActiveTab] = useState<'quests' | 'raids' | 'skills' | 'armory' | 'profile'>('quests');
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundFx.getMuted());
  const [popups, setPopups] = useState<CombatPopup[]>([]);
  const [activeLevelUpModal, setActiveLevelUpModal] = useState<{
    oldLevel: number;
    newLevel: number;
    newTitle: string;
    bonusCredits: number;
  } | null>(null);
  const [activeLootReward, setActiveLootReward] = useState<{
    crateId: string;
    rarity: ItemRarity;
    credits: number;
    xp: number;
    itemName?: string;
  } | null>(null);
  const [isAddingChore, setIsAddingChore] = useState<boolean>(false);

  // Auto-save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // storage unavailable
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHORES, JSON.stringify(chores));
    } catch {
      // storage unavailable
    }
  }, [chores]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOSSES, JSON.stringify(bosses));
    } catch {
      // storage unavailable
    }
  }, [bosses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch {
      // storage unavailable
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHOP, JSON.stringify(shopItems));
    } catch {
      // storage unavailable
    }
  }, [shopItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CRATES, JSON.stringify(lootCrates));
    } catch {
      // storage unavailable
    }
  }, [lootCrates]);

  const activeBoss = bosses[activeBossIndex] || bosses[0] || null;

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setSoundMuted(muted);
  };

  const addPopup = (text: string, color: string) => {
    const id = `${Date.now()}_${Math.random()}`;
    setPopups((prev) => [...prev.slice(-4), { id, text, color }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 2200);
  };

  // Calculate buffs from unlocked skills and equipped items
  const getBuffMultipliers = (category: ChoreCategory) => {
    let xpMultiplier = 1;
    let creditMultiplier = 1;
    let bossDmgMultiplier = 1;
    let flatBossDmg = 0;

    // Skills
    skills.forEach((skill) => {
      if (skill.unlocked) {
        if (skill.effectType === 'xp_boost') {
          if (skill.category === category || skill.category === 'vitality') {
            xpMultiplier += skill.effectValue / 100;
          }
        } else if (skill.effectType === 'credit_boost') {
          creditMultiplier += skill.effectValue / 100;
        } else if (skill.effectType === 'boss_dmg') {
          bossDmgMultiplier += skill.effectValue / 100;
        }
      }
    });

    // Equipped Gear
    shopItems.forEach((item) => {
      if (item.equipped) {
        if (item.bonusType === 'all' || item.bonusType === category) {
          if (item.slot === 'visor') xpMultiplier += item.bonusValue / 100;
          if (item.slot === 'exoskeleton') bossDmgMultiplier += item.bonusValue / 100;
          if (item.slot === 'implant') xpMultiplier += item.bonusValue / 100;
          if (item.slot === 'drone') creditMultiplier += item.bonusValue / 100;
        }
        if (item.id === 'item_drone_2') {
          flatBossDmg += 50;
        }
      }
    });

    return { xpMultiplier, creditMultiplier, bossDmgMultiplier, flatBossDmg };
  };

  const completeChore = (id: string) => {
    const chore = chores.find((c) => c.id === id);
    if (!chore || chore.completed) return;

    soundFx.playQuestComplete();

    const { xpMultiplier, creditMultiplier, bossDmgMultiplier, flatBossDmg } = getBuffMultipliers(chore.category);

    // Calculate final rewards with combo multiplier
    const finalXP = Math.round(chore.xpReward * xpMultiplier * profile.comboMultiplier);
    const finalCredits = Math.round(chore.creditReward * creditMultiplier);
    let finalBossDmg = Math.round(chore.bossDamage * bossDmgMultiplier + flatBossDmg);

    // If matching boss weakness, 1.5x damage!
    if (activeBoss && activeBoss.weakness === chore.category) {
      finalBossDmg = Math.round(finalBossDmg * 1.5);
      soundFx.playBossHit(true);
      addPopup(`WEAKNESS CRIT! -${finalBossDmg} HP`, 'text-pink-400');
    } else {
      soundFx.playBossHit(false);
      addPopup(`-${finalBossDmg} Boss HP`, 'text-cyan-400');
    }

    addPopup(`+${finalXP} XP`, 'text-emerald-400');
    addPopup(`+${finalCredits} Credits`, 'text-amber-400');

    // Update chore completion
    setChores((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              completed: true,
              completedAt: new Date().toISOString(),
              streak: c.streak + 1,
            }
          : c
      )
    );

    // Apply boss damage
    if (activeBoss && activeBoss.status === 'active') {
      const nextHp = Math.max(0, activeBoss.currentHp - finalBossDmg);
      const isDefeated = nextHp <= 0;

      setBosses((prev) =>
        prev.map((b, idx) => {
          if (idx !== activeBossIndex) return b;
          return {
            ...b,
            currentHp: nextHp,
            status: isDefeated ? 'defeated' : 'active',
          };
        })
      );

      if (isDefeated) {
        soundFx.playLevelUp();
        addPopup(`BOSS DEFEATED! +${activeBoss.bountyCredits} Credits!`, 'text-amber-300');
        // Award boss bounty crate
        const newCrate: LootCrate = {
          id: `crate_boss_${Date.now()}`,
          rarity: activeBoss.level >= 5 ? 'legendary' : 'epic',
          opened: false,
          receivedAt: `${activeBoss.name} Raid Bounty`,
        };
        setLootCrates((prev) => [newCrate, ...prev]);
      }
    }

    // Check for level progression
    const totalXP = profile.currentXP + finalXP;
    let newLevel = profile.level;
    let nextXP = profile.nextLevelXP;
    let newSkillPoints = profile.skillPoints;
    let didLevelUp = false;

    if (totalXP >= profile.nextLevelXP) {
      newLevel = profile.level + 1;
      nextXP = Math.round(profile.nextLevelXP * 1.45);
      newSkillPoints += 1;
      didLevelUp = true;
    }

    // Update rank title if matching
    const matchingTier = [...RANK_TIERS].reverse().find((t) => newLevel >= t.minLevel);
    const newTitle = matchingTier ? matchingTier.title : profile.rankTitle;

    // Update Combo & Adrenaline
    const newComboCount = profile.comboCount + 1;
    const newMultiplier = Math.min(2.5, +(1 + newComboCount * 0.08).toFixed(2));
    const newAdrenaline = Math.min(100, profile.adrenalineCharge + 15);

    // Chance to drop a random mystery loot chest on streaks
    const shouldDropCrate = Math.random() < 0.25 || (newComboCount > 0 && newComboCount % 5 === 0);
    if (shouldDropCrate) {
      const randomRarity: ItemRarity = Math.random() < 0.1 ? 'epic' : Math.random() < 0.4 ? 'rare' : 'common';
      const droppedCrate: LootCrate = {
        id: `crate_drop_${Date.now()}`,
        rarity: randomRarity,
        opened: false,
        receivedAt: `Daily Combo ${newComboCount} Drop`,
      };
      setLootCrates((prev) => [droppedCrate, ...prev]);
      addPopup('MYSTERY CRATE DISCOVERED!', 'text-cyan-300');
    }

    const updatedProfile: UserProfile = {
      ...profile,
      level: newLevel,
      currentXP: didLevelUp ? totalXP - profile.nextLevelXP : totalXP,
      nextLevelXP: nextXP,
      credits: profile.credits + finalCredits,
      skillPoints: newSkillPoints,
      comboCount: newComboCount,
      comboMultiplier: newMultiplier,
      adrenalineCharge: newAdrenaline,
      completedChoresTotal: profile.completedChoresTotal + 1,
      rankTitle: newTitle,
    };

    setProfile(updatedProfile);

    if (didLevelUp) {
      soundFx.playLevelUp();
      setActiveLevelUpModal({
        oldLevel: profile.level,
        newLevel,
        newTitle,
        bonusCredits: newLevel * 50,
      });
    }
  };

  const uncompleteChore = (id: string) => {
    setChores((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              completed: false,
              streak: Math.max(0, c.streak - 1),
            }
          : c
      )
    );
    addPopup('Mission Reset', 'text-slate-400');
  };

  const addChore = (newChore: Omit<ChoreTask, 'id' | 'completed' | 'streak'>) => {
    soundFx.playEquip();
    const chore: ChoreTask = {
      ...newChore,
      id: `chore_${Date.now()}`,
      completed: false,
      streak: 0,
    };
    setChores((prev) => [chore, ...prev]);
    setIsAddingChore(false);
    addPopup('New Quest Registered', 'text-cyan-400');
  };

  const deleteChore = (id: string) => {
    soundFx.playClick();
    setChores((prev) => prev.filter((c) => c.id !== id));
    addPopup('Quest Purged', 'text-rose-400');
  };

  const strikeBossWithAdrenaline = () => {
    if (profile.adrenalineCharge < 100 || !activeBoss || activeBoss.status === 'defeated') return;

    soundFx.playBossHit(true);
    const criticalDamage = 320;
    addPopup(`CRITICAL ADRENALINE STRIKE! -${criticalDamage} HP`, 'text-pink-500');

    const nextHp = Math.max(0, activeBoss.currentHp - criticalDamage);
    const isDefeated = nextHp <= 0;

    setBosses((prev) =>
      prev.map((b, idx) => {
        if (idx !== activeBossIndex) return b;
        return {
          ...b,
          currentHp: nextHp,
          status: isDefeated ? 'defeated' : 'active',
        };
      })
    );

    setProfile((prev) => ({
      ...prev,
      adrenalineCharge: 0,
    }));

    if (isDefeated) {
      soundFx.playLevelUp();
      addPopup(`BOSS EXECUTED! +${activeBoss.bountyCredits} Credits!`, 'text-amber-300');
      const newCrate: LootCrate = {
        id: `crate_boss_${Date.now()}`,
        rarity: 'legendary',
        opened: false,
        receivedAt: `${activeBoss.name} Annihilation Bounty`,
      };
      setLootCrates((prev) => [newCrate, ...prev]);
    }
  };

  const unlockSkill = (skillId: string) => {
    const targetSkill = skills.find((s) => s.id === skillId);
    if (!targetSkill || targetSkill.unlocked) return;

    if (profile.skillPoints < targetSkill.cost) {
      addPopup('Insufficient Skill Points', 'text-rose-400');
      return;
    }

    soundFx.playEquip();
    setSkills((prev) => prev.map((s) => (s.id === skillId ? { ...s, unlocked: true } : s)));
    setProfile((prev) => ({
      ...prev,
      skillPoints: prev.skillPoints - targetSkill.cost,
    }));
    addPopup(`${targetSkill.name} Activated!`, 'text-cyan-400');
  };

  const buyItem = (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || item.purchased) return;

    if (profile.credits < item.cost) {
      addPopup('Insufficient Credits', 'text-rose-400');
      return;
    }

    soundFx.playEquip();
    setShopItems((prev) =>
      prev.map((i) => {
        if (i.id === itemId) return { ...i, purchased: true, equipped: true };
        if (i.slot === item.slot && i.equipped) return { ...i, equipped: false };
        return i;
      })
    );

    setProfile((prev) => ({
      ...prev,
      credits: prev.credits - item.cost,
      equippedGear: {
        ...prev.equippedGear,
        [item.slot]: item.id,
      },
    }));

    addPopup(`Acquired & Equipped ${item.name}`, 'text-amber-400');
  };

  const toggleEquipItem = (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || !item.purchased) return;

    soundFx.playEquip();
    const willEquip = !item.equipped;

    setShopItems((prev) =>
      prev.map((i) => {
        if (i.id === itemId) return { ...i, equipped: willEquip };
        if (willEquip && i.slot === item.slot && i.equipped) return { ...i, equipped: false };
        return i;
      })
    );

    setProfile((prev) => ({
      ...prev,
      equippedGear: {
        ...prev.equippedGear,
        [item.slot]: willEquip ? item.id : undefined,
      },
    }));

    addPopup(willEquip ? `Equipped ${item.name}` : `Unequipped ${item.name}`, 'text-slate-300');
  };

  const openLootCrate = (crateId: string) => {
    const crate = lootCrates.find((c) => c.id === crateId);
    if (!crate || crate.opened) return;

    soundFx.playLootOpen();

    let bonusCredits = 50;
    let bonusXP = 75;

    if (crate.rarity === 'rare') {
      bonusCredits = 120;
      bonusXP = 160;
    } else if (crate.rarity === 'epic') {
      bonusCredits = 250;
      bonusXP = 320;
    } else if (crate.rarity === 'legendary') {
      bonusCredits = 500;
      bonusXP = 700;
    }

    // Mark crate as opened
    setLootCrates((prev) => prev.map((c) => (c.id === crateId ? { ...c, opened: true } : c)));

    // Grant profile rewards
    setProfile((prev) => ({
      ...prev,
      credits: prev.credits + bonusCredits,
      currentXP: prev.currentXP + bonusXP,
    }));

    setActiveLootReward({
      crateId,
      rarity: crate.rarity,
      credits: bonusCredits,
      xp: bonusXP,
    });
  };

  const closeLootModal = () => {
    soundFx.playClick();
    setActiveLootReward(null);
  };

  const closeLevelUpModal = () => {
    soundFx.playClick();
    if (activeLevelUpModal) {
      setProfile((prev) => ({
        ...prev,
        credits: prev.credits + activeLevelUpModal.bonusCredits,
      }));
    }
    setActiveLevelUpModal(null);
  };

  const selectBoss = (index: number) => {
    soundFx.playClick();
    setActiveBossIndex(index);
  };

  const resetAllData = () => {
    soundFx.playClick();
    localStorage.clear();
    setProfile(INITIAL_PROFILE);
    setChores(INITIAL_CHORES);
    setBosses(INITIAL_BOSSES);
    setActiveBossIndex(0);
    setSkills(INITIAL_SKILLS);
    setShopItems(INITIAL_SHOP_ITEMS);
    setLootCrates(INITIAL_CRATES);
    addPopup('Cyber Matrix Reset to Factory Protocol', 'text-amber-400');
  };

  return (
    <GameContext.Provider
      value={{
        profile,
        chores,
        bosses,
        activeBoss,
        activeBossIndex,
        skills,
        shopItems,
        lootCrates,
        activeTab,
        soundMuted,
        popups,
        activeLevelUpModal,
        activeLootReward,
        isAddingChore,
        setActiveTab,
        setIsAddingChore,
        toggleSound,
        completeChore,
        uncompleteChore,
        addChore,
        deleteChore,
        strikeBossWithAdrenaline,
        unlockSkill,
        buyItem,
        toggleEquipItem,
        openLootCrate,
        closeLootModal,
        closeLevelUpModal,
        resetAllData,
        selectBoss,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
