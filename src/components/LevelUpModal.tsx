import React from 'react';
import { Award, Zap, Coins, Sparkles, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const LevelUpModal: React.FC = () => {
  const { activeLevelUpModal, closeLevelUpModal } = useGame();

  if (!activeLevelUpModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/60 rounded-3xl p-6 text-center shadow-[0_0_60px_rgba(6,182,212,0.35)] relative overflow-hidden">
        {/* Glow Halo */}
        <div className="w-24 h-24 rounded-full bg-cyan-500/20 blur-2xl absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 mx-auto flex items-center justify-center text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.6)] mb-4 animate-bounce">
          <Award className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Level Banner */}
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
          Cyber Matrix Ascension
        </span>
        <h3 className="text-2xl font-black text-slate-100 font-mono tracking-tight">
          LEVEL {activeLevelUpModal.newLevel} ACHIEVED!
        </h3>

        <div className="my-3 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 inline-block text-cyan-300 text-xs font-mono font-bold">
          Rank: {activeLevelUpModal.newTitle}
        </div>

        {/* Rewards */}
        <div className="grid grid-cols-2 gap-2.5 my-4 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 block">SKILL POINTS</span>
            <span className="text-sm font-bold text-emerald-300">+1 Point</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <Coins className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 block">PROMOTION BONUS</span>
            <span className="text-sm font-bold text-amber-300">
              +{activeLevelUpModal.bonusCredits} Cr
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Your daily consistency has upgraded your neural hardware. Spend your new skill point in the Skills tab.
        </p>

        {/* Claim */}
        <button
          onClick={closeLevelUpModal}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Confirm Ascension</span>
        </button>
      </div>
    </div>
  );
};
