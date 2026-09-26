import QuantumCircuit from 'quantum-circuit';

// The agreed upon interface contract
export const runCircuit = (qubits, gates) => {
  const circuit = new QuantumCircuit(qubits);

  // Apply each gate to the circuit
  gates.forEach(gate => {
    // Basic mapping for our core gates
    if (gate.name === 'H') {
      circuit.addGate('h', gate.time, gate.wire);
    } else if (gate.name === 'X') {
      circuit.addGate('x', gate.time, gate.wire);
    } else if (gate.name === 'CNOT') {
      // Assuming CNOT involves two wires - needs a UI update for Track C
      // But we map it to standard format for now
      // circuit.addGate('cx', gate.time, controlWire, targetWire);
    }
  });

  // Run the circuit
  circuit.run();

  // Get probabilities for each state
  const probabilities = {};
  const numStates = Math.pow(2, qubits);
  for (let i = 0; i < numStates; i++) {
    // Format state as binary string e.g., '0' or '1' or '00'
    const stateStr = i.toString(2).padStart(qubits, '0');
    // We can extract probabilities from the statevector if the package supports it directly,
    // or calculate from amplitudes
    const amplitude = circuit.stateAsString(true); // Get raw string representation to debug
    // For now we mock the probability return based on simple logic until we refine the circuit parser
    probabilities[stateStr] = 0; 
  }

  // Simplified mapping for demonstration purposes 
  const stateVector = circuit.stateAsArray();
  
  return { probabilities, stateVector, raw: circuit.exportQASM() };
};

const levelDataRaw = [
  { title: "What is a Computer?", q: "What is a computer fundamentally?", opts: ["A machine that takes input, processes, and outputs", "A screen that shows images", "A quantum engine", "A calculator for fractions"], ans: 0 },
  { title: "What is Information?", q: "How do computers represent information?", opts: ["Using colors", "Using digital numbers", "Using ink", "Using analog waves"], ans: 1 },
  { title: "Binary", q: "What numbers does the binary system use?", opts: ["0 to 9", "0 and 1", "1 to 100", "A to Z"], ans: 1 },
  { title: "Classical Bit", q: "What is a classical bit?", opts: ["A group of 8 bytes", "A unit that can be 0 or 1", "A quantum state", "A logic gate"], ans: 1 },
  { title: "Byte", q: "How many bits are in one byte?", opts: ["2", "4", "8", "16"], ans: 2 },
  { title: "Bits vs Bytes", q: "How many combinations can 8 bits represent?", opts: ["8", "16", "128", "256"], ans: 3 },
  { title: "Classical Data", q: "How is a text document stored?", opts: ["As physical paper", "As binary encoded data", "As quantum states", "As audio"], ans: 1 },
  { title: "What Does Quantum Mean?", q: "In physics, what does 'quantum' refer to?", opts: ["A fast computer", "A discrete packet of energy/quantity", "A type of math", "A brand of processor"], ans: 1 },
  { title: "Quantum Computing", q: "What does a quantum computer use instead of bits?", opts: ["Bytes", "Qubits", "Megabytes", "Atoms"], ans: 1 },
  { title: "Qubit", q: "What can a qubit represent before measurement?", opts: ["Only 0", "Only 1", "A superposition of |0⟩ and |1⟩", "8 states simultaneously"], ans: 2 },
  { title: "Qubit States", q: "What happens to a qubit in superposition when measured?", opts: ["It stays in superposition", "It collapses to 0 or 1", "It becomes two qubits", "It vanishes"], ans: 1 },
  { title: "Measurement", q: "Where is |0⟩ located on the standard Bloch sphere?", opts: ["Center", "South Pole", "North Pole", "Equator"], ans: 2 },
  { title: "Born Rule", q: "What constraint must a normalized qubit satisfy?", opts: ["α + β = 1", "|α|² + |β|² = 1", "αβ = 1", "|α| + |β| = 2"], ans: 1 },
  { title: "Bloch Sphere", q: "Which states live on the equator of the Bloch sphere?", opts: ["|0⟩ and |1⟩", "|+⟩ and |−⟩", "Only |0⟩", "Entangled states"], ans: 1 },
  { title: "X Gate", q: "What does the X gate do to |0⟩?", opts: ["Leaves it as |0⟩", "Flips it to |1⟩", "Creates superposition", "Destroys it"], ans: 1 },
  { title: "Y Gate", q: "What does the Y gate do?", opts: ["Flips around Y axis", "Flips around X axis", "Changes only phase", "Measures the qubit"], ans: 0 },
  { title: "Z Gate", q: "What does the Z gate do to |1⟩?", opts: ["Changes it to |0⟩", "Produces -|1⟩", "Destroys it", "Produces |+⟩"], ans: 1 },
  { title: "H Gate", q: "What does H|0⟩ produce?", opts: ["|1⟩", "|+⟩", "|−⟩", "|0⟩"], ans: 1 },
  { title: "S Gate", q: "What does the S gate do?", opts: ["Quarter turn around Z", "Half turn around Z", "Flips bit", "Creates entanglement"], ans: 0 },
  { title: "T Gate", q: "What is the T gate?", opts: ["Square root of Z", "Square root of S", "Same as X", "Same as H"], ans: 1 },
  { title: "Controlled Gates", q: "What does a CNOT gate do?", opts: ["Flips target if control is 1", "Flips control if target is 1", "Always flips both", "Measures both"], ans: 0 },
  { title: "First Circuit", q: "Why are quantum gates unitary?", opts: ["To make computers faster", "To preserve probability", "To store bytes", "To eliminate measurement"], ans: 1 },
  { title: "CNOT", q: "How many qubits does CNOT act on?", opts: ["1", "2", "3", "4"], ans: 1 },
  { title: "Multiple Qubits", q: "How many complex amplitudes describe a 3-qubit state?", opts: ["3", "6", "8", "9"], ans: 2 },
  { title: "Bell States", q: "Which of these is a Bell state?", opts: ["|00⟩", "|+0⟩", "(|00⟩ + |11⟩)/√2", "|11⟩"], ans: 2 },
  { title: "Entanglement", q: "Can you describe an entangled state by describing each qubit independently?", opts: ["Yes", "No", "Only if measured", "Only with H gate"], ans: 1 },
  { title: "Deutsch Algorithm", q: "How many oracle queries does Deutsch's algorithm require?", opts: ["0", "1", "2", "4"], ans: 1 },
  { title: "Deutsch-Jozsa", q: "What does Deutsch-Jozsa solve?", opts: ["Searching a database", "Factoring primes", "Constant vs Balanced function", "Routing"], ans: 2 },
  { title: "Teleportation", q: "What resources are required for quantum teleportation?", opts: ["Bell pair + 2 classical bits", "Faster-than-light comms", "Two Bell pairs", "Direct qubit transmission"], ans: 0 },
  { title: "Superdense Coding", q: "How many classical bits can superdense coding transmit by sending one qubit?", opts: ["1", "2", "4", "Infinite"], ans: 1 },
  { title: "Grover", q: "What is Grover's algorithm used for?", opts: ["Factoring", "Unstructured search", "Addition", "Encryption"], ans: 1 },
  { title: "QFT", q: "What is QFT?", opts: ["Quantum Fourier Transform", "Quantum Fast Travel", "Quantum Field Theory", "Quantum File Transfer"], ans: 0 },
  { title: "Shor", q: "What does Shor's algorithm do exponentially faster than classical algorithms?", opts: ["Searching", "Factoring large integers", "Sorting", "Rendering graphics"], ans: 1 }
];

export const LEVELS_JSON = levelDataRaw.map((data, i) => ({
  id: String(i + 1),
  title: data.title,
  qubits: 1,
  presetGates: [],
  question: data.q,
  options: data.opts,
  correctGuess: data.ans,
  explanation: 'This was a critical concept for ' + data.title + '. Progressing to the next stage requires mastering this.',
  xp: i < 14 ? 20 : 50
}));
