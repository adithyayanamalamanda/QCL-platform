// Levels content and configuration for QuantumQuest

export const LEVELS_CONFIG = [
  {
    id: 1,
    title: "What is a Qubit?",
    subtitle: "Superposition & Coin-Flip Analogy",
    icon: "Atom",
    accentColor: "#8b5cf6", // Purple
    module: "Quantum Fundamentals",
    xpReward: 35,
    overview: {
      tag: "CORE CONCEPT",
      heading: "Classical Bit vs. Quantum Qubit",
      description: "A classical bit is like a coin resting on a table: it must be definitively either Heads (0) or Tails (1). A Qubit, however, is like a coin spinning in mid-air! While spinning, it exists in a 'Superposition'—a quantum blend of both |0⟩ and |1⟩ at the same time.",
      takeaway: "Superposition allows a quantum computer to explore many possibilities at once before measurement.",
      diagramType: "coin-spin"
    },
    simulator: {
      type: "superposition-intro",
      title: "Superposition Playground",
      instructions: "Click 'Spin Coin / Apply Hadamard' to set the qubit into equal superposition, or adjust the quantum amplitude slider to explore different state blends.",
      availableGates: ["H", "X", "RESET"],
      targetState: "equal_superposition",
      successHint: "Apply Hadamard (H) to get exactly 50% |0⟩ and 50% |1⟩!"
    },
    quiz: {
      question: "What is the primary difference between a classical bit and a quantum qubit?",
      options: [
        "A qubit can only store negative numbers.",
        "A qubit can exist in a superposition of both |0⟩ and |1⟩ simultaneously.",
        "A qubit is always 100 times faster than a regular CPU transistor.",
        "A qubit permanently loses its charge after 5 seconds."
      ],
      correctIndex: 1,
      explanation: "Superposition allows a qubit to hold a linear combination of |0⟩ and |1⟩ amplitudes simultaneously until it is measured!",
      mascotTip: "Think of the spinning coin! It's not just 0 or 1 until it lands on the table!"
    }
  },
  {
    id: 2,
    title: "Quantum Gates 101",
    subtitle: "Pauli-X & Hadamard (H) Gates",
    icon: "Zap",
    accentColor: "#06b6d4", // Cyan
    module: "Quantum Fundamentals",
    xpReward: 35,
    overview: {
      tag: "GATE OPERATIONS",
      heading: "Manipulating Quantum States",
      description: "Classical computers use logic gates (like NOT, AND). Quantum computers use Quantum Gates—mathematical rotations on the Bloch Sphere! The Pauli-X gate acts as a quantum NOT (flipping |0⟩ to |1⟩), while the Hadamard (H) gate transforms a definite state into a 50/50 superposition.",
      takeaway: "Quantum gates are reversible and preserve the total probability (100%).",
      diagramType: "gates-diagram"
    },
    simulator: {
      type: "single-qubit-gates",
      title: "Single Qubit Gate Lab",
      instructions: "Try applying the Pauli-X gate to flip the qubit, or Hadamard (H) gate to create superposition. Watch the Bloch sphere arrow and probability bars update live!",
      availableGates: ["X", "H", "Z", "Y", "RESET"],
      targetState: "state_one",
      successHint: "Apply Pauli-X to |0⟩ to turn the probability of |1⟩ to 100%!"
    },
    quiz: {
      question: "If a qubit starts in the |0⟩ state and you apply a Pauli-X gate, what state does it become?",
      options: [
        "|+⟩ equal superposition (50% |0⟩, 50% |1⟩)",
        "|1⟩ state with 100% probability",
        "It cancels out to 0% everywhere",
        "|0⟩ state with no change"
      ],
      correctIndex: 1,
      explanation: "The Pauli-X gate is the quantum NOT gate: X|0⟩ = |1⟩ and X|1⟩ = |0⟩.",
      mascotTip: "Pauli-X rotates the vector 180° around the X-axis from the North pole to the South pole!"
    }
  },
  {
    id: 3,
    title: "Building Circuits",
    subtitle: "Chaining Gates & Interference",
    icon: "GitBranch",
    accentColor: "#3b82f6", // Blue
    module: "Quantum Circuits",
    xpReward: 35,
    overview: {
      tag: "CIRCUIT FLOW",
      heading: "Interference & Reversibility",
      description: "When we chain multiple quantum gates together, quantum amplitudes can interfere constructively (reinforcing correct states) or destructively (canceling wrong states). Because gates are unitary, applying Hadamard twice in a row (H then H) returns the qubit right back to its original state!",
      takeaway: "H is its own inverse: H · H = Identity (I). Interference resets the superposition.",
      diagramType: "circuit-chain"
    },
    simulator: {
      type: "circuit-chain",
      title: "Interactive Circuit Sequencer",
      instructions: "Add gates to the circuit timeline. Chain 'H' then 'H' to observe how interference cancels out the superposition and restores |0⟩ with 100% certainty!",
      availableGates: ["H", "X", "Z"],
      targetSequence: ["H", "H"],
      successHint: "Add two Hadamard gates [H] [H] in sequence to verify H² = I!"
    },
    quiz: {
      question: "What happens when you apply the Hadamard gate (H) TWICE in a row to a qubit starting in |0⟩?",
      options: [
        "It stays in equal superposition permanently",
        "It explodes into quantum decoherence",
        "It returns back to the original |0⟩ state with 100% probability (H² = I)",
        "It becomes |1⟩"
      ],
      correctIndex: 2,
      explanation: "The Hadamard matrix is Hermitian and Unitary (H = H⁻¹), meaning applying it twice cancels itself out: H(H|0⟩) = |0⟩!",
      mascotTip: "Quantum gates are reversible! H makes a wave, the second H makes it interfere back into a point!"
    }
  },
  {
    id: 4,
    title: "Entanglement Basics",
    subtitle: "The CNOT Gate & Bell States",
    icon: "Network",
    accentColor: "#10b981", // Emerald
    module: "Quantum Information",
    xpReward: 35,
    overview: {
      tag: "QUANTUM MAGIC",
      heading: "Spooky Action & The Bell State",
      description: "Entanglement connects two qubits so their individual states can no longer be described separately. By combining a Hadamard gate on Qubit 0 with a Controlled-NOT (CNOT) gate between Qubit 0 and Qubit 1, we create the famous Bell State: (|00⟩ + |11⟩)/√2.",
      takeaway: "If you measure Qubit 0 as |1⟩, Qubit 1 is instantaneously guaranteed to be |1⟩ too!",
      diagramType: "entanglement-pair"
    },
    simulator: {
      type: "two-qubit-cnot",
      title: "Bell State Generator (2 Qubits)",
      instructions: "1. Apply H to Qubit 0 (creates superposition). 2. Apply CNOT (Q0 -> Q1). Look at the 2-qubit probability bars (|00⟩ and |11⟩ each 50%, with |01⟩ and |10⟩ at 0%)!",
      availableGates: ["H_Q0", "CNOT", "X_Q0", "X_Q1", "RESET"],
      targetState: "bell_state",
      successHint: "Apply [H on Q0] then [CNOT] to form the (|00⟩ + |11⟩)/√2 entangled pair!"
    },
    quiz: {
      question: "In the Bell State (|00⟩ + |11⟩)/√2, if you measure Qubit 0 and find it in state |1⟩, what will Qubit 1 be?",
      options: [
        "50% chance of 0, 50% chance of 1",
        "100% guaranteed to be |1⟩",
        "100% guaranteed to be |0⟩",
        "It is impossible to know without measuring Qubit 1 first"
      ],
      correctIndex: 1,
      explanation: "Because only |00⟩ and |11⟩ exist in this entangled state, measuring Qubit 0 as 1 instantaneously collapses the combined system into |11⟩!",
      mascotTip: "The two qubits share a single quantum identity. Measuring one reveals the other immediately!"
    }
  },
  {
    id: 5,
    title: "Measurement & Probability",
    subtitle: "Wave Function Collapse & Born Rule",
    icon: "Activity",
    accentColor: "#f59e0b", // Amber
    module: "Quantum Measurement",
    xpReward: 35,
    overview: {
      tag: "THE BORN RULE",
      heading: "Observation Collapses the State",
      description: "Before measurement, a qubit in state α|0⟩ + β|1⟩ is in a delicate superposition. The moment we measure it, the wave function collapses to |0⟩ with probability |α|² or to |1⟩ with probability |β|². You can never observe a half-0 half-1 qubit directly!",
      takeaway: "Quantum probability is deterministic before measurement, and probabilistic at the instant of measurement.",
      diagramType: "collapse-animation"
    },
    simulator: {
      type: "measurement-lab",
      title: "Quantum Measurement Chamber",
      instructions: "Apply gates to create a superposition, then click 'MEASURE DETECTOR' multiple times to perform live repeated shots and see the histogram build up!",
      availableGates: ["H", "X", "Z"],
      successHint: "Prepare a superposition with [H] and trigger 5 measurements to see how 50/50 probability emerges from random collapses!"
    },
    quiz: {
      question: "If a qubit is in state |+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, what is the probability of measuring |0⟩?",
      options: [
        "100%",
        "25% (because 1/√2 divided by 2)",
        "50% (since |1/√2|² = 1/2 = 50%)",
        "0%"
      ],
      correctIndex: 2,
      explanation: "According to the Born rule, probability = |amplitude|². Here |1/√2|² = 1/2 = 50%!",
      mascotTip: "Square the amplitude! (1/√2)² = 1/2 = 50%!"
    }
  },
  {
    id: 6,
    title: "Mini Algorithm",
    subtitle: "Grover's Search & Quantum Speedup",
    icon: "Sparkles",
    accentColor: "#ec4899", // Pink / Fuchsia
    module: "Quantum Algorithms",
    xpReward: 40,
    overview: {
      tag: "ALGORITHM SPOTLIGHT",
      heading: "Grover's Amplitude Amplification",
      description: "Searching an unsorted database of N items takes O(N) classical checks. Grover's Quantum Algorithm solves it in only O(√N) steps! It works in two steps: 1. Oracle flips the phase of the target state. 2. Diffusion Operator inverts all amplitudes about their mean, boosting the target probability!",
      takeaway: "Quantum algorithms don't just test items randomly—they manipulate wave interference to amplify the winner.",
      diagramType: "grover-diagram"
    },
    simulator: {
      type: "grover-mini",
      title: "Grover 2-Qubit Search Engine",
      instructions: "Goal: Find the secret target item |11⟩. 1. Apply H to both qubits. 2. Apply Oracle (|11⟩ Phase Flip). 3. Apply Grover Diffusion. Watch the probability of |11⟩ zoom to nearly 100%!",
      availableGates: ["INIT_H", "ORACLE", "DIFFUSION", "RESET"],
      targetState: "target_found",
      successHint: "Run: [1. Equal Superposition (H)] -> [2. Oracle Mark] -> [3. Diffusion Amplifier] to find |11⟩!"
    },
    quiz: {
      question: "How does Grover's Algorithm achieve its quadratic speedup over classical brute-force search?",
      options: [
        "By testing every possibility simultaneously on separate CPU threads",
        "By flipping the phase of the answer and using interference to amplify its amplitude",
        "By magically guessing the right key on the first attempt without looking",
        "By shrinking the database size in classical memory"
      ],
      correctIndex: 1,
      explanation: "Grover's algorithm marks the solution with a negative phase and then reflects about the mean (Diffusion), amplifying the correct answer's probability while suppressing the rest!",
      mascotTip: "Phase mark + Amplitude Diffusion = Quantum Speedup! You've mastered the core of quantum algorithms!"
    }
  }
];
