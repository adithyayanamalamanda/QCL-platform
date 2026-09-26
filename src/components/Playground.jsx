import { useState } from 'react';
import BlochSphere from './BlochSphere';
import ProbabilityBars from './ProbabilityBars';
import {
  COMPLEX,
  GATES,
  applyGate,
  getProbabilities,
  simulateTwoQubitCircuit
} from '../quantumEngine';

export default function Playground() {
  const [qubitsCount, setQubitsCount] = useState(2);
  const [gatesList, setGatesList] = useState([]);
  const [activePreset, setActivePreset] = useState('custom');
  const [copiedCode, setCopiedCode] = useState(false);

  // Single qubit state for Bloch preview
  const [selectedWire, setSelectedWire] = useState(0);

  // Run 2-qubit simulation
  const simResult = simulateTwoQubitCircuit(gatesList);

  const addGate = (type, target = 0) => {
    if (gatesList.length >= 8) return;
    setGatesList([...gatesList, { type, target, id: Date.now() + Math.random() }]);
    setActivePreset('custom');
  };

  const removeGate = (index) => {
    setGatesList(gatesList.filter((_, i) => i !== index));
    setActivePreset('custom');
  };

  const clearCircuit = () => {
    setGatesList([]);
    setActivePreset('custom');
  };

  // Load Preset Circuits
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
    } else if (presetKey === 'superdense') {
      setGatesList([
        { type: 'H', target: 0, id: 1 },
        { type: 'CNOT', id: 2 },
        { type: 'X', target: 0, id: 3 }
      ]);
    }
  };

  // Generate Python Qiskit Code
  const generateQiskitCode = () => {
    let lines = [
      '# QuantumQuest Generated Qiskit Code',
      'from qiskit import QuantumCircuit, transpile',
      'from qiskit_aer import AerSimulator',
      '',
      `qc = QuantumCircuit(${qubitsCount}, ${qubitsCount})`,
      ''
    ];

    gatesList.forEach((g) => {
      if (g.type === 'H') lines.push(`qc.h(${g.target})`);
      else if (g.type === 'X') lines.push(`qc.x(${g.target})`);
      else if (g.type === 'CNOT') lines.push(`qc.cx(0, 1)`);
      else if (g.type === 'ORACLE_11') lines.push(`# Oracle Phase flip for |11⟩\nqc.cz(0, 1)`);
      else if (g.type === 'DIFFUSION') lines.push(`# 2-Qubit Grover Inversion about the mean\nqc.h([0, 1])\nqc.x([0, 1])\nqc.cz(0, 1)\nqc.x([0, 1])\nqc.h([0, 1])`);
    });

    lines.push('', 'qc.measure_all()', 'print(qc.draw())');
    return lines.join('\n');
  };

  const copyQiskit = () => {
    navigator.clipboard.writeText(generateQiskitCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">science</span>
            <span>Interactive Quantum Circuit Lab</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Quantum Circuit & Statevector Playground
          </h2>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Assemble multi-qubit gates, observe live wave interference & state probabilities, and export real Python Qiskit code.
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
            Bell Pair
          </button>
          <button
            onClick={() => loadPreset('grover')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 transition-all ${
              activePreset === 'grover'
                ? 'bg-duo-blue text-white border-duo-blueDark shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Grover 2-Qubit
          </button>
          <button
            onClick={clearCircuit}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Grid: Circuit Board & State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Circuit Grid & Palette */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Circuit Canvas Board */}
          <div className="duo-card p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Quantum Wires & Timeline
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {gatesList.length}/8 Gates Placed
              </span>
            </div>

            {/* Qubit Wire 0 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded-xl bg-purple-100 text-purple-800 font-mono font-extrabold text-xs flex items-center justify-center border border-purple-300">
                  q[0]
                </div>
                <div className="flex-1 h-1 bg-slate-300 relative flex items-center gap-2 pl-2">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300">
                    |0⟩
                  </span>

                  {gatesList.map((gate, idx) => {
                    if (gate.type === 'H' && gate.target === 0) {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="Click to remove" className="cursor-pointer bg-duo-purple text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-purple-800">
                          H
                        </div>
                      );
                    }
                    if (gate.type === 'X' && gate.target === 0) {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="Click to remove" className="cursor-pointer bg-duo-rose text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-rose-800">
                          X
                        </div>
                      );
                    }
                    if (gate.type === 'CNOT') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="CNOT Control (Click to remove)" className="cursor-pointer w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                          ●
                        </div>
                      );
                    }
                    if (gate.type === 'ORACLE_11') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} className="cursor-pointer bg-amber-500 text-slate-950 px-2 py-1 rounded-xl text-[10px] font-black border-b-2 border-amber-700">
                          Oracle
                        </div>
                      );
                    }
                    if (gate.type === 'DIFFUSION') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} className="cursor-pointer bg-sky-500 text-white px-2 py-1 rounded-xl text-[10px] font-black border-b-2 border-sky-700">
                          Diff
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
                <div className="w-12 h-8 rounded-xl bg-sky-100 text-sky-800 font-mono font-extrabold text-xs flex items-center justify-center border border-sky-300">
                  q[1]
                </div>
                <div className="flex-1 h-1 bg-slate-300 relative flex items-center gap-2 pl-2">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300">
                    |0⟩
                  </span>

                  {gatesList.map((gate, idx) => {
                    if (gate.type === 'H' && gate.target === 1) {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="Click to remove" className="cursor-pointer bg-duo-purple text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-purple-800">
                          H
                        </div>
                      );
                    }
                    if (gate.type === 'X' && gate.target === 1) {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="Click to remove" className="cursor-pointer bg-duo-rose text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-sm hover:scale-105 border-b-2 border-rose-800">
                          X
                        </div>
                      );
                    }
                    if (gate.type === 'CNOT') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} title="CNOT Target (Click to remove)" className="cursor-pointer w-5 h-5 rounded-full border-2 border-slate-900 bg-white text-slate-900 flex items-center justify-center text-xs font-black">
                          ⊕
                        </div>
                      );
                    }
                    if (gate.type === 'ORACLE_11') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} className="cursor-pointer bg-amber-500 text-slate-950 px-2 py-1 rounded-xl text-[10px] font-black border-b-2 border-amber-700">
                          Oracle
                        </div>
                      );
                    }
                    if (gate.type === 'DIFFUSION') {
                      return (
                        <div key={gate.id} onClick={() => removeGate(idx)} className="cursor-pointer bg-sky-500 text-white px-2 py-1 rounded-xl text-[10px] font-black border-b-2 border-sky-700">
                          Diff
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Gate Palette Drawer */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Quantum Gate Palette
              </span>
              <span className="text-xs text-slate-400 font-medium">Click to append to circuit</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => addGate('H', 0)}
                className="btn-duo btn-duo-purple py-3 text-xs"
              >
                + H on q[0]
              </button>
              <button
                onClick={() => addGate('H', 1)}
                className="btn-duo btn-duo-purple py-3 text-xs"
              >
                + H on q[1]
              </button>
              <button
                onClick={() => addGate('X', 0)}
                className="btn-duo py-3 text-xs bg-duo-rose border-duo-roseDark text-white"
              >
                + X on q[0]
              </button>
              <button
                onClick={() => addGate('X', 1)}
                className="btn-duo py-3 text-xs bg-duo-rose border-duo-roseDark text-white"
              >
                + X on q[1]
              </button>
              <button
                onClick={() => addGate('CNOT')}
                className="btn-duo btn-duo-blue py-3 text-xs col-span-2"
              >
                + CNOT (q[0] ➔ q[1])
              </button>
              <button
                onClick={() => addGate('DIFFUSION')}
                className="btn-duo btn-duo-green py-3 text-xs col-span-2"
              >
                + Grover Diffusion
              </button>
            </div>
          </div>

          {/* Export to Python Qiskit Script */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-duo-blue">code</span>
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Python Qiskit Code Export
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

          {/* Single Qubit Wire State Inspector */}
          <div className="duo-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Wire Bloch Sphere Inspector
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
