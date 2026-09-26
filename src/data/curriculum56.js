// Complete 56-Level Curriculum across 10 Units aligned to IBM Quantum Learning principles

export const UNITS_CONFIG = [
  {
    id: 1,
    unitNumber: 1,
    title: "Unit 1: Computing Foundations",
    subtitle: "Information, Bits, Logic & Mathematical Prerequisites",
    color: "bg-duo-green",
    borderColor: "border-duo-greenDark",
    textColor: "text-emerald-800",
    lightBg: "bg-emerald-50",
    levelRange: [1, 10],
    description: "Build an absolute zero-to-one foundation in classical information, bits, binary logic, probability, vectors, complex numbers, and the gateway to quantum mechanics."
  },
  {
    id: 2,
    unitNumber: 2,
    title: "Unit 2: Qubits & Quantum States",
    subtitle: "Superposition, Measurement & The Bloch Sphere",
    color: "bg-duo-blue",
    borderColor: "border-duo-blueDark",
    textColor: "text-sky-800",
    lightBg: "bg-sky-50",
    levelRange: [11, 15],
    description: "Enter the quantum realm: Statevectors, Dirac bra-ket notation, probability amplitudes, wave function collapse, and 3D Bloch sphere representation."
  },
  {
    id: 3,
    unitNumber: 3,
    title: "Unit 3: Single-Qubit Quantum Gates",
    subtitle: "Pauli Unitaries, Hadamard, Phase & Rotation Gates",
    color: "bg-duo-purple",
    borderColor: "border-duo-purpleDark",
    textColor: "text-purple-800",
    lightBg: "bg-purple-50",
    levelRange: [16, 20],
    description: "Learn reversible unitary operators: Pauli-X, Y, Z, Hadamard (H), Phase (S, T), and arbitrary continuous Bloch rotations (RX, RY, RZ)."
  },
  {
    id: 4,
    unitNumber: 4,
    title: "Unit 4: Quantum Circuits & Multi-Qubit Systems",
    subtitle: "Circuit Schematics, Tensor Products & CNOT Gate",
    color: "bg-duo-amber",
    borderColor: "border-duo-amberDark",
    textColor: "text-amber-800",
    lightBg: "bg-amber-50",
    levelRange: [21, 25],
    description: "Read circuit diagrams across time steps, construct multi-qubit tensor product basis states (|00⟩, |01⟩, |10⟩, |11⟩), and apply the Controlled-NOT (CNOT) gate."
  },
  {
    id: 5,
    unitNumber: 5,
    title: "Unit 5: Entanglement & Quantum Information",
    subtitle: "Bell States, No-Cloning Theorem & Quantum Teleportation",
    color: "bg-pink-500",
    borderColor: "border-pink-700",
    textColor: "text-pink-800",
    lightBg: "bg-pink-50",
    levelRange: [26, 30],
    description: "Harness non-local quantum correlations, construct the 4 Bell basis states, prove the No-Cloning theorem, and execute the Quantum Teleportation protocol."
  },
  {
    id: 6,
    unitNumber: 6,
    title: "Unit 6: Quantum Algorithm Foundations",
    subtitle: "Query Complexity, Oracles, Deutsch-Jozsa & Bernstein-Vazirani",
    color: "bg-indigo-600",
    borderColor: "border-indigo-800",
    textColor: "text-indigo-800",
    lightBg: "bg-indigo-50",
    levelRange: [31, 36],
    description: "Understand quantum query models and phase kickback. Master the Deutsch, Deutsch-Jozsa, Bernstein-Vazirani, and Simon's hidden-period algorithms."
  },
  {
    id: 7,
    unitNumber: 7,
    title: "Unit 7: Quantum Search & Grover's Algorithm",
    subtitle: "Unstructured Search & Amplitude Amplification",
    color: "bg-cyan-600",
    borderColor: "border-cyan-800",
    textColor: "text-cyan-800",
    lightBg: "bg-cyan-50",
    levelRange: [37, 40],
    description: "Explore the quadratic speedup O(√N) of Grover's search algorithm through Phase Oracles and Diffusion Operators (inversion about the mean)."
  },
  {
    id: 8,
    unitNumber: 8,
    title: "Unit 8: Quantum Fourier Transform & Phase Estimation",
    subtitle: "Wave Interference, QFT Circuits & Eigenvalue Estimation",
    color: "bg-violet-600",
    borderColor: "border-violet-800",
    textColor: "text-violet-800",
    lightBg: "bg-violet-50",
    levelRange: [41, 44],
    description: "Transition from standard basis to the Fourier phase basis. Implement the Quantum Fourier Transform (QFT) and Quantum Phase Estimation (QPE)."
  },
  {
    id: 9,
    unitNumber: 9,
    title: "Unit 9: Shor's Factoring & Quantum Cryptography",
    subtitle: "Period Finding, Prime Factorization & BB84 QKD Protocol",
    color: "bg-rose-600",
    borderColor: "border-rose-800",
    textColor: "text-rose-800",
    lightBg: "bg-rose-50",
    levelRange: [45, 49],
    description: "Discover Shor's exponential quantum speedup for integer factorization, and secure communications via Quantum Key Distribution (BB84 protocol)."
  },
  {
    id: 10,
    unitNumber: 10,
    title: "Unit 10: Advanced Quantum Computing & Hardware",
    subtitle: "VQE, QAOA, QML, Noise, Error Correction & Master Challenge",
    color: "bg-slate-800",
    borderColor: "border-slate-950",
    textColor: "text-slate-900",
    lightBg: "bg-slate-100",
    levelRange: [50, 56],
    description: "Explore NISQ hybrid variational algorithms (VQE, QAOA), Quantum Machine Learning, decoherence noise channels, surface-code error correction, and the Final Master Challenge."
  }
];

export const LEVELS_56_DATA = [
  // --- UNIT 1: COMPUTING FOUNDATIONS (Levels 1–10) ---
  {
    id: 1,
    unitId: 1,
    title: "What is Information?",
    subtitle: "Data, Digital Encodings & Physical States",
    icon: "info",
    tag: "FOUNDATIONS",
    xpReward: 30,
    overview: {
      heading: "Information as Physical Reality",
      description: "Information is not an abstract ghost—it is always encoded into the physical state of a system! Classical computers encode information using discrete binary digits (0 and 1). Every image, video, message, and program is ultimately a sequence of structured bits.",
      takeaway: "Information is physical. In classical computing, every message is resolved into definite discrete bits."
    },
    simType: "info-sorting",
    concepts: ["Information", "Data vs Information", "Binary Encoding", "Physical Bits"]
  },
  {
    id: 2,
    unitId: 1,
    title: "Classical Bits",
    subtitle: "Voltage Levels, 0s, 1s & Bit Strings",
    icon: "toggle_on",
    tag: "FOUNDATIONS",
    xpReward: 30,
    overview: {
      heading: "The Binary Building Block",
      description: "A classical bit is the fundamental atom of digital computing. It can exist in exactly one of two mutually exclusive states: 0 (low voltage) or 1 (high voltage). Grouping bits into bit-strings allows us to represent numbers, characters, and instructions.",
      takeaway: "A classical bit is strictly deterministic: at any given moment it is definitively 0 OR 1."
    },
    simType: "bit-flip",
    concepts: ["Bit", "0 and 1", "Bit Strings", "Voltage States"]
  },
  {
    id: 3,
    unitId: 1,
    title: "Binary Numbers",
    subtitle: "Base-2 Arithmetic, Place Values & Encoding",
    icon: "pin",
    tag: "FOUNDATIONS",
    xpReward: 30,
    overview: {
      heading: "Counting in Base-2",
      description: "While humans use decimal (Base-10 with digits 0-9), digital hardware calculates in binary (Base-2 with digits 0 and 1). Each position represents a power of two (1, 2, 4, 8, 16, 32...). For example, binary 1010₂ = 8 + 0 + 2 + 0 = 10₁₀.",
      takeaway: "n bits can represent 2ⁿ distinct discrete integers ranging from 0 to 2ⁿ - 1."
    },
    simType: "binary-converter",
    concepts: ["Base-2", "Place Value", "Binary Addition", "Integer Encoding"]
  },
  {
    id: 4,
    unitId: 1,
    title: "Classical Logic Gates",
    subtitle: "AND, OR, NOT, XOR & Truth Tables",
    icon: "account_tree",
    tag: "FOUNDATIONS",
    xpReward: 30,
    overview: {
      heading: "Boolean Algebra & Gate Circuits",
      description: "Classical computers execute logic by routing voltages through Boolean gates. NOT inverts a bit; AND outputs 1 only if all inputs are 1; OR outputs 1 if any input is 1; XOR outputs 1 if inputs differ. Notice that gates like AND and OR lose information (they are irreversible).",
      takeaway: "Standard classical logic gates are irreversible (many inputs map to one output, dissipating heat)."
    },
    simType: "logic-gates",
    concepts: ["Boolean Logic", "NOT / AND / OR / XOR", "Truth Tables", "Reversibility"]
  },
  {
    id: 5,
    unitId: 1,
    title: "Probability Basics",
    subtitle: "Random Variables, Distributions & Law of Large Numbers",
    icon: "casino",
    tag: "FOUNDATIONS",
    xpReward: 30,
    overview: {
      heading: "Quantifying Uncertainty",
      description: "Probability assigns a likelihood between 0 (impossible) and 1 (certain) to events. In classical coin flips, a fair coin lands Heads with P=0.5 and Tails with P=0.5. As we increase sample trials from 10 to 1,000, empirical frequencies converge to true theoretical probabilities.",
      takeaway: "Probabilities must always be non-negative and sum to exactly 1 (Normalization: Σ P = 1)."
    },
    simType: "coin-prob",
    concepts: ["Probability", "Normalisation", "Frequency", "Randomness"]
  },
  {
    id: 6,
    unitId: 1,
    title: "Vectors & Coordinate Spaces",
    subtitle: "Magnitude, Direction & Basis Coordinates",
    icon: "north_east",
    tag: "MATHEMATICS",
    xpReward: 35,
    overview: {
      heading: "Geometric Representation of States",
      description: "A vector is a mathematical object defined by magnitude and direction. In 2D space, a vector v = [x, y]ᵀ points from the origin to (x, y). In quantum mechanics, physical quantum states are represented as unit vectors living in a linear vector space (Hilbert space).",
      takeaway: "Quantum states are geometric vectors whose lengths are normalized to exactly 1."
    },
    simType: "vector-explorer",
    concepts: ["Vector", "Magnitude & Direction", "State Space", "Basis Vectors"]
  },
  {
    id: 7,
    unitId: 1,
    title: "Complex Numbers",
    subtitle: "Imaginary Unit i, Complex Plane & Modulus",
    icon: "calculate",
    tag: "MATHEMATICS",
    xpReward: 35,
    overview: {
      heading: "The Numbers Behind Quantum Waves",
      description: "A complex number has the form z = a + bi, where i = √(-1) is the imaginary unit. On the 2D Complex Plane, 'a' is the real component and 'b' is the imaginary component. The absolute magnitude squared |z|² = a² + b² defines quantum probabilities!",
      takeaway: "Quantum probability amplitudes are complex numbers, allowing wave interference to occur."
    },
    simType: "complex-plane",
    concepts: ["Imaginary Unit i", "Complex Plane", "Modulus |z|", "Complex Phase"]
  },
  {
    id: 8,
    unitId: 1,
    title: "Linear Algebra Essentials",
    subtitle: "Matrices, Matrix Multiplication & Transformations",
    icon: "grid_view",
    tag: "MATHEMATICS",
    xpReward: 35,
    overview: {
      heading: "Transforming Vectors with Matrices",
      description: "A matrix represents a linear transformation on vectors. Multiplying a 2x2 matrix by a 2D vector rotates, scales, or reflects it. The Identity matrix (I) leaves vectors unchanged. In quantum computing, all quantum logic gates are represented as 2x2 or 4x4 unitary matrices!",
      takeaway: "Quantum gate operations are matrix-vector multiplications that rotate statevectors."
    },
    simType: "matrix-transformer",
    concepts: ["Matrix", "Matrix Multiplication", "Identity Matrix", "Linear Transformations"]
  },
  {
    id: 9,
    unitId: 1,
    title: "Classical vs. Quantum Computing",
    subtitle: "Fundamental Paradigm Shift: Bits vs. Qubits",
    icon: "compare_arrows",
    tag: "FOUNDATIONS",
    xpReward: 35,
    overview: {
      heading: "Two Radically Different Physics",
      description: "Classical computers operate under Newtonian physics: bits are definite switches (0 or 1). Quantum computers operate under quantum mechanics: qubits exploit superposition and entanglement, enabling constructive and destructive wave interference across vast computational paths.",
      takeaway: "Quantum computers do not just 'try all answers in parallel'—they use interference to cancel wrong paths and amplify correct solutions."
    },
    simType: "bit-vs-qubit",
    concepts: ["Bit vs Qubit", "Classical State", "Quantum State", "Computational Advantage"]
  },
  {
    id: 10,
    unitId: 1,
    title: "Quantum Computing Preview",
    subtitle: "The Gateway: Superposition, Interference & Entanglement",
    icon: "lock_open",
    tag: "GATEWAY",
    xpReward: 50,
    overview: {
      heading: "Welcome to the Quantum Frontier",
      description: "You have built the essential foundation in information, bits, probability, vectors, and complex matrices. You are now equipped with the mathematical language needed to explore true quantum phenomena: Superposition, Measurement Collapse, Unitary Gates, and Entanglement!",
      takeaway: "Gateway Complete: Quantum Mode is now officially unlocked for Level 11 onwards!"
    },
    simType: "gateway-preview",
    concepts: ["Superposition Preview", "Measurement Preview", "Gate Preview", "Quantum Mode Unlocked"]
  },

  // --- UNIT 2: QUBITS & QUANTUM STATES (Levels 11–15) ---
  {
    id: 11,
    unitId: 2,
    title: "What is a Qubit?",
    subtitle: "Dirac Bra-Ket Notation & Computational Basis |0⟩, |1⟩",
    icon: "science",
    tag: "QUANTUM CORE",
    xpReward: 40,
    overview: {
      heading: "Dirac Notation & Quantum Basis",
      description: "A qubit (quantum bit) is a two-level quantum system. We write states using Dirac bra-ket notation: |0⟩ represents standard column vector [1, 0]ᵀ and |1⟩ represents [0, 1]ᵀ. Together, {|0⟩, |1⟩} form the orthonormal computational basis.",
      takeaway: "Any single qubit state is written as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex amplitudes."
    },
    simType: "qubit-basis",
    concepts: ["Qubit", "Dirac Notation |ψ⟩", "Basis States |0⟩ & |1⟩", "Statevector"]
  },
  {
    id: 12,
    unitId: 2,
    title: "Superposition",
    subtitle: "Linear Combinations, Amplitudes α, β & Normalization",
    icon: "waves",
    tag: "QUANTUM CORE",
    xpReward: 40,
    overview: {
      heading: "Coexisting in Linear Combination",
      description: "Superposition means a qubit can exist in a linear combination α|0⟩ + β|1⟩. The coefficients α and β are probability amplitudes. To conserve total probability, all valid quantum states must obey the normalization condition: |α|² + |β|² = 1.",
      takeaway: "Equal superposition |+⟩ = (|0⟩ + |1⟩)/√2 has α = 1/√2 and β = 1/√2, giving 50% |0⟩ and 50% |1⟩."
    },
    simType: "superposition-slider",
    concepts: ["Superposition", "Amplitudes α, β", "Normalization |α|² + |β|² = 1", "|+⟩ State"]
  },
  {
    id: 13,
    unitId: 2,
    title: "Quantum Measurement",
    subtitle: "The Born Rule & Wave Function Collapse",
    icon: "sensors",
    tag: "QUANTUM CORE",
    xpReward: 40,
    overview: {
      heading: "Observation Collapses the Quantum State",
      description: "Before measurement, a qubit evolves deterministically. But the moment we measure it in the computational basis, the superposition instantly collapses to either |0⟩ (with probability |α|²) or |1⟩ (with probability |β|²). You can never measure 'half a qubit'.",
      takeaway: "Measurement is non-unitary and irreversible—it projects the continuous statevector into a single basis state."
    },
    simType: "measurement-chamber",
    concepts: ["Measurement", "Born Rule", "Wave Function Collapse", "Measurement Statistics"]
  },
  {
    id: 14,
    unitId: 2,
    title: "The Bloch Sphere",
    subtitle: "Geometric Qubit Representation on the Unit Sphere (θ, φ)",
    icon: "language",
    tag: "QUANTUM CORE",
    xpReward: 40,
    overview: {
      heading: "Visualizing Pure Single-Qubit States",
      description: "Every pure single-qubit state maps to a unique point on the surface of the 3D unit Bloch Sphere! Parameterized by polar angle θ (0 to π) and azimuthal angle φ (0 to 2π): |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩. North pole is |0⟩, South pole is |1⟩.",
      takeaway: "The Bloch sphere allows us to visualize quantum gate operations as physical 3D rotations."
    },
    simType: "bloch-sphere-interactive",
    concepts: ["Bloch Sphere", "Polar Angle θ", "Azimuthal Angle φ", "Bloch Vector"]
  },
  {
    id: 15,
    unitId: 2,
    title: "Quantum Phase",
    subtitle: "Global vs. Relative Phase & Interference",
    icon: "tune",
    tag: "QUANTUM CORE",
    xpReward: 40,
    overview: {
      heading: "Relative Phase Drives Interference",
      description: "A global phase e^(iγ)|ψ⟩ is physically unobservable. However, a relative phase between basis states—such as in |+⟩ = (|0⟩ + |1⟩)/√2 versus |-⟩ = (|0⟩ - |1⟩)/√2—dramatically alters how quantum amplitudes interfere when subsequent gates are applied!",
      takeaway: "Relative phase differences are the engine of constructive and destructive interference in quantum algorithms."
    },
    simType: "phase-explorer",
    concepts: ["Global Phase", "Relative Phase e^(iφ)", "|+⟩ vs |-⟩", "Phase Interference"]
  },

  // --- UNIT 3: QUANTUM GATES (Levels 16–20) ---
  {
    id: 16,
    unitId: 3,
    title: "The Pauli-X Gate",
    subtitle: "Quantum NOT Gate, Bit Flip & 180° X-Rotation",
    icon: "swap_horiz",
    tag: "GATES",
    xpReward: 40,
    overview: {
      heading: "The Quantum Bit-Flip Operator",
      description: "The Pauli-X gate is the quantum analog of the classical NOT gate. It flips |0⟩ ➔ |1⟩ and |1⟩ ➔ |0⟩. In matrix form: X = [[0, 1], [1, 0]]. On the Bloch sphere, it rotates the statevector by π radians (180°) around the X-axis.",
      takeaway: "X is unitary and self-inverse: X² = I. Applying X twice returns the qubit to its original state."
    },
    simType: "gate-x-lab",
    concepts: ["Pauli-X", "Bit Flip", "Matrix Representation", "Self-Inverse X² = I"]
  },
  {
    id: 17,
    unitId: 3,
    title: "The Pauli-Y and Pauli-Z Gates",
    subtitle: "Phase Flip & Complex Unitary Rotations",
    icon: "sync_alt",
    tag: "GATES",
    xpReward: 40,
    overview: {
      heading: "Bit-Flips, Phase-Flips & Complex Unitaries",
      description: "Pauli-Z leaves |0⟩ unchanged and flips the phase of |1⟩ to -|1⟩: Z = [[1, 0], [0, -1]]. Pauli-Y combines both a bit-flip and a phase-flip: Y = [[0, -i], [i, 0]]. Together, {I, X, Y, Z} form the fundamental Pauli matrix basis.",
      takeaway: "Pauli-Z transforms |+⟩ into |-⟩ and vice versa without altering the measurement probabilities in computational basis."
    },
    simType: "gate-yz-lab",
    concepts: ["Pauli-Y", "Pauli-Z", "Phase Flip", "Pauli Basis"]
  },
  {
    id: 18,
    unitId: 3,
    title: "The Hadamard (H) Gate",
    subtitle: "Creating Superposition & Fourier Basis Change",
    icon: "auto_awesome",
    tag: "GATES",
    xpReward: 45,
    overview: {
      heading: "The Quantum Superposition Engine",
      description: "The Hadamard (H) gate is the cornerstone of quantum algorithms. It maps computational basis states into balanced superposition states: H|0⟩ = |+⟩ and H|1⟩ = |-⟩. In matrix form: H = (1/√2)[[1, 1], [1, -1]].",
      takeaway: "Hadamard is self-inverse: H² = I. Applying H twice cancels the superposition and restores the exact original basis state."
    },
    simType: "hadamard-lab",
    concepts: ["Hadamard Gate", "Creating Superposition", "H² = I", "Basis Transformation"]
  },
  {
    id: 19,
    unitId: 3,
    title: "Phase (S) and T Gates",
    subtitle: "π/2 (Quarter) and π/4 (Eighth) Phase Rotations",
    icon: "pie_chart",
    tag: "GATES",
    xpReward: 45,
    overview: {
      heading: "Fine-Grained Phase Control",
      description: "The S gate applies a π/2 (90°) phase shift to |1⟩: S = [[1, 0], [0, i]], meaning S² = Z. The T gate (also called the π/8 gate) applies a π/4 (45°) phase shift: T = [[1, 0], [0, e^(iπ/4)]], meaning T² = S. T is essential for universal fault-tolerant quantum computing!",
      takeaway: "The set {H, S, T, CNOT} forms a universal quantum gate set capable of approximating any quantum algorithm."
    },
    simType: "phase-st-lab",
    concepts: ["S Gate (Phase √Z)", "T Gate (π/4)", "Universal Gate Sets", "Phase Wheels"]
  },
  {
    id: 20,
    unitId: 3,
    title: "Rotation Gates: RX, RY, RZ",
    subtitle: "Continuous Arbitrary Angles θ on the Bloch Sphere",
    icon: "rotate_90_degrees_ccw",
    tag: "GATES",
    xpReward: 45,
    overview: {
      heading: "Continuous Geometric Rotations",
      description: "In variational quantum circuits and quantum machine learning, we apply parameterized rotation gates: RX(θ) = exp(-iθX/2), RY(θ) = exp(-iθY/2), and RZ(θ) = exp(-iθZ/2). These allow continuous rotations by any arbitrary angle θ around the corresponding coordinate axes.",
      takeaway: "Parameterized rotation gates form the trainable weights in quantum neural networks and VQE ansätze."
    },
    simType: "rotation-gates-lab",
    concepts: ["RX(θ)", "RY(θ)", "RZ(θ)", "Parameterized Circuits"]
  },

  // --- UNIT 4: QUANTUM CIRCUITS (Levels 21–25) ---
  {
    id: 21,
    unitId: 4,
    title: "Reading Quantum Circuits",
    subtitle: "Wires, Timesteps, Gate Alignment & Execution Flow",
    icon: "developer_board",
    tag: "CIRCUITS",
    xpReward: 45,
    overview: {
      heading: "The Language of Quantum Diagrams",
      description: "Quantum circuit diagrams represent quantum algorithms across time. Horizontal lines represent qubit wires (initialized in |0⟩). Time flows from left to right. Gate boxes represent unitary matrix operations applied sequentially to target wires.",
      takeaway: "Matrix multiplication order is right-to-left, but quantum circuit diagrams are read left-to-right!"
    },
    simType: "circuit-reader",
    concepts: ["Qubit Wires", "Time Evolution", "Sequential Gates", "Matrix Order vs Circuit Order"]
  },
  {
    id: 22,
    unitId: 4,
    title: "Build Your First Circuit",
    subtitle: "Composing Gate Sequences & State Tracking",
    icon: "build",
    tag: "CIRCUITS",
    xpReward: 45,
    overview: {
      heading: "Hands-on Circuit Assembly",
      description: "Now it's time to build your first composite quantum circuit! By placing gates in series, the output statevector of each gate becomes the input to the next gate. Track how amplitudes evolve step-by-step from input initialization to final measurement.",
      takeaway: "Composing Unitary operators U₂ · U₁ always yields another valid unitary operator."
    },
    simType: "circuit-builder-mini",
    concepts: ["Circuit Composition", "State Tracking", "Unitary Composition", "Wire Alignment"]
  },
  {
    id: 23,
    unitId: 4,
    title: "Circuit Execution & Measurement Shots",
    subtitle: "Statevector Simulation vs. Repeated Hardware Shots",
    icon: "play_circle",
    tag: "CIRCUITS",
    xpReward: 45,
    overview: {
      heading: "Simulating Ideal States vs. Sampling Shots",
      description: "An ideal quantum simulator tracks exact mathematical amplitudes. However, real quantum hardware cannot inspect amplitudes directly—it must run repeated trial 'shots' (e.g., 1024 shots) to build an empirical measurement frequency histogram.",
      takeaway: "Quantum algorithms repeat circuit runs (shots) to reconstruct probabilistic output distributions."
    },
    simType: "circuit-executor",
    concepts: ["Statevector vs Shots", "Measurement Histogram", "Sampling Noise", "Statistical Convergence"]
  },
  {
    id: 24,
    unitId: 4,
    title: "Multi-Qubit Systems",
    subtitle: "Tensor Products (⊗), 4-Dimensional Hilbert Space & Basis",
    icon: "hub",
    tag: "CIRCUITS",
    xpReward: 45,
    overview: {
      heading: "Exponential State Space Scaling",
      description: "When we combine two qubits, their joint state lives in a 4-dimensional Hilbert space spanned by {|00⟩, |01⟩, |10⟩, |11⟩}. The combined state is formed via the Kronecker tensor product: |ψ⟩ = |q₀⟩ ⊗ |q₁⟩. For n qubits, the state space expands exponentially to 2ⁿ dimensions!",
      takeaway: "An n-qubit quantum register requires 2ⁿ complex amplitudes, enabling astronomical state representations."
    },
    simType: "two-qubit-basis",
    concepts: ["Tensor Product ⊗", "Basis States |00⟩..|11⟩", "Exponential Scaling 2ⁿ", "Multi-Qubit Registers"]
  },
  {
    id: 25,
    unitId: 4,
    title: "The Controlled-NOT (CNOT) Gate",
    subtitle: "Two-Qubit Conditional Logic & Control/Target Wires",
    icon: "device_hub",
    tag: "CIRCUITS",
    xpReward: 50,
    overview: {
      heading: "Conditional Quantum Inversion",
      description: "The Controlled-NOT (CNOT / CX) gate acts on two qubits: a Control qubit (●) and a Target qubit (⊕). If the control is |1⟩, it applies Pauli-X to flip the target; if control is |0⟩, the target is untouched. In matrix form: [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]].",
      takeaway: "CNOT creates conditional interactions between qubits and is the primary tool for generating entanglement."
    },
    simType: "cnot-lab",
    concepts: ["CNOT Gate", "Control Qubit", "Target Qubit", "Two-Qubit Unitary"]
  },

  // --- UNIT 5: ENTANGLEMENT & QUANTUM INFORMATION (Levels 26–30) ---
  {
    id: 26,
    unitId: 5,
    title: "Entanglement Basics",
    subtitle: "Non-Separable Quantum States & Spooky Action",
    icon: "all_inclusive",
    tag: "ENTANGLEMENT",
    xpReward: 50,
    overview: {
      heading: "States That Cannot Be Factored",
      description: "A two-qubit state is entangled if it cannot be written as a product of individual qubit states: |ψ⟩ ≠ |q₀⟩ ⊗ |q₁⟩. The qubits share a unified quantum wave function. Measuring one qubit instantaneously dictates the state of the other, regardless of physical separation!",
      takeaway: "Entangled states exhibit correlations stronger than any possible classical physics allows (Bell Inequality violation)."
    },
    simType: "entanglement-sim",
    concepts: ["Entanglement", "Non-Separability", "Quantum Correlations", "EPR Paradox"]
  },
  {
    id: 27,
    unitId: 5,
    title: "The Four Bell States",
    subtitle: "Maximally Entangled Orthonormal Basis (|Φ±⟩, |Ψ±⟩)",
    icon: "stars",
    tag: "ENTANGLEMENT",
    xpReward: 50,
    overview: {
      heading: "The Canonical Entangled Basis",
      description: "The four maximally entangled Bell states form a complete orthonormal basis for 2 qubits: |Φ+⟩ = (|00⟩ + |11⟩)/√2, |Φ-⟩ = (|00⟩ - |11⟩)/√2, |Ψ+⟩ = (|01⟩ + |10⟩)/√2, and |Ψ-⟩ = (|01⟩ - |10⟩)/√2. Measuring one qubit in |Φ+⟩ instantly reveals the other with 100% agreement.",
      takeaway: "The Bell basis is the foundation of quantum teleportation, superdense coding, and quantum cryptography."
    },
    simType: "bell-states-generator",
    concepts: ["Bell States |Φ±⟩, |Ψ±⟩", "Maximal Entanglement", "Bell Basis", "Correlated Measurement"]
  },
  {
    id: 28,
    unitId: 5,
    title: "Building the Bell State Circuit",
    subtitle: "Hadamard on Control + CNOT on Target",
    icon: "share",
    tag: "ENTANGLEMENT",
    xpReward: 50,
    overview: {
      heading: "The Standard Entangler Circuit",
      description: "To create the Bell pair |Φ+⟩ = (|00⟩ + |11⟩)/√2: Start with |00⟩. 1. Apply Hadamard to q[0] ➔ (|0⟩ + |1⟩)|0⟩/√2 = (|00⟩ + |10⟩)/√2. 2. Apply CNOT(q[0] ➔ q[1]) ➔ (|00⟩ + |11⟩)/√2! Notice that outcomes |01⟩ and |10⟩ vanish completely (0% probability).",
      takeaway: "Circuit: |00⟩ ➔ [H on q0] ➔ [CNOT q0->q1] ➔ |Φ+⟩."
    },
    simType: "bell-circuit-builder",
    concepts: ["H + CNOT Circuit", "Creating Bell States", "Zero Probability States", "Measurement Verification"]
  },
  {
    id: 29,
    unitId: 5,
    title: "The No-Cloning Theorem",
    subtitle: "Why Arbitrary Unknown Quantum States Cannot Be Copied",
    icon: "content_copy",
    tag: "INFORMATION",
    xpReward: 50,
    overview: {
      heading: "Fundamental Conservation of Quantum Information",
      description: "A foundational theorem of quantum mechanics: It is mathematically impossible to create an identical copy of an arbitrary unknown quantum state |ψ⟩ using unitary operations. If cloning were possible, linearity would be violated: U(|ψ⟩|0⟩) cannot equal |ψ⟩|ψ⟩ for all states!",
      takeaway: "The No-Cloning theorem ensures the security of quantum cryptography and prevents quantum data replication."
    },
    simType: "no-cloning-challenge",
    concepts: ["No-Cloning Theorem", "Linearity of Quantum Mechanics", "Quantum Information Security"]
  },
  {
    id: 30,
    unitId: 5,
    title: "Quantum Teleportation",
    subtitle: "Transferring Quantum Information via Bell Pairs & Classical Bits",
    icon: "flight_takeoff",
    tag: "INFORMATION",
    xpReward: 55,
    overview: {
      heading: "Teleporting Unknown Quantum States",
      description: "Quantum Teleportation transmits an unknown qubit state |ψ⟩ from Alice to Bob without physically sending the qubit itself! Alice and Bob share a Bell pair. Alice performs a Bell measurement on |ψ⟩ and her half of the pair, sends 2 classical bits to Bob, and Bob applies Pauli corrections (X/Z) to reconstruct |ψ⟩ perfectly!",
      takeaway: "Teleportation requires: 1 Shared Bell Pair + 2 Classical Bits = Exact Quantum State Transfer."
    },
    simType: "teleportation-lab",
    concepts: ["Quantum Teleportation", "Shared Bell Pair", "Bell Measurement", "Classical Correction Gates"]
  },

  // --- UNIT 6: QUANTUM ALGORITHM FOUNDATIONS (Levels 31–36) ---
  {
    id: 31,
    unitId: 6,
    title: "What is a Quantum Algorithm?",
    subtitle: "Constructive vs. Destructive Wave Interference",
    icon: "psychology",
    tag: "ALGORITHMS",
    xpReward: 50,
    overview: {
      heading: "The Geometry of Quantum Speedup",
      description: "A quantum algorithm is a structured sequence of unitary gates designed to manipulate probability amplitudes. By orchestrating interference, incorrect computational paths interfere destructively (canceling out to 0%), while correct paths interfere constructively (amplifying to 100%).",
      takeaway: "Quantum algorithms solve problems by creating interference patterns, not by brute-force testing."
    },
    simType: "algo-intro",
    concepts: ["Quantum Algorithm", "Constructive Interference", "Destructive Interference", "Quantum Speedup"]
  },
  {
    id: 32,
    unitId: 6,
    title: "The Quantum Query Model & Oracles",
    subtitle: "Black-Box Unitaries & Phase Kickback",
    icon: "help_outline",
    tag: "ALGORITHMS",
    xpReward: 50,
    overview: {
      heading: "Querying Black-Box Oracles",
      description: "In query complexity, a problem is formulated as evaluating a black-box function f(x). A quantum oracle encodes f(x) as a unitary operator: Uf|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩. By placing the target qubit in |-⟩, Phase Kickback reflects the function value directly into the phase: (-1)^(f(x))|x⟩!",
      takeaway: "Phase kickback allows a quantum computer to evaluate global properties of a function in fewer queries than classical."
    },
    simType: "oracle-kickback",
    concepts: ["Quantum Oracle", "Black Box Query", "Phase Kickback", "Query Complexity"]
  },
  {
    id: 33,
    unitId: 6,
    title: "Deutsch's Algorithm",
    subtitle: "Determining Constant vs. Balanced Functions in 1 Query",
    icon: "splitscreen",
    tag: "ALGORITHMS",
    xpReward: 55,
    overview: {
      heading: "The First Demonstration of Quantum Advantage",
      description: "Deutsch's problem asks: For a 1-bit function f: {0,1} ➔ {0,1}, is f constant (f(0)=f(1)) or balanced (f(0)≠f(1))? Classically, you must query the function twice. Deutsch's algorithm solves it with 100% certainty in exactly ONE single quantum query using interference!",
      takeaway: "Deutsch's algorithm proved that quantum computers can solve specific query problems strictly faster than classical computers."
    },
    simType: "deutsch-algorithm",
    concepts: ["Deutsch Algorithm", "Constant vs Balanced", "Single Query Speedup", "Interference Resolution"]
  },
  {
    id: 34,
    unitId: 6,
    title: "Deutsch-Jozsa Algorithm",
    subtitle: "Scaling to N-Bit Functions: 1 Quantum Query vs. 2^(N-1)+1",
    icon: "speed",
    tag: "ALGORITHMS",
    xpReward: 55,
    overview: {
      heading: "Exponential Query Separation",
      description: "Deutsch-Jozsa generalizes Deutsch's algorithm to n-bit inputs. Classically, verifying whether an n-bit function is constant or balanced requires evaluating 2^(n-1) + 1 inputs in the worst case (exponential classical time). Deutsch-Jozsa determines the answer with 100% certainty in ONE single quantum query!",
      takeaway: "Deutsch-Jozsa provides an exponential query advantage over classical deterministic algorithms."
    },
    simType: "deutsch-jozsa-lab",
    concepts: ["Deutsch-Jozsa", "Exponential Query Speedup", "H^⊗n Superposition", "Global Property Determination"]
  },
  {
    id: 35,
    unitId: 6,
    title: "Bernstein-Vazirani Algorithm",
    subtitle: "Finding a Hidden Bit String s in Exactly 1 Query",
    icon: "vpn_key",
    tag: "ALGORITHMS",
    xpReward: 55,
    overview: {
      heading: "Extracting Hidden Binary Secrets",
      description: "Given a black-box function f(x) = s · x (mod 2) with a hidden n-bit string 's', a classical algorithm requires n queries to uncover s bit-by-bit. The Bernstein-Vazirani algorithm uncovers the entire n-bit string 's' simultaneously in exactly ONE single quantum query!",
      takeaway: "Bernstein-Vazirani demonstrates how quantum parallelism can decode complex linear structures instantaneously."
    },
    simType: "bernstein-vazirani-lab",
    concepts: ["Bernstein-Vazirani", "Hidden Bitstring s", "Inner Product Oracle", "Single Query Extraction"]
  },
  {
    id: 36,
    unitId: 6,
    title: "Simon's Algorithm",
    subtitle: "Finding Hidden Periodicities with Exponential Speedup",
    icon: "repeat",
    tag: "ALGORITHMS",
    xpReward: 55,
    overview: {
      heading: "The Inspiration Behind Shor's Factoring",
      description: "Simon's problem asks to find a hidden period 's' such that f(x) = f(y) if and only if x ⊕ y = s. Classically, this requires Ω(2^(n/2)) queries (exponential time). Simon's quantum algorithm solves it in O(n) polynomial queries, providing a provable exponential quantum speedup!",
      takeaway: "Simon's algorithm proved exponential speedup for periodicities and directly inspired Peter Shor to develop Shor's factoring algorithm."
    },
    simType: "simon-algorithm-lab",
    concepts: ["Simon's Algorithm", "Hidden Periodicity s", "Provable Exponential Speedup", "Precursor to Shor"]
  },

  // --- UNIT 7: QUANTUM SEARCH (Levels 37–40) ---
  {
    id: 37,
    unitId: 7,
    title: "Unstructured Search Problems",
    subtitle: "Classical O(N) Complexity vs. Quantum Database Search",
    icon: "search",
    tag: "SEARCH",
    xpReward: 50,
    overview: {
      heading: "The Needle in the Digital Haystack",
      description: "Searching an unsorted database of N items for 1 marked target classically requires checking items one by one—taking N/2 checks on average and N checks in the worst case (O(N) complexity). Can quantum mechanics speed up unstructured search without sorting the data?",
      takeaway: "Classical search cannot beat O(N) for unsorted data. Quantum search achieves O(√N)."
    },
    simType: "search-race",
    concepts: ["Unstructured Search", "Classical Complexity O(N)", "Quantum Speedup O(√N)", "Database Oracle"]
  },
  {
    id: 38,
    unitId: 7,
    title: "Grover's Algorithm Mechanics",
    subtitle: "Phase Inversion & Amplitude Amplification (2|s⟩⟨s| - I)",
    icon: "zoom_in",
    tag: "SEARCH",
    xpReward: 55,
    overview: {
      heading: "Inverting Amplitudes About the Mean",
      description: "Grover's algorithm alternates between two operators: 1. Oracle: Inverts the phase of the target state |ω⟩ ➔ -|ω⟩. 2. Diffusion Operator: Inverts all amplitudes about their average mean (2|s⟩⟨s| - I). This boosts the target amplitude while suppressing all non-target states!",
      takeaway: "Repeating Grover iterations ~ (π/4)√N times concentrates nearly 100% probability onto the target item."
    },
    simType: "grover-mechanics",
    concepts: ["Grover's Algorithm", "Phase Oracle", "Diffusion Operator", "Inversion About Mean"]
  },
  {
    id: 39,
    unitId: 7,
    title: "Building the Grover Circuit",
    subtitle: "H^⊗n ➔ Oracle ➔ Diffusion ➔ Measurement",
    icon: "construction",
    tag: "SEARCH",
    xpReward: 55,
    overview: {
      heading: "Assembling the Quantum Search Engine",
      description: "Let's construct the complete 2-qubit Grover circuit: 1. Initialize |00⟩ and apply H on all wires to create equal superposition. 2. Apply Phase Oracle for target |11⟩. 3. Apply Diffusion (H, X, CZ, X, H). 4. Measure! The target state |11⟩ is found with 100% certainty in 1 iteration.",
      takeaway: "Circuit: |00⟩ ➔ H^⊗2 ➔ Oracle ➔ Diffusion ➔ Measurement (|11⟩ = 100%)."
    },
    simType: "grover-builder",
    concepts: ["Grover Circuit", "2-Qubit Implementation", "CZ Gate", "Target Amplification"]
  },
  {
    id: 40,
    unitId: 7,
    title: "The Grover Challenge",
    subtitle: "Locating Hidden Items in a Quantum Database",
    icon: "emoji_events",
    tag: "SEARCH",
    xpReward: 60,
    overview: {
      heading: "Mastering Quantum Amplitude Amplification",
      description: "Put your quantum search skills to the test! A secret state is randomized in a 4-item or 8-item quantum register. Configure the oracle, execute the optimal number of Grover iterations, and measure the register to extract the hidden target with maximum fidelity.",
      takeaway: "Grover search provides an optimal quadratic speedup across database queries, cryptography preimage search, and SAT solvers."
    },
    simType: "grover-challenge",
    concepts: ["Optimal Iterations", "Arbitrary Target Oracles", "Measurement Fidelity", "Search Applications"]
  },

  // --- UNIT 8: QUANTUM FOURIER TRANSFORM (Levels 41–44) ---
  {
    id: 41,
    unitId: 8,
    title: "Fourier Transform Intuition",
    subtitle: "Time Domain, Frequency Domain & Wave Harmonics",
    icon: "graphic_eq",
    tag: "QFT",
    xpReward: 50,
    overview: {
      heading: "Decomposing Signals into Frequencies",
      description: "The classical Discrete Fourier Transform (DFT) converts a signal from its spatial/time domain into its constituent frequency components. In quantum mechanics, quantum states are waves! The Quantum Fourier Transform (QFT) transforms statevectors into phase basis frequencies.",
      takeaway: "Fourier transforms reveal hidden periodicities and frequencies encoded within complex signals."
    },
    simType: "fourier-waves",
    concepts: ["Fourier Transform", "Time vs Frequency", "Periodic Waves", "Phase Frequencies"]
  },
  {
    id: 42,
    unitId: 8,
    title: "The Quantum Fourier Transform (QFT)",
    subtitle: "Mapping Computational Basis to the Fourier Phase Basis",
    icon: "reorder",
    tag: "QFT",
    xpReward: 55,
    overview: {
      heading: "Exponential Computational Acceleration",
      description: "The classical Fast Fourier Transform (FFT) on 2ⁿ numbers requires O(n · 2ⁿ) operations. The Quantum Fourier Transform (QFT) performs this transformation in only O(n²) quantum gates—an exponential speedup! It maps basis states |j⟩ into product phase states: (1/√2ⁿ) Σ e^(2πi j k / 2ⁿ) |k⟩.",
      takeaway: "QFT performs Fourier transforms exponentially faster than the best classical FFT algorithms."
    },
    simType: "qft-math-lab",
    concepts: ["QFT Definition", "O(n²) Gate Complexity", "Exponential Speedup over FFT", "Phase Encoding"]
  },
  {
    id: 43,
    unitId: 8,
    title: "Building the QFT Circuit",
    subtitle: "Hadamard & Controlled Phase Rotation Gates (Rk)",
    icon: "schema",
    tag: "QFT",
    xpReward: 55,
    overview: {
      heading: "Controlled Phase Cascades & SWAP Gates",
      description: "A QFT circuit is constructed using a cascade of Hadamard gates and Controlled Phase Rotations Rk = [[1, 0], [0, e^(2πi/2^k)]], followed by final SWAP gates to reverse qubit order. For 3 qubits, it requires only 3 Hadamards and 3 controlled phase gates.",
      takeaway: "QFT decomposes into a recursive ladder of H and Controlled-Rk phase gates followed by wire SWAPs."
    },
    simType: "qft-circuit-builder",
    concepts: ["QFT Circuit", "Controlled Phase Gates Rk", "SWAP Gate Inversion", "Recursive Structure"]
  },
  {
    id: 44,
    unitId: 8,
    title: "Quantum Phase Estimation (QPE)",
    subtitle: "Estimating Eigenvalues of Unitary Operators (U|ψ⟩ = e^(2πiθ)|ψ⟩)",
    icon: "assessment",
    tag: "QFT",
    xpReward: 60,
    overview: {
      heading: "The Subroutine of Modern Quantum Algorithms",
      description: "Quantum Phase Estimation (QPE) determines the unknown phase angle θ in the eigenvalue equation U|ψ⟩ = e^(2πiθ)|ψ⟩. Using counting qubits, controlled-U²ʲ gates, and the Inverse QFT (QFT†), QPE writes θ directly into the measurement register!",
      takeaway: "QPE is the key quantum engine powering Shor's algorithm, quantum chemistry Hamiltonian simulation, and HHL matrix inversion."
    },
    simType: "qpe-simulator",
    concepts: ["Phase Estimation (QPE)", "Eigenvalue θ", "Inverse QFT†", "Controlled-Unitary Powers"]
  },

  // --- UNIT 9: SHOR & CRYPTOGRAPHY (Levels 45–49) ---
  {
    id: 45,
    unitId: 9,
    title: "Integer Factorization & Cryptography",
    subtitle: "Prime Numbers, RSA Encryption & Hardness of Factoring",
    icon: "enhanced_encryption",
    tag: "SHOR",
    xpReward: 55,
    overview: {
      heading: "The Security Backbone of the Modern Internet",
      description: "Modern public-key encryption (RSA) relies on the mathematical assumption that multiplying two large primes p and q is easy, but factoring their product N = p · q is computationally intractable for classical computers. The best classical algorithm (GNFS) requires sub-exponential time.",
      takeaway: "Breaking 2048-bit RSA classically would take billions of years of supercomputer time."
    },
    simType: "factoring-intro",
    concepts: ["RSA Encryption", "Prime Factorization", "Computational Complexity", "Classical Hardness"]
  },
  {
    id: 46,
    unitId: 9,
    title: "Shor's Factoring Algorithm",
    subtitle: "Reducing Factoring to Period Finding via Modular Exponentiation",
    icon: "lock_reset",
    tag: "SHOR",
    xpReward: 60,
    overview: {
      heading: "Factoring in Polynomial Time: O(n³)",
      description: "Peter Shor (1994) discovered that finding factors of N is equivalent to finding the period 'r' of the modular function f(x) = a^x (mod N). While classical computers struggle, quantum computers find period 'r' in polynomial time O(n³) using QFT and Phase Estimation!",
      takeaway: "Shor's algorithm breaks standard asymmetric RSA cryptography by solving period finding exponentially faster."
    },
    simType: "shor-algorithm-lab",
    concepts: ["Shor's Algorithm", "Period Finding r", "Modular Arithmetic a^x mod N", "Polynomial Time O(n³)"]
  },
  {
    id: 47,
    unitId: 9,
    title: "Shor Algorithm Simulator",
    subtitle: "Factoring Numbers Step-by-Step (N = 15, 21)",
    icon: "numbers",
    tag: "SHOR",
    xpReward: 60,
    overview: {
      heading: "Hands-on Factoring Workflow",
      description: "Let's factor N = 15 with co-prime a = 7: 1. Compute modular powers: 7¹ mod 15 = 7, 7² mod 15 = 4, 7³ mod 15 = 13, 7⁴ mod 15 = 1 ➔ Period r = 4. 2. Quantum QPE measures period r = 4. 3. Classical GCD: gcd(7^(4/2) - 1, 15) = gcd(48, 15) = 3; gcd(7^(4/2) + 1, 15) = gcd(50, 15) = 5. Factors 3 and 5 found!",
      takeaway: "Quantum period finding + Classical GCD = Rapid factorization of composite numbers."
    },
    simType: "shor-interactive-solver",
    concepts: ["Factoring N=15", "Period r=4", "Greatest Common Divisor (GCD)", "Classical Post-Processing"]
  },
  {
    id: 48,
    unitId: 9,
    title: "Quantum Cryptography Foundations",
    subtitle: "Security Guaranteed by the Laws of Physics",
    icon: "security",
    tag: "CRYPTOGRAPHY",
    xpReward: 55,
    overview: {
      heading: "Unbreakable Physical Security",
      description: "While quantum computers can break RSA, quantum mechanics also provides an unbreakable defense! Classical cryptography relies on unproven mathematical hardness. Quantum cryptography relies on the fundamental laws of physics: Measurement Collapse and the No-Cloning theorem.",
      takeaway: "Any eavesdropper attempting to intercept a quantum key irreversibly alters the states, immediately exposing their presence."
    },
    simType: "crypto-foundations",
    concepts: ["Quantum Cryptography", "Information-Theoretic Security", "Eavesdropping Detection", "No-Cloning Protection"]
  },
  {
    id: 49,
    unitId: 9,
    title: "The BB84 Protocol (QKD)",
    subtitle: "Quantum Key Distribution: Alice, Bob, Eve & Conjugate Bases",
    icon: "key",
    tag: "CRYPTOGRAPHY",
    xpReward: 60,
    overview: {
      heading: "Bennett & Brassard's 1984 Protocol",
      description: "In the BB84 protocol: Alice sends photons encoded randomly in Rectilinear basis (+: |0⟩, |1⟩) or Diagonal basis (×: |+⟩, |-⟩). Bob measures in randomly chosen bases (+ or ×). They compare basis choices over a public channel (sifting). If Eve intercepts, she introduces a detectable ~25% Quantum Bit Error Rate (QBER)!",
      takeaway: "BB84 produces a provably secure shared secret key between Alice and Bob with immediate intruder detection."
    },
    simType: "bb84-detector",
    concepts: ["BB84 Protocol", "Quantum Key Distribution", "Conjugate Bases (+ and ×)", "QBER Intruder Detection"]
  },

  // --- UNIT 10: ADVANCED QUANTUM COMPUTING (Levels 50–56) ---
  {
    id: 50,
    unitId: 10,
    title: "Variational Quantum Algorithms (VQA)",
    subtitle: "NISQ Era Hybrid Quantum-Classical Computing",
    icon: "memory",
    tag: "ADVANCED",
    xpReward: 60,
    overview: {
      heading: "The Hybrid Computing Paradigm",
      description: "Current Noisy Intermediate-Scale Quantum (NISQ) processors have limited coherence times. Variational Quantum Algorithms (VQAs) use shallow parameterized quantum circuits (ansatz) evaluated on quantum hardware, while a classical optimizer (COBYLA/SPSA) iteratively tunes gate angles θ to minimize a cost function.",
      takeaway: "Hybrid VQAs maximize quantum value today by offloading optimization loops to classical supercomputers."
    },
    simType: "vqa-optimizer",
    concepts: ["Variational Algorithms", "Hybrid Quantum-Classical", "Parameterized Ansatz U(θ)", "Classical Optimization Loop"]
  },
  {
    id: 51,
    unitId: 10,
    title: "Variational Quantum Eigensolver (VQE)",
    subtitle: "Simulating Molecular Ground States & Energy Minimization",
    icon: "biotech",
    tag: "ADVANCED",
    xpReward: 60,
    overview: {
      heading: "Quantum Chemistry & Molecular Ground States",
      description: "VQE finds the ground state energy of a molecular Hamiltonian H. Based on the Rayleigh-Ritz variational principle: ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀ (the measured expectation value is always an upper bound to the true ground state energy). VQE enables simulation of chemical bonds, battery materials, and catalysis!",
      takeaway: "VQE promises revolutionary breakthroughs in materials science, drug discovery, and clean energy."
    },
    simType: "vqe-simulator",
    concepts: ["VQE", "Molecular Hamiltonian H", "Ground State Energy E₀", "Rayleigh-Ritz Variational Principle"]
  },
  {
    id: 52,
    unitId: 10,
    title: "Quantum Approximate Optimization (QAOA)",
    subtitle: "Solving Combinatorial Optimization & Max-Cut Problems",
    icon: "alt_route",
    tag: "ADVANCED",
    xpReward: 60,
    overview: {
      heading: "Tackling NP-Hard Combinatorial Problems",
      description: "QAOA solves combinatorial optimization problems (like Max-Cut and Traveling Salesperson). It alternates between a Problem Hamiltonian cost layer (γ) and a Mixer Hamiltonian layer (β): e^(-iβB) e^(-iγC). Layering p steps progressively approximates the optimal graph partition.",
      takeaway: "QAOA provides heuristic quantum advantages for logistics routing, portfolio optimization, and graph coloring."
    },
    simType: "qaoa-lab",
    concepts: ["QAOA", "Max-Cut Problem", "Cost & Mixer Hamiltonians", "Combinatorial Optimization"]
  },
  {
    id: 53,
    unitId: 10,
    title: "Quantum Machine Learning (QML)",
    subtitle: "Quantum Feature Maps, Kernel Methods & Classifiers",
    icon: "psychology_alt",
    tag: "ADVANCED",
    xpReward: 60,
    overview: {
      heading: "Machine Learning in High-Dimensional Hilbert Spaces",
      description: "Quantum Machine Learning maps classical data x into high-dimensional quantum Hilbert spaces using Quantum Feature Maps Φ(x). Quantum Kernel estimators and Parameterized Quantum Classifiers can identify complex non-linear patterns that classical support vector machines cannot separate.",
      takeaway: "QML leverages exponentially large quantum feature spaces for pattern recognition and classification."
    },
    simType: "qml-classifier",
    concepts: ["Quantum Machine Learning", "Quantum Feature Maps", "Quantum Kernels", "Parameterized Classifiers"]
  },
  {
    id: 54,
    unitId: 10,
    title: "Quantum Noise & Decoherence",
    subtitle: "T1 Relaxation, T2 Dephasing, Bit-Flip & Phase-Flip Channels",
    icon: "grain",
    tag: "ADVANCED",
    xpReward: 60,
    overview: {
      heading: "The Challenge of Physical Hardware Fragility",
      description: "Physical qubits interact with their thermal environment, causing noise and decoherence. T₁ (Energy Relaxation time) measures how fast |1⟩ decays into |0⟩. T₂ (Dephasing time) measures the loss of relative phase coherence. Gate errors and readout errors limit circuit depth.",
      takeaway: "Overcoming environmental decoherence requires fault-tolerant quantum error correction."
    },
    simType: "noise-simulator",
    concepts: ["Decoherence", "T1 Relaxation Time", "T2 Dephasing Time", "Noise Channels (Bit/Phase Flip)"]
  },
  {
    id: 55,
    unitId: 10,
    title: "Quantum Error Correction (QEC)",
    subtitle: "Logical Qubits, Syndrome Measurement & Surface Codes",
    icon: "healing",
    tag: "ADVANCED",
    xpReward: 65,
    overview: {
      heading: "Protecting Fragile Quantum Information",
      description: "Because of No-Cloning and measurement collapse, quantum error correction cannot simply duplicate qubits. Instead, QEC entangles multiple physical qubits into one stable Logical Qubit! Syndrome measurements detect bit-flip (X) and phase-flip (Z) errors without collapsing the encoded data.",
      takeaway: "Surface codes use 2D grids of data and syndrome qubits to reach fault-tolerant thresholds for scalable computation."
    },
    simType: "qec-syndrome-lab",
    concepts: ["Logical vs Physical Qubits", "Quantum Error Correction", "Syndrome Measurements", "Surface Codes"]
  },
  {
    id: 56,
    unitId: 10,
    title: "QUANTUM MASTER CHALLENGE",
    subtitle: "Comprehensive Integration: From Qubits to Quantum Algorithms",
    icon: "military_tech",
    tag: "CAPSTONE",
    xpReward: 100,
    overview: {
      heading: "The Ultimate Quantum Capstone Challenge",
      description: "Congratulations on reaching the final summit! This comprehensive capstone integrates everything you have mastered across 56 levels: Qubits, Superposition, Bloch Spheres, Unitary Gates, Entanglement, Bell States, Teleportation, Deutsch-Jozsa, Grover, QFT, Shor, QKD, VQE, and Error Correction!",
      takeaway: "Mastery Achieved! Completing Level 56 unlocks the Final Comprehensive Certification Examination."
    },
    simType: "master-challenge",
    concepts: ["Full Curriculum Synthesis", "Circuit Architecture", "Algorithmic Speedups", "Certification Gateway"]
  }
];
