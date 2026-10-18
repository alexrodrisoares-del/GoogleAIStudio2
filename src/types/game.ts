export type ChoreCategory = 'strength' | 'vitality' | 'mind';

export type ChoreDifficulty = 'easy' | 'medium' | 'hard' | 'epic';

export type RecurrenceFrequency = 'daily' | 'weekdays' | 'weekly';

export interface ChoreTask {
  id: string;
  title: string;
  description: string;
  category: ChoreCategory;
  difficulty: ChoreDifficulty;
  xpReward: number;
  creditReward: number;
  bossDamage: number;
  completed: boolean;
  completedAt?: string;
  streak: number;
  frequency: RecurrenceFrequency;
}

export interface BossMonster {
  id: string;
  name: string;
  subtitle: string;
  currentHp: number;
  maxHp: number;
  shield: number;
  bountyCredits: number;
  bountyXP: number;
  imagePath: string;
  level: number;
  status: 'active' | 'defeated';
  weakness: ChoreCategory;
}

export interface SkillNode {
  id: string;
  category: ChoreCategory;
  tier: 1 | 2 | 3;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  cost: number; // in skill points
  effectType: 'xp_boost' | 'credit_boost' | 'boss_dmg' | 'streak_shield' | 'crate_chance';
  effectValue: number; // percentage or multiplier
}

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type EquipmentSlot = 'visor' | 'exoskeleton' | 'implant' | 'drone';

export interface ShopItem {
  id: string;
  name: string;
  slot: EquipmentSlot;
  description: string;
  cost: number;
  rarity: ItemRarity;
  bonusStat: string;
  bonusType: 'strength' | 'vitality' | 'mind' | 'all';
  bonusValue: number;
  purchased: boolean;
  equipped: boolean;
  iconName: string;
}

export interface LootCrate {
  id: string;
  rarity: ItemRarity;
  opened: boolean;
  receivedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  rankTitle: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  credits: number;
  skillPoints: number;
  streakDays: number;
  comboCount: number;
  comboMultiplier: number;
  adrenalineCharge: number; // 0 to 100 for Power Strike
  completedChoresTotal: number;
  bossesDefeatedTotal: number;
  equippedGear: {
    visor?: string;
    exoskeleton?: string;
    implant?: string;
    drone?: string;
  };
}

export interface CombatPopup {
  id: string;
  text: string;
  color: string;
  x?: number;
  y?: number;
}
