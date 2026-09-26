import { useState } from 'react';

// Stub Component for Track C
export default function CircuitBuilder({ qubits = 1, onRun }) {
  const [gates, setGates] = useState([]);

  const addGate = (gateName, wire) => {
    // Basic append to end of wire
    const time = gates.filter(g => g.wire === wire).length;
    setGates([...gates, { name: gateName, wire, time }]);
  };

  const clearCircuit = () => setGates([]);

  const renderWire = (wireIndex) => {
    const wireGates = gates.filter(g => g.wire === wireIndex);
    
    return (
      <div key={wireIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '40px', fontWeight: 'bold', color: 'var(--text-muted)' }}>q[{wireIndex}]</div>
        <div className="wire" style={{ flex: 1, margin: '0 1rem' }}>
          {wireGates.map((g, i) => (
            <div 
              key={i} 
              className={`gate gate-${g.name.toLowerCase()}`}
              style={{ left: `${g.time * 60 + 20}px` }}
            >
              {g.name}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', minWidth: '80px', justifyContent: 'flex-end' }}>
          <button 
            style={{ background: '#1e293b', border: '1px solid var(--text-muted)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }} 
            onClick={() => addGate('H', wireIndex)}
          >
            + H
          </button>
          <button 
            style={{ background: '#1e293b', border: '1px solid var(--text-muted)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }} 
            onClick={() => addGate('X', wireIndex)}
          >
            + X
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Circuit Builder</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn" 
            style={{ 
              background: 'transparent', 
              border: '2px solid var(--text-muted)', 
              color: 'var(--text-main)',
              padding: '0.5rem 1rem', 
              fontSize: '0.9rem' 
            }} 
            onClick={clearCircuit}
          >
            RESET
          </button>
          <button 
            className="btn" 
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.9rem' 
            }} 
            onClick={() => onRun(gates)}
          >
            RUN CIRCUIT
          </button>
        </div>
      </div>
      
      <div style={{ padding: '1rem 0', overflowX: 'auto' }}>
        {Array.from({ length: qubits }).map((_, i) => renderWire(i))}
      </div>
    </div>
  );
}
