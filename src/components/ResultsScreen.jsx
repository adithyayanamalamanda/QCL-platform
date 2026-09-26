import { Star, Trophy, Zap, ArrowRight, RotateCcw } from 'lucide-react';
import Confetti from './Confetti';
import Mascot from './Mascot';

export default function ResultsScreen({
  level,
  mistakes = 0,
  xpEarned = 35,
  onContinue,
  onRetry
}) {
  // Star rating logic: 3 stars = 0 mistakes, 2 = 1-2 mistakes, 1 = 3+ mistakes
  const starsCount = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <div className="w-full max-w-lg mx-auto py-6 px-4 animate-fadeIn">
      <Confetti active={true} duration={4000} />

      <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Background glow banner */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Mascot Celebrating */}
        <div className="flex justify-center pt-2">
          <Mascot mood="celebrating" size="lg" />
        </div>

        {/* Level Complete Heading */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Level {level.id} Complete!
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
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
                className={`relative p-3 rounded-2xl border transition-all duration-500 ${
                  isEarned
                    ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/20 scale-110'
                    : 'bg-slate-950 border-slate-800 opacity-40'
                }`}
                style={{ animationDelay: `${starIndex * 200}ms` }}
              >
                <Star
                  className={`w-9 h-9 ${
                    isEarned
                      ? 'fill-amber-400 text-amber-400 animate-bounce-subtle'
                      : 'text-slate-600'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Feedback Message */}
        <p className="text-sm font-medium text-slate-300">
          {starsCount === 3
            ? 'Flawless performance! You mastered this quantum concept with zero mistakes!'
            : starsCount === 2
            ? 'Great job! You navigated this quantum challenge with flying colors!'
            : 'Good effort! Practice makes quantum intuition perfect!'}
        </p>

        {/* Stats Tally Box */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-400 mb-1">XP Earned</span>
            <div className="flex items-center gap-1.5 text-purple-400 font-extrabold text-2xl">
              <Zap className="w-5 h-5 fill-purple-400" />
              <span>+{xpEarned}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-400 mb-1">Accuracy</span>
            <div className="flex items-center gap-1.5 text-cyan-400 font-extrabold text-2xl">
              <Trophy className="w-5 h-5" />
              <span>{mistakes === 0 ? '100%' : `${Math.max(50, 100 - mistakes * 25)}%`}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl font-extrabold text-lg text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 active:scale-95 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Quest</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onRetry}
            className="w-full py-3 rounded-2xl font-bold text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Level</span>
          </button>
        </div>
      </div>
    </div>
  );
}
