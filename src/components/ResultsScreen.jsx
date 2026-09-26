import Confetti from './Confetti';

export default function ResultsScreen({
  level,
  mistakes = 0,
  xpEarned = 35,
  onContinue,
  onRetry
}) {
  const starsCount = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <div className="w-full max-w-lg mx-auto py-6 px-4 animate-fadeIn">
      <Confetti active={true} duration={3500} />

      <div className="duo-card p-8 text-center space-y-6">
        
        {/* Verification Icon Badge */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-duo-green flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-5xl">verified</span>
        </div>

        {/* Level Complete Heading */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-duo-green block">
            Level {level.id} Completed!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {level.title}
          </h2>
        </div>

        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-3 py-2">
          {[1, 2, 3].map((starIndex) => {
            const isEarned = starIndex <= starsCount;
            return (
              <div
                key={starIndex}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  isEarned
                    ? 'bg-amber-50 border-amber-300 text-amber-400 shadow-sm scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">star</span>
              </div>
            );
          })}
        </div>

        {/* Accuracy and XP Box */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 mb-1">XP Earned</span>
            <div className="flex items-center gap-1 text-duo-blue font-black text-2xl">
              <span className="material-symbols-outlined text-2xl">bolt</span>
              <span>+{xpEarned}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 mb-1">Accuracy</span>
            <div className="flex items-center gap-1 text-duo-green font-black text-2xl">
              <span className="material-symbols-outlined text-2xl">verified</span>
              <span>{mistakes === 0 ? '100%' : `${Math.max(50, 100 - mistakes * 25)}%`}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={onContinue}
            className="w-full btn-duo btn-duo-green py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Continue Quest</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>

          <button
            onClick={onRetry}
            className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">replay</span>
            <span>Review Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
}
