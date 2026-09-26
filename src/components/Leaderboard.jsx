import { useState, useEffect } from 'react';

const LEAGUES = [
  { id: 'bronze', name: 'Bronze League', icon: 'military_tech', color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-300' },
  { id: 'silver', name: 'Silver League', icon: 'military_tech', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' },
  { id: 'gold', name: 'Gold League', icon: 'military_tech', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 'sapphire', name: 'Sapphire League', icon: 'military_tech', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'ruby', name: 'Ruby League', icon: 'military_tech', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  { id: 'diamond', name: 'Diamond League', icon: 'diamond', color: 'text-cyan-500', bg: 'bg-cyan-50', border: 'border-cyan-200' },
];

export default function Leaderboard() {
  const [selectedLeague, setSelectedLeague] = useState('gold');
  const [userXp, setUserXp] = useState(120);

  useEffect(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    if (saved) {
      const stats = JSON.parse(saved);
      if (stats.xp !== undefined) setUserXp(stats.xp);
    }
  }, []);

  const leaderboardEntries = [
    { rank: 1, name: 'Alice Chen', tag: '@alice_q', xp: 840, avatar: 'A', bg: 'bg-purple-500', badge: 'Diamond Master' },
    { rank: 2, name: 'David Kumar', tag: '@dkumar_qiskit', xp: 720, avatar: 'D', bg: 'bg-sky-500', badge: 'Circuit Wizard' },
    { rank: 3, name: 'Elena Rostova', tag: '@elena_qc', xp: 650, avatar: 'E', bg: 'bg-emerald-500', badge: 'Bell Specialist' },
    { rank: 4, name: 'You (Quantum Dev)', tag: '@quantum_dev', xp: Math.max(userXp, 480), avatar: 'U', bg: 'bg-duo-green', isUser: true },
    { rank: 5, name: 'Liam O\'Connor', tag: '@liam_algorithms', xp: 420, avatar: 'L', bg: 'bg-amber-500' },
    { rank: 6, name: 'Sofia Martinez', tag: '@sofia_spin', xp: 390, avatar: 'S', bg: 'bg-indigo-500' },
    { rank: 7, name: 'Marcus Vance', tag: '@marcus_vqe', xp: 310, avatar: 'M', bg: 'bg-rose-500' },
    { rank: 8, name: 'Hana Tanaka', tag: '@hana_qft', xp: 260, avatar: 'H', bg: 'bg-teal-500' },
    { rank: 9, name: 'Omar Al-Mansoor', tag: '@omar_qubit', xp: 190, avatar: 'O', bg: 'bg-cyan-600' },
    { rank: 10, name: 'Rachel Green', tag: '@rachel_superposition', xp: 140, avatar: 'R', bg: 'bg-slate-500' },
  ];

  const currentLeagueObj = LEAGUES.find(l => l.id === selectedLeague) || LEAGUES[2];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8 space-y-8">
      
      {/* League Header Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-3xl ${currentLeagueObj.bg} ${currentLeagueObj.border} border-2 flex items-center justify-center ${currentLeagueObj.color} shadow-sm`}>
            <span className="material-symbols-outlined text-4xl">{currentLeagueObj.icon}</span>
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Weekly Competition
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              {currentLeagueObj.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Top 3 advance to Sapphire League • 3 days left
            </p>
          </div>
        </div>

        {/* League Selector Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          {LEAGUES.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLeague(l.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                selectedLeague === l.id
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {l.name.replace(' League', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Promotion / Demotion Info Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-600 text-2xl">arrow_upward</span>
          <div>
            <span className="text-xs font-extrabold text-emerald-800 uppercase block">Promotion Zone</span>
            <span className="text-xs text-emerald-700 font-medium">Top 3 earn the Promotion Trophy & advance</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-rose-600 text-2xl">arrow_downward</span>
          <div>
            <span className="text-xs font-extrabold text-rose-800 uppercase block">Demotion Zone</span>
            <span className="text-xs text-rose-700 font-medium">Bottom 3 drop down next Sunday</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="duo-card divide-y-2 divide-slate-100 overflow-hidden">
        {leaderboardEntries.map((entry) => {
          const isTop3 = entry.rank <= 3;
          return (
            <div
              key={entry.rank}
              className={`flex items-center justify-between p-4 px-6 transition-colors ${
                entry.isUser
                  ? 'bg-emerald-50/80 font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Rank Number */}
                <span
                  className={`w-6 text-center font-black text-base ${
                    entry.rank === 1
                      ? 'text-amber-500'
                      : entry.rank === 2
                      ? 'text-slate-400'
                      : entry.rank === 3
                      ? 'text-amber-700'
                      : 'text-slate-500'
                  }`}
                >
                  {entry.rank}
                </span>

                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-2xl ${entry.bg} text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0`}
                >
                  {entry.avatar}
                </div>

                {/* User Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-extrabold text-sm sm:text-base ${entry.isUser ? 'text-emerald-900' : 'text-slate-900'}`}>
                      {entry.name}
                    </span>
                    {entry.isUser && (
                      <span className="bg-duo-green text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{entry.tag}</span>
                </div>
              </div>

              {/* XP score */}
              <div className="flex items-center gap-1.5 font-black text-slate-900 text-sm sm:text-base">
                <span className="material-symbols-outlined text-duo-blue text-lg">bolt</span>
                <span>{entry.xp} <span className="text-xs text-slate-400 font-bold">XP</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
