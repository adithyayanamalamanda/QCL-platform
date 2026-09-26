// Comprehensive Quantum Glossary, Mathematics Reference, Quantum Gates Directory & Algorithms Catalog

export const GLOSSARY_TERMS = [
  { term: "Bit", category: "Classical", def: "The basic unit of classical information, having strictly one of two values: 0 or 1." },
  { term: "Qubit", category: "Core", def: "A quantum bit; a two-level quantum system described as a unit vector in a 2-dimensional complex Hilbert space: |ψ⟩ = α|0⟩ + β|1⟩." },
  { term: "Superposition", category: "Core", def: "A principle of quantum mechanics where a system exists in a linear combination of multiple basis states simultaneously until measured." },
  { term: "Measurement", category: "Core", def: "An irreversible physical observation in the computational basis that collapses a superposition into a definite state with probability |amplitude|² (Born Rule)." },
  { term: "Probability Amplitude", category: "Math", def: "A complex number (α or β) whose squared absolute value (|α|²) equals the physical probability of measuring that state." },
  { term: "Dirac Notation", category: "Math", def: "Standard bra-ket notation for quantum states: ket |ψ⟩ represents a column vector, and bra ⟨ψ| represents its conjugate transpose row vector." },
  { term: "Bloch Sphere", category: "Core", def: "A geometrical unit sphere representing pure single-qubit states parameterized by polar angle θ and azimuthal angle φ." },
  { term: "Relative Phase", category: "Core", def: "The phase difference e^(iφ) between basis states in a superposition (e.g. |+⟩ vs |-⟩), creating constructive and destructive wave interference." },
  { term: "Global Phase", category: "Core", def: "An overall phase factor e^(iγ)|ψ⟩ applied to the entire state vector, which is physically unobservable in measurement." },
  { term: "Unitary Operator", category: "Math", def: "A linear transformation U whose conjugate transpose equals its inverse (U†U = I), preserving the norm and total probability (100%)." },
  { term: "Pauli-X Gate", category: "Gates", def: "The quantum NOT gate that flips |0⟩ ↔ |1⟩ by applying a 180° rotation around the Bloch X-axis: [[0, 1], [1, 0]]." },
  { term: "Pauli-Z Gate", category: "Gates", def: "The phase-flip gate that leaves |0⟩ unchanged and flips |1⟩ to -|1⟩: [[1, 0], [0, -1]]." },
  { term: "Hadamard Gate (H)", category: "Gates", def: "The fundamental superposition gate that maps |0⟩ ➔ |+⟩ and |1⟩ ➔ |-⟩: (1/√2)[[1, 1], [1, -1]]. It is self-inverse (H² = I)." },
  { term: "CNOT Gate", category: "Gates", def: "Controlled-NOT gate; a 2-qubit gate that flips the target qubit if and only if the control qubit is |1⟩." },
  { term: "Entanglement", category: "Core", def: "A quantum phenomenon where two or more qubits are linked such that the state of one cannot be described independently of the others." },
  { term: "Bell State", category: "Core", def: "One of four maximally entangled 2-qubit orthonormal basis states: (|00⟩ ± |11⟩)/√2 and (|01⟩ ± |10⟩)/√2." },
  { term: "No-Cloning Theorem", category: "Theory", def: "A fundamental theorem proving it is impossible to create an identical copy of an arbitrary unknown quantum state using unitary operations." },
  { term: "Quantum Teleportation", category: "Protocols", def: "A protocol to transmit an unknown quantum state using 1 shared Bell pair and 2 classical bits of communication." },
  { term: "Oracle", category: "Algorithms", def: "A black-box quantum unitary operator that encodes a mathematical function f(x), typically evaluating f(x) via phase kickback." },
  { term: "Phase Kickback", category: "Algorithms", def: "A quantum mechanism where applying an oracle to a target qubit in state |-⟩ kicks the function eigenvalue (-1)^f(x) into the control register's phase." },
  { term: "Grover's Algorithm", category: "Algorithms", def: "A quantum search algorithm providing quadratic speedup O(√N) for unstructured databases using Phase Inversion and Diffusion." },
  { term: "Diffusion Operator", category: "Algorithms", def: "The Grover reflection operator (2|s⟩⟨s| - I) that inverts all quantum amplitudes about their average mean." },
  { term: "Quantum Fourier Transform (QFT)", category: "Algorithms", def: "A quantum algorithm that converts a statevector into the Fourier phase basis in O(n²) gates, providing exponential speedup over classical FFT." },
  { term: "Phase Estimation (QPE)", category: "Algorithms", def: "A quantum subroutine that estimates the unknown phase eigenvalue θ of a unitary operator U|ψ⟩ = e^(2πiθ)|ψ⟩." },
  { term: "Shor's Algorithm", category: "Algorithms", def: "A quantum algorithm that factors integers in polynomial time O(n³), solving the period finding problem and breaking classical RSA encryption." },
  { term: "BB84 Protocol", category: "Protocols", def: "A Quantum Key Distribution (QKD) protocol using conjugate measurement bases (+ and ×) to detect eavesdroppers (Eve) via QBER." },
  { term: "VQE", category: "Variational", def: "Variational Quantum Eigensolver; a hybrid quantum-classical algorithm that computes molecular ground state energies." },
  { term: "QAOA", category: "Variational", def: "Quantum Approximate Optimization Algorithm; a variational algorithm designed for combinatorial optimization problems like Max-Cut." },
  { term: "Decoherence", category: "Hardware", def: "The loss of quantum coherence and phase information caused by environmental thermal noise and interactions." },
  { term: "Logical Qubit", category: "Hardware", def: "A fault-tolerant qubit encoded across multiple physical entangled qubits using quantum error correction codes (e.g. Surface Code)." }
];

export const GATES_CATALOG = [
  { name: "Hadamard (H)", symbol: "H", matrix: "1/√2 [[1, 1], [1, -1]]", effect: "Transforms |0⟩ ➔ |+⟩ and |1⟩ ➔ |-⟩. Creates equal superposition.", key: "H" },
  { name: "Pauli-X (NOT)", symbol: "X", matrix: "[[0, 1], [1, 0]]", effect: "Bit-flip. Flips |0⟩ ➔ |1⟩ and |1⟩ ➔ |0⟩. 180° rotation around X-axis.", key: "X" },
  { name: "Pauli-Y", symbol: "Y", matrix: "[[0, -i], [i, 0]]", effect: "Bit-flip + Phase-flip combined. 180° rotation around Y-axis.", key: "Y" },
  { name: "Pauli-Z", symbol: "Z", matrix: "[[1, 0], [0, -1]]", effect: "Phase-flip. Leaves |0⟩ unchanged; maps |1⟩ ➔ -|1⟩.", key: "Z" },
  { name: "Phase Gate (S)", symbol: "S", matrix: "[[1, 0], [0, i]]", effect: "90° (π/2) phase rotation around Z-axis. S² = Z.", key: "S" },
  { name: "T Gate (π/8)", symbol: "T", matrix: "[[1, 0], [0, e^(iπ/4)]]", effect: "45° (π/4) phase rotation around Z-axis. T² = S. Essential for universality.", key: "T" },
  { name: "Controlled-NOT (CNOT)", symbol: "CX", matrix: "4x4 Conditional Unitary", effect: "Flips target qubit if and only if control qubit is in state |1⟩.", key: "CNOT" },
  { name: "SWAP Gate", symbol: "SWAP", matrix: "4x4 Matrix", effect: "Swaps the quantum states of two qubits: |ab⟩ ➔ |ba⟩.", key: "SWAP" },
  { name: "RX(θ)", symbol: "RX", matrix: "exp(-iθX/2)", effect: "Rotates statevector by arbitrary continuous angle θ around X-axis.", key: "RX" },
  { name: "RY(θ)", symbol: "RY", matrix: "exp(-iθY/2)", effect: "Rotates statevector by arbitrary continuous angle θ around Y-axis.", key: "RY" },
  { name: "RZ(θ)", symbol: "RZ", matrix: "exp(-iθZ/2)", effect: "Rotates statevector by arbitrary continuous angle θ around Z-axis.", key: "RZ" }
];

export const ALGORITHMS_CATALOG = [
  {
    name: "Deutsch's Algorithm",
    year: 1985,
    speedup: "1 Query vs. 2 Classical",
    problem: "Determine whether a 1-bit function f(x) is constant (f(0)=f(1)) or balanced (f(0)≠f(1)).",
    idea: "Use Hadamard gates and phase kickback to evaluate f(0) ⊕ f(1) in a single quantum query.",
    complexity: "O(1) quantum vs O(2) classical."
  },
  {
    name: "Deutsch-Jozsa Algorithm",
    year: 1992,
    speedup: "Exponential Query Speedup",
    problem: "Determine whether an n-bit Boolean function is constant or balanced.",
    idea: "Initialize all n qubits in |+⟩, apply the Oracle Uf, and apply H^⊗n. Measure |00..0⟩ with 100% certainty if constant.",
    complexity: "1 quantum query vs 2^(n-1)+1 classical queries."
  },
  {
    name: "Bernstein-Vazirani Algorithm",
    year: 1993,
    speedup: "1 Query vs. n Classical",
    problem: "Find a hidden n-bit string 's' inside an oracle function f(x) = s · x (mod 2).",
    idea: "Phase kickback copies the entire hidden bit-string directly into the measurement register in one query.",
    complexity: "1 quantum query vs n classical queries."
  },
  {
    name: "Simon's Algorithm",
    year: 1994,
    speedup: "Exponential Speedup",
    problem: "Find a hidden period 's' in a 2-to-1 function where f(x) = f(y) iff x ⊕ y = s.",
    idea: "Sample linear equations s · y = 0 mod 2 using QFT on Z₂ⁿ and solve with classical Gaussian elimination.",
    complexity: "O(n) quantum vs Ω(2^(n/2)) classical."
  },
  {
    name: "Grover's Search Algorithm",
    year: 1996,
    speedup: "Quadratic Speedup O(√N)",
    problem: "Find a marked target item inside an unsorted database of N elements.",
    idea: "Alternate between Phase Oracle (marking winner) and Diffusion Operator (inverting amplitudes about the mean).",
    complexity: "O(√N) quantum vs O(N) classical."
  },
  {
    name: "Quantum Fourier Transform (QFT)",
    year: 1994,
    speedup: "Exponential Speedup O(n²)",
    problem: "Compute discrete Fourier transform over 2ⁿ state amplitudes.",
    idea: "Cascade Hadamard and controlled phase rotation gates Rk followed by wire SWAP gates.",
    complexity: "O(n²) quantum gates vs O(n · 2ⁿ) classical FFT."
  },
  {
    name: "Shor's Factoring Algorithm",
    year: 1994,
    speedup: "Exponential Speedup (Breaks RSA)",
    problem: "Factor a large composite integer N = p · q into prime factors.",
    idea: "Reduce factoring to order/period finding of f(x) = a^x mod N, and solve period 'r' using QPE/QFT.",
    complexity: "O(n³) polynomial time vs sub-exponential classical GNFS."
  },
  {
    name: "BB84 Quantum Key Distribution",
    year: 1984,
    speedup: "Information-Theoretic Security",
    problem: "Establish a shared private cryptographic key between Alice and Bob across an untrusted channel.",
    idea: "Encode bits in randomly chosen conjugate bases (+ and ×). Eavesdropping (Eve) introduces detectable error rate (QBER).",
    complexity: "Unconditional physical security based on quantum measurement collapse."
  },
  {
    name: "Variational Quantum Eigensolver (VQE)",
    year: 2014,
    speedup: "NISQ Chemistry Acceleration",
    problem: "Find the ground state energy of a molecular Hamiltonian H.",
    idea: "Prepare parameterized ansatz |ψ(θ)⟩ on quantum processor, measure energy ⟨H⟩, and update angles θ classically.",
    complexity: "Hybrid quantum-classical optimization loop."
  }
];
