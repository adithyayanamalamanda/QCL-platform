import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNITS_CONFIG, LEVELS_56_DATA } from '../data/curriculum56';
import { GLOSSARY_TERMS, GATES_CATALOG, ALGORITHMS_CATALOG } from '../data/glossaryAndReference';

export default function GuidebookModal({ onClose, onSelectLevel }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('syllabus'); // 'syllabus' | 'glossary' | 'math' | 'gates' | 'algorithms'
  const [searchQuery, setSearchQuery] = useState('');
  const [isExploreMode, setIsExploreMode] = useState(() => {
    return localStorage.getItem('quantumExploreMode') === 'true';
  });

  const toggleExploreMode = () => {
    const next = !isExploreMode;
    setIsExploreMode(next);
    localStorage.setItem('quantumExploreMode', next.toString());
    window.dispatchEvent(new Event('stats-updated'));
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col border-2 border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b-2 border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-blue text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <div>
              <h2 className="font-black text-xl text-slate-900 leading-tight">Quantum Guidebook</h2>
              <span className="text-xs font-bold text-slate-500">Comprehensive Learning & Mathematical Reference</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Explore Freely Toggle */}
            <button
              onClick={toggleExploreMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
                isExploreMode
                  ? 'bg-duo-purple text-white border-duo-purpleDark shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Unlock all 56 levels directly for free exploration"
            >
              <span className="material-symbols-outlined text-sm">
                {isExploreMode ? 'lock_open' : 'lock'}
              </span>
              <span>{isExploreMode ? 'Explore Mode: ON' : 'Explore Mode: OFF'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex border-b-2 border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto gap-2">
          {[
            { id: 'syllabus', label: 'Course Syllabus (56 Levels)', icon: 'school' },
            { id: 'glossary', label: 'Quantum Glossary', icon: 'dictionary' },
            { id: 'math', label: 'Mathematics Reference', icon: 'calculate' },
            { id: 'gates', label: 'Quantum Gates', icon: 'grid_view' },
            { id: 'algorithms', label: 'Algorithms Index', icon: 'auto_awesome' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-3 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-b-4 flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-duo-green text-duo-greenDark'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-bold">Total Curriculum: 10 Units • 56 Interactive Levels • 560 Questions</span>
                <button
                  onClick={() => { onClose(); navigate('/syllabus'); }}
                  className="text-xs font-black text-emerald-800 underline uppercase"
                >
                  View Full Syllabus Page ➔
                </button>
              </div>

              <div className="space-y-4">
                {UNITS_CONFIG.map((unit) => {
                  const unitLevels = LEVELS_56_DATA.filter((l) => l.unitId === unit.id);
                  return (
                    <div key={unit.id} className="duo-card p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                            Unit {unit.unitNumber}
                          </span>
                          <h4 className="font-black text-slate-900 text-base">{unit.title}</h4>
                        </div>
                        <span className="text-xs font-bold text-slate-500 font-mono">
                          Levels {unit.levelRange[0]}–{unit.levelRange[1]}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {unit.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {unitLevels.map((lvl) => (
                          <button
                            key={lvl.id}
                            onClick={() => {
                              onClose();
                              if (onSelectLevel) onSelectLevel(lvl);
                              else navigate(`/level/${lvl.id}`);
                            }}
                            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200 flex items-center justify-between transition-colors"
                          >
                            <span className="text-xs font-bold text-slate-800">
                              {lvl.id}. {lvl.title}
                            </span>
                            <span className="material-symbols-outlined text-slate-400 text-sm">
                              arrow_forward
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search quantum terms (e.g., Superposition, Entanglement, QFT)..."
                  className="w-full p-3.5 pl-10 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-duo-green"
                />
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400">
                  search
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredGlossary.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">{item.term}</h4>
                      <span className="text-[10px] font-bold text-duo-purple bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MATHEMATICS REFERENCE */}
          {activeTab === 'math' && (
            <div className="space-y-6">
              <div className="duo-card p-5 space-y-3">
                <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-duo-blue">functions</span>
                  <span>Dirac Bra-Ket Notation Reference</span>
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs space-y-2 text-slate-800">
                  <div><strong>Ket |ψ⟩:</strong> Column vector representation of state: |0⟩ = [1, 0]ᵀ, |1⟩ = [0, 1]ᵀ</div>
                  <div><strong>Bra ⟨ψ|:</strong> Row vector conjugate transpose: ⟨0| = [1, 0], ⟨1| = [0, 1]</div>
                  <div><strong>Inner Product ⟨φ|ψ⟩:</strong> Probability overlap amplitude between states</div>
                  <div><strong>Outer Product |ψ⟩⟨φ|:</strong> Projection matrix operator</div>
                </div>
              </div>

              <div className="duo-card p-5 space-y-3">
                <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-duo-green">pie_chart</span>
                  <span>Born Rule & Normalization</span>
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  For any valid single qubit state |ψ⟩ = α|0⟩ + β|1⟩, the probability of measuring |0⟩ is P(0) = |α|², and measuring |1⟩ is P(1) = |β|².
                  Conservation of total probability dictates: <strong>|α|² + |β|² = 1</strong>.
                </p>
              </div>

              <div className="duo-card p-5 space-y-3">
                <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-duo-purple">all_inclusive</span>
                  <span>The Bloch Sphere Coordinate Equations</span>
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
                  <div>|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</div>
                  <div>x = 2 · Re(α · β*),  y = 2 · Im(α* · β),  z = |α|² - |β|²</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUANTUM GATES */}
          {activeTab === 'gates' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GATES_CATALOG.map((g, idx) => (
                <div key={idx} className="duo-card p-4 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">{g.name}</span>
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200 font-mono font-bold text-xs text-indigo-700">
                        {g.symbol}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-purple-700 font-bold">{g.matrix}</div>
                    <p className="text-xs text-slate-600 font-medium leading-snug">{g.effect}</p>
                  </div>

                  <button
                    onClick={() => { onClose(); navigate('/playground'); }}
                    className="mt-2 text-xs font-extrabold text-duo-blue hover:text-duo-blueDark flex items-center gap-1 uppercase"
                  >
                    <span>Try in Playground</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: ALGORITHMS */}
          {activeTab === 'algorithms' && (
            <div className="space-y-4">
              {ALGORITHMS_CATALOG.map((algo, idx) => (
                <div key={idx} className="duo-card p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{algo.name}</h4>
                      <span className="text-[11px] font-bold text-slate-400">Introduced: {algo.year}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs">
                      {algo.speedup}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1 font-medium">
                    <div><strong>Problem:</strong> {algo.problem}</div>
                    <div><strong>Quantum Mechanism:</strong> {algo.idea}</div>
                    <div className="text-duo-purple font-mono font-bold"><strong>Complexity:</strong> {algo.complexity}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t-2 border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="btn-duo btn-duo-green px-6 py-2.5 text-xs uppercase tracking-wider"
          >
            Close Guidebook
          </button>
        </div>
      </div>
    </div>
  );
}
