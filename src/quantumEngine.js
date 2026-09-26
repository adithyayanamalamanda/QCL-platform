// Quantum State and Simulation Engine for QuantumQuest

/**
 * 2x2 Matrix Multiplication for Single Qubit Gates
 * State vector: [alpha, beta] where alpha, beta are complex numbers {r: real, i: imag}
 */

export const COMPLEX = {
  create: (r = 0, i = 0) => ({ r, i }),
  add: (a, b) => ({ r: a.r + b.r, i: a.i + b.i }),
  sub: (a, b) => ({ r: a.r - b.r, i: a.i - b.i }),
  mul: (a, b) => ({ r: a.r * b.r - a.i * b.i, i: a.r * b.i + a.i * b.r }),
  mulScalar: (a, s) => ({ r: a.r * s, i: a.i * s }),
  magSq: (a) => a.r * a.r + a.i * a.i,
  mag: (a) => Math.sqrt(a.r * a.r + a.i * a.i),
  phase: (a) => Math.atan2(a.i, a.r),
};

const SQRT1_2 = Math.SQRT1_2; // 1 / sqrt(2)

// Standard Quantum Gate Matrices (2x2)
export const GATES = {
  I: [
    [COMPLEX.create(1, 0), COMPLEX.create(0, 0)],
    [COMPLEX.create(0, 0), COMPLEX.create(1, 0)]
  ],
  X: [
    [COMPLEX.create(0, 0), COMPLEX.create(1, 0)],
    [COMPLEX.create(1, 0), COMPLEX.create(0, 0)]
  ],
  Y: [
    [COMPLEX.create(0, 0), COMPLEX.create(0, -1)],
    [COMPLEX.create(0, 1), COMPLEX.create(0, 0)]
  ],
  Z: [
    [COMPLEX.create(1, 0), COMPLEX.create(0, 0)],
    [COMPLEX.create(0, 0), COMPLEX.create(-1, 0)]
  ],
  H: [
    [COMPLEX.create(SQRT1_2, 0), COMPLEX.create(SQRT1_2, 0)],
    [COMPLEX.create(SQRT1_2, 0), COMPLEX.create(-SQRT1_2, 0)]
  ],
  S: [
    [COMPLEX.create(1, 0), COMPLEX.create(0, 0)],
    [COMPLEX.create(0, 0), COMPLEX.create(0, 1)]
  ],
  T: [
    [COMPLEX.create(1, 0), COMPLEX.create(0, 0)],
    [COMPLEX.create(0, 0), COMPLEX.create(SQRT1_2, SQRT1_2)]
  ]
};

/**
 * Apply a 2x2 gate matrix to a single qubit state [alpha, beta]
 */
export function applyGate(gateMatrix, state = [COMPLEX.create(1, 0), COMPLEX.create(0, 0)]) {
  const [alpha, beta] = state;
  const newAlpha = COMPLEX.add(
    COMPLEX.mul(gateMatrix[0][0], alpha),
    COMPLEX.mul(gateMatrix[0][1], beta)
  );
  const newBeta = COMPLEX.add(
    COMPLEX.mul(gateMatrix[1][0], alpha),
    COMPLEX.mul(gateMatrix[1][1], beta)
  );
  return [newAlpha, newBeta];
}

/**
 * Calculate Bloch sphere coordinates (x, y, z) from single qubit state [alpha, beta]
 */
export function getBlochCoordinates(state) {
  const [alpha, beta] = state;
  // x = 2 * Re(alpha * conj(beta))
  // y = 2 * Im(conj(alpha) * beta)
  // z = |alpha|^2 - |beta|^2
  const conjBeta = COMPLEX.create(beta.r, -beta.i);
  const alphaConjBeta = COMPLEX.mul(alpha, conjBeta);
  
  const x = 2 * alphaConjBeta.r;
  const y = 2 * (alpha.r * beta.i - alpha.i * beta.r);
  const z = COMPLEX.magSq(alpha) - COMPLEX.magSq(beta);

  // Theta (polar angle from Z axis / North pole |0>)
  // Phi (azimuthal angle from X axis in XY plane)
  const theta = Math.acos(Math.max(-1, Math.min(1, z)));
  const phi = Math.atan2(y, x);

  return { x, y, z, theta, phi };
}

/**
 * Calculate probabilities of measuring |0> and |1>
 */
export function getProbabilities(state) {
  const p0 = COMPLEX.magSq(state[0]);
  const p1 = COMPLEX.magSq(state[1]);
  const total = p0 + p1 || 1;
  return {
    p0: Math.round((p0 / total) * 1000) / 10,
    p1: Math.round((p1 / total) * 1000) / 10,
    prob0Raw: p0 / total,
    prob1Raw: p1 / total
  };
}

/**
 * Simulate 2-Qubit State for Entanglement & Grover's
 * Basis: [|00>, |01>, |10>, |11>]
 */
export function simulateTwoQubitCircuit(appliedGates = []) {
  // Start in |00>
  let state = [
    COMPLEX.create(1, 0), // |00>
    COMPLEX.create(0, 0), // |01>
    COMPLEX.create(0, 0), // |10>
    COMPLEX.create(0, 0)  // |11>
  ];

  for (const gate of appliedGates) {
    if (gate.type === 'H' && gate.target === 0) {
      // H on qubit 0 (control / upper wire)
      const newState = [
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0)
      ];
      // |00> -> 1/sqrt(2)(|00> + |10>)
      // |01> -> 1/sqrt(2)(|01> + |11>)
      // |10> -> 1/sqrt(2)(|00> - |10>)
      // |11> -> 1/sqrt(2)(|01> - |11>)
      newState[0] = COMPLEX.mulScalar(COMPLEX.add(state[0], state[2]), SQRT1_2);
      newState[1] = COMPLEX.mulScalar(COMPLEX.add(state[1], state[3]), SQRT1_2);
      newState[2] = COMPLEX.mulScalar(COMPLEX.sub(state[0], state[2]), SQRT1_2);
      newState[3] = COMPLEX.mulScalar(COMPLEX.sub(state[1], state[3]), SQRT1_2);
      state = newState;
    } else if (gate.type === 'H' && gate.target === 1) {
      // H on qubit 1 (target / lower wire)
      const newState = [
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0),
        COMPLEX.create(0, 0)
      ];
      newState[0] = COMPLEX.mulScalar(COMPLEX.add(state[0], state[1]), SQRT1_2);
      newState[1] = COMPLEX.mulScalar(COMPLEX.sub(state[0], state[1]), SQRT1_2);
      newState[2] = COMPLEX.mulScalar(COMPLEX.add(state[2], state[3]), SQRT1_2);
      newState[3] = COMPLEX.mulScalar(COMPLEX.sub(state[2], state[3]), SQRT1_2);
      state = newState;
    } else if (gate.type === 'X' && gate.target === 0) {
      // Swap (00 <-> 10, 01 <-> 11)
      state = [state[2], state[3], state[0], state[1]];
    } else if (gate.type === 'X' && gate.target === 1) {
      // Swap (00 <-> 01, 10 <-> 11)
      state = [state[1], state[0], state[3], state[2]];
    } else if (gate.type === 'CNOT') {
      // Control q0, Target q1: if q0 is 1, flip q1. So |10> <-> |11>
      state = [state[0], state[1], state[3], state[2]];
    } else if (gate.type === 'ORACLE_11') {
      // Phase flip on target state |11> (Grover's Oracle for |11>)
      state[3] = COMPLEX.mulScalar(state[3], -1);
    } else if (gate.type === 'DIFFUSION') {
      // 2-qubit Grover Diffusion Operator: 2|s><s| - I
      // |s> = 1/2(|00> + |01> + |10> + |11>)
      const avg = COMPLEX.mulScalar(
        COMPLEX.add(COMPLEX.add(state[0], state[1]), COMPLEX.add(state[2], state[3])),
        0.25
      );
      state = state.map(amp => COMPLEX.sub(COMPLEX.mulScalar(avg, 2), amp));
    }
  }

  // Calculate 2-qubit probabilities
  const probs = state.map(amp => COMPLEX.magSq(amp));
  const sum = probs.reduce((a, b) => a + b, 0) || 1;
  const probabilities = {
    '00': Math.round((probs[0] / sum) * 1000) / 10,
    '01': Math.round((probs[1] / sum) * 1000) / 10,
    '10': Math.round((probs[2] / sum) * 1000) / 10,
    '11': Math.round((probs[3] / sum) * 1000) / 10
  };

  return { state, probabilities };
}

/**
 * Measure a single-qubit state probabilistically
 */
export function measureQubit(state) {
  const p0 = COMPLEX.magSq(state[0]);
  const rand = Math.random();
  const outcome = rand < p0 ? '0' : '1';
  const collapsedState = outcome === '0'
    ? [COMPLEX.create(1, 0), COMPLEX.create(0, 0)]
    : [COMPLEX.create(0, 0), COMPLEX.create(1, 0)];
  return { outcome, collapsedState };
}

/**
 * Format state into bra-ket notation string: α|0⟩ + β|1⟩
 */
export function formatKet(state) {
  const [a, b] = state;
  const aStr = Math.abs(a.r) < 0.001 ? (Math.abs(a.i) < 0.001 ? '0' : `${a.i.toFixed(2)}i`) : a.r.toFixed(2);
  const bStr = Math.abs(b.r) < 0.001 ? (Math.abs(b.i) < 0.001 ? '0' : `${b.i.toFixed(2)}i`) : b.r.toFixed(2);
  
  if (aStr === '1.00' && bStr === '0') return '|0⟩';
  if (aStr === '0' && bStr === '1.00') return '|1⟩';
  if (Math.abs(a.r - SQRT1_2) < 0.05 && Math.abs(b.r - SQRT1_2) < 0.05) return '|+⟩ = (|0⟩ + |1⟩)/√2';
  if (Math.abs(a.r - SQRT1_2) < 0.05 && Math.abs(b.r - -SQRT1_2) < 0.05) return '|-⟩ = (|0⟩ - |1⟩)/√2';

  return `${aStr}|0⟩ + ${bStr}|1⟩`;
}
