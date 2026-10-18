import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Wifi,
  BatteryCharging,
  Smartphone,
  Maximize2,
  Swords,
  CheckCircle2,
  Zap,
  ShoppingBag,
  User,
} from 'lucide-react';
import { useGame } from '../context/GameContext';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    soundMuted,
    toggleSound,
    popups,
    lootCrates,
    profile,
  } = useGame();

  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [isDeviceView, setIsDeviceView] = useState<boolean>(true);

  const unopenedCratesCount = lootCrates.filter((c) => !c.opened).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-cyan-500 selection:text-black">
      {/* Top Desktop Controls Bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-300">CyberQuest OS // Android 15</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDeviceView(!isDeviceView)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Toggle between phone frame and full responsive view"
          >
            {isDeviceView ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isDeviceView ? 'Expand' : 'Phone Shell'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Shell vs Fluid */}
      <div
        className={`w-full bg-slate-950 flex flex-col relative transition-all duration-300 ${
          isDeviceView
            ? 'max-w-[430px] h-[100dvh] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-slate-800 sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden'
            : 'max-w-2xl h-[100dvh] sm:h-[90vh] sm:rounded-2xl sm:border sm:border-slate-800 overflow-hidden'
        }`}
      >
        {/* Floating Combat Popups */}
        <div className="absolute top-16 left-0 right-0 z-50 pointer-events-none flex flex-col items-center gap-1.5 px-4">
          {popups.map((popup) => (
            <div
              key={popup.id}
              className={`px-3 py-1 rounded-md text-xs font-bold font-mono tracking-wide bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md animate-bounce ${popup.color}`}
            >
              {popup.text}
            </div>
          ))}
        </div>

        {/* Android Status Bar */}
        <header className="h-11 shrink-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-900/80 px-5 flex items-center justify-between text-xs text-slate-300 z-40 select-none">
          {/* Clock */}
          <div className="font-semibold font-mono tracking-tight text-slate-200">
            {currentTime}
          </div>

          {/* Android Punch Hole Camera */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/80" />
          </div>

          {/* System Indicators: Wifi, Sound, Battery */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSound}
              className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
              title={soundMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
              aria-label="Toggle Sound Effects"
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-0.5 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">88%</span>
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Viewport Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-20 custom-scrollbar">
          {children}
        </main>

        {/* Fixed Android Bottom Navigation Bar */}
        <nav
          aria-label="Bottom Navigation"
          className="absolute bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-900 px-2 py-1.5 pb-5 sm:pb-2.5 flex items-center justify-around select-none"
        >
          {/* Tab 1: Quests */}
          <button
            onClick={() => setActiveTab('quests')}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'quests'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <CheckCircle2 className={`w-5 h-5 ${activeTab === 'quests' ? 'text-cyan-400 scale-110' : ''}`} />
              {profile.comboCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-mono font-bold px-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {profile.comboCount}x
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">Quests</span>
          </button>

          {/* Tab 2: Boss Raids */}
          <button
            onClick={() => setActiveTab('raids')}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'raids'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Swords className={`w-5 h-5 ${activeTab === 'raids' ? 'text-pink-400 scale-110' : ''}`} />
              {profile.adrenalineCharge >= 100 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">Raid Boss</span>
          </button>

          {/* Tab 3: Skills */}
          <button
            onClick={() => setActiveTab('skills')}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'skills'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Zap className={`w-5 h-5 ${activeTab === 'skills' ? 'text-emerald-400 scale-110' : ''}`} />
              {profile.skillPoints > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-mono font-bold px-1 rounded-full bg-emerald-500 text-slate-950">
                  {profile.skillPoints}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">Skills</span>
          </button>

          {/* Tab 4: Armory / Shop */}
          <button
            onClick={() => setActiveTab('armory')}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'armory'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'armory' ? 'text-amber-400 scale-110' : ''}`} />
            <span className="text-[10px] mt-1 tracking-tight">Armory</span>
          </button>

          {/* Tab 5: Profile & Crates */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-cyan-400 scale-110' : ''}`} />
              {unopenedCratesCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-mono font-bold px-1 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                  {unopenedCratesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">Profile</span>
          </button>
        </nav>

        {/* Android Gesture Bar Line */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-slate-700/60 pointer-events-none z-50" />
      </div>
    </div>
  );
};
