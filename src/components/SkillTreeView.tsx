import React, { useState } from 'react';
import {
  Zap,
  Dumbbell,
  HeartPulse,
  Brain,
  Lock,
  CheckCircle2,
  Shield,
  Activity,
  Cpu,
  Flame,
  Sparkles,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ChoreCategory, SkillNode } from '../types/game';

export const SkillTreeView: React.FC = () => {
  const { profile, skills, unlockSkill } = useGame();
  const [activeCategory, setActiveCategory] = useState<ChoreCategory>('strength');

  const categorySkills = skills.filter((s) => s.category === activeCategory);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getCategoryDetails = (cat: ChoreCategory) => {
    switch (cat) {
      case 'strength':
        return {
          title: 'Strength Protocol',
          desc: 'Kinetic cleaning, workout endurance, and boss battle plasma damage.',
          color: 'text-rose-400',
          border: 'border-rose-500/30',
          bg: 'bg-rose-500/10',
        };
      case 'vitality':
        return {
          title: 'Vitality Matrix',
          desc: 'Cellular recovery, nutrition, hydration routines, and streak defense.',
          color: 'text-emerald-400',
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-500/10',
        };
      case 'mind':
        return {
          title: 'Cortex Optimization',
          desc: 'Neural focus, productivity sprints, and daemon shield breaches.',
          color: 'text-cyan-400',
          border: 'border-cyan-500/30',
          bg: 'bg-cyan-500/10',
        };
    }
  };

  const currentCatDetails = getCategoryDetails(activeCategory);

  return (
    <div className="flex flex-col min-h-full p-4 relative">
      {/* Skill Points Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 mb-4 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
            Cyber Matrix Overclock
          </span>
          <h3 className="text-sm font-bold text-slate-100 tracking-tight">Skill Trees</h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-xs font-mono font-bold">{profile.skillPoints} SP Available</span>
        </div>
      </div>

      {/* Track Selector Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(['strength', 'vitality', 'mind'] as ChoreCategory[]).map((cat) => {
          const details = getCategoryDetails(cat);
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? `${details.bg} ${details.border} ${details.color} font-bold shadow-sm`
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {cat === 'strength' && <Dumbbell className="w-4 h-4" />}
                {cat === 'vitality' && <HeartPulse className="w-4 h-4" />}
                {cat === 'mind' && <Brain className="w-4 h-4" />}
              </div>
              <span className="text-[11px] capitalize tracking-tight block truncate font-medium">
                {cat}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Track Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 mb-4">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${currentCatDetails.color}`}>
          {currentCatDetails.title}
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
          {currentCatDetails.desc}
        </p>
      </div>

      {/* Tier Nodes List */}
      <div className="space-y-3.5 flex-1 relative">
        {categorySkills.map((skill, index) => {
          const canAfford = profile.skillPoints >= skill.cost;

          return (
            <div
              key={skill.id}
              className={`rounded-2xl border p-4 transition-all relative ${
                skill.unlocked
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : canAfford
                  ? 'bg-slate-900/60 border-cyan-500/30 hover:border-cyan-500/60'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-75'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Node Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    skill.unlocked
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                      : canAfford
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {getSkillIcon(skill.icon)}
                </div>

                {/* Node Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Tier {skill.tier} Node
                    </span>
                    {skill.unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.cost} SP
                      </span>
                    )}
                  </div>

                  <h5 className="text-sm font-bold text-slate-100 tracking-tight">
                    {skill.name}
                  </h5>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Unlock Button */}
                  {!skill.unlocked && (
                    <button
                      onClick={() => unlockSkill(skill.id)}
                      disabled={!canAfford}
                      className={`mt-3 h-9 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer'
                          : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>Unlock Node ({skill.cost} SP)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Needs {skill.cost} SP (Have {profile.skillPoints})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
