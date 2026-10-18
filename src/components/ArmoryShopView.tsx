import React, { useState } from 'react';
import {
  ShoppingBag,
  Coins,
  Check,
  Eye,
  Glasses,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Cpu,
  Bot,
  Crosshair,
  Sparkles,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { EquipmentSlot, ItemRarity, ShopItem } from '../types/game';

export const ArmoryShopView: React.FC = () => {
  const { profile, shopItems, buyItem, toggleEquipItem } = useGame();
  const [selectedSlot, setSelectedSlot] = useState<'all' | EquipmentSlot>('all');

  const filteredItems = shopItems.filter((item) => {
    if (selectedSlot !== 'all' && item.slot !== selectedSlot) return false;
    return true;
  });

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'Glasses':
        return <Glasses className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Crosshair':
        return <Crosshair className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  const getRarityBadge = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'common':
        return <span className="text-[10px] font-mono text-slate-400">Common</span>;
      case 'rare':
        return <span className="text-[10px] font-mono text-cyan-300 font-semibold">Rare</span>;
      case 'epic':
        return <span className="text-[10px] font-mono text-purple-400 font-bold">Epic</span>;
      case 'legendary':
        return <span className="text-[10px] font-mono text-amber-300 font-black">Legendary</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-full p-4 relative">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 mb-4 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
            Black Market Cybernetics
          </span>
          <h3 className="text-sm font-bold text-slate-100 tracking-tight">Armory Store</h3>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold">{profile.credits} Credits</span>
        </div>
      </div>

      {/* Slot Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 no-scrollbar">
        {(['all', 'visor', 'exoskeleton', 'implant', 'drone'] as const).map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`min-h-[36px] px-3 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
              selectedSlot === slot
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 bg-slate-900/60 border border-slate-800/80 hover:text-slate-200'
            }`}
          >
            {slot === 'all' ? 'All Gear' : slot}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-3 flex-1">
        {filteredItems.map((item) => {
          const canAfford = profile.credits >= item.cost;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all relative ${
                item.equipped
                  ? 'bg-slate-900/90 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.12)]'
                  : item.purchased
                  ? 'bg-slate-900/70 border-slate-800'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Item Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    item.equipped
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : item.purchased
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {getItemIcon(item.iconName)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {item.slot}
                    </span>
                    {getRarityBadge(item.rarity)}
                  </div>

                  <h5 className="text-sm font-bold text-slate-100 tracking-tight">
                    {item.name}
                  </h5>

                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-2 text-[11px] font-mono text-emerald-400 font-semibold">
                    {item.bonusStat}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
                    {item.purchased ? (
                      <button
                        onClick={() => toggleEquipItem(item.id)}
                        className={`h-9 px-4 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
                          item.equipped
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {item.equipped ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Equipped</span>
                          </>
                        ) : (
                          <span>Equip Gear</span>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => buyItem(item.id)}
                        disabled={!canAfford}
                        className={`h-9 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                          canAfford
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer'
                            : 'bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-800'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>Buy {item.cost} Cr</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
