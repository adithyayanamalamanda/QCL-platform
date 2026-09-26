import { useState, useEffect } from 'react';

const ACHIEVEMENTS_LIST = [
  { id: 'first_qubit', title: 'Superposition Pioneer', desc: 'Prepared first equal superposition state |+⟩', icon: 'science', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'gate_master', title: 'Gate Matrix Wizard', desc: 'Applied 25+ quantum unitary operations', icon: 'bolt', color: 'bg-sky-100 text-sky-700 border-sky-300' },
  { id: 'bell_entangled', title: 'Spooky Action Master', desc: 'Created an entangled 2-qubit Bell Pair', icon: 'all_inclusive', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 'grover_oracle', title: 'Grover Search Architect', desc: 'Executed 2-qubit quantum amplitude amplification', icon: 'auto_awesome', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'streak_champ', title: '7-Day Quantum Streak', desc: 'Logged on 7 consecutive days for quantum training', icon: 'local_fire_department', color: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'certified_dev', title: 'Qiskit Certified Scholar', desc: 'Passed an official QuantumQuest certification exam', icon: 'verified', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
];

export default function Profile() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved
      ? JSON.parse(saved)
      : { xp: 0, streak: 3, hearts: 5, completedLevels: [], certs: [] };
  });

  useEffect(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    if (saved) setStats(JSON.parse(saved));
  }, []);

  const completedCount = stats.completedLevels ? stats.completedLevels.length : 0;
  const certsCount = stats.certs ? stats.certs.length : 0;

  const resetAllProgress = () => {
    if (window.confirm('Reset all QuantumQuest progress? (This will clear XP, streak, and unlocked levels)')) {
      const reset = { xp: 0, streak: 1, hearts: 5, completedLevels: [], levelStars: {}, certs: [] };
      localStorage.setItem('quantumQuestStats', JSON.stringify(reset));
      setStats(reset);
      window.dispatchEvent(new Event('stats-updated'));
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-3xl bg-duo-green text-white flex items-center justify-center font-black text-4xl shadow-md border-4 border-duo-greenDark">
            Q
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Quantum Developer
            </h2>
            <p className="text-xs font-bold text-slate-500 font-mono">
              @quantum_dev • Gold League Contender
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
                IBM Qiskit Explorer
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-extrabold uppercase tracking-wide">
                Joined Sept 2026
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={resetAllProgress}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-2 border-slate-200 hover:border-rose-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">restart_alt</span>
          <span>Reset Data</span>
        </button>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-amber font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">local_fire_department</span>
            <span>Day Streak</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.streak || 0}</div>
          <div className="text-[11px] text-slate-500 font-medium">Days active</div>
        </div>

        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-blue font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span>Total XP</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.xp || 0}</div>
          <div className="text-[11px] text-slate-500 font-medium">Points earned</div>
        </div>

        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-green font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">school</span>
            <span>Lessons</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{completedCount} / 6</div>
          <div className="text-[11px] text-slate-500 font-medium">Modules completed</div>
        </div>

        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-purple font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span>Certs</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{certsCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">Exams passed</div>
        </div>
      </div>

      {/* Verified Certification Credentials */}
      {certsCount > 0 && (
        <div className="duo-card p-6 space-y-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-duo-purple text-2xl">verified</span>
            <h3 className="font-extrabold text-lg text-purple-950">Verified Quantum Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats.certs.map((code) => (
              <div key={code} className="p-4 rounded-2xl bg-white border-2 border-purple-200 flex items-center gap-3 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-purple-100 text-duo-purple flex items-center justify-center font-bold font-mono text-xs">
                  {code}
                </span>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">Verified Certificate</span>
                  <span className="text-xs text-slate-500 font-medium">Score: 80%+ Achieved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Badges Showcase */}
      <div className="duo-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-duo-amber text-2xl">emoji_events</span>
            <span>Quantum Explorer Badges</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">6 Available Badges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_LIST.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-start gap-3.5"
            >
              <div className={`w-12 h-12 rounded-2xl ${ach.color} border-2 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className="material-symbols-outlined text-2xl">{ach.icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm text-slate-900">{ach.title}</h4>
                <p className="text-xs text-slate-500 leading-snug font-medium">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
