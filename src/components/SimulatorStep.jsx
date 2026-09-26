import { useState } from 'react';
import BlochSphere from './BlochSphere';
import ProbabilityBars from './ProbabilityBars';
import {
  COMPLEX,
  GATES,
  applyGate,
  getProbabilities,
  simulateTwoQubitCircuit,
  measureQubit,
  formatKet
} from '../quantumEngine';

export default function SimulatorStep({ level, onComplete }) {
  const [qubitState, setQubitState] = useState([COMPLEX.create(1, 0), COMPLEX.create(0, 0)]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [coinAngle, setCoinAngle] = useState(0);

  const [circuitGates, setCircuitGates] = useState([]);

  const [twoQubitGates, setTwoQubitGates] = useState([]);
  const [twoQubitResult, setTwoQubitResult] = useState({
    state: [COMPLEX.create(1, 0), COMPLEX.create(0, 0), COMPLEX.create(0, 0), COMPLEX.create(0, 0)],
    probabilities: { '00': 100, '01': 0, '10': 0, '11': 0 }
  });

  const [measurementCount, setMeasurementCount] = useState({ count0: 0, count1: 0, total: 0 });
  const [isMeasuring, setIsMeasuring] = useState(false);

  const [groverStep, setGroverStep] = useState(0);

  const singleProbabilities = getProbabilities(qubitState);

  const handleApplyGate = (gateKey) => {
    if (gateKey === 'RESET') {
      setQubitState([COMPLEX.create(1, 0), COMPLEX.create(0, 0)]);
      return;
    }
    const matrix = GATES[gateKey];
    if (!matrix) return;
    setQubitState(applyGate(matrix, qubitState));
  };

  const spinCoin = () => {
    setIsSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      setCoinAngle((prev) => prev + 45);
      spins++;
      if (spins > 14) {
        clearInterval(interval);
        setIsSpinning(false);
        setQubitState(applyGate(GATES.H, [COMPLEX.create(1, 0), COMPLEX.create(0, 0)]));
      }
    }, 50);
  };

  const addGateToChain = (gateName) => {
    if (circuitGates.length >= 4) return;
    const newGates = [...circuitGates, gateName];
    setCircuitGates(newGates);

    let st = [COMPLEX.create(1, 0), COMPLEX.create(0, 0)];
    newGates.forEach((g) => {
      st = applyGate(GATES[g], st);
    });
    setQubitState(st);
  };

  const clearCircuit = () => {
    setCircuitGates([]);
    setQubitState([COMPLEX.create(1, 0), COMPLEX.create(0, 0)]);
  };

  const handleApplyTwoQubit = (action) => {
    if (action === 'RESET') {
      setTwoQubitGates([]);
      setTwoQubitResult(simulateTwoQubitCircuit([]));
      return;
    }

    let newGates = [...twoQubitGates];
    if (action === 'H_Q0') newGates.push({ type: 'H', target: 0 });
    else if (action === 'CNOT') newGates.push({ type: 'CNOT' });
    else if (action === 'X_Q0') newGates.push({ type: 'X', target: 0 });
    else if (action === 'X_Q1') newGates.push({ type: 'X', target: 1 });

    setTwoQubitGates(newGates);
    setTwoQubitResult(simulateTwoQubitCircuit(newGates));
  };

  const triggerSingleMeasure = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const res = measureQubit(qubitState);
      setMeasurementCount((prev) => ({
        count0: res.outcome === '0' ? prev.count0 + 1 : prev.count0,
        count1: res.outcome === '1' ? prev.count1 + 1 : prev.count1,
        total: prev.total + 1
      }));
      setQubitState(res.collapsedState);
      setIsMeasuring(false);
    }, 200);
  };

  const run100Shots = () => {
    setIsMeasuring(true);
    let c0 = 0;
    let c1 = 0;
    const p0 = singleProbabilities.prob0Raw;
    for (let i = 0; i < 100; i++) {
      if (Math.random() < p0) c0++;
      else c1++;
    }
    setTimeout(() => {
      setMeasurementCount((prev) => ({
        count0: prev.count0 + c0,
        count1: prev.count1 + c1,
        total: prev.total + 100
      }));
      setIsMeasuring(false);
    }, 300);
  };

  const runGroverStep = (step) => {
    if (step === 1) {
      setTwoQubitResult(simulateTwoQubitCircuit([{ type: 'H', target: 0 }, { type: 'H', target: 1 }]));
      setGroverStep(1);
    } else if (step === 2) {
      setTwoQubitResult(simulateTwoQubitCircuit([{ type: 'H', target: 0 }, { type: 'H', target: 1 }, { type: 'ORACLE_11' }]));
      setGroverStep(2);
    } else if (step === 3) {
      setTwoQubitResult(simulateTwoQubitCircuit([{ type: 'H', target: 0 }, { type: 'H', target: 1 }, { type: 'ORACLE_11' }, { type: 'DIFFUSION' }]));
      setGroverStep(3);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Title & Instructions Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-extrabold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">science</span>
            <span>Interactive Simulator Step</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {level.simulator.title}
          </h3>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            {level.simulator.instructions}
          </p>
        </div>

        <button
          onClick={onComplete}
          className="btn-duo btn-duo-green px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Ready for Quiz</span>
          <span className="material-symbols-outlined text-base">check</span>
        </button>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Canvas */}
        <div className="lg:col-span-6 duo-card p-6 flex flex-col items-center justify-center min-h-[320px]">
          
          {/* LEVEL 1: Coin Superposition */}
          {level.id === 1 && (
            <div className="flex flex-col items-center space-y-4 w-full">
              <div
                className={`w-32 h-32 rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 flex items-center justify-center shadow-md transition-transform duration-300 ${
                  isSpinning ? 'animate-spin' : ''
                }`}
                style={{
                  transform: isSpinning
                    ? `rotateY(${coinAngle * 8}deg)`
                    : singleProbabilities.p0 > 80
                    ? 'rotateY(0deg)'
                    : singleProbabilities.p1 > 80
                    ? 'rotateY(180deg)'
                    : 'rotateY(45deg)'
                }}
              >
                <span className="font-black text-slate-900 text-xl font-mono">
                  {singleProbabilities.p0 > 80
                    ? '|0⟩ (Heads)'
                    : singleProbabilities.p1 > 80
                    ? '|1⟩ (Tails)'
                    : '|+⟩ (Superposed)'}
                </span>
              </div>

              <p className="text-xs text-center text-slate-600 max-w-xs font-medium">
                {singleProbabilities.p0 > 80
                  ? 'Definite state |0⟩ (100% Heads)'
                  : singleProbabilities.p1 > 80
                  ? 'Definite state |1⟩ (100% Tails)'
                  : 'Superposition! 50% probability of |0⟩ and 50% of |1⟩.'}
              </p>

              <button
                onClick={spinCoin}
                disabled={isSpinning}
                className="btn-duo py-2.5 px-5 bg-amber-500 hover:bg-amber-400 border-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">rotate_right</span>
                <span>{isSpinning ? 'Spinning...' : 'Spin Coin (Superposition)'}</span>
              </button>
            </div>
          )}

          {/* LEVEL 2, 3, 5: Single Qubit Bloch Sphere */}
          {(level.id === 2 || level.id === 3 || level.id === 5) && (
            <div className="w-full flex flex-col items-center">
              <BlochSphere state={qubitState} size={220} />
              <div className="mt-2 text-center">
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  State: {formatKet(qubitState)}
                </span>
              </div>
            </div>
          )}

          {/* LEVEL 4 & LEVEL 6: 2-Qubit Visual Wiring */}
          {(level.id === 4 || level.id === 6) && (
            <div className="w-full space-y-4 py-2">
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 font-mono text-xs space-y-4">
                {/* q[0] wire */}
                <div className="flex items-center gap-3">
                  <span className="text-purple-700 font-bold w-8">q[0]:</span>
                  <div className="flex-1 h-0.5 bg-slate-300 relative flex items-center gap-3">
                    <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">|0⟩</span>
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'H' && g.target === 0) && (
                      <span className="bg-duo-purple text-white px-2 py-0.5 rounded font-bold">H</span>
                    )}
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'CNOT') && (
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">●</span>
                    )}
                    {level.id === 6 && groverStep >= 1 && (
                      <span className="bg-duo-purple text-white px-2 py-0.5 rounded font-bold">H</span>
                    )}
                    {level.id === 6 && groverStep >= 2 && (
                      <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">Oracle</span>
                    )}
                    {level.id === 6 && groverStep >= 3 && (
                      <span className="bg-sky-500 text-white px-2 py-0.5 rounded font-bold">Diff</span>
                    )}
                  </div>
                </div>

                {/* q[1] wire */}
                <div className="flex items-center gap-3">
                  <span className="text-sky-700 font-bold w-8">q[1]:</span>
                  <div className="flex-1 h-0.5 bg-slate-300 relative flex items-center gap-3">
                    <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">|0⟩</span>
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'CNOT') && (
                      <span className="w-5 h-5 rounded-full border-2 border-slate-900 bg-white text-slate-900 flex items-center justify-center font-bold text-xs">⊕</span>
                    )}
                    {level.id === 6 && groverStep >= 1 && (
                      <span className="bg-duo-purple text-white px-2 py-0.5 rounded font-bold">H</span>
                    )}
                    {level.id === 6 && groverStep >= 2 && (
                      <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">Oracle</span>
                    )}
                    {level.id === 6 && groverStep >= 3 && (
                      <span className="bg-sky-500 text-white px-2 py-0.5 rounded font-bold">Diff</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Controls & Probability Output */}
        <div className="lg:col-span-6 space-y-4">
          <ProbabilityBars
            probabilities={level.id === 4 || level.id === 6 ? twoQubitResult.probabilities : singleProbabilities}
            isTwoQubit={level.id === 4 || level.id === 6}
          />

          {/* Level Specific Controls */}
          {(level.id === 1 || level.id === 2) && (
            <div className="duo-card p-4 space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Select Gate to Apply
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleApplyGate('X')}
                  className="btn-duo py-2.5 text-xs bg-duo-rose border-duo-roseDark text-white"
                >
                  X Gate
                </button>
                <button
                  onClick={() => handleApplyGate('H')}
                  className="btn-duo btn-duo-purple py-2.5 text-xs"
                >
                  H Gate
                </button>
                <button
                  onClick={() => handleApplyGate('Z')}
                  className="btn-duo btn-duo-blue py-2.5 text-xs"
                >
                  Z Gate
                </button>
                <button
                  onClick={() => handleApplyGate('RESET')}
                  className="btn-duo btn-duo-white py-2.5 text-xs"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {level.id === 3 && (
            <div className="duo-card p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Circuit Timeline:</span>
                <span>{circuitGates.length}/4 Gates</span>
              </div>
              <div className="min-h-[44px] bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">|0⟩ ➔</span>
                {circuitGates.map((g, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm">
                    {g}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => addGateToChain('H')} className="btn-duo btn-duo-purple py-2 text-xs">+ H</button>
                <button onClick={() => addGateToChain('X')} className="btn-duo py-2 text-xs bg-duo-rose border-duo-roseDark text-white">+ X</button>
                <button onClick={() => addGateToChain('Z')} className="btn-duo btn-duo-blue py-2 text-xs">+ Z</button>
                <button onClick={clearCircuit} className="btn-duo btn-duo-white py-2 text-xs">Clear</button>
              </div>
            </div>
          )}

          {level.id === 4 && (
            <div className="duo-card p-4 space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Bell State Generator
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handleApplyTwoQubit('H_Q0')} className="btn-duo btn-duo-purple py-2.5 text-xs">1. H on q[0]</button>
                <button onClick={() => handleApplyTwoQubit('CNOT')} className="btn-duo btn-duo-blue py-2.5 text-xs">2. CNOT</button>
                <button onClick={() => handleApplyTwoQubit('RESET')} className="btn-duo btn-duo-white py-2.5 text-xs">Reset</button>
              </div>
            </div>
          )}

          {level.id === 5 && (
            <div className="duo-card p-4 space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Quantum Measurement Chamber
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={triggerSingleMeasure} disabled={isMeasuring} className="btn-duo py-2.5 text-xs bg-amber-500 border-amber-600 text-slate-950 font-black">
                  Measure 1 Shot
                </button>
                <button onClick={run100Shots} disabled={isMeasuring} className="btn-duo btn-duo-blue py-2.5 text-xs">
                  Fire 100 Shots
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-purple-700 font-bold">|0⟩ Hits: </span>
                  <span className="font-extrabold text-slate-900">{measurementCount.count0}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-sky-700 font-bold">|1⟩ Hits: </span>
                  <span className="font-extrabold text-slate-900">{measurementCount.count1}</span>
                </div>
              </div>
            </div>
          )}

          {level.id === 6 && (
            <div className="duo-card p-4 space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Grover 2-Qubit Execution Steps
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => runGroverStep(1)} className={`btn-duo py-2.5 text-xs ${groverStep >= 1 ? 'btn-duo-purple' : 'btn-duo-white'}`}>1. Superpose</button>
                <button onClick={() => runGroverStep(2)} disabled={groverStep < 1} className={`btn-duo py-2.5 text-xs ${groverStep >= 2 ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold' : 'btn-duo-white opacity-50'}`}>2. Oracle</button>
                <button onClick={() => runGroverStep(3)} disabled={groverStep < 2} className={`btn-duo py-2.5 text-xs ${groverStep >= 3 ? 'btn-duo-blue' : 'btn-duo-white opacity-50'}`}>3. Diffusion</button>
              </div>
            </div>
          )}

          {/* Realistic Quantum Tip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-medium">
            <span className="material-symbols-outlined text-duo-blue text-lg flex-shrink-0">info</span>
            <p>{level.simulator.successHint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
