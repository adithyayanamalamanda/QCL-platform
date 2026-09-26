import { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import Mascot from './Mascot';

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
      {/* Quiz Header & Question Card */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-bold tracking-wide uppercase">
            <HelpCircle className="w-4 h-4" />
            Knowledge Check (+10 XP)
          </div>

          {quiz.mascotTip && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/40 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-4">
          {quiz.question}
        </h3>

        {/* Mascot Hint Callout */}
        {showHint && quiz.mascotTip && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 animate-fadeIn">
            <Mascot mood="thinking" message={quiz.mascotTip} size="sm" />
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
              className={`w-full text-left p-4 sm:p-5 rounded-2xl font-medium text-base sm:text-lg transition-all duration-200 flex items-center justify-between gap-4 border-2 ${
                isSelected
                  ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg shadow-purple-500/20 scale-[1.01]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
              } ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                    isSelected
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Action */}
      {!disabled && selectedIndex !== null && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            className="px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 shadow-lg shadow-purple-600/30 transition-all text-lg"
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}
