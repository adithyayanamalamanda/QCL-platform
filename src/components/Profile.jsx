import { useState, useEffect } from 'react';
import CertificateModal from './CertificateModal';

const ACHIEVEMENTS_LIST = [
  { id: 'first_qubit', title: 'Superposition Pioneer', desc: 'Prepared first equal superposition state |+⟩', icon: 'science', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'gate_master', title: 'Gate Matrix Wizard', desc: 'Applied 25+ quantum unitary operations', icon: 'bolt', color: 'bg-sky-100 text-sky-700 border-sky-300' },
  { id: 'bell_entangled', title: 'Spooky Action Master', desc: 'Created an entangled 2-qubit Bell Pair', icon: 'all_inclusive', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 'grover_oracle', title: 'Grover Search Architect', desc: 'Executed 2-qubit quantum amplitude amplification', icon: 'auto_awesome', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'streak_champ', title: '7-Day Quantum Streak', desc: 'Logged on 7 consecutive days for quantum training', icon: 'local_fire_department', color: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'certified_dev', title: 'Qiskit Certified Scholar', desc: 'Passed an official QuantumQuest certification exam', icon: 'verified', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
];

export default function Profile() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('quantumProfileName') || 'ADITHYA';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [showCertModal, setShowCertModal] = useState(false);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved
      ? JSON.parse(saved)
      : { xp: 1240, streak: 5, hearts: 5, completedLevels: [1,2,3,4,5,6], levelStars: {}, certs: ['QFC-101'] };
  });

  useEffect(() => {
    const saved = localStorage.getItem('quantumQuestStats');
    if (saved) setStats(JSON.parse(saved));
    const savedName = localStorage.getItem('quantumProfileName');
    if (savedName) setUserName(savedName);
  }, []);

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    setUserName(nameInput.trim());
    localStorage.setItem('quantumProfileName', nameInput.trim());
    setIsEditingName(false);
  };

  const completedCount = stats.completedLevels ? stats.completedLevels.length : 0;
  const questionsAnswered = completedCount * 10;
  const starsMap = stats.levelStars || {};
  let s3 = 0, s2 = 0, s1 = 0;
  Object.values(starsMap).forEach((st) => {
    if (st === 3) s3++;
    else if (st === 2) s2++;
    else if (st === 1) s1++;
  });

  // Calculate unlocked algorithms based on completed levels
  const unlockedAlgos = [];
  if (completedCount >= 33) unlockedAlgos.push("Deutsch");
  if (completedCount >= 34) unlockedAlgos.push("Deutsch-Jozsa");
  if (completedCount >= 35) unlockedAlgos.push("Bernstein-Vazirani");
  if (completedCount >= 36) unlockedAlgos.push("Simon's Algorithm");
  if (completedCount >= 38) unlockedAlgos.push("Grover's Search");
  if (completedCount >= 42) unlockedAlgos.push("QFT");
  if (completedCount >= 46) unlockedAlgos.push("Shor's Factoring");
  if (completedCount >= 49) unlockedAlgos.push("BB84 QKD");
  if (completedCount >= 51) unlockedAlgos.push("VQE");
  if (completedCount >= 52) unlockedAlgos.push("QAOA");

  const resetAllProgress = () => {
    if (window.confirm('Reset all QuantumQuest progress? (This will clear XP, streak, and unlocked levels)')) {
      const reset = { xp: 0, streak: 1, hearts: 5, completedLevels: [], levelStars: {}, certs: [] };
      localStorage.setItem('quantumQuestStats', JSON.stringify(reset));
      setStats(reset);
      window.dispatchEvent(new Event('stats-updated'));
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar with initial */}
          <div className="w-24 h-24 rounded-3xl bg-duo-green text-white flex items-center justify-center font-black text-4xl shadow-md border-4 border-duo-greenDark">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="p-2 border-2 border-slate-300 rounded-xl font-black text-xl text-slate-900 focus:outline-none focus:border-duo-green"
                />
                <button
                  onClick={handleSaveName}
                  className="btn-duo btn-duo-green px-3 py-2 text-xs uppercase"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                  {userName}
                </h2>
                <button
                  onClick={() => { setIsEditingName(true); setNameInput(userName); }}
                  className="text-slate-400 hover:text-slate-700 p-1"
                  title="Edit Profile Name"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                </button>
              </div>
            )}

            <p className="text-xs font-bold text-slate-500 font-mono">
              Quantum Level {completedCount + 1} • Gold League Contender
            </p>
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
                IBM Qiskit Explorer
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-extrabold uppercase tracking-wide">
                Active Student
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowCertModal(true)}
            className="btn-duo btn-duo-purple px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">workspace_premium</span>
            <span>View Certificate</span>
          </button>

          <button
            onClick={resetAllProgress}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-2 border-slate-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Numerical Stats Dashboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-green font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">school</span>
            <span>Completed</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{completedCount} / 56</div>
          <div className="text-[11px] text-slate-500 font-medium">{Math.round((completedCount/56)*100)}% Course Progress</div>
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
          <div className="flex items-center justify-center sm:justify-start gap-2 text-duo-purple font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">quiz</span>
            <span>Questions</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{questionsAnswered} / 560</div>
          <div className="text-[11px] text-slate-500 font-medium">Practice queries</div>
        </div>

        <div className="duo-card p-5 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">star</span>
            <span>Star Rating</span>
          </div>
          <div className="text-lg font-black text-slate-900 pt-1">
            ⭐⭐⭐ {s3} • ⭐⭐ {s2}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Mastery breakdown</div>
        </div>
      </div>

      {/* Algorithms Unlocked Panel */}
      <div className="duo-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-duo-blue text-2xl">auto_awesome</span>
            <span>Algorithms Unlocked in Curriculum</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">{unlockedAlgos.length} Unlocked</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Deutsch", "Deutsch-Jozsa", "Bernstein-Vazirani", "Simon's Algorithm", "Grover's Search", "QFT", "Shor's Factoring", "BB84 QKD", "VQE", "QAOA"].map((algo, i) => {
            const isUnlocked = unlockedAlgos.includes(algo);
            return (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border-2 ${
                  isUnlocked
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {isUnlocked ? 'check_circle' : 'lock'}
                </span>
                <span>{algo}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="duo-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-duo-amber text-2xl">emoji_events</span>
            <span>Quantum Explorer Badges</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">6 Badges</span>
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

      {/* Certificate Modal */}
      {showCertModal && (
        <CertificateModal
          userName={userName}
          score={88}
          certId={`QCL-2026-${userName.toUpperCase().replace(/\s+/g, '')}-8392`}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
}
