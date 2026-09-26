import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNITS_CONFIG, LEVELS_56_DATA } from '../data/curriculum56';
import GuidebookModal from './GuidebookModal';
import AITutorModal from './AITutorModal';

export default function PathScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved
      ? JSON.parse(saved)
      : { xp: 0, streak: 3, hearts: 5, completedLevels: [], levelStars: {} };
  });

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [isExploreMode, setIsExploreMode] = useState(() => {
    return localStorage.getItem('quantumExploreMode') === 'true';
  });

  useEffect(() => {
    const updateStats = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) setStats(JSON.parse(saved));
      setIsExploreMode(localStorage.getItem('quantumExploreMode') === 'true');
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
    if (isExploreMode) return completedSet.has(levelId) ? 'completed' : 'unlocked';
    if (completedSet.has(levelId)) return 'completed';
    if (levelId === 1 || completedSet.has(levelId - 1)) return 'unlocked';
    return 'locked';
  };

  const currentActiveLevel =
    LEVELS_56_DATA.find((l) => getLevelStatus(l.id) === 'unlocked') || LEVELS_56_DATA[0];

  const handleNodeClick = (level) => {
    const status = getLevelStatus(level.id);
    if (status === 'locked') {
      setSelectedLevel(level);
    } else {
      navigate(`/level/${level.id}`);
    }
  };

  const totalDone = completedSet.size;

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-none">
      
      {/* Left Column: 10 Units and 56 Level Nodes */}
      <div className="lg:col-span-8 flex flex-col items-center space-y-12">
        
        {/* Course Header Banner */}
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-duo-purple">
              IBM-Aligned Quantum Curriculum
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              56-Level Quantum Journey
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Zero foundations (1–10) ➔ Circuits & Entanglement ➔ Advanced Quantum Algorithms
            </p>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => setShowGuidebook(true)}
              className="btn-duo btn-duo-green px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>Guidebook</span>
            </button>
            <button
              onClick={() => setShowAITutor(true)}
              className="btn-duo btn-duo-purple px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              <span>AI Tutor</span>
            </button>
          </div>
        </div>

        {/* 10 UNITS ITERATION */}
        {UNITS_CONFIG.map((unit) => {
          const unitLevels = LEVELS_56_DATA.filter((l) => l.unitId === unit.id);
          const unitCompletedCount = unitLevels.filter((l) => completedSet.has(l.id)).length;
          const unitProgress = Math.round((unitCompletedCount / unitLevels.length) * 100);

          return (
            <div key={unit.id} className="w-full max-w-xl space-y-8">
              
              {/* Unit Header Card */}
              <div className={`${unit.color} rounded-3xl p-6 text-white shadow-sm border-b-4 ${unit.borderColor} flex items-center justify-between gap-4`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full">
                      {unit.title}
                    </span>
                    <span className="text-xs font-bold opacity-90">{unitProgress}% Complete</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {unit.subtitle}
                  </h3>
                </div>

                <button
                  onClick={() => setShowGuidebook(true)}
                  className="px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1 flex-shrink-0 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">menu_book</span>
                  <span>Review</span>
                </button>
              </div>

              {/* Gateway Banner after Level 10 */}
              {unit.id === 2 && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 text-purple-950 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-duo-purple">lock_open</span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-purple-800 block">
                        Gateway Milestone Unlocked
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Entering Real Quantum Computing: Qubits, Statevectors & Gates
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical Winding Path for this Unit */}
              <div className="relative flex flex-col items-center space-y-12 py-4">
                {unitLevels.map((level, index) => {
                  const status = getLevelStatus(level.id);
                  const stars = levelStars[level.id] || 0;
                  const offsets = [0, 65, -65, 65, -65, 0];
                  const offsetX = offsets[index % offsets.length];
                  const isCurrent = status === 'unlocked';

                  return (
                    <div
                      key={level.id}
                      className="flex flex-col items-center relative transition-transform duration-300"
                      style={{ transform: `translateX(${offsetX}px)` }}
                    >
                      {isCurrent && (
                        <div className="absolute -inset-2 rounded-full border-4 border-duo-green animate-pulse-ring pointer-events-none" />
                      )}

                      {/* 3D Circular Level Node Button */}
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
                            <span className="material-symbols-outlined text-3xl font-black">{level.icon}</span>
                          ) : (
                            <span className="material-symbols-outlined text-2xl font-bold">lock</span>
                          )}
                        </button>

                        {/* Star Rating Badge */}
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

                      {/* Level Title Label */}
                      <div className="mt-3 text-center max-w-[150px]">
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
        
        {/* Progress Overview Card */}
        <div className="duo-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-duo-green text-xl">analytics</span>
              <span>Course Progress</span>
            </h4>
            <span className="text-xs font-black text-duo-green">{Math.round((totalDone / 56) * 100)}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Levels Completed</span>
              <span className="font-mono">{totalDone} / 56</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-duo-green rounded-full transition-all duration-500"
                style={{ width: `${(totalDone / 56) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate('/syllabus')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            View Full Course Syllabus ➔
          </button>
        </div>

        {/* Daily Quests Widget */}
        <div className="duo-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-duo-amber text-xl">flag</span>
              <span>Daily Quests</span>
            </h4>
            <span className="text-xs font-bold text-slate-400">12h left</span>
          </div>

          <div className="space-y-3">
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

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Complete 1 Quantum Level</span>
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

        {/* AI Tutor Callout Widget */}
        <div className="duo-card p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 space-y-3">
          <div className="flex items-center gap-2 text-purple-950 font-black text-sm">
            <span className="material-symbols-outlined text-duo-purple">smart_toy</span>
            <span>Quantum AI Tutor</span>
          </div>
          <p className="text-xs text-purple-800 leading-relaxed font-medium">
            Have questions about amplitudes, Bell pairs, or Grover's algorithm? Ask your AI tutor anytime.
          </p>
          <button
            onClick={() => setShowAITutor(true)}
            className="w-full btn-duo btn-duo-purple py-2.5 text-xs uppercase tracking-wider"
          >
            Ask AI Tutor
          </button>
        </div>
      </div>

      {/* Modals */}
      {showGuidebook && (
        <GuidebookModal
          onClose={() => setShowGuidebook(false)}
          onSelectLevel={(lvl) => {
            setShowGuidebook(false);
            navigate(`/level/${lvl.id}`);
          }}
        />
      )}

      {showAITutor && (
        <AITutorModal
          currentLevelId={currentActiveLevel.id}
          onClose={() => setShowAITutor(false)}
        />
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
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {selectedLevel.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                Complete Level {selectedLevel.id - 1} to unlock this quantum lesson, or enable 'Explore Mode' in the Guidebook!
              </p>
            </div>
            <button
              onClick={() => setSelectedLevel(null)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
