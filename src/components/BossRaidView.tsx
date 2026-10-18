import React, { useState } from 'react';
import {
  Swords,
  Shield,
  Zap,
  Flame,
  Award,
  Sparkles,
  RefreshCw,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ChoreCategory } from '../types/game';

export const BossRaidView: React.FC = () => {
  const {
    bosses,
    activeBoss,
    activeBossIndex,
    selectBoss,
    strikeBossWithAdrenaline,
    profile,
  } = useGame();

  const [isStriking, setIsStriking] = useState(false);

  if (!activeBoss) {
    return <div className="p-4 text-center text-slate-400">No active boss registered.</div>;
  }

  const hpPercent = Math.max(0, Math.min(100, Math.round((activeBoss.currentHp / activeBoss.maxHp) * 100)));
  const isDefeated = activeBoss.status === 'defeated' || activeBoss.currentHp <= 0;

  const handleAdrenalineStrike = () => {
    setIsStriking(true);
    strikeBossWithAdrenaline();
    setTimeout(() => setIsStriking(false), 500);
  };

  const getWeaknessLabel = (weakness: ChoreCategory) => {
    switch (weakness) {
      case 'mind':
        return 'Mind (Study & Focus Quests deal +50% Crit)';
      case 'strength':
        return 'Strength (Deep Cleaning & Workouts deal +50% Crit)';
      case 'vitality':
        return 'Vitality (Nutrition & Rest Habits deal +50% Crit)';
    }
  };

  return (
    <div className="flex flex-col min-h-full p-4 relative">
      {/* Boss Selector Tabs */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
        {bosses.map((boss, idx) => (
          <button
            key={boss.id}
            onClick={() => selectBoss(idx)}
            className={`min-h-[38px] px-3.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
              activeBossIndex === idx
                ? 'bg-pink-500/15 text-pink-300 border border-pink-500/40 shadow-sm'
                : 'text-slate-400 bg-slate-900/60 border border-slate-800/80 hover:text-slate-200'
            }`}
          >
            <span className={boss.status === 'defeated' ? 'line-through text-slate-500' : ''}>
              {boss.name}
            </span>
            {boss.status === 'defeated' ? (
              <span className="text-[9px] font-bold px-1 rounded bg-slate-800 text-slate-400">
                PURGED
              </span>
            ) : (
              <span className="text-[9px] font-bold px-1 rounded bg-pink-500/20 text-pink-300">
                LVL {boss.level}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Boss Arena Card */}
      <div
        className={`rounded-3xl bg-slate-900/80 border p-4 backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
          isStriking
            ? 'border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.5)] scale-[0.98]'
            : 'border-slate-800 shadow-xl'
        }`}
      >
        {/* Boss Portrait Container */}
        <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700/80 mb-4 bg-slate-950 shadow-inner group">
          <img
            src={activeBoss.imagePath}
            alt={activeBoss.name}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isDefeated ? 'grayscale contrast-75 brightness-50' : 'group-hover:scale-105'
            } ${isStriking ? 'animate-ping' : ''}`}
          />

          {/* Hologram Overlay Scanlines */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

          {/* Boss Defeated Banner */}
          {isDefeated && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
              <Award className="w-12 h-12 text-amber-400 mb-2 animate-bounce" />
              <span className="text-sm font-mono font-black text-amber-300 tracking-wider">
                THREAT NEUTRALIZED
              </span>
              <span className="text-[11px] text-slate-300 mt-1">Bounty Crates Distributed</span>
            </div>
          )}

          {/* Threat Indicator Chip */}
          {!isDefeated && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-pink-400 flex items-center gap-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              <span>ACTIVE RAID ENCOUNTER</span>
            </div>
          )}
        </div>

        {/* Boss Metadata */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-slate-100 font-mono tracking-tight">
            {activeBoss.name}
          </h3>
          <p className="text-xs text-pink-400/90 font-medium tracking-wide">
            {activeBoss.subtitle}
          </p>
        </div>

        {/* Boss HP Gauge */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <div className="flex items-center gap-1.5 text-pink-400">
              <Swords className="w-3.5 h-3.5" />
              <span>Daemon Integrity</span>
            </div>
            <span className="font-bold text-slate-200">
              {activeBoss.currentHp} / {activeBoss.maxHp} HP ({hpPercent}%)
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                hpPercent > 50
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                  : hpPercent > 20
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-rose-600 animate-pulse'
              }`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Tactical Weakness Callout */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs mb-4">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-300">Exploitable Vulnerability:</span>
          </div>
          <p className="text-[11px] text-cyan-300 font-mono leading-relaxed pl-5">
            {getWeaknessLabel(activeBoss.weakness)}
          </p>
        </div>

        {/* Raid Bounty Rewards */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono mb-4">
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[10px] text-slate-500 block">BOUNTY CREDITS</span>
            <span className="text-amber-400 font-bold">+{activeBoss.bountyCredits} Cr</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-[10px] text-slate-500 block">BOUNTY EXP</span>
            <span className="text-emerald-400 font-bold">+{activeBoss.bountyXP} XP</span>
          </div>
        </div>

        {/* Adrenaline Power Strike Action Button */}
        <div>
          <button
            onClick={handleAdrenalineStrike}
            disabled={profile.adrenalineCharge < 100 || isDefeated}
            className={`w-full h-12 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all select-none ${
              profile.adrenalineCharge >= 100 && !isDefeated
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(236,72,153,0.6)] animate-pulse active:scale-95 cursor-pointer'
                : 'bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            {profile.adrenalineCharge >= 100 && !isDefeated ? (
              <span>UNLEASH ADRENALINE CRIT (-320 HP)</span>
            ) : isDefeated ? (
              <span>DAEMON DEFEATED</span>
            ) : (
              <span>CHARGE ADRENALINE ({profile.adrenalineCharge}% / 100%)</span>
            )}
          </button>
          <span className="block text-[10px] text-center text-slate-500 mt-2 font-mono">
            {profile.adrenalineCharge >= 100 && !isDefeated
              ? 'Ready! Tap to discharge accumulated life chore momentum.'
              : 'Complete daily chores in Quests tab to generate +15% Adrenaline.'}
          </span>
        </div>
      </div>
    </div>
  );
};
