import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS_CONFIG } from '../data/levelsData';

const GOOGLE_ICONS = {
  Atom: 'science',
  Zap: 'bolt',
  GitBranch: 'alt_route',
  Network: 'all_inclusive',
  Activity: 'insights',
  Sparkles: 'auto_awesome'
};

export default function PathScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved
      ? JSON.parse(saved)
      : { xp: 0, streak: 3, hearts: 5, completedLevels: [], levelStars: {} };
  });

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [guidebookModal, setGuidebookModal] = useState(null);

  useEffect(() => {
    const updateStats = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) setStats(JSON.parse(saved));
    };
    window.addEventListener('stats-updated', updateStats);
    window.addEventListener('storage', updateStats);
    return () => {
      window.removeEventListener('stats-updated', updateStats);
      window.removeEventListener('storage', updateStats);
    };
  }, []);

  const completedSet = new Set(stats.completedLevels || []);
  const levelStars = stats.levelStars || {};

  const getLevelStatus = (levelId) => {
    if (completedSet.has(levelId)) return 'completed';
    if (levelId === 1 || completedSet.has(levelId - 1)) return 'unlocked';
    return 'locked';
  };

  const handleNodeClick = (level) => {
    const status = getLevelStatus(level.id);
    if (status === 'locked') {
      setSelectedLevel(level);
    } else {
      navigate(`/level/${level.id}`);
    }
  };

  // Group levels into 2 Units
  const units = [
    {
      id: 1,
      title: "Unit 1: Quantum Foundations",
      description: "Qubits, Superposition & Single-Qubit Gates",
      color: "bg-duo-green",
      borderColor: "border-duo-greenDark",
      textColor: "text-emerald-800",
      lightBg: "bg-emerald-50",
      levels: LEVELS_CONFIG.slice(0, 3)
    },
    {
      id: 2,
      title: "Unit 2: Quantum Information & Algorithms",
      description: "Entanglement, Bell States & Grover's Search",
      color: "bg-duo-blue",
      borderColor: "border-duo-blueDark",
      textColor: "text-sky-800",
      lightBg: "bg-sky-50",
      levels: LEVELS_CONFIG.slice(3, 6)
    }
  ];

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left / Center Column: The Duolingo Skill Tree Path */}
      <div className="lg:col-span-8 flex flex-col items-center space-y-12">
        {units.map((unit) => {
          const unitCompletedCount = unit.levels.filter(l => completedSet.has(l.id)).length;
          const unitProgress = Math.round((unitCompletedCount / unit.levels.length) * 100);

          return (
            <div key={unit.id} className="w-full max-w-xl space-y-8">
              
              {/* Unit Header Card */}
              <div className={`${unit.color} rounded-3xl p-6 text-white shadow-sm border-b-4 ${unit.borderColor} flex items-center justify-between gap-4`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest bg-black/15 px-2.5 py-0.5 rounded-full">
                      {unit.title}
                    </span>
                    <span className="text-xs font-bold opacity-90">{unitProgress}% Complete</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {unit.description}
                  </h3>
                </div>

                <button
                  onClick={() => setGuidebookModal(unit)}
                  className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-base">menu_book</span>
                  <span>Guidebook</span>
                </button>
              </div>

              {/* Vertical Path for this unit */}
              <div className="relative flex flex-col items-center space-y-12 py-4">
                {unit.levels.map((level, index) => {
                  const status = getLevelStatus(level.id);
                  const stars = levelStars[level.id] || 0;
                  const iconName = GOOGLE_ICONS[level.icon] || 'science';

                  // Alternating sine offsets: 0, 60, -60
                  const offsets = [0, 65, -65];
                  const offsetX = offsets[index % offsets.length];

                  const isCurrent = status === 'unlocked';

                  return (
                    <div
                      key={level.id}
                      className="flex flex-col items-center relative transition-transform duration-300"
                      style={{ transform: `translateX(${offsetX}px)` }}
                    >
                      {/* Active level pulsing ring indicator */}
                      {isCurrent && (
                        <div className="absolute -inset-2 rounded-full border-4 border-duo-green animate-pulse-ring pointer-events-none" />
                      )}

                      {/* Level Node 3D Button */}
                      <div className="relative group">
                        <button
                          onClick={() => handleNodeClick(level)}
                          aria-label={`Level ${level.id}: ${level.title}`}
                          className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-b-8 transition-all active:translate-y-1 active:border-b-4 select-none ${
                            status === 'completed'
                              ? 'bg-duo-green border-duo-greenDark text-white hover:bg-[#61e002]'
                              : status === 'unlocked'
                              ? 'bg-duo-blue border-duo-blueDark text-white hover:bg-[#28b9ff]'
                              : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {status === 'completed' ? (
                            <span className="material-symbols-outlined text-3xl font-black">check</span>
                          ) : status === 'unlocked' ? (
                            <span className="material-symbols-outlined text-3xl font-black">{iconName}</span>
                          ) : (
                            <span className="material-symbols-outlined text-2xl font-bold">lock</span>
                          )}
                        </button>

                        {/* Stars badge for completed levels */}
                        {status === 'completed' && (
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-full border-2 border-slate-200 shadow-sm">
                            {[1, 2, 3].map((s) => (
                              <span
                                key={s}
                                className={`material-symbols-outlined text-xs ${
                                  s <= stars ? 'text-amber-400' : 'outlined text-slate-300'
                                }`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Level Label */}
                      <div className="mt-3 text-center max-w-[140px]">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Level {level.id}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                          {level.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Widgets & Quests */}
      <div className="lg:col-span-4 space-y-6 sticky top-20">
        
        {/* Daily Quests Widget */}
        <div className="duo-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-duo-amber text-xl">flag</span>
              <span>Daily Quests</span>
            </h4>
            <span className="text-xs font-bold text-slate-400">12h left</span>
          </div>

          <div className="space-y-3">
            {/* Quest 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Earn 50 XP</span>
                <span className="text-duo-blue">{Math.min(50, stats.xp || 0)} / 50 XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-duo-blue rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, ((stats.xp || 0) / 50) * 100)}%` }}
                />
              </div>
            </div>

            {/* Quest 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Complete 1 Quantum Lesson</span>
                <span className="text-duo-green">{completedSet.size > 0 ? '1/1' : '0/1'}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-duo-green rounded-full transition-all duration-500"
                  style={{ width: completedSet.size > 0 ? '100%' : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Preview Widget */}
        <div className="duo-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-duo-purple text-xl">military_tech</span>
              <span>Gold League</span>
            </h4>
            <button
              onClick={() => navigate('/leaderboard')}
              className="text-xs font-bold text-duo-blue hover:underline"
            >
              VIEW ALL
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-duo-purpleLight border border-purple-200 text-xs font-extrabold text-purple-900">
              <div className="flex items-center gap-2.5">
                <span className="w-5 font-black text-purple-700">#4</span>
                <div className="w-7 h-7 rounded-full bg-duo-purple text-white flex items-center justify-center font-bold text-xs">
                  U
                </div>
                <span>You (@quantum_dev)</span>
              </div>
              <span>{stats.xp || 0} XP</span>
            </div>

            <p className="text-[11px] text-slate-500 text-center font-medium">
              Top 10 advance to the Diamond League next week!
            </p>
          </div>
        </div>

        {/* Quantum Playground Quick Launch */}
        <div className="duo-card p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
            <span className="material-symbols-outlined text-indigo-600">terminal</span>
            <span>Quantum Circuit Playground</span>
          </div>
          <p className="text-xs text-indigo-700 leading-relaxed font-medium">
            Test multi-qubit gates, measure superposition collapses, and export Python Qiskit code.
          </p>
          <button
            onClick={() => navigate('/playground')}
            className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
          >
            Open Circuit Lab
          </button>
        </div>
      </div>

      {/* Guidebook Modal */}
      {guidebookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-5 border-2 border-slate-200 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-duo-blue text-2xl">menu_book</span>
                <h3 className="font-extrabold text-lg text-slate-900">{guidebookModal.title}</h3>
              </div>
              <button
                onClick={() => setGuidebookModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 max-h-96 overflow-y-auto pr-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Unit Summary</span>
                <p className="font-medium text-slate-800">{guidebookModal.description}</p>
              </div>

              {guidebookModal.levels.map((lvl) => (
                <div key={lvl.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Level {lvl.id}: {lvl.title}</span>
                    <span className="text-xs font-bold text-duo-purple">+{lvl.xpReward} XP</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{lvl.overview.description}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setGuidebookModal(null)}
              className="w-full py-3 rounded-2xl bg-duo-green border-2 border-duo-greenDark text-white font-extrabold text-sm uppercase tracking-wider"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Locked Level Modal */}
      {selectedLevel && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 border-2 border-slate-200 shadow-2xl animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Level {selectedLevel.id} Locked
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                {selectedLevel.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Complete Level {selectedLevel.id - 1} to unlock this quantum lesson!
              </p>
            </div>
            <button
              onClick={() => setSelectedLevel(null)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
