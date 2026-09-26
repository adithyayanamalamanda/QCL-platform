import { useState } from 'react';

export default function AITutorModal({ currentLevelId = 1, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I'm your Quantum AI Tutor. You are currently on Level ${currentLevelId}. How can I clarify today's quantum concept for you?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const QUICK_QUESTIONS = [
    "Why does the Hadamard (H) gate create superposition?",
    "What is the physical meaning of the Born Rule?",
    "How does Grover's search achieve a quadratic speedup?",
    "What is the difference between classical correlation and quantum entanglement?",
    "How does Shor's algorithm factor integers?"
  ];

  const handleAsk = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    const aiResponse = generateContextualResponse(q, currentLevelId);

    setMessages((prev) => [...prev, userMsg, { sender: 'ai', text: aiResponse }]);
    setInputQuery('');
  };

  const generateContextualResponse = (query, levelId) => {
    const lower = query.toLowerCase();

    // Level-appropriate response tailoring
    if (lower.includes('hadamard') || lower.includes('h gate')) {
      if (levelId < 11) {
        return "Think of the Hadamard (H) gate like giving a resting coin a strong spin! It takes a definite 0 or 1 state and puts it into a balanced 50/50 superposition where both outcomes are equally probable.";
      }
      return "The Hadamard matrix H = (1/√2)[[1, 1], [1, -1]] rotates the computational basis state |0⟩ to the equal superposition state |+⟩ = (|0⟩ + |1⟩)/√2. Because H is Hermitian and unitary, applying it twice cancels out (H² = I).";
    }

    if (lower.includes('born rule') || lower.includes('probability')) {
      return "The Born Rule states that for a quantum state |ψ⟩ = α|0⟩ + β|1⟩, the physical probability of measuring |0⟩ is P(0) = |α|² and |1⟩ is P(1) = |β|². Squaring the complex amplitude gives the true real-world probability, which must sum to 1.";
    }

    if (lower.includes('entangle') || lower.includes('bell state')) {
      return "Entanglement means two or more qubits share a unified quantum state that cannot be described separately (|ψ⟩ ≠ |q₀⟩ ⊗ |q₁⟩). For example, in the Bell state (|00⟩ + |11⟩)/√2, measuring the first qubit as 1 guarantees the second qubit will immediately measure 1 as well!";
    }

    if (lower.includes('grover')) {
      return "Grover's algorithm searches an unsorted database of N items in O(√N) steps instead of classical O(N). It works in two steps: 1. A Phase Oracle flips the phase of the correct answer. 2. A Diffusion Operator inverts all amplitudes about their mean, amplifying the target amplitude to nearly 100%.";
    }

    if (lower.includes('shor') || lower.includes('factor')) {
      return "Shor's algorithm factors integers in polynomial time O(n³). It turns the factoring problem into finding the period 'r' of a modular function f(x) = a^x mod N, which is solved exponentially fast using Quantum Phase Estimation (QPE) and the Quantum Fourier Transform (QFT).";
    }

    return `At Level ${currentLevelId}, focus on the core takeaway: Quantum algorithms manipulate probability amplitudes and phase interference to solve specific mathematical problems exponentially or quadratically faster than classical bits!`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[80vh] flex flex-col border-2 border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Tutor Header */}
        <div className="p-4 sm:p-5 border-b-2 border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-purple text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 leading-tight">Quantum AI Tutor</h3>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Level-Aware Assistant (Current: Level {currentLevelId})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-duo-purple text-white flex items-center justify-center text-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed font-medium ${
                  m.sender === 'user'
                    ? 'bg-duo-blue text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 border-2 border-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 border-t border-slate-200 bg-white overflow-x-auto flex gap-2">
          {QUICK_QUESTIONS.slice(0, 3).map((qq, i) => (
            <button
              key={i}
              onClick={() => handleAsk(qq)}
              className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl whitespace-nowrap border border-slate-200"
            >
              {qq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t-2 border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask a question about this level's quantum concept..."
            className="flex-1 p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-duo-purple"
          />
          <button
            onClick={() => handleAsk()}
            className="btn-duo btn-duo-purple px-5 py-3 text-xs uppercase tracking-wider flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
