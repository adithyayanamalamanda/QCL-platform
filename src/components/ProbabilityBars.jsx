export default function ProbabilityBars({ probabilities = { p0: 100, p1: 0 }, isTwoQubit = false }) {
  if (isTwoQubit) {
    const states = [
      { label: '|00⟩', key: '00', color: 'bg-duo-purple', text: 'text-purple-700', bgBadge: 'bg-purple-50 border-purple-200' },
      { label: '|01⟩', key: '01', color: 'bg-duo-blue', text: 'text-sky-700', bgBadge: 'bg-sky-50 border-sky-200' },
      { label: '|10⟩', key: '10', color: 'bg-duo-green', text: 'text-emerald-700', bgBadge: 'bg-emerald-50 border-emerald-200' },
      { label: '|11⟩', key: '11', color: 'bg-duo-rose', text: 'text-rose-700', bgBadge: 'bg-rose-50 border-rose-200' },
    ];

    return (
      <div className="w-full bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          <span>2-Qubit State Probabilities</span>
          <span>|Amplitudes|²</span>
        </div>

        {states.map(({ label, key, color, text, bgBadge }) => {
          const prob = probabilities[key] ?? 0;
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className={`font-bold ${text} ${bgBadge} px-2 py-0.5 rounded-lg border`}>
                  {label}
                </span>
                <span className="font-extrabold text-slate-900 font-sans">
                  {prob.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
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
    <div className="w-full bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm space-y-3">
      <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
        <span>Measurement Probabilities</span>
        <span>Born Rule (|α|² vs |β|²)</span>
      </div>

      {/* State |0> */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
              |0⟩
            </span>
            <span className="text-slate-500 text-[11px]">Ground State</span>
          </div>
          <span className="font-extrabold text-slate-900 font-sans text-sm">
            {p0.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full rounded-full bg-duo-purple transition-all duration-500 ease-out"
            style={{ width: `${Math.max(2, p0)}%` }}
          />
        </div>
      </div>

      {/* State |1> */}
      <div className="space-y-1 pt-1">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
              |1⟩
            </span>
            <span className="text-slate-500 text-[11px]">Excited State</span>
          </div>
          <span className="font-extrabold text-slate-900 font-sans text-sm">
            {p1.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full rounded-full bg-duo-blue transition-all duration-500 ease-out"
            style={{ width: `${Math.max(2, p1)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
