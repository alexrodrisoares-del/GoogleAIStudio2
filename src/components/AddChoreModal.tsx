import React, { useState } from 'react';
import { X, Dumbbell, HeartPulse, Brain, PlusCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ChoreCategory, ChoreDifficulty, RecurrenceFrequency } from '../types/game';

export const AddChoreModal: React.FC = () => {
  const { isAddingChore, setIsAddingChore, addChore } = useGame();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ChoreCategory>('vitality');
  const [difficulty, setDifficulty] = useState<ChoreDifficulty>('medium');
  const [frequency, setFrequency] = useState<RecurrenceFrequency>('daily');

  if (!isAddingChore) return null;

  const getRewardEstimates = (diff: ChoreDifficulty) => {
    switch (diff) {
      case 'easy':
        return { xp: 30, credits: 15, dmg: 35 };
      case 'medium':
        return { xp: 60, credits: 30, dmg: 70 };
      case 'hard':
        return { xp: 100, credits: 50, dmg: 120 };
      case 'epic':
        return { xp: 200, credits: 100, dmg: 250 };
    }
  };

  const rewards = getRewardEstimates(difficulty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addChore({
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      frequency,
      xpReward: rewards.xp,
      creditReward: rewards.credits,
      bossDamage: rewards.dmg,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">Register New Quest</h3>
          </div>
          <button
            onClick={() => setIsAddingChore(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Quest Objective
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Clean bathroom mirrors & sink"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mission Directives (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Use glass cleaner, wipe dry, dispose of clutter."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Attribute Class
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('strength')}
                className={`h-11 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  category === 'strength'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
                <span>Strength</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('vitality')}
                className={`h-11 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  category === 'vitality'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vitality</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('mind')}
                className={`h-11 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  category === 'mind'
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mind</span>
              </button>
            </div>
          </div>

          {/* Difficulty Tier */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {(['easy', 'medium', 'hard', 'epic'] as ChoreDifficulty[]).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`h-9 rounded-lg border text-xs font-mono capitalize transition-all ${
                    difficulty === diff
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Recurrence Frequency */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Recurrence Cycle
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['daily', 'weekdays', 'weekly'] as RecurrenceFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`h-9 rounded-lg border text-xs capitalize transition-all ${
                    frequency === freq
                      ? 'bg-slate-800 border-slate-600 text-slate-100 font-semibold'
                      : 'bg-slate-950 border-slate-800/80 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Reward Summary Pill */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-around text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">XP REWARD</span>
              <span className="text-emerald-400 font-bold">+{rewards.xp} XP</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">CREDITS</span>
              <span className="text-amber-400 font-bold">+{rewards.credits} Cr</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">BOSS DMG</span>
              <span className="text-cyan-400 font-bold">-{rewards.dmg} HP</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddingChore(false)}
              className="flex-1 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:brightness-110 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 transition-transform active:scale-95"
            >
              Deploy Quest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
