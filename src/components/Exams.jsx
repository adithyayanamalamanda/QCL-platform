import { useState, useEffect } from 'react';
import CertificateModal from './CertificateModal';

const EXAMS_CATALOG = [
  {
    id: 'master-final',
    code: 'QCL-500',
    title: '🎓 Final Quantum Computing Certification Exam',
    description: 'The definitive comprehensive examination covering all 10 Units and 56 Levels. Achieve 70%+ to earn your official verifiable Certificate of Completion.',
    durationMin: 30,
    questionsCount: 15,
    passScore: 70,
    isMasterExam: true,
    badgeName: 'Master Quantum Algorithm Architect',
    questions: [
      { q: "What is the physical representation of the state |+⟩?", options: ["(|0⟩ - |1⟩)/√2", "(|0⟩ + |1⟩)/√2", "|0⟩ + |1⟩", "(1/2)|0⟩ + (1/2)|1⟩"], ans: 1 },
      { q: "According to the Born rule, what is the probability of measuring state |0⟩ from state (3/5)|0⟩ + (4/5)|1⟩?", options: ["60%", "36% ((3/5)² = 9/25)", "48%", "25%"], ans: 1 },
      { q: "Which property guarantees that total probability is strictly conserved across all quantum operations?", options: ["Hermiticity", "Unitary evolution (U†U = I)", "Decoherence", "Linear independence"], ans: 1 },
      { q: "Where is the ground state |0⟩ positioned on the 3D Bloch sphere?", options: ["Equator (+X)", "South Pole (-Z)", "North Pole (+Z)", "Origin (0,0,0)"], ans: 2 },
      { q: "What is the matrix product of applying Hadamard twice in succession (H · H)?", options: ["Pauli-X", "Identity Matrix (I)", "Pauli-Z", "Zero Matrix"], ans: 1 },
      { q: "Applying the Pauli-Z gate to state |+⟩ produces which output state?", options: ["|0⟩", "|1⟩", "|-⟩ = (|0⟩ - |1⟩)/√2", "|i⟩"], ans: 2 },
      { q: "Which 2-gate sequence generates the Bell state (|00⟩ + |11⟩)/√2 from initial state |00⟩?", options: ["X on q0, then X on q1", "H on q0, then CNOT(q0 ➔ q1)", "CNOT(q0 ➔ q1), then H on q1", "H on both qubits"], ans: 1 },
      { q: "What does the No-Cloning theorem prove about arbitrary unknown quantum states?", options: ["They can only be cloned 3 times", "They cannot be cloned perfectly using unitary operations", "They clone automatically upon measurement", "They can be copied if cooled to 0 Kelvin"], ans: 1 },
      { q: "How many queries does the Deutsch-Jozsa algorithm take to check an n-bit constant/balanced function?", options: ["2^(n-1) queries", "n queries", "Exactly 1 query", "O(√N) queries"], ans: 2 },
      { q: "What is the asymptotic speedup of Grover's search algorithm for N unsorted items?", options: ["Exponential O(log N)", "Quadratic O(√N)", "Linear O(N)", "No speedup"], ans: 1 },
      { q: "What operation does the Grover Diffusion operator perform on quantum amplitudes?", options: ["Inversion about the mean (2|s⟩⟨s| - I)", "Random shuffling", "Erasing all phases to 0", "Measuring the register"], ans: 0 },
      { q: "What does the Quantum Fourier Transform (QFT) do to a quantum register in O(n²) gates?", options: ["Maps states to the Fourier phase basis", "Factors prime numbers directly", "Measures all qubits", "Copies the statevector"], ans: 0 },
      { q: "How does Shor's algorithm achieve its exponential speedup over classical integer factorization?", options: ["By solving the period-finding problem in polynomial time O(n³) using QPE/QFT", "By guessing all primes simultaneously", "By classical sieve search", "By reducing numbers to 0"], ans: 0 },
      { q: "In the BB84 quantum key distribution protocol, how is eavesdropping (Eve) detected?", options: ["By an increased Quantum Bit Error Rate (QBER) caused by measurement collapse", "By measuring wire temperatures", "By checking classical IP addresses", "By waiting 10 minutes"], ans: 0 },
      { q: "What is the primary role of the classical optimizer in Variational Quantum Algorithms (VQE/QAOA)?", options: ["Iteratively updating parameterized ansatz angles θ to minimize a cost Hamiltonian energy", "Building the hardware chips", "Measuring the qubits", "Encoding binary files"], ans: 0 }
    ]
  },
  {
    id: 'qfc-101',
    code: 'QFC-101',
    title: 'Quantum Foundations Certification',
    description: 'Verify your mastery of qubits, Dirac bra-ket notation, superposition amplitudes, and the Born rule.',
    durationMin: 10,
    questionsCount: 5,
    passScore: 80,
    badgeName: 'Certified Quantum Foundation Specialist',
    questions: [
      { q: 'What is the physical representation of the state |+⟩ in terms of standard computational basis states?', options: ['(|0⟩ - |1⟩)/√2', '(|0⟩ + |1⟩)/√2', '|0⟩ + |1⟩', '(1/2)|0⟩ + (1/2)|1⟩'], ans: 1 },
      { q: 'According to the Born rule, what is the probability of measuring state |0⟩ from state (3/5)|0⟩ + (4/5)|1⟩?', options: ['60%', '36%', '48%', '25%'], ans: 1 },
      { q: 'Which property guarantees that total probability is strictly conserved across all quantum operations?', options: ['Hermiticity', 'Unitary evolution', 'Decoherence', 'Linear independence'], ans: 1 },
      { q: 'Where is the ground state |0⟩ positioned on the 3D Bloch sphere?', options: ['Equator (+X)', 'South Pole (-Z)', 'North Pole (+Z)', 'Origin (0,0,0)'], ans: 2 },
      { q: 'What distinguishes a classical bit from a quantum qubit prior to measurement?', options: ['A qubit is faster in clock frequency', 'A qubit exists as a continuous complex amplitude superposition', 'A qubit has no physical noise', 'A qubit cannot be stored'], ans: 1 }
    ]
  },
  {
    id: 'qgo-201',
    code: 'QGO-201',
    title: 'Quantum Gate Operations & Matrix Mechanics',
    description: 'Rigorous benchmark on 2x2 Pauli matrices, Hadamard transformations, phase shifts, and self-inverse gates.',
    durationMin: 12,
    questionsCount: 5,
    passScore: 80,
    badgeName: 'Certified Gate Operations Master',
    questions: [
      { q: 'What is the matrix product H · H (applying Hadamard twice in succession)?', options: ['Pauli-X', 'Identity Matrix (I)', 'Pauli-Z', 'Zero Matrix'], ans: 1 },
      { q: 'Applying the Pauli-Z gate to state |+⟩ = (|0⟩ + |1⟩)/√2 produces which output state?', options: ['|0⟩', '|1⟩', '|-⟩ = (|0⟩ - |1⟩)/√2', '|i⟩'], ans: 2 },
      { q: 'Which quantum gate is equivalent to a rotation of π radians (180°) around the X-axis of the Bloch sphere?', options: ['Hadamard', 'Pauli-X', 'Phase S Gate', 'T Gate'], ans: 1 },
      { q: 'What is the determinant of any valid single-qubit unitary gate matrix U?', options: ['Always 0', 'Complex phase of absolute magnitude 1 (|det(U)| = 1)', 'Always infinity', 'Always real and negative'], ans: 1 },
      { q: 'If X|0⟩ = |1⟩, what is the output of X|1⟩?', options: ['|0⟩', '|1⟩', '|+⟩', '-|1⟩'], ans: 0 }
    ]
  }
];

export default function Exams() {
  const [activeExam, setActiveExam] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [examResult, setExamResult] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('quantumProfileName') || 'ADITHYA';
  });

  useEffect(() => {
    if (!activeExam || examResult) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeExam, examResult]);

  const startExam = (exam) => {
    setActiveExam(exam);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimeLeft(exam.durationMin * 60);
    setExamResult(null);
  };

  const handleSelectAnswer = (qIdx, optIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleSubmitExam = () => {
    if (!activeExam) return;
    let correctCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) correctCount++;
    });

    const scorePercent = Math.round((correctCount / activeExam.questions.length) * 100);
    const passed = scorePercent >= activeExam.passScore;

    setExamResult({
      scorePercent,
      correctCount,
      totalCount: activeExam.questions.length,
      passed,
      badge: passed ? activeExam.badgeName : null,
      isMasterExam: activeExam.isMasterExam
    });

    if (passed) {
      const saved = localStorage.getItem('quantumQuestStats');
      const stats = saved ? JSON.parse(saved) : { xp: 0, streak: 3, hearts: 5, certs: [] };
      stats.xp = (stats.xp || 0) + (activeExam.isMasterExam ? 250 : 100);
      stats.certs = Array.from(new Set([...(stats.certs || []), activeExam.code]));
      localStorage.setItem('quantumQuestStats', JSON.stringify(stats));
      window.dispatchEvent(new Event('stats-updated'));
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Active Exam View */}
      {activeExam ? (
        <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-duo-purple">
                {activeExam.code}
              </span>
              <h3 className="text-xl font-black text-slate-900">{activeExam.title}</h3>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white font-mono font-bold text-sm">
              <span className="material-symbols-outlined text-amber-400 text-lg">timer</span>
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* Results Card */}
          {examResult ? (
            <div className="duo-card p-8 text-center space-y-6 animate-fadeIn">
              <div
                className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl ${
                  examResult.passed ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-300' : 'bg-rose-100 text-rose-600 border-2 border-rose-300'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {examResult.passed ? 'verified' : 'cancel'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Official Exam Score Report
                </span>
                <h2 className="text-3xl font-black text-slate-900">
                  {examResult.passed ? 'Certification Achieved!' : 'Exam Not Passed'}
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  {examResult.passed
                    ? `Congratulations ${userName}! You scored ${examResult.scorePercent}% and achieved the official "${examResult.badge}" credential.`
                    : `You scored ${examResult.scorePercent}%. A passing score of ${activeExam.passScore}% is required. Review the 56 levels and retry.`}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {examResult.passed && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="btn-duo btn-duo-purple px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">workspace_premium</span>
                    <span>View & Download Certificate</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveExam(null)}
                  className="btn-duo btn-duo-green px-6 py-3 text-xs uppercase tracking-wider"
                >
                  Back to Exams Catalog
                </button>
              </div>
            </div>
          ) : (
            /* Question Paper */
            <div className="duo-card p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <span>Question {currentQuestionIdx + 1} of {activeExam.questions.length}</span>
                <span>Pass Mark: {activeExam.passScore}%</span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {activeExam.questions[currentQuestionIdx].q}
              </h4>

              <div className="space-y-3">
                {activeExam.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQuestionIdx, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between border-2 ${
                        isSelected
                          ? 'bg-duo-blueLight border-duo-blue text-duo-blueDark shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-duo-blue text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSelected && (
                        <span className="material-symbols-outlined text-duo-blue text-xl">check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <button
                  onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentQuestionIdx < activeExam.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                    className="btn-duo btn-duo-blue px-6 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="btn-duo btn-duo-green px-6 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Submit & Grade Exam
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Exams Catalog */
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                <span>Formal Quantum Katas & Certifications</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Quantum Certification Examinations
              </h2>
              <p className="text-xs text-slate-600 max-w-xl font-medium">
                Verify your algorithmic quantum competence under exam conditions. Score passing grades to generate verifiable PDF completion certificates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAMS_CATALOG.map((exam) => (
              <div
                key={exam.id}
                className={`duo-card p-6 flex flex-col justify-between space-y-6 ${
                  exam.isMasterExam ? 'md:col-span-3 bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-purple-300' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 font-mono font-bold text-xs text-slate-700">
                      {exam.code}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{exam.durationMin} mins</span>
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-slate-900 leading-snug">
                    {exam.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {exam.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>{exam.questionsCount} Graded Questions</span>
                    <span className="text-duo-green">{exam.passScore}% to Pass</span>
                  </div>

                  <button
                    onClick={() => startExam(exam)}
                    className={`w-full btn-duo py-3 text-xs uppercase tracking-wider ${
                      exam.isMasterExam ? 'btn-duo-purple' : 'btn-duo-blue'
                    }`}
                  >
                    Start Certification Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          userName={userName}
          score={examResult ? examResult.scorePercent : 88}
          certId={`QCL-2026-${userName.toUpperCase().replace(/\s+/g, '')}-8392`}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
