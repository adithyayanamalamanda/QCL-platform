import { useState } from 'react';
import BlochSphere from './BlochSphere';
import ProbabilityBars from './ProbabilityBars';
import { simulateTwoQubitCircuit } from '../quantumEngine';

export default function Playground() {
  const [hasAcknowledgedDisclaimer, setHasAcknowledgedDisclaimer] = useState(() => {
    return sessionStorage.getItem('playgroundDisclaimerAcknowledged') === 'true';
  });

  const [qubitsCount, setQubitsCount] = useState(2);
  const [gatesList, setGatesList] = useState([]);
  const [history, setHistory] = useState([]);
  const [activePreset, setActivePreset] = useState('custom');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedWire, setSelectedWire] = useState(0);
  const [shotsCount, setShotsCount] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);

  const acknowledgeDisclaimer = () => {
    sessionStorage.setItem('playgroundDisclaimerAcknowledged', 'true');
    setHasAcknowledgedDisclaimer(true);
  };

  // 2-Qubit simulation engine
  const simResult = simulateTwoQubitCircuit(gatesList);

  const addGate = (type, target = 0) => {
    if (gatesList.length >= 10) return;
    const newGate = { type, target, id: Date.now() + Math.random() };
    setHistory([...history, gatesList]);
    setGatesList([...gatesList, newGate]);
    setActivePreset('custom');
  };

  const removeGate = (index) => {
    setHistory([...history, gatesList]);
    setGatesList(gatesList.filter((_, i) => i !== index));
    setActivePreset('custom');
  };

  const undoGate = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setGatesList(prev);
    setHistory(history.slice(0, -1));
  };

  const clearCircuit = () => {
    setHistory([...history, gatesList]);
    setGatesList([]);
    setActivePreset('custom');
  };

  const loadPreset = (presetKey) => {
    setActivePreset(presetKey);
    if (presetKey === 'bell') {
      setGatesList([
        { type: 'H', target: 0, id: 1 },
        { type: 'CNOT', id: 2 }
      ]);
    } else if (presetKey === 'grover') {
      setGatesList([
        { type: 'H', target: 0, id: 1 },
        { type: 'H', target: 1, id: 2 },
        { type: 'ORACLE_11', id: 3 },
        { type: 'DIFFUSION', id: 4 }
      ]);
    } else if (presetKey === 'teleport') {
      setGatesList([
        { type: 'H', target: 0, id: 1 },
        { type: 'CNOT', id: 2 },
        { type: 'X', target: 0, id: 3 }
      ]);
    }
  };

  const generateQiskitCode = () => {
    let lines = [
      '# QuantumQuest Generated Python Qiskit Script',
      'from qiskit import QuantumCircuit',
      'from qiskit_aer import AerSimulator',
      '',
      `qc = QuantumCircuit(${qubitsCount}, ${qubitsCount})`,
      ''
    ];

    gatesList.forEach((g) => {
      if (g.type === 'H') lines.push(`qc.h(${g.target})`);
      else if (g.type === 'X') lines.push(`qc.x(${g.target})`);
      else if (g.type === 'Y') lines.push(`qc.y(${g.target})`);
      else if (g.type === 'Z') lines.push(`qc.z(${g.target})`);
      else if (g.type === 'S') lines.push(`qc.s(${g.target})`);
      else if (g.type === 'T') lines.push(`qc.t(${g.target})`);
      else if (g.type === 'CNOT') lines.push(`qc.cx(0, 1)`);
      else if (g.type === 'ORACLE_11') lines.push(`# Phase Oracle for |11⟩\nqc.cz(0, 1)`);
      else if (g.type === 'DIFFUSION') lines.push(`# Grover 2-Qubit Diffusion Operator\nqc.h([0, 1])\nqc.x([0, 1])\nqc.cz(0, 1)\nqc.x([0, 1])\nqc.h([0, 1])`);
    });

    lines.push('', 'qc.measure_all()', '', 'simulator = AerSimulator()', 'result = simulator.run(qc).result()', 'print("Counts:", result.get_counts())');
    return lines.join('\n');
  };

  const copyQiskit = () => {
    navigator.clipboard.writeText(generateQiskitCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Educational Disclaimer Modal */}
      {!hasAcknowledgedDisclaimer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border-2 border-slate-200 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                  Educational Simulator
                </span>
                <h3 className="font-black text-xl text-slate-900 leading-tight">
                  Playground — How to Play
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p>
                This playground is an educational simulator designed to help you understand quantum computing concepts interactively.
              </p>
              <p>
                The simulations are simplified learning models and may not reproduce every physical noise effect of a real quantum processor.
              </p>
              <p className="font-bold text-slate-900">
                Tip: Build ➔ Run ➔ Observe ➔ Understand ➔ Try Again!
              </p>
            </div>

            <button
              onClick={acknowledgeDisclaimer}
              className="w-full btn-duo btn-duo-green py-3.5 text-xs uppercase tracking-wider"
            >
              I Understand — Enter Playground
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">science</span>
            <span>Interactive Quantum Circuit Lab</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Quantum Circuit & Statevector Playground
          </h2>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Build multi-qubit circuits, execute gate operations, observe live statevectors, and export Python Qiskit code.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadPreset('bell')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 transition-all ${
              activePreset === 'bell'
                ? 'bg-duo-purple text-white border-duo-purpleDark shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Bell State
          </button>
          <button
            onClick={() => loadPreset('grover')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 transition-all ${
              activePreset === 'grover'
                ? 'bg-duo-blue text-white border-duo-blueDark shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Grover Search
          </button>
          <button
            onClick={() => loadPreset('teleport')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 transition-all ${
              activePreset === 'teleport'
                ? 'bg-emerald-600 text-white border-emerald-800 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Teleport Pair
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Circuit Grid & Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Circuit Canvas Board */}
          <div className="duo-card p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Quantum Wires & Gates Timeline
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={undoGate}
                  disabled={history.length === 0}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 text-xs font-bold"
                >
                  Undo
                </button>
                <button
                  onClick={clearCircuit}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-rose-600 text-xs font-bold"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Qubit Wire 0 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded-xl bg-purple-100 text-purple-800 font-mono font-black text-xs flex items-center justify-center border border-purple-300">
                  q[0]
                </div>
                <div className="flex-1 h-1 bg-slate-300 relative flex items-center gap-2 pl-2">
                  <span className="bg-white text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 shadow-sm">
                    |0⟩
                  </span>

                  {gatesList.map((gate, idx) => {
                    if (gate.target === 0 || gate.type === 'CNOT' || gate.type === 'ORACLE_11' || gate.type === 'DIFFUSION') {
                      return (
                        <div
                          key={gate.id}
                          onClick={() => removeGate(idx)}
                          title="Click to remove"
                          className="cursor-pointer bg-duo-purple text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-purple-800"
                        >
                          {gate.type === 'CNOT' ? '●' : gate.type}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Qubit Wire 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded-xl bg-sky-100 text-sky-800 font-mono font-black text-xs flex items-center justify-center border border-sky-300">
                  q[1]
                </div>
                <div className="flex-1 h-1 bg-slate-300 relative flex items-center gap-2 pl-2">
                  <span className="bg-white text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 shadow-sm">
                    |0⟩
                  </span>

                  {gatesList.map((gate, idx) => {
                    if (gate.target === 1 || gate.type === 'CNOT' || gate.type === 'ORACLE_11' || gate.type === 'DIFFUSION') {
                      return (
                        <div
                          key={gate.id}
                          onClick={() => removeGate(idx)}
                          title="Click to remove"
                          className="cursor-pointer bg-duo-blue text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-sky-800"
                        >
                          {gate.type === 'CNOT' ? '⊕' : gate.type}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Circuit Action Buttons */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>Shots:</span>
                <select
                  value={shotsCount}
                  onChange={(e) => setShotsCount(Number(e.target.value))}
                  className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-mono font-bold"
                >
                  <option value={100}>100 Shots</option>
                  <option value={1024}>1024 Shots</option>
                  <option value={4096}>4096 Shots</option>
                </select>
              </div>

              <button
                onClick={runSimulation}
                className="btn-duo btn-duo-green px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>{isSimulating ? 'Simulating...' : 'Run Circuit'}</span>
              </button>
            </div>
          </div>

          {/* Gate Palette Drawer */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Gate Palette Suite
              </span>
              <span className="text-xs text-slate-400 font-medium">Click to append gate</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button onClick={() => addGate('H', 0)} className="btn-duo btn-duo-purple py-2.5 text-xs">+ H on q[0]</button>
              <button onClick={() => addGate('H', 1)} className="btn-duo btn-duo-purple py-2.5 text-xs">+ H on q[1]</button>
              <button onClick={() => addGate('X', 0)} className="btn-duo py-2.5 text-xs bg-duo-rose border-duo-roseDark text-white">+ X on q[0]</button>
              <button onClick={() => addGate('X', 1)} className="btn-duo py-2.5 text-xs bg-duo-rose border-duo-roseDark text-white">+ X on q[1]</button>
              <button onClick={() => addGate('Z', 0)} className="btn-duo btn-duo-blue py-2.5 text-xs">+ Z on q[0]</button>
              <button onClick={() => addGate('Z', 1)} className="btn-duo btn-duo-blue py-2.5 text-xs">+ Z on q[1]</button>
              <button onClick={() => addGate('CNOT')} className="btn-duo btn-duo-green py-2.5 text-xs col-span-2">+ CNOT (q0 ➔ q1)</button>
              <button onClick={() => addGate('DIFFUSION')} className="btn-duo py-2.5 text-xs bg-amber-500 border-amber-600 text-slate-950 font-black col-span-4">+ Grover Diffusion (2|s⟩⟨s| - I)</button>
            </div>
          </div>

          {/* Python Qiskit Export */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-duo-blue">code</span>
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Python Qiskit Script Export
                </span>
              </div>
              <button
                onClick={copyQiskit}
                className="text-xs font-bold text-duo-blue hover:text-duo-blueDark flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              {generateQiskitCode()}
            </pre>
          </div>
        </div>

        {/* Right Column: Probabilities & Bloch Preview */}
        <div className="lg:col-span-5 space-y-6">
          <ProbabilityBars probabilities={simResult.probabilities} isTwoQubit={true} />

          {/* Bloch Sphere Inspector */}
          <div className="duo-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Bloch Sphere Inspector
              </span>
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSelectedWire(0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    selectedWire === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  q[0]
                </button>
                <button
                  onClick={() => setSelectedWire(1)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    selectedWire === 1 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  q[1]
                </button>
              </div>
            </div>

            <BlochSphere size={220} />
          </div>
        </div>
      </div>
    </div>
  );
}
