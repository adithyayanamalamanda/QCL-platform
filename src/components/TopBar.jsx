import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, completedLevels: [] };
  });

  useEffect(() => {
    const loadStats = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) setStats(JSON.parse(saved));
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
    const newStats = { ...stats, streak: (stats.streak || 0) + 1 };
    localStorage.setItem('quantumQuestStats', JSON.stringify(newStats));
    setStats(newStats);
    window.dispatchEvent(new Event('stats-updated'));
  };

  const refillHearts = (e) => {
    e.stopPropagation();
    const newStats = { ...stats, hearts: 5 };
    localStorage.setItem('quantumQuestStats', JSON.stringify(newStats));
    setStats(newStats);
    window.dispatchEvent(new Event('stats-updated'));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-6 py-3 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Mobile Brand / Page Context */}
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-xl bg-duo-green flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">science</span>
            </div>
            <span className="font-extrabold text-lg text-slate-900">QuantumQuest</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="material-symbols-outlined text-duo-blue text-sm">terminal</span>
            <span>Quantum Computing Platform v2.0</span>
          </div>
        </div>

        {/* Right Stats: Streak, XP, Hearts, Avatar */}
        <div className="flex items-center gap-3 sm:gap-6 text-sm font-extrabold">
          
          {/* Day Streak */}
          <button
            onClick={triggerStreakBoost}
            title="Daily Learning Streak. Click to simulate next day!"
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white hover:bg-duo-amberLight text-duo-amber border-2 border-slate-200 hover:border-duo-amber transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-duo-amber">local_fire_department</span>
            <span>{stats.streak || 0}</span>
          </button>

          {/* XP Gems */}
          <div
            title="Total Quantum Experience Points"
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white text-duo-blue border-2 border-slate-200"
          >
            <span className="material-symbols-outlined text-xl text-duo-blue">bolt</span>
            <span>{stats.xp || 0} <span className="text-xs text-slate-400 font-semibold">XP</span></span>
          </div>

          {/* Hearts / Lives */}
          <button
            onClick={refillHearts}
            title="Hearts remaining. Click to refill 5 hearts!"
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white hover:bg-duo-roseLight text-duo-rose border-2 border-slate-200 hover:border-duo-rose transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-duo-rose">favorite</span>
            <span>{stats.hearts || 5}</span>
            {stats.hearts < 5 && (
              <span className="material-symbols-outlined text-xs text-duo-rose opacity-80">refresh</span>
            )}
          </button>

          {/* Profile Quick Avatar */}
          <div
            onClick={() => navigate('/profile')}
            title="View Profile"
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 flex items-center justify-center cursor-pointer transition-all active:scale-95 text-slate-700"
          >
            <span className="material-symbols-outlined text-xl">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  );
}
