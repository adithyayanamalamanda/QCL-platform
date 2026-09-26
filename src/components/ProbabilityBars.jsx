export default function ProbabilityBars({ probabilities = { p0: 100, p1: 0 }, isTwoQubit = false }) {
  if (isTwoQubit) {
    const states = [
      { label: '|00⟩', key: '00', color: 'from-purple-500 to-indigo-600', glow: 'shadow-purple-500/30' },
      { label: '|01⟩', key: '01', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/30' },
      { label: '|10⟩', key: '10', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/30' },
      { label: '|11⟩', key: '11', color: 'from-pink-500 to-rose-500', glow: 'shadow-pink-500/30' },
    ];

    return (
      <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span>2-Qubit Basis States</span>
          <span>Measurement Probability</span>
        </div>

        {states.map(({ label, key, color, glow }) => {
          const prob = probabilities[key] ?? 0;
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="font-bold text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                  {label}
                </span>
                <span className="font-bold text-white tracking-wide">
                  {prob.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${color} ${glow} transition-all duration-500 ease-out`}
                  style={{ width: `${Math.max(2, prob)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const p0 = probabilities.p0 ?? 100;
  const p1 = probabilities.p1 ?? 0;

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
        <span>Measurement Probabilities</span>
        <span>|α|² vs |β|²</span>
      </div>

      {/* State |0> */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/50">
              |0⟩
            </span>
            <span className="text-xs text-slate-400">Ground State</span>
          </div>
          <span className="font-bold text-purple-300 font-mono text-base">
            {p0.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 shadow-lg shadow-purple-500/40 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(2, p0)}%` }}
          />
        </div>
      </div>

      {/* State |1> */}
      <div className="space-y-1 pt-1">
        <div className="flex justify-between items-center text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/50">
              |1⟩
            </span>
            <span className="text-xs text-slate-400">Excited State</span>
          </div>
          <span className="font-bold text-cyan-300 font-mono text-base">
            {p1.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-400 shadow-lg shadow-cyan-500/40 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(2, p1)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
