import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS_CONFIG } from '../data/levelsData';
import SimulatorStep from './SimulatorStep';
import QuizStep from './QuizStep';
import ResultsScreen from './ResultsScreen';

export default function LessonScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const levelId = parseInt(id) || 1;
  const level = LEVELS_CONFIG.find((l) => l.id === levelId) || LEVELS_CONFIG[0];

  const [currentStep, setCurrentStep] = useState('overview'); // 'overview' | 'simulator' | 'quiz' | 'results'
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);

  const getStats = () => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, completedLevels: [] };
  };

  const stepNumber = currentStep === 'overview' ? 1 : currentStep === 'simulator' ? 2 : 3;
  const stepProgress = Math.round((stepNumber / 3) * 100);

  const handleQuizAnswer = (isCorrect) => {
    const stats = getStats();

    if (isCorrect) {
      stats.xp = (stats.xp || 0) + 10;
      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));

      setFeedback({
        isCorrect: true,
        title: 'Nicely done!',
        explanation: level.quiz.explanation
      });
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      const remainingHearts = Math.max(0, (stats.hearts || 5) - 1);
      stats.hearts = remainingHearts;
      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));

      if (remainingHearts === 0) {
        setIsOutOfHearts(true);
      }

      setFeedback({
        isCorrect: false,
        title: 'Incorrect',
        explanation: level.quiz.explanation
      });
    }
  };

  const handleContinueAfterFeedback = () => {
    if (feedback?.isCorrect) {
      const stats = getStats();
      stats.xp = (stats.xp || 0) + 25;
      
      const completed = new Set(stats.completedLevels || []);
      completed.add(level.id);
      stats.completedLevels = Array.from(completed);

      const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
      const starsMap = stats.levelStars || {};
      starsMap[level.id] = Math.max(starsMap[level.id] || 0, stars);
      stats.levelStars = starsMap;

      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));

      setFeedback(null);
      setCurrentStep('results');
    } else {
      setFeedback(null);
    }
  };

  const refillHeartsAndRetry = () => {
    const stats = getStats();
    stats.hearts = 5;
    localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
    window.dispatchEvent(new Event('stats-updated'));
    setIsOutOfHearts(false);
    setFeedback(null);
    setMistakes(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between pb-24 select-none">
      
      {/* Top Header & Progress Bar */}
      <div className="w-full bg-white border-b-2 border-slate-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
            title="Exit Lesson"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Smooth Duolingo Progress Bar */}
          <div className="flex-1 max-w-lg flex items-center gap-3">
            <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
              <div
                className="h-full bg-duo-green rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentStep === 'results' ? 100 : stepProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {currentStep === 'results' ? 'Done' : `${stepNumber}/3`}
            </span>
          </div>

          {/* Level Badge */}
          <div className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Level {level.id}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* STEP 1: REALISTIC OVERVIEW CARD */}
        {currentStep === 'overview' && (
          <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="duo-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">school</span>
                  <span>{level.overview.tag}</span>
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {level.module}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {level.overview.heading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {level.overview.description}
                </p>
              </div>

              {/* Realistic Key Insight Callout */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-start gap-3">
                <span className="material-symbols-outlined text-duo-blue text-2xl flex-shrink-0">lightbulb</span>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong className="text-slate-900 block mb-0.5">Core Engineering Takeaway:</strong>
                  {level.overview.takeaway}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('simulator')}
                className="w-full btn-duo btn-duo-green py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Continue to Simulator</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SIMULATOR STEP */}
        {currentStep === 'simulator' && (
          <SimulatorStep
            level={level}
            onComplete={() => setCurrentStep('quiz')}
          />
        )}

        {/* STEP 3: QUIZ STEP */}
        {currentStep === 'quiz' && (
          <QuizStep
            quiz={level.quiz}
            onAnswer={handleQuizAnswer}
            disabled={feedback !== null}
          />
        )}

        {/* STEP 4: RESULTS SCREEN */}
        {currentStep === 'results' && (
          <ResultsScreen
            level={level}
            mistakes={mistakes}
            xpEarned={level.xpReward}
            onContinue={() => navigate('/')}
            onRetry={() => {
              setCurrentStep('overview');
              setMistakes(0);
              setFeedback(null);
            }}
          />
        )}
      </div>

      {/* OUT OF HEARTS MODAL */}
      {isOutOfHearts && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 border-2 border-rose-200 text-duo-rose flex items-center justify-center mx-auto text-3xl">
              <span className="material-symbols-outlined text-4xl">favorite_border</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Out of Hearts!</h3>
              <p className="text-xs text-slate-600 font-medium">
                Quantum computing takes practice! Refill your hearts to retry this challenge with fresh attempts.
              </p>
            </div>

            <button
              onClick={refillHeartsAndRetry}
              className="w-full btn-duo py-3.5 bg-duo-rose border-duo-roseDark text-white text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>Refill 5 Hearts & Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* DUOLINGO-STYLE FEEDBACK FOOTER BANNER */}
      {feedback && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 border-t-2 shadow-xl transition-all duration-300 animate-slideUp ${
            feedback.isCorrect
              ? 'bg-duo-greenLight border-emerald-300 text-emerald-950'
              : 'bg-duo-roseLight border-rose-300 text-rose-950'
          }`}
        >
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  feedback.isCorrect ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {feedback.isCorrect ? 'check_circle' : 'cancel'}
                </span>
              </div>

              <div>
                <h4 className="font-black text-lg sm:text-xl">
                  {feedback.title}
                </h4>
                <p className="text-xs sm:text-sm font-medium opacity-90 max-w-xl">
                  {feedback.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleContinueAfterFeedback}
              className={`px-8 py-3.5 rounded-2xl font-extrabold text-white text-sm uppercase tracking-wider shadow-sm flex-shrink-0 active:scale-95 transition-all ${
                feedback.isCorrect
                  ? 'bg-duo-green hover:bg-[#61e002] border-b-4 border-duo-greenDark'
                  : 'bg-duo-rose hover:bg-[#ea2b2b] border-b-4 border-duo-roseDark'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
