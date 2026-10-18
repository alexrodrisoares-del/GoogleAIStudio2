import React, { useState } from 'react';
import {
  User,
  Shield,
  Flame,
  Zap,
  CheckCircle2,
  Swords,
  Box,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
} from 'lucide-react';
import { ASSET_PATHS } from '../data/initialData';
import { useGame } from '../context/GameContext';
import { ItemRarity, LootCrate } from '../types/game';

export const ProfileView: React.FC = () => {
  const {
    profile,
    lootCrates,
    openLootCrate,
    shopItems,
    resetAllData,
  } = useGame();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const equippedItems = shopItems.filter((i) => i.equipped);
  const unopenedCrates = lootCrates.filter((c) => !c.opened);

  const getRarityBadge = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return <span className="text-[10px] font-mono text-slate-400">Common Cache</span>;
      case 'rare':
        return <span className="text-[10px] font-mono text-cyan-300 font-semibold">Rare Matrix Crate</span>;
      case 'epic':
        return <span className="text-[10px] font-mono text-purple-400 font-bold">Epic Tech Cache</span>;
      case 'legendary':
        return <span className="text-[10px] font-mono text-amber-300 font-black">Legendary Vault Crate</span>;
    }
  };

  const handleExportData = () => {
    const data = {
      profile,
      lootCrates,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberquest_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-full p-4 relative space-y-4">
      {/* Player Hero Identity Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Avatar Image */}
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0 bg-slate-950">
            <img
              src={ASSET_PATHS.heroAvatar}
              alt="Cyber Operative Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/20" />
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400">
                LVL {profile.level}
              </span>
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-xs font-mono text-slate-400">
                {profile.rankTitle}
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-100 font-mono tracking-tight truncate">
              {profile.username}
            </h3>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Netrunner Specialization · Life Task Protocol
            </p>
          </div>
        </div>

        {/* Lifetime Statistics Strip */}
        <div className="grid grid-cols-4 gap-2 pt-4 mt-4 border-t border-slate-800/80 text-center font-mono">
          <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{profile.completedChoresTotal}</span>
            </div>
            <span className="text-[9px] text-slate-500 block">Cleared</span>
          </div>

          <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-pink-400 mb-0.5">
              <Swords className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{profile.bossesDefeatedTotal}</span>
            </div>
            <span className="text-[9px] text-slate-500 block">Bosses</span>
          </div>

          <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{profile.streakDays}d</span>
            </div>
            <span className="text-[9px] text-slate-500 block">Streak</span>
          </div>

          <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-cyan-400 mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{profile.comboMultiplier}x</span>
            </div>
            <span className="text-[9px] text-slate-500 block">Combo</span>
          </div>
        </div>
      </div>

      {/* Equipped Cyber Gear Loadout */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4">
        <h4 className="text-xs font-mono font-semibold text-slate-400 mb-3 tracking-wider uppercase flex items-center justify-between">
          <span>Active Cyber Loadout</span>
          <span className="text-cyan-400 text-[10px] lowercase font-normal">{equippedItems.length} active units</span>
        </h4>

        {equippedItems.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">No cybernetic gear currently equipped. Visit the Armory.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {equippedItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-200 block truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 block truncate">
                    {item.bonusStat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unopened Mystery Loot Crates */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
              Mystery Loot Caches
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">
            {unopenedCrates.length} Crates
          </span>
        </div>

        {unopenedCrates.length === 0 ? (
          <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
            <p className="text-xs text-slate-400">No loot crates available right now.</p>
            <span className="text-[11px] text-slate-500 block mt-1">
              Earn crates by reaching daily task streaks or defeating raid bosses!
            </span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {unopenedCrates.map((crate) => (
              <div
                key={crate.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-500/40 shrink-0 bg-slate-900">
                    <img
                      src={ASSET_PATHS.lootCrate}
                      alt="Loot Crate"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    {getRarityBadge(crate.rarity)}
                    <span className="text-[10px] text-slate-500 block">
                      {crate.receivedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openLootCrate(crate.id)}
                  className="min-h-[44px] px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold font-mono shadow-md shadow-amber-500/20 active:scale-95 transition-transform flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Decrypt</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Settings & Data Protocol */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4 space-y-2">
        <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
          System Protocols
        </h4>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="flex-1 min-h-[44px] px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Backup Data</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex-1 min-h-[44px] px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Factory Reset</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-2xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-rose-300 font-mono mb-2">
              Confirm Matrix Wipe?
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              This will reset all character XP, unlocked skills, equipped armory items, and chores back to the initial seeded protocol.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 h-10 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowResetConfirm(false);
                }}
                className="flex-1 h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
              >
                Wipe All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
