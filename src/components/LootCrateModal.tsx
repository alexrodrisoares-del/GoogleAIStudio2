import React from 'react';
import { Sparkles, Coins, Zap, Check } from 'lucide-react';
import { ASSET_PATHS } from '../data/initialData';
import { useGame } from '../context/GameContext';

export const LootCrateModal: React.FC = () => {
  const { activeLootReward, closeLootModal } = useGame();

  if (!activeLootReward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/50 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(245,158,11,0.25)] relative">
        {/* Glow Sparkles */}
        <div className="w-16 h-16 rounded-full bg-amber-500/20 blur-xl absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Crate Visual Asset */}
        <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.4)] mb-4 bg-slate-950 animate-bounce">
          <img
            src={ASSET_PATHS.lootCrate}
            alt="Loot Cache Decrypted"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
          {activeLootReward.rarity} Cache Decrypted
        </span>
        <h3 className="text-xl font-black text-slate-100 font-mono tracking-tight mb-4">
          Tech Cache Unlocked!
        </h3>

        {/* Reward breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 block">CREDITS</span>
            <span className="text-base font-bold text-amber-300">
              +{activeLootReward.credits} Cr
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 block">EXPERIENCE</span>
            <span className="text-base font-bold text-cyan-300">
              +{activeLootReward.xp} XP
            </span>
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={closeLootModal}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Claim Cache Loot</span>
        </button>
      </div>
    </div>
  );
};
