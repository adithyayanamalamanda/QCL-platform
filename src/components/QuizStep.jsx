import { useState } from 'react';

export default function QuizStep({ quiz, onAnswer, disabled = false }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (index) => {
    if (disabled) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || disabled) return;
    const isCorrect = selectedIndex === quiz.correctIndex;
    onAnswer(isCorrect, selectedIndex);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Header Card */}
      <div className="duo-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-extrabold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">quiz</span>
            <span>Concept Check (+10 XP)</span>
          </div>

          {quiz.mascotTip && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          {quiz.question}
        </h3>

        {/* Realistic Callout Hint */}
        {showHint && quiz.mascotTip && (
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-start gap-3 animate-fadeIn">
            <span className="material-symbols-outlined text-duo-amber text-2xl flex-shrink-0">lightbulb</span>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">Quantum Insight:</strong>
              {quiz.mascotTip}
            </p>
          </div>
        )}
      </div>

      {/* Multiple Choice Options List */}
      <div className="space-y-3">
        {quiz.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between gap-4 border-2 border-b-4 ${
                isSelected
                  ? 'bg-duo-blueLight border-duo-blue border-b-duo-blueDark text-duo-blueDark shadow-sm'
                  : 'bg-white border-slate-200 border-b-slate-300 text-slate-700 hover:bg-slate-50'
              } ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer active:translate-y-0.5'}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                    isSelected
                      ? 'bg-duo-blue text-white'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>

              {isSelected && (
                <span className="material-symbols-outlined text-duo-blue text-2xl flex-shrink-0">
                  check_circle
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Action Button */}
      {!disabled && selectedIndex !== null && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            className="btn-duo btn-duo-green px-8 py-3.5 text-sm uppercase tracking-wider"
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}
