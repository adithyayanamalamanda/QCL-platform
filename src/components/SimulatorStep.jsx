import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Play, Check, Cpu, Zap, Radio } from 'lucide-react';
import BlochSphere from './BlochSphere';
import ProbabilityBars from './ProbabilityBars';
import Mascot from './Mascot';
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
  // Single Qubit state: [alpha, beta]
  const [qubitState, setQubitState] = useState([COMPLEX.create(1, 0), COMPLEX.create(0, 0)]);
  const [history, setHistory] = useState(['|0⟩']);
  
  // Coin spin state for Level 1
  const [isSpinning, setIsSpinning] = useState(false);
  const [coinAngle, setCoinAngle] = useState(0);

  // Circuit chain for Level 3
  const [circuitGates, setCircuitGates] = useState([]);

  // 2-Qubit state for Level 4 & Level 6
  const [twoQubitGates, setTwoQubitGates] = useState([]);
  const [twoQubitResult, setTwoQubitResult] = useState({
    state: [COMPLEX.create(1, 0), COMPLEX.create(0, 0), COMPLEX.create(0, 0), COMPLEX.create(0, 0)],
    probabilities: { '00': 100, '01': 0, '10': 0, '11': 0 }
  });

  // Measurement chamber stats for Level 5
  const [measurementCount, setMeasurementCount] = useState({ count0: 0, count1: 0, total: 0 });
  const [lastShot, setLastShot] = useState(null);
  const [isMeasuring, setIsMeasuring] = useState(false);

  // Grover algorithm step tracker for Level 6
  const [groverStep, setGroverStep] = useState(0); // 0: init, 1: superposed, 2: oracle, 3: amplified

  const singleProbabilities = getProbabilities(qubitState);

  // Handle single qubit gate click
  const handleApplyGate = (gateKey) => {
    if (gateKey === 'RESET') {
      const reset = [COMPLEX.create(1, 0), COMPLEX.create(0, 0)];
      setQubitState(reset);
      setHistory(['|0⟩']);
      return;
    }

    const matrix = GATES[gateKey];
    if (!matrix) return;

    const newState = applyGate(matrix, qubitState);
    setQubitState(newState);
    setHistory((prev) => [...prev.slice(-3), gateKey]);
  };

  // Level 1: Spin Coin to simulate Superposition
  const spinCoin = () => {
    setIsSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      setCoinAngle((prev) => prev + 45);
      spins++;
      if (spins > 16) {
        clearInterval(interval);
        setIsSpinning(false);
        // Put in Hadamard superposition
        const hState = applyGate(GATES.H, [COMPLEX.create(1, 0), COMPLEX.create(0, 0)]);
        setQubitState(hState);
      }
    }, 50);
  };

  // Level 3: Add to Circuit Chain
  const addGateToChain = (gateName) => {
    if (circuitGates.length >= 4) return;
    const newGates = [...circuitGates, gateName];
    setCircuitGates(newGates);

    // Compute chain from |0>
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

  // Level 4: 2-Qubit Entanglement / Bell state
  const handleApplyTwoQubit = (action) => {
    if (action === 'RESET') {
      setTwoQubitGates([]);
      setTwoQubitResult(simulateTwoQubitCircuit([]));
      return;
    }

    let newGates = [...twoQubitGates];
    if (action === 'H_Q0') {
      newGates.push({ type: 'H', target: 0 });
    } else if (action === 'CNOT') {
      newGates.push({ type: 'CNOT' });
    } else if (action === 'X_Q0') {
      newGates.push({ type: 'X', target: 0 });
    } else if (action === 'X_Q1') {
      newGates.push({ type: 'X', target: 1 });
    }
    setTwoQubitGates(newGates);
    setTwoQubitResult(simulateTwoQubitCircuit(newGates));
  };

  // Level 5: Live measurement collapse
  const triggerSingleMeasure = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const res = measureQubit(qubitState);
      setLastShot(res.outcome);
      setMeasurementCount((prev) => ({
        count0: res.outcome === '0' ? prev.count0 + 1 : prev.count0,
        count1: res.outcome === '1' ? prev.count1 + 1 : prev.count1,
        total: prev.total + 1
      }));
      setQubitState(res.collapsedState);
      setIsMeasuring(false);
    }, 300);
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
    }, 400);
  };

  // Level 6: Grover's step sequence
  const runGroverStep = (step) => {
    if (step === 1) {
      // Step 1: Hadamard on both
      const res = simulateTwoQubitCircuit([
        { type: 'H', target: 0 },
        { type: 'H', target: 1 }
      ]);
      setTwoQubitResult(res);
      setGroverStep(1);
    } else if (step === 2) {
      // Step 2: Oracle flips |11>
      const res = simulateTwoQubitCircuit([
        { type: 'H', target: 0 },
        { type: 'H', target: 1 },
        { type: 'ORACLE_11' }
      ]);
      setTwoQubitResult(res);
      setGroverStep(2);
    } else if (step === 3) {
      // Step 3: Grover Diffusion amplifier
      const res = simulateTwoQubitCircuit([
        { type: 'H', target: 0 },
        { type: 'H', target: 1 },
        { type: 'ORACLE_11' },
        { type: 'DIFFUSION' }
      ]);
      setTwoQubitResult(res);
      setGroverStep(3);
    }
  };

  const resetGrover = () => {
    setGroverStep(0);
    setTwoQubitResult(simulateTwoQubitCircuit([]));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Title & Instructions Banner */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-bold tracking-wide uppercase">
            <Cpu className="w-3.5 h-3.5" />
            Hands-on Simulation Step
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {level.simulator.title}
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            {level.simulator.instructions}
          </p>
        </div>

        <button
          onClick={onComplete}
          className="flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 active:scale-95 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          <span>Ready for Quiz</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

      {/* Simulator Body customized per Level */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Representation (Bloch Sphere or Circuit / Coin) */}
        <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col items-center justify-center min-h-[340px]">
          
          {/* LEVEL 1: Coin Flip Analogy Visualizer */}
          {level.id === 1 && (
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <div
                className={`w-32 h-32 rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 flex items-center justify-center shadow-xl shadow-amber-500/30 transition-transform duration-300 ${
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
                <span className="font-extrabold text-slate-950 text-2xl font-mono">
                  {singleProbabilities.p0 > 80
                    ? '|0⟩ (Heads)'
                    : singleProbabilities.p1 > 80
                    ? '|1⟩ (Tails)'
                    : '|+⟩ (Spinning)'}
                </span>
              </div>

              <p className="text-xs text-center text-slate-400 max-w-xs">
                {singleProbabilities.p0 > 80
                  ? 'Definite state |0⟩ (100% Heads)'
                  : singleProbabilities.p1 > 80
                  ? 'Definite state |1⟩ (100% Tails)'
                  : 'Quantum Superposition! 50% chance of |0⟩ and 50% chance of |1⟩.'}
              </p>

              <button
                onClick={spinCoin}
                disabled={isSpinning}
                className="px-5 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30 active:scale-95 transition-all text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isSpinning ? 'Spinning...' : 'Spin Coin (Superposition)'}
              </button>
            </div>
          )}

          {/* LEVEL 2, 3, 5: Single Qubit Bloch Sphere */}
          {(level.id === 2 || level.id === 3 || level.id === 5) && (
            <div className="w-full flex flex-col items-center">
              <BlochSphere state={qubitState} size={240} />
              <div className="mt-3 text-center">
                <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                  State: {formatKet(qubitState)}
                </span>
              </div>
            </div>
          )}

          {/* LEVEL 4 & LEVEL 6: 2-Qubit Visual Wiring */}
          {(level.id === 4 || level.id === 6) && (
            <div className="w-full space-y-4 py-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-4">
                {/* Qubit 0 wire */}
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-bold w-8">q[0]:</span>
                  <div className="flex-1 h-0.5 bg-slate-700 relative flex items-center gap-3">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">|0⟩</span>
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'H' && g.target === 0) && (
                      <span className="bg-purple-600 text-white px-2.5 py-1 rounded font-bold shadow-md shadow-purple-500/40">H</span>
                    )}
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'CNOT') && (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] text-slate-950 font-bold">●</span>
                    )}
                    {level.id === 6 && groverStep >= 1 && (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">H</span>
                    )}
                    {level.id === 6 && groverStep >= 2 && (
                      <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold">Oracle</span>
                    )}
                    {level.id === 6 && groverStep >= 3 && (
                      <span className="bg-pink-600 text-white px-2 py-1 rounded font-bold">Diffusion</span>
                    )}
                  </div>
                </div>

                {/* Qubit 1 wire */}
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold w-8">q[1]:</span>
                  <div className="flex-1 h-0.5 bg-slate-700 relative flex items-center gap-3">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">|0⟩</span>
                    {level.id === 4 && twoQubitGates.some(g => g.type === 'CNOT') && (
                      <span className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-extrabold text-sm">⊕</span>
                    )}
                    {level.id === 6 && groverStep >= 1 && (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">H</span>
                    )}
                    {level.id === 6 && groverStep >= 2 && (
                      <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold">Oracle</span>
                    )}
                    {level.id === 6 && groverStep >= 3 && (
                      <span className="bg-pink-600 text-white px-2 py-1 rounded font-bold">Diffusion</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-slate-400">
                  {level.id === 4
                    ? twoQubitGates.some(g => g.type === 'CNOT')
                      ? 'Entangled Bell Pair Formed: (|00⟩ + |11⟩)/√2'
                      : 'Apply H on Q0 then CNOT to entangle!'
                    : groverStep === 3
                    ? 'Target State |11⟩ Amplified with 100% Probability!'
                    : `Grover Step ${groverStep}/3 Active`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Controls, Probability Bars & Experiment buttons */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Probabilities Output */}
          <ProbabilityBars
            probabilities={level.id === 4 || level.id === 6 ? twoQubitResult.probabilities : singleProbabilities}
            isTwoQubit={level.id === 4 || level.id === 6}
          />

          {/* LEVEL SPECIFIC INTERACTIVE CONTROLS */}
          
          {/* LEVEL 1 & 2: Single Qubit Gate Palette */}
          {(level.id === 1 || level.id === 2) && (
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Select Gate to Apply</span>
                <span className="text-purple-400">Live Matrix Multiplier</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleApplyGate('X')}
                  className="p-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-700/60 text-cyan-300 font-extrabold text-base transition-all active:scale-95 shadow-sm"
                  title="Pauli-X (NOT) Gate: Flips |0⟩ to |1⟩"
                >
                  X
                </button>
                <button
                  onClick={() => handleApplyGate('H')}
                  className="p-3 rounded-xl bg-purple-950/80 hover:bg-purple-900/90 border border-purple-700/60 text-purple-300 font-extrabold text-base transition-all active:scale-95 shadow-sm"
                  title="Hadamard Gate: Creates Superposition"
                >
                  H
                </button>
                <button
                  onClick={() => handleApplyGate('Z')}
                  className="p-3 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 border border-blue-700/60 text-blue-300 font-extrabold text-base transition-all active:scale-95 shadow-sm"
                  title="Pauli-Z Phase Gate: Inverts phase of |1⟩"
                >
                  Z
                </button>
                <button
                  onClick={() => handleApplyGate('RESET')}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1 active:scale-95"
                  title="Reset to Ground State |0⟩"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 3: Circuit Sequencer */}
          {level.id === 3 && (
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Circuit Timeline:</span>
                <span className="text-blue-400">{circuitGates.length}/4 Gates</span>
              </div>

              {/* Sequence Display */}
              <div className="min-h-[48px] bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">|0⟩ ➔</span>
                {circuitGates.map((g, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-md">
                    {g}
                  </span>
                ))}
                {circuitGates.length === 0 && (
                  <span className="text-xs text-slate-500 italic">Click buttons below to chain gates</span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                <button
                  onClick={() => addGateToChain('H')}
                  className="p-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 border border-purple-600 text-purple-300 font-bold text-sm"
                >
                  + [H]
                </button>
                <button
                  onClick={() => addGateToChain('X')}
                  className="p-2.5 rounded-xl bg-cyan-900/50 hover:bg-cyan-800 border border-cyan-600 text-cyan-300 font-bold text-sm"
                >
                  + [X]
                </button>
                <button
                  onClick={() => addGateToChain('Z')}
                  className="p-2.5 rounded-xl bg-blue-900/50 hover:bg-blue-800 border border-blue-600 text-blue-300 font-bold text-sm"
                >
                  + [Z]
                </button>
                <button
                  onClick={clearCircuit}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 4: 2-Qubit & CNOT Controls */}
          {level.id === 4 && (
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Entanglement Gate Suite</span>
                <span className="text-emerald-400">Bell State Generator</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleApplyTwoQubit('H_Q0')}
                  className="p-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-300 font-bold text-xs"
                >
                  1. H on Qubit 0
                </button>
                <button
                  onClick={() => handleApplyTwoQubit('CNOT')}
                  className="p-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-bold text-xs"
                >
                  2. CNOT (Q0 ➔ Q1)
                </button>
                <button
                  onClick={() => handleApplyTwoQubit('RESET')}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset |00⟩
                </button>
              </div>
            </div>
          )}

          {/* LEVEL 5: Measurement Detector Controls */}
          {level.id === 5 && (
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Quantum Detector & Histogram</span>
                <span className="text-amber-400">Total Shots: {measurementCount.total}</span>
              </div>

              {/* Single shot & 100 shots buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={triggerSingleMeasure}
                  disabled={isMeasuring}
                  className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  Measure 1 Shot
                </button>
                <button
                  onClick={run100Shots}
                  disabled={isMeasuring}
                  className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  Fire 100 Shots
                </button>
              </div>

              {/* Detector Counts Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-950 p-2 rounded-xl border border-purple-800/40">
                  <span className="text-purple-400 font-bold">|0⟩ Hits: </span>
                  <span className="text-white font-extrabold">{measurementCount.count0}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-cyan-800/40">
                  <span className="text-cyan-400 font-bold">|1⟩ Hits: </span>
                  <span className="text-white font-extrabold">{measurementCount.count1}</span>
                </div>
              </div>
            </div>
          )}

          {/* LEVEL 6: Grover Algorithm Stepper */}
          {level.id === 6 && (
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Grover Search Execution Steps</span>
                <span className="text-pink-400">Target Item: |11⟩</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => runGroverStep(1)}
                  className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                    groverStep >= 1
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700'
                  }`}
                >
                  1. Superposition
                </button>
                <button
                  onClick={() => runGroverStep(2)}
                  disabled={groverStep < 1}
                  className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                    groverStep >= 2
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 opacity-60'
                  }`}
                >
                  2. Phase Oracle
                </button>
                <button
                  onClick={() => runGroverStep(3)}
                  disabled={groverStep < 2}
                  className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                    groverStep >= 3
                      ? 'bg-pink-600 text-white border-pink-500'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 opacity-60'
                  }`}
                >
                  3. Diffusion (Amplify)
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={resetGrover}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Algorithm
                </button>
              </div>
            </div>
          )}

          {/* Motivational Tip */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-3">
            <Mascot mood="explaining" size="sm" />
            <p className="leading-snug">{level.simulator.successHint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
