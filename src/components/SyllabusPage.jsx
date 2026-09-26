import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNITS_CONFIG, LEVELS_56_DATA } from '../data/curriculum56';

export default function SyllabusPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved).completedLevels || [] : [];
  });

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem('quantumQuestStats');
      if (saved) setCompletedLevels(JSON.parse(saved).completedLevels || []);
    };
    window.addEventListener('stats-updated', load);
    return () => window.removeEventListener('stats-updated', load);
  }, []);

  const completedSet = new Set(completedLevels);
  const totalCompleted = completedSet.size;
  const overallPercent = Math.round((totalCompleted / 56) * 100);

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">school</span>
            <span>Comprehensive Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            56-Level Quantum Computing Syllabus
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
            10 Units • 56 Interactive Levels • 560 Adaptive Questions • Aligned with IBM Quantum Learning Foundations
          </p>
        </div>

        {/* Global Progress Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center min-w-[180px]">
          <span className="text-xs font-bold text-slate-500 uppercase block">Total Progress</span>
          <span className="text-3xl font-black text-duo-green">{overallPercent}%</span>
          <span className="text-xs text-slate-400 font-bold block">{totalCompleted} / 56 Levels Done</span>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {UNITS_CONFIG.map((unit) => {
          const unitLevels = LEVELS_56_DATA.filter((l) => l.unitId === unit.id);
          const unitCompletedCount = unitLevels.filter((l) => completedSet.has(l.id)).length;
          const unitPercent = Math.round((unitCompletedCount / unitLevels.length) * 100);

          return (
            <div key={unit.id} className="duo-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Unit {unit.unitNumber} • Levels {unit.levelRange[0]}–{unit.levelRange[1]}
                  </span>
                  <h3 className="font-black text-xl text-slate-900">{unit.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-duo-green rounded-full transition-all duration-500"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-700 min-w-[36px]">{unitPercent}%</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {unit.description}
              </p>

              {/* Levels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                {unitLevels.map((lvl) => {
                  const isDone = completedSet.has(lvl.id);
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => navigate(`/level/${lvl.id}`)}
                      className={`p-3 rounded-2xl text-left border-2 flex items-center justify-between transition-all ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isDone ? 'bg-duo-green text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : lvl.id}
                        </span>
                        <span className="text-xs font-bold truncate max-w-[170px]">{lvl.title}</span>
                      </div>

                      <span className="material-symbols-outlined text-slate-400 text-sm">
                        arrow_forward
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
