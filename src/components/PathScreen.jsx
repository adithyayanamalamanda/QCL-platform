import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Play, Check, Star, Atom, Zap, GitBranch, Network, Activity, Sparkles, ChevronRight, Award } from 'lucide-react';
import { LEVELS_CONFIG } from '../data/levelsData';
import TopBar from './TopBar';
import Mascot from './Mascot';

const ICON_MAP = {
  Atom: Atom,
  Zap: Zap,
  GitBranch: GitBranch,
  Network: Network,
  Activity: Activity,
  Sparkles: Sparkles
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

  useEffect(() => {
    const updateStats = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) setStats(JSON.parse(saved));
    };
    window.addEventListener('stats-updated', updateStats);
    return () => window.removeEventListener('stats-updated', updateStats);
  }, []);

  const completedSet = new Set(stats.completedLevels || []);
  const levelStars = stats.levelStars || {};

  // Determine status for each level
  // Level 1 is always unlocked. Next level unlocks when previous is completed.
  const getLevelStatus = (levelId) => {
    if (completedSet.has(levelId)) return 'completed';
    if (levelId === 1 || completedSet.has(levelId - 1)) return 'unlocked';
    return 'locked';
  };

  // Find currently active unlocked level for mascot placement
  const currentUnlockedLevel =
    LEVELS_CONFIG.find((l) => getLevelStatus(l.id) === 'unlocked') || LEVELS_CONFIG[0];

  const handleNodeClick = (level) => {
    const status = getLevelStatus(level.id);
    if (status === 'locked') {
      setSelectedLevel(level);
    } else {
      navigate(`/level/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <TopBar currentLevel={currentUnlockedLevel.id} totalLevels={LEVELS_CONFIG.length} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* Course Banner */}
        <div className="w-full max-w-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-xl mb-12 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Module 1: Foundations to Algorithms
            </span>
            <h2 className="text-2xl font-extrabold text-white">
              Quantum Computing Quest
            </h2>
            <p className="text-xs text-slate-300">
              Interactive visual simulations & Duolingo-style quizzes
            </p>
          </div>

          <div className="hidden sm:block">
            <Mascot mood="happy" size="md" />
          </div>
        </div>

        {/* Winding Duolingo Path */}
        <div className="relative flex flex-col items-center w-full max-w-lg pb-24">
          
          {/* Connecting SVG Dotted Winding Line */}
          <svg
            className="absolute top-10 left-0 w-full h-[950px] pointer-events-none z-0"
            viewBox="0 0 400 950"
            fill="none"
          >
            <path
              d="M 200 40 Q 310 130, 290 200 T 110 360 T 290 520 T 110 680 T 200 840"
              stroke="#334155"
              strokeWidth="6"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
          </svg>

          {/* Level Nodes on Path */}
          <div className="relative z-10 w-full flex flex-col items-center space-y-16">
            {LEVELS_CONFIG.map((level, index) => {
              const status = getLevelStatus(level.id);
              const stars = levelStars[level.id] || 0;
              const IconComp = ICON_MAP[level.icon] || Atom;

              // Alternating sine curve horizontal offset: [0, 90, -90, 90, -90, 0]
              const offsets = [0, 85, -85, 85, -85, 0];
              const offsetX = offsets[index % offsets.length];

              const isCurrent = status === 'unlocked';

              return (
                <div
                  key={level.id}
                  className="flex flex-col items-center relative transition-transform duration-300"
                  style={{ transform: `translateX(${offsetX}px)` }}
                >
                  {/* Mascot positioned next to currently unlocked active level */}
                  {isCurrent && (
                    <div className="absolute -left-36 -top-4 hidden sm:block pointer-events-none animate-fadeIn">
                      <Mascot mood="explaining" message={`Start Level ${level.id}!`} size="sm" />
                    </div>
                  )}

                  {/* Level Node Button */}
                  <div className="relative group">
                    <button
                      onClick={() => handleNodeClick(level)}
                      aria-label={`Level ${level.id}: ${level.title}`}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-xl border-4 select-none ${
                        status === 'completed'
                          ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 border-emerald-400 shadow-emerald-500/30 hover:scale-105'
                          : status === 'unlocked'
                          ? 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 border-purple-300 shadow-purple-500/50 animate-pulse-glow hover:scale-110'
                          : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-75'
                      }`}
                    >
                      {status === 'completed' ? (
                        <Check className="w-9 h-9 text-white stroke-[3]" />
                      ) : status === 'unlocked' ? (
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      ) : (
                        <Lock className="w-7 h-7 text-slate-500" />
                      )}

                      {/* Small Module/Qubit Icon Badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {/* Star Rating Badge underneath completed node */}
                    {status === 'completed' && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-slate-950 px-2 py-0.5 rounded-full border border-amber-500/40 shadow-sm">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Level Label */}
                  <div className="mt-3 text-center max-w-[150px]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Level {level.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-white leading-tight">
                      {level.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Locked Node Modal / Info */}
        {selectedLevel && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Level {selectedLevel.id} Locked
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedLevel.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  Complete Level {selectedLevel.id - 1} to unlock this quantum lesson!
                </p>
              </div>
              <button
                onClick={() => setSelectedLevel(null)}
                className="w-full py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
