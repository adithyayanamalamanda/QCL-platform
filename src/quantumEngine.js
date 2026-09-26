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
  { title: "Computers & Info", q: "What is information in a classical computer?", opts: ["Energy waves", "Digital 0s and 1s", "Physical weight", "Analog sound"], ans: 1 },
  { title: "Bits & Binary", q: "What values can a binary bit take?", opts: ["0 to 9", "True, False, or Maybe", "0 and 1", "Infinite values"], ans: 2 },
  { title: "Classical Logic", q: "Which classical gate outputs 1 only if BOTH inputs are 1?", opts: ["OR", "NOT", "XOR", "AND"], ans: 3 },
  { title: "Mathematics", q: "What does the imaginary unit 'i' represent?", opts: ["Square root of 1", "Square root of -1", "Pi", "Euler's number"], ans: 1 },
  { title: "Quantum Computing", q: "What physical phenomena do quantum computers use?", opts: ["Gravity", "Friction", "Superposition & Entanglement", "Magnetism"], ans: 2 },
  { title: "Qubits", q: "Unlike a classical bit, a Qubit can be in:", opts: ["0 or 1 only", "Neither 0 nor 1", "A superposition of 0 and 1", "8 states exactly"], ans: 2 },
  { title: "Superposition", q: "What does superposition mean for a qubit?", opts: ["It is broken", "It is exactly 0 and 1 at the same time", "It exists as a probability combination of states", "It duplicates itself"], ans: 2 },
  { title: "Measurement", q: "What happens when you measure a qubit in superposition?", opts: ["It stays in superposition", "It collapses to exactly 0 or 1", "It vanishes", "It turns into a classical bit forever"], ans: 1 },
  { title: "Bloch Sphere", q: "Where does the |0⟩ state sit on the Bloch Sphere?", opts: ["Equator", "South Pole", "Center", "North Pole"], ans: 3 },
  { title: "Quantum Gates", q: "Which gate flips |0⟩ to |1⟩?", opts: ["Pauli-X", "Hadamard", "Pauli-Z", "Identity"], ans: 0 },
  { title: "Quantum Circuits", q: "What is the flow of a quantum circuit?", opts: ["Read -> Compute -> Write", "Initialize -> Apply Gates -> Measure", "Loop infinitely", "Measure -> Apply Gates"], ans: 1 },
  { title: "Interference", q: "Why don't quantum algorithms just 'try everything at once'?", opts: ["Memory limits", "Interference amplifies the correct answer and cancels wrong ones", "Too slow", "Qubits are too fragile"], ans: 1 },
  { title: "Entanglement", q: "What defines an entangled state?", opts: ["Two qubits far apart", "Two qubits spinning the same way", "Qubits whose states cannot be described independently", "Qubits in superposition"], ans: 2 },
  { title: "Quantum Info", q: "What describes a statistical ensemble of quantum states?", opts: ["Density Matrix", "State Vector", "Bloch Sphere", "Classical Bit"], ans: 0 },
  { title: "Qiskit", q: "What is Qiskit?", opts: ["A quantum hardware chip", "IBM's quantum software framework", "A quantum algorithm", "A new particle"], ans: 1 },
  { title: "Teleportation", q: "What does quantum teleportation actually teleport?", opts: ["Matter", "Energy", "Quantum Information (States)", "Physical Qubits"], ans: 2 },
  { title: "Superdense Coding", q: "How many classical bits can 1 entangled qubit transmit in superdense coding?", opts: ["1", "2", "3", "4"], ans: 1 },
  { title: "Deutsch", q: "What does Deutsch's algorithm determine?", opts: ["Prime factors", "If a function is constant or balanced", "Shortest path", "Database search"], ans: 1 },
  { title: "Deutsch-Jozsa", q: "How many queries does Deutsch-Jozsa take to check a constant/balanced function?", opts: ["O(N)", "O(log N)", "Exactly 1", "O(N^2)"], ans: 2 },
  { title: "Bernstein-Vazirani", q: "What does Bernstein-Vazirani find in 1 query?", opts: ["A hidden bit string", "A prime factor", "A sorted array", "A max cut"], ans: 0 },
  { title: "Simon's Algorithm", q: "What kind of advantage does Simon's algorithm provide?", opts: ["Quadratic", "Exponential", "None", "Constant"], ans: 1 },
  { title: "QFT", q: "What does the Quantum Fourier Transform do?", opts: ["Changes basis to the Fourier basis", "Measures qubits", "Copies qubits", "Teleports states"], ans: 0 },
  { title: "Phase Estimation", q: "What does QPE estimate?", opts: ["The phase of an eigenvalue of a unitary operator", "The speed of light", "The number of gates", "The probability of measuring 0"], ans: 0 },
  { title: "Grover", q: "What is the speedup of Grover's search algorithm?", opts: ["Exponential", "Quadratic", "Linear", "None"], ans: 1 },
  { title: "Shor", q: "Why is Shor's algorithm famous?", opts: ["It searches databases", "It simulates molecules", "It factors large integers exponentially faster", "It teleports data"], ans: 2 },
  { title: "VQE", q: "What type of algorithm is VQE?", opts: ["Hybrid quantum-classical", "Purely classical", "Purely quantum", "Error correcting"], ans: 0 },
  { title: "QAOA", q: "What is QAOA generally used for?", opts: ["Factoring", "Combinatorial optimization", "Searching", "Teleportation"], ans: 1 },
  { title: "QML", q: "What is a Quantum Feature Map?", opts: ["A map of IBM data centers", "Encoding classical data into quantum states", "A neural network layer", "A circuit diagram"], ans: 1 },
  { title: "Error Correction", q: "Why do we need quantum error correction?", opts: ["Because qubits are noisy and fragile", "To make it faster", "To save memory", "To break encryption"], ans: 0 },
  { title: "Fault Tolerance", q: "What is a logical qubit?", opts: ["A single physical atom", "A simulated classical bit", "A collection of physical qubits acting as one stable qubit", "A line of code"], ans: 2 },
  { title: "Advanced Algos", q: "What does the HHL algorithm solve?", opts: ["Linear systems of equations", "Sorting", "Searching", "Factoring"], ans: 0 }
];

export const LEVELS_JSON = levelDataRaw.map((data, i) => ({
  id: String(i + 1),
  title: data.title,
  qubits: i < 11 ? 1 : 2,
  presetGates: [],
  question: data.q,
  options: data.opts,
  correctGuess: data.ans,
  explanation: 'This is a core concept from the IBM Quantum Curriculum for ' + data.title + '.',
  xp: i < 15 ? 20 : 50
}));
