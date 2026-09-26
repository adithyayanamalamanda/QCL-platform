import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Heart, Zap, Sparkles, RefreshCw } from 'lucide-react';

export default function TopBar({ currentLevel = 1, totalLevels = 6 }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, completedLevels: [] };
  });

  const [heartPulse, setHeartPulse] = useState(false);
  const [xpPulse, setXpPulse] = useState(false);

  useEffect(() => {
    const loadStats = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
    };

    window.addEventListener('stats-updated', loadStats);
    window.addEventListener('storage', loadStats);
    return () => {
      window.removeEventListener('stats-updated', loadStats);
      window.removeEventListener('storage', loadStats);
    };
  }, []);

  const triggerStreakBoost = (e) => {
    e.stopPropagation();
    const newStats = { ...stats, streak: stats.streak + 1 };
    localStorage.setItem('quantumQuestStats', JSON.stringify(newStats));
    setStats(newStats);
    window.dispatchEvent(new Event('stats-updated'));
  };

  const refillHearts = (e) => {
    e.stopPropagation();
    const newStats = { ...stats, hearts: 5 };
    localStorage.setItem('quantumQuestStats', JSON.stringify(newStats));
    setStats(newStats);
    setHeartPulse(true);
    setTimeout(() => setHeartPulse(false), 800);
    window.dispatchEvent(new Event('stats-updated'));
  };

  const completedCount = stats.completedLevels ? stats.completedLevels.length : 0;
  const overallProgress = Math.min(100, Math.round((completedCount / totalLevels) * 100));

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              QuantumQuest
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/50 uppercase tracking-wider">
              Duolingo Style
            </span>
          </div>
        </div>

        {/* Global Progress Bar (Center) */}
        <div className="hidden md:flex flex-col items-center flex-1 max-w-xs mx-4">
          <div className="flex justify-between w-full text-xs font-semibold text-slate-400 mb-1">
            <span>Course Progress</span>
            <span className="text-cyan-400">{overallProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(4, overallProgress)}%` }}
            />
          </div>
        </div>

        {/* Gamification Stats: Streak, XP, Hearts */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak Counter */}
          <div 
            onClick={triggerStreakBoost}
            title="Current Streak! Click to increment demo streak"
            className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800/90 cursor-pointer px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-400 shadow-sm transition-all active:scale-95"
          >
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-bounce-subtle" />
            <span className="font-extrabold text-sm">{stats.streak}</span>
            <span className="hidden lg:inline text-xs text-amber-300/80">days</span>
          </div>

          {/* XP Counter */}
          <div 
            className={`flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 shadow-sm transition-transform ${xpPulse ? 'scale-110' : ''}`}
          >
            <Zap className="w-5 h-5 fill-purple-400 text-purple-400" />
            <span className="font-extrabold text-sm text-white">{stats.xp}</span>
            <span className="text-xs text-purple-400 font-semibold">XP</span>
          </div>

          {/* Hearts / Lives Counter */}
          <div 
            onClick={refillHearts}
            title="Hearts remaining. Click to refill 5 hearts!"
            className={`flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800/90 cursor-pointer px-3 py-1.5 rounded-xl border ${stats.hearts > 1 ? 'border-rose-500/30 text-rose-400' : 'border-rose-600 bg-rose-950/40 text-rose-400 animate-pulse'} shadow-sm transition-all active:scale-95 ${heartPulse ? 'scale-110' : ''}`}
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span className="font-extrabold text-sm">{stats.hearts}</span>
            {stats.hearts < 5 && (
              <RefreshCw className="w-3.5 h-3.5 text-rose-400 ml-0.5 opacity-80" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
