import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen, Cpu, HelpCircle, Heart, RefreshCw } from 'lucide-react';
import { LEVELS_CONFIG } from '../data/levelsData';
import SimulatorStep from './SimulatorStep';
import QuizStep from './QuizStep';
import ResultsScreen from './ResultsScreen';
import Mascot from './Mascot';

export default function LessonScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const levelId = parseInt(id) || 1;
  const level = LEVELS_CONFIG.find((l) => l.id === levelId) || LEVELS_CONFIG[0];

  // Steps: 'overview' (1) -> 'simulator' (2) -> 'quiz' (3) -> 'results' (4)
  const [currentStep, setCurrentStep] = useState('overview');
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | { isCorrect: boolean, explanation: string }
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);

  // Read hearts & stats
  const getStats = () => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, completedLevels: [] };
  };

  // Step indicator calculations (1 to 3)
  const stepNumber = currentStep === 'overview' ? 1 : currentStep === 'simulator' ? 2 : 3;
  const stepProgress = Math.round((stepNumber / 3) * 100);

  // Handle quiz answer
  const handleQuizAnswer = (isCorrect) => {
    const stats = getStats();

    if (isCorrect) {
      // +10 XP for correct answer
      stats.xp = (stats.xp || 0) + 10;
      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));

      setFeedback({
        isCorrect: true,
        title: 'Awesome! That is correct!',
        explanation: level.quiz.explanation,
        xpBonus: 10
      });
    } else {
      // Mistake: deduct 1 heart
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
        title: 'Not quite...',
        explanation: level.quiz.explanation
      });
    }
  };

  // Move from feedback to next screen
  const handleContinueAfterFeedback = () => {
    if (feedback?.isCorrect) {
      // Level completion bonus (+25 XP)
      const stats = getStats();
      stats.xp = (stats.xp || 0) + 25;
      
      // Update completed levels
      const completed = new Set(stats.completedLevels || []);
      completed.add(level.id);
      stats.completedLevels = Array.from(completed);

      // Save star rating
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
      // Let user retry quiz
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between pb-28">
      {/* Top Navigation & Step Progress Bar */}
      <div className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors p-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Exit Lesson</span>
          </button>

          {/* Duolingo Step Progress Bar */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <div className="flex-1 h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentStep === 'results' ? 100 : stepProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {currentStep === 'results' ? 'Done' : `${stepNumber}/3`}
            </span>
          </div>

          {/* Level Badge */}
          <div className="text-xs font-bold font-mono text-purple-400 bg-purple-950/60 px-3 py-1.5 rounded-full border border-purple-800/50">
            Level {level.id}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* STEP 1: EXPLANATION / OVERVIEW CARD */}
        {currentStep === 'overview' && (
          <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  {level.overview.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {level.module}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {level.overview.heading}
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {level.overview.description}
                </p>
              </div>

              {/* Animated Interactive Card / Concept Visual */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
                <Mascot mood="explaining" size="sm" />
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  <span className="font-bold text-cyan-400 block mb-0.5">Key Insight:</span>
                  {level.overview.takeaway}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('simulator')}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 active:scale-95 shadow-xl shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Simulator</span>
                <Cpu className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INTERACTIVE QUANTUM SIMULATOR */}
        {currentStep === 'simulator' && (
          <SimulatorStep
            level={level}
            onComplete={() => setCurrentStep('quiz')}
          />
        )}

        {/* STEP 3: QUIZ QUESTION STEP */}
        {currentStep === 'quiz' && (
          <QuizStep
            quiz={level.quiz}
            onAnswer={handleQuizAnswer}
            disabled={feedback !== null}
          />
        )}

        {/* STEP 4: FINAL RESULTS SCREEN */}
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
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <Mascot mood="sad" size="lg" />
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Out of Hearts!</h3>
              <p className="text-sm text-slate-300">
                Quantum computing takes practice! Refill your hearts to try this challenge again.
              </p>
            </div>

            <button
              onClick={refillHeartsAndRetry}
              className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 active:scale-95 shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refill 5 Hearts & Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* DUOLINGO-STYLE IMMEDIATE FEEDBACK FOOTER BANNER */}
      {feedback && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 border-t-2 shadow-2xl transition-all duration-300 animate-slideUp ${
            feedback.isCorrect
              ? 'bg-slate-950/95 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-950/95 border-rose-500/80 text-rose-300'
          }`}
        >
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  feedback.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <XCircle className="w-7 h-7" />
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-lg sm:text-xl text-white">
                  {feedback.title}
                </h4>
                <p className="text-sm text-slate-300 max-w-xl">
                  {feedback.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleContinueAfterFeedback}
              className={`px-8 py-3.5 rounded-2xl font-extrabold text-white active:scale-95 transition-all text-base shadow-lg ${
                feedback.isCorrect
                  ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
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
