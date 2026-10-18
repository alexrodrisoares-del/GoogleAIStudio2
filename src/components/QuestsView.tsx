import React, { useState } from 'react';
import {
  Plus,
  Flame,
  Zap,
  Coins,
  Check,
  RotateCcw,
  Trash2,
  Dumbbell,
  HeartPulse,
  Brain,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ChoreCategory, ChoreDifficulty } from '../types/game';

export const QuestsView: React.FC = () => {
  const {
    profile,
    chores,
    completeChore,
    uncompleteChore,
    deleteChore,
    setIsAddingChore,
    activeBoss,
  } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<'all' | ChoreCategory>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | ChoreDifficulty>('all');

  // Filter chores
  const filteredChores = chores.filter((chore) => {
    if (selectedCategory !== 'all' && chore.category !== selectedCategory) return false;
    if (filterDifficulty !== 'all' && chore.difficulty !== filterDifficulty) return false;
    return true;
  });

  const activeChores = filteredChores.filter((c) => !c.completed);
  const completedChores = filteredChores.filter((c) => c.completed);

  const xpPercent = Math.min(100, Math.round((profile.currentXP / profile.nextLevelXP) * 100));

  const getCategoryIcon = (category: ChoreCategory) => {
    switch (category) {
      case 'strength':
        return <Dumbbell className="w-3.5 h-3.5 text-rose-400" />;
      case 'vitality':
        return <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />;
      case 'mind':
        return <Brain className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getDifficultyBadge = (difficulty: ChoreDifficulty) => {
    switch (difficulty) {
      case 'easy':
        return <span className="text-[10px] font-mono text-slate-400">T-1 Easy</span>;
      case 'medium':
        return <span className="text-[10px] font-mono text-cyan-300">T-2 Medium</span>;
      case 'hard':
        return <span className="text-[10px] font-mono text-amber-300 font-semibold">T-3 Hard</span>;
      case 'epic':
        return <span className="text-[10px] font-mono text-pink-400 font-bold">T-4 Epic</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-full p-4 relative">
      {/* Hero Stat Matrix Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 p-4 mb-4 backdrop-blur-md shadow-lg shadow-black/40">
        {/* Top Row: Rank & Credits */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
              LVL {profile.level}
            </span>
            <span className="text-xs text-slate-600">/</span>
            <span className="text-xs font-medium text-slate-300 tracking-tight">
              {profile.rankTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-tight">
              {profile.credits}
            </span>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
            <span>Neural Sync Progress</span>
            <span className="text-cyan-300">
              {profile.currentXP} / {profile.nextLevelXP} XP ({xpPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden relative border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Metrics: Streak, Combo Multiplier, Boss Plasma Charge */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-center font-mono">
          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/40">
            <div className="flex items-center gap-1 text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{profile.streakDays}d</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">Streak</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/40">
            <div className="flex items-center gap-1 text-cyan-400">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{profile.comboMultiplier}x</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">Combo XP</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/40">
            <div className="flex items-center gap-1 text-pink-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{profile.adrenalineCharge}%</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">Adrenaline</span>
          </div>
        </div>
      </div>

      {/* Category Segmented Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`min-h-[36px] px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
          }`}
        >
          All Quests ({chores.length})
        </button>

        <button
          onClick={() => setSelectedCategory('strength')}
          className={`min-h-[36px] px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            selectedCategory === 'strength'
              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
          }`}
        >
          <Dumbbell className="w-3 h-3 text-rose-400" />
          Strength
        </button>

        <button
          onClick={() => setSelectedCategory('vitality')}
          className={`min-h-[36px] px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            selectedCategory === 'vitality'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
          }`}
        >
          <HeartPulse className="w-3 h-3 text-emerald-400" />
          Vitality
        </button>

        <button
          onClick={() => setSelectedCategory('mind')}
          className={`min-h-[36px] px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            selectedCategory === 'mind'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
          }`}
        >
          <Brain className="w-3 h-3 text-cyan-400" />
          Mind
        </button>
      </div>

      {/* Active Chores List */}
      <div className="flex-1 space-y-2.5">
        {activeChores.length === 0 && completedChores.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-800">
            <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">No Quests in this Category</h4>
            <p className="text-xs text-slate-500 mt-1">Tap the plus button below to register a new life quest.</p>
          </div>
        )}

        {activeChores.length === 0 && completedChores.length > 0 && (
          <div className="text-center py-8 px-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
            <h4 className="text-sm font-bold text-cyan-300 tracking-tight">All Daily Objectives Cleared!</h4>
            <p className="text-xs text-slate-400 mt-1">You maintained momentum. Boss shields have taken critical hits.</p>
          </div>
        )}

        {activeChores.map((chore) => {
          const isBossWeakness = activeBoss && activeBoss.status === 'active' && activeBoss.weakness === chore.category;

          return (
            <div
              key={chore.id}
              className={`rounded-2xl bg-slate-900/70 border p-3.5 transition-all flex items-start gap-3 relative group ${
                isBossWeakness
                  ? 'border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.12)]'
                  : 'border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Interactive Completion Ring */}
              <button
                onClick={() => completeChore(chore.id)}
                aria-label={`Complete chore ${chore.title}`}
                className="mt-0.5 min-w-[44px] min-h-[44px] -ml-1 -mt-1 flex items-center justify-center rounded-full text-slate-500 hover:text-cyan-400 active:scale-90 transition-transform"
              >
                <div className="w-6 h-6 rounded-lg border-2 border-slate-600 hover:border-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.4)] flex items-center justify-center bg-slate-950/60 transition-colors">
                  <div className="w-2 h-2 rounded-sm bg-transparent group-hover:bg-cyan-400/40 transition-colors" />
                </div>
              </button>

              {/* Task Details */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-medium capitalize text-slate-400">
                    {getCategoryIcon(chore.category)}
                    <span>{chore.category}</span>
                  </span>
                  <span className="text-slate-600 text-xs">·</span>
                  {getDifficultyBadge(chore.difficulty)}

                  {isBossWeakness && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      1.5x Boss Dmg
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-slate-100 tracking-tight leading-snug">
                  {chore.title}
                </h4>

                {chore.description && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {chore.description}
                  </p>
                )}

                {/* Reward Strip */}
                <div className="flex items-center gap-3 mt-2.5 text-[11px] font-mono">
                  <span className="text-emerald-400 font-semibold">+{chore.xpReward} XP</span>
                  <span className="text-amber-400 font-semibold">+{chore.creditReward} Cr</span>
                  <span className="text-cyan-400 font-semibold">-{chore.bossDamage} HP</span>

                  {chore.streak > 0 && (
                    <span className="flex items-center gap-0.5 text-amber-300 ml-auto text-[10px]">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{chore.streak}d</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Delete affordance */}
              <button
                onClick={() => deleteChore(chore.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-600 hover:text-rose-400 transition-opacity"
                title="Remove quest"
                aria-label="Delete Quest"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {/* Completed Chores Section */}
        {completedChores.length > 0 && (
          <div className="pt-4 border-t border-slate-900">
            <h5 className="text-xs font-mono font-semibold text-slate-500 mb-2.5 tracking-wider uppercase">
              Completed Protocol ({completedChores.length})
            </h5>

            <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
              {completedChores.map((chore) => (
                <div
                  key={chore.id}
                  className="rounded-xl bg-slate-950/60 border border-slate-900 p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-slate-400 line-through truncate font-medium">
                      {chore.title}
                    </span>
                  </div>

                  <button
                    onClick={() => uncompleteChore(chore.id)}
                    className="min-h-[44px] min-w-[44px] -my-2 -mr-2 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
                    title="Undo completion"
                    aria-label="Undo completion"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for Adding Chores */}
      <button
        onClick={() => setIsAddingChore(true)}
        aria-label="Add new life quest"
        className="fixed bottom-20 right-6 sm:absolute sm:bottom-20 sm:right-6 z-30 w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center active:scale-95 hover:brightness-110 transition-transform"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
