import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS_56_DATA } from '../data/curriculum56';
import { getAdaptiveQuestionsForLevel } from '../data/questionBank56';
import SimulatorStep from './SimulatorStep';
import Confetti from './Confetti';

export default function LessonScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const levelId = parseInt(id) || 1;
  const level = LEVELS_56_DATA.find((l) => l.id === levelId) || LEVELS_56_DATA[0];

  // Flow: 'overview' ➔ 'simulator' ➔ 'quiz' ➔ 'results'
  const [phase, setPhase] = useState('overview');
  
  // 10 Adaptive Questions for this session
  const [questions, setQuestions] = useState(() => getAdaptiveQuestionsForLevel(levelId));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null); // null | { isCorrect, explanation }
  const [score, setScore] = useState({ correct: 0, total: 10 });
  const [mistakes, setMistakes] = useState(0);
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);

  useEffect(() => {
    setQuestions(getAdaptiveQuestionsForLevel(levelId));
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setFeedback(null);
    setPhase('overview');
    setMistakes(0);
  }, [levelId]);

  const getStats = () => {
    const saved = localStorage.getItem('quantumQuestStats');
    return saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, completedLevels: [] };
  };

  const handleSelectOption = (optIdx) => {
    if (feedback !== null) return;
    const currentQ = questions[currentQuestionIdx];
    const isCorrect = optIdx === currentQ.ans;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: optIdx });

    const stats = getStats();

    if (isCorrect) {
      stats.xp = (stats.xp || 0) + 10;
      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));

      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({
        isCorrect: true,
        title: "Nicely done! That is correct.",
        explanation: currentQ.explanation || "Correct! You identified the true quantum mechanical principle."
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
        title: "Incorrect",
        explanation: currentQ.explanation || "Let's review the fundamental quantum principle behind this concept."
      });
    }
  };

  const handleContinueAfterFeedback = () => {
    setFeedback(null);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Quiz Finished ➔ Calculate Final Stars & Completion
      const finalAccuracy = Math.round((score.correct / questions.length) * 100);
      const passed = finalAccuracy >= 50;

      if (passed) {
        const stats = getStats();
        stats.xp = (stats.xp || 0) + 25; // Completion bonus

        const completed = new Set(stats.completedLevels || []);
        completed.add(level.id);
        stats.completedLevels = Array.from(completed);

        const stars = finalAccuracy >= 90 ? 3 : finalAccuracy >= 70 ? 2 : 1;
        const starsMap = stats.levelStars || {};
        starsMap[level.id] = Math.max(starsMap[level.id] || 0, stars);
        stats.levelStars = starsMap;

        localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
        window.dispatchEvent(new Event('stats-updated'));
      }

      setPhase('results');
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

  const accuracyPercent = Math.round((score.correct / Math.max(1, questions.length)) * 100);
  const starsEarned = accuracyPercent >= 90 ? 3 : accuracyPercent >= 70 ? 2 : accuracyPercent >= 50 ? 1 : 0;
  const passed = accuracyPercent >= 50;

  // Simulator step adapter
  const simLevelAdapter = {
    id: level.id <= 6 ? level.id : (level.id % 6) + 1,
    simulator: {
      title: `${level.title} — Simulation Lab`,
      instructions: "Experiment with the quantum state vector, apply gate operators, and verify wave probabilities live.",
      successHint: "Execute unitary rotations and observe the live statevector probabilities!"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between pb-24 select-none">
      
      {/* Top Header & Duolingo Progress Bar */}
      <div className="w-full bg-white border-b-2 border-slate-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
            title="Exit Lesson"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Smooth Progress Bar */}
          <div className="flex-1 max-w-lg flex items-center gap-3">
            <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
              <div
                className="h-full bg-duo-green rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    phase === 'overview'
                      ? '20%'
                      : phase === 'simulator'
                      ? '40%'
                      : phase === 'quiz'
                      ? `${40 + ((currentQuestionIdx + 1) / questions.length) * 55}%`
                      : '100%'
                }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {phase === 'quiz' ? `Q ${currentQuestionIdx + 1}/10` : phase === 'results' ? 'Done' : 'Study'}
            </span>
          </div>

          <div className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Level {level.id}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* STEP 1: CONCEPT OVERVIEW */}
        {phase === 'overview' && (
          <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="duo-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">school</span>
                  <span>{level.tag}</span>
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Level {level.id} of 56
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

              {/* Concepts List */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Concepts in this Module
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {level.concepts.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-start gap-3">
                <span className="material-symbols-outlined text-duo-purple text-2xl flex-shrink-0">lightbulb</span>
                <div className="text-xs text-indigo-950 leading-relaxed font-medium">
                  <strong className="block mb-0.5 text-indigo-900 font-black">Core Takeaway:</strong>
                  {level.overview.takeaway}
                </div>
              </div>

              <button
                onClick={() => setPhase('simulator')}
                className="w-full btn-duo btn-duo-green py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Continue to Simulator Lab</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SIMULATOR STEP */}
        {phase === 'simulator' && (
          <SimulatorStep
            level={simLevelAdapter}
            onComplete={() => setPhase('quiz')}
          />
        )}

        {/* STEP 3: 10-QUESTION ADAPTIVE QUIZ */}
        {phase === 'quiz' && (
          <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="duo-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-extrabold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">quiz</span>
                  <span>Question {currentQuestionIdx + 1} of 10</span>
                </div>
                <span className="text-xs font-black text-duo-blue">{score.correct} / 10 Correct</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {questions[currentQuestionIdx].q}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {questions[currentQuestionIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={feedback !== null}
                      className={`w-full text-left p-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 border-2 border-b-4 ${
                        isSelected
                          ? 'bg-duo-blueLight border-duo-blue border-b-duo-blueDark text-duo-blueDark shadow-sm'
                          : 'bg-white border-slate-200 border-b-slate-300 text-slate-700 hover:bg-slate-50'
                      } ${feedback !== null ? 'cursor-not-allowed opacity-85' : 'cursor-pointer active:translate-y-0.5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${isSelected ? 'bg-duo-blue text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSelected && (
                        <span className="material-symbols-outlined text-duo-blue text-xl flex-shrink-0">
                          check_circle
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FINAL RESULTS & STAR CALCULATION */}
        {phase === 'results' && (
          <div className="w-full max-w-lg mx-auto py-6 px-4 animate-fadeIn">
            {passed && <Confetti active={true} duration={3500} />}

            <div className="duo-card p-8 text-center space-y-6">
              <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-sm border-2 ${
                passed ? 'bg-emerald-50 text-duo-green border-emerald-300' : 'bg-rose-50 text-duo-rose border-rose-300'
              }`}>
                <span className="material-symbols-outlined text-5xl">
                  {passed ? 'verified' : 'refresh'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Level {level.id} {passed ? 'Complete!' : 'Needs Review'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {level.title}
                </h2>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center justify-center gap-3 py-1">
                {[1, 2, 3].map((starIndex) => (
                  <div
                    key={starIndex}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      starIndex <= starsEarned
                        ? 'bg-amber-50 border-amber-300 text-amber-400 shadow-sm scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-300'
                    }`}
                  >
                    <span className="material-symbols-outlined text-4xl">star</span>
                  </div>
                ))}
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block">Accuracy</span>
                  <span className="text-2xl font-black text-duo-green">{accuracyPercent}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block">XP Earned</span>
                  <span className="text-2xl font-black text-duo-blue">+{passed ? level.xpReward : 10}</span>
                </div>
              </div>

              {/* Concepts Mastered */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Concepts Mastered
                </span>
                <div className="space-y-1 text-xs font-bold text-slate-800">
                  {level.concepts.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-duo-green text-base">check_circle</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {passed ? (
                  <button
                    onClick={() => navigate('/')}
                    className="w-full btn-duo btn-duo-green py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Continue Journey</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPhase('overview');
                      setCurrentQuestionIdx(0);
                      setSelectedAnswers({});
                      setScore({ correct: 0, total: 10 });
                      setMistakes(0);
                    }}
                    className="w-full btn-duo btn-duo-purple py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Retry Level (Pass is 50%+)</span>
                    <span className="material-symbols-outlined text-lg">replay</span>
                  </button>
                )}
              </div>
            </div>
          </div>
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
                Quantum concepts take practice! Refill your 5 hearts to continue this session with fresh attempts.
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

      {/* DUOLINGO FEEDBACK FOOTER BANNER */}
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
